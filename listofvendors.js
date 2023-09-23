let data1 = document.querySelector('#list-works');
// console.log(data1);

let div1 = document.createElement('div');
data1.appendChild(div1);


let home = document.querySelector('.home');
console.log(home);
home.addEventListener('click',()=>{
  
    open(URL="./customerpage.html","_self");

});

async function listofvendors(){
  div1.innerHTML = "";
  try{
    const vendors = await fetch(`http://localhost:8080/vendor/all?custId=${localStorage.getItem('customer_id')}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(list),
    });

    let data =await vendors.json();

    if(vendors.status == 302){
      alert("All the vendors are displayed below");
      console.log(data.data[0]);
      if(data.data.length != 0){
        for(let i = 0; i < data.data.length; i++){
          div1.innerHTML += `<table class="tab">
            <tr>
              <th>Details</th>
              <th>Address</th>
            </tr>
            <tr>
              <td>${data.data[i].name} , 
              ${data.data[i].email} , 
              ${data.data[i].phone} , 
              ${data.data[i].role} , 
              ${data.data[i].costPerday}
              </td>
              <td>
              ${data.data[i].address.doorNo} , 
              ${data.data[i].address.street} , 
              ${data.data[i].address.district} , 
              ${data.data[i].address.landmark} ,
              ${data.data[i].address.state} , 
              ${data.data[i].address.pincode} , 
              </td>
            </tr>
          </table>`
          }
      }
      if(data.data.length == 0){
        div1.innerHTML += "<h1> There are no vendors Available to display </h1>";
      }
      
    }
    else{
      alert("There was a problem while fetching the vendors");
    }
  }
  catch(error){ 
    alert("Error occurred while trying to fetch the vendors")
  }
}

listofvendors();