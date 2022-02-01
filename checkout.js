'use strict';

setTimeout(function() {
    const contentWidth = document.querySelector('.pg-c-checkout--table').offsetWidth;

    const setElementsWidth = (contentWidth) => {
        document.querySelector('.pg-c-checkout--details').style.width = contentWidth + 'px';
        document.querySelector('.pg-c-checkout--voucher').style.width = contentWidth + 'px';
        document.querySelector('.pg-c-checkout--order-details').style.width = contentWidth + 'px';
        document.querySelector('.pg-c-checkout--ponumber').style.width = contentWidth + 'px';
        document.querySelector('.pg-c-checkout--freight').style.width = contentWidth + 'px';
        document.querySelector('.pg-c-checkout--actions').style.width = contentWidth + 'px';
    }
    
    setElementsWidth(contentWidth);

    document.querySelector('input[value="Apply Voucher"]').parentElement.setAttribute('onclick', 'applyVoucherAlert(this); return false;');
}, 100);

const applyVoucherAlert = (voucher) => {
    let voucherURL = voucher.getAttribute('href');

    Swal.fire({
        title: '<strong>Apply Voucher</u></strong>',
        icon: 'info',
        html:
          '<iframe src="https://capstone.mybrandstorefront.com/' + voucherURL + '"><iframe>',
        showCloseButton: true,
        focusConfirm: false,
        showCancelButton: false,
        showConfirmButton: false
    })
}

const closeAlert = () => {
    Swal.close();
}

window.addEventListener("message", function(event) {
    if(event.data == "closeAlert");{
        closeAlert();
    }
});