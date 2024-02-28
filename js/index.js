const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhone(phones, isShowAll);
};

const displayPhone = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  // clear phone container cards before adding new cards
  phoneContainer.textContent = "";

  // display show all button if there are more then 12 phones 
  const showAllContainer = document.getElementById('show-all-container')
  if( phones.length > 12 && !isShowAll){
    showAllContainer.classList.remove('hidden')
  }
  else{
    showAllContainer.classList.add('hidden')
  }
  // display only first 12 phones if not show all 
  if (!isShowAll){
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    // console.log(phone)
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card w-full bg-gray-100 shadow-xl p-8  `;
    // set innerHtml
    phoneCard.innerHTML = `
        <figure ><img class="w-fu" src="${phone.image}" alt="Shoes" /></figure>
<div class="card-body">
  <h2 class="card-title text-center">${phone.phone_name}</h2>
  <p>There are many variations of passages of available, but the majority have suffered</p>
  <div class="card-actions justify-center">
    <button onclick ="handelShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
  </div>
</div>`;
    // appendChild
    phoneContainer.appendChild(phoneCard);
  });
  // hide loading spinner
  toggleLoadingSpinner(false)

};

const handelShowDetail = async (id) =>{

    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()

    console.log('click show details', id)

}
// handel search button
const handlerSearch = (isShowAll) => {
    toggleLoadingSpinner(true)
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // console.log(searchText)
  loadPhone(searchText, isShowAll);
};


const toggleLoadingSpinner = (isLoading)=> {
    const loadingSpinner = document.getElementById('loading-spinner')
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    } else{
        loadingSpinner.classList.add('hidden')
    }
  
}

const handlerShowAll = ()=>{
    handlerSearch(true)
}