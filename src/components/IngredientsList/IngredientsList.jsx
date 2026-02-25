import "./IngredientsList.css";
import {translations} from "../../translations"


export function IngredientsList({ ingredients, getRecipe, recipeRef, language}) {
	const ingredientsList = ingredients.map((ingredient, i) => {
		return <li key={i}>{ingredient}</li>;
	});

	return (
		<section>
			<h2>{translations[language].ingredientsTitle}</h2>
			<ul className="ingredients-list" aria-live="polite">
				{ingredientsList}
			</ul>
			{ingredients.length > 2 ? (
				<div className="get-recipe-container" ref={recipeRef}>
					<div>
						<h3>{translations[language].recipePromptTitle}</h3>
						<p>{translations[language].recipePromptDesc}</p>
					</div>
					<button onClick={getRecipe}>{translations[language].getRecipeButton}</button>
				</div>
			) : null}
		</section>
	);
}
