// South Africa's approximate boundaries
const SA_BOUNDS = {
  north: -22.1265, // Northernmost point
  south: -34.8393, // Southernmost point
  west: 16.47, // Westernmost point
  east: 32.8908, // Easternmost point
};

/**
 * Generates a random number between min and max
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random number between min and max
 */
function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

/**
 * Generates an array of random coordinates within South Africa
 * @param {number} count - Number of coordinate pairs to generate
 * @param {boolean} [asArray=false] - If true, returns coordinates as [lat, lng] arrays instead of {lat, lng} objects
 * @returns {Array} Array of coordinates
 */
export function generateSACoordinates(count, asArray = false) {
  const coordinates = [];

  for (let i = 0; i < count; i++) {
    const latitude = randomBetween(SA_BOUNDS.south, SA_BOUNDS.north);
    const longitude = randomBetween(SA_BOUNDS.west, SA_BOUNDS.east);

    coordinates.push(asArray ? [latitude, longitude] : { latitude, longitude });
  }

  return coordinates;
}