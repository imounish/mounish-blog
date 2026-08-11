import axios from 'axios';
import { graphql, useStaticQuery } from 'gatsby';
import React, { useContext, useEffect, useState } from 'react';
import { SearchModalContext } from '../../context/searchModalContext';
import SearchField from './SearchField';
import { modal, modalBackdrop, modalClosing, modalBackdropClosing } from './SearchModal.module.css';
import SearchResult from './SearchResult';

const query = graphql`
  {
    localSearchBlogs {
      publicIndexURL
      publicStoreURL
    }
    localSearchAuthors {
      publicIndexURL
      publicStoreURL
    }
    localSearchCategories {
      publicIndexURL
      publicStoreURL
    }
    localSearchTags {
      publicIndexURL
      publicStoreURL
    }
  }
`;

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isClosing, setIsClosing] = useState(false);
  const { isSearchModalOpen, closeSearchModal } =
    useContext(SearchModalContext);
  const [blogsIndexStore, setBlogsIndexStore] = useState(null);
  const [categoriesIndexStore, setCategoriesIndexStore] = useState(null);
  const [tagsIndexStore, setTagsIndexStore] = useState(null);
  const [authorsIndexStore, setAuthorsIndexStore] = useState(null);
  const data = useStaticQuery(query);

  useEffect(() => {
    if (isSearchModalOpen) {
      document.body.style.overflow = 'hidden';
      setSearchQuery('');
      setIsClosing(false);
    } else {
      document.body.style.overflow = 'initial';
    }
  }, [isSearchModalOpen]);

  const {
    publicStoreURL: blogsPublicStoreURL,
    publicIndexURL: blogsPublicIndexURL,
  } = data.localSearchBlogs;
  const {
    publicStoreURL: categoriesPublicStoreURL,
    publicIndexURL: categoriesPublicIndexURL,
  } = data.localSearchCategories;
  const {
    publicStoreURL: tagsPublicStoreURL,
    publicIndexURL: tagsPublicIndexURL,
  } = data.localSearchTags;
  const {
    publicStoreURL: authorsPublicStoreURL,
    publicIndexURL: authorsPublicIndexURL,
  } = data.localSearchAuthors;

  useEffect(() => {
    const keyDownHandler = event => {
      if (event.key === 'Escape') {
        event.preventDefault();
        handleClose();
      }

      if (event.key === 'Enter') {
        event.preventDefault();
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setIsClosing(true);
  };

  const handleAnimationEnd = () => {
    if (isClosing) {
      closeSearchModal();
    }
  };

  if (!isSearchModalOpen) return null;

  const onFocusHandler = async () => {
    if (
      blogsIndexStore &&
      categoriesIndexStore &&
      authorsIndexStore &&
      tagsIndexStore
    )
      return;

    const [
      { data: blogsIndex },
      { data: blogsStore },
      { data: categoriesIndex },
      { data: categoriesStore },
      { data: tagsIndex },
      { data: tagsStore },
      { data: authorsIndex },
      { data: authorsStore },
    ] = await Promise.all([
      axios.get(blogsPublicIndexURL),
      axios.get(blogsPublicStoreURL),
      axios.get(categoriesPublicIndexURL),
      axios.get(categoriesPublicStoreURL),
      axios.get(tagsPublicIndexURL),
      axios.get(tagsPublicStoreURL),
      axios.get(authorsPublicIndexURL),
      axios.get(authorsPublicStoreURL),
    ]);

    setBlogsIndexStore({ index: blogsIndex, store: blogsStore });
    setCategoriesIndexStore({ index: categoriesIndex, store: categoriesStore });
    setTagsIndexStore({ index: tagsIndex, store: tagsStore });
    setAuthorsIndexStore({ index: authorsIndex, store: authorsStore });
  };

  return (
    <>
      <div
        className={`bg-gray-800/20 backdrop-blur-md dark:bg-black/30 ${modalBackdrop} ${isClosing ? modalBackdropClosing : ''}`}
        style={{ WebkitBackdropFilter: 'blur(12px)' }}
        onClick={handleClose}
        onKeyDown={handleClose}
        role="button"
        tabIndex={0}
        aria-label="Close"
        onAnimationEnd={handleAnimationEnd}
      />
      <div className="flex flex-col">
        <div
          className={`font-worksans ${isClosing ? modalClosing : modal}`}
          onAnimationEnd={handleAnimationEnd}
        >
          <SearchField
            value={searchQuery}
            setValue={setSearchQuery}
            onFocus={onFocusHandler}
            closeModal={handleClose}
            resultVisible={searchQuery}
          />
          {searchQuery &&
            blogsIndexStore &&
            categoriesIndexStore &&
            tagsIndexStore &&
            authorsIndexStore && (
              <SearchResult
                searchQuery={searchQuery}
                blogsIndexStore={blogsIndexStore}
                categoriesIndexStore={categoriesIndexStore}
                tagsIndexStore={tagsIndexStore}
                authorsIndexStore={authorsIndexStore}
              />
            )}
        </div>
      </div>
    </>
  );
}

export default Search;
