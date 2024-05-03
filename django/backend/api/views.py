from django.http import JsonResponse
import json, sys, requests

def index(request):
    response = JsonResponse({"foo": "bar"})
    return (response)

def getToken(request):
    code = json.loads(request.body.decode("utf-8"))
    response = JsonResponse({"code": code['code']})
    url = 'https://api.intra.42.fr/oauth/token'
    params = {'grant_type': 'authorization_code',
            'client_id' : 'u-s4t2ud-17c3d06c29a63f052756d513ba06d6d98b92ee95cb7b6a9dd4e66465af2477ab',
            'client_secret' : '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',
            'code' : code['code'],
            'redirect_uri' : 'http://127.0.0.1:3000'
            }
    api_call = requests.post(url, params)
    data = api_call.json()
    print(data['access_token'], file=sys.stderr);
    return (getInfo(data['access_token']))
    return (JsonResponse(data))

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
