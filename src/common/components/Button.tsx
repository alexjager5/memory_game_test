import React from 'react';

type Props = {
  label: string;
  onClick: () => void;
};

const Button: React.FC<Props> = ({ label, onClick }) => {
  return (
    <button
      className="rounded-xl h-12 w-full border border-secondary text-xl font-bold"
      onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
