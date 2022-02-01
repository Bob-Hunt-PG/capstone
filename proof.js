'use strict';

const sizeInputs = document.querySelectorAll('input[type="text"]');
const logoSelected = sessionStorage.getItem('logo');
const colorSelected = sessionStorage.getItem('color');

const setInputClasses = (sizeInputs) => {
    sizeInputs.forEach(input => {
        let rowName = input.parentElement.parentElement.querySelector('td[width="100"]').textContent.replace(/\s/g, '');
        let quantity = sessionStorage.getItem(rowName);
        input.setAttribute('class', rowName);
        input.value = quantity;

        if(quantity === null || quantity === '') {
            input.value = 0;
        }
    });
}

const setTotalNexJobQuantity = (sizeInputs) => {
    const NexJobQuantity = document.querySelector('#NJQ');
    let totalQuantity = 0;

    sizeInputs.forEach(input => {
        totalQuantity += Number(input.value);
    });

    console.log(totalQuantity);

    NexJobQuantity.value = totalQuantity;
    NexJobQuantity.onchange();
}

document.querySelector('#NJB').value = colorSelected;
document.querySelector('#NJE1').value = 'Logo|' + logoSelected;

setInputClasses(sizeInputs);
setTotalNexJobQuantity(sizeInputs);