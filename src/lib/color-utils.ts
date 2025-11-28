export function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Generate hue across the full spectrum
  const hue = Math.abs(hash) % 360;
  // Fixed saturation and lightness for harmonious look
  const saturation = 70;
  const lightness = 60;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
