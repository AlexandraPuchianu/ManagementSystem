var person = {firstName:"", 
            lastName:"", 
            email:"", 
            gender:"",
            birthdate:""
        };
var employeesList=[];
   
var monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"];

function validateInput(firstName, lastName, email){
        
    if (!firstName || !lastName || !email) {
        return false;
    }
    return true;
}
        
function addEmployee() {

    var newEmployee = new Object();
    newEmployee.firstName = document.getElementById('fname').value;
    newEmployee.lastName = document.getElementById('lname').value;
    newEmployee.email = document.getElementById('email').value;
    
    if (!validateInput(newEmployee.firstName, newEmployee.lastName, newEmployee.email)) {
        warning.innerHTML="You need to fill all the information!";
        return;
    }
        
    warning.innerHTML="";

    newEmployee.gender = document.getElementById('gender').value;
        
    birthdateString = document.getElementById('birthdate').value;
    var birthdateArray = birthdateString.split("-")
    
    newEmployee.birthdate = birthdateArray[2] + " " +monthNames[parseInt(birthdateArray[1] - 1)] + " " + birthdateArray[0]
    
    employeesList.push(newEmployee)
    appendRow(newEmployee)
}

function appendRow(employee){
    let employeesTable = document.querySelector("table");
    let newRow = ` <tr>
                        <td id="firstName">${employee.firstName}</td>
                        <td id="lastName">${employee.lastName}</td>
                        <td id="email">${employee.email}</td>
                        <td id="gender">${employee.gender}</td>
                        <td id="birthdate">${employee.birthdate}</td>
                        <td><button onclick="deleteEmployee(this)" id="deleteBtn"><i class="fa fa-close"></i></button></td>
                    </tr>`;
                
    employeesTable.innerHTML += newRow;

}

function deleteEmployee(elem) {
    var row = elem.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function searchEmployees(){
    let employeesTable = document.querySelector("table");
    for (var index = 1, row; row = employeesTable.rows[index]; index++){
        var firstName = row.cells[0].innerText;
        input = document.getElementById("searchEmployees");
        filter = input.value.toUpperCase();
        if (firstName.toUpperCase().indexOf(filter) > -1) {
            employeesTable.rows[index].style.display = "";
        } else {
            employeesTable.rows[index].style.display = "none";
        }
    }
}