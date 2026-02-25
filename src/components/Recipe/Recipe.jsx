import "./Recipe.css";
import ReactMarkdown from 'react-markdown';
import {translations} from "../../translations"

export function Recipe({ recipe, isLoading, language}) {
	return (
		<section>
			<article className="suggested-recipe-container" aria-live="polite">
				{isLoading ? (
					<p className="loading">{translations[language].loading}</p>
				) : (
					<ReactMarkdown>{recipe}</ReactMarkdown>
				)}
			</article>
		</section>
	);
}
