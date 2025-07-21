from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from django.conf import settings
from .models import User, OTPRequest
from .utils import generate_and_send_otp
from django.db import transaction
from rest_framework_simplejwt.tokens import RefreshToken

# Rate limiting settings (simple, per phone number)
OTP_REQUEST_LIMIT = 3  # per hour
OTP_VERIFY_ATTEMPT_LIMIT = 5
OTP_EXPIRY_MINUTES = 5

# Create your views here.

class RegisterWithOTPAPIView(APIView):
    def post(self, request):
        phone_number = request.data.get('phone_number')
        if not phone_number:
            return Response({'detail': 'Phone number is required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Rate limiting: count OTPs sent in the last hour
        one_hour_ago = timezone.now() - timezone.timedelta(hours=1)
        recent_otps = OTPRequest.objects.filter(phone_number=phone_number, created_at__gte=one_hour_ago)
        if recent_otps.count() >= OTP_REQUEST_LIMIT:
            return Response({'detail': 'OTP request limit reached. Please try again later.'}, status=status.HTTP_429_TOO_MANY_REQUESTS)

        # Create user if not exists
        user, created = User.objects.get_or_create(phone_number=phone_number)
        if not user.is_active:
            return Response({'detail': 'User account is inactive.'}, status=status.HTTP_403_FORBIDDEN)

        # Generate and send OTP
        generate_and_send_otp(phone_number, expiry_minutes=OTP_EXPIRY_MINUTES)
        return Response({'detail': 'OTP sent successfully.'}, status=status.HTTP_200_OK)


class VerifyOTPAPIView(APIView):
    def post(self, request):
        phone_number = request.data.get('phone_number')
        otp_code = request.data.get('otp')
        if not phone_number or not otp_code:
            return Response({'detail': 'Phone number and OTP are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            otp_obj = OTPRequest.objects.filter(phone_number=phone_number, is_verified=False).latest('created_at')
        except OTPRequest.DoesNotExist:
            return Response({'detail': 'No OTP request found. Please request a new OTP.'}, status=status.HTTP_404_NOT_FOUND)

        # Check expiry
        if timezone.now() > otp_obj.expires_at:
            return Response({'detail': 'OTP has expired. Please request a new OTP.'}, status=status.HTTP_400_BAD_REQUEST)

        # Check attempt limit
        if otp_obj.attempt_count >= OTP_VERIFY_ATTEMPT_LIMIT:
            return Response({'detail': 'Maximum verification attempts exceeded. Please request a new OTP.'}, status=status.HTTP_429_TOO_MANY_REQUESTS)

        # Check OTP
        if otp_obj.otp_code != otp_code:
            otp_obj.attempt_count += 1
            otp_obj.save()
            return Response({'detail': 'Invalid OTP. Please try again.'}, status=status.HTTP_400_BAD_REQUEST)

        # Mark as verified
        with transaction.atomic():
            otp_obj.is_verified = True
            otp_obj.save()
            user = User.objects.get(phone_number=phone_number)
            user.is_mobile_verified = True
            user.save()
        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        return Response({
            'detail': 'OTP verified successfully. Mobile number is now verified.',
            'access': str(refresh.access_token),
            'refresh': str(refresh)
        }, status=status.HTTP_200_OK)
