var Product = require('../models/product.js');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopping');

var products = [
	new Product({
		title: "ÁO THUN TRẮNG I LOVE YOU",
		type: 'tee',
		price: 10,
		origin: "Khai silk",
		imagePath: "/img/sample1.jpg",
		saleoff: 10,
		description: "Với thiết kế trẻ trung, năng động, áo thun League Legends sẽ tạo cho khách hàng của bạn cảm giác thoải mái nhất khi mặc.",
		color: 'white',
		number: 30
	}),
	new Product({
		title: "ÁO THUN NAM 3D THÁI LAN in hình JOKER",
		type: 'polo',
		price: 25,
		origin: "NICE GUY",
		imagePath: "/img/sample04.jpg",
		saleoff: 0,
		description: "Chất liệu vải: thun lươi siêu thoáng mát, phù hợp cho mua hẻ nóng bức, thoải mái hoạt động không lo bị nóng. ",
		color: 'gray',
		number: 30
	}),
	new Product({
		title: "Áo thun cotton nhóm in họa tiết mùa hè giá sỉ",
		type: 'tee',
		price: 10,
		origin: "huonglanvo",
		imagePath: "/img/sample03.jpg",
		saleoff: 0,
		description: "Áo thun: Cotton 4 chiều cao cấp, co giãn tốt, thoáng mát. Hình in bằng loại mực tốt, không độc hại, đảm bảo không bung tróc.",
		color: 'white',
		number: 30
	}),
	new Product({
		title: "Áo Thun Ngắn Tay Cổ Tròn In Hình Go-ku Geometric",
		type: 'polo',
		price: 10,
		origin: "sea_starclothing",
		imagePath: "/img/sample02.jpg",
		saleoff: 15,
		description: "Phom áo cơ bản, dễ mặc với thiết kế cổ ôm vừa gọn, ống tay ôm vừa tôn cơ bắp, đặc biệt là độ dài vạt áo vừa phủ mông tăng độ chỉnh chu dáng người từ sau ra trước.",
		color: 'black',
		number: 30
	}),
	new Product({
		title: "ÁO THUN SỌC TAY LỞ FORM RỘNG DÀI IN BÒ SỮA",
		type: 'tee',
		price: 10,
		origin: "sea_starclothing",
		imagePath: "/img/sample08.jpg",
		saleoff: 0,
		description: "Chất thun co giãn,mặc nhẹ mát. ",
		color: 'blue',
		number: 30
	}),
];

var done = 0;
for (var i = 0; i < products.length; ++i){
	products[i].save(function(err, res){
		done++;
		if (done === products.length){
			exit();
		}
	});
}

function exit(){
	mongoose.disconnect();
}

// 'use strict';

// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     /*
//       Add altering commands here.
//       Return a promise to correctly handle asynchronicity.

