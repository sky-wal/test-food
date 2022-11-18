// создаем функцию, которая будет открывать модальное окно
function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'; // запрещаем прокрутку страницы за модальным окном
    // очищаем интервал, чтобы после первого открытия модального окна оно больше само не открывалось
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

// создаем функцию, которая будет закрывать модальное окно
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = ''; // разрешить прокрутку страницы за модальным окном
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    // MODAL

    // Добавили в HTML элементам data-аттрибуты data-modal и data-close, чтобы удобнее было взаимодействовать с ними

    const modalTriger = document.querySelectorAll(triggerSelector), // получение элемента по аттрибутам data-modal
          modal = document.querySelector(modalSelector);

    modalTriger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    // Закрытие модального окна при клике на подложку:
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    // Закрытие модального окна при нажатии Escape
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    // Вызовем модальное окно при прокрутке страницы до конца
    function showModalByScroll() {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    
    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModal};
export {openModal};