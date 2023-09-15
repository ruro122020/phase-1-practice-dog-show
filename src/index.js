document.addEventListener('DOMContentLoaded', () => {
    let dogSelected;

    //Events
    document.querySelector('form').addEventListener('submit', handleSubmit)
    //Handle Events
    function handleSubmit(e) {
        e.preventDefault()
        const form = document.querySelector('form')
        const inputs = form.querySelectorAll('input')
        const updateDogObj = {
            id: dogSelected.id,
            name: inputs[0].value,
            breed: inputs[1].value,
            sex: inputs[2].value
        }
        updateDogToServer(updateDogObj)
    }

    //Render to DOM
    function updateDogInDom(dogObj) {
        const row = document.getElementById(dogObj.id)
        const tdArray = row.querySelectorAll('td')
        tdArray[0].textContent = dogObj.name
        tdArray[1].textContent = dogObj.breed
        tdArray[2].textContent = dogObj.sex
    }

    function renderAllRegisteredDogs(dogObj) {
        //get container to render all elements created
        const dogContainer = document.getElementById('table-body')
        //create elements
        const row = document.createElement('tr')
        const dogNameCol = document.createElement('td')
        const dogBreedCol = document.createElement('td')
        const dogSexCol = document.createElement('td')
        const dogButtonCol = document.createElement('td')
        const editBtn = document.createElement('button')
        //set Attributes
        row.id = dogObj.id
        //add text to elements
        dogNameCol.textContent = dogObj.name
        dogBreedCol.textContent = dogObj.breed
        dogSexCol.textContent = dogObj.sex
        editBtn.textContent = 'Edit'
        //append to DOM
        row.appendChild(dogNameCol)
        row.appendChild(dogBreedCol)
        row.appendChild(dogSexCol)
        row.appendChild(dogButtonCol)
        dogButtonCol.appendChild(editBtn)
        dogContainer.appendChild(row)
        //handleButton
        editBtn.addEventListener('click', () => {
            //populate dog info to inputs
            const form = document.querySelector('form')
            const inputs = form.querySelectorAll('input')
            inputs[0].value = dogNameCol.textContent
            inputs[1].value = dogBreedCol.textContent
            inputs[2].value = dogSexCol.textContent
            dogSelected = {
                id: dogObj.id,
                name: inputs[0].value,
                breed: inputs[1].value,
                sex: inputs[2].value
            }
        })
    }
    //Fetch Requests
    function fetchAllRegisteredDogs() {
        fetch('http://localhost:3000/dogs')
            .then(res => res.json())
            .then(dogArray => dogArray.forEach(dogObj => renderAllRegisteredDogs(dogObj)))
    }

    function updateDogToServer(dogObj) {
        fetch(`http://localhost:3000/dogs/${dogObj.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(dogObj)
        })
            .then(res => res.json())
            .then(updatedDogObj => updateDogInDom(updatedDogObj))

    }


    //initialize 
    function init() {
        fetchAllRegisteredDogs()
    }
    init()
})