var person = {firstName:"", 
            lastName:"", 
            email:"", 
            gender:"",
            birthdate:""
        };
   
var monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"];

function validateInput(firstName, lastName, email){
        
    if (!firstName || !lastName || !email) {
        return false;
    }
    return true;
}
        
function addEmployee() {
    let employeesTable = document.querySelector("table");

    person.firstName = document.getElementById('fname').value;
    person.lastName = document.getElementById('lname').value;
    person.email = document.getElementById('email').value;
    
    if (!validateInput(person.firstName, person.lastName, person.email)) {
        warning.innerHTML="You need to fill all the information!";
        return;
    }
        
    warning.innerHTML="";

    person.gender = document.getElementById('gender').value;
    person.birthdate = document.getElementById('birthdate').value;
        
    var birthdate = person.birthdate.split("-")
    let newRow = ` <tr>
                        <td id="firstName">${person.firstName}</td>
                        <td id="lastName">${person.lastName}</td>
                        <td id="email">${person.email}</td>
                        <td id="gender">${person.gender}</td>
                        <td id="birthdate">${birthdate[2]} ${monthNames[parseInt(birthdate[1] - 1)]} ${birthdate[0]}</td>
                        <td><button onclick="deleteEmployee(this)" id="deleteBtn"><i class="fa fa-close"></i></button></td>
                    </tr>`;
    
    console.log(employeesTable)
            
    employeesTable.innerHTML += newRow;
}

function deleteEmployee(elem) {
    var row = elem.parentNode.parentNode;
    row.parentNode.removeChild(row);
}