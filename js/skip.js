const cards = document.querySelectorAll('.wrapper');
const max = cards.length;
let index = 0;

const inputValue = document.querySelectorAll('.input-value');

const nextBtn = document.getElementById('next');
const backBtn = document.getElementById('back');
const sendBtn = document.getElementById('send');


function nextCard() {
    cards[index].classList.remove('selected');

    if(inputValue[index].value === '') {
        alert('Você precisa Preencher o campo abaixo')
    } else {
        index++
    }

    if (index !== 0) {
        backBtn.style.display = 'block';
    }

    if (index === max -1) {
        sendBtn.style.display = 'block';
        nextBtn.style.display = 'none';
    }

    cards[index].classList.add('selected');

}

function backCard() {
    cards[index].classList.remove('selected');

    if (index > 0) {
        index--;
    }

    cards[index].classList.add('selected');
}

nextBtn.addEventListener('click', nextCard);
backBtn.addEventListener('click', backCard);