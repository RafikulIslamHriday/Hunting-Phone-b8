 const loadData = async(searchText = "phone", isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phones = data.data
    displayPhones(phones,isShowAll)

   //  console.log(data.data);
 }

 const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById('phone-container')
  phoneContainer.textContent = '';
  // show all container
  const showAllContainer = document.getElementById('show-all-container')
  // show all button
  if(phones.length > 12 && !isShowAll){
    showAllContainer.classList.remove('hidden')
  }else{
    showAllContainer.classList.add('hidden')
  }

  // show 12 phone
  if(!isShowAll){
    phones = phones.slice(0,12);
  }
 
// console.log(phones);

    phones.forEach(phone => {
      
    const phoneCard = document.createElement('div')
    phoneCard.classList = ("card bg-base-100 shadow-xl  p-3")
    phoneCard.innerHTML = ` <figure><img src="${phone.image}" alt="Shoes" class =' bg-sky-400' /></figure>
    <div class="card-body"> 
      <h2 class="text-2xl font-bold text-center">${phone.phone_name}</h2>
      <p class="text-center">If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions mt-3 justify-center">
        <button class="btn btn-primary " onclick="handleShowDetails('${phone.slug}')" >Show Details</button>
      </div>
    </div>`

    phoneContainer.appendChild(phoneCard)
    
   });
   toggleLoadingSpinner(false)

 }

// handle search

const handelSearch = (isShowAll) =>{
  toggleLoadingSpinner(true)
  const searchInput = document.getElementById('search-input')
  const searchText = searchInput.value
  loadData(searchText, isShowAll)
}

const toggleLoadingSpinner = (isLoading) =>{
  const loadingContainer = document.getElementById('loading-spinner');

  if(isLoading){
  loadingContainer.classList.remove('hidden')
  }else{
  loadingContainer.classList.add('hidden')
  }
}

const handleShowAll = () =>{
  handelSearch(true)
}

// show details
const handleShowDetails = async(id) => {
  console.log("click show details",id);

  // load single data for show details

  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json()
  const phone = data.data
  showPhoneDetails(phone)


}
// show phone details
const showPhoneDetails = phone =>{
  console.log(phone.name);
   const modalBody = document.getElementById('modal-body')
   const modalDiv = document.createElement('div')
   modalDiv.innerHTML = `
   <div class="px-5 py-3 rounded">
    <img src="${phone.image}" alt="" srcset="" class = "bg-sky-300 px-8 py-4">
</div>
<h2 class="text-2xl font-semibold py-2">${phone.name}</h2>
<p class = "mb-3">lorem5</p>
   `
   modalBody.appendChild(modalDiv)

  show_details_modal.showModal()
} 


loadData()


