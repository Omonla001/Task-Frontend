const form = document.querySelector('form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('http://localhost:8000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message || 'Login successful!');
        // Handle successful login, e.g., store token or redirect
        const isAuthenticated = true;
        if (isAuthenticated) {
            // Redirect to Dashboard
            window.location.href = 'dashboard.html';
        }
      } else {
        alert(result.error || 'Login failed.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
});
