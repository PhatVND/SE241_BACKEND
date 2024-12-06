document.querySelector(".close").addEventListener("click", function () {
    document.querySelector(".popup").style.display = "none";
});


document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#login-form');
    const submitButton = document.querySelector('input[type="submit"]');

    document.getElementById("print-now-btn").addEventListener('click', async function (event) {
        // Check if the user is logged in
        const res = await fetch('/getToken', {
            method: 'GET',
            credentials: 'include'
        });

        if (res.status === 401) {
            alert('Bạn cần đăng nhập để tiếp tục.');
        } else {
            window.location.href = '/print';
        }
    });

    submitButton.addEventListener('click', async function (event) {
        event.preventDefault();  // Prevent the default form submission

        const emailField = document.querySelector('input[name="email"]');
        const password = document.querySelector('input[name="password"]').value;
        const email = emailField.value;

        // Check if the email is valid (HTML5 built-in validation)
        if (!emailField.checkValidity()) {
            alert("Email đang sai định dang, vui lòng nhập lại");
            return;  // Prevent further form submission
        }
        console.log('ok');
        try {
            if (!document.cookie.includes('refreshToken')) {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                    credentials: 'include'
                });

                if (!response.ok) {
                    const { message } = await response.json();
                    alert(message || 'Login failed');
                    return;
                }

                console.log('Login successful');
                const { refreshToken, role } = await response.json()
                // Set the refresh token in a cookie
                document.cookie = `refreshToken=${refreshToken}; path=/; secure; HttpOnly`;

                if (role === 'ADMIN') {
                    window.location.href = '/admin/printers/index';
                }

                // Close the popup after successful login
                document.querySelector(".popup").style.display = "none";
            }
            else {
                const response = await fetch('user/login', {
                    method: 'GET',
                });

            }
        } catch (err) {
            console.error('Error:', err);
            alert('There was an error during login. Please try again.');
        }
    });
});

document.getElementById("account").addEventListener("click", async function () {
    try {
        const res = await fetch('/getToken', {
            method: 'GET',
            credentials: 'include'
        })
        if (res.status === 401) {
            document.querySelector(".popup").style.display = "flex";
        }
        else {
            window.location.href = '/user/info';
        }
    } catch (err) {
        console.error('Error:', err);
        alert('There was an error during login. Please try again.');
    }
});