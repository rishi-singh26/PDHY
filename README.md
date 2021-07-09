[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/rishi-singh26/Expo_firebase_boilerplate)

# PDHY

## Installation

```sh
$ git clone https://github.com/rishi-singh26/PDHY.git
Clones this repo
$ npm install
Install all the node modules
```

### Firebase credentials setup and Opencage geolocation API setup

- Create a new folder named "Constants" in the root directory.
- Inside "Constants" foldar create a file by name "Apis.js".
- Inside "Apis.js" copy the code below.
- Generate your Opencage API_KEY
- Place your API key in place of "YOUR_OPENCAGE_API_KEY".

```sh
import * as firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "AUTH_DOMAIN",
  databaseURL: "DATABASE_URL",
  projectId: "PRIJECT_ID",
  storageBucket: "STORAGE_BUCKET",
  messagingSenderId: "MESSAGING_SENDER_ID",
  appId: "APP_ID",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const cloudStorage = firebase.storage();

const key = "YOUR_OPENCAGE_API_KEY";

export const geoCoderApi = (latitude, longitude) => {
  return `https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C%20${longitude}&key=${key}&language=en&pretty=1`;
};
```

### Google Maps Setup

- Rename the "dummy_app.json" file present in the root directory to "app.json".
- Inside "app.json" file replace "YOUR_GOOGLE_MAPS_API_KEY" with your google maps api key.

```sh
"config": {
  "googleMaps": {
    "apiKey": "YOUR_GOOGLE_MAPS_API_KEY"
  }
},
```
