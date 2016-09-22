/*===============================================
変数・定数
===============================================*/
// Canvas内の横幅・縦幅(定数)
var SCREEN_WIDTH  = 450;
var SCREEN_HEIGHT = 340;

/* グローバル変数 */
var php_val = null;
// 現在のキャンバスナンバー
var currentCanvasNum = -1;
// ロードする画像パスの配列
var fileArray = [];
// ロードした画像の座標+横幅高さ
var xywhrf = [];
// 状態保存用の変数
// 画像パス配列
var previousFileArray = ["img/stamp/button1/bingata_1.jpg"];
// 画像座標配列
var previousXYWHRF = [{x: 0, y: 0, w: SCREEN_WIDTH, h: SCREEN_HEIGHT, r: 0, f: 0}];
// Canvas変数
var canvas = null;
var ctx = null;
// ボタン選択フラグ
var img_flg = 1;
// タブ選択フラグ
var tab_flg = 1;
// スクロールバーもどきフラグ(?正しくは現在表示している最初の画像の数値を表している)
var scroll_flg = 1;
// 戻しButtonを押したかフラグ
var is_backButton = 0;
// ドラッグ＆ドロップ機能の座標変数
var x, y, relX, relY;
// ドラッグしているかフラグ
var dragging = false;
// ドラッグしているオブジェクトNo
var draggingNo = 1;

/*===============================================
ブラウザ読み込み時の開始
===============================================*/
window.onload = function(){
  // ページ読み込み時に実行したい処理
  // Canvas要素
  canvas = document.getElementById('htmlCanvas');
  if ( ! canvas || ! canvas.getContext ) { return false; }
  ctx = canvas.getContext('2d');
  canvas.addEventListener('mousedown', onDown, false);
  canvas.addEventListener('mousemove', onMove, false);
  canvas.addEventListener('mouseup', onUp, false);
  addFirstImageCanvas();
  displayTab();
  displayImg();
  showImageCanvas();
};

/*===============================================
HTML側にクリックイベント
===============================================*/
/* 上部のスタンプ切り替えボタンイベント */
function button1Clicked() {
  img_flg = 1;
  scroll_flg = 1;
  // 画像の読み込み
  displayTab();
  displayImg();
}

function button2Clicked() {
  img_flg = 2;
  scroll_flg = 1;
  // 画像の読み込み
  displayTab();
  displayImg();
}

function button3Clicked() {
  img_flg = 3;
  scroll_flg = 1;
  // 画像の読み込み
  displayTab();
  displayImg();
}

function button4Clicked() {
  img_flg = 4;
  scroll_flg = 1;
  // 画像の読み込み
  displayTab();
  displayImg();
}

function button5Clicked() {
  img_flg = 5;
  scroll_flg = 1;
  // 画像の読み込み
  displayTab();
  displayImg();
}

/* タブクリックイベント */
function tab1Clicked(){
  scroll_flg = 1;
  tab_flg = 1;
}

function tab2Clicked(){
  scroll_flg = 1;
  tab_flg = 2;
}

function tab3Clicked(){
  scroll_flg = 1;
  tab_flg = 3;
}

/* 前後ページ切り替え */
function goNextPage(){
  scroll_flg += 10;
  displayImg();
  showImageCanvas();
}

function goPreviousPage(){
  scroll_flg -= 10;
  displayImg();
  showImageCanvas();
}

/* Canvasで作成した画像をBase64に変換し、サーバーへ送る */
// まだBase64に変換する部分しか実装していない
// 参考URL : http://qiita.com/0829/items/a8c98c8f53b2e821ac94
function Send(){
  //Base64への変換
  var base64 = this.canvas.toDataURL('image/png');
  // 以下にサーバーへ送る等のコードが必要
  document.getElementById("editImgPath").value = base64;
}

