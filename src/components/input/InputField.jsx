import { Button } from '@material-tailwind/react';
import React from 'react'

function InputField({ className, type, formValues, label, onChangeHandler, placeholder, value, isRequired, name }) {
  const validateInput = (values) => {
    if (values.some(f => f === "") || values[0].indexOf("@") === -1) {
      return true
    } 
    return false
  }

  if (type === 'submit') {
    return (
      <Button
        size="sm"
        type="submit"
        value={label}
        disabled={validateInput(formValues)}
        className={`${
          className || ''
        } font-worksans dark:text-blue-gray-900 dark:shadow-blue-gray-500/10 dark:hover:shadow-blue-gray-500/20 text-lg font-medium lowercase hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-300`}
      >
        subscribe
      </Button>
    );
  } 
    return (
      <label htmlFor={name} className='text-base sm:text-lg'>
        {label}
        <input
          id={name}
          onChange={e => onChangeHandler(e.target.value)}
          type={type}
          placeholder={placeholder}
          value={value}
          required={isRequired}
          className={`${className || ''} rounded-lg block w-full border-0 bg-gray-100 text-gray-900 placeholder:text-gray-600 focus:outline-[0.5px] focus:outline-gray-800 dark:focus:outline-gray-100 dark:bg-gray-800 dark:text-gray-50 dark:placeholder:text-gray-400`}
          name={name}
        />
      </label>
    );
  

}

export default React.memo(InputField);