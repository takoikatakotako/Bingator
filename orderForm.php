<?php

  //名前の設定
  $name = null;
  if(isset($_POST['name'])){
      $name = $_POST['name'];
  }
  //住所の設定
  $add = null;
  if(isset($_POST['add'])){
      $add = $_POST['add'];
  }
  //電話番号の設定
  $num = null;
  if(isset($_POST['num'])){
      $num = $_POST['num'];
  }
  //メールの設定
  $mail = null;
  if(isset($_POST['mail'])) {
      $mail = $_POST['mail'];
  }

  //エラーメッセージを格納する配列を作成
  $error_message = array();

  $mail = htmlspecialchars($mail, ENT_QUOTES);

  //投稿ボタンが押されたら
  if(isset($_POST["submit"])){

    $name = htmlspecialchars($name, ENT_QUOTES);
    $add = htmlspecialchars($add, ENT_QUOTES);
    $num = htmlspecialchars($num, ENT_QUOTES);
    $mail = htmlspecialchars($mail, ENT_QUOTES);

    //名前のエラー設定
    if($name == '') {
      $error_message['name'] = "名前を記入してください";
    }elseif(mb_strlen($name) > 20){
      $error_message['name'] = '20文字以内で記入してください';
    }

    //住所のエラー設定
    if($add == '') {
      $error_message['add'] = '住所を入力してください';
    }elseif(mb_strlen($add) > 30){
      $error_message['add'] = '30文字以内で記入してください';
    }

    //電話番号のエラー設定
    if($num == '') {
      $error_message['num'] = '電話番号を記入してください';
    }elseif(mb_strlen($num) > 11){
      $error_message['num'] = '11文字以内で記入してください';
    }elseif(!preg_match("/^[0-9]+$/", $num)) {
      $error_message['num'] = '半角数字で記入してください';
    }

    //メールのエラー設定
    if($mail == '') {
      $error_message['mail'] = 'メールアドレスを記入してください';
    }elseif(mb_strlen($mail) > 40){
      $error_message['mail'] = '40文字以内で記入してください';
    }elseif(!preg_match("/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/", $mail)) {
      $error_message['mail'] = '半角英数字で記入してください';
    }
  }
?>

<!DOCTYPE>
<html lang="ja">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <link rel="stylesheet" type="text/css" href="css/orderForm.css">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
</head>
<body>

  <header>
    <h1>注文フォーム</h1>
  </header>

  <div class="container">

    <?php if(isset($_POST["complete"])){?>
      <h2>ご注文が完了しました。</h2>
    <?php 

      //メール送信
      mb_language("Japanese");
      mb_internal_encoding("UTF-8");
      $to      = $mail;;
      $subject = '注文承りました。';
      $message = '注文承りました。';
      $headers = 'From: info@bingater.com' . "\r\n";
      mb_send_mail($to, $subject, $message, $headers);
      }else{ 

    ?>

  <article>
    <form method="post" name="form1">
      <section class=graph>
        <table>
          <tr>
            <th scope="row"><p class="form">名前</p></th>
            <td>
            <?php if(!$_POST || (isset($_POST["submit"]) && !empty($error_message)) || isset($_POST["back"])){ ?>
              <input type="text" name="name" class="text" id="element1" value="<?php if(isset($namae)){ echo $name; } ?>" />
              <?php if(isset($error_message['name'])){ ?>
              <p class="error">
              <?php echo $error_message['name']; ?>
              </p>
            <?php }
            }else{ ?>
              <p class="correct">
              <?php echo $name; ?>
              </p>
            <?php } ?>
            </td>
          </tr>
          <tr>
            <th scope="row"><p class="form">住所</p></th>
            <td>
            <?php if(!$_POST || (isset($_POST["submit"]) && !empty($error_message)) || isset($_POST["back"])){ ?>
              <input type="text" name="add" class="text" id="element2" value="<?php if(isset($add)){ echo $add; } ?>" />
              <?php if(isset($error_message['add'])){ ?>
            <p class="error">
            <?php echo $error_message['add']; ?>
            </p>
            <?php }
            }else{ ?>
              <p class="correct">
              <?php echo $add; ?>
              </p>
            <?php } ?>
          </tr>
          <tr>
            <th scope="row"><p class="form">電話番号</p></th>
            <td>
            <?php if(!$_POST || (isset($_POST["submit"]) && !empty($error_message)) || isset($_POST["back"])){ ?>
              <input type="text" name="num" class="text" id="element2" value="<?php if(isset($num)){ echo $num; } ?>" />
              <?php if(isset($error_message['num'])){ ?>
            <p class="error">
            <?php echo $error_message['num']; ?>
            </p>
            <?php }
            }else{ ?>
              <p class="correct">
              <?php echo $num; ?>
              </p>
            <?php } ?>
          </tr>
          <tr>
            <th scope="row"><p class="form">メールアドレス</p></th>
            <td>
            <?php if(!$_POST || (isset($_POST["submit"]) && !empty($error_message)) || isset($_POST["back"])){ ?>
              <input type="text" name="mail" class="text" id="element2" value="<?php if(isset($mail)){ echo $mail; } ?>" />
              <?php if(isset($error_message['mail'])){ ?>
            <p class="error">
            <?php echo $error_message['mail']; ?>
            </p>
            <?php }
            }else{ ?>
              <p class="correct"><?php echo $mail; ?></p>
            <?php } ?>
          </tr>
        </table>
      </section>
      <?php if(!$_POST || (isset($_POST["submit"]) && !empty($error_message)) || isset($_POST["back"])){ ?>
      <section id="send">
        <!-- 最初の投稿画面-->
        <input id="submit_button" type="submit" value="送信する" name="submit" />
      </section>
      <section id="confirm">
      <?php }else{?>
        <!-- 確認画面-->
        <input id="back_button" type="submit" value="修正する" name="back" />
        <input id="complete_button" type="submit" value="送信する" name="complete" />
        <input type="hidden" name="mail" class="text" id="element2" value="<?php if(isset($mail)){ echo $mail; } ?>" />
      <?php } ?>
      </section>
    </form>
  </article>
  <?php } ?>
  </div>


  <footer></footer>

  </body>
</html>
