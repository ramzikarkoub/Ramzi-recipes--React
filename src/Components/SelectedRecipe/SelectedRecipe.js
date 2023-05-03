import React, { useContext, useEffect, useState } from "react";
import "../../sass/selectedRecipe.scss";
import { SearchContext } from "../../helper/context";
import {
  IoBookmark,
  IoTimerOutline,
  IoPeopleOutline,
  IoBookmarkOutline,
  IoAddCircleOutline,
  IoRemoveCircleOutline,
  IoCheckmarkOutline,
  IoHeartOutline,
} from "react-icons/io5";
import BeatLoader from "react-spinners/BeatLoader";

const SelectedRecipe = () => {
  const {
    selected,
    bookmarked,
    setBookmarked,
    isLoadingSelectedRecipe,
    setIsLoadingSelectedRecipe,
  } = useContext(SearchContext);
  const id = document.location.hash.slice(1);
  const [recipe, setRecipe] = useState();
  const [serving, setServing] = useState();

  const check = bookmarked.some((marked) => marked.recipe.id === id);

  useEffect(() => {
    if (!selected) return;
    setIsLoadingSelectedRecipe(true);
    document.location.href = `/#${selected}`;
    fetch(
      `${process.env.REACT_APP_API_URL}/${selected}?key=${process.env.REACT_APP_API_KEY}
      `
    ).then((res) =>
      res
        .json()
        .then((re) => {
          if (re.status === "fail") throw new Error(`${re.message}`);
          setIsLoadingSelectedRecipe(false);
          setRecipe(re.data.recipe);
          setServing(re.data.recipe.servings);
        })
        .catch((err) =>
          alert(`We have some error with sever on <RecipeView>: ${err}`)
        )
    );
  }, [selected]);

  function bookmarkHandle() {
    if (!check) {
      setBookmarked((prev) => {
        return [...prev, { recipe }];
      });
    } else {
      setBookmarked((prev) => {
        return prev.filter((prev) => prev.recipe.id !== recipe.id);
      });
    }
  }

  console.log(bookmarked);
  useEffect(() => {
    // add bookmark to local storage everytime bookmarked is changed
    localStorage.setItem("bookmarked", JSON.stringify(bookmarked));
  }, [bookmarked]);

  return (
    <div className="recipe">
      {isLoadingSelectedRecipe ? (
        <div className="loader">
          <BeatLoader
            color="#f38e82"
            margin={10}
            cssOverride={{
              padding: "30%",
            }}
          />
        </div>
      ) : !recipe ? (
        <div className="message">
          <p> Start by searching for a recipe or an ingredient. Have fun!</p>
        </div>
      ) : (
        <>
          <figure className="recipe__fig">
            <img src={recipe.image_url} alt="Tomato" className="recipe__img" />
            <h1 className="recipe__title">
              <span>{recipe.title}</span>
            </h1>
          </figure>

          <div className="recipe__details">
            <div className="recipe__info">
              <IoTimerOutline className="recipe__info-icon" />
              <span className="recipe__info-data recipe__info-data--minutes">
                {recipe.cooking_time}
              </span>
              <span className="recipe__info-text">minutes</span>
            </div>
            <div className="recipe__info">
              <IoPeopleOutline className="recipe__info-icon" />
              <span className="recipe__info-data recipe__info-data--people">
                {serving}
              </span>
              <span className="recipe__info-text">servings</span>

              <div className="recipe__info-buttons">
                <button
                  onClick={() => setServing(serving + 1)}
                  className="recipe__info-buttons__increase-servings"
                >
                  <IoAddCircleOutline className="recipe__info-icon" />
                </button>
                <button
                  onClick={() => serving !== 1 && setServing(serving - 1)}
                  className="recipe__info-buttons__increase-servings"
                >
                  <IoRemoveCircleOutline className="recipe__info-icon" />
                </button>
              </div>
            </div>

            <button className="recipe__btn--round" onClick={bookmarkHandle}>
              {!check ? (
                <IoBookmarkOutline className="recipe__info-icon__bookmark" />
              ) : (
                <IoBookmark className="recipe__info-icon__bookmark" />
              )}
            </button>
          </div>
          <div className="recipe__ingredients">
            <h2 className="recipe__heading--2">Recipe ingredients</h2>
            <ul className="recipe__ingredient-list">
              {recipe.ingredients.map((ing, i) => {
                return (
                  <li className="recipe__ingredient" key={i}>
                    <IoCheckmarkOutline className="recipe__icon" />
                    <div className="recipe__quantity">
                      {ing.quantity
                        ? (ing.quantity * serving) / recipe.servings
                        : ""}
                    </div>
                    <div className="recipe__description">
                      <span className="recipe__unit"> {ing.unit}</span>{" "}
                      {ing.description}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="recipe__directions">
            <h2 className="heading--2">How to cook it</h2>
            <p className="recipe__directions-text">
              This recipe was carefully designed and tested by
              <span className="recipe__publisher"> {recipe.publisher}</span>.
              Please check out directions at their website.
            </p>
            <a
              className="__recipebtn"
              href={recipe.source_url}
              target="_blank"
              rel="noreferrer"
            >
              <span>Directions</span>
              <IoHeartOutline />
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default SelectedRecipe;
