# WVUPlayersCompanion

*******NOTE***************
    MattFinished is the branch that was used for the demonstration at the expo although some minor errors existed in it like the login functionality. This is the most up to date branch.
    
GETTING STARTED: 
    For NON Mac Users: You need to install ExpoGo and other dependencies. Directions can be found at: https://docs.expo.dev/get-started/installation/

    Download the ExpoGo app on your phone. 

    Run the command: npx expo start
    Make sure Both devices are connected to the internet. To use WVU wifi you need to switch the wifi to private network (Make sure you change it back after using the app.)

PACKAGE INSTALLATION: 
    Package Instalation general format: npx expo install react-native-reanimated , npm i "react-native-ui-lib"

    Make sure you install the following packages (can be found in package-json): 
         "@react-native-community/checkbox": "^0.5.15",
         "@react-native-community/masked-view": "^0.1.11",
        "@react-navigation/native": "^6.1.6",
         "@react-navigation/native-stack": "^6.9.12",
        "moment": "^2.29.4",
        "mssql": "^9.1.1",
        "react": "18.2.0",
        "react-native": "0.71.1",
        "react-native-blob-util": "^0.17.3",
        "react-native-date-picker": "^4.2.10",
        "react-native-datepicker": "^1.7.2",
        "react-native-gesture-handler": "^2.9.0",
        "react-native-pdf": "^6.6.2",
        "react-native-reanimated": "^3.1.0",
        "react-native-safe-area-context": "^4.5.0",
        "react-native-screens": "^3.20.0",
        "react-native-shadow": "^1.2.2",
        "react-native-ui-lib": "^7.2.4",
        "react-native-view-pdf": "^0.14.0",
        "react-native-webview": "^11.26.1"


How to Access DB:

    Login with WVU Account switch mix with mail

    https://portal.azure.com/#@WestVirginiaUniversity.onmicrosoft.com/resource/subscriptions/f8722ad4-9f84-4b54-a185-b641ac80f101/resourceGroups/202208-CSEE480-C01-84850-Group14_15-01/providers/Microsoft.Sql/servers/wvurms/overview

    Scroll down to WVU RMS APP.

    Click Set Server Firewall.

    Add Your Client IPv4 Address

    Save

    Issues To work through: 
        Login/Logout Functionality 
        Efficiently Loading data onto the next page without buffer pages
        Flexability with Youtube Video Display 
        If Use of UseEffects and React Hooks are even Necessary on certain screen (efficiency)


