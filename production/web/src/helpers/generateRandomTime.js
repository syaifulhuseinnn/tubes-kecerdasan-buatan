function getRandomEpochTime() {
  // Set the start date to January 1, 2023
  const startDate = new Date("2023-01-01T00:00:00Z").getTime();

  // Calculate the range of milliseconds from the start date to now
  const now = new Date().getTime();
  const range = now - startDate;

  // Generate a random timestamp within the range and add it to the start date
  const randomTimestamp = Math.random() * range + startDate;

  return Math.floor(randomTimestamp);
}

export default getRandomEpochTime;
