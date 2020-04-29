const dogURL = 'http://localhost:3000/dogs'
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

document.addEventListener('DOMContentLoaded', () => {
  getDogs()
  setUpSubmit()

})

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
    }
  })
}

function setUpSubmit () {
  const submitBtn = document.querySelector('input[type=submit]')
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    updateDogTable()

    console.log("submit clicked")
  })
}

function updateDogTable (dogObj, dogId) {
  console.log("am i a dog id?", dogId)
  fetch(`` , {
    method: 'PATCH',
    headers,
    body: JSON.stringify(dogObj)
  })
}
