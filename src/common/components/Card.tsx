import React from 'react';
import { CardElement } from '@/types';
import clsx from 'clsx';
import CardBg from '@/assets/images/card_bg.png';
import styles from './style.module.css';

type Props = {
  data: CardElement;
  onFlip: (data: CardElement) => void;
  flipped: boolean;
  removed: boolean;
};

const Card: React.FC<Props> = ({ data, flipped, removed, onFlip }) => {
  const handleClickCard = () => {
    if (!removed && !flipped) {
      onFlip(data);
    }
  };

  return (
    <div className={styles.cardWrapper}>
      <div
        className={clsx(
          styles.card,
          flipped && styles.rotated,
          !removed && 'hover:shadow-card cursor-pointer'
        )}
        onClick={handleClickCard}>
        {removed ? (
          ''
        ) : (
          <>
            <img className={styles.cardFace} src={CardBg} alt="card" />
            <img
              className={clsx(styles.cardFace, styles.rotated)}
              src={data.image}
              alt="card"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
