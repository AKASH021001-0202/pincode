const pincodeInput = document.querySelector('#pincode-input');
const getDetailsBtn = document.querySelector('#get-details-btn');
const detailsContainer = document.querySelector('#details-container');
const searchPincode = document.querySelector('#search-pincode');

getDetailsBtn.addEventListener('click', () => {
  const pincode = pincodeInput.value;
  if (pincode !== '') {
    fetch(`https://api.postalpincode.in/pincode/${pincode}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        displayDetails(data);
        pincodeInput.value = '';
      })
      .catch(error => {
        displayError(error.message);
      });
  } else {
    displayError('Please enter a PIN code');
  }
});

function displayDetails(data) {
  console.log(data)
  searchPincode.innerHTML ='';
  searchPincode.textContent = `POST OFFICES LOCATED WITHIN THE PIN CODE : ${pincodeInput.value}`;
  
  detailsContainer.innerHTML = '';

  data[0].PostOffice.forEach(postOffice => {
    
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <h2>${postOffice.Name}</h2>
     
      <p>PIN Code: ${postOffice.Pincode}</p>

      <p>Circle: ${postOffice.Circle}</p>
      <p>District: ${postOffice.District}</p>
      <p>Division: ${postOffice.Division}</p>
      <p>Region: ${postOffice.Region}</p>
      <p>State: ${postOffice.State}</p>
      <p>Country: ${postOffice.Country}</p>
    `;
    detailsContainer.appendChild(card);
  });
}


function displayError(message) {
  detailsContainer.innerHTML = `<p class="error">${message}</p>`;
}
