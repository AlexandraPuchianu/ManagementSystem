var person = {firstName:"", 
            lastName:"", 
            email:"", 
            gender:"",
            birthdate:"",
            picture:""
        };
        
var employeesList=[];

jQuery(document).ready(function ($) {
    $.ajax({
        method: "GET",
        url: 'https://localhost:5001/employee/Employee',
        success: function (data) {
            employeesList = data;
            loadEmployees(employeesList);
        },
        error: function (data) {
        alert(`Failed to load employees list.`);
        },
    });

});
   
var monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"];

function loadEmployees(employeesList){
    for (index = 0; index < employeesList.length; index++)
    { 
        console.log("astia sunt in for")
        console.log(employeesList[index]); 
        appendRow(employeesList[index])
    }
}
function validateInput(newEmployee){
        
    if (!newEmployee.firstName || !newEmployee.lastName || !newEmployee.email || !newEmployee.picture) {
        return false;
    }
    return true;
}
        
function addEmployee() {

    var newEmployee = new Object();
    newEmployee.firstName = document.getElementById('fname').value;
    newEmployee.lastName = document.getElementById('lname').value;
    newEmployee.email = document.getElementById('email').value;
    newEmployee.picture = document.getElementById('picture').value;
    console.log(document.getElementById('picture').value)
    if (!validateInput(newEmployee)) {
        alert("You need to fill all the information!");
        console.log(newEmployee.picture)
        return;
    }

    newEmployee.gender = document.getElementById('gender').value;
        
    // birthdateString = document.getElementById('birthdate').value;
    // var birthdateArray = birthdateString.split("-")
    
    // newEmployee.birthdate = birthdateArray[2] + " " +monthNames[parseInt(birthdateArray[1] - 1)] + " " + birthdateArray[0]
    
    newEmployee.birthdate = document.getElementById('birthdate').value;

    employeesList.push(newEmployee)
    appendRow(newEmployee)
}

function appendRow(employee){
    let employeesTable = document.querySelector("table");
    var rowId = employeesTable.getElementsByTagName("tr").length;
    upload(employee.picture, rowId)
    let newRow = ` <tr>
                        <td id="picture"><img id='profPic" + rowId +"' style='width: 20px; height: 20px' src='#'>
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

    console.log("aici e lista dar afara gen :")
        console.log(employeesList)

}

function upload(input,rowId){
    console.log(input.files)
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $("#profPic" + rowId)
                .attr("src", e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function sortEmployeesByDate() {

    var sortAttribute = document.getElementById("sortButton").getAttribute("sort");
    if(sortAttribute == "up") {
        document.getElementById("sortButton").setAttribute("sort", "down");
    }else {
        document.getElementById("sortButton").setAttribute("sort", "up");
    }

    var employeesTable, rows, switching, index, x, y, shouldSwitch;
    employeesTable = document.querySelector("table");
    switching = true;
    
    while (switching) {
        switching = false;
        rows = employeesTable.rows;
        for (index = 1; index < (rows.length - 1); index++) {
            shouldSwitch = false;
            x = new Date(rows[index].getElementsByTagName("td")[5].innerText);
            y = new Date(rows[index + 1].getElementsByTagName("td")[5].innerText);
            if(sortAttribute == "up") {
                if (x < y) {
                    shouldSwitch = true;
                    break;
                }
            } else if(sortAttribute == "down") {
                if (x > y) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[index].parentNode.insertBefore(rows[index + 1], rows[index]);
            switching = true;
        }
    }
}

function filterEmployees() {
    let filter = document.getElementById('filterGender').value;
    let employeesTable = document.querySelector("table");
    tr = employeesTable.getElementsByTagName("tr");
  
    for (index = 0; index < tr.length; index++) {
      td = tr[index].getElementsByTagName("td")[4];
      if (td) {
        genderValue = td.textContent || td.innerText;
        if (genderValue == filter || filter == "") {
          tr[index].style.display = "";
        }else {
          tr[index].style.display = "none";
        }
      }
    }
  }