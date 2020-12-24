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
        
        // let handlerMenu = function(){
        //     count++;
        //     if (menu.offsetLeft >= menu.offsetWidth){
        //         clearInterval(timerId);
        //     } else{
        //         menu.style.left = count * 8 + 'px';
        //     }
        // };
        
        // let controlMenu = function(){
        //     if (menu.offsetLeft < menu.offsetWidth){
        //         timerId = setInterval(handlerMenu, 0);
        //     } else {
        //         menu.style.left = 0;
        //         count = 0;
        //     }
        // };

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
        closeBtn.addEventListener('click', controlMenu);
        menuItems.forEach((elem) => elem.addEventListener('click', controlMenu));


    };

    toggleMenu();
    
    //popup

    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close');

        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => popup.style.display = 'block');
        });

        popupClose.addEventListener('click', () => popup.style.display = 'none');
    };

    togglePopUp();

});