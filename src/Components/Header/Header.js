import React, { useContext, useEffect } from "react";
import "../../sass/header.scss";
import { SearchContext } from "../../helper/context";
import { FaBookmark } from "react-icons/fa";
import Bookmarks from "../bookmarks/Bookmarks";

export const Header = () => {
  const { setResults, searchValue, setSearchValue, setIsLoading } =
    useContext(SearchContext);

  useEffect(() => {
    if (!searchValue && searchValue !== "") return;
    const timer = setTimeout(() => {
      fetch(
        `${process.env.REACT_APP_API_URL}/?search=${searchValue}&key=${process.env.REACT_APP_API_KEY}`
      ).then((result) =>
        result.json().then((res) => {
          setResults(res);
          setIsLoading(false);
        })
      );
    }, 500);
    return () => clearTimeout(timer);
  }, [searchValue]);

  return (
    <header className="header">
      <a href="/">
        <h2>Ramzi's Recipes</h2>
      </a>
      <form className="search">
        <input
          value={searchValue}
          onChange={(e) => {
            e.preventDefault();
            setSearchValue(e.target.value); //change
            setIsLoading(true);
          }}
          onKeyPress={(e) => {
            e.key === "Enter" && e.preventDefault();
          }}
          type="text"
          className="search__field"
          placeholder="Search over 1,000,000 recipes..."
        />
      </form>
      <nav className="nav">
        <FaBookmark className="nav_icon" />
        <Bookmarks />
      </nav>
    </header>
  );
};
