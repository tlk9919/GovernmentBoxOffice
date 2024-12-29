const allHouses = [
    {
        id: 1,
        name: '万科金域南湾二期项目',
        address: '天河区珠吉街道黄埔大道第758号',
        area: '天河区',
        areaRange: '45-109m²',
        houseType: '二室',
        price: '150-250万',
        count: 50,
        priceRange: '150万-250万',
        imageUrl: '/assets/images/index/house1.png',
        RecordPrice: '20000',
        RecordTotalPrice: '200万',
        project: '万科金域南湾二期',
        developer: '万科地产',
        location: '天河区珠吉街道黄埔大道第758号',
        building: '1栋',
        floor: '12层',
        roomNumber: '1201',
        measuredArea: '98.5',
        innerArea: '86.3',
        status: '可售',
        region: '天河区'
    },
    {
        id: 2,
        name: '万科金域南湾三期项目',
        address: '天河区珠吉街道黄埔大道第758号',
        area: '天河区',
        areaRange: '60-120m²',
        houseType: '三室',
        price: '250-350万',
        count: 30,
        priceRange: '250万-350万',
        imageUrl: '/assets/images/index/house2.png',
        RecordPrice: '30000',
        RecordTotalPrice: '300万',
        project: '万科金域南湾三期',
        developer: '万科地产',
        location: '天河区珠吉街道黄埔大道第758号',
        building: '2栋',
        floor: '15层',
        roomNumber: '1502',
        measuredArea: '108.7',
        innerArea: '96.2',
        status: '已售',
        region: '天河区'
    },
    {
        id: 3,
        name: '绿地中央公馆',
        address: '天河区珠吉街道黄埔大道第758号',
        area: '珠吉街道',
        areaRange: '50-80m²',
        houseType: '一室',
        price: '200-300万',
        count: 20,
        priceRange: '200万-300万',
        imageUrl: '/assets/images/index/house3.png',
        RecordPrice: '25000',
        RecordTotalPrice: '250万',
        project: '绿地中央公馆',
        developer: '绿地集团',
        location: '天河区珠吉街道黄埔大道第758号',
        building: '3栋',
        floor: '10层',
        roomNumber: '1003',
        measuredArea: '76.4',
        innerArea: '65.0',
        status: '可售',
        region: '珠吉街道'
    },
    {
        id: 4,
        name: '恒大天汇',
        address: '珠吉街道黄埔大道',
        area: '珠吉街道',
        areaRange: '60-120m²',
        houseType: '二室',
        price: '180-250万',
        count: 40,
        priceRange: '180万-250万',
        imageUrl: '/assets/images/index/house1.png',
        RecordPrice: '22000',
        RecordTotalPrice: '220万',
        project: '恒大天汇',
        developer: '恒大地产',
        location: '珠吉街道黄埔大道',
        building: '1栋',
        floor: '8层',
        roomNumber: '801',
        measuredArea: '89.2',
        innerArea: '77.8',
        status: '在售',
        region: '珠吉街道'
    }
];

// 获取筛选条件
const filters = {
    areas: ['天河区', '珠吉街道'],  // 区域数据
    areaRanges: ['45-109m²', '60-120m²', '50-80m²'],  // 面积范围数据
    houseTypes: ['一室', '二室', '三室'],  // 户型数据
    prices: ['150-250万', '200-300万', '250-350万']  // 总价数据
};

module.exports = { allHouses, filters };