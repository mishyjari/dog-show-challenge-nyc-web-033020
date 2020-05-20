// Fetch all dogs
const getDogs = () => {
	return fetch("http://localhost:3000/dogs")
	.then( res => res.json() )
	.then( dogs => populateDogsList(dogs) )
};

// Take an array of dogs and populate the table
const populateDogsList = dogs => {
	const dogsTable = document.getElementById('table-body');

	dogs.forEach(dog => {
		dogsTable.appendChild(createDogRow(dog));
	})
};

// Return a populated tr element with data from a single dog 
const createDogRow = dog => {
	const dogTableRow = document.createElement('tr');
	
	dogTableRow.id = `dog$dog.id`
	dogTableRow.innerHTML = `
		<td>${dog.name}</td>
		<td>${dog.breed}</td>
		<td>${dog.sex}</td>
		<td><button>Edit Dog</button></td>
	`;

	// Add event listener for edit button
	dogTableRow.querySelector('button').addEventListener('click', () =>{
	
	});

	return dogTableRow;
}


document.addEventListener('DOMContentLoaded', () => {
	getDogs();
})
