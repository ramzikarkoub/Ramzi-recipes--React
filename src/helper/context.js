import React from "react";
import { createContext } from "react";
import { useState } from "react";
export const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState();
  const [page, setPage] = useState(1);
  const [bookmarked, setBookmarked] = useState(
    localStorage.getItem("bookmarked")
      ? JSON.parse(localStorage.getItem("bookmarked"))
      : []
  );
  const [selected, setSelected] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSelectedRecipe, setIsLoadingSelectedRecipe] = useState(false);
  const value = {
    searchValue,
    setSearchValue,
    results,
    setResults,
    page,
    setPage,
    bookmarked,
    setBookmarked,
    selected,
    setSelected,
    isLoading,
    setIsLoading,
    isLoadingSelectedRecipe,
    setIsLoadingSelectedRecipe,
  };
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}
export default SearchProvider;
