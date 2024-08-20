document.addEventListener('DOMContentLoaded', () => {
    const lowerCaseCheckbox = document.querySelector('input[name="LowerCase"]');
    const higherCaseCheckbox = document.querySelector('input[name="HigherCase"]');
    const digitsCheckbox = document.querySelector('input[name="Digits"]');
    const symbolsCheckbox = document.querySelector('input[name="Symbols"]');
    const generateButton = document.getElementById('submitButton');
    const generatedPassElement = document.getElementById('GeneratedPass');

    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const higherCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digitChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    function generatePassword() {
        let availableChars = '';
        if (lowerCaseCheckbox.checked) {
            availableChars += lowerCaseChars;
        }
        if (higherCaseCheckbox.checked) {
            availableChars += higherCaseChars;
        }
        if (digitsCheckbox.checked) {
            availableChars += digitChars;
        }
        if (symbolsCheckbox.checked) {
            availableChars += symbolChars;
        }

        if (availableChars === '') {
            alert('Please select at least one option to generate a password.');
            return;
        }

        let password = '';
        const passwordLength = 12; // You can change the length as needed
        for (let i = 0; i < passwordLength; i++) {
            const randomIndex = Math.floor(Math.random() * availableChars.length);
            password += availableChars[randomIndex];
        }

        generatedPassElement.textContent = password;
    }

    generateButton.addEventListener('click', generatePassword);
});
