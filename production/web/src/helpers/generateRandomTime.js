function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomTimestampWithTimeZone() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // Months are 0-indexed, so add 1 to get the current month
  const currentDay = new Date().getDate(); // Get the current day of the month

  // Generate a random day within the current month, from 1 day in the past up to the current day
  const day = getRandomInt(1, currentDay);

  const hours = getRandomInt(0, 23);
  const minutes = getRandomInt(0, 59);
  const seconds = getRandomInt(0, 59);
  const milliseconds = getRandomInt(0, 999);

  // Set the timezone offset to +07
  const timezoneOffsetHours = 7;

  const formattedTimestamp = `${currentYear}-${currentMonth
    .toString()
    .padStart(2, "0")}-${day.toString().padStart(2, "0")} ${hours
    .toString()
    .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}.${milliseconds
    .toString()
    .padStart(6, "0")}+${timezoneOffsetHours.toString().padStart(2, "0")}`;

  return formattedTimestamp;
}

export default getRandomTimestampWithTimeZone;
