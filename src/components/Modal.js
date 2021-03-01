// functional component Modal pops up when user clicks make a guess button//
//currently not behaving properly with it's props of visibility//

function Modal(props) {

    // Close Modal function hides modal
    function closeModal() {
        props.setModalDisplay("hidden");
    }

// modal drop down of Vermont Counties
    return (
    <div style={{ visibility: "visible" }} id="modal">
        <h1>Where are you?</h1>
        <form>
            <select id="countyList" name="counties" value="guessCounty" onChange="handleChange">
                  <option value="Addison County">Addison County</option>
                  <option value="Bennington County">Bennington County</option>
                  <option value="Caledonia County">Caledonia County</option>
                  <option value="Chittenden County">Chittenden County</option>
                  <option value="Essex County">Essex County</option>
                  <option value="Franklin County">Franklin County</option>
                  <option value="Grand Isle County">Grand Isle County</option>
                  <option value="Lamoille County">Lamoille County</option>
                  <option value="Orange County">Orange County</option>
                  <option value="Orleans County">Orleans County</option>
                  <option value="Rutland County">Rutland County</option>
                  <option value="Washington County">Washington County</option>
                  <option value="Windham County">Windham County</option>
                  <option value="Windsor County">Windsor County</option>

            </select>
        </form>
        <button id="closeModal" onClick={closeModal}>Close</button>
    </div>
    )}

export default Modal