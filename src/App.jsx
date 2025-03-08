/* eslint-disable react/jsx-no-constructed-context-values */
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Home from './home/Home';
import Question from './pages/Questions/Question';
import Results from './pages/Results/Results';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/question/:id" element={<Question />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
