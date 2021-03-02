// functional component Nav for info on top bar

import React from 'react'
function Nav(props) {
    

    return (
        <div id="navContainer">
            <h3 id="lat">Latitude: {props.lat}</h3>
            <h3 id="lon">Longitude: {props.lon}</h3>
            <h3 id="town">Town: {props.town}</h3>
            <h3 id="county">County: {props.county}</h3>
            <h3 id="score">Score: {props.score}</h3>
        </div>
    )
    }

export default Nav