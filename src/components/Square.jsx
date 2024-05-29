/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// src/components/Square.js

import React from 'react';

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

export default Square;