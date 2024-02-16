import { useState } from 'react';
import { io } from 'socket.io-client';
import Chat from '../../components/chat/Chat';
import Header from '../../components/header/Header';
import Button from '../../components/button/Button';
import './Home.scss';
import IconSvg from '../../utils/svg';

const Home = () => {
	const [boxChat, setBoxChat] = useState(false);
	const [socket, setSocket] = useState(null);

	const getUserToken = localStorage.getItem('user_token');
	const userName = JSON.parse(getUserToken).name;
	
	const handleNewChat = async () => {
		const socketConnect = await io.connect('http://localhost:3001');
		socketConnect.emit('set_userName', userName);
		setSocket(socketConnect);
		setBoxChat(true);
	};

	return (
		<div className='container-home'>
			<Header name={userName} />
			{!boxChat &&
				<div className='home-new-chat'>
					<IconSvg name="chat" classDiv="chat" width={260} height={260} />
					<Button className='new-chat' Text='Novo chat' onClick={handleNewChat}/>
				</div>
			}
			
			{boxChat && <Chat socket={socket} setBoxChat={setBoxChat}/>}
		</div>
	)
}

export default Home;