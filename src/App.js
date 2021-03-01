// import dependencies from react, react-leaflet, and leaflet-pip //
// import components//

import borderData from '../src/data/border';
import leafletPip from 'leaflet-pip'
import L from 'leaflet'
import './App.css';
import { useState, useEffect } from 'react'
import Modal from './components/Modal'
import Nav from './components/Nav'
import Map from './components/Map'

// Main game function and setting props initial state

function App() {

  const [center, setCenter] = useState([43.88, -72.7317])
  const [initStart, setInitStart] = useState([43.88, -72.7317])
  const [zoom, setZoom] = useState(8)
  const [lat, setLat] = useState("?");
  const [lon, setLon] = useState("?");
  const [town, setTown] = useState("?")
  const [county, setCounty] = useState("?");
  const [score, setScore] = useState(100);
  const [modalDisplay, setModalDisplay] = useState("none")
  const [quitButtonState, setQuitButtonState] = useState(true)
  const [guessButtonState, setGuessButtonState] = useState(true)
  const [startButtonState, setStartButtonState] = useState(false)

  //Saving this note for future use of MovementButtons components, instead//
  //of coding them in below//
  // const [north, setNorth] = useState(lat)
  // const [east, setEast] = useState(lon)
  // const [west, setWest] = useState(lon)
  // const [south, setSouth] = useState(lat)


  // start game function on click picks a random spot in Vermont//
  //and setting nav, map and button properties//
  function startGame() {


    //initializing random center inside Vermont//
  let randLat = Math.random() * ((45.007561302382754 - 42.730315121762715) + 42.730315121762715)
  let randLon = Math.random() * (((-71.56844190848624) + (-73.39143636279358)) + -73.39143636279358)

  // Checking leaflet-pip to make sure random coords are within Vermont border//
  let stateLayer = L.geoJSON(borderData);
  let results = leafletPip.pointInLayer([randLon, randLat], stateLayer)

  while (results.length === 0) {
    randLat = Math.random() * ((45.007561302382754 - 42.730315121762715) + 42.730315121762715)
    randLon = Math.random() * ((-71.56844190848624 + (-73.39143636279358)) + -73.39143636279358)
    results = leafletPip.pointInLayer([randLon, randLat], stateLayer)
  }

    setCenter([randLat, randLon])

    setInitStart([center[0], center[1]])
    setLat("?")
    setLon("?")
    setScore(100)
    setTown("?")
    setCounty("?")
    setQuitButtonState(false)
    setGuessButtonState(false)
    setStartButtonState(true)
    setZoom(18)
  }


  
  // quit game function on click stops the game and shows nav info//
  //and sets score to '0', resetting buttons state on click//

  function quitGame() {

    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${center[0]}&lon=${center[1]}&format=json`)
    .then(data => data.json())
    .then(jsonObj => {
      setCounty(jsonObj.address.county)
      setTown(jsonObj.address.town || jsonObj.address.city || jsonObj.address.locality
        || jsonObj.address.village || jsonObj.address.hamlet)
    })

    setScore(0)
    setLat(center[0])
    setLon(center[1])
    setQuitButtonState(true)
    setGuessButtonState(true)
    setStartButtonState(false)
    setTimeout(() => {
      window.location.reload()}, 4000)
    
  }


  //guess game function on click displays modal box and allows user to//
  //guess which county in Vermont they are in //
  function guessGame() {
    setModalDisplay("visible")
  }


  // movement buttons functions, on click moves initial starting spot accordingly//
  //and subtracts 1 from score for every movement, except the moveReturn button //

  function moveNorth() {
    setInitStart([initStart[0], initStart[1] + .002])
    setScore(score-1)
  }


  function moveEast() {
    setInitStart([initStart[0] + .002, initStart[1] ])
    setScore(score-1)
  }

  function moveWest() {
    setInitStart([initStart[0] - .002, initStart[1]])
    setScore(score-1)
  }

  function moveSouth() {
    setInitStart([initStart[0], initStart[1] - .002])
    setScore(score-1)
  }

  function moveReturn() {
    setInitStart(center[0], center[1])
  }


  // rendering of all game functions and components //

  return (
    <div id="main">
      <div id="map">
      <Nav lat={lat} lon={lon} town={town} county={county} score={score}/>
      <Map center={center} zoom={zoom}/>
      <Modal display={modalDisplay}/>
      <div>
        <button id="return" onClick={moveReturn}>Return</button>
      <button id="north" onClick={moveNorth}>North</button>
      <button id="east" onClick={moveEast}>East</button>
      <button id="west" onClick={moveWest}>West</button>
      <button id="south" onClick={moveSouth}>South</button>
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
