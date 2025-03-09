from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group, Permission
from django.db import models


class UserManager(BaseUserManager):
  def create_user(self, phone_number, password=None, **extra_fields):
    if not phone_number:
      raise ValueError("Phone number is required")
    user = self.model(phone_number=phone_number, **extra_fields)
    user.set_password(password)
    user.save()
    return user
  
  def create_superuser(self, username, password=None, **extra_fields):
    if not username:
      raise ValueError("Superuser must have a username")
    extra_fields.setdefault('is_staff', True)
    extra_fields.setdefault('is_superuser', True)
    return self.model.objects.create(username=username, password=password, **extra_fields)
  

class User(AbstractBaseUser, PermissionsMixin):
  phone_number = models.CharField(max_length=15, unique=True)
  username = models.CharField(max_length=150, unique=True, blank=True, null=True)
  full_name = models.CharField(max_length=100, blank=True, null=True)
  email = models.EmailField(unique=True, blank=True, null=True)
  gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female')], blank=True, null=True)
  date_of_birth = models.DateField(blank=True, null=True)
  location = models.CharField(max_length=100, blank=True, null=True)
  is_active = models.BooleanField(default=True)
  is_staff = models.BooleanField(default=False)
  is_profile_completed = models.BooleanField(default=False)
  created_at = models.DateTimeField(auto_now_add=True)

  groups = models.ManyToManyField(Group, related_name="custom_user_groups", blank=True)
  user_permissions = models.ManyToManyField(Permission, related_name="custom_user_permissions", blank=True)

  USERNAME_FIELD = 'phone_number'
  REQUIRED_FIELDS = ['username']

  objects = UserManager()

  def __str__(self):
      return self.username if self.username else self.phone_number





