import getColor from "./getColor";
export default function getColorArray(number: number) {
  const arr = new Array(number);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = {
      color: getColor(),
      locked: false,
      id: "id" + Math.random().toString(16).slice(2),
    };
  }
  return arr;
}
