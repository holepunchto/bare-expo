# Bare on Expo

Example of embedding Bare in an Expo application using [react-native-bare-kit](https://github.com/holepunchto/react-native-bare-kit).

## Setup

1. clonse the repo
   
   `git clone https://github.com/holepunchto/bare-expo.git`
   
2. install dependencies

   ```sh
   cd bare expo
   npm install
   ```

----

## Run on device

1. Run On Android
   
    ```sh
    npm run android
    ``` 

> [!IMPORTANT]
> Run on android simulator is currently broken due to https://groups.google.com/g/v8-users/c/1ZneXAPUk60

> [!IMPORTANT]
> edit `android/build.gradle` and set `minSdkVersion` to `31` if you got gradle imcompatible error

2. Run on iOS

     ```sh
     npm run ios
     ```

## License

Apache-2.0
