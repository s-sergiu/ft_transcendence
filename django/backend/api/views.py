from django.http import JsonResponse

def index(request):
    response = JsonResponse({"foo": "bar"})
    return (response)
