let subjectCount = 0;
let hasButton = false;

let subjectCountField = document.getElementById("subjectCount");

subjectCountField.addEventListener("keypress", function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('initialise').click();
    }
});

function createGradeSelector(n) {
    n = parseInt(n);
    let select = document.createElement("select");
    select.id = "subject" + n + "grade";
    select.classList.add("textbox");
    let gradeArray = ['O', 'A+', 'A', 'B+', 'B', 'C', 'F'];
    let optionsArray = [];
    for (let i = 0, j = 10; i < gradeArray.length; i++, j--) {
        let option = document.createElement("option");
        option.value = j;
        option.innerHTML = gradeArray[i];
        optionsArray.push(option);
    }
    for (let i = 0; i < optionsArray.length; i++) {
        select.appendChild(optionsArray[i]);
    }
    select.style.width = '5em';
    return select;
}

function deleteAllChildren(id) {
    let element = document.getElementById(id);
    while (element.firstChild) {
        element.removeChild(element.lastChild);
    }
}

function createH1(text) {
    let h1 = document.createElement("h1");
    h1.innerHTML = text;
    return h1;
}

function generateTable() {
    deleteAllChildren("subjects");
    deleteAllChildren("credits");
    deleteAllChildren("grades");
    document.getElementById('subjects').appendChild(createH1("Subjects"));
    document.getElementById('credits').appendChild(createH1("Credits"));
    document.getElementById('grades').appendChild(createH1("Grades"));
    subjectCount = document.getElementById("subjectCount").value;
    try {
        subjectCount = parseInt(subjectCount);
    } catch (e) {
        alert("Please enter a valid number");
    }
    for (let i = 0; i < subjectCount; i++) {
        let subjectTextField = createTextField(i, "name");
        document.getElementById("subjects").appendChild(subjectTextField);
        let gradeTextField = createGradeSelector(i);
        document.getElementById("grades").appendChild(gradeTextField);
        let creditsTextField = createTextField(i, "credits");
        document.getElementById("credits").appendChild(creditsTextField);
    }
    if (!hasButton) {
        let submit = document.createElement("button");
        submit.classList += 'button';
        submit.innerHTML = "Calculate CGPA";
        submit.onclick = displayCGPA;
        document.body.appendChild(submit);
        hasButton = true;
    }
}

function createTextField(n, name) {
    n = parseInt(n);
    let textField = document.createElement("input");
    textField.type = "text";
    textField.id = "subject" + n + name;
    textField.placeholder = "Subject " + n + " " + name;
    textField.classList.add("textbox");
    return textField;
}

function getCGPA() {
    let totalCredits = 0;
    let totalGrades = 0;
    for (let i = 0; i < subjectCount; i++) {
        // let subject = document.getElementById("subject" + i + "name").value;
        let grade = document.getElementById("subject" + i + "grade").value;
        let credits = document.getElementById("subject" + i + "credits").value;
        try {
            credits = parseFloat(credits);
            grade = parseInt(grade);
        } catch (e) {
            alert("Please enter a valid number");
        }
        totalCredits += credits;
        totalGrades += grade * credits;
    }
    let cgpa = totalGrades / totalCredits;
    return cgpa;
}

function displayCGPA() {
    let cgpa = getCGPA();
    let label = document.getElementById("heading");
    cgpa = cgpa.toPrecision(3);
    label.innerHTML = "Your CGPA is <span class = 'orange'>" + cgpa + "</span>";
}