/*===============================================
画像表示系
===============================================*/
/* タブ・スクロール・画像フラグを利用し、存在する画像を表示・存在しない画像は表示しない */
// 問題
// 1 : ローカルで動作確認は出来ているが、サーバに置いた場合はどうなるんでしょうか状態
// 2 : 画像パスを無理矢理文字列を作り出して取得している(ディレクトリ内の画像を全取得等はjsじゃ厳しい...?)
function displayImg(){
  // タブの表示
  var count = 1;
  for(var i = scroll_flg; i < scroll_flg + 10; i++){
    // srcの決定
    var newImage = new Image();
    var img_str = "img_" + count;
    // 遅延評価...?
    newImage.src = getImgSrc(i);

    // 画像がある場合
    if(checkImgEmpty(newImage.src) == 1){
      document.getElementById(img_str).src = newImage.src;
      document.getElementById(img_str).style.display = "";
    }else{
    // 画像が無い場合
      document.getElementById(img_str).src = "#";
      document.getElementById(img_str).style.display = "none";
    }

    count++;
  }

  // 表示した画像達の前後に画像が控えてるか確認し、表示するか決定
  // 前
  previousImg = new Image();
  previousImg.src = getImgSrc(scroll_flg-1);

  if(checkImgEmpty(previousImg.src) == 1){
    document.getElementById("pageup").style.display = "";
  }else{
    document.getElementById("pageup").style.display = "none";
  }

  // 次
  nextImg = new Image();
  nextImg.src = getImgSrc(scroll_flg+10);

  if(checkImgEmpty(nextImg.src) == 1){
    document.getElementById("pagedown").style.display = "";
  }else{
    document.getElementById("pagedown").style.display = "none";
  }

}

/* タブの表示 */
function displayTab(){
  switch(img_flg){
    case 1:
      document.getElementById("tab1").src = "img/layout/make.png";
      document.getElementById("tab1").style.display = "";
      document.getElementById("tab2").src = "img/layout/template.png";
      document.getElementById("tab2").style.display = "";
      document.getElementById("tab3").src = "#";
      document.getElementById("tab3").style.display = "none";
      break;
    case 5:
      document.getElementById("tab1").src = "img/layout/hiragana.png";
      document.getElementById("tab1").style.display = "";
      document.getElementById("tab2").src = "img/layout/katakana.png";
      document.getElementById("tab2").style.display = "";
      document.getElementById("tab3").src = "img/layout/alphabet.png";
      document.getElementById("tab3").style.display = "";
      break;
    case 2:
    case 3:
    case 4:
      document.getElementById("tab1").src = "#";
      document.getElementById("tab1").style.display = "none";
      document.getElementById("tab2").src = "#";
      document.getElementById("tab2").style.display = "none";
      document.getElementById("tab3").src = "#";
      document.getElementById("tab3").style.display = "none";
      break;
  }
}

/* 画像存在するかのチェック */
function checkImgEmpty(src){
    var checkImage = new Image();
    // 遅延評価...?
    checkImage.src = src;
    // 画像がある場合
    if(loadXMLHttp(src) == 200){
      return 1;
    }else{
      return 0;
    }

}

/* XMLHttpRequest */
// onload&onerrorは最後に評価するっぽく、それだと画像あるなし判別ムズカシイ
function loadXMLHttp(_url){
  var xhr;
  xhr = new XMLHttpRequest();
  xhr.open("HEAD", _url, false);  //同期モード
  xhr.send(null);
  return xhr.status;
}

/* 画像ファイルのパスを取得(文字列を挿入して取得してるので不安材料たっぷり) */
function getImgSrc(img_num){
  var src = "";
  switch(img_flg){
    case 1:
      src = "img/stamp/button" + img_flg + "/bingata_" + img_num + ".jpg";
      break;
    case 2:
      src = "img/stamp/button" + img_flg + "/img_" + img_num + ".png";
      break;
    case 3:
      src = "img/stamp/button" + img_flg + "/img_" + img_num + ".png";
      break;
    case 4:
      src = "img/stamp/button" + img_flg + "/animal-" + img_num + ".png";
      break;
    case 5:
      src = "img/stamp/button" + img_flg + "/img_" + img_num + ".png";
      break;
  }
  return src;
}

/*===============================================
画像移動系
===============================================*/
/* arrowを押した時に配列最後の座標を移動させる。 */
// これめちゃくちゃめんどくさい
function moveArrow(arrow){
  switch(arrow){
    case 'left':
      if(xywhrf[draggingNo]['x'] >= 0){
        xywhrf[draggingNo]['x'] += -5;
      }
      break;
    case 'right':
      if(xywhrf[draggingNo]['x'] + xywhrf[draggingNo]['w'] <= SCREEN_WIDTH){
        xywhrf[draggingNo]['x'] += +5;
      }
      break;
    case 'up':
      if(xywhrf[draggingNo]['y'] >= 0){
        xywhrf[draggingNo]['y'] += -5;
      }
      break;
    case 'down':
      if(xywhrf[draggingNo]['y'] + xywhrf[draggingNo]['h'] <= SCREEN_HEIGHT){
        xywhrf[draggingNo]['y'] += +5;
      }
      break;
  }
  showImageCanvas();
}

