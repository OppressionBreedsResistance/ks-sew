var info_page_id;
var W3CDOM = (document.createElement && document.getElementsByTagName);

window.onload = function() {
	startPage();
	createLogoutButton();
	try {
		KSSewPageSettings();
	}
	catch (error) {}
}

function createLogoutButton(){
	var logoutButton = document.getElementById("logout");
	if(logoutButton) {
		logoutButton.addEventListener('mouseover', function(){
			setItemOn('logout');
		});
		logoutButton.addEventListener('mouseout', function(){
			setItemOff('logout');
		});
		logoutButton.addEventListener('click', function(){
			setPage('/ks-sew/servlet/auth/flogout');
		});
		logoutButton.style = "border: 1px #800000 solid;";
	}
}

function addEventsToMenuButtons(){
	var tabWithMenuButtonNames = ['status','opcje','zrodla','task','log',
		'doc','jobs','stat','reg','conf'];
	var linksToAction = ['server_info', 'opc_list', 'src_list', 'task_list',
		'log_list', 'doc_list', 'job_list', 'stat_view', 'reg_list', 'conf_list'];
	for(var i = 0; i < tabWithMenuButtonNames.length; i++){
		var btn = document.getElementById(tabWithMenuButtonNames[i]);
		var linkToAction = linksToAction[i];
		var menuButtonName = tabWithMenuButtonNames[i];
		if(btn){
			addEvents(btn, menuButtonName, linkToAction);
		}
	}
}

function addEvents(btn, name, link){
	btn.addEventListener('mouseover', function(){
		setItemOn(name);
	});
	btn.addEventListener('mouseout', function(){
		setItemOff(name);
	});
	btn.addEventListener('click', function(){
		setPage('../admin/' + link);
	});
}

function startPage() {
  if (screen.width > 1024) {
    document.getElementById("content").width = 1024;
  }
}

if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/gm, '');
  };
}

if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    'use strict';
    if (search instanceof RegExp) {
      throw TypeError('first argument must not be a RegExp');
    } 
    if (start === undefined) { start = 0; }
    return this.indexOf(search, start) !== -1;
  };
}

function sprawdz(liczba)
{
  if(isNaN(liczba)) {window.alert("Wprowad\u017A liczb\u0119!");}
  // parseFloat(liczba);
  // if (!ilosc.match(/^[0-9]*$/)) {window.alert("Wprowad\u017A
	// liczb\u0119!");}
}

function displayWindow(url, left, top, width, height, name) {
  Win = window.open(url,name,'width=' + width + ',height=' + height + ',resizable=yes,scrollbars=yes,menubar=no,left=' + left + ',top=' + top);
  Win.focus();
}

function openWindow(url, name) {
  Win = window.open(url, name, '');
  Win.focus();
}

function setInfoPage(id) {
  if (info_page_id != null) {
    document.getElementById(info_page_id +"_btn").className = "mouseOut";
    document.getElementById(info_page_id).style.display = "none";
  }
  info_page_id = id;
  document.getElementById(id +"_btn").className = "checked";
  document.getElementById(id).style.display = "inline";
}

function setItemOn(id) {
  if (document.getElementById(id).className != "checked") {
    document.getElementById(id).className='mouseOn';
  }
  if (document.getElementById(id +"_menu") != null) {
    document.getElementById(id +"_menu").style.display = "inline";
  }
}
function setItemOff(id) {
  if (document.getElementById(id).className != "checked") {
    document.getElementById(id).className='mouseOut';
  }
  if (document.getElementById(id +"_menu") != null) {
    document.getElementById(id +"_menu").style.display = "none";
  }
}
function setPage(url) {
	if(url == '')
		url = document.referrer;
	if("" != document.getElementById("csrf_protection").value)
		addTokenToUrl(url);
	else {
		window.location = url;
	}
}
function setPageNext(url) {
	var nextUrl = url;
	var nextCbi = document.getElementById("nextCbi");
	if (nextCbi && nextCbi.checked)
		nextUrl += "&next=T";
	if("" != document.getElementById("csrf_protection").value)
		addTokenToUrl(nextUrl);
	else {
		window.location = nextUrl;
	}
}
function csrf_link(link) {
	
	var urlString = window.location.href;
	var url = new URL(urlString);
	var csrf = url.searchParams.get("org.apache.catalina.filters.CSRF_NONCE");
	
	var newLink = null;

	if (link.includes("org.apache.catalina.filters.CSRF_NONCE"))
		newLink = link;
	
	if (newLink == null && link.includes("?"))
		newLink = link + "&" + "org.apache.catalina.filters.CSRF_NONCE" + "=" + csrf;
	
	if (newLink == null)
		newLink = link + "?" + "org.apache.catalina.filters.CSRF_NONCE" + "=" + csrf;
		
	if (newLink != null)
		return newLink;
	
	return link;
	
	var newLinkUrl = null;
	var index = link.indexOf("http");
	if (index != 0) {
		var newUrlString = window.location.href.split('?')[0];
		newUrlString = newUrlString.substr(0, newUrlString.lastIndexOf("/"));
		newLinkUrl = new URL(newUrlString+"/"+link);		
	} else {
		newLinkUrl = new URL(link);
	}
	newLinkUrl.searchParams.set("org.apache.catalina.filters.CSRF_NONCE", csrf);
	
	if (url.hostname != newLinkUrl.hostname) return link;
	
	return newLinkUrl.href;

}

