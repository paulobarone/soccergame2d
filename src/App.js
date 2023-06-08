import runner from './public/img/runner.gif';
import floor from './public/img/floor.png';
import clouds1 from './public/img/clouds/1.png';
import clouds2 from './public/img/clouds/2.png';
import clouds3 from './public/img/clouds/3.png';
import clouds4 from './public/img/clouds/4.png';

function App() {
  return (
    <section className="game-container">
      <div className="sky"></div>
      <img src={floor} alt="floor" className='floor' />
      <img className='runner' src={runner} alt="Runner" />
      <img className='clouds clouds1' src={clouds1} alt="clouds" />
      <img className='clouds clouds2' src={clouds2} alt="clouds" />
      <img className='clouds clouds3' src={clouds3} alt="clouds" />
      <img className='clouds clouds4' src={clouds4} alt="clouds" />
    </section>
  );
}

export default App;