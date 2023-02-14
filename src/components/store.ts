import { atom } from 'nanostores';

export const textStore = atom({
	fixIsLoading: false,
	detectIsLoading: false,
	text: '',
	fixedText: '',
	isValid: false,
});
