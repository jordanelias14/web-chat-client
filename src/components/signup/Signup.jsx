import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Input from '../input/Input';
import Button from '../button/Button';
import Notification from '../notification/Notification';
import {MailOutlined, UserOutlined, UnlockOutlined, LoginOutlined} from '@ant-design/icons';
import './Signup.scss';

const Signup = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [emailConfig, setEmailConfig] = useState('');
	const [senha, setSenha] = useState('');
	const [error, setError] = useState('');

	const navigate = useNavigate();
	const {signup} = useAuth();
	const mainParagraphSignup = 'Não possui *uma conta?'
    const [start, end] = mainParagraphSignup.split('*');

	const handleSignup = () => {
		if(!name || !email || !senha || !emailConfig) {
			setError('Preencha todos os campos');
			return;
		} else if (email !== emailConfig) {
			setError('Os emails não são iguais');
			return;
		}

		const res = signup(name, email, senha);

		if (res) {
			setError(res);
			return;
		}
			Notification('success', 'Usuário cadastrado');
			navigate('/home');
	};

	return (
		<section className="signup-session">
			<p className='main-paragraph-signup'>
				{start}
			<span>&nbsp;{end}</span>
			</p>
			<div className="content">
				<div className='name-form'>
					<UserOutlined style={{color: '#ffffff', backgroundColor: '#15161b', borderRadius: '50%', padding: '5px', width: '60px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center'}} />
					<Input
						className='input-signup'
						type='text'
						placeholder='Digite seu nome'
						value={name}
						onChange={(e)=> [setName(e.target.value), setError('')]}
					/>
				</div>
				<div className='email-form'>
					<MailOutlined style={{color: '#ffffff', backgroundColor: '#15161b', borderRadius: '50%', padding: '5px', width: '60px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center'}} />
					<Input
						className='input-signup'
						type='email'
						placeholder='Digite seu email'
						value={email}
						onChange={(e) => [setEmail(e.target.value), setError('')]}
					/>
				</div>
				<div className='email-form'>
					<UserOutlined style={{color: '#ffffff', backgroundColor: '#15161b', borderRadius: '50%', padding: '5px', width: '60px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center'}} />
					<Input
						className='input-signup'
						type='email'
						placeholder='Confirme seu email'
						value={emailConfig}
						onChange={(e) => [setEmailConfig(e.target.value), setError('')]}
					/>
				</div>
				<div className='pass-form'>
					<UnlockOutlined style={{color: '#ffffff', backgroundColor: '#15161b', borderRadius: '50%', padding: '5px', width: '60px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center'}} />
					<Input
						className='input-signup'
						type='password'
						placeholder='Digite sua senha'
						value={senha}
						onChange={(e)=> [setSenha(e.target.value), setError('')]}
					/>
				</div>
					<div className='label-error-signup'>{error}</div>
				<div className='enter-form'>
					<LoginOutlined style={{color: '#ffffff', backgroundColor: '#15161b', borderRadius: '50%', padding: '5px', width: '60px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center'}} />
					<Button
						Text='Cadastrar'
						onClick={handleSignup}
					/>
				</div>
			</div>
		</section>
	);
};

export default Signup;