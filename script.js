const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const filter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

function displayItems() {
	const itemsFromStorage = getItemsFromStorage();
	itemsFromStorage.forEach(item => addItemToDOM(item));
	checkUI();
}

function checkUI() {
	const items = itemList.querySelectorAll('li');

	clearBtn.style.display = !items.length ? 'none' : 'block';
	filter.style.display = !items.length ? 'none' : 'block';

	formBtn.innerHTML = isEditMode
		? '<i class="fa-solid fa-pen"></i> Update Item'
		: '<i class="fa-solid fa-plus"></i> Add Item';
	formBtn.style.backgroundColor = isEditMode ? '#228B22' : '#000';
}

function createIcon(classes) {
	const icon = document.createElement('i');
	icon.className = classes;
	return icon;
}

function createButton(classes) {
	const button = document.createElement('button');
	button.className = classes;
	const icon = createIcon('fa-solid fa-xmark');
	button.appendChild(icon);
	return button;
}

function onAddItemSubmit(e) {
	e.preventDefault();
	const newItem = itemInput.value;

	// Validate input
	if (newItem === '') {
		alert('Please add an item!');
		return;
	}

	// Check for edit mode
	// Edit item is really just removing the item that we clicked on
	// in onItemClick function and removing it and then adding whatever text we
	// type into input field as an item
	if (isEditMode) {
		const itemToEdit = itemList.querySelector('.edit-mode');

		removeItemFromStorage(itemToEdit.textContent);

		itemToEdit.classList.remove('edit-mode');

		itemToEdit.remove();

		isEditMode = false;
	} else {
		if (checkIfItemExists(newItem)) {
			alert('That item already exists!');
			return;
		}
	}

	// Create item DOM element
	addItemToDOM(newItem);

	// Add item to local storage
	addItemtoStorage(newItem);

	checkUI();

	itemForm.reset();
}

function addItemToDOM(item) {
	const li = document.createElement('li');
	li.appendChild(document.createTextNode(item));
	const button = createButton('remove-item btn-link text-red');
	li.appendChild(button);

	itemList.appendChild(li);
}

function addItemtoStorage(item) {
	const itemsFromStorage = getItemsFromStorage();

	// Add new item to array
	itemsFromStorage.push(item);

	// Convert to JSON string and set to local storage
	localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
	let itemsFromStorage;

	if (localStorage.getItem('items') === null) {
		itemsFromStorage = [];
	} else {
		itemsFromStorage = JSON.parse(localStorage.getItem('items'));
	}

	return itemsFromStorage;
}

function onItemClick(e) {
	if (e.target.parentElement.classList.contains('remove-item')) {
		removeItem(e.target.parentElement.parentElement);
	} else {
		setItemToEdit(e.target);
		checkUI();
	}
}

function checkIfItemExists(item) {
	const itemsFromStorage = getItemsFromStorage();
	return itemsFromStorage.includes(item);
}

function setItemToEdit(item) {
	isEditMode = true;

	itemList.querySelectorAll('li').forEach(i => i.classList.remove('edit-mode'));

	item.classList.add('edit-mode');

	itemInput.value = item.textContent;
}

function removeItem(item) {
	if (confirm('Are you sure?')) {
		// Remove item from DOM
		item.remove();

		// Remove item from storage
		removeItemFromStorage(item.textContent);

		checkUI();
	}
}

function removeItemFromStorage(item) {
	const itemsFromStorage = getItemsFromStorage();

	// Filter out all items that are not equal to the item passed in param
	const filteredItems = itemsFromStorage.filter(storageItem => storageItem !== item);

	// Re-set to localstorage
	localStorage.setItem('items', JSON.stringify(filteredItems));
}

function filterItems(e) {
	const allItems = itemList.querySelectorAll('li');

	allItems.forEach(item => {
		if (item.textContent.toLowerCase().includes(e.target.value.toLowerCase())) {
			item.style.display = 'flex';
		} else {
			item.style.display = 'none';
		}
	});
}

function clearItems() {
	while (itemList.firstChild) {
		itemList.removeChild(itemList.firstChild);
	}

	// Clear from local storage
	localStorage.removeItem('items');

	checkUI();
}

// Initialize app
function init() {
	checkUI();
	itemForm.addEventListener('submit', onAddItemSubmit);
	itemList.addEventListener('click', onItemClick);
	clearBtn.addEventListener('click', clearItems);
	filter.addEventListener('input', filterItems);
	document.addEventListener('DOMContentLoaded', displayItems);
}

init();
