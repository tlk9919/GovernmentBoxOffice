const express = require('express');
const router = express.Router();

// 导入所有控制器
const userController = require('../controllers/userController');
const houseController = require('../controllers/houseController');
const ticketController = require('../controllers/ticketController');
const profileController = require('../controllers/profileController');

// 登录接口
const loginRoute = router.post('/login', userController.login);

// 发送验证码接口
const sendVerificationCodeRoute = router.post('/send-code', userController.sendVerificationCode);

// 获取房源详情
const getHousesRoute = router.get('/myHouses', houseController.getHouses);

// 获取筛选条件数据
const getFiltersRoute = router.get('/myFilter', houseController.getFilters);

// 获取单个房源详情
const getHouseDetailRoute = router.get('/myHouseDetail/:id', houseController.getHouseDetail);

// 获取房票
const loadTicketsRoute = router.get('/myTicket', ticketController.loadTickets);

// 获取房票详情
const loadTicketDetailsRoute = router.get('/myTicketDetail/:id', ticketController.loadTicketDetails);

// 获取个人信息
const getProfileRoute = router.get('/myProfile', profileController.findUserController);

// 导出所有路由
module.exports = {
    loginRoute,
    sendVerificationCodeRoute,
    getHousesRoute,
    getFiltersRoute,
    getHouseDetailRoute,
    loadTicketsRoute,
    loadTicketDetailsRoute,
    getProfileRoute
};
