<?php
// Ustawienie lokalizacji docelowej przekierowania
$targetLocation = './ks-sew/servlet/auth/login.php';

// Przekierowanie z użyciem nagłówka HTTP
header("Location: $targetLocation");
exit; // Zakończenie skryptu, aby upewnić się, że nic więcej się nie wykona
?>