# CarPC
React App designed to run on a raspberry pi and make driving my car more fun.

## Problem this solves
Driving my car with only a radio got quite boring. I decided to build my own car infotainment system. I mainly wanted a solution to play the music and audio books I like.

### Prerequisites
-Node (latest version 9+)

-Yarn (or npm but install tutorial uses yarn)

-Python 3 (latest version)

### Hardware
-raspberry pi 3

-touchscreen

-odb2 to serial adapter

### Installing demo

Clone this repository

```
git clone https://github.com/Arthie/CarPC.git 
```

Run yarn in the directory to download dependencies
```
yarn
```

Open the server.js file located in server folder and change the rootfolder variable to a folder path with music files
/server/server.js :
```
const ROOTFOLDER = "Your folder path"
```

Run yarn build to build the project for production

```
yarn build
```

Run yarn server to start the production server
```
yarn server
```

Open your browser an go to http://localhost:3005/
(this app was build for the latest version of chrome if u encounter any issues make sure to check your version) 

To run the development server run yarn start
```
yarn start
```

### Installing and connecting to obd port of your car

-tutorial coming soon

## Built With

* [React]() - Front end web framework
* [Create react app]() - React build tool
* [Styled-components]() - CSS in JS framework
* [Express]() - Web server
* [Redux]() - State management
* [Socket.io]() - Realtime server / client connection


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Thanks to anyone who's code was used
