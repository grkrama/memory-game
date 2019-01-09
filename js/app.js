let selectedCards = [];
let moves = 0;
const moveEle = document.querySelector('.moves');
const timerEle = document.querySelector('.timer');
const stars = document.querySelector(".stars");
let cardsCount = 0;
let starsCount = 3;
let intervalId = "";
let seconds = 0;
let minutes = 0;
let hours = 0;

init();

const restart = document.querySelector('.restart');
restart.addEventListener('click', function(){
    clearInterval(intervalId);
    init();
});


const deck = document.querySelector('.deck');
deck.addEventListener('click', CardClicked);

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Main funtion which loads when page loads , when restart button is clicked.
function init(){
    moves = 0;
    const cards = document.querySelectorAll('.card');
    cardsCount = cards.length;
    let i = 0;
    stars.children[1].firstElementChild.setAttribute('data-fbstars', 0);
    stars.children[2].firstElementChild.setAttribute('data-fbstars', 0);
    const randomArr = shuffle(Array.from(Array(cardsCount).keys()));
    cards.forEach(
        function(currentValue){
            currentValue.style.order = randomArr[i];
            currentValue.classList.remove('match','open','show','disabled');
            moveEle.innerText = moves;
            i++;
        },
        );
        seconds = 0;
        minutes = 0;
        hours = 0;
        intervalId = setInterval(runTimer, 1000);
        console.log("intervalId : " + intervalId);

}

//This funtion keep track of flipped cards.
function CardClicked (evt){
    let nodeEle = "";
    if (evt.target.nodeName === "LI"){
        nodeEle = evt.target;
    }
    else if (evt.target.parentElement.nodeName === "LI")
    {
        nodeEle = evt.target.parentElement;
    }

    if (nodeEle && ((nodeEle.classList.contains("match") === false) && ((nodeEle.classList.contains("open") === false))))
    {
        selectedCards.push(nodeEle);
        flipCard(nodeEle);
        moves++;

        moveEle.innerText = moves;
        calculateStars();
        if (selectedCards.length === 2)
        {
            compareCards(...selectedCards);
            selectedCards = [];
        }
    }
    cardsCount === 0 && gameOver();
}

//used for toggle class. So that same code is not repeated multiple time.
function flipCard (element){
    element.classList.toggle("open");
    element.classList.toggle("show");
}

//function is used for comparing cards.
function compareCards (first, second){
    if (first.innerHTML === second.innerHTML)
    {
        cardsCount-=2;
        flipCard(first);
        flipCard(second);
        first.classList.add("match", "disabled");
        second.classList.add("match", "disabled");
    }
    else
    {
        first.classList.add("wrong");
        second.classList.add("wrong");
        setTimeout(function(){
            first.classList.remove("wrong");
            second.classList.remove("wrong");
            flipCard(first);
            flipCard(second);
        }, 500);
    }
}

//final function called when game is over.
function gameOver (){
    clearInterval(intervalId);
    const msg = `You have won the game . Total number of Moves conceded are ${moves}. You have got ${starsCount} Stars. Your total time is ${hours} hours ${minutes} minutes and ${seconds} seconds.`;
    openPopMsg (msg);
}

//funtion to create a pop up so that i can demo the creating of element dynamically.
function openPopMsg (msg){
    let containerElem, modalEle, msgContainer, paraElem, btnContainer, buttonEle;
    containerElem = document.createElement("div");
    containerElem.className = "zcontainer";
    modalEle = document.createElement("div");
    modalEle.className = "modal-container";
    msgContainer = document.createElement("div");
    msgContainer.className = "modal-msg-container";
    modalEle.appendChild(msgContainer);
    paraElem = document.createElement("p");
    paraElem.innerHTML = msg;
    msgContainer.appendChild(paraElem);
    btnContainer = document.createElement("div");
    btnContainer.className = "modal-button-container";
    buttonEle = document.createElement('button');
    buttonEle.textContent = "OK";
    buttonEle.classList.add("modal-btn");
    btnContainer.appendChild(buttonEle);
    modalEle.appendChild(btnContainer);
    containerElem.appendChild(modalEle);
    document.querySelector('body').appendChild(containerElem);
    buttonEle.addEventListener('click', modalOkClicked);
}

function modalOkClicked () {
    document.querySelector('.zcontainer').remove();
    init();
}

function calculateStars () {
    //var stars = document.querySelector(".stars");
    if (moves === 16) {

    }else if (moves > 16 && moves <= 24){
        stars.children[2].firstElementChild.setAttribute('data-fbstars', 1);
        starsCount = 2;
    }else if (moves > 24){
        stars.children[1].firstElementChild.setAttribute('data-fbstars', 1);
        starsCount = 1;
    }
}

function runTimer () {
    seconds++;
    if (seconds == 60)
    {
        minutes++;
        seconds = 0;
    }
    if (minutes == 60)
    {
        hours++;
        minutes = 0;
        seconds = 0;
    }
    timerEle.innerHTML = hours +":"+ minutes + ":" + seconds;
    //console.log(hours +":"+ minutes + ":" + seconds);
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

