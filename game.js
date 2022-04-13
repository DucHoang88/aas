var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var ball = {
    x: 20,
    y: 20,
    dx: 5,
    dy: 5,
    radius: 10,
}

var thanhchan = {
    width: 100,
    height: 10,
    x: 0,
    y: canvas.height - 10,
    speed: 27
}

var isGameOver = false;

var BrickConfig = {
    offsetX: 25,
    offsetY: 25,
    margin: 25,
    with: 70,
    height: 10,
    totalRow: 3,
    totalCol: 10,
}
var BrickList = [];
for (var i = 1; i < BrickConfig.totalRow; i++) {
    for (var j = 0; j < BrickConfig.totalCol; j++) {
        BrickList.push({
            x: BrickConfig.offsetX + j * (BrickConfig.with + BrickConfig.margin),
            y: BrickConfig.offsetY + i * (BrickConfig.height + BrickConfig.margin),
            isBroken: true
        })
    }
}

function drawBall() {
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fillStyle = 'red';
    context.fill();
    context.closePath();
}

function drawthanhchan() {
    context.beginPath();
    context.rect(thanhchan.x, thanhchan.y, thanhchan.width, thanhchan.height);
    context.fillStyle = 'red';
    context.fill();
    context.closePath();
}

function vogach() {
    BrickList.forEach(function(b) {
        if ("b.isBroken") {
            if (ball.x >= b.x &&
                ball.x <= b.x + BrickConfig.with &&
                ball.y + ball.radius >= b.y &&
                ball.y - ball.radius <= b.y + BrickConfig.height) {
                ball.dy = -ball.dy;
                b.isBroken = false;
            }
        }
    })
}
document.addEventListener('keydown', function(event) {
    console.log('KEY DOWN');
    console.log(event);

    if (event.keyCode == 37) {
        thanhchan.x -= thanhchan.speed;

    } else if (event.keyCode == 39) {
        thanhchan.x += thanhchan.speed
    }
});

// setInterval(function() {
//     context.clearRect(0, 0, 1300, 800)
//     drawBall();
//     x += 4;
//     y += 4
// }, 200)
function handleBallCollideBounds() {
    if (ball.x < ball.radius || ball.x > canvas.width - ball.radius) {
        ball.dx = -ball.dx;
    }
    if (ball.y < ball.radius) {
        ball.dy = -ball.dy;
    }
}

function sulyvacham() {
    if (ball.x + ball.radius >= thanhchan.x && ball.x + ball.radius <= thanhchan.x + thanhchan.width && ball.y + ball.radius >= canvas.height - thanhchan.height) {
        ball.dy = -ball.dy;

    }
}

function updateBallPosition() {
    ball.x += ball.dx;
    ball.y += ball.dy
}




function updateThanhChan() {
    if (thanhchan.x < 0) {
        thanhchan.x = 0;
    } else if (thanhchan.x > canvas.width - thanhchan.width) {
        thanhchan.x = canvas.width - thanhchan.width;
    }

}

function viengach() {
    BrickList.forEach(function(b) {
        if (b.isBroken) {
            context.beginPath();
            context.rect(b.x, b.y, BrickConfig.with, BrickConfig.height);
            context.fill();
            context.closePath();
        }


    });



}

function draw() {
    if (!isGameOver) {
        context.clearRect(0, 0, 1300, 800)
        drawBall();

        drawthanhchan();

        updateThanhChan();


        handleBallCollideBounds();
        sulyvacham();
        vogach();
        updateBallPosition();
        viengach();
        if (ball.y > canvas.height - ball.radius) {
            isGameOver = true;
        }

        requestAnimationFrame(draw);
    } else {
        console.log('game over')
    }
}

draw();