// T12: ported unchanged (aside from import paths) from
// src/components/newsletter/SignUpModal.jsx (Gatsby app).
import React, { useContext, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { SignUpModalContext } from '../../context/signUpModalContext';
import { modal, modalBackdrop } from './SignUpModal.module.css';
import FormContainer from './FormContainer';

function SignUpModal() {
  const { isSignUpModalOpen, closeSignUpModal } =
    useContext(SignUpModalContext);

  useEffect(() => {
    if (isSignUpModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'initial';
    }
  }, [isSignUpModalOpen]);

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeSignUpModal();
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isSignUpModalOpen) return null;

  return (
    <>
      <div
        className={`bg-blue-gray-600/25 opacity-100 backdrop-blur-lg transition-opacity ${modalBackdrop}`}
        style={{
          WebkitBackdropFilter: 'blur(16px)',
        }}
        onClick={closeSignUpModal}
        onKeyDown={closeSignUpModal}
        role="button"
        tabIndex={0}
        aria-label="Close"
      />
      <div
        className={`flex flex-col gap-4 rounded-lg bg-white p-4 text-gray-900 dark:bg-black dark:text-gray-50 md:p-6 ${modal}`}
      >
        <div className="space-between flex flex-row items-center justify-between">
          <h1 className="font-warnockdisp text-2xl tracking-wide text-black dark:text-gray-50 md:text-3xl">
            join the newsletter now
          </h1>
          <button type="button" onClick={closeSignUpModal}>
            <MdClose className="h-6 w-6 text-gray-900 dark:text-gray-100 md:h-8 md:w-8" />
          </button>
        </div>
        <FormContainer />
      </div>
    </>
  );
}

export default SignUpModal;
