'use strict';

const details = document.querySelectorAll('.pg-c-thankyou--product-details');

const wrapLooseDetails = (details) => {
    details.forEach(detail => {
        let out = '';
        let target = detail;
        let text = target.innerHTML;
        if (text.indexOf('<br>') == -1){
            return true;
        }
        let parts = text.split('<br>');
        for (let i = 0; i < parts.length; i++){
            out += '<div class="pg-c-thankyou--product-detail">'+parts[i]+'</div>';
        }
        target.innerHTML = out;
    });
}

setTimeout(function() {
    const contentWidth = document.querySelector('.pg-c-thankyou--table').offsetWidth;

    const setElementsWidth = (contentWidth) => {
        document.querySelector('.pg-c-thankyou--details').style.width = contentWidth + 'px';
    }
    
    setElementsWidth(contentWidth);
}, 100);

let hideZeroQuantities = setInterval(function() {
    let productDetails = document.querySelectorAll('.pg-c-thankyou--product-detail');

    if (productDetails.length) {
        productDetails.forEach(detail => {
            let space = detail.innerHTML.replace(/[&]nbsp[;]/gi," ");
            detail.innerHTML = space;
    
            let quantity = Number(detail.textContent.split(': ').pop());
    
            if (quantity <= 0) {
                detail.style.display = 'none';
            }
        });

        clearInterval(hideZeroQuantities);
    }
}, 100);

wrapLooseDetails(details);