import React, { useState, useEffect } from 'react';

const App = () => {
  const [activeColumn, setActiveColumn] = useState(0);
  const [direction, setDirection] = useState(1);
  const [colorCycle, setColorCycle] = useState(0); // Tracks the color set to use

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveColumn((prev) => {
        if (prev >= 15 && direction === 1) {
          setDirection(-1);
          return 15;
        } else if (prev <= 0 && direction === -1) {
          setDirection(1);

          // Change color after every 5 rounds (approximation by column movement)
          setColorCycle((cycle) => (cycle + 1) % 5);

          return 0;
        }
        return prev + direction;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [direction]);

  const getColumnColor = (colIndex) => {
    const distance = Math.abs(colIndex - activeColumn);
    if (distance > 4) return 'bg-black';

    // Dynamic color set based on direction and color cycle
    const baseColors = [
      ['bg-red-500', 'bg-red-600', 'bg-red-700', 'bg-red-800', 'bg-red-900'],
      ['bg-blue-500', 'bg-blue-600', 'bg-blue-700', 'bg-blue-800', 'bg-blue-900'],
      ['bg-yellow-500', 'bg-yellow-600', 'bg-yellow-700', 'bg-yellow-800', 'bg-yellow-900'],
      ['bg-purple-500', 'bg-purple-600', 'bg-purple-700', 'bg-purple-800', 'bg-purple-900'],
      ['bg-green-500', 'bg-green-600', 'bg-green-700', 'bg-green-800', 'bg-green-900'],
    ];

    const colors = direction === 1
      ? baseColors[colorCycle]
      : [...baseColors[colorCycle]].reverse();

    return colors[4 - distance];
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <header className="py-4 shadow-lg bg-gray-800">
        <div className="container mx-auto text-center text-3xl font-bold">
          Dynamic ColorChanges Animation Pattern
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-grow justify-center items-center">
        {/* Animation Grid */}
        <section>
          <div className="grid grid-cols-20 grid-rows-15 gap-0 border-8 border-gray-600">
            {Array.from({ length: 15 * 20 }).map((_, index) => (
              <div
                key={index}
                className={`w-8 h-8 border border-gray-600 transition-all duration-150 ${Math.floor(index % 20) >= activeColumn && Math.floor(index % 20) < activeColumn + 5
                  ? getColumnColor(index % 20)
                  : 'bg-black'}`}
              ></div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-4 bg-gray-800 text-center">
        <p>Created by Neha | © 2025 Dynamic Animations</p>
      </footer>
    </div>
  );
};

export default App;