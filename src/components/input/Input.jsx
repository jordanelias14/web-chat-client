import './Input.scss';

const Input = ({type, reff, onKeyDown, placeholder, value, onChange, className}) => {

	return (
		<input 
			type= {type}
			placeholder={placeholder}
			value={value}
			ref={reff}
			onChange={onChange}
			className={className}
			onKeyDown={onKeyDown}
		/>
	);
};

export default Input;