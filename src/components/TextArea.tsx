import { useCallback, useEffect, ChangeEvent } from 'react';
import { useStore } from '@nanostores/react';
import { textStore } from './store';
import debounce from 'just-debounce-it';
import { detectLanguage } from '../services/ia';

interface TextAreaProps {
	id: string;
	placeholder: string;
	rows?: number;
	required?: boolean;
	isReadOnly?: boolean;
}

const TextArea = (props: TextAreaProps) => {
	const {
		id,
		placeholder,
		rows = 10,
		required = false,
		isReadOnly = false,
	} = props;

	const { text } = useStore(textStore);
	const handleChange = useCallback(
		debounce((e: ChangeEvent<HTMLTextAreaElement>) => {
			textStore.set({
				...textStore.get(),
				text: e.target.value,
			});
		}, 1000),
		[],
	);

	useEffect(() => {
		if (text) {
			(async () => {
				textStore.set({
					...textStore.get(),
					detectIsLoading: true,
				})

				const isValidText = await detectLanguage(text);

				textStore.set({
					...textStore.get(),
					detectIsLoading: false,
					isValid: isValidText,
				});
			})();
		}
	}, [text]);

	return (
		<>
			<textarea
				id={id}
				name='text'
				placeholder={placeholder}
				rows={rows}
				required={required}
				readOnly={isReadOnly}
				className='w-full h-full p-3 md:p-6 border-2 md:border-3 lg:border-4 border-[#f4f3f7] rounded-2xl'
				onChange={!isReadOnly ? handleChange : () => {}}
			/>
		</>
	);
};

export default TextArea;
