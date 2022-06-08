const input = document.querySelector('.input');
const generate = document.querySelector('.addBtn');
const container = document.querySelector('.container');
const clear = document.querySelector('.clearBtn');
let storageArray = [];
let hue = 0;

// ---------------Building Dom Elements---------------
function buildDom(inputValue) {
    const card = document.createElement('div');
    card.classList.add('card');
    container.appendChild(card);
    card.style.backgroundColor = `hsl(${hue}, 50%, 50%)`;
    hue += 15;

    const tag = document.createElement('h1');
    tag.textContent = inputValue;
    card.appendChild(tag);
    const removeBtn = document.createElement('div');
    card.appendChild(removeBtn);
    removeBtn.innerHTML = `<i class="fa-solid remove fa-trash-can"></i>`;

    //Remove Button Function
    removeBtn.addEventListener('click', function () {
        card.remove();
        let dataLocalStorage = JSON.parse(localStorage.getItem('key'))
        dataLocalStorage = dataLocalStorage.filter(e => e != tag.textContent)
        localStorage.setItem('key', JSON.stringify(dataLocalStorage))


    })
}

// ---------------Generate Tags---------------
generate.addEventListener('click', addCard);
function addCard(e) {
    e.preventDefault();
    if (input.value) {
        buildDom(input.value);
        storageArray.push(input.value);
        localStorage.setItem('key', JSON.stringify(storageArray));
        input.value = '';
    }

}

// ---------------Clear Button Function---------------
clear.addEventListener('click', function (e) {
    e.preventDefault();
    const cards = document.querySelectorAll('.card');
    cards.forEach(e => e.remove());
    storageArray = JSON.parse(localStorage.getItem('key'))
    storageArray.splice(0, storageArray.length);
    localStorage.setItem('key', JSON.stringify(storageArray));
})

// ---------------On Load Function---------------
document.addEventListener('DOMContentLoaded', onLoad)
function onLoad() {
    if (localStorage.getItem('key')) {
        storageArray = JSON.parse(localStorage.getItem('key'))
    }
    storageArray.forEach(e => {
        buildDom(e);
    })
}

