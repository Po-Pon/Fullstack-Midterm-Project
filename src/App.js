import './App.css';
import { BrowserRouter } from 'react-router-dom';

import Views from './Views';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter basename={"/Fullstack-Midterm-Project"}>
      <Navbar />
      <Views />
    </BrowserRouter>
  );
}

export default App;
