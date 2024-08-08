import randomColor from "randomcolor";

export default function getColor() {
  return randomColor({
    hue: "random",
  });
}
