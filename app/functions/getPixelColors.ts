interface RGB {
  r: number;
  g: number;
  b: number;
}

interface HSL {
  h: number;
  s: number;
  l: number;
}

export default function getPixelsColors(
  data: Float32Array | Uint8Array | null,
) {
  const buildRgb = (data: Float32Array | Uint8Array) => {
    const rgbValues = [];
    for (let i = 0; i < data.length; i += 4) {
      const rgb = {
        r: data[i],
        g: data[i + 1],
        b: data[i + 2],
      };
      rgbValues.push(rgb);
    }
    return rgbValues;
  };

  const findBiggestColorRange = (rgbValues: RGB[]) => {
    let rMin = Number.MAX_VALUE;
    let gMin = Number.MAX_VALUE;
    let bMin = Number.MAX_VALUE;

    let rMax = Number.MIN_VALUE;
    let gMax = Number.MIN_VALUE;
    let bMax = Number.MIN_VALUE;

    rgbValues.forEach((pixel) => {
      rMin = Math.min(rMin, pixel.r);
      gMin = Math.min(gMin, pixel.g);
      bMin = Math.min(bMin, pixel.b);

      rMax = Math.max(rMax, pixel.r);
      gMax = Math.max(gMax, pixel.g);
      bMax = Math.max(bMax, pixel.b);
    });

    const rRange = rMax - rMin;
    const gRange = gMax - gMin;
    const bRange = bMax - bMin;

    const biggestRange = Math.max(rRange, gRange, bRange);
    if (biggestRange === rRange) {
      return "r";
    } else if (biggestRange === gRange) {
      return "g";
    } else {
      return "b";
    }
  };

  const quantization = (rgbValues: RGB[], depth: number): RGB[] => {
    const MAX_DEPTH = 3;
    if (depth === MAX_DEPTH || rgbValues.length === 0) {
      const color = rgbValues.reduce(
        (prev, curr) => {
          prev.r += curr.r;
          prev.g += curr.g;
          prev.b += curr.b;

          return prev;
        },
        {
          r: 0,
          g: 0,
          b: 0,
        },
      );

      color.r = Math.round(color.r / rgbValues.length);
      color.g = Math.round(color.g / rgbValues.length);
      color.b = Math.round(color.b / rgbValues.length);
      return [color];
    }
    // recursion code goes below
    const componentToSortBy = findBiggestColorRange(rgbValues);
    rgbValues.sort((p1, p2) => {
      return p1[componentToSortBy] - p2[componentToSortBy];
    });

    const mid = rgbValues.length / 2;
    return [
      ...quantization(rgbValues.slice(0, mid), depth + 1),
      ...quantization(rgbValues.slice(mid + 1), depth + 1),
    ];
  };

  const orderByLuminance = (rgbValues: RGB[]) => {
    const calculateLuminance = (p: RGB) => {
      return 0.2126 * p.r + 0.7152 * p.g + 0.0722 * p.b;
    };

    return rgbValues.sort((p1, p2) => {
      return calculateLuminance(p2) - calculateLuminance(p1);
    });
  };

  const rgbValues = buildRgb(data!);

  const quantColors = quantization(rgbValues, 0);
  const orderedByColor = orderByLuminance(quantColors);

  const rgbToHex = (pixel: RGB) => {
    const componentToHex = (c: number) => {
      const hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    };

    return (
      "#" +
      componentToHex(pixel.r) +
      componentToHex(pixel.g) +
      componentToHex(pixel.b)
    ).toUpperCase();
  };

  const calculateColorDifference = (color1: RGB, color2: RGB) => {
    const rDifference = Math.pow(color2.r - color1.r, 2);
    const gDifference = Math.pow(color2.g - color1.g, 2);
    const bDifference = Math.pow(color2.b - color1.b, 2);

    return rDifference + gDifference + bDifference;
  };

  const arr = [];

  for (let i = 0; i < orderedByColor.length; i++) {
    const hexColor = rgbToHex(orderedByColor[i]);

    if (i > 0) {
      const difference = calculateColorDifference(
        orderedByColor[i],
        orderedByColor[i - 1],
      );

      // if the distance is less than 120 we ommit that color
      if (difference < 120) {
        continue;
      }
    }
    arr.push(hexColor);
  }

  return arr;
}
