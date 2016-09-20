<?php
  // POSTされた情報を残す。
  session_start();
  /*===============================================
  使用する変数
  ===============================================*/
  // アップロード画像ソース
  $uploadIMG_src = null;
  // プレビュー画像ソース
  $previewIMG_srcc = null;

  /*===============================================
  POSTされたデータ
  ===============================================*/
  if(isset($_POST['uploadFile'])){
    //その中に画像パスがあるか検索します
    $uploadIMG_src = $_POST['uploadFile'];
    $_SESSION['uploadFile'] = $_POST['uploadFile'];
  }elseif(isset($_SESSION['uploadFile'])){
    $uploadIMG_src = $_SESSION['uploadFile'];
  }

  if(isset($_POST['editFile'])){
    //その中に画像パスがあるか検索します
    $previewIMG_src = $_POST['editFile'];
    $_SESSION['editFile'] = $_POST['editFile'];
  }elseif(isset($_SESSION['editFile'])){
    $previewIMG_src = $_SESSION['editFile'];
  }


  // 画像のリサイズ
  if(isset($_POST['uploadFile'])){
    $new_width = 100;

    // 元画像のファイルサイズを取得
    list($original_width, $original_height) = getimagesize($uploadIMG_src);

    //元画像の比率を計算し、高さを設定
    $proportion = $original_width / $original_height;
    $new_height = $new_width / $proportion;

    //高さが幅より大きい場合は、高さを幅に合わせ、横幅を縮小
    if($proportion < 1){
        $new_height = $new_width;
        $new_width = $new_width * $proportion;
    }

    $_str = substr( $uploadIMG_src , 22 , strlen($uploadIMG_src)-22 );
    // ↓64baseデコード
    $decoded = base64_decode($_str);

    // コンテントタイプを指定
    header('Content-Type: image/jpeg');

    $resized = imagecreatetruecolor($new_width,$new_height);
    $decoded = imagecreatefromstring($decoded);
    // imagecopyresampled($resized, $decoded, 0, 0, 0, 0, $new_width, $new_height, $width, $height);
    // 元画像から再サンプリング
    ImageCopyResampled($resized, $decoded,0,0,0,0,$new_width,$new_height,$original_width,$original_height);

        // メモリを開放する
    imagedestroy($new_image);
    imagedestroy($original_image);

    // 出力
    //imagejpeg($resized, null, 100);

    // preg_match('/data:image\/(.*);/', $uploadIMG_src, $_type);;
    // $file_type = $_type[1];
    // if ($file_type === "jpg" || $file_type === "jpeg") {

    //     $original_image = ImageCreateFromJPEG($uploadIMG_src); //JPEGファイルを読み込む
    //     $new_image = ImageCreateTrueColor($new_width, $new_height); // 画像作成

    // } elseif ($file_type === "gif") {

    //     $original_image = ImageCreateFromGIF($uploadIMG_src); //GIFファイルを読み込む
    //     $new_image = ImageCreateTrueColor($new_width, $new_height); // 画像作成

    //     /* ----- 透過問題解決 ------ */
    //     $alpha = imagecolortransparent($original_image);  // 元画像から透過色を取得する
    //     imagefill($new_image, 0, 0, $alpha);       // その色でキャンバスを塗りつぶす
    //     imagecolortransparent($new_image, $alpha); // 塗りつぶした色を透過色として指定する

    // } elseif ($file_type === "png") {

    //     $original_image = ImageCreateFromPNG($uploadIMG_src); //PNGファイルを読み込む
    //     $new_image = ImageCreateTrueColor($new_width, $new_height); // 画像作成

    //     /* ----- 透過問題解決 ------ */
    //     imagealphablending($new_image, false);  // アルファブレンディングをoffにする
    //     imagesavealpha($new_image, true);       // 完全なアルファチャネル情報を保存するフラグをonにする

    // } else {
    //     // 何も当てはまらなかった場合の処理は書いてませんので注意！
    //     return;

    // }

    // // 元画像から再サンプリング
    // ImageCopyResampled($new_image,$original_image,0,0,0,0,$new_width,$new_height,$original_width,$original_height);

    // // 画像をブラウザに表示
    // if ($file_type === "jpg" || $file_type === "jpeg") {
    //     ImageJPEG($new_image);
    // } elseif ($file_type === "gif") {
    //     ImageGIF($new_image);
    // } elseif ($file_type === "png") {
    //     ImagePNG($new_image);
    // }

 // }


?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Bingator</title>
  <link rel="stylesheet" href="css/normalize.css">
  <link rel="stylesheet" href="css/base.css">
  <script type="text/javascript">
    // 緊急処置・セキュリティ面からも推奨不可
    var image_src = "<?php echo $uploadIMG_src; ?>";
  </script>
  <script type="text/javascript" src="js/base.js"></script>
  <script type="text/javascript" src="js/form.js"></script>
</head>
<body>

<?php if(isset($_POST['uploadFile']) == false && isset($_POST['editFile']) == false && isset($_POST['reviseEditPage']) == false) : ?>
  <div id="contents">
    <div id="input_formDiv">
      <form name="input_form"  method="POST" class="form_page"　avtion="index.php" enctype="multipart/form-data">
        <!-- accept要素を写真限定にしたいが機能してないっぽい -->
        <input type="file" name="image" id="image_file"　accept="image/*">
        <input type="hidden" name="uploadFile" id="path">
        <input type="submit" name="send" value="あっぷろ～ど">
      </form>
    </div>

    <img id="preview">
  </div>
<?php endif; ?>

<?php if(isset($_POST['uploadFile']) || isset($_POST['reviseEditPage'])) : ?>




  <div id="contents">
    <div id="leftContents">
      <div id="logo">
        <img id="logoImage" src="/img/layout/bingatorLogo.png" alt="ロゴ">
      </div>

      <div id="canvasAndCanvas">
        <img id="canvasImage" src="/img/layout/canvas_easel.png" alt="キャンバス">
        <canvas id="htmlCanvas" ></canvas>
      </div>
    </div>

    <div id="rightContents">

      <img id="blackBorad" src="img/layout/bunbougu_kokuban_edited2.png" alt="黒板">
      <div id="blackBorad_top">
        <input id="button1" type="image" src="img/layout/num_1.png" alt="背景" onclick="button1Clicked()">
        <input id="button2" type="image" src="img/layout/num_2.png" alt="花"  onclick="button2Clicked()">
        <input id="button3" type="image" src="img/layout/num_3.png" alt="海の生き物"  onclick="button3Clicked()">
        <input id="button4" type="image" src="img/layout/num_4.png" alt="陸の生き物"  onclick="button4Clicked()">
        <input id="button5" type="image" src="img/layout/num_5.png" alt="文字"  onclick="button5Clicked()">
      </div>

      <div id="blackBorad_tab">
        <input id="tab1" type="image" src="img/layout/make.png" alt="タブ1" onclick="tab1Clicked()">
        <input id="tab2" type="image" src="img/layout/template.png" alt="タブ2"  onclick="tab2Clicked()">
        <input id="tab3" type="image" src="#" alt="タブ3"  onclick="tab3Clicked()">
      </div>
      <div id="blackBord_center">
        <input id="img_1" type="image" src="img/stamp/button1/bingata_1.jpg" alt="img1" onclick="addImageCanvas('img_1')">
        <input id="img_2" type="image" src="img/stamp/button1/bingata_2.jpg" alt="img2" onclick="addImageCanvas('img_2')">
        <input id="img_3" type="image" src="img/stamp/button1/bingata_3.jpg" alt="img3" onclick="addImageCanvas('img_3')">
        <input id="img_4" type="image" src="img/stamp/button1/bingata_4.jpg" alt="img4" onclick="addImageCanvas('img_4')">
        <input id="img_5" type="image" src="img/stamp/button1/bingata_5.jpg" alt="img5" onclick="addImageCanvas('img_5')">
        <input id="img_6" type="image" src="img/stamp/button1/bingata_6.jpg" alt="img6" onclick="addImageCanvas('img_6')">
        <input id="img_7" type="image" src="img/stamp/button1/bingata_7.jpg" alt="img7" onclick="addImageCanvas('img_7')">
        <input id="img_8" type="image" src="img/stamp/button1/bingata_8.jpg" alt="img8" onclick="addImageCanvas('img_8')">
        <input id="img_9" type="image" src="img/stamp/button1/bingata_9.jpg" alt="img9" onclick="addImageCanvas('img_9')">
        <input id="img_10" type="image" src="img/stamp/button1/bingata_10.jpg" alt="img10" onclick="addImageCanvas('img_10')">
      </div>
      <div id="blackBord_side">
        <input id="pageup" type="image" src="img/layout/pageup.png" alt="前のページ" onclick="goPreviousPage()">
        <input id="pagedown" type="image" src="img/layout/pagedown.png" alt="次のページ" onclick="goNextPage()">
      </div>
      <div id="blackBoard_under">
        <input id="arrow_lef" type="image" src="img/layout/mark_arrow_left.png" alt="左" onclick="moveArrow('left')">
        <input id="arrow_up" type="image" src="img/layout/mark_arrow_up.png" alt="上" onclick="moveArrow('up')">
        <input id="arrow_right" type="image" src="img/layout/mark_arrow_right.png" alt="右" onclick="moveArrow('right')">
        <input id="arrow_down" type="image" src="img/layout/mark_arrow_down.png" alt="下" onclick="moveArrow('down')">
        <input id="arrow_rotate" type="image" src="img/layout/mark_arrow_reload.png" alt="回転" onclick="rotateImg()">
        <input id="arrow_flip" type="image" src="img/layout/mark_arrow_uturn.png" alt="左右反転" onclick="">
        <input id="scale_up" type="image" src="img/layout/mark_scale_up.png" alt="拡大" onclick="scaleChange('up')">
        <input id="scale_down" type="image" src="img/layout/mark_scale_down.png" alt="縮小" onclick="scaleChange('down')">
      </div>
      <div id="under_button">
        <input id="undo" type="image" src="img/layout/undo.png" alt="選択削除" onclick="deleteImageCanvas()">
        <input id="return_top" type="image" src="img/layout/return_top.png" alt="初期化" onclick="deleteAllImageCanvas()">
        <form name="input_form" method="POST" class="form_page"　avtion="index.php">
          <input id="okBtn" type="image" src="img/layout/okBtn.png" alt="トップへ" onclick="Send()">
          <input type="hidden" name="editFile" id="editImgPath">
        </form>

      </div>
    </div>



  </div>

<?php endif; ?>

<?php if(isset($_POST['editFile'])) : ?>
  <div id="contents">
    <img id="createdPreview" src="<?php echo $previewIMG_src; ?>">
    <form name="input_form" method="POST" class="form_page"　avtion="index.php">
      <input type="hidden" name="completeFile" id="path">
      <input type="submit" name="reviseEditPage" value="修正する">
      <input type="submit" name="sendDB" value="送信する">
    </form>
  </div>
<?php endif; ?>



<p><?php print_r($resized); ?></p>
<p><?php echo $uploadIMG_src; ?></p>


</body>
</html>
