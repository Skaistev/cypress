/* eslint-disable react/prop-types */
// src/components/Square.js


const Square = ({ value, onClick }) => {
    return (
        <button className="square" onClick={onClick}>
            {value}
        </button>
    );
};

export default Square;