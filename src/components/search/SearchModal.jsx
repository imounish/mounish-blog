import React, { useContext, useEffect, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import axios from 'axios';
import { modal, modalBackdrop } from './SearchModal.module.css';

import SearchField from './SearchField';
import { SearchModalContext } from '../../context/searchModalContext';
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
  }
`;

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const { isSearchModalOpen, closeSearchModal } =
    useContext(SearchModalContext);
  const [blogsIndexStore, setBlogsIndexStore] = useState(null);
  const [categoriesIndexStore, setCategoriesIndexStore] = useState(null);
  const [authorsIndexStore, setAuthorsIndexStore] = useState(null);
  const data = useStaticQuery(query);

  useEffect(() => {
    if (isSearchModalOpen) {
      document.body.style.overflow = 'hidden';
      setSearchQuery('');
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
    publicStoreURL: authorsPublicStoreURL,
    publicIndexURL: authorsPublicIndexURL,
  } = data.localSearchAuthors;
  

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

  const onFocusHandler = async () => {
    if (blogsIndexStore && categoriesIndexStore && authorsIndexStore) return;

    // fetching the index and store when not available in state
    const [
      { data: blogsIndex },
      { data: blogsStore },
      { data: categoriesIndex },
      { data: categoriesStore },
      { data: authorsIndex },
      { data: authorsStore },
    ] = await Promise.all([
      axios.get(blogsPublicIndexURL),
      axios.get(blogsPublicStoreURL),
      axios.get(categoriesPublicIndexURL),
      axios.get(categoriesPublicStoreURL),
      axios.get(authorsPublicIndexURL),
      axios.get(authorsPublicStoreURL),
    ]);

    // updating state after fetching the result
    setBlogsIndexStore({
      index: blogsIndex,
      store: blogsStore
    })
    setCategoriesIndexStore({
      index: categoriesIndex,
      store: categoriesStore
    })
    setAuthorsIndexStore({
      index: authorsIndex,
      store: authorsStore
    })
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
        <div className="flex flex-col">
          <div className={`font-worksans + ${modal}`}>
            <SearchField
              value={searchQuery}
              setValue={setSearchQuery}
              onFocus={onFocusHandler}
              closeModal={closeSearchModal}
              resultVisible={searchQuery}
            />
            {
              searchQuery && blogsIndexStore && categoriesIndexStore && authorsIndexStore && (
                <SearchResult 
                  searchQuery={searchQuery}
                  blogsIndexStore={blogsIndexStore}
                  categoriesIndexStore={categoriesIndexStore}
                  authorsIndexStore={authorsIndexStore}
                />
              )
            }
        </div>
      </div>
    </>
  );
}

export default Search;