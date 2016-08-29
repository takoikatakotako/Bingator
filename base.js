// マウスイベントの設定

// グローバル変数
// ロードする画像パスの配列
var fileArray = ["img/stamp/button1/bingata_1.jpg"];
// ロードした画像の座標+横幅高さ
var xywh = [{x: 0, y: 0, w: 450, h: 340}];
// Canvas変数
var canvas = null;
// ボタン選択フラグ
var img_flg = 1;

window.onload = function(){
  // ページ読み込み時に実行したい処理
  showImageCanvas();
}

// HTML側にクリックイベント記述
function button1Clicked() {
  // alert("ボタン1が押されたよ");
  img_flg = 1;
  document.getElementById("img_1").src = "img/stamp/button1/bingata_1.jpg";
  document.getElementById("img_2").src = "img/stamp/button1/bingata_2.jpg";
  document.getElementById("img_3").src = "img/stamp/button1/bingata_3.jpg";
  document.getElementById("img_4").src = "img/stamp/button1/bingata_4.jpg";
  document.getElementById("img_5").src = "img/stamp/button1/bingata_5.jpg";
  document.getElementById("img_6").src = "img/stamp/button1/bingata_6.jpg";
  document.getElementById("img_7").src = "img/stamp/button1/bingata_7.jpg";
  document.getElementById("img_8").src = "img/stamp/button1/bingata_8.jpg";
  document.getElementById("img_9").src = "img/stamp/button1/bingata_9.jpg";
  document.getElementById("img_10").src = "img/stamp/button1/bingata_10.jpg";
}

function button2Clicked() {
  // alert("ボタン２が押されたよ");
  img_flg = 2;
  document.getElementById("img_1").src = "img/stamp/button2/img_1.png";
  document.getElementById("img_2").src = "img/stamp/button2/img_2.png";
  document.getElementById("img_3").src = "img/stamp/button2/img_3.png";
  document.getElementById("img_4").src = "img/stamp/button2/img_4.png";
  document.getElementById("img_5").src = "img/stamp/button2/img_5.png";
  document.getElementById("img_6").src = "img/stamp/button2/img_6.png";
  document.getElementById("img_7").src = "img/stamp/button2/img_7.png";
  document.getElementById("img_8").src = "img/stamp/button2/img_8.png";
  document.getElementById("img_9").src = "img/stamp/button2/img_9.png";
  document.getElementById("img_10").src = "img/stamp/button2/img_10.png";
}

function button3Clicked() {
  img_flg = 3;
  alert("ボタン３が押されたよ");
}

function button4Clicked() {
  img_flg = 4;
  alert("ボタン４が押されたよ");
}

function button5Clicked() {
  img_flg = 5;
  alert("ボタン５が押されたよ");
}

// 画像移動系
// arrowを押した時に配列最後の座標を移動させる。
// これめちゃくちゃめんどくさい
function MoveArrow(arrow){
  switch(arrow){
    case 'left':
      if(xywh[xywh.length - 1]['x'] >= 0){
        xywh[xywh.length - 1]['x'] += -5;
      }
      break;
    case 'right':
      if(xywh[xywh.length - 1]['x'] + xywh[xywh.length - 1]['w'] <= 450){
        xywh[xywh.length - 1]['x'] += +5;
      }
      break;
    case 'up':
      if(xywh[xywh.length - 1]['y'] >= 0){
        xywh[xywh.length - 1]['y'] += -5;
      }
      break;
    case 'down':
      if(xywh[xywh.length - 1]['y'] + xywh[xywh.length - 1]['h'] <= 340){
        xywh[xywh.length - 1]['y'] += +5;
      }
      break;
  }
  showImageCanvas();
}

// クリックした座標を取得し、配列末尾の画像座標変更
// マウスイベントを設定
function moveClick(screenX, screenY){
  // 結果の書き出し
  if(screenX >= 0 && screenX + xywh[xywh.length - 1]['w'] <= 450 && screenY >= 0 && screenY + xywh[xywh.length - 1]['h'] <= 340){
    // alert('screen=' + screenX + ',' + screenY);
    xywh[xywh.length - 1]['x'] = screenX;
    xywh[xywh.length - 1]['y'] = screenY;
    showImageCanvas();
  }
}


// 画像削除系
// 最後に更新した画像を削除
function deleteImageCanvas(){
  // if( fileArray.length == 0){return false;}
  fileArray.pop();
  xywh.pop();
  showImageCanvas();
}

// 内部処理関数
// 入力した画像をfileArray配列に挿入する。
function addImageCanvas(img){
  var img_file = new Image();
  img_file.src = document.getElementById(img).src;
  if ( !img_file.src ) { return false; }
  var width  = img_file.width;
  var height = img_file.height;
  if(img_flg == 1){
    fileArray[0] = img_file.src;
    xywh[0] = {x: 0, y: 0, w: width, h: height};
  }else{
    fileArray.push(img_file.src);
    xywh.push({x: 0, y: 0, w: width, h: height});
  }
  showImageCanvas();
}

// canvasに作成画像出力
function showImageCanvas(){
  // ロードする画像配列の長さ
  var numFiles = fileArray.length;
  var loadedCount = 0;
  var imageObjectArray = [];
  // Canvas要素
  canvas = document.getElementById('htmlCanvas');
  if ( ! canvas || ! canvas.getContext ) { return false; }
  var ctx = canvas.getContext('2d');

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
    canvas.width = 512;
    canvas.height = 512;
    for(var i in imageObjectArray){
      ctx.drawImage(imageObjectArray[i], xywh[i]['x'], xywh[i]['y'], xywh[i]['w'], xywh[i]['h']);
      imageObjectArray[i] = null;
    }
  }

  // 画像のロード・描写実行
  loadImages();

}

// Canvasで作成した画像をBase64に変換し、サーバーへ送る
// まだBase64に変換する部分しか実装していない
// 参考URL : http://qiita.com/0829/items/a8c98c8f53b2e821ac94
function SendImageCanvas(){
  // Base64への変換
  var base64= canvas.toDataURL('image/png');
  // 以下にサーバーへ送る等のコードが必要
}

