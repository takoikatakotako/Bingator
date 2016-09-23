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
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>かりゆしに〜びち</title>
  <link rel="stylesheet" href="css/normalize.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="shortcut icon" href="img/favicon.ico" />
  <script type="text/javascript" src="js/base.js"></script>
  <script type="text/javascript" src="js/form.js"></script>
</head>
<body>

<?php if(isset($_POST['editFile']) == false || isset($_POST['reviseEditPage']))  : ?>

  <div id="contents">
  <div id="leftContents">
    <div id="colorButton">
      <input id="colorWhite" type="image" src="img/layout/color/white.png" alt="ホワイト" onclick="changeColor('white')">
      <input id="colorPink" type="image" src="img/layout/color/pink.png" alt="ピンク" onclick="changeColor('pink')">
      <input id="colorBlue" type="image" src="img/layout/color/blue.png" alt="ブルー" onclick="changeColor('blue')">
      <input id="colorCream" type="image" src="img/layout/color/cream.png" alt="クリーム" onclick="changeColor('cream')">
      <input id="colorGreen" type="image" src="img/layout/color/green.png" alt="グリーン" onclick="changeColor('green')">
      <input id="colorOrange" type="image" src="img/layout/color/daidai.png" alt="オレンジ" onclick="changeColor('orange')">
    </div>
  </div>
    <div id="centerContents">
      <div id="canvasAndCanvas">
        <canvas id="htmlCanvas" ></canvas>
      </div>
    </div>

    <div id="rightContents">
      <div id="blackBorad">
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
          <div id="blackBord_img">
            <input id="img_1" type="image" src="img/stamp/button1/bingata_1.png" alt="img1" onclick="addImageCanvas('img_1')">
            <input id="img_2" type="image" src="img/stamp/button1/bingata_2.png" alt="img2" onclick="addImageCanvas('img_2')">
            <input id="img_3" type="image" src="img/stamp/button1/bingata_3.png" alt="img3" onclick="addImageCanvas('img_3')">
            <input id="img_4" type="image" src="img/stamp/button1/bingata_4.png" alt="img4" onclick="addImageCanvas('img_4')">
            <input id="img_5" type="image" src="img/stamp/button1/bingata_5.png" alt="img5" onclick="addImageCanvas('img_5')">
            <input id="img_6" type="image" src="img/stamp/button1/bingata_6.png" alt="img6" onclick="addImageCanvas('img_6')">
            <input id="img_7" type="image" src="img/stamp/button1/bingata_7.png" alt="img7" onclick="addImageCanvas('img_7')">
            <input id="img_8" type="image" src="img/stamp/button1/bingata_8.png" alt="img8" onclick="addImageCanvas('img_8')">
            <input id="img_9" type="image" src="img/stamp/button1/bingata_9.png" alt="img9" onclick="addImageCanvas('img_9')">
            <input id="img_10" type="image" src="img/stamp/button1/bingata_10.png" alt="img10" onclick="addImageCanvas('img_10')">
          </div>
          <div id="blackBord_side">
            <input id="pageup" type="image" src="img/layout/pageup.png" alt="前のページ" onclick="goPreviousPage()">
            <input id="pagedown" type="image" src="img/layout/pagedown.png" alt="次のページ" onclick="goNextPage()">
          </div>
        </div>
        <div id="blackBoard_under">
          <input id="arrow_lef" type="image" src="img/layout/mark_arrow_left.png" alt="左" onclick="moveArrow('left')">
          <input id="arrow_up" type="image" src="img/layout/mark_arrow_up.png" alt="上" onclick="moveArrow('up')">
          <input id="arrow_right" type="image" src="img/layout/mark_arrow_right.png" alt="右" onclick="moveArrow('right')">
          <input id="arrow_down" type="image" src="img/layout/mark_arrow_down.png" alt="下" onclick="moveArrow('down')">
          <input id="arrow_rotate" type="image" src="img/layout/mark_arrow_reload.png" alt="回転" onclick="">
          <input id="arrow_flip" type="image" src="img/layout/mark_arrow_uturn.png" alt="左右反転" onclick="">
          <input id="scale_up" type="image" src="img/layout/mark_scale_up.png" alt="拡大" onclick="scaleChange('up')">
          <input id="scale_down" type="image" src="img/layout/mark_scale_down.png" alt="縮小" onclick="scaleChange('down')">
        </div>
        <div id="under_button">
          <div id="deletButton">
            <input id="undo" type="image" src="img/layout/undo.png" alt="選択削除" onclick="deleteImageCanvas()">
            <input id="return_top" type="image" src="img/layout/return_top.png" alt="初期化" onclick="deleteAllImageCanvas()">
          </div>
          <div id="formButton">
            <form name="input_form" method="POST" class="form_page"　avtion="index.php">
              <input id="okBtn" type="image" src="img/layout/okBtn.png" alt="トップへ" onclick="Send()">
              <input type="hidden" name="editFile" id="editImgPath">
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

<?php endif; ?>

<!-- 完成画面の表示-->
<?php if(isset($_POST['editFile'])) : ?>
  <div id="contents">
    <div id="leftSendContents">
      <img id="canvathImage" src="img/layout/canvas_easel_without_top.png">
      <img id="createdPreview" src="<?php echo $previewIMG_src; ?>">
    </div>
    <div id="rightSendContents">
      <form name="input_form" method="POST" class="form_page"　avtion="index.php">
        <input type="hidden" name="completeFile" id="path">

        <a id="sentBtn" href="orderForm.php" title="注文画面へ">
          <img id ="sentBtnImage" src="img/layout/sentBtn.png">
        </a>

        <button id="modifyBtn" type="submit" name="reviseEditPage" onclick="Modify()">
          <img id ="modifyBtnImage" src="img/layout/modifyBtn.png">
        </button>
      </form>
    </div>
  </div>
<?php endif; ?>

</body>
</html>
