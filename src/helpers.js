export const dateFormat = (
  sinceDate,
  endDate,
  setHours,
  setMinutes,
  setDays
) => {
  const miliseconds = endDate - sinceDate;
  const minute = 1000 * 60;
  const hour = minute * 60;
  const currentMinutes = Math.floor(miliseconds / minute);
  const currentHours = Math.floor(miliseconds / hour);
  const currentDays = Math.floor(currentHours / 24);
  setHours(Math.floor(currentDays * 24 - currentHours));
  setMinutes(Math.floor(currentHours * 60 - currentMinutes));
  setDays(currentDays);
};

const calculatePrice = (date, currentRate, currentPrice) => {
  const miliseconds = Date.parse(date.endDate) - Date.parse(date.sinceDate);
  if (currentRate.price === 7) {
    return Math.floor(
      (miliseconds / (1000 * 60)) * currentRate.price + currentPrice
    );
  }
  return Math.floor(
    (miliseconds / (1000 * 60 * 60 * 24 * 31)) * currentRate.price +
      currentPrice
  );
};

export const changePrice = (date, extra, currentRate, currentPrice) => {
  let price = 0;
  if (date.sinceDate && date.endDate && currentRate) {
    price = calculatePrice(date, currentRate, currentPrice);
  }
  if (extra && extra.isFullTank === true) {
    price = Math.floor(price + 500);
  } else {
    price = Math.floor(price + 0);
  }
  if (extra && extra.isChair === true) {
    price = Math.floor(price + 200);
  } else {
    price = Math.floor(price + 0);
  }
  if (extra && extra.isRightWheel === true) {
    price = Math.floor(price + 1500);
  } else {
    price = Math.floor(price + 0);
  }

  return price;
};

export const infArrHandler = (
  town,
  address,
  car,
  color,
  sinceDate,
  endDate,
  days,
  hours,
  minutes,
  rate,
  isFullTank,
  isChair,
  isRightWheel
) => [
  {
    id: 0,
    header: 'Пункт выдачи',
    value: town && address && `${town}, ${address}`,
  },
  {
    id: 1,
    header: 'Модель',
    value: car && `${car}`,
  },
  {
    id: 2,
    header: 'Цвет',
    value: color,
  },
  {
    id: 3,
    header: 'Длительность аренды',
    value:
      sinceDate &&
      endDate &&
      `${days !== 0 ? `${days}д.` : ''} ${
        hours !== 0 ? `${Math.abs(hours)}ч.` : ''
      } ${minutes !== 0 ? `${Math.abs(minutes)}мин.` : ''}`,
  },
  {
    id: 4,
    header: 'Длительность аренды',
    value: rate && rate,
  },
  {
    id: 5,
    header: 'Полный бак',
    value: isFullTank && isFullTank,
  },
  {
    id: 6,
    header: 'Детское кресло',
    value: isChair && isChair,
  },
  {
    id: 7,
    header: 'Правый руль',
    value: isRightWheel && isRightWheel,
  },
];

export const currentStyle = (
  location,
  currentLink,
  link,
  color,
  sinceDate,
  endDate,
  currentCar,
  currentRate,
  classes
) => {
  if (link.id === currentLink[0].id) {
    return classes.nav_link_active;
  }
  if (link.id === 0 && link.id !== currentLink[0].id) {
    return classes.nav_link;
  }
  if (link.id === 1 && location && link.id !== currentLink[0].id) {
    return classes.nav_link;
  }
  if (link.id === 2 && currentCar && link.id !== currentLink[0].id) {
    return classes.nav_link;
  }
  if (
    link.id === 3 &&
    color &&
    endDate &&
    sinceDate &&
    currentRate &&
    link.id !== currentLink[0].id
  ) {
    return classes.nav_link;
  }

  return classes.nav_link_disabled;
};

export const mobileCurrentStyle = (
  location,
  currentLink,
  link,
  color,
  sinceDate,
  endDate,
  currentCar,
  currentRate,
  classes
) => {
  if (link.id === currentLink[0].id) {
    return classes.nav_link_mobile;
  }
  if (link.id === 0) {
    return classes.nav_link_mobile;
  }
  if (link.id === 1 && location) {
    return classes.nav_link_mobile;
  }
  if (link.id === 2 && currentCar) {
    return classes.nav_link_mobile;
  }
  if (link.id === 3 && color && endDate && sinceDate && currentRate) {
    return classes.nav_link_mobile;
  }

  return classes.nav_link_mobile_disabled;
};
