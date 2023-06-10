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
import { useEffect, useState } from 'react';

function App() {
  const [ game, setGame ] = useState(false);
  
  const handleJump = () => {
    console.log(`handleJump: ${game}`);
    if(game) {
      const runnerPerson = document.querySelector('.runner');
      if(!runnerPerson.classList.contains('jump')) {
        runnerPerson.classList.add('jump')
    
        setTimeout(() => {
          runnerPerson.classList.remove('jump');
        }, 1000);
      }
    } else {
      startGame()
    }
  }

  useEffect(() => {
    console.log(`useEffect: ${game}`)
  }, [game])

  const check = setInterval(() => {
    const ball = document.querySelector('.ball');
    const ballTop = ball.offsetTop;
    const ballLeft = ball.offsetLeft;

    const runnerPerson = document.querySelector('.runner');
    const runnerPersonBottom = runnerPerson.offsetTop + runnerPerson.offsetHeight;
    const runnerPersonRight = runnerPerson.offsetLeft + runnerPerson.offsetWidth;

    if(runnerPersonBottom >= ballTop && runnerPersonRight >= ballLeft) {
      gameOver();
      clearInterval(check)
    }
  }, 10);

  document.addEventListener('keyup', handleJump)

  const gameOver = () => {
    setGame(false);

    const runnerPerson = document.querySelector('.runner');
    const ball = document.querySelector('.ball');
    const floor = document.querySelector('.floor');
    const floorPosition = window.getComputedStyle(floor).transform;

    runnerPerson.src = dead;
    runnerPerson.classList.remove('jump');
    floor.classList.remove('floor-animation');
    floor.style.transform = floorPosition;
    ball.classList.remove('ball-animation');
  }

  const startGame = () => {
    const runnerPerson = document.querySelector('.runner');
    const ball = document.querySelector('.ball');
    const floor = document.querySelector('.floor');
    
    runnerPerson.src = runner;
    ball.classList.add('ball-animation');
    floor.classList.add('floor-animation');

    return setGame(true);
  }

  return (
    <section className="game-container">
      <div className="sky"></div>
      <img src={floor} alt="floor" className='floor' />
      <img className='runner' src={stay} alt="Runner" />
      {!game && <img className='ballon' src={ballon} alt="Balão de conversa" />}
      <img className='ball' src={ball} alt="Ball" />
      <img className='clouds clouds1' src={clouds1} alt="clouds" />
      <img className='clouds clouds2' src={clouds2} alt="clouds" />
      <img className='clouds clouds3' src={clouds3} alt="clouds" />
      <img className='clouds clouds4' src={clouds4} alt="clouds" />
    </section>
  );
}

export default App;