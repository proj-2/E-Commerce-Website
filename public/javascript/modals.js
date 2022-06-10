const err = document.querySelector('#err-modal');
const info = document.querySelector('#info-modal');
const conf = document.querySelector('#conf-modal');
const info_title = document.querySelector('#info-title');
const info_msg = document.querySelector('#info-msg');

const modalOk = () => {
    if (info_title.innerHTML === 'Checkout processed') {
        window.location.replace('/order-history');
    }

    err.classList.add('invisible');
    info.classList.add('invisible');
    conf.classList.add('invisible');
    info_title.innerHTML = 'Information';
    info_msg.innerHTML = '';
};
