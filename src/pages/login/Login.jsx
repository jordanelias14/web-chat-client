import Signin from '../../components/signin/Signin';
import Signup from '../../components/signup/Signup';
import './Login.scss';

const Login = () => {

	return (
		<div className='login-container'>
			<Signin/>
			<Signup/>    
		</div>
	)
}

export default Login;