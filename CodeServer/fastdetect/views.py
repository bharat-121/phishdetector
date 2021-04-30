from django.shortcuts import render
from .apps import FastdetectConfig

from django.http import HttpResponse, JsonResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404


# Create your views here.

class call_model(APIView):
    def get(self, request):
        if request.method == 'GET':

            url = 'https://www.gooogle.com'
            # sentence is the query we want to get the prediction for
            params = request.GET.get('url')
            print(params)
            # predict method used to get the prediction
            # response = FastdetectConfig.predictor.predict(url)
            response = FastdetectConfig.classifier.predict(params)
            # response = FastdetectConfig().getPrediction(url)
            # returning JSON response
            print(response)
            d={}
            d["success"]=True
            d["response"]=str(response)
            return JsonResponse(d)
