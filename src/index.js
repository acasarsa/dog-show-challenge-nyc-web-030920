const dogURL = 'http://localhost:3000/dogs'
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}
// let dogId  // how to make this global?


document.addEventListener('DOMContentLoaded', () => {
  
  getDogs()
  
  
  setUpSubmit()

  // let dogId = dog.id // dog is not defined... 
  // console.log(dogId)
})

// abstraction

function getDogs () {
  fetch(dogURL)
  .then(r => r.json())
  .then(dogs => {
    dogs.forEach(dog => {
      renderDog(dog)
      
    });
  })
}

function renderDog (dog) {
  const dogTableBody = document.querySelector('#table-body')
  let tr = document.createElement('tr')
  tr.dataset.id = dog.id
  tr.innerHTML = `
      <td>${dog.name}</td> 
      <td>${dog.breed}</td> 
      <td>${dog.sex}</td> 
      <td><button class="edit-dog">Edit Dog </button></td>
  `
  dogTableBody.append(tr)
  // how do i abstract this and make sure it is added to the right tr ?? 
  // how to dynamically use the dataset.id i put in... but don't know

  ///////
  // if i had dog object global i could abstract this /// 
  //////
  tr.addEventListener('click', (e) => {

    if (e.target.className === 'edit-dog') {
      // const dogForm = document.getElementById('dog-form')
      // change input values
      const dogNameInput = document.querySelector('[name="name"]')
      dogNameInput.value = dog.name

      const dogBreedInput = document.querySelector('[name="breed"]')
      dogBreedInput.value = dog.breed

      const dogSexInput = document.querySelector('[name="sex"]')
      dogSexInput.value = dog.sex

      const dogForm = document.getElementById('dog-form')
      dogForm.dataset.id = dog.id
    }
  })
}

function setUpSubmit () {
  const submitBtn = document.querySelector('input[type=submit]')
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    // console.log(e.target.parentNode)
    const dogNameInput = document.querySelector('[name="name"]')
    let nameInput = dogNameInput.value

    const dogBreedInput = document.querySelector('[name="breed"]')
    let breedInput = dogBreedInput.value

    const dogSexInput = document.querySelector('[name="sex"]')
    let sexInput = dogSexInput.value

    // how to access dataset.id from somewhere else??? this is a huge issue i need to understand. 

    const dogFormParent = e.target.parentNode
    const dogId = dogFormParent.dataset.id
    console.log(dogId)

    // let formData = new FormData()
    // formData.append('name', )

    const newDog = {
      name: nameInput,
      breed: breedInput,
      sex: sexInput
    }
    updateDogTable(newDog, dogId) 
    

    console.log("submit clicked")
  })
  
}

function updateDogTable (dogObj, dogId) {
  console.log("am i a dog id?", dogId)
  fetch(`${dogURL}/${dogId}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(dogObj)
  })
  // await getDogs()
  .then(r => r.json())
  .then(renderDog(dogObj))
}

// can also run getDogs() instead of the .then's
// with this way it will at least update the values when u click edit after submit.... not that helpful though. 
// but does let you know on front end that it was updated
