import IconSvg from '../../utils/svg';
import {LogoutOutlined} from '@ant-design/icons'
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import './Header.scss';

const Header = ({name}) => {
	
	const {signout} = useAuth();
	const navigate = useNavigate();
	const mainParagraph = 'Web *Chat';
	const [start, end] = mainParagraph.split('*');

	return (
		<header className='customize-header'>
			<IconSvg name="typing" classDiv="chat" width={60} height={60} />
			<label>{start}</label>
			<span>&nbsp;{end}</span>
			{
				name &&
				<div className='name-header'>
					<div className='right-header'>
						<p>{name}</p>
						<LogoutOutlined onClick={() => [signout(), navigate('')]} style={{color: '#FE7800', padding: '5px'}}/>
					</div>
				</div>
			}
		</header>
	)
}

export default Header;