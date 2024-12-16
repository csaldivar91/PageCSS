document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const result = await response.json();

    if (response.ok) {
        alert('Login successful!');
        window.location.href = 'dashboard.html'; // Página después de login exitoso
    } else {
        document.getElementById('errorMessage').textContent = result.message || 'Login failed';
    }
});
