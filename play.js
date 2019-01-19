let txt;
let timer;
let totalwords = 0;
let started = false;
let startText = "";
let time = 30;

function setup() {
    let c = createCanvas(500, 300);
    c.parent('playcanvas');
    txt = document.getElementById('text');
    txt.autocomplete = "off";
    txt.disabled = true;
    startText = "Press start to start!"
}

function draw() {
    background(200);
    if (txt.value == ' ') {
        txt.value = '';
    }
    if (!started) {
        textAlign(CENTER, CENTER);
        textSize(50);
        fill(0);
        text(startText, width / 2, height / 2);
    }
    if (started) {
        let timeElapsed = time - floor(((new Date()) - timer) / 1000);
        if (timeElapsed < 0) {
            end();
            return;
        }

        drawUpcoming();

        let r = /^(?:mat|ma|m) ?/;
        let m = txt.value.match(r);
        if (txt.value.length > 0 && (m == null || m[0] != txt.value)) {
            txt.style.background = "#a00";
        } else {
            txt.style.background = "#fff";
        }
        let minutes = floor(timeElapsed/60);
        let seconds = timeElapsed % 60;
        textAlign(CENTER,CENTER);
        textSize(30);
        fill(100);
        text(minutes+':'+'0'.charAt(seconds.toString().length-1)+seconds,width/2,height-50);
    }
}

function drawUpcoming() {
    textAlign(CENTER, CENTER);
    textSize(50);
    fill(0);
    let lastX = width/2-(textWidth('m')*1.5);
    for (let i = 0; i < 3; i++) {
        let char = "mat".charAt(i);
        if (txt.value.length >= i+1) {
            if (txt.value.startsWith('mat'.slice(0,i+1))) {
                fill(0,100,0);
            } else {
                fill(200,0,0);
            }
        } else {
            fill(0);
        }
        let cWidth = textWidth(char);
        text(char,lastX+cWidth,height/2);
        lastX += cWidth+5;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function start() {
    startText = "READY?"
    sleep(1000).then(() => {
        startText = "SET"
        sleep(1000).then(() => {
            startText = "GO!"
            sleep(500).then(() => {
                started = true;
                totalwords = 0;
                timer = new Date();
                txt.disabled = false;
                startText = "";
            })
        })
    })
}

function end() {
    started = false
    txt.disabled = true;
    txt.value = "";
    startText = "Calculating WPM...";
    sleep(random(500, 1000)).then(() => {
        startText = "Your WPM is: " + totalwords * 60 / time;
    })
}

function keyPressed() {
    if (started) {
        if (key == ' ') {
            if (txt.value == 'mat') {
                txt.value = '';
                totalwords++;
            }
        }
    }
}