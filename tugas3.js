
const form = document.getElementById('contact-form');
const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const messageField = document.getElementById('message');
const submitBtn = document.getElementById('submit-btn');
const successMessage = document.getElementById('success-message');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    document.getElementById('name-error').textContent = '';
    document.getElementById('email-error').textContent = '';
    document.getElementById('message-error').textContent = '';

    let isValid = true;

    if (nameField.value === '') {
        document.getElementById('name-error').textContent = 'Nama tidak boleh kosong';
        isValid = false;
    }

    if (emailField.value === '') {
        document.getElementById('email-error').textContent = 'Email tidak boleh kosong';
        isValid = false;
    }

    if (messageField.value === '') {
        document.getElementById('message-error').textContent = 'Pesan tidak boleh kosong';
        isValid = false;
    }

    if (isValid) {
        submitBtn.textContent = 'Mengirim...';
        submitBtn.disabled = true;
        submitBtn.classList.add('btn-loading');

        const formData = {
            name: nameField.value,
            email: emailField.value,
            message: messageField.value
        };

        fetch('https://debug.nafkhanzam.com/web-programming-e03', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            successMessage.textContent = 'Terkirim';
            successMessage.style.color = 'green';
        })
        .catch(error => {
            successMessage.textContent = 'Gagal mengirim data';
            successMessage.style.color = 'red';
        })
        .finally(() => {
            submitBtn.textContent = 'Kirim';
            submitBtn.disabled = false;
            submitBtn.classList.remove('btn-loading');
        });
    }
});

const liveInput = document.getElementById('live-input');
const liveOutput = document.getElementById('live-output');

window.onload = function() {
    const savedText = localStorage.getItem('liveText');
    if (savedText) {
        liveInput.value = savedText;
        liveOutput.textContent = savedText;
    }
}

liveInput.addEventListener('input', function() {
    liveOutput.textContent = liveInput.value;
    localStorage.setItem('liveText', liveInput.value);
});
