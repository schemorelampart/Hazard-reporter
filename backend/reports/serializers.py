from rest_framework import serializers
from reports.models import HazardReport

class HazardReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = HazardReport
        fields = '__all__'
