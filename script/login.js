const form = document.querySelector('form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    function showLoader() {
      document.getElementById('loader').style.display = 'flex';
    }
    
    function hideLoader() {
      document.getElementById('loader').style.display = 'none';
    }
    

    try {
      showLoader();
      const response = await fetch('http://localhost:8000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      if (response.ok) {
        alert(result.message || 'Login successful!');
        
        // Save token to session storage for later use
        sessionStorage.setItem('userToken', result.token);
        sessionStorage.setItem('username', result.user.name);
  
        // Redirect to dashboard
        window.location.href = 'welcome.html';
      } else {
        document.getElementById('error-message').textContent = result.error || 'Login failed.';
        document.getElementById('error-message').style.display = 'block';
      }
    } catch (error) {
      console.error('Error:', error);
    }finally {
      hideLoader();
    }
});