function addTokenToUrl(link){
	var hiddenCsrf = document.getElementById("csrf_protection");
	var wholeLink;
	
	if(link.includes("?")){
		wholeLink = link + "&" + hiddenCsrf.name + "=" + hiddenCsrf.value;
	}
	else {
		wholeLink = link + "?" + hiddenCsrf.name + "=" + hiddenCsrf.value;
	}

	transformLinkToFormWithParameters(wholeLink);
}
function ppf_button_separator() {
  R = '<table width=100% border=0 cellpadding="0" cellspacing="2"><tr><td>';
  R = R +'</td></tr></table>';
  document.write( R );
}
function ppf_button(id, title, link, pic, checked, style, hint) {
	
  if (link != null && link != "") {
	  R = '<table class="nav" id="' +id +'_table"><tr>';
	  if (checked) {
	    R = R +'<td class="checked" id="' +id +'" onmouseover="javascript:setItemOn(\'' +id +'\')" onmouseout="javascript:setItemOff(\'' +id +'\')"';
	  }
	  else {
	    R = R +'<td class="mouseOut" id="' +id +'" onmouseover="javascript:setItemOn(\'' +id +'\')" onmouseout="javascript:setItemOff(\'' +id +'\')"';
      R = R +' onClick="javascript:setPage(\'' + link +'\')"';
	  }  
	  if (hint != null) {
      R = R +' title="' +hint +'"';
    }
    else if (title != null) {
      R = R +' title="' +title +'"';
    }
    if (id.toUpperCase() == "LOGOUT" || id.toUpperCase() == "LOGIN") {
      R = R +' style="border: 1px #800000 solid;"';
    }
    if (id.toUpperCase() == "ZAPYTANIE" || id.toUpperCase() == "ZAPAKW") {
      R = R +' style="border: 1px #00B000 solid;"';
    }
    if (style != null) {
      R = R +' style="' +style +'"';
    }
	  R = R +'>';
	  if (pic != null) {
	    R = R +'<img src="' +pic +'"><br>';
	  }
	  if (title != null) {
	    R = R +title;
	  }
	  else {
	    R = R +id;
	  }
	  R = R +'</td>';
	  R = R +'</tr></table>';
	  document.write( R );
	}  
}

function ppf_button_new(id, title, link, pic, checked, style, hint) {
	
	  if (link != null && link != "") {
		  R = '<table class="nav" id="' +id +'_table"><tr>';
		  if (checked) {
		    R = R +'<td class="checked" id="' +id +'"';
		  }
		  else {
		    R = R +'<td class="mouseOut" id="' +id +'"';
		  }  
		  if (hint != null) {
	      R = R +' title="' +hint +'"';
	    }
	    else if (title != null) {
	      R = R +' title="' +title +'"';
	    }
	    if (id.toUpperCase() == "LOGOUT" || id.toUpperCase() == "LOGIN") {
	      R = R +' style="border: 1px #800000 solid;"';
	    }
	    if (id.toUpperCase() == "ZAPYTANIE" || id.toUpperCase() == "ZAPAKW") {
	      R = R +' style="border: 1px #00B000 solid;"';
	    }
	    if (style != null) {
	      R = R +' style="' +style +'"';
	    }
		  R = R +'>';
		  if (pic != null) {
		    R = R +'<img src="' +pic +'"><br>';
		  }
		  if (title != null) {
		    R = R +title;
		  }
		  else {
		    R = R +id;
		  }
		  R = R +'</td>';
		  R = R +'</tr></table>';
		  document.write( R );
		}
	}

function ppf_button_info(id, title, pic, hint) {
  R = '<table class="nav" id="' +id +'_table"><tr>';
  R = R +'<td class="mouseOut" id="' +id +'_btn" onmouseover="javascript:setItemOn(\'' +id +'_btn\')" onmouseout="javascript:setItemOff(\'' +id +'_btn\')"';
  R = R +' onClick="javascript:setInfoPage(\'' +id +'\')"';
  if (hint != null) {
    R = R +' title="' +hint +'"';
  }
  else if (title != null) {
    R = R +' title="' +title +'"';
  }
  R = R +'>';
  if (pic != null) {
    R = R +'<img src="' +pic +'"><br>';
  }
  if (title != null) {
    R = R +title;
  }
  else {
    R = R +id;
  }
  R = R +'</td>';
  R = R +'</tr></table>';
  document.write( R );
}

function ppf_button_back() {
  ppf_button("BACK", "Powr\u00F3t", document.referrer, null, null, "border: 1px #000000 solid;", "Powr\u00F3t do poprzedniej strony");
}

function ppf_button_help(url) {
  R = '<table class="nav" id="help_table"><tr>';
  R = R +'<td class="mouseOut" style="border: 1px #000080 solid;" id="help_btn" onmouseover="javascript:setItemOn(\'help_btn\')" onmouseout="javascript:setItemOff(\'help_btn\')"';
  R = R +' onClick="javascript:displayWindow(\'' +url +'\', 100, 100, 300, 400, \'help\')"';
  R = R +' title="Aby uzyskac pomoc wybierz ten przycisk"';
  R = R +'>';
  R = R +"Pomoc";
  R = R +'</td>';
  R = R +'</tr></table>';
  document.write( R );
}

function ppf_button_new_window(name, title, url, hint, disabled) {
  R = '<table class="nav" id="' +name +'_table"><tr>';
  if (!disabled) {
	R = R +'<td class="mouseOut" style="border: 1px #B0B000 solid;" id="' +name +'" onmouseover="javascript:setItemOn(\'' +name +'\')" onmouseout="javascript:setItemOff(\'' +name +'\')"';
    R = R +' onClick="javascript:openWindow(\'' +url +'\', \'' +name +'\')"';
  } else {
	R = R +'<td class="disabled" style="border: 1px #B0B000 solid;" id="' +name +'"';  
  } 
  if (hint != null) {
    R = R +' title="' +hint +'"';
  }
  else if (title != null) {
    R = R +' title="' +title +'"';
  }
  R = R +'>';
  R = R +title;
  R = R +'</td>';
  R = R +'</tr></table>';
  document.write( R );
}

function replace(texto, replaceWhat, replaceWith) {
  if (texto==null || texto.length==0) return "";
  texto += "";
  var i = texto.indexOf(replaceWhat);
  var j = 0;
  while (i!=-1) {
    var partial = texto.substring(0, i);
    texto = texto.substring(i+replaceWhat.length);
    texto = partial + replaceWith + texto;
    j = i + replaceWith.length;
    i = texto.indexOf(replaceWhat, j);
  }
  return texto;
}

function format(liczba, lmpp) {
  if (liczba == 0) return "0.00";
  else
  { 
    ile = ""+Math.round(liczba*Math.pow(10,lmpp))/Math.pow(10,lmpp);
    if(ile.indexOf(".")<0) ile = ile + ".00";
    while ((ile.length-ile.indexOf(".")-1)<lmpp) ile = ile+"0";
    return ile;
  }
}

function vat_od_netto(stawka, netto) {
  return Math.round(netto * stawka / 100 * Math.pow(10,2))/Math.pow(10,2);
}

