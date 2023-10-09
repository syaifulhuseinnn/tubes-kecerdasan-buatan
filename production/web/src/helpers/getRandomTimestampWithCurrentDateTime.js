function getRandomTimestampWithCurrentDateTime() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // Months are 0-indexed, so add 1 to get the current month
  const currentDay = new Date().getDate(); // Get the current day of the month
  const currentHours = new Date().getHours();
  const currentMinutes = new Date().getMinutes();
  const currentSeconds = new Date().getSeconds();
  const currentMilliseconds = new Date().getMilliseconds();

  // Set the timezone offset to +07
  const timezoneOffsetHours = 7;

  const formattedTimestamp = `${currentYear}-${currentMonth
    .toString()
    .padStart(2, "0")}-${currentDay.toString().padStart(2, "0")} ${currentHours
    .toString()
    .padStart(2, "0")}:${currentMinutes
    .toString()
    .padStart(2, "0")}:${currentSeconds
    .toString()
    .padStart(2, "0")}.${currentMilliseconds
    .toString()
    .padStart(6, "0")}+${timezoneOffsetHours.toString().padStart(2, "0")}`;

  return formattedTimestamp;
}

export default getRandomTimestampWithCurrentDateTime;
