/**
 * 420-PX4-AB JAVASCRIPT Assignment-1
 * 
 *  - Author: Jeonghoon Lee(1896357)
 *  - Created Date: Jan. 11, 2019
 *  - Update functions to handle html page at Jan.15
 */

/**
 * Constructor of Student Class 
 * @param {String} first firstname string
 * @param {String} last lastname string
 * @param {Number} age age of student
 */
function Student(first, last, age) {
    this.name = {
        'first': first,
        'last': last
    };
    this.age = age;
}

/**
 * method: Student::getFullName()
 * Create fullname of student
 * @return {string} student's fullname
 */
Student.prototype.getFullName = function() {
    return this.name.first + ' ' + this.name.last;
};

/**
 * method: Student::getStudentInfo()
 * @return {string} student detail information
 */
Student.prototype.getStudentInfo = function() {
    return 'Name: ' + this.getFullName() + ', Age: ' + this.age;
}

// create students' information array
let students = [
    new Student('Aakash', 'Malhotra', 35),
    new Student('Atreya Paudel', 'Vijit', 35),
    new Student('Tyler', 'Beland', 35),
    new Student('Nataliia', 'Buchovska', 35),
    new Student('Mohammad', 'Dadmehr', 35),
    new Student('Dezhi', 'Ding', 35),
    new Student('Farid', 'Eslambolchi', 35),
    new Student('Taylor', 'Gillis', 35),
    new Student('Olga', 'Gorborukova', 35),
    new Student('Jialing', 'Huang', 35),
    new Student('Irwin', 'Kee', 35),
    new Student('Dmitriy', 'Kryukov', 35),
    new Student('Jeonghoon', 'Lee', 35),
    new Student('Yangyang', 'Ma', 35),
    new Student('Josiane', 'Miron', 35),
    new Student('Mohammadreza', 'Saleh', 35),
    new Student('Bian Yu', 'Wang', 35),
    new Student('Zhaolong', 'Wang', 35),
    new Student('Varut', 'Wongsuwan', 35),
    new Student('Hong Yu', 'Zhao', 35),
    new Student('Zhan Ping', 'Zhao', 35),
    new Student('Jie', 'Zhou', 35)
];


/**
 * Search a student by name and return array of indexes
 * @param {string} firstName 
 * @param {string} lastName
 * @return {array of number} array of matched index of student name
 */
function searchByName(firstName, lastName) {
    const mactchedIndexes = [];

    students.forEach(function(student, index) {
        if (student.name.first == firstName && student.name.last == lastName) {
            mactchedIndexes.push(index);
        }
    });
    return mactchedIndexes;
}


/**
 * Add a new student into the array of students
 * @param {string} firstName 
 * @param {string} lastName 
 * @param {number} age
 * @return {number} length of students array
 */
function addStudent(firstName, lastName, age) {
    const newStudent = new Student(firstName, lastName, age);
    students.push(newStudent);

    return students.length;
}


/**
 * Remove a student at index from the students array
 * @param {number} index
 * @return {object} deleted student object
 */
function removeStudentByIndex(index) {
    return students.splice(index, 1)[0];
}


/**
 * Compare student fullname for ascending order without case sensitivity
 * @param {object} student1 instance of Student
 * @param {object} student2 instance of Student
 * @return {number} A negative number if student1 occurs before student2;
 *     positive if student1 occurs after student2; 0 if they are equivalent.
 */
function compareNameByAscending(student1, student2) {
    const name1 = student1.getFullName().toLowerCase();
    const name2 = student2.getFullName().toLowerCase();

    return name1.localeCompare(name2);
}


/**
 * Compare student fullname for descending order without case sensitivity
 * @param {object} student1 instance of Student
 * @param {object} student2 instance of Student
 * @return {number} A negative number if student2 occurs before student1;
 *     positive if student2 occurs after student1; 0 if they are equivalent.
 */
function compareNameByDescending(student1, student2) {
    const name1 = student1.getFullName().toLowerCase();
    const name2 = student2.getFullName().toLowerCase();

    return name2.localeCompare(name1);
}


