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



  mb_language("Japanese");
  mb_internal_encoding("UTF-8");

  $to      = $mailAdress;
  $subject = '注文受けたで';
  $message = '注文受けました。';
  $headers = 'From: info@bingater.com' . "\r\n";

  mb_send_mail($to, $subject, $message, $headers);

} else {
  echo "フォームページからアクセスしてください。";
  exit(1);
}
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Bingater | 注文完了しました</title>
  <link rel="stylesheet" href="">
</head>
<body>


  <h2>注文確定しました！メール送信しました！！</h2>

</body>
</html>