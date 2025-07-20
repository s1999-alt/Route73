from .views import RegisterWithOTPAPIView, VerifyOTPAPIView
from django.urls import path

urlpatterns = [
    
]

urlpatterns += [
    path('register/', RegisterWithOTPAPIView.as_view(), name='register-with-otp'),
    path('verify-otp/', VerifyOTPAPIView.as_view(), name='verify-otp'),
]

