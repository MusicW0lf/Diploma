const toggleNav = document.getElementById('toggleNav');
const sideNav = document.getElementById('sideNav');
const mainContent = document.getElementById('mainContent');

toggleNav.addEventListener('click', () => {
    sideNav.classList.toggle('active-nav'); // Додаємо або прибираємо клас
    if (sideNav.classList.contains('active-nav')) {
        mainContent.style.marginLeft = '200px'; // Відсунути контент
    } else {
        mainContent.style.marginLeft = '0.5cm'; // Повернути контент назад
    }
});