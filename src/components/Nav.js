import React from 'react'


function Nav(props) {
    

    return (
        <div id="navContainer">
            <h1 id="lat">Latitude: {props.lat}</h1>
            <h1 id="lon">Longitude: {props.lon}</h1>
            <h1 id="town">Town: {props.town}</h1>
            <h1 id="county">County: {props.county}</h1>
            <h1 id="score">Score: {props.score}</h1>
        </div>
    )
    }

export default Nav