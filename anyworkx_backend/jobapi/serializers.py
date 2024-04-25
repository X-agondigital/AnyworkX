from rest_framework import serializers
from .models import Jobs, Applicant,Subscribers


class JobsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jobs
        fields = '__all__'


class ApplicantSerializer(serializers.ModelSerializer):
    job = JobsSerializer(read_only=True)
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)

    class Meta:
        model = Applicant
        fields = (
            'created_at', 'id', 'first_name', 'last_name', 'email', 'phone_number', 'address', 'state', 'country',
            'cover_letter',
            'cv_upload', 'salary', 'job')


class JobsSerializer(serializers.ModelSerializer):
    applicants = ApplicantSerializer(many=True, read_only=True)
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    class Meta:
        model = Jobs
        fields = '__all__'


class SubscribersSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    class Meta:
        model = Subscribers
        fields = '__all__'
        
    