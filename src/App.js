import runnerPedro from './public/img/runnerPedro.gif';
import stayPedro from './public/img/stayPedro.gif';
import deadPedro from './public/img/deadPedro.gif';
import runnerKadu from './public/img/runnerKadu.gif';
import stayKadu from './public/img/stayKadu.png';
import deadKadu from './public/img/deadKadu.gif';
import floor from './public/img/floor.png';
import startButton from './public/img/start.gif';
import ball from './public/img/ball.gif';
import submitButton from './public/img/submit.png';
import configImg from './public/img/config.png';
import heart from './public/img/heart.png';
import heartBroken from './public/img/heart-broken.png';
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
import { useEffect, useRef, useState } from 'react';

function App() {
  const [ jumpAnimation, setJumpAnimation] = useState(false);
  const [ gameStarted, setGameStarted ] = useState(false);
  const [ collision, setCollision ] = useState(false);
  const [ score, setScore ] = useState(0);
  const [ lifes, setLifes ] = useState(5);
  const [ selectedDifficulty, setSelectedDifficulty ] = useState(2);
  const [ selectedCharacter, setSelectedCharacter ] = useState(1);
  const [ popupConfig, setPopupConfig ] = useState(false);
  const [ isTakingDamage, setIsTakingDamage ] = useState(false);
  const [ tutorialJump, setTutorialJump ] = useState(true);

  const ballRef = useRef(null);
  const floorRef = useRef(null);
  const runnerRef = useRef(null);
  const clouds1Ref = useRef(null);
  const clouds2Ref = useRef(null);

  useEffect(() => {
    console.log(gameStarted)
    if(gameStarted) {
      handleAnimations(true);
      setJumpAnimation(false);

      if(selectedDifficulty === 1) {
        setLifes(5);
      } else if (selectedDifficulty === 2) {
        setLifes(3);
      } else if (selectedDifficulty === 3) {
        setLifes(1);
      }

      setScore(0);
      const interval = setInterval(updateScore, 10);
      return () => clearInterval(interval);
    } else {
      setCollision(false);
      handleAnimations(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStarted]);

  const handleDifficulty = (element) => {
    if(selectedDifficulty === 1) {
      element.style.animationDuration = '2s';
    } else if(selectedDifficulty === 2) {
      element.style.animationDuration = '1.5s';
    } else if(selectedDifficulty === 3) {
      element.style.animationDuration = '1.25s';
    }
  }
  
  const handleAnimations = (event) => {
    const ball = ballRef.current;
    const floor = floorRef.current;
    const clouds1 = clouds1Ref.current;
    const clouds2 = clouds2Ref.current;
    const runnerCharacter = runnerRef.current;
    const floorPosition = window.getComputedStyle(floor).transform;
    const clouds1Position = window.getComputedStyle(clouds1).transform;
    const clouds2Position = window.getComputedStyle(clouds2).transform;

    if(event) {
      runnerCharacter.src = selectedCharacter === 1 ? runnerKadu : runnerPedro;
      runnerCharacter.style.left = '80px';
      runnerCharacter.style.width = '150px';

      ball.classList.add('ball-animation');
      handleDifficulty(ball);

      floor.classList.add('floor-animation');
      clouds1.classList.add('clouds-animation1');
      clouds2.classList.add('clouds-animation2');
    } else {
      runnerCharacter.classList.remove('jump');
      ball.classList.remove('ball-animation');
      floor.classList.remove('floor-animation');
      clouds1.classList.remove('clouds-animation1');
      clouds2.classList.remove('clouds-animation2');
      floor.style.transform = floorPosition;
      clouds1.style.transform = clouds1Position;
      clouds2.style.transform = clouds2Position;
    }
  }

  useEffect(() => {
    const runnerCharacter = runnerRef.current;
    if(jumpAnimation) {
      runnerCharacter.addEventListener('animationend', () => {
        runnerCharacter.classList.remove('jump');
        setJumpAnimation(false);
      })
    }
  }, [jumpAnimation])

  useEffect(() => {
    const ball = ballRef.current;
    const runnerCharacter = runnerRef.current;
    const ballTop = ball.offsetTop;
    const ballLeft = ball.offsetLeft;

    const runnerCharacterBottom = runnerCharacter.offsetTop + runnerCharacter.offsetHeight;
    const runnerCharacterRight = runnerCharacter.offsetLeft + runnerCharacter.offsetWidth;

    if(runnerCharacterBottom >= ballTop && runnerCharacterRight >= ballLeft) {
      setCollision(true);
    }
  }, [score]);

  useEffect(() => {
    const runnerCharacter = runnerRef.current;
    if(isTakingDamage) {
      runnerCharacter.style.opacity = '0.75';
      const blinkTimer = setTimeout(() => {
        setIsTakingDamage(false);
        runnerCharacter.style.opacity = '1';
      }, 250);

      return () => clearTimeout(blinkTimer);
    }
  }, [isTakingDamage]);

  useEffect(() => {
    const runnerCharacter = runnerRef.current;
    if(collision) {
      if(lifes >= 2) {
        setLifes((prevLifes) => prevLifes - 1);
        setIsTakingDamage(true);

        setTimeout(() => {
          setCollision(false);
        }, 500);
      } else {
        setLifes(0);
        runnerCharacter.src = selectedCharacter === 1 ? deadKadu : deadPedro;
        runnerCharacter.style.left = '120px';
        runnerCharacter.style.width = '110px';
        setGameStarted(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collision]);

  useEffect(() => {
    const handleJump = (event) => {
      const runnerCharacter = runnerRef.current;
      if (gameStarted && !jumpAnimation && event.code === 'Space') {
        tutorialJump && setTutorialJump(false);
        runnerCharacter.classList.add('jump');
        setJumpAnimation(true);
      }
    };

    document.addEventListener('keydown', handleJump);

    return () => {
      document.removeEventListener('keydown', handleJump);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStarted, jumpAnimation]);

  const updateScore = () => {
    setScore((prevScore) => prevScore + 1);
  }

  return (
    <section className="game-container">
      {!gameStarted && popupConfig && 
      <form className='form-options'>
        <div className='type-container'>
          <span>Dificuldade:</span>
          <div className='values-container'>
            <div className='radio-container'>
              <label htmlFor='easy' className={`label ${selectedDifficulty === 1 ? 'selected' : ''}`}>Fácil</label>
              <input type='radio' name='difficulty' id="easy" onChange={() => setSelectedDifficulty(1)} />
            </div>
            <div className='radio-container'>
              <label htmlFor='normal' className={`label ${selectedDifficulty === 2 ? 'selected' : ''}`}>Normal</label>
              <input type='radio' name='difficulty' id="normal" onChange={() => setSelectedDifficulty(2)} />
            </div>
            <div className='radio-container'>
              <label htmlFor='hard' className={`label ${selectedDifficulty === 3 ? 'selected' : ''}`}>Hard</label>
              <input type='radio' name='difficulty' id="hard" onChange={() => setSelectedDifficulty(3)} />
            </div>
          </div>
        </div>
        <div className='type-container'>
          <span>Personagem:</span>
          <div className='values-container'>
            <div className='character-container'>
              <label htmlFor='kadu' className={`label ${selectedCharacter === 1 ? 'selected' : ''}`}>Kadu</label>
              <label htmlFor='kadu' className='label'>
                <img src={runnerKadu} alt="Runner Kadu" className={`runnerSelected ${selectedCharacter === 1 ? 'selected-character' : ''}`} />
              </label>
              <input type='radio' name='character' id="kadu" onChange={() => setSelectedCharacter(1)} />
            </div>
            <div className='character-container'>
              <label htmlFor='pedro' className={`label ${selectedCharacter === 2 ? 'selected' : ''}`}>Pedro</label>
              <label htmlFor='pedro' className='label'>
                <img src={runnerPedro} alt="Runner Kadu" className={`runnerSelected ${selectedCharacter === 2 ? 'selected-character' : ''}`} />
              </label>
              <input type='radio' name='character' id="pedro" onChange={() => setSelectedCharacter(2)} />
            </div>
          </div>
        </div>
        <img src={submitButton} alt="Enviar" className='submit-button' onClick={() => setPopupConfig(false)} />
      </form>}
      <div className="sky">
        <div className='clouds-container1' ref={clouds1Ref}>
          <img className='clouds clouds1' src={clouds1} alt="nuvem" />
          <img className='clouds clouds2' src={clouds2} alt="nuvem" />
          <img className='clouds clouds3' src={clouds3} alt="nuvem" />
          <img className='clouds clouds4' src={clouds4} alt="nuvem" />
          <img className='clouds clouds5' src={clouds5} alt="nuvem" />
        </div>
        <div className='clouds-container2' ref={clouds2Ref}>
          <img className='clouds clouds6' src={clouds6} alt="nuvem" />
          <img className='clouds clouds7' src={clouds7} alt="nuvem" />
          <img className='clouds clouds8' src={clouds8} alt="nuvem" />
          <img className='clouds clouds9' src={clouds9} alt="nuvem" />
          <img className='clouds clouds10' src={clouds10} alt="nuvem" />
        </div>
      </div>
      <div className='container'>
        {!gameStarted && <img src={configImg} onClick={() => setPopupConfig((prevPopup) => !prevPopup)} alt='Configurações' className='config' />}
        <span className='score'>Score: {score}</span>
      </div>
      <div className='heart-container'>
        <img src={lifes >= 1 ? heart : heartBroken} alt="Coração" className='heart' />
        {selectedDifficulty <= 2 && <img src={lifes >= 2 ? heart : heartBroken} alt="Coração" className='heart' />}
        {selectedDifficulty <= 2 && <img src={lifes >= 3 ? heart : heartBroken} alt="Coração" className='heart' />}
        {selectedDifficulty === 1 && <img src={lifes >= 4 ? heart : heartBroken} alt="Coração" className='heart' />}
        {selectedDifficulty === 1 && <img src={lifes >= 5 ? heart : heartBroken} alt="Coração" className='heart' />}
      </div>
      {tutorialJump && gameStarted && <span className='tutorial'>Pressione espaço para pular!</span>}
      {!gameStarted && !popupConfig && <img className='start-button' onClick={() => setGameStarted(true)} src={startButton} alt='Botão de iniciar' />}
      <img src={floor} ref={floorRef} alt="chão" className='floor' />
      <img className='runner' ref={runnerRef} src={selectedCharacter === 1 ? stayKadu : stayPedro} alt="Runner" />
      <img className='ball' ref={ballRef} src={ball} alt="Ball" />
    </section>
  );
}

export default App;
