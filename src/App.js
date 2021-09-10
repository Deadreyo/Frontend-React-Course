import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './components/MainComponent';

//in this create-app-version, App is a function not a class...
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Main />
      </div>
    </BrowserRouter>
  );
}

export default App;
