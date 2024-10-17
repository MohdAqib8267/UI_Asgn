// Dummy Data for Client Information

const clients = [];

function getClientsFromLocalStorage() {
    // Loop through localStorage and find keys with '@'
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        console.log(key);

        // Check if the key contains '@'
        if (key.includes('@')) {
            let userData = localStorage.getItem(key);

            // Parse the JSON data and push it into the clients array
            try {
                let parsedData = JSON.parse(userData); // Assuming the data is stored in JSON format
                clients.push(parsedData);
            } catch (e) {
                console.error(`Error parsing data for ${key}:`, userData);
            }
        }
    }

    // Now you can display this data in your table
    const userDetails = document.getElementById('userDetails'); // Assuming you have a table body with this ID

    if (clients.length > 0) {
        userDetails.innerHTML = clients.map((item, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${item.username}</td>
            <td>${item.contact}</td>
            <td>${item.tickets.length}</td>
            <td><button onclick="deleteCustomer('${item.email}')">Delete</button></td>
        </tr>
    `).join(''); 
    } else {
        userDetails.innerHTML = '<tr><td colspan="5">No clients found</td></tr>';
    }
}

// Call the function to populate clients and display them when the page loads
window.onload = getClientsFromLocalStorage;



// const clients = [
//     { id: 1, name: 'Kuldeep Rathore', mobile: '+123456789', ticketsBooked: 5 },
//     { id: 2, name: 'Shivam Birla', mobile: '+987654321', ticketsBooked: 3 },
// ];

// Function to logout
function logout() {
    // Redirect to the login page (replace 'login.html' with the actual login page)
    window.location.href = 'login.html';
}

// Function to display client data
// function displayClients() {
//     const clientData = document.getElementById('client-data');
//     clientData.innerHTML = ''; // Clear existing data
//     clients.forEach(client => {
//         const row = `<tr>
//             <td>${client.email}</td>
//             <td>${client.username}</td>
//             <td>${client.contact}</td>
//             // <td>${client.ticketsBooked}</td>
//             <td><button onclick="deleteCustomer(${client.id})">Delete</button></td>
//         </tr>`;
//         clientData.innerHTML += row;
//     });
// }

// Function to delete a customer
function deleteCustomer(email) {
    // console.log(email)
   localStorage.removeItem(email);
   alert("Deleted Successfully.")
}

// Function to handle train registration
document.getElementById('register-train-form')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const Train = document.getElementById('train-name').value;
    const numberOfSeats = document.getElementById('number-of-seats').value;
    const Boarding = document.getElementById('from').value;
    const Designation = document.getElementById('to').value;
    const ownership = document.getElementById('ownership').value;
    const Ticket = 500;
    const Class='AC1';

    if (Train && numberOfSeats && Boarding && to && ownership) {
        const newTrain = { Train, numberOfSeats, Boarding, Designation, ownership,Ticket,Class };
        
        // Get existing trains from local storage
        const registeredTrains = JSON.parse(localStorage.getItem('registeredTrains')) || [];
        registeredTrains.push(newTrain);
        
        // Save updated trains to local storage
        localStorage.setItem('registeredTrains', JSON.stringify(registeredTrains));

        alert('Train Registered Successfully!');
        
        // Clear the form after submission
        this.reset();
        
        // Optionally, you could display the registered trains on the same page
        // but here we are displaying it when the home page loads.
    } else {
        alert('Please fill in all fields.');
    }
});

// Function to display registered trains
function displayRegisteredTrains() {
    const trainData = document.getElementById('train-data');
    trainData.innerHTML = ''; // Clear existing data

    // Get registered trains from local storage
    const registeredTrains = JSON.parse(localStorage.getItem('registeredTrains')) || [];

    if (registeredTrains.length > 0) {
        // Build the table rows as a single string
        const rows = registeredTrains.map(train => `
            <tr>
                <td>${train.Train}</td>
                <td>${train.numberOfSeats}</td>
                <td>${train.Boarding}</td>
                <td>${train.Designation}</td>
                <td>${train.ownership}</td>
            </tr>
        `).join('');

        // Insert the rows into the table body
        trainData.innerHTML = rows;
    } else {
        // If no trains are registered, display a message
        trainData.innerHTML = '<tr><td colspan="5">No trains registered</td></tr>';
    }
}

// Initial display of clients and registered trains on the home page
// window.onload = displayRegisteredTrains;

window.onload = function() {
    getClientsFromLocalStorage();
    displayRegisteredTrains();
}



