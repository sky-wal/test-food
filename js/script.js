// назначаем главный обработчик событий
window.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tabheader__item'), // получаем все элементы с классом
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items'); // Получение родителя для tabs
    
    // Нам нужно скрыть все tabsContent, кроме активного. Птшем функцию, которая скрывает элементы
    // и делает неактивными пункты меню tabs

    function hideTabContent() {
        // console.log('sljfhkdjhgk');
        tabsContent.forEach(item => {
            // item.style.display = 'none';
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    // Создаем функцию, которая будет показывать контент нужного таба
    // 'i = 0' - дефолтное значение, если аргумент не передан

    function showTabContent(i = 0) {
        // tabsContent[i].style.display = 'block';
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    // По клику на tab активируем только выбранный таб.контент, остальные прячем. Нужно узнать номер элемента

    tabsParent.addEventListener('click', (event) => {
        const target = event.target; // это элемент, по которому кликнули

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
});