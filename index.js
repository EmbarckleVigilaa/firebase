const firebaseConfig = {

    apiKey: "AIzaSyBttOnuM6_7j5xUSYtorCuj-DMBoJliCuQ",

    authDomain: "authentication-a96d8.firebaseapp.com",

    projectId: "authentication-a96d8",

    storageBucket: "authentication-a96d8.appspot.com",

    messagingSenderId: "184025031967",

    appId: "1:184025031967:web:db5bf1ad2c2c2598a77c2a",

    measurementId: "G-XY2H200M44"

  };


  // Initialize Firebase

  const app = initializeApp(firebaseConfig);

  const analytics = getAnalytics(app);


  const auth=firebase.auth();
  const database=firebase.database();

  function register(){
    var name=document.getElementById("name").value;
    var email=document.getElementById("email").value;
    var password=document.getElementById("password").value;

  }
