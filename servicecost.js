let data1 = document.querySelector("#data");
// console.log(data1);

let div = document.createElement("div");
data1.appendChild(div);


let home = document.querySelector('.home');
console.log(home);
home.addEventListener('click',()=>{
  
    open(URL="./vendorpage.html","_self");

});


// ************ List of Works ****************************
let showworks = document.querySelector(".showworks");


async function listofworks(){

  div.innerHTML = "";
  try {
    const response = await fetch(
      `http://localhost:8080/work/all?venId=${localStorage.getItem(
        "vendor_id"
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(customer),
      }
    );

    let data = await response.json();
    // console.log('hello');
    // console.log(data);
    function a(){
      return data;
    }

    if (response.status == 302) {
      alert("Here is the list of works...");

  // ***** Displaying the list of works for vendor ***********************

      if(data.data.length != 0){
        for (let i = 0; i < data.data.length; i++) {

          div.innerHTML += `<table class="tab">
    
              <tr>  
                <th class='wname'>
                  Work-Name
                </th>  
                <th class='addr'>
                    Address
                  </th>
                <th>
                  Start Date
                </th>
                <th>
                  End Date
                </th>
                <th class='scost'>Save-Cost</th>
                <tr>
                <td>
                  ${data.data[i].type}
                </td>
                  
                  <td class="add">
                    ${data.data[i].address.doorNo} ,
                    ${data.data[i].address.street} ,
                    ${data.data[i].address.district} ,
                    ${data.data[i].address.landmark} ,
                    ${data.data[i].address.state} ,
                    ${data.data[i].address.pincode} 
                  </td>
                  <td>
                    <div class="cdd"><div class = "startdate">StartDate</div></div>
                  </td>
                  <td>
                  <div class="cdd"><div class = "enddate">EndDate</div></div>
                  </td>
                  <td class = "scostbackround">
                  <div class="cdd"><div class = "scostb">SaveCost</div></div>
                  </td>
                </tr>
              </tr>
            </table>`;
            
        }

// ******* Disabling The SetServiceCost button for vendors id not matching ********** 

        // console.log(data.data[1].vendors[0].costs);

        // console.log(costid = data.data[i]);

        for(let j = 0; j < data.data.length; j++) {
        let scost = document.getElementsByClassName('scost')[j];
        let scostb = document.getElementsByClassName('scostb')[j];
        let t = null;
        if(data.data[j].vendors[0] != undefined){
          t = data.data[j].vendors[0].id
        }
        
        // console.log(t);
        let scostbackround = document.getElementsByClassName('scostbackround')[j];


        if(t != localStorage.getItem('vendor_id')){
          // console.log(t);
          scost.style.display = 'none';
          scostb.style.display = 'none';
          scostbackround.style.display = 'none';
        }
        if(t == localStorage.getItem('vendor_id')){
          scost.style.display = 'block';
          scostb.style.display = 'block';
          scostbackround.style.display = 'block';
        }
        }
        
      }
      if(data.data.length == 0){
        div.innerHTML += "<h1>There Are No Work's to Display</h1>";
      }
      
    }

    // ********** Start date and end date for the work **************************


    for(let j = 0; j < data.data.length; j++) {
      let startdate = document.getElementsByClassName('startdate')[j];
      let enddate = document.getElementsByClassName('enddate')[j];
      
      // console.log(data.data[j].startDate);
    // ********* start and end date checking *************
      
      if(data.data[j].endDate != null){
        startdate.style.disabled = 'true';
        startdate.style.backgroundColor = 'grey';
        startdate.style.cursor = 'not-allowed';
        enddate.style.disabled = 'true';
        enddate.style.backgroundColor = 'grey';
        enddate.style.cursor = 'not-allowed';
      }
      if(data.data[j].startDate != null){
        startdate.style.disabled = 'true';
        startdate.style.backgroundColor = 'grey';
        startdate.style.cursor = 'not-allowed';
      }

      console.log(data.data[j].vendors[0]);

      if(data.data[j].startDate == null){

// ***************Start Date For The Work ******************

      startdate.addEventListener('click', async() => {
        
        try{
          const startDate = await fetch(`http://localhost:8080/work/start?workId=${data.data[j].id}&venId=${localStorage.getItem("vendor_id")}`,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            // body: JSON.stringify(data.data),
          });
  
          if(data.data[j].startDate != null){
            startdate.style.disabled = 'true';
            startdate.style.backgroundColor = 'grey';
            startdate.style.cursor = 'not-allowed';
          }

          if(startDate.status === 302){
            alert("You Have Started This Work Successfully...");  

            startdate.style.disabled = 'true';
            startdate.style.backgroundColor = 'grey';
            startdate.style.cursor = 'not-allowed';
          }
          else{
            alert("Sorry, Something went wrong please try again later");
          }
        }
        catch(error) {
          alert("error occurred in starting the date");
        }
  
        });
      }
        // ****************************************************************
        //************* End Date For The Work ********************************
        
        // console.log(data.data[j].endDate );
      if(data.data[j].endDate == null){
        enddate.addEventListener('click', async() => {
  
          let scostb = document.getElementsByClassName('scostb')[j];
          let scost = document.getElementsByClassName('scost')[j];
          let scostbackround = document.getElementsByClassName('scostbackround')[j];
        try{
          const endDate = await fetch(`http://localhost:8080/work/end?workId=${data.data[j].id}&venId=${localStorage.getItem("vendor_id")}`,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            // body: JSON.stringify(data.data),
          });
  
          let ed = await endDate.json();
          console.log(ed);

          if(data.data[j].endDate != null){
            startdate.style.disabled = 'true';
            startdate.style.backgroundColor = 'grey';
            startdate.style.cursor = 'not-allowed';
            enddate.style.disabled = 'true';
            enddate.style.backgroundColor = 'grey';
            enddate.style.cursor = 'not-allowed';
      }

          if(endDate.status === 302){
            alert("You Have Ended This Work Successfully..."); 
            
            enddate.style.disabled = 'true';
            enddate.style.backgroundColor = 'grey';
            enddate.style.cursor = 'not-allowed';

            scost.style.display = 'block';
            scostb.style.display = 'block';
            scostbackround.style.display = 'block';
    
            listofworks();

          }
          else{
            alert("Sorry, Something went wrong please try again later");
          }
        }
        catch(error) {
          alert("error occurred in ending the work");
        }
  
        });
      }
        
  
      
    } 
    
      }
      catch (error) {
        alert("error occured while trying to fetching the list of works");
      }
   // ****************************************

  // ******************Save Cost *****************
  let data = a();

  for(let j = 0; j < data.data.length; j++) {
    let scostb = document.getElementsByClassName('scostb')[j];
    let scost = document.getElementsByClassName('scost')[j];
    let scostbackround = document.getElementsByClassName('scostbackround')[j];

    let costid = null;

    if( data.data[j].cost != null){
      costid = data.data[j].cost.id;
    }
    if(data.data[j].endDate == null || costid != null){
      scost.style.display = 'none';
      scostb.style.display = 'none';
      scostbackround.style.display = 'none';
    }
    // console.log(data.data[j].vendors);
    // console.log(j);
    if(costid == null){
      scostb.addEventListener('click',async()=>{

      
        let t = 0;

        if(data.data[j].vendors[0] != undefined){
          t = data.data[j].vendors[0].id;
        }
        console.log(t);

        // console.log(t);
        if((data.data[j].vendors.length != 0 ) && t == localStorage.getItem('vendor_id')){
        try{
          const saveCost = await fetch(`http://localhost:8080/serviceCost?workId=${data.data[j].id}&venId=${localStorage.getItem("vendor_id")}`,{
            method: 'POST',
            // redirect: 'follow'
          });
          
          let sacost = await saveCost.json();
          // console.log(scost);

          if(sacost.status == 201){
            alert('Your service cost has saved successfully...');

            scost.style.display = 'none';
            scostb.style.display = 'none';
            scostbackround.style.display = 'none';
          }

          else{
            alert('There was an error saving your service cost please try again');
          }
        }
        catch(error){
          alert('An error occurred while saving your service cost');
        }
      }
      else{
        alert("Your id is not matching ");
      }
  
      });
    }
  // ****************************************************************

  }
}