function wartosc_brutto(obj, stawka) {
  netto = obj.value;
  a = format(Math.round(netto * Math.pow(10,2))/Math.pow(10,2) + parseFloat(vat_od_netto(stawka,netto)),2);
  if (isNaN(a)) {window.alert("Błędna wartość"); obj.value = format(0,2); return format(0,2);}
  return a;
}

function vat_od_brutto(stawka, brutto) {
  return format(brutto * stawka / (stawka / 100 + 1) / 100 ,2);
}

function wartosc_netto(obj, stawka) {
  brutto = obj.value;
  a = format(Math.round(brutto * Math.pow(10,2))/Math.pow(10,2) - parseFloat(vat_od_brutto(stawka,brutto)),2);
  if (isNaN(a)) {window.alert("Błędna wartość"); obj.value = format(0,2); return format(0,2);}
  return a;
}

function initFileUploads() {
	if (!W3CDOM) return;
	var fakeFileUpload = document.createElement('div');
	fakeFileUpload.className = 'fakefile';
	fakeFileUpload.appendChild(document.createElement('input'));
	var image = document.createElement('img');
	image.src='../../images/button_select.gif';
	fakeFileUpload.appendChild(image);
	var x = document.getElementsByTagName('input');
	for (var i=0;i<x.length;i++) {
		if (x[i].type != 'file') continue;
		if (x[i].parentNode.className != 'fileinputs') continue;
		x[i].className = 'file hidden';
		var clone = fakeFileUpload.cloneNode(true);
		x[i].parentNode.appendChild(clone);
		x[i].relatedElement = clone.getElementsByTagName('input')[0];
		x[i].onchange = x[i].onmouseout = function () {
			this.relatedElement.value = this.value;
		}
	}
}

function addEventSimple(obj,evt,fn) {
	if (obj.addEventListener)
		obj.addEventListener(evt,fn,false);
	else if (obj.attachEvent)
		obj.attachEvent('on'+evt,fn);
}

function removeEventSimple(obj,evt,fn) {
	if (obj.removeEventListener)
		obj.removeEventListener(evt,fn,false);
	else if (obj.detachEvent)
		obj.detachEvent('on'+evt,fn);
}

/**
 * Sprawdza i uzupe�nia podan� dat�
 * 
 * @param fieldId -
 *            Id pola z kt�rego pobiera format czasu i do kt�rego wpisuje wynik
 * @param modifier -
 *            Modyfikator czasu, mo�e przyjmowa� warto�ci: - 'od' - ustawia
 *            domy�lny czas na 00:00:00 - 'do' - ustawia domy�lny czas na
 *            23:59:59 - 'teraz' - ustawia domy�lny czas na czas bie��cy -
 *            ustalony czas formatu 'hh:mm:ss' - ustawia domyslny czas na podan�
 *            warto�� mo�emy u�ywa� "h", "m", "s" zamiast "hh","mm","ss" - null -
 *            obs�ugiwana jest tylko data, a wpisany czas b�dzie ignorowany
 * 
 * W polu o Id podanym w parametrze podajemy dat� sk�adaj�c� si� z cz�on�w: -
 * data (wymagana*) formatu YYYY-MM-DD lub YYYY.MM.DD (mo�na u�ywa� M lub D
 * zamiast MM lub DD) lub jeden ze znacznik�w: - d - data bie��ca - pm -
 * pierwszy dzie� bie��cego miesi�ca - km - ostatni dzie� bie��cego miesi�ca -
 * pr - pierwszy dzie� bie��cego roku - kr - ostatni dzie� bie��cego roku *data
 * nie jest wymagana je�eli wyst�pi jeden lub kilka modyfikator�w czasu/daty
 * (patrz ni�ej)
 *  - czas (opcjonalny) formatu identycznego jak format ustalonego czasu
 * podawanego w parametrze "modifier" (brakuj�ce minuty/sekundy zostan�
 * uzupe�nione z czasu domy�lnego) lub znacznik: - t - czas bie��cy
 *  - modyfikatory czasu/daty (opcjonalne, jeden lub wi�cej) formatu - d +/- x
 * gdzie x to liczba dni - h +/- x gdzie x to liczba godzin - m +/- x gdzie x to
 * liczba minut je�eli modyfikatory czasu/daty wyst�pi� bez podania cz�onu
 * daty/czasu w�wczas automatycznie modyfikowana jest bie��ca data/czas
 * 
 * 
 */
