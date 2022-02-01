'use strict';

/**
 * Global Constants
 * All constant variables should be placed here.
 */
let scrollConfig = {
    container: document.querySelector('.pg-c-brands'),
    mouseDown: false,
    startX: '',
    scrollLeft: ''
};

const scrollMouseDown = (scrollConfig) => {
    scrollConfig.container.addEventListener('mousedown', event => {
        scrollConfig.mouseDown = true;
        scrollConfig.container.classList.add('active');
        scrollConfig.startX = event.pageX - scrollConfig.container.offsetLeft;
        scrollConfig.scrollLeft = scrollConfig.container.scrollLeft;
        event.preventDefault();
    });
}

const scrollMouseLeave = (scrollConfig) => {
    scrollConfig.container.addEventListener('mouseleave', event => {
        scrollConfig.mouseDown = false;
        scrollConfig.container.classList.remove('active');
        event.preventDefault();
    });
}

const scrollMouseMove = (scrollConfig) => {
    scrollConfig.container.addEventListener('mousemove', event => {
        if (!scrollConfig.mouseDown) return;
        event.preventDefault();

        const x = event.pageX - scrollConfig.container.offsetLeft;
        const scroll = x - scrollConfig.startX;

        scrollConfig.container.scrollLeft = scrollConfig.scrollLeft - scroll;
    });
}

scrollMouseDown(scrollConfig);
scrollMouseLeave(scrollConfig);
scrollMouseMove(scrollConfig);