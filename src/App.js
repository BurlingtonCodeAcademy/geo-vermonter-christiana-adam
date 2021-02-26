import borderData from '../src/data/border';
import leafletPip from 'leaflet-pip'
import L from 'leaflet'
import './App.css';
import { useState } from 'react'
import Modal from './components/Modal'
import Nav from './components/Nav'
import Map from './components/Map'
import MoveButtons from './components/MoveButtons'

function App() {

  const [center, setCenter] = useState([43.88, -72.7317])
  const [zoom, setZoom] = useState(8)
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [town, setTown] = useState("")
  const [county, setCounty] = useState("");
  const [score, setScore] = useState("");
  const [modal, setModal] = useState(false)
  const [quitButtonState, setQuitButtonState] = useState(true)
  const [guessButtonState, setGuessButtonState] = useState(true)
  const [startButtonState, setStartButtonState] = useState(false)




  

  function startGame() {

    let randLat = Math.random() * ((45.007561302382754 - 42.730315121762715) + 42.730315121762715)
    let randLon = Math.random() * (((-71.56844190848624) + (-73.39143636279358)) + -73.39143636279358)

    let stateLayer = L.geoJSON(borderData);
    let results = leafletPip.pointInLayer([randLon, randLat], stateLayer)

    while (results.length === 0) {
      randLat = Math.random() * ((45.007561302382754 - 42.730315121762715) + 42.730315121762715)
      randLon = Math.random() * ((-71.56844190848624 + (-73.39143636279358)) + -73.39143636279358)
      results = leafletPip.pointInLayer([randLon, randLat], stateLayer)
    }

    
    setCenter([randLat, randLon])
    setLat(randLat)
    setLon(randLon)
    setScore(100)
    setTown(town)
    setCounty(county)
    setQuitButtonState(false)
    setGuessButtonState(false)
    setStartButtonState(true)
    setZoom(18)
    setModal(true)
    
  

  }


  

  function quitGame() {

  }

  function guessGame() {
  }


  return (
    <div id="main">
      <div id="map">
      <Nav lat={lat} lon={lon} town={town} county={county} score={score}/>
      <Map center={center} zoom={zoom}/>
      <Modal visibility={modal}/>
      <MoveButtons />
      </div>
      <div id="buttons">
      <button id="start" onClick={startGame} disabled={startButtonState}>Start Game</button>
      <button id="quit" onClick={quitGame} disabled={quitButtonState}>Quit Game</button>
      <button id="guess" onClick={guessGame} disabled={guessButtonState}>Make a Guess</button>
      </div>
    </div>
  );
}

export default App;
