import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { Skia, SkImage } from "@shopify/react-native-skia";
import { Canvas } from "@shopify/react-native-skia";
import { Image } from "@shopify/react-native-skia";
import getPixelColors from "./functions/getPixelColors";
import { useDispatch } from "react-redux";
import colorState from "./redux/ColorSlice";
import { useNavigation } from "expo-router";

const LIBRARY = "library";
const CAMERA = "camera";

const generateSkiaImage = async (path: string) => {
  return await Skia.Data.fromURI(path).then((data) =>
    Skia.Image.MakeImageFromEncoded(data),
  );
};

export default function PhotoPalette() {
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState<SkImage | null>(null);
  const [colors, setColors] = useState<string[]>([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  function goToEdit() {
    const newArr = [];
    for (let i = 0; i < colors.length; i++) {
      newArr.push({
        color: colors[i],
        locked: false,
        id: "id" + Math.random().toString(16).slice(2),
      });
    }
    dispatch(colorState.actions.setArray(newArr));
    navigation.navigate("Palette" as never);
  }

  async function uploadImage(method: string) {
    setLoad(true);
    setImage(null);
    setColors([]);
    let result;
    if (method === LIBRARY) {
      result = await launchImageLibrary({ mediaType: "photo" });
    } else {
      result = await launchCamera({ mediaType: "photo" });
    }
    if (result.errorCode) {
      setError(result.errorCode);
      setLoad(false);
      return;
    } else if (result.didCancel) {
      setLoad(false);
    }
    if (result.assets) {
      generateSkiaImage(result.assets[0].uri!)
      .then((value) => {
        if (value) {
          const arrPixels = value.readPixels();
          const arrColors = getPixelColors(arrPixels);
          setColors(arrColors);
          setImage(value);
          setLoad(false);
        }
      })
      .catch((e) => {setError(e); setLoad(false)});
    } else {setLoad(false)}
  }

  return (
    <View style={style.container}>
      <View style={style.uploadView}>
        <Text>Upload your image:</Text>
        <Pressable onPress={() => uploadImage(LIBRARY)} style={style.button}>
          <Text>From gallery</Text>
        </Pressable>
        <Pressable onPress={() => uploadImage(CAMERA)} style={style.button}>
          <Text>From camera</Text>
        </Pressable>
      </View>
      <View
        style={{
          height: "80%",
          width: "100%",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {load ? <ActivityIndicator animating={true} size="small" /> : null}
        {error ? <Text>Error: {error}</Text> : null}
        <View style={style.canvas}>
          <Canvas style={style.canvas}>
            {image ? (
              <Image image={image} width={300} height={300} fit="cover" />
            ) : null}
          </Canvas>
        </View>

        {colors.length ? (
          <Pressable style={{ width: "90%", height: "20%" }} onPress={goToEdit}>
            <View style={style.palette}>
              {colors.map((item, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: item,
                    justifyContent: "center",
                    alignItems: "center",
                    width: "25%",
                    height: "50%",
                  }}
                >
                  <Text>{item}</Text>
                </View>
              ))}
            </View>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white",
    alignItems: "center",
  },
  uploadView: {
    flexDirection: "row",
    width: "100%",
    height: "10%",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: "3%",
    borderBottomWidth: 1,
    borderBottomColor: "silver",
  },
  button: {
    borderWidth: 1,
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
    backgroundColor: "honeydew",
    borderRadius: 15,
  },
  canvas: {
    width: 305,
    height: 305,
  },

  palette: {
    width: "100%",
    height: "100%",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
});
