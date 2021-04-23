function validateInput(){
    var firstName = document.getElementById('fname').value;
    var lastName = document.getElementById('lname').value;
    var email = document.getElementById('email').value;

    if (!firstName || !lastName || !email) {
        return false;
    }
    
    return true;
}