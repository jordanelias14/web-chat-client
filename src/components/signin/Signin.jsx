import { useState } from 'react'
import Input from '../input/Input';
import Button from '../button/Button';
import { useNavigate } from 'react-router-dom';
import {MailOutlined, UnlockOutlined, LoginOutlined} from '@ant-design/icons';
import useAuth from '../../hooks/useAuth';
import Header from '../header/Header';
import './Signin.scss';
import Notification from '../notification/Notification';

const Signin = () => {
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');
	const [error, setError] = useState('');
	const mainParagraph = 'Para iniciar o chat, *entre ou registre-se* no nosso sitema';
    const [start, hightlight, end] = mainParagraph.split('*');

	const navigate = useNavigate();
	const {signin} = useAuth();

	const handleLogin = () => {
		if(!email || !senha) {
			setError('Preencha todos os campos');
			return;
		}

		const res = signin(email, senha);

		if (res) {
			setError(res);
			return;
		}
		const getUserToken = localStorage.getItem('user_token');
		const userName = JSON.parse(getUserToken).name;

		Notification('success', `Bem vindo ${userName}`);
		navigate('/home');
	};

	return (
		<section className='signin-session'>
			<Header />
			<p className='main-paragraph'>
				{start}
				<span>{hightlight}</span>
				{end}
			</p>
			<div className='signin-content'>
				<div className='form-content'>
					<div className='email-form'>
						<MailOutlined style={{color: '#ffffff', backgroundColor: '#fe7800', borderRadius: '50%', padding: '5px', width: '60px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center'}} />
						<Input
							className='input-signin'
							type='email'
							placeholder='Digite seu email'
							value={email}
							onChange={(e)=> [setEmail(e.target.value), setError('')]}
						/>
					</div>
					<div className='pass-form'>
						<UnlockOutlined style={{color: '#ffffff', backgroundColor: '#fe7800', borderRadius: '50%', padding: '5px', width: '60px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center'}} />
						<Input
							className='input-signin'
							type='password'
							placeholder='Digite sua senha'
							value={senha}
							onChange={(e)=> [setSenha(e.target.value), setError('')]}
						/>
					</div>
					<div className='label-error'>{error}</div>
					<div className='enter-form'>
						<LoginOutlined style={{color: '#ffffff', backgroundColor: '#fe7800', borderRadius: '50%', padding: '5px', width: '60px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center'}} />
						<Button
							Text='Entrar'
							Type='submit'
							onClick={handleLogin}
						/>
					</div>
				</div>
			</div>

		</section>
	)
}

export default Signin;