// Функция для изменения одежды на модели
function changeClothes(part, src) {
    var elements = document.querySelectorAll('.model img');
    elements.forEach(element => {
        // Показываем выбранный элемент и скрываем остальные
        if(element.id === part) {
            element.style.display = 'block';
            element.src = src;
        } else if (element.id !== 'base') {
            element.style.display = 'none';
        }
    });
}

// Функции для показа опций одежды
function showOptions(type) {
    var options = document.getElementById(type + '-options');
    var otherType = type === 'shirt' ? 'pants' : 'shirt';
    var otherOptions = document.getElementById(otherType + '-options');
    
    // Показываем опции для выбранного типа одежды и скрываем для другого
    if (options.style.display === 'block') {
        options.style.display = 'none';
    } else {
        options.style.display = 'block';
        otherOptions.style.display = 'none';
    }
}

// Прикрепляем обработчики событий к изображениям одежды для показа опций
document.getElementById('base').addEventListener('click', function(event) {
    // Определяем, где был клик: на верхней или нижней части изображения
    var rect = event.target.getBoundingClientRect();
    var clickY = event.clientY - rect.top; // Y-координата клика относительно элемента

    if (clickY < rect.height / 2) {
        showOptions('shirt'); // Показываем опции футболок
    } else {
        showOptions('pants'); // Показываем опции штанов
    }
});
