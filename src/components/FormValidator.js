export class FormValidator {
    constructor (config, formElement) {
        this._inputSelector = config.inputSelector; 
        this._submitButtonSelector = config.submitButtonSelector; 
        this._inactiveButtonClass = config.inactiveButtonClass; 
        this._inputErrorClass = config.inputErrorClass; 
        this._errorClass = config.errorClass; 
        this._formElement = formElement;
        this._inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
        this._buttonElement = formElement.querySelector(config.submitButtonSelector);
    }

    makeBtnDisabled () {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.disabled = true;
    }
      
    _makeBtnEnable (){
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.disabled = false;
    }

    _hasInvalidInput () {
        return this._inputList.some((inputElement) => {
          return !inputElement.validity.valid;
        })
    }
      
    _toggleButtonState () {
        if (this._hasInvalidInput()) {
            this.makeBtnDisabled();
        } else {
          this._makeBtnEnable();
        }
    }

    _showInputError (inputElement, errorMessage) {
        this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        this._formElement.classList.add(this._inputErrorClass);
        this._errorElement.textContent = errorMessage; 
    }

    _hideInputError (inputElement) {
        this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        this._formElement.classList.remove(this._inputErrorClass);
        this._errorElement.textContent = '';
    }

    _isValid (inputElement)  {
        if (!inputElement.validity.valid) {
          this._showInputError(inputElement, inputElement.validationMessage);
        } else {
          this._hideInputError(inputElement);
        }
    }

    _setEventListeners () {
        this._toggleButtonState();
        this._inputList.forEach( (inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._toggleButtonState();
            });
        });
    }

    enableValidation () {
        this._setEventListeners();
    }
}