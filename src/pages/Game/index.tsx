import React, { useState, useEffect, useMemo, useRef } from 'react';
import Board from '@/components/Board';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { CardElement } from '@/types';
import images from '@/constants/images';
import { generateCardValues } from '@/until';
import { useMutation, gql } from '@apollo/client';
import uuid from 'react-uuid';

const ADD_TURN = gql`
  mutation addTurn($game_id: String!, $turn: Int!, $flip1: Int!, $flip2: Int!) {
    addTurn(game_id: $game_id, turn: $turn, flip1: $flip1, flip2: $flip2) {
      _id
    }
  }
`;

const Game = () => {
  const [turns, setTurns] = useState<number>(0);
  const [flipped, setFlipped] = useState<CardElement[]>([]);
  const [removed, setRemoved] = useState<number[]>([]);
  const [gameId, setGameId] = useState<string>(uuid());

  const timer = useRef<NodeJS.Timeout>();

  const [addTurn] = useMutation(ADD_TURN, {
    variables: {
      game_id: gameId,
      turn: turns,
      flip1: flipped[0]?.value,
      flip2: flipped[1]?.value
    },
    errorPolicy: 'ignore'
  });

  const callAddTurn = () => {
    addTurn().catch(() => {});
  };

  useEffect(() => {
    if (flipped.length === 2) {
      setTurns((prev) => prev + 1);
      callAddTurn();
      timer.current = setTimeout(() => {
        setFlipped([]);

        if (flipped[0].value === flipped[1].value) {
          setRemoved([...removed, flipped[0].id, flipped[1].id]);
        }
      }, 1000);
    }

    return () => {
      clearTimeout(timer.current);
    };
  }, [flipped]);

  const data: CardElement[] = useMemo(() => {
    const randomValues = generateCardValues();

    return randomValues.map((item, index) => ({
      id: index,
      value: item,
      image: images[item - 1]
    }));
  }, []);

  const handleFlip = (data: CardElement) => {
    if (flipped.length < 2) {
      const values = [...flipped, data];
      setFlipped(values);
    }
  };

  const handleReset = () => {
    setRemoved([]);
    setFlipped([]);
    setTurns(0);
    setGameId(uuid());
  };

  return (
    <div className="flex h-screen">
      <div className="p-6 w-[240px]">
        <Board label="matches" value={removed.length / 2} />
      </div>

      <div className="flex-1 p-6 flex justify-center">
        <div className="grid grid-rows-4 grid-flow-col gap-4 h-full">
          {data.map((item, index) => (
            <Card
              key={index}
              data={item}
              removed={removed.includes(item.id)}
              flipped={!!flipped.find((element) => element.id === item.id)}
              onFlip={handleFlip}
            />
          ))}
        </div>
      </div>

      <div className="p-6 flex flex-col justify-between w-[240px]">
        <Board label="turns" value={turns} />
        <Button label="Reset" onClick={handleReset} />
      </div>

      {removed.length === 24 && (
        <div className="absolute top-1/2 left-1/2 text-5xl font-bold -translate-y-1/2 -translate-x-1/2 text-center">
          Game is finished with {turns} turns
        </div>
      )}
    </div>
  );
};

export default Game;
