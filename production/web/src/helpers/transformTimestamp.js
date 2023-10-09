function transformTimestamp(timestamp) {
  // Parse the timestamp string to a Date object
  const date = new Date(timestamp);

  // Get the current date and time
  const currentDate = new Date();

  // Check if the difference between the two dates is within 24 hours
  const within24Hours = Math.abs(date - currentDate) <= 24 * 60 * 60 * 1000;

  if (within24Hours) {
    // Within 24 hours, format as hours:minutes
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  } else {
    // Outside 24 hours, format as date/month/year hours:minutes
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }
}

export default transformTimestamp;
