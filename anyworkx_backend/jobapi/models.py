import os
import uuid
from django.core.exceptions import ValidationError
from django.db import models
from django.utils import timezone


# Create your models here.
class Jobs(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
    job_title = models.CharField(max_length=255, null=False)
    job_description = models.TextField(null=False)
    position = models.CharField(max_length=255)
    job_location = models.CharField(max_length=255)
    job_requirements_title = models.CharField(max_length=255)
    job_requirements_body = models.TextField()
    we_offer = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('-created_at', )
    class Meta:
        db_table = 'jobs'


def validate_file_extension(value):
    ext = os.path.splitext(value.name)[1]  # [0] returns path+filename
    valid_extensions = ['.pdf', '.doc', '.docx']
    if not ext.lower() in valid_extensions:
        raise ValidationError('Unsupported file extension.')


class Applicant(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
    first_name = models.CharField(max_length=255, null=False)
    last_name = models.CharField(max_length=255, null=False)
    email = models.EmailField(max_length=255, null=False)
    phone_number = models.CharField(max_length=255, null=False)
    address = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    cover_letter = models.TextField()
    cv_upload = models.FileField(upload_to='applicant_cvs/', validators=[validate_file_extension])
    salary = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    job = models.ForeignKey(Jobs, on_delete=models.CASCADE)

    class Meta:
        ordering = ('-created_at', )
    class Meta:
        db_table = 'applicant'

class Subscribers(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
    email = models.EmailField(max_length=255, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)