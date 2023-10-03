function formatEpochTime(epochTime) {
  const currentTimestamp = Date.now();
  const millisecondsInADay = 24 * 60 * 60 * 1000;

  const differenceInDays = Math.floor(
    (currentTimestamp - epochTime) / millisecondsInADay
  );

  const date = new Date(epochTime);

  if (differenceInDays <= 7) {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day = daysOfWeek[date.getUTCDay()];
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${day}, ${hours}:${minutes}`;
  } else {
    const formattedDate = `${date.getUTCDate()}/${
      date.getUTCMonth() + 1
    }/${date.getUTCFullYear()}`;
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${formattedDate}, ${hours}:${minutes}`;
  }
}

export default formatEpochTime;
