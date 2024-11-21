var ua = window.navigator.userAgent;
var isIE = /MSIE|Trident|Edge\//.test(ua);

if(isIE){
    String.prototype.includes = function(search, start) {
        if (typeof start !== 'number') {
          start = 0;
        }
        if (start + search.length > this.length) {
          return false;
        } else {
          return this.indexOf(search, start) !== -1;
	   }
    };
}

document.onreadystatechange = function () {
	  if (document.readyState === 'complete') {
		  addOnclickToATags();
		  var closeLoader = document.querySelector('.loader-wrapper');
		  if(closeLoader){
			  closeLoader.className += ' hidden';
			  setTimeout(function(){
				  document.body.removeChild(closeLoader);
			  }, 200);
		  }
	  }
}

function addOnclickToATags(){
	var tags = document.body.querySelectorAll("a[href]");
	for (var i = 0; i < tags.length; i++) {
		var params = getAllParametersFromUrl(tags[i].href);
		if(tags[i].href.includes("skt_knt_dom") && params['doms'] == 'T'){
			addConfirmDefaultValue(tags[i]);
		}
		else if(!tags[i].href.includes("osoz")){
			addActionToLink(tags[i]);
		}	
	}
}

function addActionToLink(tag) {
	tag.addEventListener("click", function() {
		transformLinkToFormWithParameters(tag.href);
	});
}

function addConfirmDefaultValue(tag) {
	tag.addEventListener("click", function() {
		confirmDefaultValue(tag.href);
	});
}

function confirmDefaultValue(href){
	event.preventDefault();
	var conf = confirm('Czy na pewno chcesz ustawi\u0107 wybrany towar domy\u015Blnym?');
	
	if(conf){
		transformLinkToFormWithParameters(href);
	} else {
		return;
	}
}

function transformLinkToFormWithParameters(href){
	event.preventDefault();
	if(isIE){
		var url = createUrlForIE(href, window.location.href);
		var params = getAllParametersFromUrl(url);
	}
	else if(href.indexOf("http") > -1){
		var url = new URL(href);
		var params = getAllParametersFromUrl(url.href);
	} else {
		var url = new URL(href , window.location);
		var params = getAllParametersFromUrl(url.href);
	}
	
	var form = document.createElement("form");
	var input = {};
	form.setAttribute("method", "post");
	if(isIE){
		form.setAttribute("action", createPathNameForIE(url) + addParamsToUrl(params));
	}
	else {
		form.setAttribute("action", url.pathname + addParamsToUrl(params));
	}
	var token = retrieveToken(href);
	if(token["OWASP-CSRFTOKEN"] == null){
		var tokenFromHiddenInput = document.getElementById("csrf_protection").value;
		if(tokenFromHiddenInput != ""){
			token["OWASP-CSRFTOKEN"] = tokenFromHiddenInput;
		}
	}
	form.setAttribute("enctype", "application/x-www-form-urlencoded");
	form.setAttribute("id", token["OWASP-CSRFTOKEN"]);
	document.body.appendChild(form);
	input = document.createElement("input");
	input.setAttribute("name", "OWASP-CSRFTOKEN");
	input.setAttribute("value", token["OWASP-CSRFTOKEN"]);
	input.setAttribute("type", "hidden");
	document.getElementById(token["OWASP-CSRFTOKEN"]).appendChild(input);
	form.submit();
	document.body.removeChild(document.getElementById(token["OWASP-CSRFTOKEN"]));
}

function createPathNameForIE(url){
	var pathName = url.substring(url.indexOf("/ks-sew") + 1);
	if(pathName.split("?").length > -1){
		console.log("/" + pathName.split("?")[0]);
		return "/" + pathName.split("?")[0];
	}
	return "/" + pathName;
}

function createUrlForIE(href, loc){
	if(href.split("/").length == 1){
		href = '/' + href;
	}
	var host = loc.split(loc.substring(loc.lastIndexOf("/ks-sew")))[0];
	var pathName = loc.split(loc.substring(0,loc.lastIndexOf("/ks-sew")))[1];
	var tabPathName = pathName.split("/");
	var tabHref = href.split("/");
	var url = "";
	var elementsOfHref = tabHref.length -1;
	for (var i = 1; i < tabPathName.length - elementsOfHref; i++){
		url += "/" + tabPathName[i]
	}
	for(var j = 1; j < tabHref.length; j++){
		url += "/" + tabHref[j];
	}
	return url;
}

function getAllParametersFromUrl(url){
	var obj = {};
		var splitQueries = url.split("?");
		var splitOneQuery = splitQueries[splitQueries.length - 1].split("&");
		for(var i = 0; i < splitOneQuery.length; i++){
			var keyValue = splitOneQuery[i].split("=");
			if(!keyValue[0].toUpperCase().includes("OWASP")){
				obj[keyValue[0]] = keyValue[1];
			}
		}
		return obj;
}

function addParamsToUrl(params){
	var stringParams = "?";
	for(var key in params){
		stringParams += key + "=" + params[key] + "&";
	}
	return stringParams.substring(0, stringParams.length - 1);
}

function retrieveToken (url){
	var obj = {};
	var splitQueries = url.split("?");
	var splitOneQuery = splitQueries[splitQueries.length - 1].split("&");
	for(var i = 0; i < splitOneQuery.length; i++){
		var keyValue = splitOneQuery[i].split("=");
		if(keyValue[0].toUpperCase().includes("OWASP")){
			obj[keyValue[0]] = keyValue[1];
		}
	}
	return obj;
}