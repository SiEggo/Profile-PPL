// script.js

// Generate Captcha
function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    return {
        question: `${num1} + ${num2} = ?`,
        answer: (num1 + num2).toString()
    };
}

// Handle Login
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const captchaData = generateCaptcha();
    const captchaQuestion = document.getElementById('captchaQuestion');

    if (captchaQuestion) {
        captchaQuestion.textContent = captchaData.question;
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const captcha = document.getElementById('captcha').value;
            const loginError = document.getElementById('loginError');

            if (username === 'user' && password === 'user123' && captcha === captchaData.answer) {
                localStorage.setItem('isLoggedIn', true);
                window.location.href = 'profile.html';
            } else {
                loginError.textContent = 'Invalid credentials or captcha';
            }
        });
    }

    // Handle Profile Page
    if (window.location.pathname.endsWith('profile.html')) {
        const profileData = document.getElementById('profileData');
        const newProfileButton = document.getElementById('newProfileButton');
        const logoutButton = document.getElementById('logoutButton');

        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            profileData.innerHTML = `
                <p>Nama: ${userData.name}</p>
                <p>Usia: ${userData.age}</p>
                <p>Email: ${userData.email}</p>
                <p>Pekerjaan: ${userData.job}</p>
                <p>Alamat: ${userData.address}</p>
                <p><img src="${userData.photo}" alt="Foto" style="width:100px;"></p>
            `;
        } else {
            profileData.textContent = 'No data available';
        }

        if (newProfileButton) {
            newProfileButton.addEventListener('click', function() {
                window.location.href = 'form.html';
            });
        }

        if (logoutButton) {
            logoutButton.addEventListener('click', function() {
                localStorage.removeItem('isLoggedIn');
                window.location.href = 'index.html';
            });
        }
    }

    // Handle Form Data Diri Page
    const dataForm = document.getElementById('dataForm');
    if (dataForm) {
        dataForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const age = document.getElementById('age').value;
            const email = document.getElementById('email').value;
            const photo = document.getElementById('photo').files[0];
            const job = document.getElementById('job').value;
            const address = document.getElementById('address').value;

            const reader = new FileReader();
            reader.onload = function() {
                const photoData = reader.result;
                const userData = { name, age, email, photo: photoData, job, address };
                localStorage.setItem('userData', JSON.stringify(userData));
                window.location.href = 'profile.html';
            };
            reader.readAsDataURL(photo);
        });

        const backButton = document.getElementById('backButton');
        if (backButton) {
            backButton.addEventListener('click', function() {
                window.location.href = 'profile.html';
            });
        }
    }

    // Redirect to login if not logged in
    if (!localStorage.getItem('isLoggedIn') && window.location.pathname !== '/index.html' && !window.location.pathname.endsWith('/')) {
        window.location.href = 'index.html';
    }
});
