import {notification} from 'antd';

import './Notification.scss';

export default (type, message) => {  
    notification[type]({
        message,
        className: type,
    });
};
