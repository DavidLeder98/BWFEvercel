import React from 'react';
import './Button.css';

interface ButtonProps {
    text: string;
    onClick?: () => void;
    variant?: 'filled' | 'outlined'; // Variant for different button styles
    color?: 'red' | 'gray' | 'blue' | 'green'  | 'black'; // Add color options
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, variant = 'filled', color = 'blue', disabled = false }) => {
    return (
        <button
            className={`button ${variant} ${color}`}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default Button;