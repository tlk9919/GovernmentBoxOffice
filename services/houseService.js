const { allHouses, filters } = require('../models/houseModel');
function getAllHouses(filtersQuery) {
    // 从传入的筛选条件中解构出具体的筛选项
    let {area,areaRange,houseType,price }=filtersQuery;
    // 初始化所有房源数据，默认是未过滤的房源数据
    let filteredHouses=allHouses
    // 根据筛选条件逐一过滤房源数据
    // 根据地区过滤房源
    if(area){
        filteredHouses=filteredHouses.filter(house => {  return house.area===area})
    }
    //根据面积范围过滤房源
    if(areaRange){
        filteredHouses=filteredHouses.filter(house => { return house.areaRange===areaRange})
    }
    //根据户型过滤房源
    if(areaRange){
        houseType=filteredHouses.filter(house => {return house.houseType===houseType})
    }
    //据价格范围过滤房源
    if(areaRange){
        houseType=filteredHouses.filter(house => {return house.price===price})
    }
    // 返回过滤后的房源数据
    return filteredHouses;

}
// 获取筛选条件数据
function getFilters(){
    return filters;
}
//房源详情
async function getHousesDetailById(houseId){
    try {
        const house = await allHouses.find((h) => {
            return h.id === houseId
        })
        console.log('获取的房源信息：',house)
        if (house) {
            return house
        } else {
            console.log('查看房源详情失败');
        }
    } catch (e) {
        throw new Error('房源未找到')
    }
}

module.exports={
    getAllHouses,
    getFilters,
    getHousesDetailById
}