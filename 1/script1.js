const cnv = document.getElementById("cnv1");
cnv.width = 600;
cnv.height = 600;
const context = cnv.getContext('2d');
context.fillStyle = "cyan";
context.fillRect(0,0,cnv.width, cnv.height);

const background = new Image();
background.src = "background.jpg";
background.onload = function(){
    context.drawImage(background, 0,0,cnv.width, cnv.height);
}