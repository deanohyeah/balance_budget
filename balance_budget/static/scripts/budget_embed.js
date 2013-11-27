load();					
//funtions for xdr ajax
function alert_error()
{
}
function alert_loaded()
{
	$("#result").html(xdr.responseText);
}

function load(){
	var url = 'http://s3-us-west-2.amazonaws.com/static-newsapps/balance_budget/iframe.html'+'?'+new Date().getTime();//stops ie from caching
	if ($.browser.msie && window.XDomainRequest) 
	{
		xdr = new XDomainRequest(); // Create a new XDR object.
		xdr.open("get", url);
		xdr.onerror     = alert_error;
		xdr.onload      = alert_loaded;
		xdr.send();
	}else{
		$.ajaxSetup ({  
	    cache: false  
		});
	    var loadUrl = url; 
	    $("#result").load(loadUrl);

	}
}