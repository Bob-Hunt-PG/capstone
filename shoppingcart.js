'use strict';

const details = document.querySelectorAll('.pg-c-cart--product-details');
const addressDropdown = document.querySelector('#DeliveryAddress');
const addressTable = document.querySelector('#tabDelDetails');
const fieldRequirementHTML = '<span class="required pg-u-text--color-danger">*</span>';
const cartTable = document.querySelector('.pg-c-cart--table');

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
            out += '<div class="pg-c-cart--product-detail">'+parts[i]+'</div>';
        }
        target.innerHTML = out;
    });
}

let hideZeroQuantities = setInterval(function() {
    let productDetails = document.querySelectorAll('.pg-c-cart--product-detail');

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

const populateAddressFields = (addressDropdown) => {
    addressDropdown.onchange = function(element) {
        let selectedAddress = addressDropdown.options[addressDropdown.selectedIndex].text;
        
        document.querySelector('#DeliveryAddress').firstElementChild.setAttribute('value', '');
        document.querySelector('#DeliveryAddress').firstElementChild.text = 'Enter New Address';

        if(selectedAddress !== 'Enter New Address') {
            document.querySelector('#deladr').style.display = 'none';
            document.querySelector('#countrylist').parentElement.parentElement.style.display = 'none';
        } else {
            document.querySelector('#deladr').style.display = 'block';
        }
        
    }
}

const addAsterickToRequiredFields = (addressTable) => {
    let addressAttentionTo = addressTable.querySelector('#AttentionTo');

    addressAttentionTo.setAttribute('required', '');
    addressAttentionTo.parentElement.parentElement.querySelector('.addresslabel').innerHTML += ' ' + fieldRequirementHTML;
}

const deleteProductUIChange = (cartTable) => {
    let rows = cartTable.querySelectorAll('tr');

    rows.forEach(row => {
        let lastColumn = row.lastElementChild;

        if (lastColumn.hasAttribute('id')) {
            lastColumn.querySelector('.far').parentElement.setAttribute('onclick', 'deleteProductAlert(this); return false')
        }
    });
}

const deleteProductAlert = (product) => {
    let productURL = product.getAttribute('href');

    Swal.fire({
        title: '<strong>Remove Product</u></strong>',
        icon: 'warning',
        html:
          '<iframe src="https://capstone.mybrandstorefront.com/' + productURL + '"><iframe>',
        showCloseButton: true,
        focusConfirm: false,
        showCancelButton: false,
        showConfirmButton: false
    })
}

wrapLooseDetails(details);
populateAddressFields(addressDropdown);
addAsterickToRequiredFields(addressTable);
deleteProductUIChange(cartTable);

sessionStorage.clear();