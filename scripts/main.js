/**
 * Created by Admin on 02.02.2019.
 */

//функция выпадающего меню
function toggleClass() {
    var nav = document.getElementById("nav");
    var arr = ["65px", "-100%"];
    if (nav.style.top != arr[0]) {
        nav.style.top = arr[0];
    } else {
        nav.style.top = arr[1];
    }

}
//анонимная самозапускающаяся функция прокрутки
;(function () {
    'use strict';
    // обеспечиваем короссбраузерноть для использования встроенного
// в браузеры API requestAnimationFrame
    var requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;

    var button = document.querySelector('.button'),
        catalog = document.querySelector('.catalog > .catalog-header');

    var pageHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );
    button.onclick = function (e) {
        var container = e.target;
        var startY = container.getBoundingClientRect().bottom + 96,
            // направление прокрутки
            direction = (startY < 0) ? -1 : (startY > 0) ? 1 : 0;

        scroll(container, direction);
    }
    function scroll(el, direction) {
        // длительность прокручивания страницы
        var duration = 2000,
            // старт анимации прокручивания страницы
            start = new Date().getTime();

        var fn = function() {
            // текущее положение верхней границы контейнера с учётом высоты шапки с меню
            // при прокрутке контейнер не должен заходить под шапку
            var top = el.getBoundingClientRect().bottom + 96,
                // время прошедшее от начала прокрутки страницы
                now = new Date().getTime() - start,
                // на сколько должна быть прокручена страница
                result = Math.round(top * now / duration);

            // корректируем значение 'result', чтобы контейнер остановился
            // точно по нижней границе шапки
            result = (result > direction * top) ? top : (result == 0) ? direction : result;

            // определяем есть необходимость прокручивать страницу дальше или нет
            if (direction * top > 0 && (pageHeight - window.pageYOffset) > direction * document.documentElement.clientHeight) {
                window.scrollBy(0,result);
                // рекурсивно запускаем функцию анимации прокрутки страницы
                requestAnimationFrame(fn);
            }
        }
        // старт прокрутки страницы
        requestAnimationFrame(fn);
    }
})();
//popup
window.onload = function () {
    var images = document.getElementsByClassName("content-image");
    for (var i = 0; i < images.length; i++) {
        images[i].onclick = showPopup;
    }
    var x = document.getElementById("x");
    x.onclick = hidePopup;
}

function showPopup() {
    var popup = document.getElementById("popup"),
        mainContent = document.getElementsByClassName("main-content");

    popup.style.display = 'flex';
    document.body.style.backgroundColor = '#797979';
    mainContent[0].style.opacity = '0.502';

    var smallPictures = document.getElementsByClassName("smallPic");
    for (var i = 0; i < smallPictures.length; i++) {
        smallPictures[i].onclick = changePic;
    }

    function changePic(event) {
        var appDiv = document.getElementById("bigPicture"),
            eventElement = event.target,
            imageNameParts = eventElement.id.split('_'),
            src = 'images/big/big_'+imageNameParts[1]+'.png',
            imageDomElement = document.createElement('img');
        imageDomElement.src = src;

        var oldElem = document.getElementById("1");

        imageDomElement.onload = appDiv.replaceChild(imageDomElement,oldElem);
        imageDomElement.id = "1";
        //обработка ошибок
        imageDomElement.onerror = function () {
            alert("Image not found\n404")
        }
    }
}
 function hidePopup() {
     var popup = document.getElementById("popup"),
         mainContent = document.getElementsByClassName("main-content");

     popup.style.display = 'none';
     document.body.style.backgroundColor = '#f3f3f3';
     mainContent[0].style.opacity = '1';
 }