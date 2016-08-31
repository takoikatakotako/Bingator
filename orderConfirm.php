<?php
// 変数の初期化
$userName = "";
$adress = "";
$mailAdress = "";
$telNumber = "";

 
// POSTリクエストがあった時
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $userName = htmlspecialchars($_POST["id_UserName"], ENT_QUOTES);
  $adress = htmlspecialchars($_POST["id_Adress"], ENT_QUOTES);
  $mailAdress = htmlspecialchars($_POST["id_MailAdress"], ENT_QUOTES);
  $telNumber = htmlspecialchars($_POST["id_TelNumber"], ENT_QUOTES);

} else {
  echo "フォームページからアクセスしてください。";
  exit(1);
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>HTMLフォームのPOSTの受信テスト</title>
</head>
<body>
  送信されたデータは、<br />
  お名前:<?=$userName ?><br />
  住所:<?=$adress ?><br />
  メールアドレス:<?=$mailAdress ?><br />
  電話番号:<?=$telNumber ?><br />
  注文画像<br>
  <img src="img/testImages/rorigonShirt.png" alt="みんなの人気者カビゴン画像" width="300px" height="300px">
  <h3>ご注文はこれでいいっすか？</h3>

</body>
</html>