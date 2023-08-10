import React from 'react';
import Visualization from './components/Visualization';

function Home() {
  // Sample node data for the tree
  const nodes = [
    { id: 0, left: 100, top: 50 },
    { id: 1, left: 50, top: 150 },
    { id: 2, left: 150, top: 150 },
    // Add more nodes as needed
  ];

  return (
    <div className="flex flex-col items-center">
        <img src="../src/logo.png" className='w-[30%]'/>
      <Visualization nodes={nodes} className=""/>
    </div>
  );
}

export default Home;