/**
 * Sort student array by name and print all
 *  - if ascendingOrder is true, then sort array in ascending order
 *  - else sort array in descending order
 * @param {array} arrayOfStudents   array of student 
 * @param {boolean} ascendingOrder 
 * @return {array} array of instances of student
 */
function sortByName(arrayOfStudents, ascendingOrder) {
    const newArray = arrayOfStudents.slice();     // don't want to change original array
    
    (ascendingOrder ? newArray.sort(compareNameByAscending) : newArray.sort(compareNameByDescending));
    return newArray;
}


/**
 * get a random student name
 * @return {string} student's fullname
 */
function getRandomName() {
    return students[Math.floor(Math.random() * students.length)].getFullName();
}


/**
 * Take the third letter of every student's name, append it to the beginning of their name 
 * and return array of new students name 
 * @return {array} array of string
 */
function addLetterToName() {
    let newArray = [];

    // Make new student name array that append the third letter of name on the beginning
    newArray = students.map(function(student) {
        const name = student.getFullName();
        return name[2] + name;
    });
    return newArray;
}

/**
 * Remove all HTML elements from result <div>
 */
function clearResultArea() {
    const result = document.querySelector('#result');

    // remove all existing child;
    while (result.firstChild) {
        result.removeChild(result.firstChild);
    }
}


/**
 * Search student name by input, and display matched index
 */
function search() {
    const result = document.querySelector('#result');

    const firstNameInput = document.createElement('input');
    const lastNameInput = document.createElement('input');
    const searchBtn = document.createElement('button');
    
    firstNameInput.setAttribute('type', 'text');
    firstNameInput.setAttribute('placeHolder', 'first name');
    lastNameInput.setAttribute('type', 'text');
    lastNameInput.setAttribute('placeHolder', 'last name');
    searchBtn.innerHTML = 'SEARCH'

    result.appendChild(firstNameInput);
    result.appendChild(lastNameInput);
    result.appendChild(searchBtn);

    searchBtn.onclick = function() {
        let searchResult = document.querySelector('#result div');

        // delete old result and create new result <div>
        if (searchResult != null) {
            result.removeChild(searchResult);
        }
        searchResult = document.createElement('div');
        result.appendChild(searchResult);

        const newElement = document.createElement('p');
        newElement.innerHTML = "Search Result: ";
        searchResult.appendChild(newElement);

        const matchedIndexes = searchByName(firstNameInput.value, lastNameInput.value);
        if (matchedIndexes.length > 0) {
            matchedIndexes.forEach(function (studentIndex) {
                const newElement = document.createElement('p');
                newElement.innerHTML = '[' + studentIndex + '] ' + students[studentIndex].getStudentInfo();
                searchResult.appendChild(newElement);
            });
        } else {
            newElement.innerHTML += "Not matched";
        }
    }
}


/**
 * Add new student into student array
 */
function addNewStudent() {
    const result = document.querySelector('#result');

    const firstNameInput = document.createElement('input');
    const lastNameInput = document.createElement('input');
    const ageInput = document.createElement('input');
    const addBtn = document.createElement('button');
    
    firstNameInput.setAttribute('type', 'text');
    firstNameInput.setAttribute('placeHolder', 'first name');
    lastNameInput.setAttribute('type', 'text');
    lastNameInput.setAttribute('placeHolder', 'last name');
    ageInput.setAttribute('type', 'text');
    ageInput.setAttribute('placeHolder', 'Age');
    addBtn.innerHTML = 'ADD'

    result.appendChild(firstNameInput);
    result.appendChild(lastNameInput);
    result.appendChild(ageInput);
    result.appendChild(addBtn);

    const addResult = document.createElement('div');
    result.appendChild(addResult);

    addBtn.onclick = function() {
        const newElement = document.createElement('p');
        newElement.innerHTML = 'Number of students after adding: ' + addStudent(firstNameInput.value, lastNameInput.value, ageInput.value);
        addResult.appendChild(newElement);
    }
}


/**
 * remove student from array
 */
