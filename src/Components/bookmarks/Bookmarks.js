import React, { useContext } from "react";
import { SearchContext } from "../../helper/context";
import "../../sass/bookmarks.scss";
import Recipe from "../recipe/Recipe";

const Bookmarks = () => {
  const { bookmarked } = useContext(SearchContext);
  return (
    <>
      <li className="bookmark">
        <h2 className="nav__btn--bookmarks">Favorites</h2>

        <div className="bookmarks">
          <ul className="bookmarks__list">
            {bookmarked.map((data, i) => {
              return <Recipe key={i} data={data.recipe} />;
            })}

            <div className="message">
              {!bookmarked.length && (
                <p>No bookmarks yet. Find a nice recipe and bookmark it :)</p>
              )}
            </div>
          </ul>
        </div>
      </li>
    </>
  );
};

export default Bookmarks;
