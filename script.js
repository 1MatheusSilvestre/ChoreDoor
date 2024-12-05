let doorImage1 = document.getElementById('door1');
let doorImage2 = document.getElementById('door2');
let doorImage3 = document.getElementById('door3');
botDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg';
beachDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg';
spaceDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg';

// váriaveis que farão a lógica do jogo
let numClosedDoors = 3;
let openDoor1, openDoor2, openDoor3;

let closedDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg';
let startButton = document.getElementById('start');
let scoreDisplay = document.getElementById('score');
let scoreDisplayBot = document.getElementById('scorebot');
let score = 1;
let scorebot = 1;
let currentlyPlaying = true;

const isBot = door => {
    if (door.src === botDoorPath) {
        return true;
    } else {
        return false;
    }
};


const isClicked = door => {
    if (door.src === closedDoorPath) {
        return false;
    } else {
        return true;
    }
};


const playDoor = door => {
    numClosedDoors--;
    if (numClosedDoors === 0) {
        gameOver('ganhou');
    } else if (isBot(door) === true) {
        return gameOver();
    }
};


const randomChoreDoorGenerator = () => {
    let choreDoor = Math.floor(Math.random() * 3)
    if (choreDoor === 0) {
        openDoor1 = botDoorPath;
        openDoor2 = beachDoorPath;
        openDoor3 = spaceDoorPath;
    } else if (choreDoor === 1) {
        openDoor2 = botDoorPath;
        openDoor1 = spaceDoorPath;
        openDoor3 = beachDoorPath;
    } else {
        openDoor3 = botDoorPath;
        openDoor1 = beachDoorPath;
        openDoor2 = spaceDoorPath;
    }
};


doorImage1.onclick = () => {
    if (currentlyPlaying && !isClicked(doorImage1)) {
        doorImage1.src = openDoor1;
        playDoor(doorImage1);
    }
};


doorImage2.onclick = () => {
    if (currentlyPlaying && !isClicked(doorImage2)) {
        doorImage2.src = openDoor2;
        playDoor(doorImage2);
    }
};


doorImage3.onclick = () => {
    if (currentlyPlaying && !isClicked(doorImage3)) {
        doorImage3.src = openDoor3;
        playDoor(doorImage3);
    }
};


const startRound = () => {
    doorImage1.src = closedDoorPath;
    doorImage2.src = closedDoorPath;
    doorImage3.src = closedDoorPath;
    numClosedDoors = 3;
    startButton.innerHTML = 'Boa sorte!';
    currentlyPlaying = true;
    randomChoreDoorGenerator();
};


startButton.onclick = () => {
    if (!currentlyPlaying) {
        startRound();
    }
};


const gameOver = status => {
    if (status === 'ganhou') {
        startButton.innerHTML = 'Você ganhou! Jogar novamente?';
        scoreDisplay.innerHTML = score++;
    } else {
        startButton.innerHTML = 'Você perdeu! Jogar novamente?';
        scoreDisplayBot.innerHTML = scorebot++;
    }
    currentlyPlaying = false;
};


startRound();
