import React from 'react';
import { useNavigate } from 'react-router-dom';
import s from './style.module.css';
function Controler({ controler, setControler, rotateValue }) {
    const navigate = useNavigate();

    const restart = () => {
        const result = confirm('Обновить таймер?');
        if (!result) return;
        setControler('restart');
    };

    const exitFromGame = () => {
        const result = confirm('Выйти из таймера?');
        if (!result) return;
        navigate('/');
    };
    return (
        <div style={{ rotate: rotateValue }} className={s.wrapperControler}>
            <img
                className={controler === 'pause' ? s.activeControler : ''}
                onClick={() => setControler('pause')}
                width={40}
                height={40}
                src='../assets/pause.png'
                alt='pause'
            />
            <img
                className={controler === 'play' ? s.activeControler : ''}
                onClick={() => setControler('play')}
                width={40}
                height={40}
                src='../assets/play.png'
                alt='play'
            />
            <img onClick={restart} width={40} height={40} src='../assets/restart.png' alt='restart' />
            <img onClick={exitFromGame} width={40} height={40} src='../assets/exit.png' alt='exit' />
        </div>
    );
}

export default Controler;
