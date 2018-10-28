const canvas = document.getElementById("cnv");
canvas.width = 1200;
canvas.height = 600;
const ctx = canvas.getContext('2d');
let score = 0;
const h3 = document.getElementById("score");
const background = new Image();
background.src = "bg.jpg";
ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
const soapImg = new Image();
soapImg.src = "soap.png";
const goodGuyImg = new Image();
goodGuyImg.src = 'bubble.png';
const badGuyImg = new Image();
badGuyImg.src = "fish.png";

const rand = function (num) {
    return Math.floor(Math.random() * num) + 1;
}

const dist = function (x, y, x1, y1) {
    return Math.sqrt((x - x1) * (x - x1) + (y - y1) * (y - y1));
}

const soap = {
    image: soapImg,
    x: rand(canvas.width - 30),
    y: rand(canvas.height - 50),
    width: 30,
    height: 50,
    draw: function () {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    },
    collision: function (obj) {
        if (Math.abs((obj.x + obj.width / 2) - (this.x + this.width / 2)) < this.width / 2 + obj.width / 2 &&
            Math.abs(obj.y + obj.height / 2 - (this.y + this.height / 2)) < obj.height / 2 + this.height / 2) {
                this.x = rand(canvas.width - this.width);
                this.y = rand(canvas.height - this.height);
                score++;
        }

    }
}


const createFishes = function (count, canvasWidth, canvasHeight) {
    const arr = [];
    for (let i = 0; i < count; i++) {
        arr[arr.length] = {
            x: rand(canvasWidth - 75 - 150),
            y: rand(canvasHeight - 75 - 150),
            width: 75,
            height: 75,
            xDelta: rand(2),
            yDelta: rand(2),
            image: badGuyImg,
            draw: function () {
                ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            },
            update: function () {
                if (this.x < 0 || this.x > canvasWidth - this.width) {
                    this.xDelta *= (-1);
                }
                if (this.y < 0 || this.y > canvasHeight - this.height) {
                    this.yDelta *= (-1);
                }

                this.x += this.xDelta;
                this.y += this.yDelta;

            }
        }


    }
    return arr;
}


const boxes = createFishes(5, canvas.width, canvas.height);
const gameData = {
    badGuys: boxes,
    hero: {
        x: canvas.width - 150,
        y: canvas.height - 150,
        xDelta: 0,
        yDelta: 0,
        width: 150,
        height: 150,
        dead: false,
        image: goodGuyImg,
        draw: function () {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        },
        update: function () {
            this.x += this.xDelta;
            this.y += this.yDelta;

            if (this.x + this.width > canvas.width) {
                this.x = 0;
            }
            else if (this.x < 0) {
                this.x = canvas.width - this.width;
            }

            if (this.y < 0) {
                this.y = canvas.height - this.height;
            }
            else if (this.y + this.height > canvas.height) {
                this.y = 0;
            }

            for (let i = 0; i < gameData.badGuys.length; i++) {
                let obj = gameData.badGuys[i]

                const distance = dist(gameData.hero.x + gameData.hero.width / 2, gameData.hero.y + gameData.hero.height / 2,
                    obj.x + obj.width / 2, obj.y + obj.height / 2)
                if (distance < gameData.hero.width / 2 + obj.width / 2) {
                    gameData.hero.dead = true;
                    alert("you are dead");
                }
            }
        }
    }
};

const leftKey = 37;
const upKey = 38;
const rightKey = 39;
const downKey = 40;
document.addEventListener('keydown', function (event) {

    if (event.keyCode === leftKey) {
        gameData.hero.xDelta = -5;
    }

    if (event.keyCode === rightKey) {
        gameData.hero.xDelta = 5;
    }

    if (event.keyCode === upKey) {
        gameData.hero.yDelta = -5;
    }
    if (event.keyCode === downKey) {
        gameData.hero.yDelta = 5;
    }

}, false);


document.addEventListener('keyup', function (event) {
    if (event.keyCode === leftKey || event.keyCode === rightKey) {
        gameData.hero.xDelta = 0;
    }
    if (event.keyCode === upKey || event.keyCode === downKey) {
        gameData.hero.yDelta = -1;
    }

}, false);



const draw = function () {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    for (let i = 0; i < gameData.badGuys.length; i++) {
        gameData.badGuys[i].draw();
    }
    soap.draw();
    gameData.hero.draw();
}
const update = function () {
    for (let i = 0; i < gameData.badGuys.length; i++) {
        gameData.badGuys[i].update();
    }
    soap.collision(gameData.hero);
    gameData.hero.update();
}
const loop = function () {
    draw();
    update();
    h3.innerHTML = "SCORE: " + score;
    if (!gameData.hero.dead)
        requestAnimationFrame(loop);
}

loop();


