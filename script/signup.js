// Toggle password visibility
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

// Validate form
document.getElementById('signupForm').addEventListener('submit', event => {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_password").value;
    const errorMessage = document.getElementById("error-message");

    if (password !== confirmPassword) {
        event.preventDefault(); // Stop form submission
        errorMessage.textContent = "Passwords do not match!";
        errorMessage.style.display = "block";
    } else {
        errorMessage.style.display = "none";
    }
});

const form = document.getElementById('signupForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    

    function showLoader() {
      document.getElementById('loader').style.display = 'flex';
    }
    
    function hideLoader() {
      document.getElementById('loader').style.display = 'none';
    }
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      showLoader();
      const response = await fetch('http://localhost:8000/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message || 'Signup successful!');
        window.location.href = 'login.html';
      } else {
        document.getElementById('error-message').textContent = result.error || 'Signup failed.';
        document.getElementById('error-message').style.display = 'block';
      }
    } catch (error) {
      console.error('Error:', error);
    }finally {
      hideLoader();
    }
  });