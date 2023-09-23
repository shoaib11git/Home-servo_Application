let home = document.querySelector('.home');
console.log(home);
home.addEventListener('click',()=>{
  
    open(URL="./customerpage.html","_self");

});




// ***************** To Display List Of Works To Customer Added By Him *************
let data1 = document.querySelector('#list-works');
// console.log(data1);

let div1 = document.createElement('div');

data1.appendChild(div1);

async function display(){

  div1.innerHTML = "";
  
  try{  
    const list = await fetch(`http://localhost:8080/customer?email=${localStorage.getItem('customer_email')}&pwd=${localStorage.getItem('customer_pwd')}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(list),
    });
    if(list.status === 302){
      alert("Here Is The List of works!");
    }

    let data = await list.json();

    console.log(data.data.works);

    if(data.data.works.length != 0){
      for(let i = 0; i < data.data.works.length;i++){
        
        let ta = 'no cost';
        if(data.data.works[i].cost != null){
        ta = data.data.works[i].cost.totalAmount;
        }
        let mode = 'Not Done';
        if(data.data.works[i].cost != null){
          if(data.data.works[i].cost.mode != null){
            mode = data.data.works[i].cost.mode;
          }
        }
        console.log(data.data.works[i].cost);
        
      
        div1.innerHTML += `<table class="tab">
    
              <tr>  
                <th>
                  Work-Name
                </th>  
                <th>
                    Address
                  </th>
                <th>
                  Start Date
                </th>
                <th>
                  End Date
                </th>
                <th class='update'>
                  Update
                </th>
                <th>
                TotalCost
                </th>
                <th>
                  Payment-Mode
                </th>
                <th class='scost'>
                Pay
                </th>
                
                <tr>
                <td>
                ${data.data.works[i].type}
                </td>
                  <td>
                    ${data.data.works[i].address.doorNo} ,
                    ${data.data.works[i].address.street} ,
                    ${data.data.works[i].address.district} ,
                    ${data.data.works[i].address.landmark} ,
                    ${data.data.works[i].address.state} ,
                    ${data.data.works[i].address.pincode} 
                  </td>
                  <td>
                    <div class = "startdate">${data.data.works[i].startDate}</div>
                  </td>
                  <td>
                  <div class = "enddate">${data.data.works[i].endDate}</div>
                  </td>
                  <td>
                  <div class = "updatework">Update</div>
                  </td>
                  <td class = 'totalcost'>
                  ${ta} <br/> ${mode}
                  </td>
                  <td>
                    
                    <div > <strong>
        <input list="mode" class="paymode"/>
        <datalist  id="mode">
        <option value="paytm">paytm</option>
        <option value="phonepay">phonepay</option>
        <option value="Google pay">Google pay</option>
        <option value="Handcash">Handcash</option>
        <option value="Netbanking">Netbanking</option>
        <option value="CreditCard">CreditCard</option>
        </datalist>
        </strong></div>
                  </td>
                  <td>
                  <div class = "payb">Pay</div>
                  </td>
                  
                </tr>
              </tr>
            </table>`;

            console.log('check'+i);
    // ************** Pay Button Visibility ****************************

            let payb = document.getElementsByClassName('payb')[i];
            let updatework = document.getElementsByClassName('updatework')[i];
            if(data.data.works[i].cost == null || data.data.works[i].cost.mode != null){
              payb.style.backgroundColor = 'grey';
              payb.style.disabled = 'true';
              payb.style.cursor = 'not-allowed';
            }
            
            if(data.data.works[i].cost != null && data.data.works[i].cost.mode == null){
              payb.style.backgroundColor = 'blue';
              payb.style.disabled = 'false';
              payb.style.cursor = 'pointer';
            }
            if(data.data.works[i].startDate == null){
              updatework.style.backgroundColor = 'blue';
              updatework.style.disabled = 'false';
              updatework.style.cursor = 'pointer';
            }
            if(data.data.works[i].startDate != null){
              updatework.style.backgroundColor = 'grey';
              updatework.style.disabled = 'true';
              updatework.style.cursor = 'not-allowed';
            }

    // ****************************************************************
      }
    }
    if(data.data.works.length == 0){
      div1.innerHTML += "<h1>There are no work's available to display</h1>";
    }
    
    // *************** UpdateWork Visibility ********************************
    for(let i = 0; i < data.data.works.length; i++){
      let payb = document.getElementsByClassName('payb')[i];
      let updatework = document.getElementsByClassName('updatework')[i];
      

      if(data.data.works[i].startDate == null){

        updatework.style.backgroundColor = 'blue';
        updatework.style.disabled = 'false';
        updatework.style.cursor = 'pointer';
  // ****************************************************************
  // *****************To update The Work *******************************

        updatework.addEventListener('click',()=>{
          localStorage.setItem('updatework_id',data.data.works[i].id);
          console.log(data.data.works[i].id);
          function a() {
            open(URL="./workupdate.html","_self");
          }
          a();
        });

  // ****************************************************************
      }
      // console.log(data.data.works[i].endDate);
      
      console.log("hi");
      let paymode = document.getElementsByClassName('paymode')[i];
      if(data.data.works[i].cost != null){
        paymode.style.disabled = 'true';
      }
      
    // ********************* Payment Pay Button **********************

      // data.data.works[i].cost == null &&
    if( data.data.works[i].cost != null && data.data.works[i].endDate != null && data.data.works[i].cost.mode == null){
      payb.addEventListener('click',async()=>{
        let paymode = document.getElementsByClassName('paymode')[i].value;
        var raw = JSON.stringify({
          "id":data.data.works[i].cost.id,
          "mode":paymode
        });
      if(data.data.works[i].cost.mode == null){
        try{
          const pay = await fetch(`http://localhost:8080/serviceCost?cusId=${localStorage.getItem('customer_id')}`,{
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: raw,
          });
          
          if(pay.status == 201){
            alert("Payment Completed Successfully"); 
            let payb = document.getElementsByClassName('payb')[i];
            
              payb.style.backgroundColor = 'grey';
              payb.style.disabled = 'true';
              payb.style.cursor = 'not-allowed';
              display();
          }
          else{
            alert("Payment Failed");
          }
          
        }
        catch(error){
          alert("error occurred while paying service cost");
        }
      }
// ************************************************
      
      });
    }
    }
    
  }
  catch(error){
    alert("There was an error fetching the list of works!");
  }

}

// ************************************************

display();




