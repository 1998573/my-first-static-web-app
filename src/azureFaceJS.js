const axios = require('axios');
const endpoint = "https://acjjface.cognitiveservices.azure.com/face/v1.0/detect";
const subscriptionKey = "YOUR_AZURE_SUBSCRIPTION_KEY";

async function detectFace(imageData) {
    try {
        const response = await axios.post(endpoint, imageData, {
            headers: {
                'Content-Type': 'application/octet-stream',
                'Ocp-Apim-Subscription-Key': subscriptionKey,
            },
        });
        return response.data.length > 0;
    } catch (error) {
        console.error("Azure Face API error:", error);
        throw error;
    }
}

module.exports = { detectFace };
