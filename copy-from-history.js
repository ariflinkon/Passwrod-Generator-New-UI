document.addEventListener('DOMContentLoaded', () => {
    const passwordHistoryList = document.getElementById('passwordHistoryList');

    function addCopyIcon(passwordItem) {
        const copyIcon = document.createElement('span');
        copyIcon.textContent = '📋';
        copyIcon.style.cursor = 'pointer';
        copyIcon.style.marginLeft = '10px';
        copyIcon.className = 'copy-icon';

        copyIcon.addEventListener('click', () => {
            const password = passwordItem.textContent;
            navigator.clipboard.writeText(password).then(() => {
                alert('Password copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy password: ', err);
            });
        });

        passwordItem.appendChild(copyIcon);
    }

    // Add copy icons to existing passwords in the history
    const existingPasswords = passwordHistoryList.querySelectorAll('p');
    existingPasswords.forEach(passwordItem => {
        addCopyIcon(passwordItem);
    });

    // Observe for new passwords added to the history
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeName === 'P') {
                        addCopyIcon(node);
                    }
                });
            }
        });
    });

    observer.observe(passwordHistoryList, { childList: true });
});