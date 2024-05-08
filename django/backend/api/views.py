from django.http import JsonResponse
from django.views.decorators.csrf import get_token
import json, os, sys, requests

ID=os.environ.get('CLIENT_ID')
HOST_IP=os.environ.get('HOST_IP')
SECRET=os.environ.get('CLIENT_SECRET')

def index(request):
    csrf = get_token(request);
    return JsonResponse( { "token" : csrf })

def getToken(request):
    code = json.loads(request.body.decode("utf-8"))
    url = 'https://api.intra.42.fr/oauth/token'
    params = {
            'grant_type': 'authorization_code',
            'client_id' : ID,
            'client_secret' : SECRET,
            'code' : code['code'],
            'redirect_uri' : 'http://' + HOST_IP + ':3000'
    }
    api_call = requests.post(url, params)
    data = api_call.json()
    if (list(data.keys())[0] == 'error'):
        return (JsonResponse(data))
#    else if (check inside database)
#        return user from db
#    create user in db, add token to the user
    return (JsonResponse(data))
    return (getInfo(data['access_token']))

def getUserInfo(request):
    token = json.loads(request.body.decode("utf-8"))
    print("token: ",token['code'], file=sys.stderr);
    url = 'https://api.intra.42.fr/v2/me'
    headers = {'authorization': f'Bearer {token["code"]}'}
    api_call = requests.get(url, headers = headers).json()
    return (JsonResponse(api_call))


def getInfo(token):
    print("token: " + token, file=sys.stderr);
    url = 'https://api.intra.42.fr/v2/me'
    headers = {'authorization': f'Bearer {token}'}
    api_call = requests.get(url, headers = headers).json()
    return (JsonResponse([token , api_call], safe=False))
