function KSSewPageSettings() {
	var isIE = /*@cc_on!@*/false || !!document.documentMode;
	if (isIE) {
		document.write("Panel administracyjny KS-SEW nie jest obsługiwany w przeglądarce Internet Explorer")
	}

	if (document.forms[0].FFFRAB0120login.value != '') {
		document.forms[0].FFFRAB0120pasw.focus();
	} else {
		document.forms[0].FFFRAB0120login.focus();
	}
}