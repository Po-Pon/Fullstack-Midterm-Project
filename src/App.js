import './App.css';
import { BrowserRouter } from 'react-router-dom';

import Views from './Views';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Views />
    </BrowserRouter>
  );
}

export default App;
