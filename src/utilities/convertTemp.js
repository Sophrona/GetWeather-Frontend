const convertTemp = (t) => {
  // Fahrenheit to Celcius
  return `${Math.round((t - 32) * (5 / 9))}°C`;
};

export default convertTemp;
