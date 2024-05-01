// import logo from './logo.svg';
import logo from './two-hundos.png';
import './App.css';

import React, { useState } from 'react';
import DraggableTextBox from './DraggableTextBox';

import TestQuery from './TestQuery';
import TextBoxList from './TextBoxList';

function App() {
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


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          React App go Brrr
        </p>
        
        <button onClick={addTextBox}>Add Text Box</button>
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
      
      <TextBoxList />
      <p>LA DEE DA</p>

    </div>
  );
}

export default App;
