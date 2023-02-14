import { useStore } from '@nanostores/react';
import { textStore } from './store';

const CopyBtn = () => {
	const { fixedText } = useStore(textStore);

	const handleClipboard = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		e.preventDefault();
		navigator.clipboard.writeText(fixedText);
	};

	return (
		<button
			onClick={handleClipboard}
			className={`flex justify-center items-center absolute -bottom-5 right-0 left-0 mx-auto my-0 w-16 h-16 rounded-2xl border bg-white shadow-2xl hover:shadow-xl hover:border-[#f4f3f7] hover:bg-[#f4f3f7] ${
				fixedText ? 'opacity-100' : 'opacity-0'
			}`}
		>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='35'
				height='35'
				viewBox='0 0 24 24'
				strokeWidth='1.5'
				stroke='#b2b9c9'
				fill='none'
				strokeLinecap='round'
				strokeLinejoin='round'
			>
				<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
				<rect x='8' y='8' width='12' height='12' rx='2'></rect>
				<path d='M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2'></path>
			</svg>
		</button>
	);
};

export default CopyBtn;
