import random
from .models import User, OTPRequest
import datetime
from django.utils import timezone
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import timedelta
import requests
from decouple import config


# Placeholder for SMS sending integration (e.g., Twilio)
def send_sms(phone_number, otp_code):
    api_key = config('API_KEY')
    otp_template_name = config('OTP_TEMPLATE_NAME')
    url = f"https://2factor.in/API/V1/{api_key}/SMS/{phone_number}/{otp_code}/{otp_template_name}"
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raises an HTTPError for bad responses (4xx or 5xx)
        print(f"Successfully sent OTP to {phone_number}")
    except requests.exceptions.RequestException as e:
        print(f"Failed to send OTP to {phone_number}: {e}")



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
    send_sms(phone_number, otp_code)
    return otp_obj
