import React from 'react';
import './index.css';

// import uno_sprite from '../../assets/uno_sprite.png';
const cols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const generateCssBackgroundSize = row => {
  return cols.map(elem => (
    <div
      className="sprite"
      style={{
        width: '40px',
        height: '80px',
        backgroundPosition: `${elem * 7.75}% ${row * 0.1}%`,
      }}
    ></div>
  ));
};

function BaseScene() {
  return (
    <div>
      {rows.map(row => (
        generateCssBackgroundSize(row)
      ))}
    </div>
  );
}

export default BaseScene;
