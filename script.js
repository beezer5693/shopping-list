const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

const createIcon = classes => {
	const icon = document.createElement('i');
	icon.className = classes;
	return icon;
};

const createButton = classes => {
	const button = document.createElement('button');
	button.className = classes;
	const icon = createIcon('fa-solid fa-xmark');
	button.appendChild(icon);
	return button;
};

const addItem = e => {
	e.preventDefault();

	const newItem = itemInput.value;

	// Validate input
	if (newItem === '') {
		alert('Please add an item!');
		return;
	}

	// Create list item
	const li = document.createElement('li');
	li.appendChild(document.createTextNode(newItem));

	const button = createButton('remove-item btn-link text-red');
	li.appendChild(button);

	itemList.appendChild(li);

	itemForm.reset();
};

itemForm.addEventListener('submit', addItem);
