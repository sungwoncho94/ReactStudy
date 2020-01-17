import dayjs from 'dayjs';

export const dayOfWeek = (date: string): number => {
  const rawDay = dayjs(date).day();
  if (rawDay === 7) return 1;
  else return rawDay + 1;
};

export const daysArray = (max: number, start: number) => {
  let arr = [];
  let i = 1;
  const modSeven = max % 7;
  const maxEffective = (modSeven + 6) * 7;
  for (i = 1; i < maxEffective + 1 + 7; i++) {
    const count = i - start + 1;
    if (count >= 1 && count <= max) {
      arr.push(count);
    } else {
      arr.push(null);
    }
  }
  return removeExtraArray(sliceArray(arr, 7));
}

const removeExtraArray = (arr: number[][]) => {
  return arr.map(week => {
    if (week.filter(day => day !== null).length === 0) {
      return [];
    } else {
      return week;
    }
  });
};

export const sliceArray = (arr: number[], chunk: number) => {
  let finalArr = [];
  let i: number, j: number, tempArray: number[];
  for (i = 0, j = arr.length; i < j; i += chunk) {
    tempArray = arr.slice(i, i + chunk);
    finalArr.push(tempArray);
  }
  return finalArr;
}