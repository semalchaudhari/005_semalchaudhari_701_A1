function registerStudent() {
    return Promise.resolve("Semal");
}

function assignRollNo(name) {
    console.log("Student:", name);
    return Promise.resolve(101);
}

function displayDetails(rollNo) {
    console.log("Roll Number:", rollNo);
}

registerStudent()
    .then(assignRollNo)
    .then(displayDetails)
    .catch(console.error);