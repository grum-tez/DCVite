import React from 'react';

interface PokeButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

const PokeButton: React.FC<PokeButtonProps> = ({ onClick, isLoading }) => {
  return (
    <button onClick={onClick} disabled={isLoading}>
      {isLoading ? <div className="spinner"></div> : 'Poke'}
    </button>
  );
};

export default PokeButton;