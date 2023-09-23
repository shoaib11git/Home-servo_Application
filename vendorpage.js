// let data = document.querySelector("#data");
// // console.log(data);

// let div = document.createElement("div");
// data.appendChild(div);

// *********************************************************


let vname = document.querySelector('#name');
let email = document.querySelector('#email');
let phone = document.querySelector('#phno');
let costperday = document.querySelector('#costperday');
let role = document.querySelector('#role');
let profile = document.querySelector('.profile');
profile.innerHTML = "Hello";
let dno = document.querySelector('#dno');
let lmark = document.querySelector('#lmark');
let street = document.querySelector('#street');
let district = document.querySelector('#district');
let state = document.querySelector('#state');
let pincode = document.querySelector('#pincode');

async function customerById(){
  try{
    const vendor = await fetch(`http://localhost:8080/vendor/id?id=${localStorage.getItem('vendor_id')}`,{
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    });
    let vendata =await vendor.json();
    console.log(vendata);

    vname.innerHTML = vendata.data.name;
    email.innerHTML = vendata.data.email;
    phone.innerHTML = vendata.data.phone;
    costperday.innerHTML = vendata.data.costPerDay;
    role.innerHTML = vendata.data.role;
    profile.innerHTML = '<i class="fa-solid user2 fa-user-tie"></i>';
    dno.innerHTML = vendata.data.address.doorNo;
    lmark.innerHTML = vendata.data.address.landmark;
    street.innerHTML = vendata.data.address.street;
    district.innerHTML = vendata.data.address.district;
    state.innerHTML = vendata.data.address.state;
    pincode.innerHTML = vendata.data.address.pincode;  
  }
  catch(error) {
    alert("error occured while fetching customer by id")
  }
}
customerById();



let showworks = document.getElementsByClassName("showworks");

for(let i=0 ; i<showworks.length; i++){
  let showworks = document.getElementsByClassName("showworks")[i];
  console.log(showworks);

showworks.addEventListener("click",() => {
  open(URL="./servicecost.html","_self");
});
}

//*************/ To delete Vendor from database***************
let del = document.querySelector('.del');

del.addEventListener('click',async()=>{

  try{
    const deleteVendor = await fetch(`http://localhost:8080/vendor?id=${localStorage.getItem('vendor_id')}`,{
      method: 'DELETE',
      headers:{'Content-Type': 'application/json'},
      // body: JSON.stringify(deleteVendor),
    });


    if(deleteVendor.status == 302){
      alert('Vendor was successfully deleted');
      localStorage.clear();
      function a() {
        open(URL="./vendorsignin.html","_self");
      }
      a();
    }
    else{
      alert('No Element Found With The Given Customer Id...');

    }

  }
  catch(error){
    alert('An error occurred while deleting vendor');
  }

});
// *****************************************************

// **************** Logout Vendors ***********************************

let logout = document.querySelector('.logout');

logout.addEventListener('click',()=>{

  if(localStorage.getItem('vendor_id') == ''){

    alert('Vendor was successfully logged out');

    localStorage.clear();
    function a() {
      open(URL="./vendorsignin.html","_self");
    }
    a();
  }
  else{
    alert('Please Login into Vendor account and try again later'); 
    function a() {
      open(URL="./vendorsignin.html","_self");
    }
    a();
  }

});


// ****************************************************************


// ********** Update VENDOR ****************

let update = document.querySelector('.update');

update.addEventListener('click',()=>{
  function a() {
    open(URL="./vendorupdate.html","_self");
  }
  a();
});

// ****************************************************************