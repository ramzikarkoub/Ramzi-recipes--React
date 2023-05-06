import "./App.scss";
import { Header } from "./Components/Header/Header";
import RecipeList from "./Components/recipeList/RecipeList";

import { SearchProvider } from "./helper/context";
import SelectedRecipe from "./Components/SelectedRecipe/SelectedRecipe";

function App() {
  return (
    <SearchProvider className="App">
      <div className="container">
        <Header />
        <div className="row  col-12">
          <div className="col-md-4 col-12 g-2">
            <div className="receipes d-flex flex-column">
              <RecipeList />
            </div>
          </div>

          <div className="col-md-8 col-12 g-2">
            <div className="box">
              <SelectedRecipe />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="container">
        <Header />
        <RecipeList />
        <SelectedRecipe />
      </div> */}
    </SearchProvider>
  );
}

export default App;
