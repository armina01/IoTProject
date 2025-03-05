


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getDatabase, ref, set, onValue, get } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBH1Lf7ujY8LcjD0V5N6ddGs2KxvPUadSs",
  authDomain: "plant-watering-system-67b6d.firebaseapp.com",
  databaseURL: "https://plant-watering-system-67b6d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "plant-watering-system-67b6d",
  storageBucket: "plant-watering-system-67b6d.appspot.com",
  messagingSenderId: "1080605592274",
  appId: "1:1080605592274:web:45c361d9926019ff73bb0b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service 
const database = getDatabase(app);


  window.addPumpStatusToData = async function() {
    const db = getDatabase(app);
    const dataRef = ref(db, "data");

    // Dohvati trenutne podatke iz "data"
    const snapshot = await get(dataRef);
    const currentData = snapshot.val();

    // Ako nema trenutnih podataka, inicijaliziraj prazan objekt
    const newData = currentData || {};

    // Dodaj novi atribut "PumpStatus" samo ako već nije prisutan
    if (!newData.hasOwnProperty("PumpStatus")) {
        // Postavi vrednost "PumpStatus" kao boolean (true/false)
        newData.PumpStatus = false; //  false (OFF)
        // Postavi ažurirane podatke u "data"
        await set(dataRef, newData);
        console.log("PumpStatus added to data with initial value OFF");
    } else {
        console.log("PumpStatus already present in data");
    }
}

addPumpStatusToData();

//let trenutnaVlaznost=0;
//let optimalnaVlaznost=5;

//referenca na "data" dio u firebase bazi
const dataRef = ref(database, 'data'); 

   function getData() {

    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Updated data:", data);
  
      if (data) {
        //trenutnaVlaznost=data.SoilMoisture; 
        console.log("Soil Moisture:", data.SoilMoisture);
        document.getElementById("currentHumidityValue").innerHTML = `${data.SoilMoisture}%`;
      }
    }, 
    {
      onlyOnce: false   //funk getData ce se izvrsavati svaki put kad se promijeni vrijednost
    });


    let pumpStatus = false;

  }
  
  getData();
 
  let pumpStatus = false;

  window.togglePump = function() {
    pumpStatus = !pumpStatus;
    const controlButton = document.getElementById('control-button');
    controlButton.textContent = pumpStatus ? 'OFF' : 'ON';
    
     // Ažurirajte prikaz statusa pumpe
     var pumpStatusElement = document.getElementById("pumpStatusValue");
     pumpStatusElement.textContent = pumpStatus ? "Uključena" : "Isključena";


    // Update the real-time status in Firebase
    updatePumpStatus(pumpStatus);
  }

  // Function to update pump status in the Firebase database

  function updatePumpStatus(status) {
    const pumpStatusRef = ref(database, 'data/PumpStatus');
  
    set(pumpStatusRef, status)
      .then(() => {
        console.log(`PumpStatus updated to: ${status}`);
      })
      .catch((error) => {
        console.error('Error updating PumpStatus:', error.message);
      });
  }

  

