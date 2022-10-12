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

    // TIMER

    const deadline = '2022-10-15'; // дата окончания акции

    // функция, вычисляющая разницу между дедлайн и текущим временем
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 *24)), // осталось целых дней
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t / (1000 * 60)) % 60),
              seconds = Math.floor((t / 1000) % 60);
        
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds

        };
    }

    function setClock(selector, endtime) {
        // Получаем все элементы со страницы
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
        
        updateClock(); //здесь устанавливаем вызов функции для того, чтобы при рефреше страницы не мигали счетчики
        
        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }

        //Вспомогательная функция, чтобы значения все сделать двухзначными
        function getZero(num) {
            if (num >= 0 && num < 10) {
                return `0${num}`;
            } else {
                return num;
            }
        }
    }

    setClock('.timer', deadline);
    
    // MODAL

    // Добавили в HTML элементам data-аттрибуты data-modal и data-close, чтобы удобнее было взаимодействовать с ними

    const modalTriger = document.querySelectorAll('[data-modal]'), // получение элемента по аттрибутам data-modal
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]');

    modalTriger.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflow = 'hidden'; // запрещаем прокрутку страницы за модальным окном
        });
    });
    
    // создаем функцию, которая будет закрывать модальное окно
    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = ''; // разрешить прокрутку страницы за модальным окном
    }

    modalCloseBtn.addEventListener('click', closeModal);
    
    // Закрытие модального окна при клике на подложку:
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Закрытие модального окна при нажатии Escape
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
});
