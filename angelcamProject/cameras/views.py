from django.shortcuts import render
from django.http import JsonResponse
from .api import list_cameras, get_camera_stream, get_recordings

def index(request):
    return render(request, 'cameras/index.html')

def api_list_cameras(request):
    cameras = list_cameras()
    return JsonResponse(cameras)

def api_camera_stream(request, camera_id):
    try:
        stream = get_camera_stream(camera_id)
        return JsonResponse(stream)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


def api_recordings(request, camera_id):
    try:
        recordings = get_recordings(camera_id)
        return JsonResponse(recordings)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
