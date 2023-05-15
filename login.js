import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
 import {  getAuth,onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
  import { getDatabase,ref,set,child,get,update,remove,push,onValue } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use

// // https://firebase.google.com/docs/web/setup#available-libraries


 // Your web app's Firebase configuration
 const firebaseConfig = {

  apiKey: "AIzaSyDSFrxEq8xCpMDz0xOvp76eYP8ADlS09jM",

  authDomain: "test-4e629.firebaseapp.com",

  projectId: "test-4e629",

  storageBucket: "test-4e629.appspot.com",

  messagingSenderId: "677161192951",

  appId: "1:677161192951:web:ee82a230181482f2fa32f2"

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase();

const signUpName = document.getElementById("name");
const signUpEmail = document.getElementById("email");
const signUpPassword = document.getElementById("password");
const signInButton = document.getElementById("loginButton");
const signUpButton = document.getElementById("signinButton");
const addDateButton = document.getElementById("add-date");

let user = null;

const userSignUp = async () => {
  createUserWithEmailAndPassword(auth, signUpEmail.value, signUpPassword.value)
    .then((userCredential) => {
      user = userCredential.user;
      console.log(user);
      alert("Your account has been created!");
   
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + errorMessage);
    });
};

const userSignIn = async () => {
  signInWithEmailAndPassword(auth, signUpEmail.value, signUpPassword.value)
    .then((userCredential) => {
      user = userCredential.user;
      alert("You have signed in successfully!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + errorMessage);
    });
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    const databaseRef = ref(db, `users/`);
    const addDateButton = document.getElementById("add-date");
    console.log("addDateButton", addDateButton);

    var newDateInput = document.getElementById("new-date");
      var newContentInput = document.getElementById("new-content");
    addDateButton.addEventListener("click", () => {
      const newDate = newDateInput.value;
      const newContent = newContentInput.value;
      console.log("Adding new date...");
      console.log("New date:", newDate);
      console.log("New content:", newContent);

        const newDateRef = child(databaseRef, `${signUpName.value}/${newDate}`);
        get(newDateRef).then((snapshot) => {
          if (snapshot.exists()) {
            console.log("Date already exists");
            var res=confirm("Do you wish to edit?")
            if(res===true){
                const newDateObject = { Content: newContent};
            set(newDateRef, newDateObject);
            console.log("New date added");
           
            }else{
                console.log("no need to edit")
                
            }
          } else {
            const newDateObject = { Content: newContent};
            set(newDateRef, newDateObject);
            console.log("New date added");
          }
        });
      });
    }
});

signUpButton.addEventListener("click", userSignUp);
signInButton.addEventListener("click", userSignIn);