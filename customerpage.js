// let data = document.querySelector('#data');
// console.log(data);

// let div = document.createElement('div');
// data.appendChild(div);

let data1 = document.querySelector('#list-works');
// console.log(data1);

let div1 = document.createElement('div');
data1.appendChild(div1);

// *********Displaying The customer Details ********************************

let cname = document.querySelector('#name');
let email = document.querySelector('#email');
let phone = document.querySelector('#phno');
let famcount = document.querySelector('#famcount');
let now = document.querySelector('#now');
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
    const customer = await fetch(`http://localhost:8080/customer/id?id=${localStorage.getItem('customer_id')}`,{
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    });
    let custdata =await customer.json();
    console.log(custdata);

    cname.innerHTML = custdata.data.name;
    email.innerHTML = custdata.data.email;
    phone.innerHTML = custdata.data.phone;
    famcount.innerHTML = custdata.data.familyCount;
    now.innerHTML = custdata.data.works.length;
    profile.innerHTML = '<i class="fa-solid user2 fa-user-tie"></i>';

    dno.innerHTML = custdata.data.address.doorNo;
    lmark.innerHTML = custdata.data.address.landmark;
    street.innerHTML = custdata.data.address.street;
    district.innerHTML = custdata.data.address.district;
    state.innerHTML = custdata.data.address.state;
    pincode.innerHTML = custdata.data.address.pincode;  
  }
  catch(error) {
    alert("error occured while fetching customer by id")
  }
}
customerById();

// ****************************************************************

// **************************************************
let works = document.querySelector('.works');
console.log(works);
works.addEventListener('click',()=>{
  
    open(URL="./listofworks.html","_self");

});
// **************************************************

// *************Delete Customer ********************************

let id = window.localStorage.getItem("customer_id");

let del = document.querySelector('#del');

del.addEventListener('click',async (e)=>{
  e.preventDefault();

  try {
    const response = await fetch(`http://localhost:8080/customer?id=${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(customer),
    });

    // console.log(response.json());
  
  if(response.status === 302){
    window.localStorage.clear();
    window.alert("Customer deleted successfully...! ");
    // display();
    // display2();
    function o() {
      open(URL="./customersignin.html","_self");
    }

    o();
  }
  if(response.status === 404){
    window.alert("Sorry For your Inconvenience There was an error in deleting the customer please try again later ....!");
    console.log("not deleted");
  }
  }
  catch(error){
    window.alert('Error Occured In Deletion Of Customer');
  }

});
// ****************************************************************

// let leftarrow = document.querySelector("#leftarrow");
// let rightarrow = document.querySelector("#rightarrow");
// let custprofile = document.querySelector(".cust-profile");

// leftarrow.addEventListener("click",()=>{
//   custprofile.style.backgroundColor='wheat';
//   custprofile.style.display='block';
//   custprofile.style.scale='1';
//   custprofile.style.transitionDuration='1s';
//   rightarrow.style.display='block';
//   leftarrow.style.display='none';
//   display();
//   display2();
// });
// rightarrow.addEventListener("click",()=>{
//   // custprofile.style.transform = 'translateX(100%)';
//   leftarrow.style.display='block';
//   custprofile.style.display='block';
//   custprofile.style.transitionDuration='1s';
//   custprofile.style.scale='0.001';
//   rightarrow.style.display='none';
// });

// *****************To Add Work *************************

let workbtn = document.querySelector(".workbtn");
let addwork = document.querySelector("#addwork");

  workbtn.addEventListener("click", ()=>{
    function a() {
      open(URL="./addwork.html","_self");
    }
    a();
    // display2();
  });

  // ******************************** 
  // Update work for customer

  // workbtn.addEventListener("click",async (f)=>{
  //   f.preventDefault();

  //   const work = {
  //     "type":`${addwork.value}`,
  //     "address":{
  //     // "id":localStorage.getItem('customer_addressid'),
  //     "doorNo":localStorage.getItem('customer_doorNo'),
  //     "street":localStorage.getItem('customer_street'),
  //     "district":localStorage.getItem('customer_district'),
  //     "landmark":localStorage.getItem('customer_landmark'),
  //     "state":localStorage.getItem('customer_state')
  //     }
  //   }

  //   try{
  //     const response = await fetch(`http://localhost:8080/work?cusId=${localStorage.getItem('customer_id')}`,{
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(work),
  //     }); 
  //     if(response.ok){
  //       const data = await response.json();
  //       console.log(data);
  //       window.localStorage.setItem('work-type',addwork.value);
  //       alert("Work saved successfully ");
  //       display2();
  //       addwork.value='';
  //     }
  //     else{
  //       alert("Work not saved");
  //     }
  //   }
  //   catch(error){
  //     alert("please try again");
  //   }

  // })

  // let workdb = document.getElementById('workdb');
  // workdb.innerHTML = localStorage.getItem('work_name');

// let work = document.querySelector('.work');

// let div2 = document.createElement('div');
// work.appendChild(div2);


// function display2(){
//   div2.innerHTML = `<table class="tab">

//   <tr>
//     <td>Work-Name</td>
//     <td>${localStorage.getItem('work-name')}</td>
//   </tr>

//   </table>`;
// }

// display2();

// **************** Customer Logout ****************

let lbtn = document.querySelector('.lbtn');

lbtn.addEventListener('click',()=>{
  localStorage.clear();
  function o() {
    open(URL="./customersignin.html","_self");
  }
  alert("Logout completed Successfully");
  o();
});

// ****************************************************************



// ***************** TO Update Customer ****************
let updatecustomer = document.querySelector('.updatecustomer');

updatecustomer.addEventListener('click', ()=>{
  function a() {
    open(URL="./customerupdate.html","_self");
  }
  a();
});

// **************************************

// ************** To Display List OF Vendors ****************

let vendors = document.querySelector('.vendors');

vendors.addEventListener('click',async ()=>{

  
    open(URL="./listofvendors.html","_self");


});

// *************************************************