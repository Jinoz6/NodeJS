
var modal = document.getElementById("myModal");

var btn = document.getElementById("myBtn");

var cancel = document.getElementById("cancel_btn");




var rowCount = 0;

var table = document.getElementById("table_tbody");

var next = document.getElementById("next");
var pre = document.getElementById("pre");

const page = new URLSearchParams(window.location.search).get('page'); 
// let tableRow = table.rows.length;
let pages = Math.ceil(21/8);


btn.onclick = function () {

    document.getElementById("new_status").defaultValue = "off";
    modal.style.display = "block";
    document.getElementById("save_btn").style.display = "none";
    document.getElementById("no").style.display = "none";
    
    

};

 cancel.onclick = function () {

    modal.style.display = "none";
    document.getElementById("add_btn").style.display = "inline";
    resetForm();

};

window.onclick = function (event) {

    if (event.target == modal) {

        modal.style.display = "none";
    }
};


// if( tableRow > 8 ){ 
    
//     document.getElementById("table_tbody").innerHTML = " ";
//   //  let wrapper =  document.getElementById("pagination-wrapper") ;
   setPagination(pages)

   function setPagination(page){
    let wrapper =  document.getElementById("pagination-wrapper") ;
  
    for(let i= 1; i<=page;i++){
      let btn = pageButtons(i);
      wrapper.append(btn);
  
    }
  
  }

   function pageButtons(p){

    let button = document.createElement("button")
    button.classList.add("pagination-link")
    button.innerHTML=p;
    button.addEventListener("click",function(){
      window.location.href = `http://localhost:3000/api/user?page=${parseInt(p)}`
      
   })
   return button;
}

next.addEventListener("click",function(){

  const p = new URLSearchParams(window.location.search).get('page');
  

   if(p >= pages ){

       document.getElementById("next").disabled = true;

   }else{

      

      let urlObject = new URLSearchParams(window.location.search);

      urlObject.set("page",parseInt(p)+1);

      history.replaceState(null, null, "?"+urlObject.toString());


      window.location.href = `http://localhost:3000/api/user?page=${parseInt(p)+1}`

      document.getElementById("pre").disabled = false;
      
  }
})


pre.addEventListener("click",function(){

  const p = new URLSearchParams(window.location.search).get('page');

  if(p <= 1 ){

      document.getElementById("pre").disabled = true;

  }else{
  
     table.innerHTML = " ";
      let urlObject = new URLSearchParams(window.location.search);
      urlObject.set("page",p-1);
      history.replaceState(null, null, "?"+urlObject.toString());

      window.location.href = `http://localhost:3000/api/user?page=${parseInt(p)-1}`

      document.getElementById("next").disabled = false;

  }
})


function editRow(td) {

    modal.style.display = "block";
    document.getElementById("add_btn").style.display = "none";
    document.getElementById("save_btn").style.display = "inline";
    document.getElementById("no").style.display = "none";
    
    
    
    let selectedRow = td.parentElement.parentElement;
    document.getElementById("no").value = selectedRow.cells[0].innerHTML;
    document.getElementById("new_name").value = selectedRow.cells[1].innerHTML;
    document.getElementById("new_lastname").value = selectedRow.cells[2].innerHTML;
    document.getElementById("new_age").value = selectedRow.cells[3].innerHTML;
    document.getElementById("new_address").value = selectedRow.cells[4].innerHTML;
    document.getElementById("new_mobile").value = selectedRow.cells[5].innerHTML;
    
  
    const y = selectedRow.cells[6].innerHTML;
  
    if (y == "1"){
  
      document.getElementById('new_status').checked = true;
  
    }
    else{
  
      document.getElementById('new_status').checked = false;
    }
  }


  function saveRow(){

    let no = document.getElementById("no").value
    let status = document.getElementById("new_status") 

    status.checked ? status = 1: status = 0

    const data ={
      
        Firstname: document.getElementById("new_name").value,
        Lastname: document.getElementById("new_lastname").value ,
        Age: document.getElementById("new_age").value  ,
        Address: document.getElementById("new_address").value,
        Mobile: document.getElementById("new_mobile").value ,
        status: status
    }
      

    fetch(`http://localhost:3000/api/users/${no}`, {

        method: 'put' ,
        headers: {
            'Content-Type': 'application/json',
          },
        body:JSON.stringify(data)

   })
}


  function delRow(td) {

        let selectedRow = td.parentElement.parentElement;
        let no = selectedRow.cells[0].innerHTML;
        
        if (confirm("Are you sure to delete this record ?")) {

            fetch(`http://localhost:3000/api/users/${no}`, {
                  method: 'delete' 
            })
        }  
  }



  function resetForm() {

    document.getElementById("new_name").value = "";
    document.getElementById("new_lastname").value = "";
    document.getElementById("new_age").value = "";
    document.getElementById("new_mobile").value = "";
    document.getElementById("new_address").value="";
    document.getElementById("new_status").checked = false;
   
  }