// 初期設定
// $(document).ready(function(){
//     showImageCanvas();
// });
// 画像のパス保管のグローバル変数
// ロードする画像パスの配列
var fileArray = ['shiisa_one.png'];
// ロードした画像の座標+横幅高さ
var xywh = [{x: 0, y: 0, w: 450, h: 340}];

// HTML側にクリックイベント記述
function button1Clicked() {
  alert("ボタン1が押されたよ");
  showImageCanvas();
}

function button2Clicked() {
  alert("ボタン２が押されたよ");
  fileArray.push('img/mark_arrow_down.png');
  var img = new Image();
  img.src = 'img/mark_arrow_down.png';
  var width  = img.width;
  var height = img.height;
  xywh.push({x: 0, y: 0, w: width, h: height});
}

function button3Clicked() {
  alert("ボタン３が押されたよ");
}

function button4Clicked() {
  alert("ボタン４が押されたよ");
}

function button5Clicked() {
  alert("ボタン５が押されたよ");
}


// function draw() {
//   /* canvas要素のノードオブジェクト */
//   var canvas = document.getElementById('htmlCanvas');
//   if ( ! canvas || ! canvas.getContext ) { return false; }
//   var ctx = canvas.getContext('2d');
//   ctx.beginPath();

//     /* Imageオブジェクトを生成 */
//   var img = new Image();
//   img.src = "img/shiisa_one.png?" + new Date().getTime();
//   /* 画像が読み込まれるのを待ってから処理を続行 */
//   img.onload = function() {
//     ctx.drawImage(img, 0, 0);
//   }
// }

function showImageCanvas(){
  // ロードする画像配列の長さ
  var numFiles = fileArray.length;
  var loadedCount = 0;
  var imageObjectArray = [];
  // Canvas要素
  var canvas = document.getElementById('htmlCanvas');
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
