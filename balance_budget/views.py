from django.http import HttpResponse, HttpResponseRedirect
from django.template import RequestContext
from django.shortcuts import render, render_to_response

def index(request):
    return render(request, 'balance_budget/index.html')
