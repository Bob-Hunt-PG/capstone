'use strict';

const registrationFormButton = document.querySelector('.pg-c-registration--open');
const loginFormButton = document.querySelector('.pg-c-login--open');
const registrationForm = document.querySelector('.pg-c-registration--form');
const loginForm = document.querySelector('.pg-c-login--form');

const openRegistrationForm = (registrationFormButton) => {
    registrationFormButton.onclick = function(element) {
        loginForm.classList.remove('active');
        registrationForm.classList.add('active');
    }
}

const openLoginForm = (loginFormButton) => {
    loginFormButton.onclick = function(element) {
        loginForm.classList.add('active');
        registrationForm.classList.remove('active');
    }
}

openRegistrationForm(registrationFormButton);
openLoginForm(loginFormButton);