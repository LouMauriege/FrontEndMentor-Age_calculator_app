// Elements du DOM

let inputDay = document.querySelector('[name="day"]');
let inputMonth = document.querySelector('[name="month"]');
let inputYear = document.querySelector('[name="year"]');
let ageOutPut = document.querySelectorAll('span.output');


// Variables & Constantes

const oneYearInMilliseconds = 31557600000;
const oneMonthInMilliseconds = 2629800000;
const oneDayInMilliseconds = 86400000;

let today;
let birthDay;
let todayFullDate = new Date();



// Tableaux contenant les dates

let inputDayOfBirth = [inputDay, inputMonth, inputYear];
let age = [];



// Fonctions d'initialisation

function initInputListener () {
    for (let i = 0; i < inputDayOfBirth.length; i++) {
        inputDayOfBirth[i].addEventListener('keyup', (event) => {
            checkAll(inputDayOfBirth, containers);
        });
    }
}

function initSubmit () {
    submit.addEventListener('click', (event) => {
        event.preventDefault();
        clearAllFields();
        initBirthdayDate();
        calculateDifference();
        displayAge();
    });
}

function initDateOfToday () {
    let todayDay = todayFullDate.getDate();
    let todayMonth = todayFullDate.getMonth();
    let todayYear = todayFullDate.getFullYear();
    today = new Date(todayYear, todayMonth, todayDay);
}

function initBirthdayDate () {
    birthDay = new Date(inputYear.value, (inputMonth.value-1), inputDay.value);
}



// Functions logique

function calculateDifference () {
    let diff = today - birthDay;
    age[0] = Math.floor(diff / oneYearInMilliseconds);
    diff %= oneYearInMilliseconds;
    age[1] = Math.floor(diff / oneMonthInMilliseconds);
    diff %= oneMonthInMilliseconds;
    age[2] = Math.floor(diff / oneDayInMilliseconds);
}



// Fonction d'affichage

function displayAge () {
    for (let i = 0; i < ageOutPut.length; i++) {
        ageOutPut[i].textContent = age[i];
    }
}

function clearAllFields () {
    for (let i = 0; i < ageOutPut.length; i++) {
        ageOutPut[i].textContent = "";
    }
}



// Fonction principale

function main () {
    initInputListener();
    initSubmit();
    initDateOfToday();
}