import './Button.scss';

const Button = ({Text, className, onClick, Type = 'button'}) => {

    return (
        <button
			type={Type}
            onClick={onClick}
            className={`${className ? className : ''} btn-${Text}`}
        >
            {Text}
        </button>
    )
}

export default Button;