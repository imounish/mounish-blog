import React from 'react';

function Input({
  type,
  name,
  id,
  placeholder,
  className,
  autoFocus,
  value,
  onChange,
  onFocus,
  style,
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
      } block w-full border-0 bg-gray-100 text-gray-900 placeholder:text-gray-600 focus:outline-none dark:bg-gray-800 dark:text-gray-50 dark:placeholder:text-gray-400`}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      style={style}
    />
  );
}

export default Input;
