let minRad = window.innerWidth / 9;
let maxRad = window.innerWidth / 7;
let gap = window.innerHeight * 0.8;
let colors = ['red', 'blue', 'green', 'yellow'];
var col = function (index) {
    var n = index;
    return colors[n % 4];
}
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    localStorage.setItem("highscores", JSON.stringify(highScores))
var sound1 = new Audio();
sound1.src = "button.mp3";
var sound2 = new Audio();
sound2.src = "game.mp3";
var cirles = [];
var rectangles = [];
var stars = [];
var colorswitch = [];
var smallCircles = []
var score = 0;
var over = false;
var modAng = function (x) {
    var y = x;
    while (y < 0) {
        y += Math.PI * 2;
    };
    return y % (Math.PI * 2);
};
const canvas = document.querySelector('canvas');
c = canvas.getContext('2d');

function startGame() {
    let scores=document.getElementById('highscores');
    scored=JSON.parse(localStorage.getItem("highscores"));
    for(let i=0;i<scored.length;i++){
        var mybr = document.createElement('br');
                scores.appendChild(mybr);

        scores.innerHTML= scores.innerHTML + ' ' + scored[i]+ ' ' ;
      }


    // sound2.play();
    gamearea.start();
}


function player() {
    this.color = colors[(Math.floor(Math.random() * colors.length))];
    this.radius = 15;
    this.y = window.innerHeight * 0.9;
    this.x = window.innerWidth / 4;
    this.gravity = 0.17;
    this.lift = -2;
    this.velocity = 0;

    this.show = function () {
        c.beginPath();
        c.fillStyle = this.color;
        c.globalAlpha = this.ga;
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fill();


    }

    this.update = function () {

        if (this.y < canvas.height * 0.8) {
            this.velocity += this.gravity;
            this.y += this.velocity;

            if (this.velocity <= -3) {
                this.velocity = -3;
            }

            if (this.y + this.radius > canvas.height) {
                this.y = canvas.height - this.radius;
                this.velocity = 0;
            }
        }
        this.up = function () {
            this.velocity = this.lift;
            this.velocity += this.lift * 0.7;
        }
    }
    this.changeColour = function () {
        sound1.play();
        var newColor = colors[(Math.floor(Math.random() * colors.length))];
        while (newColor == this.color) {
            newColor = colors[(Math.floor(Math.random() * colors.length))];
        }
        this.color = newColor;

    }

}
function collide() {
    let d=0;
    for (i = 1; i < cirles.length; i++) {
        if (player.y - cirles[i].y - player.radius - cirles[i].rad <= 0 && player.y + player.radius - cirles[i].y - cirles[i].rad + cirles[i].w >= 0 && player.color != cirles[i].bottomcolor) {
            
           end();
           

        }
        if (player.y - cirles[i].y - player.radius + cirles[i].rad - cirles[i].w <= 0 && player.y + player.radius - cirles[i].y + cirles[i].rad >= 0 && player.color != cirles[i].topcolor) {
           end();
           
        }
        
    }
    
}
let d=0
function jump() {
   
    player.y -= 10;
    score++;

    for (i = 0; i < cirles.length; i++) {
        if (player.y - cirles[i].y < 50) {
            cirles[i].y += 50;
        }

    }

    for (i = 1; i < colorswitch.length; i++) {
        if (player.y - colorswitch[i].y < 30 && colorswitch[i].y - player.y < 30) {
            player.changeColour();

        }
    }
   

}

function Star() {
    a = 0;
    this.r = 20 + 1.2 * Math.sin((a++) / 180 * Math.PI * 4);
    this.remove = false
    c.lineWidth = 2;
    ang = 0;
    this.ga = 1;
    this.x = canvas.width / 2;
    this.color = 'grey'
    this.draw = function () {

        c.beginPath();

        for (var j = 0; j <= 5; j++) {
            var a1 = j * Math.PI * 2 / 5 - Math.PI / 2 - ang;
            var a2 = a1 + Math.PI / 5;
            var rr = this.r * 0.6;

            c.fillStyle = this.color;
            c.globalAlpha = this.a
            c.lineTo(this.x + this.r * Math.cos(a1), this.y + this.r * Math.sin(a1));
            c.lineTo(this.x + rr * Math.cos(a2), this.y + rr * Math.sin(a2));
            c.fill();

        }
    },
        this.update = function () {
            if (player.y + 10 < this.y) {
                this.ga = 0;
                this.color = 'black'


            };
            this.draw();
        }

};
function newSwitch() {
    this.x = canvas.width / 2;
    this.r = 20;
    this.a = 0

    this.draw = function () {
        for (var i = 0; i < 4; i++) {
            var a = i * Math.PI / 2;
            this.c = colors[i];
            c.fillStyle = this.c;
            c.beginPath();
            c.lineTo(this.x, this.y);
            c.arc(this.x, this.y, this.r, a, a + Math.PI / 2);
            c.lineTo(this.x, this.y);
            c.fill();
        };
    };
    this.update = function () {

        this.draw();
    }
};



