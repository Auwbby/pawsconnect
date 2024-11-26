const API_URL = 'https://api.petfinder.com/v2';
const CLIENT_ID = 'YOUR_CLIENT_ID'; // Replace with your API key
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET'; // Replace with your API secret

// Fetch API token
async function getToken() {
  const response = await fetch(`${API_URL}/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
  });
  const data = await response.json();
  return data.access_token;
}

// Fetch pets
async function fetchPets(location, token) {
  const response = await fetch(`${API_URL}/animals?location=${location}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  return data.animals;
}

// Display pets
function displayPets(pets) {
  const petsContainer = document.getElementById('pets-container');
  petsContainer.innerHTML = ''; // Clear previous results

  pets.forEach((pet) => {
    const petCard = `
      <div class="pet-card">
        <img src="${pet.photos[0]?.medium || 'images/placeholder.jpg'}" alt="Image of ${pet.name}">
        <h3>${pet.name}</h3>
        <p>Type: ${pet.type}</p>
        <p>Age: ${pet.age}</p>
        <a href="${pet.url}" target="_blank">Adopt Me</a>
      </div>
    `;
    petsContainer.innerHTML += petCard;
  });
}

// Handle search
document.getElementById('search-btn').addEventListener('click', async () => {
  const location = document.getElementById('location').value;
  if (location) {
    const token = await getToken();
    const pets = await fetchPets(location, token);
    displayPets(pets);
  } else {
    alert('Please enter a location!');
  }
});
