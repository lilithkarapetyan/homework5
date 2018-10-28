const canvas = document.getElementById("cnv");
canvas.width = 600;
canvas.height = 600;
const ctx = canvas.getContext('2d');
ctx.fillStyle = "coral";
ctx.fillRect(0,0,canvas.width, canvas.height);
const rand = function(num){
    return Math.floor(Math.random()*num) + 1;
}

const colorArray = ["purple", "maroon", "yellow", "cyan", "white", "pink"];
const createBoxes = function(count, canvasWidth, canvasHeight){
    const arr = [];
    for(let i = 0; i < count; i++){
        arr[arr.length] = {
            x: rand(canvasWidth - 30),
            y: rand(canvasHeight - 30),
            width: 30,
            height: 30,
            xDelta: rand(3),
            yDelta: rand(3),
            color: colorArray[rand(colorArray.length) - 1],
            draw: function(){
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            },
            update: function(){
            }
        }
    }  
    return arr;
}

const boxes = createBoxes(10, canvas.width, canvas.height);

for(let  i = 0; i < boxes.length; i++){
    boxes[i].draw();
}

