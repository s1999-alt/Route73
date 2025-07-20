import random
from .models import User, OTPRequest
import datetime
from django.utils import timezone
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import timedelta


# Placeholder for SMS sending integration (e.g., Twilio)
def send_sms(phone_number, message):
    # Integrate with SMS provider here
    print(f"Sending SMS to {phone_number}: {message}")


def generate_and_send_otp(phone_number, expiry_minutes=5):
    # Generate a secure random 6-digit OTP
    otp_code = f"{random.randint(100000, 999999)}"
    expires_at = timezone.now() + timedelta(minutes=expiry_minutes)

    # Store OTP in the database (overwrite previous unverified OTPs for this number)
    otp_obj = OTPRequest.objects.create(
        phone_number=phone_number,
        otp_code=otp_code,
        expires_at=expires_at
    )

    # Send OTP via SMS
    send_sms(phone_number, f"Your OTP code is: {otp_code}")
    return otp_obj
