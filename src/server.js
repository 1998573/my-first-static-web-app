require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authController = require('./controllers/authController');
const recognitionController = require('./controllers/recognitionController');
const { errorHandler } = require('./middlewares/errorHandler');
const app = express();

app.use(bodyParser.json());

// 路由
app.post('/register', authController.register);
app.post('/login', authController.login);
app.post('/recognize-face', recognitionController.recognizeFace);

// 错误处理
app.use(errorHandler);

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
