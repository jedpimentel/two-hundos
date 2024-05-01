// import logo from './logo.svg';
import logo from './two-hundos.png';
import './App.css';


import TestQuery from './TestQuery';
import TextBoxList from './TextBoxList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <TestQuery />  {/* This will execute and show results from the test query */}
      <p>hurrdurr</p>
      
      <TextBoxList />
      <p>LA DEE DA</p>

    </div>
  );
}

export default App;
