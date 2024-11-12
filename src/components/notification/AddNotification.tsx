import React from 'react';
import './AddNotification.css'; // Create a CSS file for styling

interface NotificationProps {
    message: string;
}

const AddNotification: React.FC<NotificationProps> = ({ message}) => {
    return (
        <div className="notification">
            <p>{message}</p>
        </div>
    );
};

export default AddNotification;