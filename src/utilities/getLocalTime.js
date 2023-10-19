const getLocalTime = (dt, timezone) => {
  const localOffset = new Date().getTimezoneOffset() * 60000;
  const utc = dt * 1000 + localOffset;
  const time = utc + 1000 * timezone;

  return time;
};

export default getLocalTime;
