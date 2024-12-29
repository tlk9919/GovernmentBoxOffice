// 模拟数据库数据
const tickets = [
    {
        id: 1,
        collectionUnit: '单位A',
        status: '未使用',
        amount: 100,
        validFrom: '2024-01-01',
        validTo: '2024-12-31',
        ticketCode: '123456789',
        collectionBatch: '2024-001',
        agreementNumber: 'AGT-2024-001',
        totalAmount: '500000元',
        validityPeriod: '2024-12-31~2024-12-31',
        issueDate: '2024-11-29',
        qrcodeUrl: '/assets/images/ticketDetail/qr_code.png',
        statusImage: ''
    },
    {
        id: 2,
        collectionUnit: '单位B',
        status: '已使用',
        amount: 200,
        validFrom: '2024-02-01',
        validTo: '2024-11-30',
        ticketCode: '987654321',
        collectionBatch: '2024-002',
        agreementNumber: 'AGT-2024-002',
        totalAmount: '800000元',
        validityPeriod: '2024-11-30~2024-11-30',
        issueDate: '2024-10-29',
        qrcodeUrl: '/assets/images/ticketDetail/qr_code.png',
        statusImage: ''
    }
];

// 更新 tickets 数组，根据 status 字段关联对应的 statusImage
tickets.forEach(ticket => {
    if (ticket.status === '已使用') {
        ticket.statusImage = '/assets/images/ticketDetail/icon_used.png';
    } else if (ticket.status === '未使用') {
        ticket.statusImage = '/assets/images/ticketDetail/no_use.png';
    }
});


module.exports = { tickets };
