const axios = require('axios');
const { sendMessage } = require('../services/messageQueue');
const { logError } = require('../services/logging');

exports.recognizeFace = async (req, res, next) => {
    const { imageUrl } = req.body;

    try {
        const response = await axios.post(
            `${process.env.FACE_API_ENDPOINT}/face/v1.0/detect`,
            { url: imageUrl },
            {
                headers: {
                    'Ocp-Apim-Subscription-Key': process.env.FACE_API_KEY,
                    'Content-Type': 'application/json'
                },
                params: {
                    returnFaceId: true,
                    returnFaceAttributes: 'age,gender,emotion'
                }
            }
        );

        const faceData = response.data;
        sendMessage('faceRecognitionQueue', faceData);
        res.json({ message: 'Face recognition data sent for processing', data: faceData });
    } catch (error) {
        logError('Face recognition failed', error);
        next(error);
    }
};
