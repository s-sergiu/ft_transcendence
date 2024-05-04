from django.http import JsonResponse
from django.views.decorators.csrf import get_token
import json, os, sys, requests

ID=os.environ.get('CLIENT_ID')
SECRET=os.environ.get('CLIENT_SECRET')

def index(request):
    csrf = get_token(request);
    return JsonResponse( { "token" : csrf })

def getToken(request):
    code = json.loads(request.body.decode("utf-8"))
    response = JsonResponse({"code": code['code']})
    url = 'https://api.intra.42.fr/oauth/token'
    params = {
            'grant_type': 'authorization_code',
            'client_id' : ID,
            'client_secret' : SECRET,
            'code' : code['code'],
            'redirect_uri' : 'http://127.0.0.1:3000'
    }
    api_call = requests.post(url, params)
    data = api_call.json()
    if (list(data.keys())[0] == 'error'):
        return (JsonResponse(data))
    return (getInfo(data['access_token']))

def getInfo(token):
    print("token: " + token, file=sys.stderr);
    url = 'https://api.intra.42.fr/v2/me'
    headers = {'authorization': f'Bearer {token}'}
    api_call = requests.get(url, headers = headers).json()
    return (JsonResponse(api_call))

"""
    if new user 
        store the access_token and populate info
            return user info
    if existing user
        check for access_token similarity 
            return user info
        generate a new token if not similar
            return user info





"""
