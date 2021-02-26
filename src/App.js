import './App.css';
import { useState } from 'react'
import Modal from './components/Modal'
import Nav from './components/Nav'
import Map from './components/Map'

function App() {

  const [center, setCenter] = useState([43.88, -72.7317])


  function startGame() { 
    {/* Start Game */}
  }

  function quitGame() {
    {/* Player presses button and shows correct answer then quits/restarts */}

  }

  function guessGame() {
    
    {/* if guessClick includes props.county randomCenter 
    console.log(" Congrats you guessed it ") 
  else "No, you are wrong, keep guessing, lose 10 points"*/}
  }


  return (
    <div id="main">
      <div id="map">
      <Map center={center} />
      <Modal />
      </div>
      <div id="buttons">
      <button id="start" onClick={startGame} disabled={false}>Start Game</button>
      <button id="quit" onClick={quitGame} disabled={true}>Quit Game</button>
      <button id="guess" onClick={guessGame} disabled={true}>Make a Guess</button>
      </div>
    </div>
  );
}

export default App;
