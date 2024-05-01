// import logo from './logo.svg';
import logo from './two-hundos.png';
import './App.css';

import React, { useState } from 'react';
import DraggableTextBox from './DraggableTextBox';

import TestQuery from './TestQuery';
import TextBoxList from './TextBoxList';
import Overlay from './Overlay';

function App() {
  const [overlayText, setOverlayText] = useState('');
  window.cheat = setOverlayText;
  // const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [textBoxes, setTextBoxes] = useState([]);

  const addTextBox = () => {
    const newTextBox = { id: Date.now(), content: '' }; // Simplified example
    setTextBoxes([...textBoxes, newTextBox]);
  };

  
  const saveTextBox = (id, content) => {
    // Update content in state and send update to server
  };

  const closeTextBox = (id) => {
    // Remove text box from state and optionally from server
  };

  
  // Function to handle when text is saved
  const handleTextSave = (text) => {
    console.log('handling', text)
    // Call the server to process the text and then set the overlay text
    fetch('/api/process-text', {
    // fetch('http://localhost:4000/api/process-text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    })
    .then(response => response.json())
    .then(data => setOverlayText(data.response))
    .catch(error => console.error('Error:', error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          React App go Brrr
        </p>
        
        {/* <button onClick={addTextBox}>Add Text Box</button> */}
        {/* {textBoxes.map(box => (
          <DraggableTextBox
            key={box.id}
            id={box.id}
            content={box.content}
            onSave={saveTextBox}
            onClose={closeTextBox}
          />
        ))} */}
      </header>
      <TestQuery />  {/* This will execute and show results from the test query */}
      <p>hurrdurr</p>
      
      <TextBoxList onSave={handleTextSave} />
      <Overlay text={overlayText} />
      <p>LA DEE DA</p>

    </div>
  );
}

export default App;
