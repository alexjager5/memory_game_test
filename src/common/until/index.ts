export const generateCardValues = () => {
  const values: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const target: number[] = [];

  do {
    const random = Math.floor(Math.random() * values.length);
    const exists = target.filter((value) => value === values[random]);
    if (exists.length < 2) {
      target.push(values[random]);

      if (exists.length === 1) {
        values.splice(random, 1);
      }
    }
  } while (target.length < 24);

  return target;
};
