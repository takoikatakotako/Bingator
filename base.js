/* 定数部分(const使うとブラウザごとに対応・非対応で微妙...?) */
// Canvas内の横幅・縦幅
var SCREEN_WIDTH  = 450;
var SCREEN_HEIGHT = 340;

// グローバル変数
// ロードする画像パスの配列
var fileArray = ["img/stamp/button1/bingata_1.jpg"];
// ロードした画像の座標+横幅高さ
var xywhrf = [{x: 0, y: 0, w: SCREEN_WIDTH, h: SCREEN_HEIGHT, r: 0, f: 0}];
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

/* 画像移動系 */
// arrowを押した時に配列最後の座標を移動させる。
// これめちゃくちゃめんどくさい
function moveArrow(arrow){
  switch(arrow){
    case 'left':
      if(xywhrf[xywhrf.length - 1]['x'] >= 0){
        xywhrf[xywhrf.length - 1]['x'] += -5;
      }
      break;
    case 'right':
      if(xywhrf[xywhrf.length - 1]['x'] + xywhrf[xywhrf.length - 1]['w'] <= SCREEN_WIDTH){
        xywhrf[xywhrf.length - 1]['x'] += +5;
      }
      break;
    case 'up':
      if(xywhrf[xywhrf.length - 1]['y'] >= 0){
        xywhrf[xywhrf.length - 1]['y'] += -5;
      }
      break;
    case 'down':
      if(xywhrf[xywhrf.length - 1]['y'] + xywhrf[xywhrf.length - 1]['h'] <= SCREEN_HEIGHT){
        xywhrf[xywhrf.length - 1]['y'] += +5;
      }
      break;
  }
  showImageCanvas();
}

// クリックした座標を取得し、配列末尾の画像座標変更
// マウスイベントを設定
function moveClick(screenX, screenY){
  // 結果の書き出し
  if(screenX >= 0 && screenX + xywhrf[xywhrf.length - 1]['w'] <= SCREEN_WIDTH && screenY >= 0 && screenY + xywhrf[xywhrf.length - 1]['h'] <= SCREEN_HEIGHT){
    // alert('screen=' + screenX + ',' + screenY);
    xywhrf[xywhrf.length - 1]['x'] = screenX;
    xywhrf[xywhrf.length - 1]['y'] = screenY;
    showImageCanvas();
  }
}

// 画像を30度回転させる
function rotateImg(){
  var rotate_num = 30;
  xywhrf[xywhrf.length - 1]['r'] += rotate_num;
  if(xywhrf[xywhrf.length - 1]['w'] >= 360) xywhrf[xywhrf.length - 1]['w'] -= 360;
  showImageCanvas();
}

/* 画像サイズ変更系 */
// 画像サイズの拡大・縮小
function scaleChange(isUp){
  // 拡大・縮小するサイズxywhrf[xywhrf.length - 1]['x']xywhrf[xywhrf.length - 1]['x']
  var scale_num = 5;
  if(isUp == 'up'){
    // 拡大処理
    if(xywhrf[xywhrf.length - 1]['x'] + xywhrf[xywhrf.length - 1]['w'] + scale_num  <= SCREEN_WIDTH && xywhrf[xywhrf.length - 1]['y'] + xywhrf[xywhrf.length - 1]['h']  + scale_num <= SCREEN_HEIGHT){
      xywhrf[xywhrf.length - 1]['w'] += scale_num;
      xywhrf[xywhrf.length - 1]['h'] += scale_num;
    }
  }else{
    if(xywhrf[xywhrf.length - 1]['w'] - scale_num > 0 && xywhrf[xywhrf.length - 1]['y'] - scale_num > 0){
      xywhrf[xywhrf.length - 1]['w'] -= scale_num;
      xywhrf[xywhrf.length - 1]['h'] -= scale_num;
    }
  }
  // 再描写
  showImageCanvas();
}


/* 画像削除系 */
// 最後に更新した画像を削除
function deleteImageCanvas(){
  // if( fileArray.length == 0){return false;}
  fileArray.pop();
  xywhrf.pop();
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
    xywhrf[0] = {x: 0, y: 0, w: width, h: height, r: 0, f: 0};
  }else{
    fileArray.push(img_file.src);
    xywhrf.push({x: 0, y: 0, w: width, h: height, r: 0, f: 0});
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
  }

  // 画像のロード・描写実行
  loadImages();

}

// Canvasで作成した画像をBase64に変換し、サーバーへ送る
// まだBase64に変換する部分しか実装していない
// 参考URL : http://qiita.com/0829/items/a8c98c8f53b2e821ac94
function SendImageCanvas(){
  // Base64への変換
  var base64 = canvas.toDataURL('image/png');
  // 以下にサーバーへ送る等のコードが必要
}

