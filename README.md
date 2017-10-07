# TravelNext


### Schema
Explained in `database.rules.json`

# Android APK Signing

Release key is included in the main project folder as
`android-release-key.keystore`.

Password for it is `@bawespass`

If you lose the release key you are no longer able to submit updates to the appstore.

It was created using the following command:
`keytool -genkey -v -keystore android-release-key.keystore -alias travelnext_android -keyalg RSA -keysize 2048 -validity 10000`

## Signing the unsigned APK

### Alias

When asked for Alias it is `travelnext_android`

### Jarsigner
`jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore android-release-key.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk travelnext_android`

This signs the apk in place.

### Zipalign

Finally, we need to run the zip align tool to optimize the APK. The zipalign tool can be found in ``/path/to/Android/sdk/build-tools/VERSION/zipalign`.

For example, on OS X with Android Studio installed, zipalign is in `~/Library/Android/sdk/build-tools/VERSION/zipalign`

`./zipalign -v 4 /Users/BAWES/Sites/travelnext/platforms/android/build/outputs/apk/android-release-unsigned.apk /Users/BAWES/Sites/travelnext/platforms/android/build/outputs/apk/android-signed.apk`

Now we have our final release binary called HelloWorld.apk and we can release this on the Google Play Store for all the world to enjoy!


## Get Key Hash for Facebook

`cat deployment_cert.der | openssl sha1 -binary | openssl base64`