
const deck = document.querySelector(".deck");
const cards = Array.from(deck.children);
const restart = document.querySelector('.restart');

restart.addEventListener('click', initiateCards);

let open = [];
let matched = 0;
let moves = 0;
let stars = 3;
let seconds = 0;
let minutes = 0;
let hours = 0;
let timer = null;


/*
 * 创建一个包含所有卡片的数组
 */
let icons = [
    'diamond',
    'paper-plane-o',
    'anchor',
    'bolt',
    'cube',
    'leaf',
    'bicycle',
    'bomb',
    'diamond',
    'paper-plane-o',
    'anchor',
    'bolt',
    'cube',
    'leaf',
    'bicycle',
    'bomb'
];

window.onload = initiateCards();

/*
 * 显示页面上的卡片
 *   - 使用下面提供的 "shuffle" 方法对数组中的卡片进行洗牌
 *   - 循环遍历每张卡片，创建其 HTML
 *   - 将每张卡的 HTML 添加到页面
 */
function initiateCards() {
    icons = shuffle(icons);
    cards.forEach(function(card, index) {
        card.className = 'card';
        card.children[0].className = '';
        card.children[0].classList.add('fa', 'fa-' + icons[index]);
        card.addEventListener('click', openCard);
    })
}

// 洗牌函数来自于 http://stackoverflow.com/a/2450976
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


/*
 * 设置一张卡片的事件监听器。 如果该卡片被点击：
 *  - 显示卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 将卡片添加到状态为 “open” 的 *数组* 中（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 如果数组中已有另一张卡，请检查两张卡片是否匹配
 *    + 如果卡片匹配，将卡片锁定为 "open" 状态（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果卡片不匹配，请将卡片从数组中移除并隐藏卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 增加移动计数器并将其显示在页面上（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果所有卡都匹配，则显示带有最终分数的消息（将这个功能放在你从这个函数中调用的另一个函数中）
 */
function openCard() {
    this.classList.add('open');
    this.classList.add('show');
    open.push(this);
    if(moves == 0) {
        timer = window.setInterval(timeit, 1000);
    }
    moves += 1;
    document.querySelector(".moves").innerHTML = moves;
    updateStars(moves);
    judge();
}

function closeCard(card) {
    setTimeout(function() {
    card.classList.remove('open');
    card.classList.remove('show');
    }, 500);
}

function updateStars(moves) {
    if(moves <=16) {
        stars = 3;
    } else if (moves <= 20) {
        stars = 2;
        document.getElementById("star3").classList.remove('fa-star');
        document.getElementById("star3").classList.add('fa-star-o');
    } else {
        stars = 1;
        document.getElementById("star2").classList.remove('fa-star');
        document.getElementById("star2").classList.add('fa-star-o');
    }
}

function judge() {
    let length = open.length;
    let open1 = open[0];
    let open2 = open[1];
    if (length === 2) {
        if (open1.children[0].classList.toString() ===
        open2.children[0].classList.toString()) {
            open1.classList.add('open', 'match');
            open2.classList.add('open', 'match');
            matched += 1;
        } else {
            closeCard(open1);
            closeCard(open2);
        }
        open = [];
    }
}

function timeit() {
    //TODO: how to format the output???
    document.querySelector('.timer').innerHTML = hours + ":" + minutes + ":" + seconds;
    seconds++;
    if(seconds == 60){
        minutes++;
        seconds = 0;
    }
    if(minutes == 60){
        hours++;
        minutes = 0;
    }
}