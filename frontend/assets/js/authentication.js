const tabBtns = document.querySelectorAll('.tab-btn');
const formContents = document.querySelectorAll('.form-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.getAttribute('data-tab');
        
        tabBtns.forEach(b => b.classList.remove('active'));
        formContents.forEach(c => c.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(tabName).classList.add('active');
    });
});

// Login form submission
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    alert(`Welcome back! Logging in as ${email}`);
    // Ovdje ces kasnije dodati API poziv
    window.location.href = '../../index.html';
});

// Register form submission
document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('register-name').value;
    const password = document.getElementById('register-password').value;
    const confirm = document.getElementById('register-confirm').value;
    
    if (password !== confirm) {
        alert('Passwords do not match!');
        return;
    }
    
    alert(`Welcome ${name}! Your account has been created.`);
    // Ovdje ces kasnije dodati API poziv
    window.location.href = '../../index.html';
});