// Select the form, input, and list elements from the HTML
const form = document.querySelector('form');
const input = document.querySelector('#new-item');
const itemsList = document.querySelector('#items');

// Load items from local storage, or create an empty array
// if there are none
const items = JSON.parse(localStorage.getItem('items')) || [];

// Display the items in the list
function displayItems() {
    const itemsHTML = items.map((item, index) => {
        // Split the item string into the text and priority values
        const [text, priority] = item.split(':');
        // Create a list item with a span for the text and
        // a span for the priority
        return `
      <li>
        <span class="item-text">${text}</span>
        <span class="item-priority">${priority}</span>
        <button class="delete-btn" data-index="${index}">Delete</button>
      </li>
    `;
    });
    itemsList.innerHTML = itemsHTML.join('');
}

const priorityInput = document.querySelector('#priority');

function addItem(e) {
    e.preventDefault();
    const text = input.value.trim();
    const priority = priorityInput.value.trim();
    if (text.length && priority.length && priority >= 1 && priority <= 5) {
        items.push('${text}:${priority}');
        localStorage.setItem('items', JSON.stringify(items));
        input.value = '';
        priorityInput.value = '';
        displayItems();
    }
}

// Delete an item from the list
function deleteItem(e) {
    if (e.target.matches('.delete-btn')) {
        const index = e.target.dataset.index;
        items.splice(index, 1);
        localStorage.setItem('items', JSON.stringify(items));
        displayItems();
    }
}

// Add event listeners to the form and list elements
form.addEventListener('submit', addItem);
itemsList.addEventListener('click', deleteItem);

// Call the displayItems function to initially display the items
// in the list
displayItems();