function Data(fieldId,modifier,numberOfCharsToTrim) {
	  var d, str, s ="", t="";
	  d = new Date();
	  str = document.getElementById(fieldId).value;
	  
	  if(str.trim() == "") return;
	  
	  str = str.toLowerCase( );
	  allowedDateSeparators = new Array("-",".");
	  allowedTimeSeparators = new Array(":");
	  allowedDateModifiersPlus = new Array("+");
	  allowedDateModifiersMinus = new Array("-");
	  var allowedTemplates = new Array("d","h","m");
	  var mod = new Array();
	  errorMessage = "Błędny format daty!";
	  errorMessageBadModifier = "Nieprawidłowy argument funkcji!";
	  dateSeparator = "-";
	  dateModifierPlus = "+";
	  dateModifierMinus = "-";
	  timeSeparator = ":";
	  tablica_temp=new Array();
	  var defaultTime = null;
	  var dateOK = false;
	  var timeOK = false;
	  var timeFromTemplate = false;
	  var timeSegmentsOK = new Array(false,false,false);
	  var defaultTimeSegmentsOK = new Array(false,false,false);
	  var sDate = new Array();
	  var sTime = new Array();
	  // var mod=0;
	  var dateSepIndex = -1;
	  var timeSepIndex = -1;
	  var lastTimeSepIndex = -1;
	  var numberOfTimeSeps = 0;
	  var plusMinusIndex=-1;
	  var result = "";
	  var sValue;
	  
	  if(modifier=="od") {
		  defaultTime = new Array(0,0,0);
	  }
	  else if(modifier=="do") {
		  defaultTime = new Array(23,59,59);
	  }
	  else if(modifier=="teraz") {
		  defaultTime = new Array(d.getHours(),d.getMinutes(),d.getSeconds());
	  }
	  else if(modifier!=null) {
			tempTime = new Array(0,0,0);
			defaultTime = new Array(0,0,0);
			defaultTimeTablica = new Array();
			defaultTimeTablica=modifier.split(":");

// if(defaultTimeTablica.length==1)
// defaultTimeSegmentsOK = new Array(!timeSegmentsOK[0],false,false);
// else if(defaultTimeTablica.length==2)
// defaultTimeSegmentsOK = new
// Array(!timeSegmentsOK[0],!timeSegmentsOK[1],false);
// else if(defaultTimeTablica.length==3)
// defaultTimeSegmentsOK = new
// Array(!timeSegmentsOK[0],!timeSegmentsOK[1],!timeSegmentsOK[2]);
			
			for(var i=0; i<defaultTimeTablica.length; i++)
				if(defaultTimeSegmentsOK[i]) {
					  sValue = defaultTimeTablica[i];
					  firstDigitNonZero=0;
					  for(var j=0;j<sValue.length;j++){
						  if(sValue.charAt(j)=='0') {
							  firstDigitNonZero++;
						  }
						  else {
							  break;
						  }
					  }
					  if(firstDigitNonZero>=sValue.length) { // same zera
						  tempTime[i]=0;
					  }
					  else {
						  tempTime[i] = parseInt(sValue.substring(firstDigitNonZero));
						  if(isNaN(tempTime[i]))
							  defaultTimeSegmentsOK[i]=false;
						  else {
							  if(i==0)
								  if((tempTime[i]<0) || (tempTime[i]>23))
							    		defaultTimeSegmentsOK[i] = false;
								  else
									  defaultTime[i]=tempTime[i];
							  else
								  if((tempTime[i]<0) || (tempTime[i]>59))
							    		defaultTimeSegmentsOK[i] = false;
								  else
									  defaultTime[i]=tempTime[i];
						  }
							  
					  }
				}
			for(var i=0; i<defaultTimeSegmentsOK.length; i++)
				if(!defaultTimeSegmentsOK[i]) {
					result = errorMessageBadModifier;
					  document.getElementById(fieldId).value = result;
					  return;
				}
					
		}
	  
	  if(str.indexOf(errorMessage) != -1) {
		  return;
	  }
	  else if(str.indexOf(errorMessageBadModifier) != -1) {
		  return;
	  }
	  
// else if(str.indexOf("d") != -1) {
// dateOK = true;
// }
	  else if(str.indexOf("pm") != -1) {    
	    d.setFullYear(d.getFullYear(),d.getMonth(),1);  
	    // defaultTime = new Array(0,0,0);
	    dateOK = true;
	  	}
		  
	  else if(str.indexOf("km") != -1) {   
	    d.setFullYear(d.getFullYear(),d.getMonth()+1,0);  
	    // defaultTime = new Array(23,59,59);
	    dateOK=true;
	  	}
	  else if(str.indexOf("pr") != -1) {
	    d.setFullYear(d.getFullYear(),0,1);  
	    // defaultTime = new Array(0,0,0);
	    dateOK = true;
	    }
	  else if(str.indexOf("kr") != -1) {    
	    d.setFullYear(d.getFullYear(),11,31);  
	    // defaultTime = new Array(23,59,59);
	    dateOK=true;
	  	}
	  if(modifier != null)
		  if(str.indexOf("t") != -1){
			  
			  timeOK = true;
			  timeFromTemplate = true;
			  }
	  
// for(var i=0; i<allowedTemplates.length; i++) {
// pattern1=allowedTemplates[i];
// pattern2=" "+allowedTemplates[i]+" ";
// patternTemp = ">><<"
//		  
// while(str.indexOf(pattern1) != -1){
// str=str.replace(pattern1,patternTemp);
// }
// while(str.indexOf(patternTemp) != -1){
// str=str.replace(patternTemp,pattern2);
// }
// }
	  for(var i=0; i<allowedDateSeparators.length; i++) {
		  pattern1=allowedDateSeparators[i];
		  pattern2=" "+dateSeparator+" ";
		  patternTemp = ">><<"
		  
		  while(str.indexOf(pattern1) != -1){
			  str=str.replace(pattern1,patternTemp);
		  }
		  while(str.indexOf(patternTemp) != -1){
			  str=str.replace(patternTemp,pattern2);
		  }
	  }
	  for(var i=0; i<allowedTimeSeparators.length; i++) {
		  pattern1=allowedTimeSeparators[i];
		  pattern2=" "+timeSeparator+" ";
		  patternTemp = ">><<"
		  
		  while(str.indexOf(pattern1) != -1){
			  str=str.replace(pattern1,patternTemp);
		  }
		  while(str.indexOf(patternTemp) != -1){
			  str=str.replace(patternTemp,pattern2);
		  }
	  }
	  for(var i=0; i<allowedDateModifiersPlus.length; i++) {
		  pattern1=allowedDateModifiersPlus[i];
		  pattern2=" "+dateModifierPlus+" ";
		  patternTemp = ">><<"
		  
		  while(str.indexOf(pattern1) != -1){
			  str=str.replace(pattern1,patternTemp);
		  }
		  while(str.indexOf(patternTemp) != -1){
			  str=str.replace(patternTemp,pattern2);
		  }
	  }
	  for(var i=0; i<allowedDateModifiersMinus.length; i++) {
		  pattern1=allowedDateModifiersMinus[i];
		  pattern2=" "+dateModifierMinus+" ";
		  patternTemp = ">><<";
		  
		  while(str.indexOf(pattern1) != -1){
			  str=str.replace(pattern1,patternTemp);
		  }
		  while(str.indexOf(patternTemp) != -1){
			  str=str.replace(patternTemp,pattern2);
		  }
	  }
	  
	  var tablica_temp = str.split(" ");
	  var tablica = new Array();
	  itablica=-1;
	  for(var i=0; i<tablica_temp.length; i++) {
		  if(tablica_temp[i] != "") {
			  
			  var acceptedString = false;
			  
			  for(var j=0; j<allowedDateSeparators.length; j++) {
				  if(tablica_temp[i] == allowedDateSeparators[j])
					  acceptedString = true;
			  }
			  
			  if(!acceptedString)
			  for(var j=0; j<allowedTimeSeparators.length; j++) {
				  if(tablica_temp[i] == allowedTimeSeparators[j])
					  acceptedString = true;
			  }
			  if(!acceptedString)
			  for(var j=0; j<allowedDateModifiersPlus.length; j++) {
				  if(tablica_temp[i] == allowedDateModifiersPlus[j])
					  acceptedString = true;
			  }
			  if(!acceptedString)
			  for(var j=0; j<allowedDateModifiersMinus.length; j++) {
				  if(tablica_temp[i] == allowedDateModifiersMinus[j])
					  acceptedString = true;
			  }
			  
			  if(!acceptedString)
				  for(var j=0; j<allowedTemplates.length; j++) {
					  if(tablica_temp[i] == allowedTemplates[j])
						  acceptedString = true;
				  }
			  
			  if(!acceptedString) {
				  if(!isNaN(parseInt(tablica_temp[i])))
					  acceptedString = true;
			  }
			  
			  if(acceptedString) {
				  itablica++;
				  tablica[itablica] = tablica_temp[i];
		  	  }
		  } 
	  }
	  
	  for(var i=0; i<allowedTemplates.length; i++) {
		  mod[i]=0;
		  var wynik = 0;
		  var index;
		  for(index=0; index<tablica.length; index++) {
			  // szukaj "d", "h", "m"
			  if(tablica[index].toLowerCase()==allowedTemplates[i].toLowerCase()){
				  
				  // if(wynik == 0) {
					  if(index<tablica.length-2){
						if(tablica[index+1]==dateModifierPlus) {
							wynik=1;
						}
						else if(tablica[index+1]==dateModifierMinus) {
							wynik=-1
						}
					  }
					  
					  if(wynik != 0){
						  var firstDigitNonZero=0;
						  for(var j=0;j<tablica[index+2].length;j++) {
							  if(tablica[index+2].charAt(j)=='0') {
								  firstDigitNonZero++;
							  }
							  else {
								  break;
							  }
						  }
						  if(firstDigitNonZero>=tablica[index+2].length) { // same
																			// zera
							  mod[i]=0;
						  }
						  else {
							  mod[i] = parseInt(tablica[index+2].substring(firstDigitNonZero));
						  }
						  
						  if(isNaN(mod[i])){
							  mod[i]=0;
							  wynik=0;
						  }
						  else {
							  mod[i]=mod[i] * wynik;
							  
							  if(i != 0)  // je�li to "h" lub "m" ustaw czas
											// domy�lny na bie��cy
								  timeFromTemplate = true;
							  
							  // znalaz�e� to usu� liczbe i plus/minus
							  tablica_temp = new Array();
							  
							  for(var h=0; h<index; h++)
								  tablica_temp[h]=tablica[h];
							  
							  for(var h=index; h<tablica.length-3; h++)
								  tablica_temp[h]=tablica[h+3];
							  tablica=tablica_temp;
							  tablica_temp = new Array();
						  }
						  
					  }
				  // }
			  }
		  }
	  }
	  
	  // szukaj date
	  if(!dateOK) {
		  for(var i=0; i<tablica.length; i++) {
			  if(tablica[i]==dateSeparator) {
				  // sprawd� czy to jest data czy mod minus
				  var thisIsDate = false;
				  
				  if(tablica.length>i+3)
					  if(!isNaN(tablica[i-1]))
						  if(!isNaN(tablica[i+1]))
							  if(tablica[i+2]==dateSeparator)
								  if(!isNaN(tablica[i+3])) { // to jest data
									  thisIsDate=true;
									  if(dateSepIndex == -1) {// jest to
																// pierwsza
																// znaleziona
																// data
										  dateSepIndex = i;
										  dateOK=true;
										  
										  for(var k=0; k<3; k++) {
											  sValue = tablica[i-1+(k*2)];
											  firstDigitNonZero=0;
											  
											  for(var j=0;j<sValue.length;j++) {
												  if(sValue.charAt(j)=='0') {
													  firstDigitNonZero++;
												  }
												  else {
													  break;
												  }
											  }
											  if(firstDigitNonZero>=sValue.length) { // same
																						// zera
												  sDate[k]=0;
											  }
											  else {
												  sDate[k] = parseInt(sValue.substring(firstDigitNonZero));
											  }
										  }
										  if((sDate[1]<1) || (sDate[1]>12))
											  dateOK = false;
										  if((sDate[2]<1) || (sDate[2]>31))
											  dateOK = false;
										  
										  if(dateOK) {
											  d.setFullYear(sDate[0],sDate[1]-1,sDate[2]);  
										  }
										  i+=2;
									  }
								  }
			  }
		  }
		  // usun date
		  if(dateOK) { // usu� date z tablicy bo ju� j� ustalono
			  tablica_temp = new Array();
			  var tablica_tempIndex = 0;
			  
			  for(var i=0; i<tablica.length; i++) {
				  
				  if(dateSepIndex>-1)
					  if(i>=dateSepIndex-1)
						  if(i<=dateSepIndex+3)
							  continue;
				 
				  tablica_temp[tablica_tempIndex] = tablica[i];
				  tablica_tempIndex++;
			  }
			  
			  tablica = tablica_temp;
			  
			  
		  }
		  else { // b��dna data lub brak daty, sprawd� czy wyst�puje kt�ry� z
					// modyfikator�w
			  var errorInfo=true
			  for(var i=0; i<allowedTemplates.length; i++)
				  if(str.indexOf(allowedTemplates[i]) != -1)
					  errorInfo=false;
			  
			  if(dateSepIndex > -1) // u�ytkownik pr�bowa� wpisa� dat�,
									// poinformuj go �e wpisa� b��dnie
				  errorInfo=true;
			  
			  if(errorInfo){ // brak modyfikator�w, poinformuj o b��dzie
				  result = errorMessage;
				  document.getElementById(fieldId).value = result;
				  return;
			  }
			  else {
				  dateOK = true;
			  }
		  }	  
	  }
	  
	  var result_temp = d.getFullYear() + "-";
	  if((d.getMonth()+1)<10) result_temp += "0";
	  result_temp += (d.getMonth()+1) + "-";
	  if(d.getDate()<10) result_temp+="0";
	  result_temp += d.getDate();
	  
	  result="";
	  for(var i=0; i<tablica.length; i++) {
		  result += tablica[i]+"_";
	  }
	  document.getElementById(fieldId).value = result;	  
	  
	  result_temp = d.getFullYear() + "-";
	  if((d.getMonth()+1)<10) result_temp += "0";
	  result_temp += (d.getMonth()+1) + "-";
	  if(d.getDate()<10) result_temp+="0";
	  result_temp += d.getDate();
	  
	  if(mod[0] != 0)
		  d.setFullYear(d.getFullYear(),d.getMonth(),d.getDate()+mod[0]);
	  
	  result_temp = d.getFullYear() + "-";
	  if((d.getMonth()+1)<10) result_temp += "0";
	  result_temp += (d.getMonth()+1) + "-";
	  if(d.getDate()<10) result_temp+="0";
	  result_temp += d.getDate();
	  
	  result = "";
	  for(var i=0; i<tablica.length; i++) {
		  result += tablica[i] + "_";
	  }
	  document.getElementById(fieldId).value = result;
	  
	  if(!timeOK && modifier != null) {
		  for(var i=0; i<tablica.length; i++) {
			  if(tablica[i]==timeSeparator) {
				  timeSepIndex = i;
				  break;
			  }
		  }
		  
		  sValue = new Array();
		  
		  if(timeSepIndex != -1) {
			  
			  var sValueIndex=0;
			  var timeTabIndex;
			  if(timeSepIndex==0)
				  timeTabIndex = 1;
			  else
				  timeTabIndex = timeSepIndex-1;
			  
			  while(timeTabIndex<tablica.length) {
				  
				  if(tablica[timeTabIndex]==timeSeparator) {
					  timeTabIndex++;
				  }
				  else if(isNaN(tablica[timeTabIndex])) {
					  break;
				  }
				  else {
					  sValue[sValueIndex] = tablica[timeTabIndex];
					  timeTabIndex++;
					  if(sValueIndex<3)
						  sValueIndex++;
					  else
						  break;
				  }
			  }
		  }
		  else { // brak separatora czasu, szukaj godziny
			  for(var i=0; i<tablica.length; i++) {
				  if(!isNaN(tablica[i])) {
					  sValue = new Array(tablica[i]);
					  break;
				  }
			  }
		  }
		  
		  timeOK=true;
		  for(var i=0; i<sValue.length; i++)
		  {
			  timeSegmentsOK[i] = true;
			  firstDigitNonZero=0;
			  for(var j=0;j<sValue[i].length;j++) {
				  if(sValue[i].charAt(j)=='0') {
					  firstDigitNonZero++;
				  }
				  else {
					  break;
				  }
			  }
			  if(firstDigitNonZero>=sValue[i].length) { // same zera
				  sTime[i]=0;
// firstDigitNonZero = 0;
			  }
			  else {
				  sTime[i] = parseInt(sValue[i].substring(firstDigitNonZero));
			  }
			  if(isNaN(sTime[i]))
				  timeSegmentsOK[i] = false;
			  else
				  if(i==0)
					  if((sTime[i]<0) || (sTime[i]>23)) {
						  timeOK = false;
						  timeSegmentsOK[i]=false;
					  }
				  else
					  if((sTime[i]<0) || (sTime[i]>59)) {
						  timeOK = false;
						  timeSegmentsOK[i]=false;
					  }
		  }
		  sValue = null;
	  // }
		  var defaultTimeSegmentsOK = new Array(false,false,false);
		  
		  // je�eli u�ytkownik poda� czas, uzyj czasu domy�lnego
		  // je�eli nie, u�yj czasu biez�cego je�li u�yto "t", "h", lub "m"
		  if(timeFromTemplate) 
		  for(var i=0; i<timeSegmentsOK.length; i++)
			  if(timeSegmentsOK[i]) {
				  timeFromTemplate=false;
				  break;
			  }
		  
		  if(timeFromTemplate)
			  defaultTime = new Array(d.getHours(),d.getMinutes(),d.getSeconds());
		  
		  if((!dateOK) && (!timeOK)) return; // je�eli b��dna jest zar�wno
												// data jak i czas nie r�b nic
		  
			
		
			
			
		if(timeSegmentsOK[0])
			d.setHours(sTime[0]+mod[1]);
		else 
			d.setHours(defaultTime[0]+mod[1]);
		
		if(timeSegmentsOK[1])
			d.setMinutes(sTime[1]+mod[2]);
		else 
			d.setMinutes(defaultTime[1]+mod[2]);
		
		if(timeSegmentsOK[2])
			d.setSeconds(sTime[2]);
		else 
			d.setSeconds(defaultTime[2]);
	  }

	  result_temp = d.getFullYear() + "-";
	  if((d.getMonth()+1)<10) result_temp += "0";
	  result_temp += (d.getMonth()+1) + "-";
	  if(d.getDate()<10) result_temp+="0";
	  result_temp += d.getDate();
	  
	  result = d.getFullYear() + "-";
	  if((d.getMonth()+1)<10) result += "0";
	  result += (d.getMonth()+1) + "-";
	  if(d.getDate()<10) result+="0";
	  result += d.getDate();
	  
	  if(modifier != null) {
		result += " ";
		if(d.getHours()<10) result+="0";
		result +=  d.getHours();
		result += ":";
		if(d.getMinutes()<10) result+="0";
		result += d.getMinutes();
		result += ":";
		if(d.getSeconds()<10) result+="0";
		result += d.getSeconds();
	  }
		
	  document.getElementById(fieldId).value = result;

	  if(!isNaN(numberOfCharsToTrim))
		  if(numberOfCharsToTrim<result.length) {
			  result = result.substring(0,numberOfCharsToTrim);
			  document.getElementById(fieldId).value = result;
		  }
	}

