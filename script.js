const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const filter = document.getElementById('filter');

const itemsCheck = () => {
	const items = itemList.querySelectorAll('li');
	clearBtn.style.display = !items.length ? 'none' : 'block';
	filter.style.display = !items.length ? 'none' : 'block';
};

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

	// Add li to the DOM
	itemList.appendChild(li);

	itemsCheck();
	itemForm.reset();
};

const removeItem = e => {
	if (e.target.parentElement.classList.contains('remove-item')) {
		if (confirm('Are you sure?')) {
			e.target.parentElement.parentElement.remove();
		}
		itemsCheck();
	}
};

const clearItems = () => {
	while (itemList.firstChild) {
		itemList.removeChild(itemList.firstChild);
	}
	itemsCheck();
};

const filterItems = e => {
	const allItems = itemList.querySelectorAll('li');

	allItems.forEach(item => {
		if (item.textContent.toLowerCase().includes(e.target.value.toLowerCase())) {
			item.style.display = 'flex';
		} else {
			item.style.display = 'none';
		}
	});
};

itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
filter.addEventListener('input', filterItems);