let u = 1;
function circleObs() {
    this.rad = Math.floor(minRad + (Math.random() * (maxRad - minRad + 1)));
    this.x = canvas.width / 2;
    this.spd = 1 * u;
    this.topcolor
    this.bottomcolor
    this.c = Math.floor(Math.random() * 4);
    this.angle = 0;
    this.w = this.rad / 6;

    this.draw = function () {
        // this.update();
        c.lineWidth = this.w;
        for (var j = 0; j < 4; j++) {
            c.beginPath();
            c.strokeStyle = col(j + this.c);

            var a = modAng(this.angle + Math.PI / 2 * j);
            var a2 = modAng(a + Math.PI / 2);

            c.arc(this.x, this.y, this.rad, a, a2);
            c.stroke();

            if (a % (2 * Math.PI) >= 0 && a % (2 * Math.PI) <= Math.PI / 2) {
                this.bottomcolor = col(j + this.c);
            };
            if (a % (2 * Math.PI) >= Math.PI && a % (2 * Math.PI) <= 1.5 * Math.PI) {
                this.topcolor = col(j + this.c);

            };

        }
        this.angle += this.spd * Math.PI / 180;

    }

}

var player = new player;
var gamearea = {

    start: function () {
        window.removeEventListener('dblclick', startGame);
        over = false;
        cirles = [];
        stars = [];
        colorswitch = [];


        // smallCircles = []
        score = 0;

        canvas.height = h = window.innerHeight;
        canvas.width = window.innerWidth / 2;
        window.addEventListener('click', jump)

        interval = setInterval(this.updateGame, 10);

        canvas.style.left = '25%';
        cirles.push(new circleObs);
        stars.push(new Star);
        colorswitch.push(new newSwitch);
        cirles[0].y = window.innerHeight;

    },
    updateGame: function () {
        let d = 0;
        u = 1;
        gamearea.clear();
        c.fillStyle = colors[Math.floor(Math.random() * 4)];
        if (!over) {
            if (cirles[0].y == window.innerHeight) {
                c.font = '40px Arial';
                c.textAlign = 'center';
                c.fillText('COLOR SWITCH', canvas.width / 2, canvas.height * 0.7,canvas.width);
            }
            for (i = 1; i < stars.length; i++) {
                if(stars[i].y>window,innerHeight*0.8){
                    d++;
                }
                collide();
            }
            
            player.show();
            player.update();
            c.font = '40px Arial';
            c.fillText(score , 40, 60)

            stars.push(new Star);
            colorswitch.push(new newSwitch);
            cirles.push(new circleObs);
            stars[0].y = cirles[0].y;
            colorswitch[0].y = cirles[0].y - gap / 3 - cirles[0].rad / 2;


            for (j = 1; j < cirles.length; j++) {
                cirles[j].y = colorswitch[j - 1].y - gap / 2 - cirles[j].rad / 2;
                stars[j].y = cirles[j].y;
                colorswitch[j].y = cirles[j].y - gap / 4 - cirles[j].rad;
                u += 0.1;
                // cirles[i].spd=2*x;
                cirles[j].draw();

                stars[j].update();
                colorswitch[j].update();




            }

        }
        if (over) {
            c.globalAlpha = 0.5;
            c.fillStyle = '#000';
            clearInterval(gamearea.interval)
           
            
            c.fillStyle = 'rgb(135, 223, 21)';
            c.strokeStyle = '#EEE';
            c.lineWidth = 2;
            window.removeEventListener('click', jump)
            c.globalAlpha = 1;

    
            c.fillText('Your Score is  '+ score, canvas.width / 2, canvas.height * 0.7,canvas.width)
            c.fillText('Game Over', canvas.width / 2, canvas.height * 0.5,canvas.width)
            c.fillText('Doube Click to Play Again',canvas.width / 2, canvas.height * 0.9,canvas.width)
            window.addEventListener('dblclick', startGame)
        }

    },

    clear: function () {

        c.clearRect(0, 0, canvas.width, canvas.height);

    },
    stop: function () {
      
    }

}

function end() {
    let scores=document.getElementById('highscores');
    scores.innerHTML='';
   
    console.log('over');
    highScores.push(score);
    highScores.sort((a, b) => b-a);
    highScores.splice(1);
    localStorage.setItem("highscores", JSON.stringify(highScores))
    // highscore(score);
    clearInterval(gamearea.interval);
    over = true;
}
// function highscore(score) {
    
    
//     let scores = document.getElementById('highscores');
//     scored = JSON.parse(localStorage.getItem("highscores"));
//     scores.innerHTML=highscore[0];
//     // for (let i = 0; i < scored.length; i++) {
//     //     var mybr = document.createElement('br');
//     //     scores.appendChild(mybr);
//     //     scores.innerHTML = scores.innerHTML + ' ' + scored[i] + ' ';


    

//     console.log(scores.innerHTML);
// }

clearInterval(localStorage)