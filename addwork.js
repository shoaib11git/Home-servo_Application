let savework = document.querySelector("#savework");






let customer_id = localStorage.getItem("customer_id");

savework.addEventListener("click", async (e) => {
  e.preventDefault();

let dno = document.getElementById("dno").value;
let street = document.getElementById("street").value;
let landmark = document.getElementById("landmark").value;
let district = document.getElementById("district").value;
let state = document.getElementById("state").value;
let pincode = document.getElementById("pincode").value;
let workname = document.querySelector("#workname");

  if (dno == "") {
    dno = localStorage.getItem("customer_doorNo");
  }
  if (street == "") {
    street = localStorage.getItem("customer_street");
  }
  if (landmark == "") {
    landmark = localStorage.getItem("customer_landmark");
  }
  if (district == "") {
    district = localStorage.getItem("customer_district");
  }
  if (state == "") {
    state = localStorage.getItem("customer_state");
  }
  if (pincode == "") {
    pincode = localStorage.getItem("customer_pincode");
  }
  

  console.log(workname.value);
  const work = {
    'type': workname.value,
    'address': {
      'doorNo': dno,
      'street': street,
      'district': district,
      'landmark': landmark,
      'pincode': pincode,
      'state': state
    }
  };

  try{
    const response = await fetch(`http://localhost:8080/work?cusId=${localStorage.getItem('customer_id')}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(work),
    }
    );
    
    if(response.status == 201){
      alert("Congratulations Work saved successfully");
      localStorage.setItem('work_name',workname.value);
      function a() {
        open(URL="./customerpage.html","_self");
      }
      a();
      console.log(response);
    }
    else{
      alert("Please enter a work name");
    }
  }
  catch(error){
    alert("error occurred");
  }

});



// let work = document.querySelector('.work');

// let div2 = document.createElement('div');
// work.appendChild(div2);

// function display2(){
//   div2.innerHTML = `<table class="tab">

//   <tr>
//     <td>Work-Name</td>
//     <td>${localStorage.getItem('work-type')}</td>
//   </tr>

//   </table>`;
// }

// display2();