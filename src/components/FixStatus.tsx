import { useStore } from '@nanostores/react';
import { textStore } from './store';

const FixStatus = () => {
	const { isValid, detectIsLoading, text } = useStore(textStore);

	return (
		<div
			className={`flex items-center justify-center w-full h-6 py-5 my-3 rounded-xl ${
				detectIsLoading
					? 'animate-pulse bg-blue-500'
					: isValid
					? 'bg-green-500'
					: text
					? 'bg-red-500'
					: 'bg-gray-500'
			}`}
		>
			<p className='text-gray-50'>
				{detectIsLoading
					? 'Detecting...'
					: isValid
					? 'you can fix it'
					: text
					? 'You are not writing in English'
					: 'write something...'}
			</p>
		</div>
	);
};

export default FixStatus;