/* クリックした座標を取得し、配列末尾の画像座標変更 */
// マウスイベントを設定
// <canvas id="htmlCanvas" >のonclickに実装すると作動
function moveClick(screenX, screenY){
  // 結果の書き出し
  if(screenX >= 0 && screenX + xywhrf[draggingNo]['w'] <= SCREEN_WIDTH && screenY >= 0 && screenY + xywhrf[draggingNo]['h'] <= SCREEN_HEIGHT){
    // alert('screen=' + screenX + ',' + screenY);
    xywhrf[draggingNo]['x'] = screenX;
    xywhrf[draggingNo]['y'] = screenY;
    showImageCanvas();
  }
}

function onDown(e) {
  // キャンバスの左上端の座標を取得
  var offsetX = canvas.getBoundingClientRect().left;
  var offsetY = canvas.getBoundingClientRect().top;

  // マウスが押された座標を取得
  x = e.clientX - offsetX;
  y = e.clientY - offsetY;

  // オブジェクト上の座標かどうかを判定
  for(var i　=　fileArray.length-1; i>0; i--){
    if (xywhrf[i]['x'] < x && (xywhrf[i]['x'] + xywhrf[i]['w']) > x && xywhrf[i]['y'] < y && (xywhrf[i]['y'] + xywhrf[i]['h']) > y) {
      dragging = true; // ドラッグ開始
      relX = xywhrf[i]['x']  - x;
      relY = xywhrf[i]['y']  - y;
      draggingNo = i;
      break;
    }
  }

}

function onMove(e) {
  // キャンバスの左上端の座標を取得
  var offsetX = canvas.getBoundingClientRect().left;
  var offsetY = canvas.getBoundingClientRect().top;

  // マウスが移動した先の座標を取得
  x = e.clientX - offsetX;
  y = e.clientY - offsetY;

  // ドラッグが開始されていればオブジェクトの座標を更新して再描画
  if (dragging　&& x + relX >= 0 && x + relX + xywhrf[draggingNo]['w'] <= SCREEN_WIDTH && y + relY >= 0 && y + relY + xywhrf[draggingNo]['h'] <= SCREEN_HEIGHT) {
    xywhrf[draggingNo]['x'] = x + relX;
    xywhrf[draggingNo]['y'] = y + relY;
    showImageCanvas();
  }
}

function onUp(e) {
  dragging = false; // ドラッグ終了
}

/* 画像を30度回転させる */
function rotateImg(){
  var rotate_num = 30;
  xywhrf[draggingNo]['r'] += rotate_num;
  if(xywhrf[draggingNo]['w'] >= 360) xywhrf[draggingNo]['w'] -= 360;
  showImageCanvas();
}

/*===============================================
画像サイズ変更系
===============================================*/
// 画像サイズの拡大・縮小
function scaleChange(isUp){
  // 拡大・縮小するサイズxywhrf[draggingNo]['x']xywhrf[draggingNo]['x']
  var scale_num = 5;
  if(isUp == 'up'){
    // 拡大処理
    if(xywhrf[draggingNo]['x'] + xywhrf[draggingNo]['w'] + scale_num  <= SCREEN_WIDTH && xywhrf[draggingNo]['y'] + xywhrf[draggingNo]['h']  + scale_num <= SCREEN_HEIGHT){
      xywhrf[draggingNo]['w'] += scale_num;
      xywhrf[draggingNo]['h'] += scale_num;
    }
  }else{
    if(xywhrf[draggingNo]['w'] - scale_num > 0 && xywhrf[draggingNo]['y'] - scale_num > 0){
      xywhrf[draggingNo]['w'] -= scale_num;
      xywhrf[draggingNo]['h'] -= scale_num;
    }
  }
  // 再描写
  showImageCanvas();
}


/*===============================================
画像削除系
===============================================*/
/* 選択削除 */
function deleteImageCanvas(){
  if( fileArray.length <= 2 && draggingNo == 1){return false;}
  if(draggingNo == fileArray.length){draggingNo += -1;}
  fileArray.splice(draggingNo,1);
  xywhrf.splice(draggingNo,1);
  showImageCanvas();
}

