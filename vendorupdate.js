let vid = window.localStorage.getItem('vendor_id');
let vname = document.getElementById('vname');
let email = document.getElementById('email');
let pwd = document.getElementById('pwd');
let phone = document.getElementById('phone');
let role = document.getElementById('role');
let cost = document.getElementById('costperday');
let dno = document.getElementById('dno');
let street = document.getElementById('street');
let landmark = document.getElementById('landmark');
let district = document.getElementById('district');
let state = document.getElementById('state');
let pincode = document.getElementById('pincode');

let signup = document.getElementById('signup');

let p = document.querySelector('p');
console.log(p);
    
pwd.addEventListener('keyup', ()=>{
  
    console.log(pwd.value);
    console.log('emleedhu');

    let upper = /[A-Z]/ ;
  let lower = /[a-z]/;
  let num = /[0-9]/;
  let spc = /[(?=.*-\/:-@\[-\`{-~]/;
  
  
    if(upper.test(pwd.value) === false){
      p.innerHTML='this field should contain upper case characters';
      p.style.color = 'red';
      pwd.style.borderColor = 'red';
    }
    else if(lower.test(pwd.value) === false){
      p.innerHTML='this field should contain lower case characters';
      p.style.color = 'red';
      pwd.style.borderColor = 'red';
    }
      
    else if(num.test(pwd.value) === false){
      p.innerHTML='this field should contain numbers';
      p.style.color = 'red';
      pwd.style.borderColor = 'red';
    }
    else if(spc.test(pwd.value) === false){
      p.innerHTML='this field should contain special characters';
      p.style.color = 'red';
      pwd.style.borderColor = 'red';
    }
   
    check();
  });


signup.addEventListener('click', async (e)=>{
  e.preventDefault();

  console.log(vid);

 

  // if(customer_id === ''){
  //   // p.innerHtml = "this field is required";
  //   p.innerHTML = 'this field is required';
  //   p.style.color = "red";
  // }
  // else{
  //   p.innerHTML = "";
  //   p.style.color = "green";
  // }
  if(vid != '' && check()){
    const vendor = {
      'id': vid,
      'name' : vname.value,
      'email' : email.value,
      'phone' : phone.value,
      'pwd' : pwd.value,
      'role' : role.value,
      'costPerDay' : cost.value
      // 'address' : {
      //   'doorNo' : dno.value,
      //   'street' : street.value,
      //   'district' :district.value,
      //   'landmark' : landmark.value,
      //   'state' : state.value,
      //   'pincode' : pincode.value
      // }
    } 
  
    try{
      const response = await fetch('http://localhost:8080/vendor',{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vendor),
      });
      if(response.status===302){
        console.log('Update successful');
        window.alert('Update completed successfully...🥳🥳🥳');
        
        let x = await response.json();
        console.log(x);
        console.log(x.data);
        window.localStorage.setItem('vendor_id', x.data.id);
        window.localStorage.setItem('vendor_name', x.data.name);
        window.localStorage.setItem('vendor_email', x.data.email);
        window.localStorage.setItem('vendor_phone', x.data.phone);
        window.localStorage.setItem('vendor_pwd', x.data.pwd);
        window.localStorage.setItem('vendor_job role', x.data.role);
        window.localStorage.setItem('vendor_costperday', x.data.cost);
        window.localStorage.setItem('vendor_addressid', x.data.address.id);
        window.localStorage.setItem('vendor_doorNo', x.data.address.doorNo);
        window.localStorage.setItem('vendor_street', x.data.address.street);
        window.localStorage.setItem('vendor_district', x.data.address.district);
        window.localStorage.setItem('vendor_landmark', x.data.address.landmark);
        window.localStorage.setItem('vendor_state', x.data.address.state);
        window.localStorage.setItem('vendor_pincode', x.data.address.pincode);

        function a() {
          open(URL="./vendorpage.html","_self");
        }
        a();
      }
      if(response.status===404){
        console.log('update unsuccessfull');
        window.alert('Please enter The Valid Vendor ID....😕😕😕');
      }
    }
    catch(error){
      window.alert("error")
    }
  }
  else{
    alert('please enter the vendor id ...');
  }
  
});

function check(){
  
  
let upper = /[A-Z]/ ;
let lower = /[a-z]/;
let num = /[0-9]/;
let spc = /[(?=.*-\/:-@\[-\`{-~]/;


  if(upper.test(pwd.value) === true && lower.test(pwd.value) === true && num.test(pwd.value) === true && spc.test(pwd.value) === true){
    p.innerHTML='';
    pwd.style.borderColor = 'green';
    return true;
  }
  if(pwd.value === ''){
    return true;  
  }
}