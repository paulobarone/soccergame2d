import runner from './public/img/runner.gif';
import floor from './public/img/floor.png';
import ball from './public/img/ball.gif';
import dead from './public/img/dead.gif';
import clouds1 from './public/img/clouds/1.png';
import clouds2 from './public/img/clouds/2.png';
import clouds3 from './public/img/clouds/3.png';
import clouds4 from './public/img/clouds/4.png';

function App() {
  
  const handleJump = (event) => {
    if(event.code === 'Space' && !document.querySelector('.runner').classList.contains('jump')) {
      const runnerPerson = document.querySelector('.runner');
  
      setTimeout(() => {
        runnerPerson.classList.remove('jump');
      }, 1000);
  
      runnerPerson.classList.add('jump')
    }
  }

  const check = setInterval(() => {
    const ball = document.querySelector('.ball');
    const runnerPerson = document.querySelector('.runner');

    const runnerPersonBottom = runnerPerson.offsetTop + runnerPerson.offsetHeight;
    const ballTop = ball.offsetTop;

    const runnerPersonRight = runnerPerson.offsetLeft + runnerPerson.offsetWidth;
    const ballLeft = ball.offsetLeft;

    if(runnerPersonBottom >= ballTop && runnerPersonRight >= ballLeft) {
      const floor = document.querySelector('.floor');
      const runnerDead = document.querySelector('.runner-dead');
      const floorPosition = window.getComputedStyle(floor).transform;
      
      ball.style.animation = 'none';
      ball.style.display = 'none';

      runnerPerson.style.display = 'none';
      runnerPerson.style.animation = 'none';

      runnerDead.style.display = 'block';

      floor.style.transform = floorPosition;
      floor.style.animation = 'none';

      clearInterval(check)
    }
  }, 10);


  document.addEventListener('keypress', handleJump);

  return (
    <section className="game-container">
      <div className="sky"></div>
      <img src={floor} alt="floor" className='floor' />
      <img className='runner' src={runner} alt="Runner" />
      <img className='runner-dead' src={dead} alt="Runner Dead" />
      <img className='ball' src={ball} alt="Ball" />
      <img className='clouds clouds1' src={clouds1} alt="clouds" />
      <img className='clouds clouds2' src={clouds2} alt="clouds" />
      <img className='clouds clouds3' src={clouds3} alt="clouds" />
      <img className='clouds clouds4' src={clouds4} alt="clouds" />
    </section>
  );
}

export default App;