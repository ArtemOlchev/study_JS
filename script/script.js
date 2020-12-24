window.addEventListener('DOMContentLoaded', function () {
    'use strict';
    let timerId;

    function countTimer(deadline) {
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
            return {
                timeRemaining,
                hours,
                minutes,
                seconds
            };
        }

        function updateClock() {
            let timer = getTimeRemaining();

            if (String(timer.hours).length === 1) {
                timerHours.textContent = '0' + timer.hours;
            } else {
                timerHours.textContent = timer.hours;
            }

            if (String(timer.minutes).length === 1) {
                timerMinutes.textContent = '0' + timer.minutes;
            } else {
                timerMinutes.textContent = timer.minutes;
            }

            if (String(timer.seconds).length === 1) {
                timerSeconds.textContent = '0' + timer.seconds;
            } else {
                timerSeconds.textContent = timer.seconds;
            }

            if (timer.timeRemaining > 0) {
                setTimeout(updateClock, 1000);
            } else {
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        }

        updateClock();
    }

    countTimer('01 01 2021');

    //Меню
    const toggleMenu = () => {

        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');
        let count = -100;

        let handlerMenu = function(){
            count++;
            if (count <= 0){
                menu.style.transform = `translate(` + count + `%)`;
            } else{
                count = -100;
                clearInterval(timerId);
            }
        };

        let controlMenu = function(){
            if (document.body.clientWidth <= 768){
                if (!menu.style.transform || menu.style.transform === `translate(-100%)`){
                    menu.style.transform = `translate(0%)`;
                } else {
                    menu.style.transform = `translate(-100%)`;
                    count = -100;
                }
            } else {
                if (!menu.style.transform || menu.style.transform === `translate(-100%)`){
                    timerId = setInterval(handlerMenu, 0);
                } else {
                    menu.style.transform = `translate(-100%)`;
                    count = -100;
                }
            }
        };

        btnMenu.addEventListener('click', controlMenu);
        menu.addEventListener('click', (event) => {
            let target = event.target;
            menuItems.forEach((item) => item.classList.add('a'));

            if (target.classList.contains('close-btn')){
                controlMenu();
            } 

            target = target.closest('.a');
               
            if (target){
                   
                menuItems.forEach((item) => {
                      
                    if(item === target){
                        controlMenu();
                    }
                    
                });
            }

        });
    };

    toggleMenu();
    
    //popup

    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn');

        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => popup.style.display = 'block');
        });

        popup.addEventListener('click', (event) => {
            let target = event.target;

            if (target.classList.contains('popup-close')){
                popup.style.display = 'none';
            } else {
                target = target.closest('.popup-content');

                if (!target){
                    popup.style.display = 'none';
                }
            }
        });
    };

    togglePopUp();

    //Табы
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for(let i = 0; i < tabContent.length; i++){
                if (index === i){
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tabContent[i].classList.add('d-none');
                    tab[i].classList.remove('active');
                }
            }
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');
               
            if (target){
                   
                tab.forEach((item, i) => {
                      
                    if(item === target){
                        toggleTabContent(i);
                    }
                    
                });
            }
        });
    };

    tabs();
});
