const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes'); // 引入所有路由

require('dotenv').config();
const app = express();

// 使用中间件来解析请求体
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 注册所有路由
app.use('/api/user', routes.loginRoute);
app.use('/api/houses', routes.getHousesRoute);
app.use('/api/filters', routes.getFiltersRoute);
app.use('/api/houseDetail', routes.getHouseDetailRoute);
app.use('/api/ticket', routes.loadTicketsRoute);
app.use('/api/ticketDetail', routes.loadTicketDetailsRoute);
app.use('/api/profile', routes.getProfileRoute);

// 启动服务器
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`监听端口:${PORT}`);
});
