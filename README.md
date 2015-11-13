#Description
Toronto 2015 DementiaHack

#Configrations

    # start
    ionic start clio tabs -i co.cipherbank.clio
    
    # create a new repository on the command line
    git init
    
    git add .
    git commit -m "first commit"
    git remote add origin https://github.com/alpenliebe/clio
    git push -u origin master
        
    # add Android platform
    ionic platforms add android

    # add core plugin-*
    cordova plugin add cordova-plugin-device
    cordova plugin add cordova-plugin-console
    cordova plugin add cordova-plugin-splashscreen
    cordova plugin add cordova-plugin-statusbar
    cordova plugin add ionic-plugin-keyboard
    cordova plugin add cordova-plugin-whitelist
    
    # add plugin-*
    cordova plugin add cordova-plugin-device-orientation
    cordova plugin add cordova-plugin-geolocation
    cordova plugin add cordova-plugin-inappbrowser
    cordova plugin add uk.co.workingedge.phonegap.plugin.launchnavigator
    cordova plugin add www/CordovaMuse

    # lib update
    cordova plugin remove com.cordova.plugins.muse
    cordova plugin remove cordova-plugin-console
    npm install cordova-plugin-console
    npm install
    ionic lib update
    bower update
    
    # meta tag
    <meta http-equiv="Content-Security-Policy" content="default-src *; script-src 'self' 'unsafe-inline' 'unsafe-eval' *; style-src  'self' 'unsafe-inline' *">

    
    # launch simulator
    ionic emulate android
    
    # run on device with live and console
    ionic run android -l -c
    
    
#Credit
    Stone Chao(Shitong Zhao) - Developer
    Dave Dowhaniuk - UX
    Dano - Neuroscientist
    Fahad - Sale/Pitch
    Icon made by Freepik from www.flaticon.com
