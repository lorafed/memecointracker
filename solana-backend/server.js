const express = require('express');
const axios = require('axios');
const app = express();
const port = 5001;

const apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkQXQiOjE3Mzk0MTI5MjIzMTMsImVtYWlsIjoibG9yYS5mZWQuMDNAZ21haWwuY29tIiwiYWN0aW9uIjoidG9rZW4tYXBpIiwiYXBpVmVyc2lvbiI6InYyIiwiaWF0IjoxNzM5NDEyOTIyfQ.Za-3k9hXYiqgMj42NheBATmD1xiiueNHeooRvMKh2bM';

app.get('/api/wallet/:walletAddress', async (req, res) => {
  const apiUrl = 'https://public-api.solscan.io/chaininfo'; // Replace with your desired endpoint

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        token: apiToken // Use the token header
      }
    });

    // Clean up the response to return only the necessary data
    res.json({
      success: true,
      data: response.data.data // Return only the main "data" part of the response
    });
  } catch (error) {
    console.error('Error fetching data:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: error.response?.data?.error_message || 'Error fetching data'
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});