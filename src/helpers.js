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
  match,
  location,
  currentLink,
  link,
  color,
  date,
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
    date &&
    currentRate &&
    link.id !== currentLink[0].id
  ) {
    return classes.nav_link;
  }

  return classes.nav_link_disabled;
};

export const mobileCurrentStyle = (
  match,
  location,
  currentLink,
  link,
  color,
  date,
  currentCar,
  currentRate,
  classes
) => {
  if (match.name === 'location') {
    if (location && link.id - 1 === currentLink[0].id) {
      return classes.nav_link_mobile;
    }
  }

  if (match.name === 'model') {
    if (link.id - 1 === currentLink[0].id && currentCar) {
      return classes.nav_link_mobile;
    }
    if (link.id < currentLink[0].id) {
      return classes.nav_link_mobile;
    }
  }

  if (match.name === 'extra-opt') {
    if (
      link.id - 1 === currentLink[0].id &&
      date.endDate &&
      color &&
      currentRate
    ) {
      return classes.nav_link_mobile;
    }
    if (link.id < currentLink[0].id) {
      return classes.nav_link_mobile;
    }
  }

  if (match.name === 'result') {
    if (link.id < currentLink[0].id) {
      return classes.nav_link_mobile;
    }
  }

  return classes.nav_link_mobile_disabled;
};
