import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../helper/context";
import Recipe from "../recipe/Recipe";
import "../../sass/recipeList.scss";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";
import BeatLoader from "react-spinners/BeatLoader";

const RecipeList = () => {
  const { page, setPage, results, isLoading, searchValue } =
    useContext(SearchContext);
  const [newRes, setNewRes] = useState([]);
  const [message, setMessage] = useState("");
  let numPage;

  if (results) {
    // save the number of pages in a variable
    numPage = Math.floor(1 + results.data.recipes.length / 10);
  }
  useEffect(() => {
    // Create a new Results that contain 10 result per page

    if (results) {
      const start = (page - 1) * 10;
      const end = page * 10;
      setNewRes(results.data.recipes.slice(start, end));
    }
  }, [results, page]);

  useEffect(() => {
    isLoading && setMessage("");
    !isLoading &&
      setMessage("No recipes found for your query! Please try another one!");
  }, [results, searchValue]);

  return (
    <div className="search-results">
      {searchValue !== "" && results?.data.recipes.length === 0 && (
        <div className="error">
          <h3>{message}</h3>
        </div>
      )}

      {isLoading ? (
        <div className="loader">
          <BeatLoader
            color="#f38e82"
            margin={10}
            cssOverride={{
              padding: "30%",
            }}
          />
        </div>
      ) : (
        <ul className="results">
          {newRes && newRes.map((rec, i) => <Recipe key={i} data={rec} />)}
        </ul>
      )}
      <div className="pagination">
        {page !== 1 ? (
          <button
            onClick={() => setPage((prev) => prev - 1)}
            className="btn--inline pagination__btn--prev"
          >
            <IoArrowBackOutline />
            <span>{`Page ${page - 1}`}</span>
          </button>
        ) : (
          ""
        )}
        {page !== numPage && numPage ? (
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="btn--inline pagination__btn--next"
          >
            <span>{`Page ${page + 1}`}</span>
            <IoArrowForwardOutline />
          </button>
        ) : (
          ""
        )}
      </div>

      <p className="copyright">
        {`Copyright by `}
        <a
          rel="noreferrer"
          className="twitter-link"
          target="_blank"
          href="https://github.com/ramzikarkoub"
        >
          Ramzi Karkoub
        </a>
      </p>
    </div>
  );
};
export default RecipeList;
