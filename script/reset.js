// Toggle password visibility for the reset password page
document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        const field = document.getElementById(targetId);

        if (field.type === "password") {
            field.type = "text";
            button.textContent = "Hide";
        } else {
            field.type = "password";
            button.textContent = "Show";
        }
    });
});
