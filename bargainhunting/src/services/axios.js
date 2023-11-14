import Axios from 'axios';

const axiosInstance = Axios.create({
    baseURL: 'http://localhost:3000/api', // Replace with the URL of your Node.js backend
    timeout: 10000, // Adjust the timeout as needed
});

export default axiosInstance;
