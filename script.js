const btn = document.getElementById('mode-btn');
const icon = document.getElementById('mode-icon');

btn.addEventListener('click', function () {
    // 1. Klasni almashtiramiz
    document.body.classList.toggle('dark-mode');

    // 2. Agar hozir dark-mode yoqilgan bo'lsa, quyoshga aylantiramiz
    if (document.body.classList.contains('dark-mode')) {
        icon.innerHTML = '<i class="fa-solid fa-sun" style="color: rgb(251, 252, 251);"></i>'; // Quyosh (light mode-ga qaytish uchun)
    } else {
        icon.innerHTML = '<i class="fa-solid fa-moon" style="color: rgb(251, 252, 251);"></i>'; // Oy (dark mode-ga o'tish uchun)
    }
});

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

const hamburger = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');

// Tugma bosilganda ishlash
hamburger.addEventListener('click', function () {
    // 'active' klassini qo'shadi yoki olib tashlaydi (Toggle)
    navMenu.classList.toggle('active');

    // Ixtiyoriy: Ikonkani o'zgartirish (bars -> xmark)
    const icon = hamburger.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

// Menyu ochiq turganda biror havolani bossangiz ham menyu yopilishi kerak
const navLinks = document.querySelectorAll('.right .a1');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.replace('fa-xmark', 'fa-bars');
    });
});   