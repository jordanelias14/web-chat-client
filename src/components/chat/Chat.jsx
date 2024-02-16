import { useEffect, useRef, useState } from 'react';
import {SendOutlined, CloseCircleOutlined} from '@ant-design/icons';
import Input from '../input/Input';
import './Chat.scss';

const Chat = ({socket, setBoxChat}) => {

    const [msgList, setMsgList] = useState([]);
    const [msg, setMsg] = useState('');
    const messageRef = useRef();
    const bottomRef = useRef();

    useEffect(() => {
        socket.on('receive_msg', data => {
            setMsgList((current) => [...current, data]);
        });

        return () => socket.off('receive_msg');
    }, [socket]);

    useEffect(() => {
        scrollDown();
    }, [msgList]);

    const handleSubmit = (msg = false) => {
        const message = msg ? msg : messageRef.current.value;
        if (!message.trim()) return;

        socket.emit('message', message);

        clearInput();
    };

    const clearInput = () => {
        if (messageRef.current) {
            messageRef.current.value = '';
        }
        setMsg('');
    };

    const scrollDown = () => {
        bottomRef.current.scrollIntoView({behavior: 'smooth'})
    };

    const enterKey = (e) => {
		if (e.key === 'Enter')
        handleSubmit(msg);
	};

    const onChangeMsg = ({target}) => {
        setMsg(target.value);
    };

    const closeChat = () => {
        setBoxChat(false);
    };

    return (
        <div className='chat-box'>
            <CloseCircleOutlined onClick={() => closeChat()} style={{color: '#FE7800', padding: '5px'}} />
            <div className='msg-chat'>
                {msgList.map((msg, index) => (
                    <div
                        key={index}
                        className={`msg-container ${msg.autorId === socket.id && 'msg-mine'}`}
                    >
                        <div className="msg-author"><strong>{msg.author}</strong></div>
                        <div className="msg-text">{msg.text}</div>    
                    </div>
                ))}
            <div ref={bottomRef} />
            </div>
            <div className='chat-interations'>
                <Input
                    className='input-chat'
                    type='text'
                    placeholder='Mensagem'
                    reff={messageRef}
                    value={msg}
                    onKeyDown={(e) => enterKey(e)}
                    onChange={onChangeMsg}
                />
                <SendOutlined
                    style={{color: '#FE7800', padding: '5px'}}
                    onClick={() => handleSubmit(msg)}
                />
            </div>
        </div>
    )
}

export default Chat;