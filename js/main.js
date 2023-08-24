const mainButtons = document.querySelectorAll('.main__button:not(.modal .main__button):not(.cookie-message .main__button)');
const menuButton = document.querySelector('.header__state-menu');
const modalWindow = document.querySelector('.modal');
const modalCloseButton = document.querySelector('.modal__close');
const modalCloseMobileButton = document.querySelector('.modal-mobile__close');
const overlay = document.querySelector('.overlay');

const modalMobile = document.querySelector('.modal-mobile')

mainButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.stopPropagation();
        modalWindow.classList.toggle('--show-modal');
        overlay.classList.toggle('--show-overlay');
    })
})

modalCloseButton.addEventListener('click', () => {
    modalWindow.classList.remove('--show-modal');
    overlay.classList.remove('--show-overlay');
})

menuButton.addEventListener('click', (event) => {
    event.stopPropagation();
    modalMobile.classList.toggle('--show-modal');
    document.body.style.overflow = 'hidden';
})

modalCloseMobileButton.addEventListener('click', () => {
    modalMobile.classList.remove('--show-modal');
    document.body.style.overflow = 'auto';
})

document.addEventListener('click', (event) => {
    if (!modalWindow.contains(event.target)) {
        modalWindow.classList.remove('--show-modal');
        overlay.classList.remove('--show-overlay');
    }
})

const form = document.querySelector('.modal__content');

form.querySelectorAll('.input-wrapper').forEach(function(inputWrapper) {
    const input = inputWrapper.querySelector('input');
    const label = inputWrapper.querySelector('label');
    const inputErrorField = inputWrapper.querySelector('.input-error__field');

    input.addEventListener('input', () => {
        handleInput(input, inputErrorField, label);
    })

    input.addEventListener('blur', () => {
        handleBlur(input, inputErrorField, label);
    })
})

const handleBlur = (input, inputErrorField, label) => {
    if (input.required && input.value.trim() === '') {
        inputErrorField.style.display = 'block';
        input.style.borderColor = '#EC1211';

        if (!label.querySelector('.input-wrapper__field')) {
            const asterisk = document.createElement('span');
            asterisk.classList.add('input-wrapper__field');
            asterisk.style.color = '#EC1211';
            asterisk.textContent = ' *';

            label.appendChild(asterisk);
        }
    }
    checkRequiredFields();
}

const handleInput = (input, inputErrorField, label) => {
    if (input.required) {
        inputErrorField.style.display = 'none';
        input.style.borderColor = '#F1F1F1';

        const asterisk = label.querySelector('.input-wrapper__field');
        if (asterisk) {
            label.removeChild(asterisk);
        }
    }
    checkRequiredFields();
}

const submitButton = form.querySelector('.main__button');
const modalSubmit = document.querySelector('.modal__submit');

submitButton.addEventListener('click', (event) => {
    event.preventDefault();

    form.classList.add('--hide-content')
    modalSubmit.classList.add('--show-submit')
})

const checkRequiredFields = () => {
    const requiredFields = form.querySelectorAll('input[required]');
    let allFieldsAreFilled = true;

    requiredFields.forEach((input) => {
        if (input.value.trim() === ''){
            allFieldsAreFilled = false;
            return;
        }
    })

    if (allFieldsAreFilled) {
        submitButton.classList.remove('button-disabled');
        submitButton.disabled = false;
    } else {
        submitButton.classList.add('button-disabled');
        submitButton.disabled = true;
    }
}

const modalSubmitButton = document.querySelector('.modal__submit .main__button');

modalSubmitButton.addEventListener('click', () => {
    form.classList.remove('--hide-content')
    modalSubmit.classList.remove('--show-submit')
    modalWindow.classList.remove('--show-modal');
    overlay.classList.remove('--show-overlay');
})

const cookieMessageModal = document.querySelector('.cookie-message');
const cookieMessageButtons = cookieMessageModal.querySelectorAll('.main__button');
const cookieCloseButton = cookieMessageModal.querySelector('.cookie__close');

cookieMessageModal.classList.add('show');

cookieCloseButton.addEventListener('click', () => {
    cookieMessageModal.classList.remove('show');
    overlay.classList.remove('--show-overlay');
    setTimeout(() => {
        cookieMessageModal.style.display = 'none';
    }, 500)

})

cookieMessageButtons.forEach((button) => {
    button.addEventListener('click', () => {
        cookieMessageModal.classList.remove('show');
        overlay.classList.remove('--show-overlay');
        setTimeout(() => {
            cookieMessageModal.style.display = 'none';
        }, 500)
    })
})

const windowWidth = window.innerWidth;

if (windowWidth <= 500) {
    overlay.classList.add('--show-overlay');
}