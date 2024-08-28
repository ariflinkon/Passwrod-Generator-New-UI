document.addEventListener('DOMContentLoaded', () => {
    const lowerCaseCheckbox = document.querySelector('input[name="LowerCase"]');
    const higherCaseCheckbox = document.querySelector('input[name="HigherCase"]');
    const digitsCheckbox = document.querySelector('input[name="Digits"]');
    const symbolsCheckbox = document.querySelector('input[name="Symbols"]');
    const generateButton = document.getElementById('submitButton');
    const generatedPassElement = document.getElementById('GeneratedPass');
    const passwordHistoryList = document.getElementById('passwordHistoryList');
    const clearHistoryButton = document.getElementById('clearHistoryButton'); // Add this line

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
            const popup = document.createElement('div');
            popup.className = 'fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50';
            popup.innerHTML = `
                <div class="bg-white p-6 rounded shadow-lg">
                    <p class="text-red-500">Please select at least one option to generate a password.</p>
                </div>
            `;
            document.body.appendChild(popup);

            setTimeout(() => {
                document.body.removeChild(popup);
            }, 3000); // Automatically remove after 3 seconds

            return;
        }
        let password = '';
        const passwordLength = 12; // You can change the length as needed
        for (let i = 0; i < passwordLength; i++) {
            const randomIndex = Math.floor(Math.random() * availableChars.length);
            password += availableChars[randomIndex];
        }

        generatedPassElement.textContent = password;
        generatedPassElement.appendChild(copyIcon); // Ensure the copy icon is always appended
        // Append the generated password to the history list
        const passwordItem = document.createElement('p');
        passwordItem.textContent = password;
        passwordItem.className = 'bg-gray-600 p-2 rounded mt-2';
        passwordHistoryList.appendChild(passwordItem);
    }

    generateButton.addEventListener('click', generatePassword);

    // Add this function to clear the history
    function clearHistory() {
        passwordHistoryList.innerHTML = '';
    }

    // Add event listener to the clear history button
    clearHistoryButton.addEventListener('click', clearHistory);

    // Add copy icon and feature
    const copyIcon = document.createElement('span');
    copyIcon.textContent = '📋';
    copyIcon.style.cursor = 'pointer';
    copyIcon.style.marginLeft = '10px';
    generatedPassElement.appendChild(copyIcon);

    copyIcon.addEventListener('click', () => {
        const password = generatedPassElement.textContent;
        navigator.clipboard.writeText(password).then(() => {
            alert('Password copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy password: ', err);
        });
    });
});