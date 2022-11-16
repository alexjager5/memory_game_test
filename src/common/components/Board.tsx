import React from 'react';

type Props = {
  label: string;
  value: number;
};

const Board: React.FC<Props> = ({ label, value }) => {
  return (
    <div className="rounded-2xl text-center py-5 text-3xl font-bold">
      <h2 className="mb-2 uppercase">{label}</h2>
      <h2>{value}</h2>
    </div>
  );
};

export default Board;
