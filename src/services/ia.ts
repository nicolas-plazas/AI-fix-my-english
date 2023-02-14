const apiUrl = import.meta.env.PUBLIC_COHERE_API_GENERATE_URL;
const apiKey = import.meta.env.PUBLIC_COHERE_API_KEY;
const detectLanguageUrl = import.meta.env.PUBLIC_COHERE_API_DETECT_LANGUAGE_URL;

export async function detectLanguage(input: string): Promise<boolean> {
	const data = {
		texts: [input],
	};

	const apiData = await fetch(detectLanguageUrl, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			Authorization: `BEARER ${apiKey}`,
			'Content-Type': 'application/json',
			CohereVersion: '2022-12-06',
		},
		body: JSON.stringify(data),
	});

	const { results } = await apiData.json();
	const [{ language_code }] = results;

	return language_code === 'en';
}

export async function fixMyEnglish(input: string): Promise<string> {
	const data = {
		model: 'xlarge',
		prompt: `
			This is a spell checker generator. It will correct your English grammar and spelling mistakes.
            --
            Incorrect sample: "I are good!"
            Correct sample: "I am good!"
            --
            Incorrect sample: "I have 22 years old."
            Correct sample: "I am 22 years old."
            --
            Incorrect sample: "I don't can know"
            Correct sample: "I don't know"
			--
            Incorrect sample: "${input}"
            Correct sample:`,
		max_tokens: 40, // The maximum number of tokens to generate.
		temperature: 0.3, // Is the randomness of the model. The higher the temperature, the more random the text.
		k: 0, // The number of beams to use. The higher the number of beams, the more diverse the results.
		p: 1,
		frequency_penalty: 0,
		presence_penalty: 0,
		stop_sequences: ['--'],
		return_likelihoods: 'NONE',
	};

	const response = await fetch(apiUrl, {
		method: 'POST',
		headers: {
			Authorization: `BEARER ${apiKey}`,
			'Content-Type': 'application/json',
			CohereVersion: '2022-12-06',
		},
		body: JSON.stringify(data),
	}).then((res) => res.json());

	const { text } = response;
	// console.log(text);

	return text.replace('--', '').replaceAll('"', '').trim();
}
