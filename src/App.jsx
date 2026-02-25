import "./App.css";
import { translations } from "./translations";
import { Header } from "../src/components/Header/Header";
import { Recipe } from "../src/components/Recipe/Recipe";
import { IngredientsList } from "../src/components/IngredientsList/IngredientsList";
import { getRecipesFromChefBot } from "../src/services/ai";
import { useState, useEffect, useRef } from "react";

export function App() {
	const [language, setLanguage] = useState("en");
	const [ingredients, setIngredients] = useState([]);
	const [recipe, setRecipe] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const recipeView = useRef(null);

	function toggleLanguage() {
		setLanguage((prevLang) => (prevLang === "en" ? "ar" : "en"));
	}
	function addIngredient(data) {
		const newIngredient = data.get("ingredient");
		if (!newIngredient.trim()) return;
		setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
	}

	const getRecipe = async () => {
		setIsLoading(true);
		const recommendedRecipe = await getRecipesFromChefBot(
			ingredients,
			language,
		);
		setRecipe(recommendedRecipe);
		setIsLoading(false);
	};
	useEffect(() => {
		if (recipe.trim().length !== 0 && recipeView.current !== null)
			recipeView.current.scrollIntoView({ behavior: "smooth" });
	}, [recipe]);

	function reset() {
		setIngredients([]);
		setRecipe("");
	}
	return (
		<>
			<Header language={language} toggleLanguage={toggleLanguage}></Header>
			<main dir={language === "ar" ? "rtl" : "ltr"}>
				<p className="tagline">{translations[language].tagline}</p>
				<form action={addIngredient}>
					<input
						name="ingredient"
						type="text"
						aria-label="Add ingredient"
						placeholder={translations[language].placeholder}
					/>
					<button>{translations[language].addButton}</button>
				</form>
				{ingredients.length > 0 ? (
					<IngredientsList
						ingredients={ingredients}
						getRecipe={getRecipe}
						recipeRef={recipeView}
						language={language}
					/>
				) : null}
				{(recipe.trim().length !== 0 || isLoading) && (
					<Recipe
						recipe={recipe}
						isLoading={isLoading}
						language={language}
						reset={reset}
					/>
				)}
			</main>
		</>
	);
}
