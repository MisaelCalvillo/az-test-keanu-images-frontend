import React from 'react';
import { Route, Routes } from 'react-router-dom';
import KeanuImageForm from './components/KeanuImageForm';

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<KeanuImageForm />} />
      </Routes>
    </div>
  );
};

export default App;