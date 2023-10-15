import React from 'react';

function Input({
  type,
  name,
  id,
  placeholder,
  autoFocus,
  className,
  ...props
}) {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus={autoFocus || false}
      className={`${
        className || ''
      } block w-full rounded-lg border-0 text-gray-900 dark:text-gray-50 placeholder:text-gray-600 dark:placeholder:text-gray-400 focus:outline-none bg-gray-100 dark:bg-gray-800`}
    />
  );
}

export default Input;
