import React, { useContext, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { SignUpModalContext } from "../../context/signUpModalContext";
import { modal, modalBackdrop, modalClosing, modalBackdropClosing } from "./SignUpModal.module.css";
import FormContainer from "./FormContainer";

function SignUp() {
  const [isClosing, setIsClosing] = useState(false);
  const { isSignUpModalOpen, closeSignUpModal } =
    useContext(SignUpModalContext);

  useEffect(() => {
    if (isSignUpModalOpen) {
      document.body.style.overflow = "hidden";
      setIsClosing(false);
    } else {
      document.body.style.overflow = "initial";
    }
  }, [isSignUpModalOpen]);

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setIsClosing(true);
  };

  const handleAnimationEnd = () => {
    if (isClosing) {
      closeSignUpModal();
    }
  };

  if (!isSignUpModalOpen) return null;

  return (
    <>
      <div
        className={`bg-gray-800/20 backdrop-blur-md dark:bg-black/30 ${modalBackdrop} ${isClosing ? modalBackdropClosing : ''}`}
        style={{ WebkitBackdropFilter: "blur(12px)" }}
        onClick={handleClose}
        onKeyDown={handleClose}
        role="button"
        tabIndex={0}
        aria-label="Close"
        onAnimationEnd={handleAnimationEnd}
      />
      <div
        className={`flex flex-col gap-4 rounded-lg bg-white p-4 md:p-6 text-gray-900 dark:bg-black dark:text-gray-50 ${isClosing ? modalClosing : modal}`}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className="space-between flex flex-row items-center justify-between">
          <h1 className="font-warnockdisp text-2xl tracking-wide text-black dark:text-gray-50 md:text-3xl">
            join the newsletter now
          </h1>
          <button
            type="button"
            onClick={handleClose}
            className="rounded focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:ring-offset-2 dark:focus-visible:ring-gray-100"
          >
            <MdClose className="h-6 w-6 md:h-8 md:w-8 text-gray-900 dark:text-gray-100" />
          </button>
        </div>
        <FormContainer />
      </div>
    </>
  );
}

export default SignUp;
