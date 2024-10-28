const users = []; // 假设的用户存储，实际应用中应使用数据库
const { logInfo } = require('../services/logging');

exports.register = (req, res, next) => {
    const { employeeID, fullName, email, password } = req.body;
    if (users.some(user => user.employeeID === employeeID)) {
        return res.status(400).json({ message: 'User already exists' });
    }
    users.push({ employeeID, fullName, email, password });
    logInfo(`User registered: ${employeeID}`);
    res.status(201).json({ message: 'Registration successful' });
};

exports.login = (req, res, next) => {
    const { employeeID, password } = req.body;
    const user = users.find(user => user.employeeID === employeeID && user.password === password);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    logInfo(`User logged in: ${employeeID}`);
    res.json({ message: 'Login successful' });
};
