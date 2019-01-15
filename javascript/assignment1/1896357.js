/**
 * 420-PX4-AB JAVASCRIPT Assignment-1
 * 
 *  - Author: Jeonghoon Lee(1896357)
 *  - Date: Jan. 11, 2019
 */

// Array of students' name
let students = [
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
 * Return string of fullname
 * @param {object} student 
 * @return {string} fullname of student
 */
function getFullName(student) {
    return student.firstName + ' ' + student.lastName;
}


/**
 * Search a student by name and return array of indexes
 * @param {string} firstName 
 * @param {string} lastName
 * @return {array of number} array of matched index of student name
 */
function searchByName(firstName, lastName) {
    let mactchedIndexes = [];

    students.forEach(function(student, index) {
        if (student.firstName == firstName && student.lastName == lastName) {
            mactchedIndexes.push(index);
        }
    });
    return mactchedIndexes;
}


/**
 * Add a new student into the array of students
 * @param {string} firstName 
 * @param {string} lastName 
 * @return {number} length of students array
 */
function addStudent(firstName, lastName) {
    students.push({firstName, lastName});
    return students.length;
}


/**
 * Remove a student at index from the students array
 * @param {number} index
 * @return {object} deleted student object
 */
function removeStudent(index) {
    return students.splice(index, 1)[0];
}


/**
 * Print all student name in the array
 */
function printAll() {
    console.log('\n------- student list -------\n')
    students.forEach(function(student, index) {
        console.log(getFullName(student));
    });
}


/**
 * Compare student fullname for ascending order without case sensitivity
 * @param {object} student1 
 * @param {object} student2 
 * @return {number} A negative number if student1 occurs before student2;
 *     positive if student1 occurs after student2; 0 if they are equivalent.
 */
function compareNameByAscending(student1, student2) {
    let fullName1 = getFullName(student1).toLowerCase();
    let fullName2 = getFullName(student2).toLowerCase();

    return fullName1.localeCompare(fullName2);
}


/**
 * Compare student fullname for descending order without case sensitivity
 * @param {object} student1 
 * @param {object} student2 
 * @return {number} A negative number if student2 occurs before student1;
 *     positive if student2 occurs after student1; 0 if they are equivalent.
 */
function compareNameByDescending(student1, student2) {
    const fullName1 = getFullName(student1).toLowerCase();
    const fullName2 = getFullName(student2).toLowerCase();

    return fullName2.localeCompare(fullName1);
}


/**
 * Sort student array by name and print all
 *  - if ascendingOrder is true, then sort array in ascending order
 *  - else sort array in descending order
 * @param {boolean} ascendingOrder 
 */
function printSortedList(ascendingOrder) {
    let sortedArray = students.slice();
    
    (ascendingOrder ? sortedArray.sort(compareNameByAscending) : sortedArray.sort(compareNameByDescending));

    // print sorted student list
    console.log('\n------- sorted student list -------\n')
    sortedArray.forEach(student => console.log(getFullName(student)));
}


/**
 * Print random student name
 */
function printRandomName() {
    const randomIndex = Math.floor(Math.random() * students.length);

    console.log(getFullName(students[randomIndex]));
}


/**
 * Take the third letter of every student's name, append it to the beginning of their name 
 * and display the sorted list of students 
 */
function sortNameByThirdLetter() {
    let newStudentArray = [];

    // Make new student name array that append the third letter of name on the beginning
    newStudentArray = students.map(function(student) {
        const fullName = getFullName(student);
        return fullName[2] + fullName;
    });

    // Sort and print result
    console.log('\n------- sorted student list -------\n')
    newStudentArray.sort().forEach(name => console.log(name));
}


const functionToOperator = 7;

switch (functionToOperator) {
    case 1:
        console.log(searchByName('Jeonghoon', 'Lee'));
        break;
    case 2:
        console.log('length of array: ' + addStudent('James', 'Dean'));
        break;
    case 3:
        console.log(removeStudent(0));
        break;
    case 4:
        printAll();
        break;
    case 5:
        // sort array in ascending order
        printSortedList(true);
        break;
    case 6:
        printRandomName();
        break;
    case 7:
        sortNameByThirdLetter();
        break;
}
