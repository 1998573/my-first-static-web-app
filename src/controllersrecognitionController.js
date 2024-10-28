const axios = require('axios');
const multer = require('multer');
const fs = require('fs');

// 设置 multer 存储配置
const upload = multer({ dest: 'uploads/' });

exports.upload = upload.single('image');

exports.recognizeFace = async (req, res) => {
    const imagePath = req.file.path;

    try {
        // 读取图像文件并转换为 base64
        const imageData = fs.readFileSync(imagePath);
        const imageBase64 = imageData.toString('base64');

        // 发送图像到 Azure Face API
        const response = await axios.post(
            `${process.env.FACE_API_ENDPOINT}/face/v1.0/detect`,
            Buffer.from(imageBase64, 'base64'),  // 将图像作为二进制数据发送
            {
                headers: {
                    'Ocp-Apim-Subscription-Key': process.env.FACE_API_KEY,
                    'Content-Type': 'application/octet-stream'
                },
                params: {
                    returnFaceId: true,
                    returnFaceAttributes: 'age,gender,emotion'
                }
            }
        );

        const faceData = response.data;
        res.json({ message: 'Face recognized', data: faceData });
    } catch (error) {
        console.error("Face recognition failed:", error);
        res.status(500).json({ error: 'Face recognition failed' });
    } finally {
        // 删除临时文件
        fs.unlinkSync(imagePath);
    }
};
