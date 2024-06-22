from django.urls import path

from .views import on_view, off_view, ping_view, schedule_view

urlpatterns = [
    path('on/', on_view, name='on'),
    path('off/', off_view, name='off'),
    path('schedule', schedule_view, name='schedule'),
    path('ping/', ping_view, name='ping'),
]
