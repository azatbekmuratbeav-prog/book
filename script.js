 const form = document.getElementById('contactForm');

        // Validate bitta field
        function validateField(group) {
            const input = group.querySelector('input, textarea');
            const errorIcon = group.querySelector('.error-icon');
            const errorMsgs = group.querySelectorAll('.error-msg');
            let hasError = false;

            // Barcha xato xabarlarini yashir
            errorMsgs.forEach(msg => msg.style.display = 'none');

            if (!input.value.trim()) {
                // Bo'sh qoldirilgan
                hasError = true;
                const requiredMsg = group.querySelector('[data-rule="required"]') || errorMsgs[0];
                if (requiredMsg) requiredMsg.style.display = 'block';
            } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
                // Email format noto'g'ri
                hasError = true;
                const formatMsg = group.querySelector('[data-rule="format"]');
                if (formatMsg) formatMsg.style.display = 'block';
            }

            if (hasError) {
                group.classList.add('is-invalid');
                group.classList.remove('is-valid');
            } else {
                group.classList.remove('is-invalid');
                group.classList.add('is-valid');
            }
            return !hasError;
        }

        // Har bir field'ga blur event — foydalanuvchi fielddan chiqqanda tekshiradi
        document.querySelectorAll('.form-group').forEach(group => {
            const input = group.querySelector('input, textarea');
            input.addEventListener('blur', () => validateField(group));
            input.addEventListener('input', () => {
                // Foydalanuvchi yoza boshlasa xatoni yo'qotadi
                if (group.classList.contains('is-invalid')) validateField(group);
            });
        });

        // Submit bosilganda hammasini tekshiradi
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            let allValid = true;
            document.querySelectorAll('.form-group').forEach(group => {
                if (!validateField(group)) allValid = false;
            });
            if (allValid) {
                alert('Xabar muvaffaqiyatli yuborildi!');
                form.reset();
                document.querySelectorAll('.form-group').forEach(g => g.classList.remove('is-valid'));
            }
        });

        function toggleDark() {
    document.body.classList.toggle('dark');
    
    const btn = document.querySelector('.dark-btn');
    
    if (document.body.classList.contains('dark')) {
        btn.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        btn.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
}

// Sahifa ochilganda saqlangan temani yuklash
window.addEventListener('load', () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
        document.querySelector('.dark-btn').textContent = '☀️';
    }
});