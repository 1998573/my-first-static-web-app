const faceApi = require('../faceModel/face-api.min.js');
const messageQueueService = require('../services/messageQueue');
const loggingService = require('../services/logging');

exports.recognizeFace = async (req, res) => {
    try {
        const { image } = req.body;
        // 进行人脸识别的处理
        const results = await faceApi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();

        // 将识别结果发送到消息队列，处理后续任务
        messageQueueService.sendMessage(results);
        
        res.status(200).json({ success: true, results });
    } catch (error) {
        loggingService.logError('Recognition failed', error);
        res.status(500).json({ success: false, message: 'Recognition failed', error });
    }
};