/**
 * Sprawdza i uzupe�nia podany czas
 * 
 * @param fieldId -
 *            Id pola z kt�rego pobiera format czasu i do kt�rego wpisuje wynik
 * @param modifier -
 *            'od' - ustawia domy�lny czas na 00:00:00 - 'do' - ustawia domy�lny
 *            czas na 23:59:59 - 'teraz' - ustawia domy�lny czas na czas bie��cy -
 *            ustalony czas formatu 'hh:mm:ss' - ustawia domyslny czas na podan�
 *            warto�� mo�emy u�ywa� "h", "m", "s" zamiast "hh","mm","ss"
 * @param numberOfCharsToTrim -
 *            [opcjonalny] do jakiej ilo�ci znak�w przyci�� �a�cuch wynikowy
 * 
 * W polu o Id podanym w parametrze podajemy czas formatu 'hh', 'hh:mm',
 * 'hh:mm:ss' je�eli podamy czas formatu 'hh' lub 'hh:mm' brakuj�ce
 * minuty/sekundy zostan� uzupe�nione z czasu domy�lnego mo�emy u�ywa� "h", "m",
 * "s" zamiast "hh","mm","ss" lub znacznik t oznaczaj�cy czas bie��cy
 * 
 * i/lub modyfikatory czasu (jeden lub oba) formatu - h +/- x gdzie x to liczba
 * godzin - m +/- x gdzie x to liczba minut je�eli modyfikatory czasu wyst�pi�
 * bez podania cz�onu czasu w�wczas automatycznie modyfikowany jest bie��cy czas
 * 
 */
