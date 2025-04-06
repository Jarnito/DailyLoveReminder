"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_BASE_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : 'https://dailylovereminder-backend.onrender.com';
function displayLoveMessage() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Fetching love message...');
            const response = yield fetch(`${API_BASE_URL}/api/love-message`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = yield response.json();
            console.log('Love message received:', data.message);
            const loveMessageElement = document.getElementById('loveMessage');
            console.log('Love message element:', loveMessageElement);
            const imageElement = document.getElementById('image');
            if (loveMessageElement) {
                loveMessageElement.textContent = data.message;
                console.log('Message displayed successfully');
            }
            else {
                console.error('Love message element not found');
            }
            if (imageElement && data.image) {
                imageElement.src = `${API_BASE_URL}/images/${data.image}`;
                imageElement.style.display = 'block';
                console.log('Image displayed successfully');
            }
            else {
                console.error('Image element not found');
            }
        }
        catch (error) {
            console.error('Error fetching love message/image:', error);
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, calling displayLoveMessage...');
    displayLoveMessage();
});
