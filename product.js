'use strict';

const colors = document.querySelectorAll('#Color > option');
const logos = document.querySelectorAll('#Logo > option');
const prices = document.querySelectorAll('#PriceTable > option');
const descriptions = document.querySelectorAll('#Description > option');
const specsheet = document.querySelector('.pg-c-product--specsheet');
const columns = document.querySelectorAll('.pg-c-product--column');
const productId = document.querySelector('.pg-c-product--name').textContent.split(' ').pop();
const submitButton = document.querySelector('input[type="submit"]');
let columnWidth = 0;

const displayColors = (colors) => {
    let colorContainer = document.querySelector('#Color').parentElement;

    colors.forEach(color => {
        let colorName = color.text.substring(color.text.indexOf('-') + 1),
            colorClass = colorName.replace(/\//g, ' ');

        if (colorName.length > 0) {
            let colorHtml = '<span class="color ' + colorClass.toLowerCase() + '" color="' + colorName + '" title="' + colorName + '">&nbsp;</span>';
            colorContainer.insertAdjacentHTML('beforeend', colorHtml);
        }
    });
}

const displayLogos = (logos) => {
    let logoContainer = document.querySelector('#Logo').parentElement;

    logos.forEach(logo => {
        let logoName = logo.text;
        let logoNameTrimmed = logoName.replace(/\s/g, '').replace(/-/g, '').substring(0, 30) + '.png';

        if (logoName.length > 0) {
            let logoHtml = '<div class="pg-c-product--logo-icon"><img class="pg-c-product--logo" src="Files/pdfsthumbnail/' + logoNameTrimmed + '" alt="' + logoName + '" title="' + logoName + '"></div>';
            logoContainer.insertAdjacentHTML('beforeend', logoHtml);
        }
    });
}

const displayPrices = (prices) => {
    let priceContainer = document.querySelector('.pg-c-product--quantities-table tbody');
    let priceNumber = document.querySelector('#PriceTable').closest('.pg-c-product--field-layout').querySelector('.pg-c-product--field-caption').textContent.replace(/\s/g, '');

    prices.forEach(price => {
        let size = price.text;
        
        if (size.length > 0) {
            let priceHtml = '<tr><td>' + size + '</td><td class="pg-c-product--item-price">' + priceNumber + '</td><td><input type="text" class="pg-c-product--quantity number-input" id="' + size.replace(/\s/g, '') + '" value="" onchange="quantityHandler(this)"></td></tr>';
            
            priceContainer.insertAdjacentHTML('beforeend', priceHtml);
        }
    });

    document.querySelector('#PriceTable').closest('.pg-c-product--field-layout').style.display = "none";
}

const displayDescriptions = (descriptions) => {
    let descriptionContainer = document.querySelector('.pg-c-product--description-list');

    descriptions.forEach(description => {
        if (description.text.length > 0) {
            let descriptionHtml = '<li class="pg-c-product--description-list-item">' + description.text + '</li>';
            
            descriptionContainer.insertAdjacentHTML('beforeend', descriptionHtml);
        }
    });

    document.querySelector('#Description').closest('.pg-c-product--field-layout').style.display = "none";
}


let checkImage = setInterval(function() {
    let image = document.querySelector('#thumbLP');
    if (image) {
        let imageSource = image.getAttribute('src');
        image.setAttribute('data-zoom', imageSource);

        new Drift(document.querySelector("#thumbLP"), {
            paneContainer: document.querySelector(".pg-c-product--image-zoom"),
            hoverBoundingBox: true,
            onShow: function(e) {
                document.querySelector('.pg-c-product--image-zoom').style.height = '50%';
            },
            onHide: function(e) {
                document.querySelector('.pg-c-product--image-zoom').style.height = '0%';
            }
        });

        clearInterval(checkImage);
    }
}, 100);

const setTotalFormWidth = (columns) => {
    columns.forEach(column => {
        columnWidth = columnWidth + column.offsetWidth;
    });

    document.querySelector('.pg-c-product--actions').style.width = columnWidth + 'px';
}

let checkColors = setInterval(function() {
    let colorPickers = document.querySelectorAll('.color');
    let image = document.querySelector('#thumbLP');
    if (colorPickers.length) {
        sessionStorage.setItem('color', colorPickers[0].getAttribute('title'));

        colorPickers.forEach(color => {
            color.onclick = function(element) {
                let colorName = color.getAttribute('color');

                for (let i=0; i < colors.length; i++) {
                    if (colors[i].text === productId + '-' + colorName) {
                        document.querySelector('#Color').selectedIndex = i;
                        break;
                    }
                }
    
                RefreshProof();

                let image = document.querySelector('#thumbLP');
                let imageSource = image.getAttribute('src');
                image.setAttribute('data-zoom', imageSource);

                new Drift(document.querySelector("#thumbLP"), {
                    paneContainer: document.querySelector(".pg-c-product--image-zoom"),
                    hoverBoundingBox: true,
                    onShow: function(e) {
                        document.querySelector('.pg-c-product--image-zoom').style.height = '50%';
                    },
                    onHide: function(e) {
                        document.querySelector('.pg-c-product--image-zoom').style.height = '0%';
                    }
                });

                sessionStorage.setItem('color', colorName);
            }
        });

        clearInterval(checkColors);
    }
}, 100);

let checkLogos = setInterval(function() {
    let logoPickers = document.querySelectorAll('.pg-c-product--logo-icon');
    
    if (logoPickers.length) {
        sessionStorage.setItem('logo', logoPickers[0].firstElementChild.getAttribute('title'));

        logoPickers.forEach(logo => {
            logo.onclick = function(element) {
                let logoName = logo.querySelector('.pg-c-product--logo').getAttribute('title');

                for (let i=0; i < logos.length; i++) {
                    if (logos[i].text === logoName) {
                        document.querySelector('#Logo').selectedIndex = i;
                        break;
                    }
                }
    
                RefreshProof();

                let image = document.querySelector('#thumbLP');
                let imageSource = image.getAttribute('src');
                image.setAttribute('data-zoom', imageSource);

                new Drift(document.querySelector("#thumbLP"), {
                    paneContainer: document.querySelector(".pg-c-product--image-zoom"),
                    hoverBoundingBox: true,
                    onShow: function(e) {
                        document.querySelector('.pg-c-product--image-zoom').style.height = '50%';
                    },
                    onHide: function(e) {
                        document.querySelector('.pg-c-product--image-zoom').style.height = '0%';
                    }
                });

                sessionStorage.setItem('logo', logoName);
            }
        });

        clearInterval(checkLogos);
    }
}, 100);

let checkQuantities = setInterval(function() {
    let quantityInputs = document.querySelectorAll('.pg-c-product--quantity');

    if (quantityInputs.length) {
        quantityInputs.forEach(quantity => {
            let spinner = new ISpin(quantity, {
                wrapperClass: 'ispin-wrapper',
                buttonsClass: 'ispin-button',
                step: 1,
                pageStep: 20,
                repeatInterval: 200,
                wrapOverflow: false,
                parse: Number,
                format: String,
                disabled: false,
                max: 100,
                min: 0,
                onChange: function(element) {
                    let quantityName = quantity.getAttribute('id');
                    let quantitySelected = quantity.value;

                    sessionStorage.setItem(quantityName, quantitySelected);

                    let totalQuantitySelected = 0;

                    quantityInputs.forEach(element => {
                        let value = element.value;
                        totalQuantitySelected += Number(value);
                        console.log(totalQuantitySelected);
                    });
    
                    if (totalQuantitySelected > 0) {
                        submitButton.removeAttribute('disabled');
                    } else {
                        submitButton.setAttribute('disabled', 'disabled');
                    }
                }
            });

            quantity.value = 0;

            quantity.onchange = function(event) {
                let totalQuantitySelected = 0;

                quantityInputs.forEach(element => {
                    let value = element.value;
                    totalQuantitySelected += Number(value);
                    console.log(totalQuantitySelected);
                });

                if (totalQuantitySelected > 0) {
                    submitButton.removeAttribute('disabled');
                } else {
                    submitButton.setAttribute('disabled', 'disabled');
                }
            }
        });

        clearInterval(checkQuantities);
    }
}, 100);

submitButton.setAttribute('disabled', 'disabled');

const quantityHandler = (quantity) => {
    let quantityName = quantity.getAttribute('id');
    let quantitySelected = quantity.value;
    sessionStorage.setItem(quantityName, quantitySelected);
}

specsheet.setAttribute('href', 'Files/BrokerBranding/proact/Include/' + productId + 'specsheet.pdf');



displayColors(colors);
displayLogos(logos);
displayPrices(prices);
displayDescriptions(descriptions);
setTotalFormWidth(columns);