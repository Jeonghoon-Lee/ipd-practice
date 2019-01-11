var studentList = [
    { firstName: 'Aakash', lastName: 'Malhotra' },
    { firstName: 'Atreya Paudel', lastName: 'Vijit' },
    { firstName: 'Tyler', lastName: 'Beland' },
    { firstName: 'Nataliia', lastName: 'Buchovska' },
    { firstName: 'Mohammad', lastName: 'Dadmehr' },
    { firstName: 'Dezhi', lastName: 'Ding' },
    { firstName: 'Farid', lastName: 'Eslambolchi' },
    { firstName: 'Taylor', lastName: 'Gillis' },
    { firstName: 'Olga', lastName: 'Gorborukova' },
    { firstName: 'Jialing', lastName: 'Huang' },
    { firstName: 'Irwin', lastName: 'Kee' },
    { firstName: 'Dmitriy', lastName: 'Kryukov' },
    { firstName: 'Jeonghoon', lastName: 'Lee' },
    { firstName: 'Yangyang', lastName: 'Ma' },
    { firstName: 'Josiane', lastName: 'Miron' },
    { firstName: 'Mohammadreza', lastName: 'Saleh' },
    { firstName: 'Bian Yu', lastName: 'Wang' },
    { firstName: 'Zhaolong', lastName: 'Wang' },
    { firstName: 'Varut', lastName: 'Wongsuwan' },
    { firstName: 'Hong Yu', lastName: 'Zhao' },
    { firstName: 'Zhan Ping', lastName: 'Zhao' },
    { firstName: 'Jie', lastName: 'Zhou' }
];


/**
 * Return string of full name
 * @param {string} student 
 */
function getFullName(student) {
    return student.firstName + ' ' + student.lastName;
}


/**
 * Search a student by name and return index in an array
 * @param {string} firstName 
 * @param {string} lastName
 * @return {array of number} array of matched index of student name in the array
 */
function searchByName(firstName, lastName) {
    let mactchedIndexes = [];

    studentList.forEach(function(student, index) {
        if (student.firstName == firstName && student.lastName == lastName) {
            mactchedIndexes.push(index);
        }
    });
    return mactchedIndexes;
}


/**
 * Add a new student
 * @param {string} firstName 
 * @param {string} lastName 
 */
function addStudent(firstName, lastName) {
    studentList.push({firstName, lastName});
}


/**
 * Remove a student from the array
 */
function removeStudent() {
    studentList.pop();
}


/**
 * Print all student name in the array
 */
function printAll() {
    studentList.forEach(function(student) {
        console.log(getFullName(student));
    });
}


/**
 * 
 * @param {object} student1 
 * @param {object} student2 
 * @return {number} A negative number if student1 occurs before student2; 
 *                  positive if student1 occurs after student2;
 *                  0 if they are equivalent.
 */
function compareNameByAscending(student1, student2) {
    let fullname1 = getFullName(student1).toLowerCase();
    let fullname2 = getFullName(student2).toLowerCase();

    return fullname1.localeCompare(fullname2);
}


/**
 * 
 * @param {object} student1 
 * @param {object} student2 
 * @return {number} A negative number if student2 occurs before student1; 
 *                  positive if student2 occurs after student1;
 *                  0 if they are equivalent.
 */
function compareNameByDescending(student1, student2) {
    let fullname1 = getFullName(student1).toLowerCase();
    let fullname2 = getFullName(student2).toLowerCase();

    return fullname2.localeCompare(fullname1);
}


/**
 * Sort student array by name and print
 * @param {boolean} ascendingOrder
 */
function printSortedList(ascendingOrder) {
    let sortedArray = [];
    
    if (ascendingOrder) {
        sortedArray = studentList.sort(compareNameByAscending);
    } else {
        sortedArray = studentList.sort(compareNameByDescending);
    }
    // print sorted student list
    sortedArray.forEach(student => console.log(getFullName(student)));
}


/**
 * Print random student name
 */
function printRandomName() {
    let randomIndex = Math.floor(Math.random() * studentList.length);

    console.log(getFullName(studentList[randomIndex]));
}


/**
 * Take the third letter of every student's name, 
 * append it to the beginning of their name 
 * and display the sorted list of students 
 */
function sortNameByThirdLetter() {
    let newStudentArray = [];

    // Make new student name array 
    // that append the third letter of name on beginning of name
    newStudentArray = studentList.map(function(student) {
        let fullName = getFullName(student);
        return fullName[2] + fullName;
    });

    // Sort and print result
    newStudentArray.sort().forEach(name => console.log(name));
}


const functionToOperator = 7;

switch (functionToOperator) {
    case 1:
        console.log(searchByName('Jeonghoon', 'Lee'));
        break;
    case 2:
        addStudent('James', 'Dean');
        break;
    case 3:
        removeStudent();
        break;
    case 4:
        printAll();
        break;
    case 5:
        printSortedList(true);
        break;
    case 6:
        printRandomName();
        break;
    case 7:
        sortNameByThirdLetter();
        break;
}