function removeStudent() {
    const result = document.querySelector('#result');

    const firstNameInput = document.createElement('input');
    const lastNameInput = document.createElement('input');
    const deleteBtn = document.createElement('button');
    
    firstNameInput.setAttribute('type', 'text');
    firstNameInput.setAttribute('placeHolder', 'first name');
    lastNameInput.setAttribute('type', 'text');
    lastNameInput.setAttribute('placeHolder', 'last name');
    deleteBtn.innerHTML = 'DELETE'

    result.appendChild(firstNameInput);
    result.appendChild(lastNameInput);
    result.appendChild(deleteBtn);

    deleteBtn.onclick = function() {
        const matchedIndexes = searchByName(firstNameInput.value, lastNameInput.value);
        let removedStudents = '';

        if (matchedIndexes.length > 0) {
            // remove item from the end
            // if we remove it from the beginning, index number will be changed and make it bad result.
            matchedIndexes.reverse().forEach(function(studentIndex) {
                removedStudents += removeStudentByIndex(studentIndex).getFullName() + ', ';
            });
            // remove ', ' from string
            removedStudents = removedStudents.slice(0, -2);
            
            const newElement = document.createElement('p');
            newElement.innerHTML = 'Removed students name: ' + removedStudents;
            result.appendChild(newElement);

            newElement = document.createElement('p');
            newElement.innerHTML = 'Number of students: ' + students.length;
            result.appendChild(newElement);
        } else {
            if (firstNameInput.value === '' || lastNameInput.value === '') {
                alert('Please type student name!!!');
            } else {
                const newElement = document.createElement('p');
                newElement.innerHTML = firstNameInput.value + ' ' + lastNameInput.value + ' is not in the student list.';
                result.appendChild(newElement);
            }
        }
    }
}

/**
 * Display all of student information
 */
function displayAll() {
    const result = document.querySelector('#result');
    const studList = document.createElement('ol');

    students.forEach(function(student) {
        const item = document.createElement('li');
        item.innerHTML = student.getFullName();
        studList.appendChild(item);
    });
    result.appendChild(studList);
}


/**
 * Display all of student information by alphabetical order 
 * without case sensitive
 */
function sortAndPrintAll() {
    const result = document.querySelector('#result');
    const sortedArray = sortByName(students, true);

    // create ordered list tag
    const studList = document.createElement('ol');
    // create list item for each student name
    sortedArray.forEach(function(student) {
        const item = document.createElement('li');
        item.innerHTML = student.getFullName();
        studList.appendChild(item);
    });
    result.appendChild(studList);
}


/**
 * Display student name randomly
 */
function displayStudentRandomly() {
    const result = document.querySelector('#result');
    const newElement = document.createElement('p');

    newElement.innerHTML = 'Student name: ' + getRandomName();
    result.appendChild(newElement);
}


/**
 * Add letter and display sorted list
 */
function addLetterAndDisplay() {
    // add letter to name, get new name array and sort them
    const newArray = addLetterToName().sort();

    // get result display area
    const result = document.querySelector('#result');
    // create ordered list tag
    const studList = document.createElement('ol');
    // create list item for each student name
    newArray.forEach(function(name) {
        const item = document.createElement('li');
        item.innerHTML = name;
        studList.appendChild(item);
    });
    result.appendChild(studList);
}


/**
 * remove all element from result <div>
 * and run function by functionToOperator argument
 * @param {Number} functionToOperator
 */
function run(functionToOperator) {   
    // clear result display area
    clearResultArea();

    switch (functionToOperator) {
        case 1:
            search();
            break;
        case 2:
            addNewStudent();
            break;
        case 3:
            removeStudent();
            break;
        case 4:
            displayAll();
            break;
        case 5:
            sortAndPrintAll();
            break;
        case 6:
            displayStudentRandomly();
            break;
        case 7:
            addLetterAndDisplay();
            break;
    }
}

// get <select> element
const selectOption = document.querySelector('select');

selectOption.onchange = function() {
    run(selectOption.selectedIndex);
}
