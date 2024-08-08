# utils.py

def extract_token(request):
    auth_header = request.headers.get('Authorization')
    if auth_header and auth_header.startswith('PersonalAccessToken '):
        return auth_header.split(' ')[1]
    else:
        return None
