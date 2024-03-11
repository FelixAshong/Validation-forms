const form = document.querySelector('#signup');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');
const togglePassword = document.querySelector('#togglePassword');
const toggleOriginalPassword = document.querySelector('#toggleOriginalPassword')

//shows error message
const showError = (input, message) => {
    const formField = input.parentElement;
    formField.classList.remove('success');
    formField.classList.add('error');
    const errorMessage = formField.querySelector('small');
    errorMessage.textContent = message;
}

//show success message
const showSuccess = (input) => {
    const formField = input.parentElement;
    formField.classList.remove('error');
    formField.classList.add('success');
    const errorMessage = formField.querySelector('small');
    errorMessage.textContent = " ";
}

//checks input field
const isRequired = value => value === "" ? false : true;

//check the length of inputfield
const isBetween = (length, min, max) => length < min || length > max ? false : true;

//checks email is valid
const isEmailValid = email => {
    const regex =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}

//checks password is valid
const isPasswordSecure = password => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    return regex.test(password);
}

//validate username field
const checkUsername = () => {
    let valid = false;
    const min=3, max = 25;
    const usernameValue = username.value.trim();

    if(!isRequired(usernameValue)){
        showError(username, 'Username cannot be blank.')
    } else if (!isBetween(usernameValue.length, min, max)){
        showError(username, `Username must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(username);
        valid = true;
    }

    return valid;
}

//validate email field
const checkEmail = () => {
    let valid = false;
    const emailValue = email.value.trim();

    if(!isRequired(emailValue)){
        showError(email, 'Email cannot be blank.')
    } else if (!isEmailValid(emailValue)){
        showError(email, 'Email is not Valid')
    } else {
        showSuccess(email);
        valid = true;
    }
    return valid;
}

//Validate password field
const checkPassword = () => {
    let valid = false;
    const passwordValue = password.value.trim();

    if(!isRequired(passwordValue)){
        showError(password, 'Password cannot be blank.')
    } else if (!isPasswordSecure(passwordValue)){
        showError(password, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)')
    } else {
        showSuccess(password);
        valid = true;
    }
    return valid;
}

//validate confirm password
const checkConfirmPassword = () => {
    let valid = false;
    const confirmPasswordVal = confirmPassword.value.trim();
    const passwordValue = password.value.trim();

    if(!isRequired( confirmPasswordVal)){
        showError(confirmPassword, 'Confirm Password is required')
    } else if (passwordValue !== confirmPasswordVal){
        showError(confirmPassword, 'Confirm Password does not match')
    } else {
        showSuccess(confirmPassword);
        valid = true;
    }
    return valid;
}

togglePassword.addEventListener('click', function(){
     // toggle the type attribute
     const type = confirmPassword.getAttribute("type") === "password" ? "text" : "password";
     confirmPassword.setAttribute('type', type);

    // toggle the icon
    this.classList.toggle("bi-eye");
});

toggleOriginalPassword.addEventListener('click', function(){
    // toggle the type attribute
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute('type', type);

   // toggle the icon
   this.classList.toggle("bi-eye");
});

//modifying submit event handler
form.addEventListener('submit', function(e){
    e.preventDefault();

    let isUsernameValid = checkUsername(),
    isEmailValid = checkEmail(),
    isPasswordValid = checkPassword(),
    isConfirmPasswordValid = checkConfirmPassword();

    let isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;

    // submit to the server if the form is valid
    if (isFormValid) {
        const formData = {
            username: username.value,
            email: email.value,
            password: password.value,
            confirmPassword: confirmPassword.value
        };
    
        // Log the form data to the console
        console.log(formData);
    }
})