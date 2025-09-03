from rest_framework import generics, parsers
from reports.models import HazardReport
from reports.serializers import HazardReportSerializer


class HazardReportCreateView(generics.CreateAPIView):
    queryset = HazardReport.objects.all()
    serializer_class = HazardReportSerializer
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]  # 👈 add this


class HazardReportListView(generics.ListAPIView):
    queryset = HazardReport.objects.all().order_by('-id')  # newest first
    serializer_class = HazardReportSerializer