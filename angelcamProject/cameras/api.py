import requests

BASE_URL = 'https://api.angelcam.com/v1'
PERSONAL_ACCESS_TOKEN = '6afa34e39275438f713fa9f82c2db477e7f3a1c7'

def get_headers():
    return {
        'Authorization': f'PersonalAccessToken {PERSONAL_ACCESS_TOKEN}',
        'Content-Type': 'application/json'
    }

def list_cameras():
    response = requests.get(f'{BASE_URL}/shared-cameras', headers=get_headers())
    return response.json()

def get_camera_stream(camera_id):
    response = requests.get(f'{BASE_URL}/shared-cameras/{camera_id}/recording/stream?start=2024-07-31T00:00:00.000Z&end=2024-07-31T01:00:00.000Z', headers=get_headers())
    if response.status_code == 200:
        return response.json()
    else:
        return {'error': response.text}

def get_recordings(camera_id):
    response = requests.get(f'{BASE_URL}/shared-cameras/{camera_id}/recording/stream?start=2024-07-31T00:00:00.000Z&end=2024-07-31T01:00:00.000Z', headers=get_headers())
    if response.status_code == 200:
        return response.json()
    else:
        return {'error': response.text}