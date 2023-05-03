import React, { useContext } from "react";
import "../../sass/recipe.scss";
import { SearchContext } from "../../helper/context";
import { IoPerson } from "react-icons/io5";

export const Recipe = ({ data }) => {
  const { selected, setSelected } = useContext(SearchContext);

  return (
    <li className="preview">
      <a
        onClick={() => setSelected(data.id)}
        className={`preview__link ${
          selected === data.id ? "preview__link--active" : ""
        }`}
        href={`#${data.id}`}
      >
        <figure className="preview__fig">
          <img src={data.image_url} alt="Test" />
        </figure>
        <div className="preview__data">
          <h4 className="preview__title">{data.title}</h4>
          <p className="preview__publisher">{data.publisher}</p>
          {data.key ? (
            <div className="preview__user-generated">
              <IoPerson />
            </div>
          ) : (
            ""
          )}
        </div>
      </a>
    </li>
  );
};
export default Recipe;
