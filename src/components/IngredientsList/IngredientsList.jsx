import "./IngredientsList.css";

export function IngredientsList({ ingredients, getRecipe, ref }) {
	const ingredientsList = ingredients.map((ingredient) => {
		return <li key={ingredient}>{ingredient}</li>;
	});

	return (
		<section>
			<h2>Ingredients on hand:</h2>
			<ul className="ingredients-list" aria-live="polite">
				{ingredientsList}
			</ul>
			{ingredients.length > 3 ? (
				<div className="get-recipe-container" ref={ref}>
					<div>
						<h3>Ready for a recipe?</h3>
						<p>Generate a recipe from your list of ingredients.</p>
					</div>
					<button onClick={getRecipe}>Get a recipe</button>
				</div>
			) : null}
		</section>
	);
}