listofworks();


// *************End of List of works ****************




// // ************ List of Works ****************************
// let showworks = document.querySelector(".showworks");

// showworks.addEventListener("click", async () => {
//   div.innerHTML = "";
//   try {
//     const response = await fetch(
//       `http://localhost:8080/work/all?venId=${localStorage.getItem(
//         "vendor_id"
//       )}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         // body: JSON.stringify(customer),
//       }
//     );

//     let data = await response.json();
//     // console.log('hello');
//     // console.log(data);
//     function a(){
//       return data;
//     }

//     if (response.status == 302) {
//       alert("Here is the list of works...");

//   // ***** Displaying the list of works for vendor ***********************

//       if(data.data.length != 0){
//         for (let i = 0; i < data.data.length; i++) {

//           div.innerHTML += `<table class="tab">
    
//               <tr>  
//                 <th>
//                   Work-Name
//                 </th>  
//                 <td>
//                   ${data.data[i].type}
//                 </td>
//                 <th>
//                   Start Date
//                 </th>
//                 <th>
//                   End Date
//                 </th>
//                 <th class='scost'>Save-Cost</th>
//                 <tr>
//                   <th>
//                     Address
//                   </th>
//                   <td class="add">
//                     ${data.data[i].address.doorNo} ,
//                     ${data.data[i].address.street} ,
//                     ${data.data[i].address.district} ,
//                     ${data.data[i].address.landmark} ,
//                     ${data.data[i].address.state} ,
//                     ${data.data[i].address.pincode} 
//                   </td>
//                   <td>
//                     <div class = "startdate">StartDate</div>
//                   </td>
//                   <td>
//                   <div class = "enddate">EndDate</div>
//                   </td>
//                   <td class = "scostbackround">
//                   <div class = "scostb">SaveCost</div>
//                   </td>
//                 </tr>
//               </tr>
//             </table>`;
            
