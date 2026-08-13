// T12: ported from src/components/input/InputField.jsx (Gatsby app), with
// one adaptation: @material-tailwind's <Button> was dropped repo-wide in
// T3, so the submit variant renders a plain <button> styled to match the
// same classes the rest of the migrated app uses (see e.g.
// NewsletterSection.astro's disabled placeholder button, now replaced).
import React from 'react';

function InputField({
  className,
  type,
  formValues,
  label,
  onChangeHandler,
  placeholder,
  value,
  isRequired,
  name,
}) {
  const validateInput = (values) => {
    if (values.some((f) => f === '') || values[0].indexOf('@') === -1) {
      return true;
    }
    return false;
  };

  if (type === 'submit') {
    return (
      <button
        type="submit"
        disabled={validateInput(formValues)}
        className={`${className || ''} font-worksans rounded-lg bg-gray-900 px-4 py-2.5 text-lg font-medium lowercase text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-black dark:hover:bg-gray-300`}
      >
        subscribe
      </button>
    );
  }

  return (
    <label htmlFor={name} className="text-base sm:text-lg">
      {label}
      <input
        id={name}
        onChange={(e) => onChangeHandler(e.target.value)}
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
