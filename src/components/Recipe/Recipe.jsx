import "./Recipe.css";
import ReactMarkdown from "react-markdown";
import { translations } from "../../translations";

export function Recipe({ recipe, isLoading, language, reset }) {
	return (
		<section>
			<article className="suggested-recipe-container" aria-live="polite">
				{isLoading ? (
					<p className="loading">{translations[language].loading}</p>
				) : (
					<>
						<ReactMarkdown>{recipe}</ReactMarkdown>
						{/* Start Over button >> to reset eveything */}
						<button className="reset-btn" onClick={reset}>
							{translations[language].resetButton}
						</button>
					</>
				)}
			</article>
		</section>
	);
}
