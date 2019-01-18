/**
 * IPD-16 420-PX4-AB JAVASCRIPT Project
 * Author: Jeonghoon Lee
 * Date: Jan. 18, 2019
 */


/**
 * Display login error message.
 * @param {string} errorMsg error message you want to display
 */
function displayErrorMsg(errorMsg) {  
    document.querySelector('#error-header').innerHTML = 'Please complete the form!';
    
    // Insert error message into HTML list
    const errorMessageItem = document.createElement('li');
    errorMessageItem.innerHTML = errorMsg;
    document.querySelector('#error-message').appendChild(errorMessageItem);

    // Make error message container invisible
    document.querySelector('#error-msg-container').style.display = 'block';
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
            displayErrorMsg('Invaild email address format!');
            return false;
        }
    } else {
        displayErrorMsg('Email Address must be filled in!');
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
    if (password.length > 5) {
        return true;
    } else {
        displayErrorMsg('The password is too short. It must be at least 6 characters.');
        return false;
    }
}

/**
 * Delete error message if it exists
 */
function clearErrorMsg() {
    // Make error message container invisible
    document.querySelector('#error-msg-container').style.display = 'none';
    document.querySelector('#error-header').value = '';     // Clear error message

    // Remove list items of error message
    const errorlist = document.querySelector('#error-message');
    while(errorlist.firstChild != null) {
        errorlist.removeChild(errorlist.firstChild);
    }
}

/**
 * Create welcome message container and display username and welcome message.
 */
function displayWelcomeMsg() {
    const welcomeMsgContainer = document.createElement('div');
    const welcomeMsg = document.createElement('p');
    const userName = document.createElement('h3');

    // Make welcome message for login user
    welcomeMsg.innerHTML = 'Welcome to the JavaScript World';
    userName.innerHTML = 'Jeonghoon Lee';   // Set login user name
    userName.classList.add('text-center');

    welcomeMsgContainer.appendChild(welcomeMsg);
    welcomeMsgContainer.appendChild(userName);
    document.querySelector('.login-form-container').appendChild(welcomeMsgContainer);
}

/**
 * Start login process.
 */
function login() {
    // Get an unique API key from https://developer.accuweather.com/packages
    const MY_KEY = 'InsertYourKey';
    const weatherURL = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/56186?apikey=' + MY_KEY + '&metric=true';

    // Create AJAX request
    const request = new XMLHttpRequest();
    request.open('GET', weatherURL);
    // Callback function for response
    request.onload = function (e) {
        const weatherForecast = JSON.parse(request.response);   // parsing response

        // Get weather table for display
        const tableRows = document.querySelectorAll('tbody tr');
        // Add new data for each days
        weatherForecast.DailyForecasts.forEach(function (dailyReport, index) {
            const options = { weekday: 'short' };
            tableRows[index].querySelector('th').innerHTML = new Date(dailyReport.Date).toLocaleDateString('en-US', options);
    
            const tableData = tableRows[index].querySelectorAll('td');
            // Set actual data from JavaScript object
            tableData[0].innerHTML = dailyReport.Temperature.Maximum.Value + '&#x2103;<br>' + dailyReport.Temperature.Minimum.Value + '&#x2103;';
            tableData[1].innerHTML = dailyReport.Day.IconPhrase;
            tableData[2].innerHTML = dailyReport.Night.IconPhrase
        });
        // Make weather container visible
        document.querySelector('.weather-container').style.display = 'block';
    }
    request.send();
}


// login button click event handler
document.querySelector('#login-button').onclick = function () {
    // get text from login button
    const loginStatus = document.querySelector('#login-button').innerHTML;

    if (loginStatus === 'Login') {
        // Clear error message
        clearErrorMsg();
        // Test input validation
        const checkEmail = validateEmail();
        const checkPassword = validatePassword();
        if (checkEmail & checkPassword) {
            // Change button text
            document.querySelector('#login-button').innerHTML = "Logout";
            // Make login input form invisible
            document.querySelector('.login-form-container form').style.display = 'none';
            // clear input password field after login
            document.querySelector('[type="password"]').value = '';
            displayWelcomeMsg();
            login();
        }
    } else {    // logout process
        // Remove welcome message container from HTML
        document.querySelector('.login-form-container').removeChild(document.querySelector('.login-form-container div'));
        document.querySelector('#login-button').innerHTML = "Login";    // Change button text
        // Make login input form visible
        document.querySelector('.login-form-container form').style.display = 'block';
        // Make weather information container invisible
        document.querySelector('.weather-container').style.display = 'none';
    }
}


// Load initial status
//  - today's message, date and time
const todayMsgContainer = document.querySelector('#today-message');
const today = new Date();

// Date string option setting
const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };

document.querySelector('#today').innerHTML = today.toLocaleDateString('en-US', options);
document.querySelector('#current-time').innerHTML = today.toLocaleTimeString('en-US');

// Set interval to display clock.
window.setInterval(function(){
    const today = new Date();
    document.querySelector('#current-time').innerHTML = today.toLocaleTimeString('en-US');
}, 1000);

// Famous Quotes URL
const famousQuotesURL = 'https://andruxnet-random-famous-quotes.p.rapidapi.com/?cat=famous&count=1';
// Create AJAX request
const quotesRequest = new XMLHttpRequest();
quotesRequest.open('GET', famousQuotesURL);
quotesRequest.setRequestHeader('X-RapidAPI-Key', '577a1fcbf6msh8c12c140bf08a60p124934jsn2387f29acd2f');
// Callback function for response
quotesRequest.onload = function (e) {
    const famousQuotes = JSON.parse(quotesRequest.response);   // parsing response
    document.querySelector('blockquote p').innerHTML = '"' + famousQuotes[0].quote + '"';
    document.querySelector('blockquote footer').innerHTML = '<strong>' + famousQuotes[0].author + '</strong>';
};
quotesRequest.send();