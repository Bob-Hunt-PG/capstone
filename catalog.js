'use strict';

const items = document.querySelectorAll('.pg-c-catalog--shuffler-item');
const colors = document.querySelectorAll('.pg-c-catalog--shuffler-item-colors');
const prices = document.querySelectorAll('.pg-c-catalog--shuffler-item-prices');

const addDataGroups = (items) => {
    items.forEach(item => {
        item.setAttribute('data-groups', '[' + Array.from(item.classList).map(classes => `"${classes}"`).join(',') + ']');
        item.setAttribute('data-price', item.querySelector('.pg-c-catalog--shuffler-item-prices').textContent.replace('$', ''));
    });
}

const relocateColors = (colors) => {
    colors.forEach(color => {
        let colorHtml = color.outerHTML;
        let shufflerItem = color.previousElementSibling.querySelector('.pg-c-catalog--shuffler-item-description');

        shufflerItem.insertAdjacentHTML('beforeend', colorHtml);
        color.remove();
    });
}

const relocatePrices = (prices) => {
    prices.forEach(price => {
        let priceHtml = price.outerHTML;
        let shufflerItem = price.previousElementSibling.querySelector('.pg-c-catalog--shuffler-item-price');

        shufflerItem.insertAdjacentHTML('beforeend', priceHtml);
        price.remove();
    });
}

let category = '';

const Shuffle = window.Shuffle;
const element = document.querySelector('.pg-c-catalog--shuffler');
const sizer = document.querySelector('.pg-c-catalog--shuffler-item');

let shuffleInstance = new Shuffle(element, {
    itemSelector: '.pg-c-catalog--shuffler-item',
    sizer: sizer,
    delimiter: ',',
    filterMode: Shuffle.FilterMode.ALL
});

shuffleInstance.colWidth = document.querySelector('.pg-c-catalog--shuffler-item').offsetWidth;
shuffleInstance.filter();
shuffleInstance.sort({
    by: function (element) {
        return element.getAttribute('data-price');
    },
});

let categories = document.querySelectorAll('.pg-c-button--list');
let selection;

const filter = (categories) => {
    categories.forEach(filter => {
        filter.onclick = function() {
            let parent = filter.parentElement;

            categories.forEach(filter => {
                filter.parentElement.classList.remove('active');
            });

            if (parent.classList.contains('pg-c-catalog--filter-drop')) {
                let classCheck = filter.nextElementSibling.firstElementChild.classList;

                if (classCheck.contains('pg-c-catalog--filter-drop')) {
                    parent.classList.add('active');
                    shuffleInstance.filter(parent.getAttribute('data-group'));
                } else {
                    filter.nextElementSibling.firstElementChild.classList.add('active');
                    shuffleInstance.filter(filter.nextElementSibling.firstElementChild.getAttribute('data-group'));
                }
            } else {
                parent.classList.add('active');
                shuffleInstance.filter(parent.getAttribute('data-group').split(' '));
            }
        }
    });
}

const shuffleSort = (sortOption) => {
    if (sortOption === 'ascending') {
        shuffleInstance.sort({
            by: function (element) {
                return element.getAttribute('data-price');
            },
        });
    } else if (sortOption === 'descending') {
        shuffleInstance.sort({
            by: function (element) {
                return element.getAttribute('data-price');
            },
            reverse: true
        });
    }
}

const getUrlVars = (parameter) => {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value.replace('%20', ' ').split(' ');
    });
    category = vars[parameter];

    if (category) {
        shuffleInstance.filter(category);
        document.querySelector('.pg-c-catalog--filter-option[data-group="' + category.toString().replace(',', ' ') + '"]').classList.add('active');
    }
}


relocateColors(colors);
relocatePrices(prices);
addDataGroups(items);
filter(categories);
getUrlVars('category');

sessionStorage.clear();