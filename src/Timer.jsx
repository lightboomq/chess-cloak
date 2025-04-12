import React from 'react';
import s from './style.module.css';
function Timer({ setActiveTimePlayer, isRunningPlayer, rotate, opponentTime, controler, setControler }) {
    const hour = 60;
    const localMinutes = Number(localStorage.getItem('minutes'));
    const initSeconds = localMinutes * hour;

    const [time, setTime] = React.useState(initSeconds);

    let initMinutes = String(Math.floor(initSeconds / hour));
    initMinutes = initMinutes.length === 1 ? `0${initMinutes}` : initMinutes;

    const [minutes, setMinutes] = React.useState(initMinutes);
    const [seconds, setSeconds] = React.useState('00');

    const [isTimeCritical, setIsTimeCritical] = React.useState(false);

    React.useEffect(() => {
        if (controler === 'restart') {
            setMinutes(initMinutes);
            setSeconds('00');
            setControler('play');
            return;
        }
    }, [controler, initMinutes, setControler]);

    React.useEffect(() => {
        let timerId;
        setActiveTimePlayer(`${minutes} : ${seconds}`);

        function tick() {
            const mins = Math.floor(time / hour);
            const secs = time % hour;

            if (time < 0) {
                const soundGameOver = new Audio('../sounds/gameOver.mp3');
                soundGameOver.play();
                clearInterval(timerId);
                return;
            }
            if (mins < 1 && !isTimeCritical) {
                const soundCriticalTime = new Audio('../sounds/critical-time.mp3');
                soundCriticalTime.play();
                setIsTimeCritical(true);
            }
            setMinutes(mins < 10 ? `0${mins}` : `${mins}`);
            setSeconds(secs < 10 ? `0${secs}` : `${secs}`);
            setTime(time - 1);
        }

        if (controler === 'play') {
            if (isRunningPlayer) {
                timerId = setInterval(tick, 1000);
            }
        }

        return () => clearInterval(timerId);
    }, [time, isRunningPlayer, minutes, seconds, setActiveTimePlayer, isTimeCritical, controler]);

    const highlightЕTimer = () => {
        if (isTimeCritical) return `${s.timer} ${s.criticalTime}`;
        if (isRunningPlayer) return `${s.timer} ${s.timerActive}`;
        return s.timer;
    };

    const highlightOpponentTimer = () => {
        if (!isRunningPlayer) return `${s.opponentTimer} ${s.opponentTimerActive}`;
        return s.opponentTimer;
    };
    return (
        <div className={s.wrapperPlayer}>
            <div className={rotate ? s.rotate : s.notRotate}>
                <h1 className={highlightЕTimer(isRunningPlayer, isTimeCritical)}>{`${minutes}:${seconds}`}</h1>
                <h2 className={highlightOpponentTimer(isRunningPlayer)}>{opponentTime}</h2>
            </div>
        </div>
    );
}

export default Timer;
