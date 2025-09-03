from django.urls import path
from reports.views import HazardReportCreateView, HazardReportListView, health



urlpatterns = [
    path('health/', health, name='health'),
    path('submit/', HazardReportCreateView.as_view(), name='hazard-submit'),
    path('list/', HazardReportListView.as_view(), name='list-reports'),

]

