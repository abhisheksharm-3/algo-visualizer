import React from 'react';
import Visualization from './components/Visualization';
import './App.css'; // You can create your own styles or use Tailwind CSS here

function App() {
  // Sample node data for the tree
  const nodes = [
    { id: 0, left: 100, top: 50 },
    { id: 1, left: 50, top: 150 },
    { id: 2, left: 150, top: 150 },
    // Add more nodes as needed
  ];

  return (
    <div className="App">
     <div className="text-black font-bold text-xl">
            <span className="text-2xl">Graph</span>
            <span className="text-red-500">Sense</span>
          </div>
      <Visualization nodes={nodes} />
    </div>
  );
}

export default App;
