let customer = document.getElementById('customer');
let vendor = document.getElementById('vendor');

console.log(customer);
console.log(vendor);

customer.addEventListener('click',()=>{
  // document.getElementById('sub-nav1').style.display = 'block';
  let sub = document.getElementById('sub-nav1');
  let display = sub.classList.toggle('true');
  if(display){
    sub.style.display = "block";
    sub.style.backgroundColor = 'white';
    // sub.style.marginTop = '-30px'
  }
  else{
    sub.style.display = "none";
  }
},false);

vendor.addEventListener('click',()=>{
  // document.getElementById('sub-nav1').style.display = 'block';
  let sub1 = document.getElementById('sub-nav2');
  let display = sub1.classList.toggle('true');
  if(display){
    sub1.style.display = "block";
  }
  else{
    sub1.style.display = "none";
  }
},false);

// Code Starts for service functionality
// let service = document.getElementById('service');
// let dropdown = document.getElementById('drop-down');

  
// service.addEventListener('mouseenter',()=>{

//   let display = dropdown.classList.toggle('none');
//     if(display){
//       dropdown.style.display = "block";
//     }
// });

// service.addEventListener('mouseleave',()=>{
//   let display = dropdown.classList.toggle('block');
  
//     if(display){
//       setTimeout(()=>{
//         dropdown.style.transitionDelay='2s';
//         console.log('hi');
//         dropdown.style.display = 'none';
//       },2000)
//     }
//     else{
//       dropdown.style.display = 'none';
      
//     }
// });

let csignup = document.querySelector('.csignup');
console.log(csignup);

csignup.addEventListener('click', ()=>{

  open(URL="new/customersignup.html","_self");
  // C:\Users\kodid\OneDrive\Desktop\Project-Web\new\customersignup.html

});

let clogin = document.getElementsByClassName('clogin');
console.log(clogin);

for(let i=0; i<clogin.length; i++){
  let cloginItem = clogin[i];
  console.log(cloginItem);

  cloginItem.addEventListener('click',()=>{
    
    open(URL="new/customersignin.html","_self");

  })
}


let vsignup = document.querySelector('.vsignup');
console.log(vsignup);

vsignup.addEventListener('click', ()=>{

  open(URL="new/vendorsignup.html","_self");
  // C:\Users\kodid\OneDrive\Desktop\Project-Web\new\customersignup.html

});


let vlogin = document.getElementsByClassName('vlogin');
console.log(vlogin);

for(let i=0; i<vlogin.length; i++){
  let vloginItem = vlogin[i];
  console.log(vloginItem);

  vloginItem.addEventListener('click',()=>{
    
    open(URL="new/vendorsignin.html","_self");

  })
}