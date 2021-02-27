// import dependencies from react, react-leaflet, and leaflet-pip //
// import components//

import borderData from '../src/data/border';
import leafletPip from 'leaflet-pip'
import L from 'leaflet'
import './App.css';
import { useState } from 'react'
import Modal from './components/Modal'
import Nav from './components/Nav'
import Map from './components/Map'
import MoveButtons from './components/MoveButtons'

// Main game function and setting props state

function App() {

  const [center, setCenter] = useState([43.88, -72.7317])
  const [centerStart, setCenterStart] = useState([43.88, -72.7317])
  const [centerMove, setCenterMove] = useState([43.88, -72.7317])
  const [zoom, setZoom] = useState(8)
  const [lat, setLat] = useState("?");
  const [lon, setLon] = useState("?");
  const [town, setTown] = useState("?")
  const [county, setCounty] = useState("?");
  const [score, setScore] = useState(100);
  const [modal, setModal] = useState(false)
  const [quitButtonState, setQuitButtonState] = useState(true)
  const [guessButtonState, setGuessButtonState] = useState(true)
  const [startButtonState, setStartButtonState] = useState(false)
  const [north, setNorth] = useState(lat)
  const [east, setEast] = useState(lon)
  const [west, setWest] = useState(lon)
  const [south, setSouth] = useState(lat)


  //initializing random center inside Vermont//
  let randLat = Math.random() * ((45.007561302382754 - 42.730315121762715) + 42.730315121762715)
  let randLon = Math.random() * (((-71.56844190848624) + (-73.39143636279358)) + -73.39143636279358)

  // Checking leaflet-pip to make sure random coords are within Vermont border//
  let stateLayer = L.geoJSON(borderData);
  let results = leafletPip.pointInLayer([randLon, randLat], stateLayer)

  while (results.length === 0) {
    randLat = Math.random() * ((45.007561302382754 - 42.730315121762715) + 42.730315121762715)
    randLon = Math.random() * ((-71.56844190848624 + (-73.39143636279358)) + -73.39143636279358)
    results = leafletPip.pointInLayer([randLon.toPrecision(5), randLat.toPrecision(5)], stateLayer)
  }


  // Sanitizing random coords to set precision//
  let currentLat = randLat.toPrecision(5);
  let currentLon = randLon.toPrecision(5);

  
  // start game function and setting props state on click//
  function startGame() {

    setCenter([randLat, randLon])
    setCenterMove(randLat, randLon)
    setLat("?")
    setLon("?")
    setScore(100)
    setTown("?")
    setCounty("?")
    setQuitButtonState(false)
    setGuessButtonState(false)
    setStartButtonState(true)
    setZoom(18)
    setModal(true)
    
  

  }


  
  // quit game function and setting props state on click//
  function quitGame() {

    setScore(0)
    setLat(currentLat)
    setLon(currentLon)
    setTown(town)
    setCounty(county)
    setQuitButtonState(true)
    setGuessButtonState(true)
    setStartButtonState(false)
    setTimeout(() => {
      window.location.reload()}, 4000)
    
  }


  //guess game function, setting props state on click, modal pop up, county guess//
  function guessGame() {
  }


  // movement buttons functions

  function moveNorth() {

    
    setCenterMove(lat + .002, lon)
    setScore(score-1)
  }


  function moveEast() {
    setCenterMove(lat, lon + .002)
    setScore(score-1)
  }

  function moveWest() {
    setCenterMove(lat, lon - .002)
    setScore(score-1)
  }

  function moveSouth() {
    setCenterMove(lat - .002, lon)
    setScore(score-1)
  }


  //display visual components and buttons//

  return (
    <div id="main">
      <div id="map">
      <Nav lat={lat} lon={lon} town={town} county={county} score={score}/>
      <Map center={center} zoom={zoom}/>
      <Modal display={modal}/>
      <div>
      <button id="north" onClick={moveNorth}>North</button>
      <button id="east" onClick={moveEast}>North</button>
      <button id="west" onClick={moveWest}>North</button>
      <button id="south" onClick={moveSouth}>North</button>
      </div>
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
