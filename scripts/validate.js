const config = {
  formSelector: '.edit-form',
  inputSelector: '.edit-form__field',
  submitButtonSelector: '.edit-form__button',
  inactiveButtonClass: 'edit-form__button_inactive',
  inputErrorClass: 'edit-form__field_type_error',
  errorClass: 'edit-form__field-error'
}

const btnDisabled = (button, config) => {
  button.classList.add(config.inactiveButtonClass);
  button.disabled = true;
}

const btnEnable = (button, config) => {
  button.classList.remove(config.inactiveButtonClass);
  button.disabled = false;
}

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };
  
const toggleButtonState = (inputList, buttonElement, config) => {
    if (hasInvalidInput(inputList)) {
      btnDisabled(buttonElement, config);
    } else {
      btnEnable(buttonElement, config);
    }
  };
  
const showInputError = (formElement, inputElement, errorMessage, config) => {
    errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    formElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage; 
  };
  
const hideInputError = (formElement, inputElement, config) => {
    errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    formElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
  };
  
const isValid = (formElement, inputElement, config) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
      hideInputError(formElement, inputElement, config);
    }
  };
  
const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, config);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, config);
        toggleButtonState(inputList, buttonElement, config);
      });
    });
  };

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
      setEventListeners(formElement, config);
    });
  };
  
enableValidation(config);