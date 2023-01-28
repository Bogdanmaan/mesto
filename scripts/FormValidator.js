export const config = {
  formSelector: '.edit-form',
  inputSelector: '.edit-form__field',
  submitButtonSelector: '.edit-form__button',
  inactiveButtonClass: 'edit-form__button_inactive',
  inputErrorClass: 'edit-form__field_type_error',
  errorClass: 'edit-form__field-error'
}

export class FormValidator {
    constructor(config, formElement) {
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._formElement = formElement;
    }

    btnDisabled = (button) => {
      button.classList.add(this._inactiveButtonClass);
      button.disabled = true;
    }
      
    _btnEnable = (button) => {
        button.classList.remove(this._inactiveButtonClass);
        button.disabled = false;
    }
      
    _hasInvalidInput = (inputList) => {
          return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
          })
    };
        
    _toggleButtonState = (inputList, buttonElement) => {
          if (hasInvalidInput(inputList)) {
            btnDisabled(buttonElement);
          } else {
            btnEnable(buttonElement);
          }
    };

    _showInputError = (inputElement, errorMessage) => {
        errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        this._formElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage; 
    };

    _hideInputError = (inputElement) => {
        errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        formElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = '';
    };

    _isValid = (inputElement) => {
        if (!inputElement.validity.valid) {
          showInputError(inputElement, inputElement.validationMessage);
        } else {
          hideInputError(inputElement);
        }
    };

    _setEventListeners = () => {
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
          inputElement.addEventListener('input', () => {
            isValid(inputElement);
            toggleButtonState(inputList, buttonElement);
          });
        });
    };

    enableValidation = () => {
        const formList = Array.from(document.querySelectorAll(this._formSelector));
        formList.forEach((form) => {
          setEventListeners(form);
        });
    };

}