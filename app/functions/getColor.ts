export default function getColor() {
  const randomColor = '#' + Math.floor(Math.random() * 16777216).toString(16);
  if (randomColor.length > 6) return randomColor;
  else return getColor();
}