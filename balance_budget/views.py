from django.http import HttpResponse, HttpResponseRedirect
from django.views.decorators.clickjacking import xframe_options_exempt
from django.template import RequestContext
from django.shortcuts import render, render_to_response

@xframe_options_exempt
def index(request):
    return render(request, 'balance_budget/index.html')
