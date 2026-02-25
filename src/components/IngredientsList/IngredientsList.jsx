import "./IngredientsList.css";
import {translations} from "../../translations"


export function IngredientsList({ ingredients, getRecipe, ref, language}) {
	const ingredientsList = ingredients.map((ingredient) => {
		return <li key={ingredient}>{ingredient}</li>;
	});

	return (
		<section>
			<h2>{translations[language].ingredientsTitle}</h2>
			<ul className="ingredients-list" aria-live="polite">
				{ingredientsList}
			</ul>
			{ingredients.length > 3 ? (
				<div className="get-recipe-container" ref={ref}>
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
