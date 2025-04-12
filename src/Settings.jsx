import React from 'react';
import { useNavigate } from 'react-router-dom';
import s from './style.module.css';

function Settings() {
    const [inputValue, setInputValue] = React.useState('');
    const navigate = useNavigate();

    const getValue = (e) => {
        const value = e.target.value;
        if (value.length > 2) return;
        if (value === '') return setInputValue('');
        setInputValue(Number(value));
    };
    const handleStart = () => {
        localStorage.setItem('minutes', inputValue);
        navigate('/game');
    };
    return (
        <div className={s.wrapper}>
            <div className={s.wrapperSettings}>
				<h3>Chess cloak</h3>
                <input value={inputValue} onChange={getValue} type='number' placeholder='Минуты'/>

                <button type='button' className={s.btnStart} disabled={inputValue === '' || inputValue < 1} onClick={handleStart}>
                    Начать
                </button>
            </div>
        </div>
    );
}

export default Settings;
