import "./App.css";
import { Header } from "../src/components/Header/Header";
import { useState, useEffect, useRef } from "react";
import { Recipe } from "../src/components/Recipe/Recipe";
import { IngredientsList } from "../src/components/IngredientsList/IngredientsList";
import { getRecipesFromChefClaude } from "../src/services/ai";

export function App() {
	const [ingredients, setIngredients] = useState([]);
	const [recipe, setRecipe] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const recipeView = useRef(null);

	function addIngredient(data) {
		const newIngredient = data.get("ingredient");
		setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
	}

	const getRecipe = async () => {
		setIsLoading(true);
		const recommendedRecipe = await getRecipesFromChefClaude(ingredients);
		setRecipe(recommendedRecipe);
		setIsLoading(false);
	};
	useEffect(() => {
		if (recipe.trim().length !== 0 && recipeView.current !== null)
			recipeView.current.scrollIntoView({ behavior: "smooth" });
	}, [recipe]);

	return (
		<>
			<header>
				<Header></Header>
			</header>
			<main>
				<form action={addIngredient}>
					<input
						name="ingredient"
						type="text"
						aria-label="Add ingredient"
						placeholder="e.g. oregano"
					/>
					<button>Add ingredient</button>
				</form>
				{ingredients.length > 0 ? (
					<IngredientsList
						ingredients={ingredients}
						getRecipe={getRecipe}
						ref={recipeView}
					/>
				) : null}
				{(recipe.trim().length !== 0 || isLoading) && (
					<Recipe recipe={recipe} isLoading={isLoading} />
				)}
			</main>
		</>
	);
}