//       Example:
//       return queryInterface.bulkInsert('Person', [{
//         name: 'John Doe',
//         isBetaMember: false
//       }], {});
//     */
//     var tshirts = [
//       {
//         name: "Áo thun trắng I Love You",
//         type: "tee",
//         color: ['white','blue'],
//         cost: 100000,
//         size: ['L','XL'],
//         origin: "Khai silk",
//         image: "/img/sample1.jpg",
//         description: "Với thiết kế trẻ trung, năng động, áo thun League Legends sẽ tạo cho khách hàng của bạn cảm giác thoải mái nhất khi mặc.",
//         sellof: 0,
//         number: 10,
//         createdAt: Sequelize.literal('NOW()'),
//         updatedAt: Sequelize.literal('NOW()')
//       },
//       {
//         name: "Áo thun Phượt thủ",
//         type: "tee",
//         color: ['black'],
//         cost: 50000,
//         size: ['M','L','XL'],
//         origin: "Khai silk",
//         image: "/img/sample2.jpg",
//         description: "Với thiết kế trẻ trung, năng động, áo thun League Legends sẽ tạo cho khách hàng của bạn cảm giác thoải mái nhất khi mặc.",
//         sellof: 0,
//         number: 10,
//         createdAt: Sequelize.literal('NOW()'),
//         updatedAt: Sequelize.literal('NOW()')
//       },
//       {
//         name: "Áo thể thao nam RUN (Áo nam)",
//         type: "tee",
//         color: ['black','gray'],
//         cost: 199000,
//         size: ['S','M','L','XL','XXL'],
//         origin: "KIT Sport",
//         image: "/img/sample01.jpg",
//         description: "Sản phẩm chất lượng, được rất nhiều người ưa thích bởi những dòng sản phẩm mang phong cách đơn giản phù hợp với nhiều lứa tuổi, phong cách chính Châu Âu.",
//         sellof: 0,
//         number: 10,
//         createdAt: Sequelize.literal('NOW()'),
//         updatedAt: Sequelize.literal('NOW()')
//       },
//       {
//         name: "Áo Thun Ngắn Tay Cổ Tròn In Hình Go-ku Geometric",
//         type: "polo",
//         color: ['black'],
//         cost: 100000,
//         size: ['M'],
//         origin: "sea_starclothing",
//         image: "/img/sample02.jpg",
//         description: "Phom áo cơ bản, dễ mặc với thiết kế cổ ôm vừa gọn, ống tay ôm vừa tôn cơ bắp, đặc biệt là độ dài vạt áo vừa phủ mông tăng độ chỉnh chu dáng người từ sau ra trước.",
//         sellof: 0,
//         number: 10,
//         createdAt: Sequelize.literal('NOW()'),
//         updatedAt: Sequelize.literal('NOW()')
//       },
//       {
//         name: "Áo thun cotton nhóm in họa tiết mùa hè giá sỉ",
//         type: "tee",
//         color: ['black'],
//         cost: 80000,
//         size: ['S','M','L','XL'],
//         origin: "huonglanvo",
//         image: "/img/sample03.jpg",
//         description: "Áo thun: Cotton 4 chiều cao cấp, co giãn tốt, thoáng mát. Hình in bằng loại mực tốt, không độc hại, đảm bảo không bung tróc.",
//         sellof: 0,
//         number: 10,
//         createdAt: Sequelize.literal('NOW()'),
//         updatedAt: Sequelize.literal('NOW()')
//       },
//       {
//         name: "ÁO THUN NAM 3D THÁI LAN in hình JOKER",
//         type: "polo",
//         color: ['black'],
//         cost: 150000,
//         size: ['M','L','XL','XXL'],
//         origin: "NICE GUY",
//         image: "/img/sample04.jpg",
//         description: "Chất liệu vải: thun lươi siêu thoáng mát, phù hợp cho mua hẻ nóng bức, thoải mái hoạt động không lo bị nóng. ",
//         sellof: 0,
//         number: 10,
//         createdAt: Sequelize.literal('NOW()'),
//         updatedAt: Sequelize.literal('NOW()')
//       },
//       {
//         name: "ÁO THUN NAM 3D THÁI LAN in hình sói yêu thương",
//         type: "polo",
//         color: ['white'],
//         cost: 150000,
//         size: ['M','L','XL','XXL'],
//         origin: "NICE GUY",
//         image: "/img/sample05.jpg",
//         description: "Chất liệu vải: thun lươi siêu thoáng mát, phù hợp cho mua hẻ nóng bức, thoải mái hoạt động không lo bị nóng. ",
//         sellof: 0,
//         number: 10,
//         createdAt: Sequelize.literal('NOW()'),
//         updatedAt: Sequelize.literal('NOW()')
//       },
//       {
//         name: "O THUN NAM 3D THÁI LAN in hình đầu lâu",
//         type: "polo",
//         color: ['white'],
//         cost: 150000,
//         size: ['M','L','XL','XXL'],
//         origin: "DIVASTORE",
//         image: "/img/sample06.jpg",
//         description: "Chất liệu vải: thun lươi siêu thoáng mát, phù hợp cho mua hẻ nóng bức, thoải mái hoạt động không lo bị nóng. ",
//         sellof: 0,
//         number: 10,
//         createdAt: Sequelize.literal('NOW()'),
//         updatedAt: Sequelize.literal('NOW()')
//       },
//       {
//         name: "ÁO THUN NAM 3D in hình hoạt hình THÁI LAN",
//         type: "polo",
//         color: ['purple'],
//         cost: 199000,
//         size: ['M','L','XL','XXL'],
//         origin: "greater.vn",
//         image: "/img/sample07.jpg",
//         description: "Chất liệu vải: thun lươi siêu thoáng mát, phù hợp cho mua hẻ nóng bức, thoải mái hoạt động không lo bị nóng. ",
//         sellof: 0,
//         number: 10,
//         createdAt: Sequelize.literal('NOW()'),
//         updatedAt: Sequelize.literal('NOW()')
//       },
//       {
//         name: "ÁO THUN SỌC TAY LỞ FORM RỘNG DÀI IN BÒ SỮA",
//         type: "tee",
//         color: ['white'],
//         cost: 80000,
//         size: ['M'],
//         origin: "Khai silk",
//         image: "/img/sample08.jpg",
//         description: "Chất thun co giãn,mặc nhẹ mát. ",
//         sellof: 0,
//         number: 10,
//         createdAt: Sequelize.literal('NOW()'),
//         updatedAt: Sequelize.literal('NOW()')
//       },
//       {
//         name: "Áo thun nam tay ngắn in chữ Yeezus",
//         type: "tee",
//         color: ['Khaki', 'Blue'],
//         cost: 199000,
//         size: ['M','L','XL'],
//         origin: "Khai silk",
//         image: "/img/sample09.jpg",
//         description: "Made of: Cotton, Edition type: Slim, Collar type: round neck collar, Style: Hedging, Pattern: letter printing, Suitable for season: summer, Thickness: conventional, Suitable for: Teenagers",
//         sellof: 0,
//         number: 10,
//         createdAt: Sequelize.literal('NOW()'),
//         updatedAt: Sequelize.literal('NOW()')
//       },
//       {
//         name: "Áo thun nam nữ tay ngắn in chữ Thrasher",
//         type: "tee",
//         color: ['red','black','white','blue'],
//         cost: 190000,
//         size: ['M','L','XL'],
//         origin: "Khai silk",
//         image: "/img/sample10.jpg",
//         description: "Với thiết kế trẻ trung, năng động, áo thun League Legends sẽ tạo cho khách hàng của bạn cảm giác thoải mái nhất khi mặc.",
//         sellof: 0,
//         number: 10,
//         createdAt: Sequelize.literal('NOW()'),
//         updatedAt: Sequelize.literal('NOW()')
//       },
//       {
//         name: "Áo thun nam tay dài in chữ Twenty One Pilots",
//         type: "tee",
//         color: ['black'],
//         cost: 200000,
//         size: ['M','L','XL','XXL'],
//         origin: "greater.vn",
//         image: "/img/sample11.jpg",
//         description: "Gender:Men, Item Type:Tops, Pattern Type:Print, Brand Name:Twenty One Pilots, Style:Fashion, Fabric Type:Broadcloth, Hooded:No, Material:Cotton, Polyester, Spandex, Acetate, Acrylic",
//         sellof: 0,
//         number: 10,
//         createdAt: Sequelize.literal('NOW()'),
//         updatedAt: Sequelize.literal('NOW()')
//       },
//       {
//         name: "Áo thun nam tay ngắn in chữ Ramones",
//         type: "polo",
//         color: ['black','white','blue','gray'],
//         cost: 159000,
//         size: ['S','M','L','XL','XXL'],
//         origin: "greater.vn",
//         image: "/img/sample12.jpg",
//         description:"Gender:Men, Item Type:Tops, Pattern Type:Print, Brand Name:Twenty One Pilots, Style:Fashion, Fabric Type:Broadcloth, Hooded:No, Material:Cotton, Polyester, Spandex, Acetate, Acrylic",
//         sellof: 0,
//         number: 10,
//         createdAt: Sequelize.literal('NOW()'),
//         updatedAt: Sequelize.literal('NOW()')
//       },
//       {
//         name: "Áo thun dài tay cổ tròn họa tiết hình học",
//         type: "polo",
//         color: ['blue'],
//         cost: 99000,
//         size: ['S','M','L','XL'],
//         origin: "smartime.vn",
//         image: "/img/sample13.jpg",
//         description: "Season:Fall,Spring, Gender:Women, Occasion:Casual, Material:Polyester",
//         sellof: 0,
//         number: 10,
//         createdAt: Sequelize.literal('NOW()'),
//         updatedAt: Sequelize.literal('NOW()')
//       },
//       {
//         name: "Áo thun nam tay ngắn họa tiết sấm sét",
//         type: "polo",
//         color: ['red'],
//         cost: 138000,
//         size: ['M','L','XL','XXL'],
//         origin: "smartime.vn",
//         image: "/img/sample14.jpg",
//         description: "Gender:Men, Season:Spring,Summer, Occasion:Daily, Material:Poleyster, Decoration:None, Clothing Length:Regular, Pattern Type:Print, Sleeve Style:Regular, Style:Fashion,Causal, Collar:O- Collar, Sleeve Length:Short",
//         sellof: 0,
//         number: 10,
//         createdAt: Sequelize.literal('NOW()'),
//         updatedAt: Sequelize.literal('NOW()')
//       },
//       {
//         name: "Áo thun tay lỡ cổ tròn in hình tuần lộc Giáng sinh",
//         type: "tee",
//         color: ['black'],
//         cost: 100000,
//         size: ['M','L','XL'],
//         origin: "smartime.vn",
//         image: "/img/sample15.jpg",
//         description: "Material:Cotton Blend, Clothing, Length:Regular, Pattern, Type:Print,Striped, Sleeve, Style:Regula",
//         sellof: 0,
//         number: 10,
//         createdAt: Sequelize.literal('NOW()'),
//         updatedAt: Sequelize.literal('NOW()')
//       },
//       {
//         name: "ÁO THUN NAM 2018 VẢI COTTON",
//         type: "tee",
//         color: ['black'],
//         cost: 189000,
//         size: ['M','L','XL'],
//         origin: "thoitrangcaocapu",
//         image: "/img/sample16.jpg",
//         description: "Hàng rõ nguồn gốc, Không tuột đường chỉ,thoáng mát,thấm mồ hôi tốt, Dùng trong mọi hoạt động đi chơi ,giã ngoại,đi làm và đi tiệc",
//         sellof: 0,
//         number: 10,
//         createdAt: Sequelize.literal('NOW()'),
//         updatedAt: Sequelize.literal('NOW()')
//       },
//       {
//         name: "Áo thun tay lỡ Nam nữ Unisex",
//         type: "polo",
//         color: ['black','white'],
//         cost: 88000,
//         size: ['M','L','XL'],
//         origin: "thoitrang_rubik_rainbow",
//         image: "/img/sample17.jpg",
//         description: " CHẤT LIỆU: THUN 4 CHIỀU DÀY MỊN CÓ 2 MÀU: ĐEN, TRẮNG",
//         sellof: 0,
//         number: 10,
//         createdAt: Sequelize.literal('NOW()'),
//         updatedAt: Sequelize.literal('NOW()')
//       },
//       {
//         name: "Áo Tay lỡ đỏ đen phom rộng",
//         type: "polo",
//         color: ['black'],
//         cost: 50000,
//         size: ['M'],
//         origin: "lesidung",
//         image: "/img/sample18.jpg",
//         description: "Tay Lỡ Phom rộng cở 60 kg trở xuống. Chất Vải Cotton thoáng mát. Áo may phối 2 màu đỏ - đen. In họa tiết đẹp",
//         sellof: 0,
//         number: 10,
//         createdAt: Sequelize.literal('NOW()'),
//         updatedAt: Sequelize.literal('NOW()')
//       },
//       {
//         name: "Áo thun nam ngắn tay in hoạ tiết 3D",
//         type: "polo",
//         color: ['white'],
//         cost: 49000,
//         size: ['S','M','L','XL','XXL'],
//         origin: "fulai1.vn",
//         image: "/img/sample19.jpg",
//         description: "Material: Polyester Gender: Men or Women Season: Summer",
//         sellof: 0,
//         number: 10,
//         createdAt: Sequelize.literal('NOW()'),
//         updatedAt: Sequelize.literal('NOW()')
//       },
//       {
//         name: "Áo thun tay lửng_ form đại",
//         type: "polo",
//         color: ['white'],
//         cost: 55000,
//         size: ['M'],
//         origin: "nguyetcam00",
//         image: "/img/sample20.jpg",
//         description: "form đại dễ mặc từ #40kg_75kg đều đc . Đã vậy nam nữ đều mặc ok hết luôn. FORM NÀY LÀ CHẤT NGẤT LUÔN NHA CẢ NHÀ.",
//         sellof: 0,
//         number: 10,
//         createdAt: Sequelize.literal('NOW()'),
//         updatedAt: Sequelize.literal('NOW()')
//       }
//     ];
//     return queryInterface.bulkInsert('TShirts', tshirts, {});
//   },

//   down: (queryInterface, Sequelize) => {
//     /*
//       Add reverting commands here.
//       Return a promise to correctly handle asynchronicity.

//       Example:
//       return queryInterface.bulkDelete('Person', null, {});
//     */
//     return queryInterface.bulkDelete('TShirts', null, {});
//   }
// };

