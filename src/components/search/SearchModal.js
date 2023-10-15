import React, { useContext, useEffect, useState } from 'react';
import { SearchModalContext } from '../../context/searchModalContext';
import { modalBackdrop, modal } from './SearchModal.module.css';
import SearchField from './SearchField';

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const { isSearchModalOpen, closeSearchModal } =
    useContext(SearchModalContext);

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();

        closeSearchModal();
      }

      if (event.key === 'Enter') {
        event.preventDefault();

        // you go ahead with search here or remove it
      }
    };
    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isSearchModalOpen) return null;

  const onFocusHandler = () => {
    console.log('focused');
  };

  return (
    <>
      <div
        className={`transition-opacity backdrop-blur-lg opacity-100 bg-blue-gray-600/25 ${modalBackdrop}`}
        style={{
          WebkitBackdropFilter: 'blur(16px)',
        }}
        onClick={closeSearchModal}
        onKeyDown={closeSearchModal}
        role="button"
        tabIndex={0}
        aria-label="Close"
      />
      <div className={`font-worksans + ${modal}`}>
        <SearchField
          value={searchQuery}
          setValue={setSearchQuery}
          onFocus={onFocusHandler}
          closeModal={closeSearchModal}
        />
      </div>
    </>
  );
}

export default Search;
