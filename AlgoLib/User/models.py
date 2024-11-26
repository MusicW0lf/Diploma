from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils.timezone import now

class CustomUserManager(BaseUserManager):
    """
    Custom manager for the CustomUser model.
    """

    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if not extra_fields.get('is_staff'):
            raise ValueError("Superuser must have is_staff=True.")
        if not extra_fields.get('is_superuser'):
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(username, email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    """
    Custom user model to replace Django's default User model.
    """
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=150)
    tag = models.CharField(max_length=100, unique=True, null=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    created_at = models.DateTimeField(default=now)
    updated_at = models.DateTimeField(auto_now=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        db_table = 'users'



    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_set',  # Set a custom reverse relation name
        blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_permissions_set',  # Set a custom reverse relation name
        blank=True
    )
    def get_profile_info(self):
        return {
            "user_id": self.user_id,
            "username": self.username,
            "email": self.email,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
