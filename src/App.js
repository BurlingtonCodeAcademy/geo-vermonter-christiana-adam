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

// Main game function and setting props state

function App() {

  const [center, setCenter] = useState([43.88, -72.7317])
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
  // const [north, setNorth] = useState(lat)
  // const [east, setEast] = useState(lon)
  // const [west, setWest] = useState(lon)
  // const [south, setSouth] = useState(lat)


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



  
  // start game function and setting props state on click//
  function startGame() {

    setCenter([randLat, randLon])
    setLat("?")
    setLon("?")
    setScore(100)
    setTown("?")
    setCounty("?")
    setQuitButtonState(false)
    setGuessButtonState(false)
    setStartButtonState(true)
    setZoom(8)
    console.log(center)
  }


  
  // quit game function and setting props state on click//
  function quitGame() {

    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${randLat}&lon=${randLon}&format=json`)
    .then(data => data.json())
    .then(jsonObj => {
      setCounty(jsonObj.address.county)
      setTown(jsonObj.address.town || jsonObj.address.city || jsonObj.address.locality
        || jsonObj.address.village || jsonObj.address.hamlet)
    })

    setScore(0)
    setLat(randLat)
    setLon(randLon)
    setQuitButtonState(true)
    setGuessButtonState(true)
    setStartButtonState(false)
    setTimeout(() => {
      window.location.reload()}, 4000)
    
  }


  //guess game function, setting props state on click, modal pop up, county guess//
  function guessGame() {
    setModalDisplay("block")
  }


  // movement buttons functions

  function moveNorth() {
    setCenter([(randLat + .002), randLon])
    setScore(score-1)
  }


  function moveEast() {
    setCenter([randLat, (randLon + .002)])
    setScore(score-1)
  }

  function moveWest() {
    setCenter([randLat, (randLon - .002)])
    setScore(score-1)
  }

  function moveSouth() {
    setCenter([(randLat - .002), randLon])
    setScore(score-1)
  }

  function moveReturn() {
    setCenter(randLat, randLon)
  }


  //display visual components and buttons//

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
