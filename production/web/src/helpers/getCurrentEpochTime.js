function getCurrentEpochTime() {
  // Create a new Date object with the "Indonesia/Jakarta" time zone
  const jakartaTimezone = "Asia/Jakarta";
  const jakartaDate = new Date().toLocaleString("en-US", {
    timeZone: jakartaTimezone,
  });

  // Convert the Jakarta date to epoch time format (milliseconds since January 1, 1970)
  const epochTime = new Date(jakartaDate).getTime();

  return epochTime;
}

export default getCurrentEpochTime;
