"Palette" - pet-project, in that application you can generate colors, create palettes and save them in your account. Also there is a function to generate palette from either image or photo from a camera.
Project was create via Expo.

To store some data about the user(palettes, login, password) was used Firebase.

There is one module, that is written on Kotlin, from android material - Alert Dialog Module.

To generate palettes was used transforming an array of pixels(via canvas) into rgb, and then checking bigger range via recursion function(+luminance).

# Libraries:
1. For generating colors was used the library "randomcolor", that has some properties to generate colors (luminosity, hue).*
2. @shopify/react-native-skia - for canvas to get an image array of pixels.
3. react-native-firebase/ - to sign up and login, save palettes.
4. expo-clipboard - to copy text of the necessary color.
5. react-native-draggable-flatlist - to create a palette with effective, swift animation.*
6. react-native-image-picker - to get an image from the store of a phone or from a camera.
7. react-native-toast-message - to add tooltips.*
8. react-native-reanimated - for effective and swift animations that are used in watching palettes in the profile.
9. formik - for creating forms of sign in and sign up.
*On branch "without_libraries" you can see some work functions without using libraries.
