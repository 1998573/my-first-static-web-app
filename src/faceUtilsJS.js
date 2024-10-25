const { AzureFaceClient } = require('./azureFaceClient');

async function processFaceRecognition(imageData) {
    try {
        const result = await AzureFaceClient.detectFace(imageData);
        return result.isIdentified;
    } catch (error) {
        console.error("Failed to process facial recognition:", error);
        return false;
    }
}

module.exports = { processFaceRecognition };
