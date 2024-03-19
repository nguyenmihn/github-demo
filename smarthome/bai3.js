const firebaseConfig = {
    apiKey: "AIzaSyAu6PCYrgqwalSNI4WDbQvIwzllsX5bH0s",
    authDomain: "smarthome-c947f.firebaseapp.com",
    projectId: "smarthome-c947f",
    storageBucket: "smarthome-c947f.appspot.com",
    messagingSenderId: "609241098365",
    appId: "1:609241098365:web:b6c5620d50c7b34166e914",
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var sliderNgang = document.getElementById("sliderNgangId");
var bulb01 = document.getElementById("bulb01");
sliderNgang.oninput = function(){
    document.getElementById("sliderNgangValue").innerHTML = sliderNgang.value;
    bulb01.style.opacity = sliderNgang.value/10;
}
var sliderNgang02 = document.getElementById("sliderNgangId02");
var bulb02 = document.getElementById("bulb02");
sliderNgang02.oninput = function(){
    document.getElementById("sliderNgangValue02").innerHTML = sliderNgang02.value;
    bulb02.style.opacity = sliderNgang02.value/10;
}
var sliderNgang03 = document.getElementById("sliderNgangId03");
var bulb03 = document.getElementById("bulb03");
sliderNgang03.oninput = function(){
    document.getElementById("sliderNgangValue03").innerHTML = sliderNgang03.value;
    bulb03.style.opacity = sliderNgang03.value/10;
}

firebase.database().ref("/TT_IOT/living_room/temperature").on("value",function(snapshot){
    var nd1 = snapshot.val();  
    document.getElementById("nhietdo1").innerHTML = nd1;
    console.log(nd1);
  });
  
  // Auto load Humirity-------------------------
  firebase.database().ref("/TT_IOT/living_room/humidity").on("value",function(snapshot){
    var da1 = snapshot.val();  
    document.getElementById("doam1").innerHTML = da1;
    console.log(da1);
  });
  firebase.database().ref("/TT_IOT/living_room/light").on("value",function(snapshot){
    var as1 = snapshot.val();  
    document.getElementById("anhsang1").innerHTML = as1;
    console.log(as1);
  });
  
  // Auto load Humirity-------------------------
  firebase.database().ref("/TT_IOT/living_room/gas").on("value",function(snapshot){
    var kg1 = snapshot.val();  
    document.getElementById("khigas1").innerHTML = kg1;
    console.log(kg1);
  });


  firebase.database().ref("/TT_IOT/bed_room/temperature").on("value",function(snapshot){
    var nd2 = snapshot.val();  
    document.getElementById("nhietdo2").innerHTML = nd2;
    console.log(nd2);
  });
  
  // Auto load Humirity-------------------------
  firebase.database().ref("/TT_IOT/bed_room/humidity").on("value",function(snapshot){
    var da2 = snapshot.val();  
    document.getElementById("doam2").innerHTML = da2;
    console.log(da2);
  });
  firebase.database().ref("/TT_IOT/bed_room/light").on("value",function(snapshot){
    var as2 = snapshot.val();  
    document.getElementById("anhsang2").innerHTML = as2;
    console.log(as2);
  });
  
  // Auto load Humirity-------------------------
  firebase.database().ref("/TT_IOT/bed_room/gas").on("value",function(snapshot){
    var kg2 = snapshot.val();  
    document.getElementById("khigas2").innerHTML = kg2;
    console.log(kg2);
  });

  firebase.database().ref("/TT_IOT/kitchen/temperature").on("value",function(snapshot){
    var nd3 = snapshot.val();  
    document.getElementById("nhietdo3").innerHTML = nd3;
    console.log(nd3);
  });
  
  // Auto load Humirity-------------------------
  firebase.database().ref("/TT_IOT/kitchen/humidity").on("value",function(snapshot){
    var da3 = snapshot.val();  
    document.getElementById("doam3").innerHTML = da3;
    console.log(da3);
  });
  firebase.database().ref("/TT_IOT/kitchen/light").on("value",function(snapshot){
    var as3 = snapshot.val();  
    document.getElementById("anhsang3").innerHTML = as3;
    console.log(as3);
  });
  
  // Auto load Humirity-------------------------
  firebase.database().ref("/TT_IOT/kitchen/gas").on("value",function(snapshot){
    var kg3 = snapshot.val();  
    document.getElementById("khigas3").innerHTML = kg3;
    console.log(kg3);
  });

  //document.addEventListener("DOMContentLoaded", function () {
    const toggleButtons = document.querySelectorAll(".toggle-btn");

    toggleButtons.forEach(function (button) {
        const deviceId = button.dataset.deviceId;

        // Lắng nghe sự thay đổi từ Firebase khi có sự kiện value
        firebase.database().ref(`/TT_IOT/living_room/${deviceId}`).on('value', function(snapshot) {
            const status = snapshot.val();

            // Find the corresponding status element dynamically
            const statusElement = document.querySelector(`.toggle-status[data-device-id="${deviceId}"]`);

            if (statusElement) {
                statusElement.textContent = status;

                // Đảm bảo trạng thái của nút toggle được cập nhật phù hợp
                button.classList.toggle("active", status === "ON");
            } else {
                console.error(`Status element not found for deviceId: ${deviceId}`);
            }
        });

        // Xử lý sự kiện khi nút toggle được nhấn
        button.addEventListener("click", function () {
            // Đọc trạng thái hiện tại từ Firebase
            firebase.database().ref(`/TT_IOT/living_room/${deviceId}`).once('value').then(function(snapshot) {
                const currentStatus = snapshot.val();
                const newStatus = currentStatus === "ON" ? "OFF" : "ON";

                // Cập nhật trạng thái trên Firebase
                updateFirebaseStatus(deviceId, newStatus);
            }).catch(function(error) {
                console.error("Error reading current status from Firebase:", error);
            });
        });
    });

    function updateFirebaseStatus(deviceId, status) {
        const updates = {};
        updates[`/TT_IOT/living_room/${deviceId}`] = status;
        console.log(deviceId);
        firebase.database().ref().update(updates)
            .then(function () {
                console.log("Firebase updated successfully");
            })
            .catch(function (error) {
                console.error("Error updating Firebase:", error);
            });
    }
 //});



// document.addEventListener("DOMContentLoaded", function () {
     //const toggleButtons = document.querySelectorAll(".toggle-btn");

//     toggleButtons.forEach(function (button) {
//         const deviceId = button.dataset.deviceId;

//         // Lắng nghe sự thay đổi từ Firebase khi có sự kiện value
//         firebase.database().ref(`/TT_IOT/bed_room/${deviceId}`).on('value', function(snapshot) {
//             const status = snapshot.val();

//             // Find the corresponding status element dynamically
//             const statusElement = document.querySelector(`.toggle-status[data-device-id="${deviceId}"]`);

//             if (statusElement) {
//                 statusElement.textContent = status;

//                 // Đảm bảo trạng thái của nút toggle được cập nhật phù hợp
//                 button.classList.toggle("active", status === "ON");
//             } else {
//                 console.error(`Status element not found for deviceId: ${deviceId}`);
//             }
//         });

//         // Xử lý sự kiện khi nút toggle được nhấn
//         button.addEventListener("click", function () {
//             // Đọc trạng thái hiện tại từ Firebase
//             firebase.database().ref(`/TT_IOT/bed_room/${deviceId}`).once('value').then(function(snapshot) {
//                 const currentStatus = snapshot.val();
//                 const newStatus = currentStatus === "ON" ? "OFF" : "ON";

//                 // Cập nhật trạng thái trên Firebase
//                 updateFirebaseStatus(deviceId, newStatus);
//             }).catch(function(error) {
//                 console.error("Error reading current status from Firebase:", error);
//             });
//         });
//     // });

//     function updateFirebaseStatus(deviceId, status) {
//         const updates = {};
//         updates[`/TT_IOT/bed_room/${deviceId}`] = status;

//         firebase.database().ref().update(updates)
//             .then(function () {
//                 console.log("Firebase updated successfully");
//             })
//             .catch(function (error) {
//                 console.error("Error updating Firebase:", error);
//             });
//     }
// });

// document.addEventListener("DOMContentLoaded", function () {
    // const toggleButtons = document.querySelectorAll(".toggle-btn");

    toggleButtons.forEach(function (button) {
        const deviceId = button.dataset.deviceId;

        // Lắng nghe sự thay đổi từ Firebase khi có sự kiện value
        firebase.database().ref(`/TT_IOT/kitchen/${deviceId}`).on('value', function(snapshot) {
            const status = snapshot.val();

            // Find the corresponding status element dynamically
            const statusElement = document.querySelector(`.toggle-status[data-device-id="${deviceId}"]`);

            if (statusElement) {
                statusElement.textContent = status;

                // Đảm bảo trạng thái của nút toggle được cập nhật phù hợp
                button.classList.toggle("active", status === "ON");
            } else {
                console.error(`Status element not found for deviceId: ${deviceId}`);
            }
        });

        // Xử lý sự kiện khi nút toggle được nhấn
        button.addEventListener("click", function () {
            // Đọc trạng thái hiện tại từ Firebase
            firebase.database().ref(`/TT_IOT/kitchen/${deviceId}`).once('value').then(function(snapshot) {
                const currentStatus = snapshot.val();
                const newStatus = currentStatus === "ON" ? "OFF" : "ON";

                // Cập nhật trạng thái trên Firebase
                updateFirebaseStatus(deviceId, newStatus);
            }).catch(function(error) {
                console.error("Error reading current status from Firebase:", error);
            });
        });
    // });

    function updateFirebaseStatus(deviceId, status) {
        const updates = {};
        updates[`/TT_IOT/kitchen/${deviceId}`] = status;

        firebase.database().ref().update(updates)
            .then(function () {
                console.log("Firebase updated successfully");
            })
            .catch(function (error) {
                console.error("Error updating Firebase:", error);
            });
    }
});
// Lấy thẻ input và div hiển thị giá trị
// var slider = document.getElementById("slider");
// var sliderValue = document.getElementById("slider-value");

// // Cập nhật giá trị khi slider thay đổi
// slider.addEventListener("input", function() {
//     sliderValue.textContent = "Value: " + slider.value;
// });

// function switchPage(evt, pageName) {
//     var i, sections, links;
//     sections = document.getElementsByTagName("section");
//     for (i = 0; i < sections.length; i++) {
//       sections[i].style.display = "none";
//     }
//     links = document.getElementsByClassName("active");
//     for (i = 0; i < links.length; i++) {
//       links[i].classList.remove("active");
//     }
//     var targetSection = document.getElementById(pageName);
//     if (targetSection.style.display !== "flex") {
//       targetSection.style.display = "flex";
//       evt.currentTarget.classList.add("active");
// }
// }

document.getElementById('air1').addEventListener('click', function() {
    if (this.checked) {
        console.log("Checkbox is ON");

        firebase.database().ref("/TT_IOT/living_room").update({
        "air_condition": "ON"
        })
    } else {
        console.log("Checkbox is OFF");

        firebase.database().ref("/TT_IOT/living_room").update({
        "air_condition": "OFF"
        })
    }
});
firebase.database().ref("/TT_IOT/living_room").get().then((snapshot) => {
    if(snapshot.exists()){
      console.log(snapshot.val())
  
      var bulb_01_status = snapshot.val()
      if (bulb_01_status["air_condition"] == "ON") {
        document.getElementById("air1").checked=true
      }
      else{
        document.getElementById("air1").checked=false
      }
    }
    else
      console.log("No data available!")
  })


document.getElementById('air2').addEventListener('click', function() {
    if (this.checked) {
        console.log("Checkbox is ON");

        firebase.database().ref("/TT_IOT/bed_room").update({
        "air_condition": "ON"
        })
    } else {
        console.log("Checkbox is OFF");

        firebase.database().ref("/TT_IOT/bed_room").update({
        "air_condition": "OFF"
        })
    }
});
firebase.database().ref("/TT_IOT/bed_room").get().then((snapshot) => {
    if(snapshot.exists()){
      console.log(snapshot.val())
  
      var bulb_01_status = snapshot.val()
      if (bulb_01_status["air_condition"] == "ON") {
        document.getElementById("air2").checked=true
      }
      else{
        document.getElementById("air2").checked=false
      }
    }
    else
      console.log("No data available!")
  })

  /////////////////////////
  document.getElementById('dish2').addEventListener('click', function() {
    if (this.checked) {
        console.log("Checkbox is ON");

        firebase.database().ref("/TT_IOT/bed_room").update({
        "dishwasher": "ON"
        })
    } else {
        console.log("Checkbox is OFF");

        firebase.database().ref("/TT_IOT/bed_room").update({
        "dishwasher": "OFF"
        })
    }
});
firebase.database().ref("/TT_IOT/bed_room").get().then((snapshot) => {
    if(snapshot.exists()){
      console.log(snapshot.val())
  
      var bulb_01_status = snapshot.val()
      if (bulb_01_status["dishwasher"] == "ON") {
        document.getElementById("dish2").checked=true
      }
      else{
        document.getElementById("dish2").checked=false
      }
    }
    else
      console.log("No data available!")
  })
  /////////////////////////
  document.getElementById('fan2').addEventListener('click', function() {
    if (this.checked) {
        console.log("Checkbox is ON");

        firebase.database().ref("/TT_IOT/bed_room").update({
        "fan": "ON"
        })
    } else {
        console.log("Checkbox is OFF");

        firebase.database().ref("/TT_IOT/bed_room").update({
        "fan": "OFF"
        })
    }
});
firebase.database().ref("/TT_IOT/bed_room").get().then((snapshot) => {
    if(snapshot.exists()){
      console.log(snapshot.val())
  
      var bulb_01_status = snapshot.val()
      if (bulb_01_status["fan"] == "ON") {
        document.getElementById("fan2").checked=true
      }
      else{
        document.getElementById("fan2").checked=false
      }
    }
    else
      console.log("No data available!")
  })
  
/////////////////////////////////////
document.getElementById('robot2').addEventListener('click', function() {
  if (this.checked) {
      console.log("Checkbox is ON");

      firebase.database().ref("/TT_IOT/bed_room").update({
      "robot": "ON"
      })
  } else {
      console.log("Checkbox is OFF");

      firebase.database().ref("/TT_IOT/bed_room").update({
      "robot": "OFF"
      })
  }
});
firebase.database().ref("/TT_IOT/bed_room").get().then((snapshot) => {
  if(snapshot.exists()){
    console.log(snapshot.val())

    var bulb_01_status = snapshot.val()
    if (bulb_01_status["robot"] == "ON") {
      document.getElementById("robot2").checked=true
    }
    else{
      document.getElementById("robot2").checked=false
    }
  }
  else
    console.log("No data available!")
})
/////////////////////////////////////
document.getElementById('Television2').addEventListener('click', function() {
  if (this.checked) {
      console.log("Checkbox is ON");

      firebase.database().ref("/TT_IOT/bed_room").update({
      "Television": "ON"
      })
  } else {
      console.log("Checkbox is OFF");

      firebase.database().ref("/TT_IOT/bed_room").update({
      "Television": "OFF"
      })
  }
});
firebase.database().ref("/TT_IOT/bed_room").get().then((snapshot) => {
  if(snapshot.exists()){
    console.log(snapshot.val())

    var bulb_01_status = snapshot.val()
    if (bulb_01_status["Television"] == "ON") {
      document.getElementById("Television2").checked=true
    }
    else{
      document.getElementById("Television2").checked=false
    }
  }
  else
    console.log("No data available!")
})

/////////////////////////////////////////////////////////////////////
  document.getElementById('air3').addEventListener('click', function() {
    if (this.checked) {
        console.log("Checkbox is ON");

        firebase.database().ref("/TT_IOT/kitchen").update({
        "air_condition": "ON"
        })
    } else {
        console.log("Checkbox is OFF");

        firebase.database().ref("/TT_IOT/kitchen").update({
        "air_condition": "OFF"
        })
    }
});
firebase.database().ref("/TT_IOT/kitchen").get().then((snapshot) => {
    if(snapshot.exists()){
      console.log(snapshot.val())
  
      var bulb_01_status = snapshot.val()
      if (bulb_01_status["air_condition"] == "ON") {
        document.getElementById("air3").checked=true
      }
      else{
        document.getElementById("air3").checked=false
      }
    }
    else
      console.log("No data available!")
  })
/////////////////////////////////////////////////////////////////////
document.getElementById('dishwasher3').addEventListener('click', function() {
  if (this.checked) {
      console.log("Checkbox is ON");

      firebase.database().ref("/TT_IOT/kitchen").update({
      "dishwasher": "ON"
      })
  } else {
      console.log("Checkbox is OFF");

      firebase.database().ref("/TT_IOT/kitchen").update({
      "dishwasher": "OFF"
      })
  }
});
firebase.database().ref("/TT_IOT/kitchen").get().then((snapshot) => {
  if(snapshot.exists()){
    console.log(snapshot.val())

    var bulb_01_status = snapshot.val()
    if (bulb_01_status["dishwasher"] == "ON") {
      document.getElementById("dishwasher3").checked=true
    }
    else{
      document.getElementById("dishwasher3").checked=false
    }
  }
  else
    console.log("No data available!")
})

/////////////////////////////////////////////////////////////////////
document.getElementById('Fan3').addEventListener('click', function() {
  if (this.checked) {
      console.log("Checkbox is ON");

      firebase.database().ref("/TT_IOT/kitchen").update({
      "Fan": "ON"
      })
  } else {
      console.log("Checkbox is OFF");

      firebase.database().ref("/TT_IOT/kitchen").update({
      "Fan": "OFF"
      })
  }
});
firebase.database().ref("/TT_IOT/kitchen").get().then((snapshot) => {
  if(snapshot.exists()){
    console.log(snapshot.val())

    var bulb_01_status = snapshot.val()
    if (bulb_01_status["Fan"] == "ON") {
      document.getElementById("Fan3").checked=true
    }
    else{
      document.getElementById("Fan3").checked=false
    }
  }
  else
    console.log("No data available!")
})
/////////////////////////////////////////////////////////////////////
document.getElementById('robot3').addEventListener('click', function() {
  if (this.checked) {
      console.log("Checkbox is ON");

      firebase.database().ref("/TT_IOT/kitchen").update({
      "robot": "ON"
      })
  } else {
      console.log("Checkbox is OFF");

      firebase.database().ref("/TT_IOT/kitchen").update({
      "robot": "OFF"
      })
  }
});
firebase.database().ref("/TT_IOT/kitchen").get().then((snapshot) => {
  if(snapshot.exists()){
    console.log(snapshot.val())

    var bulb_01_status = snapshot.val()
    if (bulb_01_status["robot"] == "ON") {
      document.getElementById("robot3").checked=true
    }
    else{
      document.getElementById("robot3").checked=false
    }
  }
  else
    console.log("No data available!")
})

/////////////////////////////////////////////////////////////////////
document.getElementById('Television3').addEventListener('click', function() {
  if (this.checked) {
      console.log("Checkbox is ON");

      firebase.database().ref("/TT_IOT/kitchen").update({
      "Television": "ON"
      })
  } else {
      console.log("Checkbox is OFF");

      firebase.database().ref("/TT_IOT/kitchen").update({
      "Television": "OFF"
      })
  }
});
firebase.database().ref("/TT_IOT/kitchen").get().then((snapshot) => {
  if(snapshot.exists()){
    console.log(snapshot.val())

    var bulb_01_status = snapshot.val()
    if (bulb_01_status["Television"] == "ON") {
      document.getElementById("Television3").checked=true
    }
    else{
      document.getElementById("Television3").checked=false
    }
  }
  else
    console.log("No data available!")
})
// Auto load Gas tu Firebase qua HTML-------------------------
firebase.database().ref("/TT_IOT/living_room/bt_light").on("value",function(snapshot){
  var bt_light = snapshot.val();  
  document.getElementById("sliderNgangValue").innerHTML = bt_light;
  console.log(bt_light);
}); 

//Update Gas tu HTML qua Firebase--------------------------------
var sliderNgangbt_light = document.getElementById("sliderNgangId");
sliderNgangbt_light.oninput = function(){
  document.getElementById("sliderNgangValue").innerHTML = sliderNgangbt_light.value;  
  firebase.database().ref("/TT_IOT/living_room").update({
      "bt_light": sliderNgangbt_light.value
  })
}

// Auto load Gas tu Firebase qua HTML-------------------------
firebase.database().ref("/TT_IOT/bed_room/bt_light").on("value",function(snapshot){
  var bt_light1 = snapshot.val();  
  document.getElementById("sliderNgangValue02").innerHTML = bt_light1;
  console.log(bt_light1);
}); 

//Update Gas tu HTML qua Firebase--------------------------------
var sliderNgangbt_light1 = document.getElementById("sliderNgangId02");
sliderNgangbt_light1.oninput = function(){
  document.getElementById("sliderNgangValue02").innerHTML = sliderNgangbt_light1.value;  
  firebase.database().ref("/TT_IOT/bed_room").update({
      "bt_light": sliderNgangbt_light1.value
  })
}

// Auto load Gas tu Firebase qua HTML-------------------------
firebase.database().ref("/TT_IOT/kitchen/bt_light").on("value",function(snapshot){
  var bt_light2 = snapshot.val();  
  document.getElementById("sliderNgangValue03").innerHTML = bt_light2;
  console.log(bt_light2);
}); 

//Update Gas tu HTML qua Firebase--------------------------------
var sliderNgangbt_light2 = document.getElementById("sliderNgangId03");
sliderNgangbt_light2.oninput = function(){
  document.getElementById("sliderNgangValue03").innerHTML = sliderNgangbt_light2.value;  
  firebase.database().ref("/TT_IOT/kitchen").update({
      "bt_light": sliderNgangbt_light2.value
  })
}
var slider = document.getElementById("slider");
var sliderValue = document.getElementById("slider-value");

// Cập nhật giá trị khi slider thay đổi
slider.addEventListener("input", function() {
    sliderValue.textContent = "Value: " + slider.value;
});

function switchPage(evt, pageName) {
    var i, sections, links;
    sections = document.getElementsByTagName("section");
    for (i = 0; i < sections.length; i++) {
      sections[i].style.display = "none";
    }
    links = document.getElementsByClassName("active");
    for (i = 0; i < links.length; i++) {
      links[i].classList.remove("active");
    }
    var targetSection = document.getElementById(pageName);
    if (targetSection.style.display !== "flex") {
      targetSection.style.display = "flex";
      evt.currentTarget.classList.add("active");
}
}