// Elements du DOM

let dayError = document.querySelector('.errorFeedback.day');
let monthError = document.querySelector('.errorFeedback.month');
let yearError = document.querySelector('.errorFeedback.year');

let messageZones = document.querySelectorAll('.errorFeedback');

let dayContainer = document.querySelector('form > div:nth-child(1)');
let monthContainer = document.querySelector('form > div:nth-child(2)');
let yearContainer = document.querySelector('form > div:nth-child(3)');

let containers = [dayContainer, monthContainer, yearContainer];

let submit = document.querySelector('[type="submit"]');



// Fonctions logiques

function checkIfEmpty (inputValue, container, messageZones) {
    if (inputValue === "") {
        let errEmpty = new Error("This field is required");
        errEmpty.container = container;
        errEmpty.messageZones = messageZones;
        throw errEmpty;
    }
}

function checkIfNotNumber (inputValue, container, messageZones) {
    let regexNumber = new RegExp(/^\d+$/);
    let isNumber = regexNumber.test(inputValue);
    if (!isNumber) {
        let errNumber = new Error("Enter only numbers");
        errNumber.container = container;
        errNumber.messageZones = messageZones;
        throw errNumber;
    }
}

function checkMonthIndex (inputValue, container, messageZones) {
    if (inputValue > 12) {
        let errMonth = new Error("Enter a valid month");
        errMonth.container = container;
        errMonth.messageZones = messageZones;
        throw errMonth;
    }
}

function checkDay (inputValue, container, messageZones) {
    if (inputValue > 31) {
        let errDay = new Error("Enter a valid day");
        errDay.container = container;
        errDay.messageZones = messageZones;
        throw errDay;
    }
}

function checkIfYearTooLow (inputValue, container, messageZones) {
    let todayYear = todayFullDate.getUTCFullYear();
    if (inputValue < 100) {
        let errYear = new Error("Enter a year afer 99");
        errYear.container = container;
        errYear.messageZones = messageZones;
        throw errYear;
    }
}

function checkIfYearPassed (inputValue, container, messageZones) {
    let todayYear = todayFullDate.getUTCFullYear();
    if (inputValue > todayYear) {
        let errYear = new Error("Enter a year in the past");
        errYear.container = container;
        errYear.messageZones = messageZones;
        throw errYear;
    }
}

function checkIfZero (inputValue, container, messageZones) {
    if (inputValue === "0") {
        let errZero = new Error("Enter a positive number");
        errZero.container = container;
        errZero.messageZones = messageZones;
        throw errZero;
    }
}

function checkIfDatePassed (inputArray, container, messageZones) {
    let dateEntered = new Date(inputArray[2].value, inputArray[1].value - 1, inputArray[0].value);
    if (dateEntered > todayFullDate) {
        let errFuturDate = new Error("Date must be in past");
        errFuturDate.container = container;
        errFuturDate.messageZones = messageZones;
        throw errFuturDate;
    }
}

function checkIfDateExist (inputArray, container, messageZones) {
    let errFormat = new Error("Date must exist");
    errFormat.container = container;
    errFormat.messageZones = messageZones;

    let dateToCheck = new Date(inputArray[2].value, inputArray[1].value - 1, inputArray[0].value);

    let dayToRefer = dateToCheck.getDate();
    let monthToRefer = dateToCheck.getMonth();
    let yearToRefer = dateToCheck.getFullYear();

    let enteredDay = parseInt(inputArray[0].value);
    let enteredMonth = parseInt(inputArray[1].value - 1);
    let enteredYear = parseInt(inputArray[2].value);

    console.log(dateToCheck);
    console.log(enteredYear, yearToRefer, enteredMonth, monthToRefer, enteredDay, dayToRefer);

    if (enteredDay !== dayToRefer) {
        throw errFormat;
    }
    if (enteredMonth !== monthToRefer) {
        throw errFormat;
    }
    if (enteredYear !== yearToRefer) {
        throw errFormat;
    }
}


// Fonctions affichages

function addError (container) {
    if (container.constructor === Array) {
        for (let i = 0; i < container.length; i++) {
            container[i].classList.add("errorState")
        }
    } else {
        container.classList.add("errorState");
    }
}

function removeError (container) {
    container.classList.remove("errorState");
}

function displayMessage (zone, message) {
    zone.textContent = message;
}

function disableSubmit () {
    submit.disabled = true;
}

function enableSubmit () {
    submit.disabled = false;
}



// Fonction principale 

function checkAll (inputArray, containerArray) {
    for (let i = 0; i < inputArray.length; i++) {
        disableSubmit();
        removeError(containerArray[i]);
        displayMessage(messageZones[i], "");
        try {
            checkIfEmpty(inputArray[i].value, containerArray[i], messageZones[i]);

            checkIfNotNumber(inputArray[i].value, containerArray[i], messageZones[i]);

            checkIfZero(inputArray[i].value, containerArray[i], messageZones[i]);

            checkDay(inputArray[0].value, containerArray[0], messageZones[0]);

            checkMonthIndex(inputArray[1].value, containerArray[1], messageZones[1]);
            
            checkIfYearPassed(inputArray[2].value, containerArray[2], messageZones[2]);

            checkIfDatePassed(inputArray, containerArray, messageZones[0]);

            checkIfDateExist(inputArray, containerArray, messageZones[0]);

            enableSubmit();
        } catch (error) {
            addError(error.container);
            displayMessage(error.messageZones, error.message);
        }
    }
}