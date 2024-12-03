// function showLoader() {
//     document.getElementById('loader').style.display = 'flex';
// }
  
//   function hideLoader() {
//     document.getElementById('loader').style.display = 'none';
// }
// // Handle OTP Request Form Submission
// const requestResetForm = document.getElementById('requestReset');
  
// if (requestResetForm) {
//   requestResetForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
    

    
//     const email = requestResetForm.email.value.trim();
//     if (!email) {
//         alert('Please enter your email address.');
//         return;
        
//     }

//     try {
//         showLoader();
//         const response = await fetch('http://localhost:8000/users/requestReset', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email }),
//       });

//       const result = await response.json();
//       if (response.ok) {
//         alert(result.message || 'OTP has been sent to your email.');
//         sessionStorage.setItem('resetEmail', email);
//         window.location.href = 'resetPassword.html'
//       } else {
//         document.getElementById('error-message').textContent = result.error || 'Failed to send OTP.';
//         document.getElementById('error-message').style.display = 'block';
//       }
//     } catch (err) {
//       console.error('Error:', err);
//     }finally {
//         hideLoader();
//     }
//   });
// }

// // Handle Password Reset Form Submission
// const resetPasswordForm = document.getElementById('resetPasswordForm');
// if (resetPasswordForm) {
//   resetPasswordForm.addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const email = sessionStorage.getItem('resetEmail');
//     const newPassword = resetPasswordForm.new_password.value.trim();
//     const otp = resetPasswordForm.new_otp.value.trim();

//     if (!email || !newPassword || !otp) {
//         alert('All fields are required.');
//         return;
//     }
   
    
//     try {
//         showLoader();
//         const response = await fetch('http://localhost:8000/users/resetPassword', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ newPassword, otp }),
//       });

//         const result = await response.json();
//         if (response.ok) {
//         alert(result.message || 'Password reset successfully.');
//         sessionStorage.removeItem('resetEmail');
//         window.location.href = 'login.html'; // Redirect to login page
//       } else {
//         document.getElementById('error-message').textContent = result.error || 'Failed to reset password.';
//         document.getElementById('error-message').style.display = 'block';
//       }
//     } catch (err) {
//       console.error('Error:', err);
//     } finally {
//         hideLoader();
//     }
//   });
// }

// // Toggle Password Visibility
// const toggleButtons = document.querySelectorAll('.toggle-password');
// toggleButtons.forEach((button) => {
//   button.addEventListener('click', () => {
//     const targetInput = document.getElementById(button.dataset.target);
//     if (targetInput.type === 'password') {
//       targetInput.type = 'text';
//       button.textContent = 'Hide';
//     } else {
//       targetInput.type = 'password';
//       button.textContent = 'Show';
//     }
//   });
// });

/// Loader Management
function showLoader() {
    console.log('Loader shown'); // Debug log
    document.getElementById('loader').style.display = 'flex';
  }
  
  function hideLoader() {
    console.log('Loader hidden'); // Debug log
    document.getElementById('loader').style.display = 'none';
  }
  
  // Handle OTP Request Form Submission
  const requestResetForm = document.getElementById('requestReset');
  if (requestResetForm) {
    console.log('#requestReset form found'); // Debug log
    requestResetForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const email = requestResetForm.email.value.trim();
      if (!email) {
        alert('Email is required.');
        return;
      }
  
      try {
        console.log('Submitting OTP request...'); // Debug log
        showLoader();
  
        const response = await fetch('http://localhost:8000/users/requestReset', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
  
        console.log('Response received:', response); // Debug log
        const result = await response.json();
  
        if (response.ok) {
          console.log('OTP sent successfully'); // Debug log
          alert(result.message || 'OTP has been sent to your email.');
          sessionStorage.setItem('resetEmail', email);
          window.location.href = 'resetPassword.html'; // Redirect to reset password page
        } else {
          console.error('Error sending OTP:', result); // Debug log
          document.getElementById('error-message').textContent = result.error || 'Failed to send OTP.';
          document.getElementById('error-message').style.display = 'block';
        }
      } catch (err) {
        console.error('Error during OTP request:', err); // Debug log
      } finally {
        hideLoader();
      }
    });
  } else {
    console.error('#requestReset form not found'); // Debug log
  }
  
  // Handle Password Reset Form Submission
  const resetPasswordForm = document.getElementById('resetPasswordForm');
  if (resetPasswordForm) {
    console.log('#resetPasswordForm found'); // Debug log
    resetPasswordForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const email = sessionStorage.getItem('resetEmail');
      const newPassword = resetPasswordForm.new_password.value.trim();
      const otp = resetPasswordForm.new_otp.value.trim();
  
      if (!email || !newPassword || !otp) {
        alert('All fields are required.');
        return;
      }
  
      try {
        console.log('Submitting password reset request...'); // Debug log
        showLoader();
  
        const response = await fetch('http://localhost:8000/users/resetPassword', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ newPassword, otp }),
        });
  
        console.log('Response received:', response); // Debug log
        const result = await response.json();
  
        if (response.ok) {
          console.log('Password reset successfully'); // Debug log
          alert(result.message || 'Password reset successfully.');
          sessionStorage.removeItem('resetEmail');
          window.location.href = 'login.html'; // Redirect to login page
        } else {
          console.error('Error resetting password:', result); // Debug log
          document.getElementById('error-message').textContent = result.error || 'Failed to reset password.';
          document.getElementById('error-message').style.display = 'block';
        }
      } catch (err) {
        console.error('Error during password reset:', err); // Debug log
      } finally {
        hideLoader();
      }
    });
  } else {
    console.error('#resetPasswordForm form not found'); // Debug log
  }
  
  // Toggle Password Visibility
  const toggleButtons = document.querySelectorAll('.toggle-password');
  toggleButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const targetInput = document.getElementById(button.dataset.target);
      if (targetInput.type === 'password') {
        targetInput.type = 'text';
        button.textContent = 'Hide';
      } else {
        targetInput.type = 'password';
        button.textContent = 'Show';
      }
    });
});// function showLoader() {
//     document.getElementById('loader').
  