/* 全削除 */
function deleteAllImageCanvas(){
  // if( fileArray.length == 0){return false;}
  fileArray = [];
  xywhrf = [];
  addFirstImageCanvas();
  showImageCanvas();
}

/*===============================================
画像追加系
===============================================*/
/* 入力した画像をfileArray配列に挿入する。 */
function addImageCanvas(img){
  var img_file = new Image();
  img_file.src = document.getElementById(img).src;
  if ( !img_file.src ) { return false; }
  var width  = img_file.width;
  var height = img_file.height;
  if(img_flg == 1){

    fileArray[0] = img_file.src;
    xywhrf[0] = {x: 0, y: 0, w: width, h: height, r: 0, f: 0};
  }else{
    fileArray.push(img_file.src);
    xywhrf.push({x: 0, y: 0, w: width, h: height, r: 0, f: 0});
  }
  showImageCanvas();
}

/* 最初に画像挿入する(テスト) */
function addFirstImageCanvas(){
  var img_file_1 = new Image();
  var img_file_2 = new Image();
  img_file_1.src = "img/stamp/button1/bingata_1.jpg";
  img_file_2.src = image_src;
  if ( !img_file_1.src && !img_file_2.src  ) { return false; }
  var width_1  = img_file_1.width;
  var height_1 = img_file_1.height;
  var width_2  = img_file_2.width;
  var height_2 = img_file_2.height;
  fileArray[0] = img_file_1.src;
  xywhrf[0] = {x: 0, y: 0, w: width_1, h: height_1, r: 0, f: 0};
  fileArray[1] = img_file_2.src;
  xywhrf[1] = {x: 0, y: 0, w: width_2, h: height_2, r: 0, f: 0};
  showImageCanvas();
}

/*===============================================
canvasに作成画像出力
===============================================*/
/* 画像表示系 */
function showImageCanvas(){
  // ロードする画像配列の長さ
  var numFiles = fileArray.length;
  var loadedCount = 0;
  var imageObjectArray = [];

  is_backButton = 0;
  // 画像のロード
  function loadImages(){
    var imgObj = new Image();
    imgObj.addEventListener('load',
      function(){
        loadedCount++;
        imageObjectArray.push(imgObj);
        // 画像数とロード数が一致しているか
        // 再帰的にロードと描写を行う
        if(numFiles === loadedCount){
          drawImage();
        }else{
          loadImages();
        }
      },
      false
      );
    imgObj.src = fileArray[imageObjectArray.length];
  }

  // 画像の描画
  function drawImage(){
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;

    for(var i in imageObjectArray){
      if(xywhrf[i]['r'] != 0){
        var rad = xywhrf[i]['r'] * Math.PI / 180;
        ctx.setTransform(Math.cos(rad), Math.sin(rad), -Math.sin(rad), Math.cos(rad), 0, 0 );
      }

      if(xywhrf[i]['f'] != 0){
        // 左右反転
        ctx.scale(-1,1);
      }
      ctx.drawImage(imageObjectArray[i], xywhrf[i]['x'], xywhrf[i]['y'], xywhrf[i]['w'], xywhrf[i]['h']);
      imageObjectArray[i] = null;
    }




  // Imageオブジェクトを生成 
  var img = new Image();
  img.src = "img/layout/shirt_omote.png?" + new Date().getTime();
  // 画像が読み込まれるのを待ってから処理を続行 
  img.onload = function() {
    ctx.drawImage(img, 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  }

/*
    //色を指定する
    ctx.strokeStyle = 'rgb(00,00,255)'; //枠線の色は青
    ctx.fillStyle = 'rgb(255,00,00)'; //塗りつぶしの色は赤


      ctx.strokeStyle = '#009900';
  ctx.strokeRect(50, 50, 200, 200);
    //左から200上から80の位置に、幅100高さ50の四角の枠線を描く
    ctx.strokeRect(200,80,100,50);
    //左から150上から75の位置に、半径60の半円を反時計回り（左回り）で描く
    ctx.arc(150,75,60,Math.PI*1,Math.PI*2,true);
*/
  }

  // 画像のロード・描写実行
  if(fileArray.length == 0){
    ctx.beginPath();
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    ctx.fill();
  }else{
    loadImages();
  }


}



