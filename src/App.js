import runner from './public/img/runner.gif';
import stay from './public/img/stay.png';
import floor from './public/img/floor.png';
import ballon from './public/img/ballon.png';
import ball from './public/img/ball.gif';
import dead from './public/img/dead.gif';
import clouds1 from './public/img/clouds/1.png';
import clouds2 from './public/img/clouds/2.png';
import clouds3 from './public/img/clouds/3.png';
import clouds4 from './public/img/clouds/4.png';
import clouds5 from './public/img/clouds/5.png';
import clouds6 from './public/img/clouds/6.png';
import clouds7 from './public/img/clouds/7.png';
import clouds8 from './public/img/clouds/8.png';
import clouds9 from './public/img/clouds/9.png';
import clouds10 from './public/img/clouds/10.png';
import { useEffect, useState } from 'react';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const handleJump = () => {
    if(gameStarted) {
      const runnerPerson = document.querySelector('.runner');
      if (!runnerPerson.classList.contains('jump')) {
        runnerPerson.classList.add('jump');

        setTimeout(() => {
          runnerPerson.classList.remove('jump');
        }, 1000);
      }
    } else {
      setGameStarted(true);
    }
  };

  useEffect(() => {
    const runnerPerson = document.querySelector('.runner');
    const ball = document.querySelector('.ball');
    const floor = document.querySelector('.floor');
    const clouds1 = document.querySelector('.clouds-container1');
    const clouds2 = document.querySelector('.clouds-container2');
    const floorPosition = window.getComputedStyle(floor).transform;
    const clouds1Position = window.getComputedStyle(clouds1).transform;
    const clouds2Position = window.getComputedStyle(clouds2).transform;

    if(gameStarted) {
      runnerPerson.src = runner;
      runnerPerson.style.left = '50px';
      ball.classList.add('ball-animation');
      floor.classList.add('floor-animation');
      clouds1.classList.add('clouds-animation1');
      clouds2.classList.add('clouds-animation2');
    } else {
      runnerPerson.classList.remove('jump');
      ball.classList.remove('ball-animation')
      floor.classList.remove('floor-animation');
      clouds1.classList.remove('clouds-animation1');
      clouds2.classList.remove('clouds-animation2');
      floor.style.transform = floorPosition;
      clouds1.style.transform = clouds1Position;
      clouds2.style.transform = clouds2Position;
    }
  }, [gameStarted]);

  document.addEventListener('keyup', () => {
    handleJump();
  });

  const check = setInterval(() => {
    const ball = document.querySelector('.ball');
    const ballTop = ball.offsetTop;
    const ballLeft = ball.offsetLeft;

    const runnerPerson = document.querySelector('.runner');
    const runnerPersonBottom = runnerPerson.offsetTop + runnerPerson.offsetHeight;
    const runnerPersonRight = runnerPerson.offsetLeft + runnerPerson.offsetWidth;

    if(runnerPersonBottom >= ballTop && runnerPersonRight >= ballLeft) {
      runnerPerson.src = dead;
      runnerPerson.style.left = '90px';
      setGameStarted(false);
      clearInterval(check);
    }
  }, 10);

  return (
    <section className="game-container">
      <div className="sky">
        <div className='clouds-container1'>
          <img className='clouds clouds1' src={clouds1} alt="nuvem" />
          <img className='clouds clouds2' src={clouds2} alt="nuvem" />
          <img className='clouds clouds3' src={clouds3} alt="nuvem" />
          <img className='clouds clouds4' src={clouds4} alt="nuvem" />
          <img className='clouds clouds5' src={clouds5} alt="nuvem" />
        </div>
        <div className='clouds-container2'>
          <img className='clouds clouds6' src={clouds6} alt="nuvem" />
          <img className='clouds clouds7' src={clouds7} alt="nuvem" />
          <img className='clouds clouds8' src={clouds8} alt="nuvem" />
          <img className='clouds clouds9' src={clouds9} alt="nuvem" />
          <img className='clouds clouds10' src={clouds10} alt="nuvem" />
        </div>
      </div>
      <img src={floor} alt="floor" className='floor' />
      <img className='runner' src={stay} alt="Runner" />
      {!gameStarted && <img className='ballon' src={ballon} alt="Balão de conversa" />}
      <img className='ball' src={ball} alt="Ball" />
    </section>
  );
}

export default App;