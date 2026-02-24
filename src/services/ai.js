import Groq from "groq-sdk";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has
and suggests a recipe they could make with some or all of those ingredients.
You don't need to use every ingredient they mention in your recipe.
The recipe can include additional ingredients they didn't mention,
but try not to include too many extra ingredients.
Format your response in markdown to make it easier to render to a web page.
Begin the response with a bolded title, "Chef Claude Recommends: Recipe Name(italic)`;

const groq = new Groq({
	apiKey: import.meta.env.VITE_GROQ_API_KEY,
	dangerouslyAllowBrowser: true,
});

export async function getRecipesFromChefClaude(ingredientsArr) {
	const ingredientsStr = ingredientsArr.join(", ");
	try {
		const completion = await groq.chat.completions.create({
			messages: [
				{
					role: "system",
					content: SYSTEM_PROMPT,
				},
				{
					role: "user",
					content: `I have ${ingredientsStr}. Please give me a recipe you'd recommend I make!`,
				},
			],
			model: "llama-3.3-70b-versatile",
			temperature: 0.7,
			max_tokens: 1024,
		});
		return (
			completion.choices[0]?.message?.content ||
			"No recipe available for provided ingredients"
		);
	} catch (error) {
		console.error("AI error: ", error.message);
		return "Chef Claude is temporarily unavailable. Please try again later!";
	}
}
