'use strict';

setTimeout(function() {
    const contentWidth = document.querySelector('.pg-c-payment--table').offsetWidth;

    const setElementsWidth = (contentWidth) => {
        document.querySelector('.pg-c-payment--delivery-details').style.width = contentWidth + 'px';
        document.querySelector('.pg-c-payment--html').style.width = contentWidth + 'px';
    }
    
    setElementsWidth(contentWidth);
}, 100);