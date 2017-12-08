// firebase.js
import Vue from 'vue';
import firebase from 'firebase';
import VueFire from 'vuefire';
Vue.use(VueFire);

// Initialize Firebase
var config = {
    apiKey: 'AIzaSyBGlbmoiFO7_LR4BrRRmdEDijewDwdK4Aw',
    authDomain: 'upvote-cf339.firebaseapp.com',
    databaseURL: 'https://upvote-cf339.firebaseio.com',
    projectId: 'upvote-cf339',
    storageBucket: 'upvote-cf339.appspot.com',
    messagingSenderId: '481064603440'
};
export default firebase.initializeApp(config);
