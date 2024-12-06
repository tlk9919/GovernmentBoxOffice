const houses = [
  {
    id: 1,
    name: '房源1',
    address: '地址1',
    price: 10000,
    totalPrice: 1200000,
    image: '/assets/images/placeholder.jpg',
    project: '项目1',
    developer: '开发商A',
    location: '成都理工大学附近',
    building: '1号楼',
    floor: 2,
    roomNumber: '201',
    type: '三居室',
    measuredArea: 120.5,
    innerArea: 110.0,
    status: '在售',
    region: '成都市区',
  },
  // 其他房源数据
];

exports.getHouses = (req, res) => {
  res.json(houses);
};

exports.getHouseDetail = (req, res) => {
  const { id } = req.params;
  const house = houses.find((item) => item.id == id);
  if (house) {
    res.json(house);
  } else {
    res.status(404).send('房源未找到');
  }
};
