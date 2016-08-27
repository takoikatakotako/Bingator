// HTML側にクリックイベント記述
function button1Clicked() {
  alert("ボタン1が押されたよ");
  draw()
}

function button2Clicked() {
  alert("ボタン２が押されたよ");
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


function draw() {
  /* canvas要素のノードオブジェクト */
  var canvas = document.getElementById('htmlCanvas');
  if ( ! canvas || ! canvas.getContext ) { return false; }
  var ctx = canvas.getContext('2d');
  ctx.beginPath();

    /* Imageオブジェクトを生成 */
  var img = new Image();
  img.src = "img/shiisa_one.png?" + new Date().getTime();
  /* 画像が読み込まれるのを待ってから処理を続行 */
  img.onload = function() {
    ctx.drawImage(img, 0, 0);
  }
}