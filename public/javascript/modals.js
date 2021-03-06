// get modals elements
const err = document.querySelector('#err-modal');
const info = document.querySelector('#info-modal');
const conf = document.querySelector('#conf-modal');
const info_title = document.querySelector('#info-title');
const info_msg = document.querySelector('#info-msg');

// when OK or cancel is clicked, hide the modal again
const modalOk = () => {
    // if the info modal's title is checkout processed,
    // go to order history
    if (info_title.innerHTML === 'Checkout processed') {
        window.location.replace('/order-history');
    }
    
    // hide modal elements and replace its value back to what it was
    err.classList.add('invisible');
    info.classList.add('invisible');
    conf.classList.add('invisible');
    info_title.innerHTML = 'Information';
    info_msg.innerHTML = '';
};
