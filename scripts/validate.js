//Валидация форм

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };
  
  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add('edit-form__button_inactive');
    } else {
      buttonElement.classList.remove('edit-form__button_inactive');
    }
  };
  
  const showInputError = (formElement, inputElement, errorMessage) => {
    errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    formElement.classList.add('edit-form__field_type_error');
    errorElement.textContent = errorMessage; 
  };
  
  const hideInputError = (formElement, inputElement) => {
    errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    formElement.classList.remove('edit-form__field_type_error');
    errorElement.textContent = '';
  };
  
  const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };
  
  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.edit-form__field'));
    const buttonElement = formElement.querySelector('.edit-form__button');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };
  
  const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.edit-form'));
    formList.forEach((formElement) => {
      setEventListeners(formElement);
    });
  };
  
  enableValidation();