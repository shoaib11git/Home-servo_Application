async function get(){

  const workById =await fetch(`http://localhost:8080/work/id?id=${localStorage.getItem('updatework_id')}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(list),
    });

  let data = await workById.json();

  
  let updatebtn = document.querySelector('.updateworkb');
  console.log(updatebtn);
  console.log('not clicked');
  updatebtn.addEventListener('click',async(e)=>{
    e.preventDefault();
    console.log('updatebtn clicked');
let dno = document.getElementById("dno").value;
let street = document.getElementById("street").value;
let landmark = document.getElementById("landmark").value;
let district = document.getElementById("district").value;
let state = document.getElementById("state").value;
let pincode = document.getElementById("pincode").value;
let workname = document.getElementById("workname").value;

  if (dno == "") {
    dno = data.data.address.doorNo;
  }
  if (street == "") {
    street = data.data.address.street;
  }
  if (landmark == "") {
    landmark = data.data.address.landmark;
  }
  if (district == "") {
    district = data.data.address.district;
  }
  if (state == "") {
    state = data.data.address.state;
  }
  if (pincode == "") {
    pincode = data.data.address.pincode;
  }
  if (workname == "") {
    dno = data.data.type;
  }
// 


  console.log(data.data);

  const work = {
    'id':data.data.id,
    'type': workname,
    'address': {
      'id':data.data.address.id,
      'doorNo': dno,
      'street': street,
      'district': district,
      'landmark': landmark,
      'pincode': pincode,
      'state': state
    }
  }

    console.log(workname);

    try{
      const updateWork = await fetch(`http://localhost:8080/work/update`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(work),
      });
      
      let data = await updateWork.json();
      // console.log("clicked update");

      if(updateWork.status == 302){
        alert("Work updated successfully");

        console.log(data);
        
        function o() {
          open(URL="./customerpage.html","_self");
        }
    
        o();

      }
      else{
        alert("Work not updated successfully");
      }
    }
    catch(error){
      alert("Error during updating work");
    }
  
  });
  
}


get();