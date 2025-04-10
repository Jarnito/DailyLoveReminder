const API_BASE_URL = window.location.hostname === 'localhost' 
? 'http://localhost:3000'
: 'https://dailylovereminder-backend.onrender.com';

async function displayLoveMessage() {
    try {
        console.log('Fetching love message...'); // Debug log
        const response = await fetch(`${API_BASE_URL}/api/love-message`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Love message received:', data.message); // Debug log

        const loveMessageElement = document.getElementById('loveMessage');
        console.log('Love message element:', loveMessageElement); // Debug log
        const imageElement = document.getElementById('image') as HTMLImageElement;
        
        if (loveMessageElement) {
            loveMessageElement.textContent = data.message;
            console.log('Message displayed successfully'); // Debug log
        } else {
            console.error('Love message element not found');
        }

        if (imageElement && data.image) {
            imageElement.src = `${API_BASE_URL}/images/${data.image}`
            imageElement.style.display = 'block';
            console.log('Image displayed successfully'); // Debug log
        } else {
            console.error('Image element not found');
        }
        
    } catch (error) {
        console.error('Error fetching love message/image:', error);
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, calling displayLoveMessage...'); // Debug log
    displayLoveMessage();
});