const signupName = document.getElementById('signupName');
const signupEmail = document.getElementById('signupEmail');
const signupPassword = document.getElementById('signupPassword');
const signinEmail = document.getElementById('signinEmail');
const signinPassword = document.getElementById('signinPassword');
const signupBtn = document.getElementById('signupBtn');
const signinBtn = document.getElementById('signinBtn');
const invalidLoginMsg = document.getElementById('invalidLoginMsg');
const invalidSignupMsg = document.getElementById('invalidSignupMsg');
const loginWindow = document.getElementById('loginWindow');
const signupWindow = document.getElementById('signupWindow');
const welcomeWindow = document.getElementById('welcomeWindow');
const welcomeMsg = document.getElementById('welcomeMsg');
const rememeberCheck = document.getElementById('rememberCheck');


signupBtn.addEventListener('click', function () {
    loginWindow.classList.add('d-none')
    signupWindow.classList.remove('d-none')
    invalidLoginMsg.innerHTML = ''
})
signinBtn.addEventListener('click', function () {
    loginWindow.classList.remove('d-none')
    signupWindow.classList.add('d-none')
    invalidSignupMsg.innerHTML = ''
})


let sessionUser = localStorage.getItem('sessionUsername')
if (sessionUser) { //if there is a user logged in show welcome window.
    welcomeWindow.classList.remove('d-none');
    welcomeMsg.innerHTML = 'Welcome ' + sessionUser
}
else { // else show login window.
    loginWindow.classList.remove('d-none');
}

let usersArray = []
if (localStorage.getItem('users') == null) {
    usersArray = []
} else {
    usersArray = JSON.parse(localStorage.getItem('users'))
}




function signupIsEmpty() {

    if (signupName.value == "" || signupEmail.value == "" || signupPassword.value == "") {
        return true
    } else {
        return false
    }
}



function isExistingEmail() {
    for (let i = 0; i < usersArray.length; i++) {
        if (usersArray[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
            return true
        }
    }
}




//============Sign up================
function signUp() {
    if (signupIsEmpty() == true) {
        invalidSignupMsg.innerHTML = '<span class="text-danger m-3">Please Fill in all inputs.</span>'
        return false
    }
    let userObject = {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value,
    }
    if (usersArray.length == 0) {
        usersArray.push(userObject)
        localStorage.setItem('users', JSON.stringify(usersArray))
        invalidSignupMsg.innerHTML = '<span class="text-success m-3">Success</span>'
        return true
    }
    if (isExistingEmail() == true) {
        invalidSignupMsg.innerHTML = '<span class="text-danger m-3">Email already exists</span>'

    } else {
        usersArray.push(signUp)
        localStorage.setItem('users', JSON.stringify(usersArray))
        invalidSignupMsg.innerHTML = '<span class="text-success m-3">Success</span>'

    }


}




// =============Login================
function isLoginEmpty() {
    if (signinPassword.value == "" || signinEmail.value == "") {
        return true
    } else {
        return false
    }
}

function login() {
    if (isLoginEmpty() == true) {
        invalidLoginMsg.innerHTML = '<span class="text-danger m-3">Please Fill in all inputs.</span>'
        return false
    }
    let password = signinPassword.value
    let email = signinEmail.value
    for (let i = 0; i < usersArray.length; i++) {
        if (usersArray[i].email.toLowerCase() == email.toLowerCase() && usersArray[i].password.toLowerCase() == password.toLowerCase()) {
            if (rememeberCheck.checked == true) {
                localStorage.setItem('sessionUsername', usersArray[i].name)
            }
            else {
                sessionStorage.setItem('sessionUsername', usersArray[i].name)
            }
            loginWindow.classList.add('d-none');
            welcomeWindow.classList.remove('d-none');
            welcomeMsg.innerHTML = 'Welcome ' + usersArray[i].name;
        } else {
            invalidLoginMsg.innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>'
        }
    }

}




//logout
function logout() {
    localStorage.removeItem('sessionUsername')
    loginWindow.classList.remove('d-none');
    welcomeWindow.classList.add('d-none');
    invalidLoginMsg.innerHTML = '';
}