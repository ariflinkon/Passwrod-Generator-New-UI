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
    const popup = document.createElement('div');
    popup.className = 'fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50';
    popup.innerHTML = `
        <div class="bg-white p-6 rounded shadow-lg">
            <p class="text-red-500">Please select at least one option to generate a password.</p>
            <button class="mt-4 bg-blue-500 text-white px-4 py-2 rounded" id="closePopup">Close</button>
        </div>
    `;
    document.body.appendChild(popup);

    document.getElementById('closePopup').addEventListener('click', () => {
        document.body.removeChild(popup);
    });

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