//         }

// // ******* Disabling The SetServiceCost button for vendors id not matching ********** 

//         // console.log(data.data[1].vendors[0].costs);
//         for(let j = 0; j < data.data.length; j++) {
//         let scost = document.getElementsByClassName('scost')[j];
//         let scostb = document.getElementsByClassName('scostb')[j];
//         let t = null;
//         if(data.data[j].vendors[0] != undefined){
//           t = data.data[j].vendors[0].id
//         }
        
//         // console.log(t);
//         let scostbackround = document.getElementsByClassName('scostbackround')[j];


//         if(t != localStorage.getItem('vendor_id')){
//           // console.log(t);
//           scost.style.display = 'none';
//           scostb.style.display = 'none';
//           scostbackround.style.display = 'none';
//         }
//         if(t == localStorage.getItem('vendor_id')){
//           scost.style.display = 'block';
//           scostb.style.display = 'block';
//           scostbackround.style.display = 'block';
//         }
//         }
        
//       }
//       if(data.data.length == 0){
//         div.innerHTML += "<h1>There Are No Work's to Display</h1>";
//       }
      
//     }

//     // ********** Start date and end date for the work **************************


//     for(let j = 0; j < data.data.length; j++) {
//       let startdate = document.getElementsByClassName('startdate')[j];
//       let enddate = document.getElementsByClassName('enddate')[j];
      
//       // console.log(data.data[j].startDate);
//     // ********* start and end date checking *************
//       if(data.data[j].endDate != null){
//         startdate.style.disabled = 'true';
//         startdate.style.backgroundColor = 'grey';
//         startdate.style.cursor = 'not-allowed';
//         enddate.style.disabled = 'true';
//         enddate.style.backgroundColor = 'grey';
//         enddate.style.cursor = 'not-allowed';
//       }
//       if(data.data[j].startDate != null){
//         startdate.style.disabled = 'true';
//         startdate.style.backgroundColor = 'grey';
//         startdate.style.cursor = 'not-allowed';
//       }
//       if(data.data[j].startDate == null){

// // ***************Start Date For The Work ******************

//       startdate.addEventListener('click', async() => {
        
//         try{
//           const startDate = await fetch(`http://localhost:8080/work/start?workId=${data.data[j].id}&venId=${localStorage.getItem("vendor_id")}`,{
//             method: 'PUT',
//             headers: {'Content-Type': 'application/json'},
//             // body: JSON.stringify(data.data),
//           });
  
