function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    const tabs = document.querySelectorAll(tabsSelector), // получаем все элементы с классом
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelector); // Получение родителя для tabs

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
        item.classList.remove(activeClass);
    });
    }

    // Создаем функцию, которая будет показывать контент нужного таба
    // 'i = 0' - дефолтное значение, если аргумент не передан

    function showTabContent(i = 0) {
    // tabsContent[i].style.display = 'block';
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    // По клику на tab активируем только выбранный таб.контент, остальные прячем. Нужно узнать номер элемента

    tabsParent.addEventListener('click', (event) => {
    const target = event.target; // это элемент, по которому кликнули

    if (target && target.classList.contains(tabsSelector.slice(1))) {
        tabs.forEach((item, i) => {
            if (target == item) {
                hideTabContent();
                showTabContent(i);
            }
        });
    }
    });
}

export default tabs;