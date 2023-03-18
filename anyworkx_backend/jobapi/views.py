import math
from datetime import datetime

from rest_framework import generics, status
from rest_framework.response import Response

from .models import Jobs, Applicant, Subscribers
from .serializers import JobsSerializer, ApplicantSerializer,SubscribersSerializer


class JobsListViews(generics.ListCreateAPIView):
    queryset = Jobs.objects.all().order_by('created_at')
    serializer_class = JobsSerializer

    def get(self, request):
        page_num = int(request.GET.get("page", 1))
        limit_num = int(request.GET.get("limit", 10))
        start_num = (page_num - 1) * limit_num
        end_num = limit_num * page_num
        search_param = request.GET.get("search")
        jobs = Jobs.objects.all()
        total_jobs = jobs.count()
        if search_param:
            jobs = jobs.filter(title__icontains=search_param)
        serializer = self.serializer_class(jobs[start_num:end_num], many=True)
        return Response({
            "status": "success",
            "total": total_jobs,
            "page": page_num,
            "last_page": math.ceil(total_jobs / limit_num),
            "jobs": serializer.data
        })

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "Jobs": serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response({"status": "fail", "message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class JobsDetailViews(generics.RetrieveUpdateDestroyAPIView):
    queryset = Jobs.objects.all()
    serializer_class = JobsSerializer

    def get_job(self, pk):
        try:
            return Jobs.objects.get(pk=pk)
        except:
            return None

    def get(self, request, pk):
        job = self.get_job(pk=pk)
        if job is None:
            return Response({"status": "fail", "message": f"job with Id: {pk} not found"},
                            status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(job)
        return Response({"status": "success", "job": serializer.data})

    def patch(self, request, pk):
        job = self.get_job(pk)
        if job is None:
            return Response({"status": "fail", "message": f"job with Id: {pk} not found"},
                            status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(
            job, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.validated_data['updated_at'] = datetime.now()
            serializer.save()
            return Response({"status": "success", "job": serializer.data})
        return Response({"status": "fail", "message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        job = self.get_job(pk)
        if job is None:
            return Response({"status": "fail", "message": f"job with Id: {pk} not found"},
                            status=status.HTTP_404_NOT_FOUND)

        job.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ApplicantListViews(generics.ListCreateAPIView):
    queryset = Applicant.objects.all().order_by('created_at')
    serializer_class = ApplicantSerializer

    def get(self, request):
        page_num = int(request.GET.get("page", 1))
        limit_num = int(request.GET.get("limit", 10))
        start_num = (page_num - 1) * limit_num
        end_num = limit_num * page_num
        search_param = request.GET.get("search")
        applicants = Applicant.objects.all()
        total_applicants = applicants.count()
        if search_param:
            applicants = applicants.filter(title__icontains=search_param)
        serializer = self.serializer_class(applicants[start_num:end_num], many=True)
        return Response({
            "status": "success",
            "total": total_applicants,
            "page": page_num,
            "last_page": math.ceil(total_applicants / limit_num),
            "Applicant": serializer.data
        })


class ApplicationView(generics.CreateAPIView):
    queryset = Applicant.objects.all()
    serializer_class = ApplicantSerializer

    def post(self, request, *args, **kwargs):
        pk = kwargs.get('pk')
        try:
            job = Jobs.objects.get(id=pk)
        except Jobs.Doesjobxist:
            return Response({"message": "Job not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(job=job)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        serializer.save(cv_upload=self.request.data.get('cv_upload'))


class ApplicantDetailViews(generics.RetrieveUpdateDestroyAPIView):
    queryset = Applicant.objects.all()
    serializer_class = ApplicantSerializer

    def get_applicant(self, pk):
        try:
            return Applicant.objects.get(pk=pk)
        except:
            return None

    def get(self, request, pk):
        job = self.get_applicant(pk=pk)
        if job == None:
            return Response({"status": "fail", "message": f"job with Id: {pk} not found"},
                            status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(job)
        return Response({"status": "success", "job": serializer.data})


class CreateSubscribersView(generics.CreateAPIView):
    queryset = Subscribers.objects.all().order_by('created_at')
    serializer_class = SubscribersSerializer
    
    def get(self, request):
        page_num = int(request.GET.get("page", 1))
        limit_num = int(request.GET.get("limit", 10))
        start_num = (page_num - 1) * limit_num
        end_num = limit_num * page_num
        search_param = request.GET.get("search")
        subscribers = Subscribers.objects.all()
        total_subscribers = subscribers.count()
        if search_param:
            subscribers = subscribers.filter(title__icontains=search_param)
        serializer = self.serializer_class(subscribers[start_num:end_num], many=True)
        return Response({
            "status": "success",
            "total": total_subscribers,
            "page": page_num,
            "last_page": math.ceil(total_subscribers / limit_num),
            "subscribers": serializer.data
        })

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "Subscribers": serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response({"status": "fail", "message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)