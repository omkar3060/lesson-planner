// App.js
import React from 'react';
import ToggleButton from './ToggleButton.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Planner from './pages/Planner';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <header className="p-4 shadow-md">
          <ToggleButton />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/planner" element={<Planner />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
