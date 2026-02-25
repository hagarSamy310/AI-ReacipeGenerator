import "./App.css";

// Translations
import { translations } from "./translations";

// Components
import { Header } from "./components/Header/Header";
import { IngredientsList } from "./components/IngredientsList/IngredientsList";
import { Recipe } from "./components/Recipe/Recipe";

// Services
import { getRecipesFromChefBot } from "./services/ai";

// React
import { useState, useEffect, useRef } from "react";

export function App() {
	// State
	const [language, setLanguage] = useState("en");
	const [ingredients, setIngredients] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");
	const [recipe, setRecipe] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	// Ref to scroll to recipe section when it appears
	const recipeView = useRef(null);

	// Handlers
	function toggleLanguage() {
		setLanguage((prevLang) => (prevLang === "en" ? "ar" : "en"));
	}

	function addIngredient(data) {
		const newIngredient = data.get("ingredient");
		const trimmedInput = newIngredient.trim().toLowerCase();

		// Reject empty or duplicate ingredients
		if (!trimmedInput || ingredients.includes(trimmedInput)) {
			setErrorMessage(translations[language].errorMessage);
		} else
			setIngredients((prevIngredients) => [...prevIngredients, trimmedInput]);
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

	function reset() {
		setIngredients([]);
		setRecipe("");
	}

	//  Effects
	// Auto-clear error message after 2 seconds
	useEffect(() => {
		if (!errorMessage) return;
		const timer = setTimeout(() => setErrorMessage(""), 2000);

		return () => clearTimeout(timer);
	}, [errorMessage]);

	// Scroll to recipe section whenever a new recipe is generated
	useEffect(() => {
		if (recipe.trim().length !== 0 && recipeView.current !== null)
			recipeView.current.scrollIntoView({ behavior: "smooth" });
	}, [recipe]);

	//  Render
	return (
		<>
			<Header language={language} toggleLanguage={toggleLanguage}></Header>
			<main dir={language === "ar" ? "rtl" : "ltr"}>
				{/* Error message -- visible class controls opacity */}
				<span className={`err-msg ${errorMessage ? "visible" : ""}`}>
					{errorMessage}
				</span>

				<p className="tagline">{translations[language].tagline}</p>

				{/* Add ingredient form */}
				<form className="ingredient-form" action={addIngredient}>
					<input
						name="ingredient"
						type="text"
						aria-label="Add ingredient"
						placeholder={translations[language].placeholder}
					/>
					<button>{translations[language].addButton}</button>
				</form>

				{/* Show ingredients list */}
				{ingredients.length > 0 ? (
					<IngredientsList
						ingredients={ingredients}
						getRecipe={getRecipe}
						recipeRef={recipeView}
						language={language}
					/>
				) : null}

				{/* Show recipe section */}
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
