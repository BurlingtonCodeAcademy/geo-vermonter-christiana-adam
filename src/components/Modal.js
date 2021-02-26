import { useState } from 'react'

function Modal(props) {
    const [isShowModal, setShow] = useState(false);

    function toggleShow(evt) {
        let showModal = isShowModal;

        setShow(!showModal);
    }
    return (
    <div id="modal">
        <h1>Where are you?</h1>
        <form>
            <select id="countyList" name="counties" value="guessCounty">
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
        <button id="closeModal" onClick={toggleShow}>Close</button>
    </div>
    )}

export default Modal