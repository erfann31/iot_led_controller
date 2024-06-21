import json

from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

# Global variables to hold LED status and scheduling information
led_status = "OFF"
scheduling = {"time_on_ms": 0, "time_off_ms": 0}

def index(request):
    return render(request, 'index.html')

def on_view(request):
    global led_status, scheduling
    scheduling = {"time_on_ms": 0, "time_off_ms": 0}
    led_status = "ON"
    return JsonResponse({"status": led_status})

def off_view(request):
    global led_status, scheduling
    scheduling = {"time_on_ms": 0, "time_off_ms": 0}
    led_status = "OFF"
    return JsonResponse({"status": led_status})

@csrf_exempt
def schedule_view(request):
    global scheduling, led_status
    if request.method == 'POST':
        body = json.loads(request.body)
        scheduling["time_on_ms"] = body.get("time_on_ms", 0)
        scheduling["time_off_ms"] = body.get("time_off_ms", 0)
        led_status = "Scheduled"
        return JsonResponse({"status": "Scheduled", "scheduling": scheduling})

def ping_view(request):
    return JsonResponse({"status": led_status, "scheduling": scheduling})
