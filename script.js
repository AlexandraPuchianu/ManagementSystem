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
    
    let employeesTable = document.querySelector("table");

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
    console.log(employeesList)
    let newRow = ` <tr>
                        <td id="firstName">${newEmployee.firstName}</td>
                        <td id="lastName">${newEmployee.lastName}</td>
                        <td id="email">${newEmployee.email}</td>
                        <td id="gender">${newEmployee.gender}</td>
                        <td id="birthdate">${newEmployee.birthdate}</td>
                        <td><button onclick="deleteEmployee(this)" id="deleteBtn"><i class="fa fa-close"></i></button></td>
                    </tr>`;
    
    console.log(employeesTable)
            
    employeesTable.innerHTML += newRow;
}

function deleteEmployee(elem) {
    var row = elem.parentNode.parentNode;
    row.parentNode.removeChild(row);
}