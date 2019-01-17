/**
 * IPD-16 420-PX4-AB JAVASCRIPT Project
 * Author: Jeonghoon Lee
 * Date: Jan. 17, 2019
 */


 /**
  * Display login error message.
  * @param {string} errorMsg error message you want to display
  */
function displayErrorMsg(errorMsg) {
    const errorMsgContainer = document.querySelector('#error-message');
    const errorMsgElement = document.createElement('p');

    errorMsgElement.innerHTML = errorMsg;
    errorMsgContainer.appendChild(errorMsgElement);
}

/**
 * Check validation of email address
 * It used the regualr expression pattern for checking email validation 
 * referenced from https://tylermcginnis.com/validate-email-address-javascript/
 * @returns {boolean} true: success, false: fail
 */
function validateEmail() {
    const email = document.querySelector('[name="loginEmail"]').value;
    if (email.length > 0) {
        // Regex pattern to validate Email
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return true;
        } else {
            displayErrorMsg('Invaild email format');
            return false;
        }
    } else {
        displayErrorMsg('Email Address is empty.<br>Please type email address!');
        return false;
    }
}

/**
 * Check validation of password
 * The password must be at least 7 characters.
 * @returns {boolean} if password is longer than 6, return true
 */
function validatePassword() {
    const password = document.querySelector('[name="loginPassword"]').value;
    if (password.length > 6) {
        return true;
    } else {
        displayErrorMsg('The password is too short.<br>It must be at least <strong>7</strong> characters.');
        return false;
    }
}

/**
 * Delete error message if it exists
 */
function clearErrorMsg() {
    const errorMsgText = document.querySelector('#error-message p');
    if (errorMsgText != null)
        document.querySelector('#error-message').removeChild(errorMsgText);
}

/**
 * Create welcome message container and display username and welcome message.
 */
function displayWelcomeMsg() {
    const welcomeMsgContainer = document.createElement('div');
    const welcomeMsg = document.createElement('p');
    const userName = document.createElement('h3');

    welcomeMsg.innerHTML = 'Welcome to the JavaScript World';
    userName.innerHTML = 'Jeonghoon Lee';

    welcomeMsgContainer.appendChild(welcomeMsg);
    welcomeMsgContainer.appendChild(userName);
    document.querySelector('.login-form-container').appendChild(welcomeMsgContainer);
}

/**
 * Start login process.
 */
function login() {

}


// login button click event handler
document.querySelector('#login-button').onclick = function() {
    // get text from login button
    const loginStatus = document.querySelector('#login-button').innerHTML;

    // if user want to login
    if (loginStatus === 'Login') {
        clearErrorMsg();
        if (validateEmail() && validatePassword()) {
            document.querySelector('#login-button').innerHTML = "Logout";
            document.querySelector('.login-form-container form').style.display = 'none';
            // clear input password field after login
            document.querySelector('[type="password"]').value = '';
            displayWelcomeMsg();
            login();
        }
    } else {    // logout process
        // remove welcome message container from HTML
        document.querySelector('.login-form-container').removeChild(document.querySelector('.login-form-container div'));
        document.querySelector('#login-button').innerHTML = "Login";
        document.querySelector('.login-form-container form').style.display = 'block';
    }
}


// Load initial status
//  - today's message, date and time
const todayMsgContainer = document.querySelector('#today-message');
const todayMsgElement = document.createElement('p');
const today = new Date();       // get date

let todayMessage = 'Today\'s message: "Have a good day!"<br>';

todayMessage += 'Today\'s date: ' + today.toDateString() + '<br>';
todayMessage += 'Time now: ' + today.toLocaleTimeString('en-US');
todayMsgElement.innerHTML = todayMessage;
todayMsgContainer.appendChild(todayMsgElement);
