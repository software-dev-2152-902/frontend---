import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const sensorAPI = {
    getData: () => api.get('/sensors/data'),
};

export const aiAPI = {
    getPlan: (data) => api.post('/ai/getPlan', data),
};

export const blockchainAPI = {
    getBalance: (address) => api.get(`/blockchain/balance/${address}`),
    transfer: (data) => api.post('/blockchain/transfer', data),
};