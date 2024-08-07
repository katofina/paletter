import randomColor from "randomcolor";

export default function getColor() {
    return randomColor({
        luminosity: "light",
        hue: "random",
    });
}