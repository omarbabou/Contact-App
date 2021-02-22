

const addBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const editBtn = document.getElementById('edit-btn');
const recordContainer = document.querySelector('.record-container');
const deleteBtn = document.getElementById('delete-btn');

/************************************************ */
const contactName = document.getElementById('name');
const address = document.getElementById('address');
const number = document.getElementById('contact-num');
console.log({address})
let  ContactArray = [];
let id = 0;

// Object constructor for contact
function Contact(id, contactName, address="", number){
    this.id = id;
    this.contactName = contactName;
    this.address = address;
    this.number = number;
}

// Display available record
document.addEventListener('DOMContentLoaded', function(){
    if(localStorage.getItem('contacts')  == null){
        ContactArray= [];
    } else {
        ContactArray = JSON.parse(localStorage.getItem('contacts'));
        lastID(ContactArray);
    }     
    displayRecord();
});

// Display Function
function displayRecord(){
    ContactArray.forEach(function(singleContact){
        addToList(singleContact);
    });
}

// Finding the last id
function lastID(ContactArray){
    if(ContactArray.length > 0){
        id = ContactArray[ContactArray.length - 1].id;
    } else {
        id = 0;
    }
}

// Adding contact record

addBtn.addEventListener('click', function(){
    console.log('name', address.value)
     if( checkInputFields([contactName.value, address.value, number.value])){
        
         setMessage("success", "Record added successfully!");
         console.log({address})
          id++;
          const contact = new Contact(id, contactName.value,  address.value, number.value);
          ContactArray.push(contact);
          // Storing contact record in local storage
          localStorage.setItem('contact', JSON.stringify(ContactArray))
          ;
          clearInputFields();

         // Adding to list 
         addToList(contact);
    } else {
       
         setMessage("error", "Empty input fields or invalid input!");
    }     
});

// Adding to List (on the DOM)
    function addToList(item){
        const newRecordDiv = document.createElement('div');
        newRecordDiv.classList.add('record-item');
        newRecordDiv.innerHTML = `
        <div class="record-el">
             <span id="labelling">Contact ID:</span>
             <span id="contact-id-content">${item.id}</span>
        </div> 

        <div class="record-el">
             <span id="labelling">Name:</span>
             <span id="contactName-content">${item.contactName}</span>
        </div>

        <div class="record-el">
             <span id="labelling">Address:</span>
             <span id="address-content">${item.address}</span>
        </div>

        <div class="record-el">
             <span id="labelling">Contact-Number:</span>
             <span id="contact-num-content">${item.number}</span>
        </div>

        <button type="button" id="delete-btn">
             <span>
                  <i class="fas fa-trash"></i>
             </span> Delete
        </button>
        `;
        recordContainer.appendChild(newRecordDiv);
    }

// Deletion of record
recordContainer.addEventListener('click', function(event){
    // console.log(event.target);
    if(event.target.id === 'delete-btn'){
        // removing from DOM
        let recordItem = event.target.parentElement;
        recordContainer.removeChild(recordItem);
        let tempContactList = ContactArray.filter(function(record){
            return(record.id !== parseInt(recordItem.firstElementChild.lastElementChild.textContent));
        });
        ContactArray = tempContactList;
        // Removing from localstorage by overwriting
        localStorage.setItem('contacts', JSON.stringify(ContactArray));
    }
});

// Displaying status/alerts
function setMessage(status, text){
    let messageBox = document.querySelector('.message');
    if(status == "error"){
        messageBox.innerHTML = `${text}`;
        messageBox.classList.add('error');
        removeMessage(status, messageBox);
    }
    if(status == "success"){
        messageBox.innerHTML = `${text}`;
        messageBox.classList.add('success');
        removeMessage(status, messageBox);
    }
}

// Clearing all input fields
cancelBtn.addEventListener('click', function(){
      clearInputFields();
});

function clearInputFields(){
    contactName.value = "";
    address.value = "";
    number.value = "";
}

// Removing status/alerts
function removeMessage(status, messageBox){
    setTimeout (function(){
        messageBox.classList.remove(`${status}`);
    }, 2000);
}

// Input field validation    
function checkInputFields(inputArr) {
    console.log({inputArr})
    for(let i = 0; i < inputArr.length; i++){
        if(inputArr[i] === ""){
            return false;
        }    
    }
     if(!phoneNumCheck(inputArr[2])){
         return false;
     }
    return true;
}

// Phone number validation function
 function phoneNumCheck(inputtxt){
    let phoneNo = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;  
       if(inputtxt.match(phoneNo)){
         return true;
    } else {
        return false;
     }
  }

// Works for the following formats:
// XXX-XXX-XXXX
// XXX.XXX.XXXX
// XXX XXX XXXX