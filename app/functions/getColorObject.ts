import getColor from "./getColor";
export default function getColorArray() {
  const arr = new Array(5);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = {
      color: getColor(),
      locked: false,
      id: "id" + Math.random().toString(16).slice(2),
    };
  }
  return arr;
}
