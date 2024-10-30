const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const recognitionController = require('./controllers/recognitionController');
const authController = require('./controllers/authController');
const loggingService = require('./services/logging');
const messageQueueService = require('./services/messageQueue');

// 加载 .env 文件中的环境变量
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public'))); // 设置静态文件目录

// 路由配置
app.post('/recognize-face', recognitionController.recognizeFace);
app.post('/auth', authController.authenticateUser);

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    loggingService.log(`Server is running on port ${PORT}`);
});
