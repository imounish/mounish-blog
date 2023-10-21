import React from 'react';
import { useFlexSearch } from 'react-use-flexsearch';
import { searchResultSection } from './SearchResult.module.css';
import SearchResultHolder from './SearchResultHolder';
import { BlogSearchResultItem, CategorySearchResultItem, AuthorSearchResultItem, TagSearchResultItem } from './SearchResultItem';


function SearchResult({ searchQuery, blogsIndexStore, categoriesIndexStore, tagsIndexStore, authorsIndexStore }) {
  const blogsResult = useFlexSearch(
    searchQuery,
    JSON.stringify(blogsIndexStore.index),
    blogsIndexStore.store
  );
  const categoriesResult = useFlexSearch(
    searchQuery,
    JSON.stringify(categoriesIndexStore.index),
    categoriesIndexStore.store
  )
  const tagsResult = useFlexSearch(
    searchQuery,
    JSON.stringify(tagsIndexStore.index),
    tagsIndexStore.store
  )
  const authorsResult = useFlexSearch(
    searchQuery,
    JSON.stringify(authorsIndexStore.index),
    authorsIndexStore.store
  )

  if (blogsResult.length === 0 && categoriesResult.length === 0 && tagsResult.length === 0 && authorsResult.length === 0 ) {
    return <SearchResultHolder className='text-gray-600 dark:text-gray-400'>
      <p className="py-2 font-worksans">
        No result found
      </p>
    </SearchResultHolder>
  }

  return <SearchResultHolder className={searchResultSection}>
    {blogsResult.length > 0 && (
      <>
        <p className="text-sm md:text-base text-gray-500 font-lora lowercase">blogs</p>
        <ul className='flex flex-col gap-2 pt-2 pb-4'>
          {blogsResult.map((result) => (
            <BlogSearchResultItem key={result.id} blog={result} />
          ))}
        </ul>
      </>
    )}
    {categoriesResult.length > 0 && (
      <>
        <p className="text-sm md:text-base text-gray-500 font-lora lowercase">categories</p>
        <ul className='flex flex-col gap-2 pt-2 pb-4'>
          {categoriesResult.map((result) => (
              <CategorySearchResultItem key={result.id} category={result} />
          ))}
        </ul>
      </>
    )}
    {tagsResult.length > 0 && (
      <>
        <p className="text-sm md:text-base text-gray-500 font-lora lowercase">tags</p>
        <ul className='flex flex-col gap-2 pt-2 pb-4'>
          {tagsResult.map((result) => (
              <TagSearchResultItem key={result.id} tag={result} />
          ))}
        </ul>
      </>
    )}
    {authorsResult.length > 0 && (
      <>
        <p className="text-sm md:text-base text-gray-500 font-lora lowercase">authors</p>
        <ul className='flex flex-col gap-2 pt-2 pb-4'>
          {authorsResult.map((result) => (
              <AuthorSearchResultItem key={result.id} author={result} />
          ))}
        </ul>
      </>
    ) 
    }
  </SearchResultHolder>
}

export default SearchResult