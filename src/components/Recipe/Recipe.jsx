import "./Recipe.css";
import ReactMarkdown from 'react-markdown';

export function Recipe({ recipe, isLoading }) {
	return (
		<section>
			<article className="suggested-recipe-container" aria-live="polite">
				{isLoading ? (
					<p className="loading">Loading Recipe....👨‍🍳</p>
				) : (
					<ReactMarkdown>{recipe}</ReactMarkdown>
				)}
			</article>
		</section>
	);
}