//           if(data.data[j].startDate != null){
//             startdate.style.disabled = 'true';
//             startdate.style.backgroundColor = 'grey';
//             startdate.style.cursor = 'not-allowed';
//           }

//           if(startDate.status === 302){
//             alert("You Have Started This Work Successfully...");  

//             startdate.style.disabled = 'true';
//             startdate.style.backgroundColor = 'grey';
//             startdate.style.cursor = 'not-allowed';
//           }
//           else{
//             alert("Sorry, Something went wrong please try again later");
//           }
//         }
//         catch(error) {
//           alert("error occurred in starting the date");
//         }
  
//         });
//       }
//         // ****************************************************************
//         //************* End Date For The Work ********************************
        
//         console.log(data.data[j].endDate );
//       if(data.data[j].endDate == null){
//         enddate.addEventListener('click', async() => {
  
//           let scostb = document.getElementsByClassName('scostb')[j];
//           let scost = document.getElementsByClassName('scost')[j];
//           let scostbackround = document.getElementsByClassName('scostbackround')[j];
//         try{
//           const endDate = await fetch(`http://localhost:8080/work/end?workId=${data.data[j].id}&venId=${localStorage.getItem("vendor_id")}`,{
//             method: 'PUT',
//             headers: {'Content-Type': 'application/json'},
//             // body: JSON.stringify(data.data),
//           });
  
//           if(data.data[j].endDate != null){
//             startdate.style.disabled = 'true';
//             startdate.style.backgroundColor = 'grey';
//             startdate.style.cursor = 'not-allowed';
//             enddate.style.disabled = 'true';
//             enddate.style.backgroundColor = 'grey';
//             enddate.style.cursor = 'not-allowed';
//       }

//           if(endDate.status === 302){
//             alert("You Have Ended This Work Successfully..."); 
            
//             enddate.style.disabled = 'true';
//             enddate.style.backgroundColor = 'grey';
//             enddate.style.cursor = 'not-allowed';

//             scost.style.display = 'block';
//             scostb.style.display = 'block';
//             scostbackround.style.display = 'block';
    
//           }
//           else{
//             alert("Sorry, Something went wrong please try again later");
//           }
//         }
//         catch(error) {
//           alert("error occurred in ending the work");
//         }
  
//         });
//       }
        
  
      
//     } 
    
//       }
//       catch (error) {
//         alert("error occured while trying to fetching the list of works");
//       }
//    // ****************************************

//   // ******************Save Cost *****************
//   let data = a();

//   for(let j = 0; j < data.data.length; j++) {
//     let scostb = document.getElementsByClassName('scostb')[j];
//     let scost = document.getElementsByClassName('scost')[j];
//     let scostbackround = document.getElementsByClassName('scostbackround')[j];

//     let costid = null;

//     if( data.data[j].cost != null){
//       costid = data.data[j].cost.id;
//     }
//     if(data.data[j].endDate == null || costid != null){
//       scost.style.display = 'none';
//       scostb.style.display = 'none';
//       scostbackround.style.display = 'none';
//     }
//     // console.log(j);
//     if(costid == null){
//       scostb.addEventListener('click',async()=>{

//         let t = data.data[j].vendors[0].id;
//         console.log(t);
//         if((data.data[j].vendors.length != 0 ) && t == localStorage.getItem('vendor_id')){
//         try{
//           const saveCost = await fetch(`http://localhost:8080/serviceCost?workId=${data.data[j].id}&venId=${localStorage.getItem("vendor_id")}`,{
//             method: 'POST',
//             redirect: 'follow'
//           });
//           console.log(data.data[j].id);
//           console.log(saveCost.json());
//           if(saveCost.status == 201){
//             alert('Your service cost has saved successfully...');

//             scost.style.display = 'none';
//             scostb.style.display = 'none';
//             scostbackround.style.display = 'none';
//           }
//           if(saveCost.status == 400){
//             alert('Your service cost is already saved ');
//           }
//           else{
//             alert('There was an error saving your service cost please try again');
//           }
//         }
//         catch(error){
//           alert('An error occurred while saving your service cost');
//         }
//       }
//       else{
//         alert("Your id is not matching ");
//       }
  
//       });
//     }
//   // ****************************************************************

//   }

// });

// // *************End of List of works ****************
