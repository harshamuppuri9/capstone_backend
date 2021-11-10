const {initializeApp} = require('firebase/app');
 firebaseConfig = {
    apiKey: "AIzaSyAD-D-52UWvO7lX5JMzKk0j4zk0Lxf6Fs4",
    authDomain: "capstone-b86f7.firebaseapp.com",
    projectId: "capstone-b86f7",
    storageBucket: "capstone-b86f7.appspot.com",
    messagingSenderId: "1044491106324",
    appId: "1:1044491106324:web:53e844b0312933d8bc0f01",
    measurementId: "G-6R1YLWW94X"
  };
  const app = initializeApp(firebaseConfig);
  module.exports = app;