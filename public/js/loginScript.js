//get the elements from the login form 
const emailInput = document.getElementById("email-input");
const emailLabel = document.getElementById("email-label");
const passwordInput = document.getElementById("password-input");
const passwordLabel = document.getElementById("password-label");

function addFadeStylingLabel (elementInput, elementLabel) {
    elementInput.addEventListener("input", () => {
        if (elementInput.value.trim() === "") {
            elementLabel.style.opacity = "1";
        } else {
            elementLabel.style.opacity = "0";
        }
    });
}

addFadeStylingLabel(emailInput, emailLabel);
addFadeStylingLabel(passwordInput, passwordLabel);