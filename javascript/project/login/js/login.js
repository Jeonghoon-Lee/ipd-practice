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
    while (errorlist.firstChild != null) {
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
 * Make weather information table
 * @param {object} weatherForecast converted from accuweather json data
 */
function displayWeather(weatherForecast) {
    // Get weather table for display
    const tableBody = document.querySelector('tbody');
    // Remove all the child elements if exist
    while (tableBody.firstChild != null) {
        tableBody.removeChild(tableBody.firstChild);
    }
    // Add new data for each days
    weatherForecast.DailyForecasts.forEach(function (dailyReport) {
        // create table row
        let tableRow = document.createElement('tr');
        // set header element
        let tableHeader = document.createElement('th');
        const options = { weekday: 'short' };
        tableHeader.innerHTML = new Date(dailyReport.Date).toLocaleDateString('en-US', options);
        tableHeader.scope = 'row';
        // create table data element
        const tableData1 = document.createElement('td');
        const tableData2 = document.createElement('td');
        const tableData3 = document.createElement('td');

        // Set actual data from JavaScript object
        tableData1.innerHTML = dailyReport.Temperature.Maximum.Value + '&#x2103;<br>' + dailyReport.Temperature.Minimum.Value + '&#x2103;';
        tableData2.innerHTML = dailyReport.Day.IconPhrase;
        tableData3.innerHTML = dailyReport.Night.IconPhrase

        // Add link to accuweather website
        tableRow.onclick = (() => parent.open(dailyReport.Link));
        // Append row into table
        tableRow.appendChild(tableHeader);
        tableRow.appendChild(tableData1);
        tableRow.appendChild(tableData2);
        tableRow.appendChild(tableData3);
        tableBody.appendChild(tableRow);
    });
    // Make weather container visible
    document.querySelector('.weather-container').style.display = 'block';
}

/**
 * Make data request to accuweather and handle received data.
 */
function getWeatherInfo() {
    // Get an unique API key from https://developer.accuweather.com/packages
    const MY_KEY = 'Add Your Key';
    const weatherURL = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/56186?apikey=' + MY_KEY + '&metric=true';

    /**
     * Using jquery
     */
    $.ajax({
        url: weatherURL,
    }).done(function (weatherForecast) {
        displayWeather(weatherForecast);
    }).fail(function (jqXHR) {
        console.error(jqXHR);
    });

    /**
     * Using XHR
     */
    // const request = new XMLHttpRequest();
    // request.open('GET', weatherURL);
    // // Callback function for response
    // request.onload = function(e) {
    //     const weatherForecast = JSON.parse(request.response);   // parsing response
    //     displayWeather(weatherForecast)
    //  }
    // // error handling
    // request.onerror = function(e) {
    //     console.error("[Error] Request was failed.");
    // }
    // request.send();
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
            getWeatherInfo();
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

// Display date and time
const timeContainer = document.querySelector('#time-container');
const today = new Date();

// Create span element to display date and time
const dateSpan = document.createElement('span');
const timeSpan = document.createElement('span');

dateSpan.innerHTML = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' });
dateSpan.classList.add('mr-2');
timeSpan.innerHTML = today.toLocaleTimeString('en-US');

timeContainer.appendChild(dateSpan);
timeContainer.appendChild(timeSpan);

// Set interval to display clock.
window.setInterval(function () {
    const today = new Date();
    document.querySelectorAll('#time-container span')[1].innerHTML = today.toLocaleTimeString('en-US');
}, 1000);


/**
 * Create HTML element for famous quotes and display it.
 * @param {object} famousQuotes converted from json
 */
function displayFamousQuotes(famousQuotes) {
    const quoteElement = document.createElement('p');
    const authorElement = document.createElement('footer')

    quoteElement.innerHTML = '"' + famousQuotes[0].quote + '"';
    authorElement.innerHTML = '<strong>' + famousQuotes[0].author + '</strong>';

    quoteElement.classList.add('mb-0', 'text-info');
    authorElement.classList.add('blockquote-footer');

    document.querySelector('blockquote').appendChild(quoteElement);
    document.querySelector('blockquote').appendChild(authorElement);
    document.querySelector('blockquote').style.display = 'block';
}

// Famous Quotes URL
const famousQuotesURL = 'https://andruxnet-random-famous-quotes.p.rapidapi.com/?cat=famous&count=1';

/**
 * Using jquery
 */
$.ajax({
    url: famousQuotesURL,
    headers: {
        'X-RapidAPI-Key': '577a1fcbf6msh8c12c140bf08a60p124934jsn2387f29acd2f'
    }
}).done(function (famousQuotes) {
    displayFamousQuotes(famousQuotes);
}).fail(function () {
    // Display default Quotes
    displayFamousQuotes([{quote:'If you want to be happy, be.', author:'Leo Tolstoy'}]);
    // Print error to console
    console.error('Error! from famousQuote');
});

/**
 * Using XHR
 */
// Create AJAX request
// const quotesRequest = new XMLHttpRequest();
// quotesRequest.open('GET', famousQuotesURL);
// quotesRequest.setRequestHeader('X-RapidAPI-Key', '577a1fcbf6msh8c12c140bf08a60p124934jsn2387f29acd2f');

// // Callback function for response
// quotesRequest.onload = function (e) {
//     const famousQuotes = JSON.parse(quotesRequest.response);   // Convert response to Java object
//     displayFamousQuotes(famousQuotes);
// };

// // Error handling
// quotesRequest.onerror = function(e) {
//     console.error("XMLHttpRequest() failed.");
// }
// quotesRequest.send();