function Time(fieldId,modifier,numberOfCharsToTrim) {
	  var d, str, s ="", t="";
	  d = new Date();
	  str = document.getElementById(fieldId).value;
	  
	  if(str == "") return;
	  
	  str = str.toLowerCase( );
	  var allowedTimeSeparators = new Array(":");
	  var allowedTemplates = new Array("h","m");
	  allowedTimeModifiersPlus = new Array("+");
	  allowedTimeModifiersMinus = new Array("-");
	  timeModifierPlus = "+";
	  timeModifierMinus = "-";
	  timeSeparator = ":";
	  tablica_temp=new Array();
	  errorMessageBadModifier = "Nieprawid�owy argument funkcji!";
	  var defaultTime = null;
	  var timeOK = false;
	  var timeSegmentsOK = new Array(false,false,false);
	  var defaultTimeSegmentsOK = new Array(false,false,false);
	  var sTime = new Array();
	  var timeSepIndex = -1;
	  var lastTimeSepIndex = -1;
	  var numberOfTimeSeps = 0;
	  var result = "";
	  var sValue;
	  var mod = new Array();
	  
	  if(modifier=="od") {
		  defaultTime = new Array(0,0,0);
	  }
	  else if(modifier=="do") {
		  defaultTime = new Array(23,59,59);
	  }
	  else if((modifier=="teraz")||(modifier==null)) {
		  defaultTime = new Array(d.getHours(),d.getMinutes(),d.getSeconds());
	  }
	  else if(modifier!=null) {
			tempTime = new Array(0,0,0);
			defaultTime = new Array(0,0,0);
			
			defaultTimeTablica = new Array();
			defaultTimeTablica=modifier.split(":");

// if(defaultTimeTablica.length==1)
// defaultTimeSegmentsOK = new Array(!timeSegmentsOK[0],false,false);
// else if(defaultTimeTablica.length==2)
// defaultTimeSegmentsOK = new
// Array(!timeSegmentsOK[0],!timeSegmentsOK[1],false);
// else if(defaultTimeTablica.length==3)
// defaultTimeSegmentsOK = new
// Array(!timeSegmentsOK[0],!timeSegmentsOK[1],!timeSegmentsOK[2]);
			
			for(var i=0; i<defaultTimeTablica.length; i++)
				if(defaultTimeSegmentsOK[i]) {
					  sValue = defaultTimeTablica[i];
					  firstDigitNonZero=0;
					  for(var j=0;j<sValue.length;j++){
						  if(sValue.charAt(j)=='0') {
							  firstDigitNonZero++;
						  }
						  else {
							  break;
						  }
					  }
					  if(firstDigitNonZero>=sValue.length) { // same zera
						  tempTime[i]=0;
					  }
					  else {
						  tempTime[i] = parseInt(sValue.substring(firstDigitNonZero));
						  if(isNaN(tempTime[i]))
							  defaultTimeSegmentsOK[i]=false;
						  else {
							  if(i==0)
								  if((tempTime[i]<0) || (tempTime[i]>23))
							    		defaultTimeSegmentsOK[i] = false;
								  else
									  defaultTime[i]=tempTime[i];
							  else
								  if((tempTime[i]<0) || (tempTime[i]>59))
							    		defaultTimeSegmentsOK[i] = false;
								  else
									  defaultTime[i]=tempTime[i];
						  }
							  
					  }
				}
			for(var i=0; i<defaultTimeSegmentsOK.length; i++)
				if(!defaultTimeSegmentsOK[i]) {
					result = errorMessageBadModifier;
					  document.getElementById(fieldId).value = result;
					  return;
				}
					
		}
	  
	  if(str.indexOf("t") != -1) {
		  defaultTime = new Array(d.getHours(),d.getMinutes(),d.getSeconds());
		  timeOK = true;
		  }

	  var pattern1;
	  var pattern2;
	  
	  for(var i=0; i<allowedTimeSeparators.length; i++) {
		  pattern1=allowedTimeSeparators[i];
		  pattern2=" "+timeSeparator+" ";
		  patternTemp = ">><<"
		  
		  while(str.indexOf(pattern1) != -1){
			  str=str.replace(pattern1,patternTemp);
		  }
		  while(str.indexOf(patternTemp) != -1){
			  str=str.replace(patternTemp,pattern2);
		  }
	  }
	  for(var i=0; i<allowedTimeModifiersPlus.length; i++) {
		  pattern1=allowedTimeModifiersPlus[i];
		  pattern2=" "+timeModifierPlus+" ";
		  patternTemp = ">><<"
		  
		  while(str.indexOf(pattern1) != -1){
			  str=str.replace(pattern1,patternTemp);
		  }
		  while(str.indexOf(patternTemp) != -1){
			  str=str.replace(patternTemp,pattern2);
		  }
	  }
	  for(var i=0; i<allowedTimeModifiersMinus.length; i++) {
		  pattern1=allowedTimeModifiersMinus[i];
		  pattern2=" "+timeModifierMinus+" ";
		  patternTemp = ">><<";
		  
		  while(str.indexOf(pattern1) != -1){
			  str=str.replace(pattern1,patternTemp);
		  }
		  while(str.indexOf(patternTemp) != -1){
			  str=str.replace(patternTemp,pattern2);
		  }
	  }
	  
	  var tablica_temp = str.split(" ");
	  var tablica = new Array();
	  itablica=-1;
	  for(var i=0; i<tablica_temp.length; i++) {
		  if(tablica_temp[i] != "") {
			  
			  var acceptedString = false;
			  
			  if(!acceptedString)
			  for(var j=0; j<allowedTimeSeparators.length; j++) {
				  if(tablica_temp[i] == allowedTimeSeparators[j])
					  acceptedString = true;
			  }
			  if(!acceptedString)
				  for(var j=0; j<allowedTimeModifiersPlus.length; j++) {
					  if(tablica_temp[i] == allowedTimeModifiersPlus[j])
						  acceptedString = true;
				  }
				  if(!acceptedString)
				  for(var j=0; j<allowedTimeModifiersMinus.length; j++) {
					  if(tablica_temp[i] == allowedTimeModifiersMinus[j])
						  acceptedString = true;
				  }
			  if(!acceptedString)
				  for(var j=0; j<allowedTemplates.length; j++) {
					  if(tablica_temp[i] == allowedTemplates[j])
						  acceptedString = true;
				  }
			  
			  if(!acceptedString) {
				  if(!isNaN(parseInt(tablica_temp[i])))
					  acceptedString = true;
			  }
			  
			  if(acceptedString) {
				  itablica++;
				  tablica[itablica] = tablica_temp[i];
		  	  }
		  } 
	  }
	  
	  result = "";
	  for(var i=0; i<tablica.length; i++) {
		  result += tablica[i] + "_";
	  }
	  document.getElementById(fieldId).value = result;
	  
	  // begin by dkesy - modyfikatory h i m
	  
	  for(var i=0; i<allowedTemplates.length; i++) {
		  mod[i]=0;
		  var wynik = 0;
		  var index;
		  for(index=0; index<tablica.length; index++) {
			  // szukaj "h", "m"
			  if(tablica[index].toLowerCase()==allowedTemplates[i].toLowerCase()){
				  
				  // if(wynik == 0) {
					  if(index<tablica.length-2){
						if(tablica[index+1]==timeModifierPlus) {
							wynik=1;
						}
						else if(tablica[index+1]==timeModifierMinus) {
							wynik=-1
						}
					  }
					  
					  if(wynik != 0){
						  var firstDigitNonZero=0;
						  for(var j=0;j<tablica[index+2].length;j++) {
							  if(tablica[index+2].charAt(j)=='0') {
								  firstDigitNonZero++;
							  }
							  else {
								  break;
							  }
						  }
						  if(firstDigitNonZero>=tablica[index+2].length) { // same
																			// zera
							  mod[i]=0;
						  }
						  else {
							  mod[i] = parseInt(tablica[index+2].substring(firstDigitNonZero));
						  }
						  
						  if(isNaN(mod[i])){
							  mod[i]=0;
							  wynik=0;
						  }
						  else {
							  mod[i]=mod[i] * wynik;
							  
							  // wyst�pi� modyfikator wi�c ustaw czas domy�lny
								// na bie��cy
							  defaultTime = new Array(d.getHours(),d.getMinutes(),d.getSeconds());
							  
							  // znalaz�e� to usu� liczbe i plus/minus
							  tablica_temp = new Array();
							  
							  for(var h=0; h<index; h++)
								  tablica_temp[h]=tablica[h];
							  
							  for(var h=index; h<tablica.length-3; h++)
								  tablica_temp[h]=tablica[h+3];
							  tablica=tablica_temp;
							  tablica_temp = new Array();
						  }
						  
					  }
				  // }
			  }
		  }
	  }
	  
	  // end by dkesy - mod h i m
	  
	  
	  
	  if(!timeOK) {
		  for(var i=0; i<tablica.length; i++) {
			  if(tablica[i]==timeSeparator) {
				  timeSepIndex = i;
				  break;
			  }
		  }
		  
		  sValue = new Array();
		  
		  if(timeSepIndex != -1) {
			  
			  var sValueIndex=0;
			  var timeTabIndex;
			  if(timeSepIndex==0)
				  timeTabIndex = 1;
			  else
				  timeTabIndex = timeSepIndex-1;
			  
			  while(timeTabIndex<tablica.length) {
				  
				  if(tablica[timeTabIndex]==timeSeparator) {
					  timeTabIndex++;
				  }
				  else if(isNaN(tablica[timeTabIndex])) {
					  break;
				  }
				  else {
					  sValue[sValueIndex] = tablica[timeTabIndex];
					  timeTabIndex++;
					  if(sValueIndex<3)
						  sValueIndex++;
					  else
						  break;
				  }
			  }
		  }
		  else { // brak separatora czasu, szukaj godziny
			  for(var i=0; i<tablica.length; i++) {
				  if(!isNaN(tablica[i])) {
					  sValue = new Array(tablica[i]);
					  break;
				  }
			  }
		  }
		  
		  timeOK=true;
		  for(var i=0; i<sValue.length; i++)
		  {
			  timeSegmentsOK[i] = true;
			  firstDigitNonZero=0;
			  for(var j=0;j<sValue[i].length;j++) {
				  if(sValue[i].charAt(j)=='0') {
					  firstDigitNonZero++;
				  }
				  else {
					  break;
				  }
			  }
			  if(firstDigitNonZero>=sValue[i].length) { // same zera
				  sTime[i]=0;
// firstDigitNonZero = 0;
			  }
			  else {
				  sTime[i] = parseInt(sValue[i].substring(firstDigitNonZero));
			  }
			  if(isNaN(sTime[i]))
				  timeSegmentsOK[i] = false;
			  else
				  if(i==0)
					  if((sTime[i]<0) || (sTime[i]>23)) {
						  timeOK = false;
						  timeSegmentsOK[i]=false;
					  }
				  else
					  if((sTime[i]<0) || (sTime[i]>59)) {
						  timeOK = false;
						  timeSegmentsOK[i]=false;
					  }
		  }
		  sValue = null;
	  }
		
		if(timeSegmentsOK[0])
			d.setHours(sTime[0]+mod[0]);
		else 
			d.setHours(defaultTime[0]+mod[0]);
		
		if(timeSegmentsOK[1])
			d.setMinutes(sTime[1]+mod[1]);
		else 
			d.setMinutes(defaultTime[1]+mod[1]);
		
		if(timeSegmentsOK[2])
			d.setSeconds(sTime[2]);
		else 
			d.setSeconds(defaultTime[2]);

		result = "";
		if(d.getHours()<10) result+="0";
		result +=  d.getHours();
		result += ":";
		if(d.getMinutes()<10) result+="0";
		result += d.getMinutes();
		result += ":";
		if(d.getSeconds()<10) result+="0";
		result += d.getSeconds();

		document.getElementById(fieldId).value = result;
		
		if(!isNaN(numberOfCharsToTrim))
			  if(numberOfCharsToTrim<result.length) {
				  result = result.substring(0,numberOfCharsToTrim);
				  document.getElementById(fieldId).value = result;
			  }
	}
