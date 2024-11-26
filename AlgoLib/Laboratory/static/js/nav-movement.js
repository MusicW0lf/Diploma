const toggleNav = document.getElementById('toggleNav');
const sideNav = document.getElementById('sideNav');
const mainContent = document.getElementById('mainContent');
const footer = document.querySelector('footer'); // Додаємо футер

toggleNav.addEventListener('click', () => {
    sideNav.classList.toggle('active-nav');
    mainContent.classList.toggle('active-content');
    footer.classList.toggle('active-footer'); // Додаємо зміщення футера
});
