const _HEADERS = {
	"Content-Type": "application/json",
	"Accept": "application/json"
};

// Fetch all dogs
const getDogs = () => {
	fetch("http://localhost:3000/dogs")
	.then( res => res.json() )
	.then( dogs => populateDogsList(dogs) )
};

// Take an array of dogs and populate the table
const populateDogsList = dogs => {
	const dogsTable = document.getElementById('table-body');

	// Empty the table before repoulation
	dogsTable.innerHTML = ``;

	dogs.forEach(dog => {
		dogsTable.appendChild(createDogRow(dog));
	});
};

// Return a populated tr element with data from a single dog 
const createDogRow = dog => {
	const dogTableRow = document.createElement('tr');

	
	dogTableRow.innerHTML = `
		<td>${dog.name}</td>
		<td>${dog.breed}</td>
		<td>${dog.sex}</td>
		<td><button>Edit Dog</button></td>
	`;

	// Add event listener for edit button
	dogTableRow.querySelector('button').addEventListener('click', () =>{
		populateEditForm(dog)
	});

	return dogTableRow;
};

// Populate the edit dog form with dog instance
const populateEditForm = dog => {
	const editDogForm = document.getElementById('dog-form');
	
	// Set the value of text fields to match data from dog instance
	editDogForm.name.value = dog.name;
	editDogForm.breed.value = dog.breed;
	editDogForm.sex.value = dog.sex;

	// Create submit event listener
	editDogForm.addEventListener('submit', e => {
		e.preventDefault();
		
		// Update instance of dog with the data from form.
		dog.name = editDogForm.name.value;
		dog,breed = editDogForm.breed.value;
		dog.sex = editDogForm.sex.value;

		// Create data object for patch request
		const data = {
			headers: _HEADERS,
			method: "PATCH",
			body: JSON.stringify(dog)
		};
		
		const url = `http://localhost:3000/dogs/${dog.id}`;

		fetch(url, data)
		.then( res => res.json() )
		.then(() => {
			editDogForm.reset()
			getDogs()
		})
	});
};



document.addEventListener('DOMContentLoaded', () => {
	getDogs();
})
