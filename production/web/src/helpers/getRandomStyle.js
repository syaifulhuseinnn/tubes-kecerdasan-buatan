function getRandomStyle() {
  const options = [
    "adventurer",
    "big-ears-neutral",
    "croodles",
    "micah",
    "notionists",
    "pixel-art",
  ];

  // Generate a random index between 0 and the length of the options array
  const randomIndex = Math.floor(Math.random() * options.length);

  // Return the randomly selected option
  return options[randomIndex];
}

export default getRandomStyle;
