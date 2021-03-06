var Order = require('../models/order.js');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopping');

var orders = [
    new Order({
        "update": "2018-05-28T07:15:25.779+0000",
        "user": "5b348c196955eb0d345fd7c2",
        "cart": {
            "items": {
                "5b34898a22e4ce0c0499b304": {
                    "item": {
                        "update": "2018-06-28T07:08:58.931Z",
                        "_id": "5b34898a22e4ce0c0499b304",
                        "title": "ÁO THUN NAM 3D THÁI LAN in hình đầu lâu",
                        "type": "polo",
                        "price": 29,
                        "origin": "DIVASTORE",
                        "imagePath": "/img/sample06.jpg",
                        "saleoff": 5,
                        "description": "Chất liệu vải: thun lươi siêu thoáng mát, phù hợp cho mua hẻ nóng bức, thoải mái hoạt động không lo bị nóng.",
                        "color": "white",
                        "number": 10,
                        "__v": 0
                    },
                    "qty": 1,
                    "price": 29
                },
                "5b34898a22e4ce0c0499b303": {
                    "item": {
                        "update": "2018-06-28T07:08:58.931Z",
                        "_id": "5b34898a22e4ce0c0499b303",
                        "title": "ÁO THUN NAM 3D THÁI LAN in hình sói yêu thương",
                        "type": "polo",
                        "price": 22,
                        "origin": "NICE GUY",
                        "imagePath": "/img/sample05.jpg",
                        "saleoff": 0,
                        "description": "Chất liệu vải: thun lươi siêu thoáng mát, phù hợp cho mua hẻ nóng bức, thoải mái hoạt động không lo bị nóng.",
                        "color": "black",
                        "number": 10,
                        "__v": 0
                    },
                    "qty": 1,
                    "price": 22
                }
            },
            "totalQty": 2,
            "totalPrice": 51
        },
        "address": "88 Châu Văn Liêm",
        "__v": 0
    }),
    new Order({
        "update": "2018-04-23T07:15:25.779+0000",
        "user": "5b348c196955eb0d345fd7c2",
        "cart": {
            "items": {
                "5b34898a22e4ce0c0499b2fd": {
                    "item": {
                        "update": "2018-06-28T07:08:58.931Z",
                        "_id": "5b34898a22e4ce0c0499b2fd",
                        "title": "ÁO THUN NAM 3D THÁI LAN in hình JOKER",
                        "type": "polo",
                        "price": 25,
                        "origin": "NICE GUY",
                        "imagePath": "/img/sample04.jpg",
                        "saleoff": 0,
                        "description": "Chất liệu vải: thun lươi siêu thoáng mát, phù hợp cho mua hẻ nóng bức, thoải mái hoạt động không lo bị nóng. ",
                        "color": "gray",
                        "number": 30,
                        "__v": 0
                    },
                    "qty": 1,
                    "price": 25
                },
                "5b34898a22e4ce0c0499b2fe": {
                    "item": {
                        "update": "2018-06-28T07:08:58.931Z",
                        "_id": "5b34898a22e4ce0c0499b2fe",
                        "title": "Áo thun cotton nhóm in họa tiết mùa hè giá sỉ",
                        "type": "tee",
                        "price": 10,
                        "origin": "huonglanvo",
                        "imagePath": "/img/sample03.jpg",
                        "saleoff": 0,
                        "description": "Áo thun: Cotton 4 chiều cao cấp, co giãn tốt, thoáng mát. Hình in bằng loại mực tốt, không độc hại, đảm bảo không bung tróc.",
                        "color": "white",
                        "number": 30,
                        "__v": 0
                    },
                    "qty": 2,
                    "price": 20
                }
            },
            "totalQty": 3,
            "totalPrice": 45
        },
        "address": "88 Châu Văn Liêm",
        "__v": 0
    }),
    new Order({
        "update": "2018-03-20T07:15:25.779+0000",
        "user": "5b348c196955eb0d345fd7c2",
        "cart": {
            "items": {
                "5b34898a22e4ce0c0499b305": {
                    "item": {
                        "_id": "5b34898a22e4ce0c0499b305",
                        "update": "2018-06-28T07:08:58.931+0000",
                        "title": "ÁO THUN NAM 3D in hình hoạt hình THÁI LAN",
                        "type": "polo",
                        "price": 30,
                        "origin": "greater.vn",
                        "imagePath": "/img/sample07.jpg",
                        "saleoff": 17,
                        "description": "Chất liệu vải: thun lươi siêu thoáng mát, phù hợp cho mua hẻ nóng bức, thoải mái hoạt động không lo bị nóng.",
                        "color": "purple",
                        "number": 10,
                        "__v": 0
                    },
                    "qty": 1,
                    "price": 30
                },
                "5b34898a22e4ce0c0499b301": {
                    "item": {
                        "_id": "5b34898a22e4ce0c0499b301",
                        "update": "2018-06-28T07:08:58.931+0000",
                        "title": "Áo thun Phượt thủ",
                        "type": "tee",
                        "price": 5,
                        "origin": "Khai silk",
                        "imagePath": "/img/sample2.jpg",
                        "saleoff": 20,
                        "description": "Với thiết kế trẻ trung, năng động, áo thun League Legends sẽ tạo cho khách hàng của bạn cảm giác thoải mái nhất khi mặc.",
                        "color": "blue",
                        "number": 10,
                        "__v": 0
                    },
                    "qty": 1,
                    "price": 5
                }
            },
            "totalQty": 1,
            "totalPrice": 35
        },
        "address": "88 Châu Văn Liêm",
        "__v": 0
    }),
    new Order({
        "update": "2018-02-14T07:15:25.779+0000",
        "user": "5b348c196955eb0d345fd7c2",
        "cart": {
            "items": {
                "5b34898a22e4ce0c0499b310": {
                    "item": {
                        "_id": "5b34898a22e4ce0c0499b310",
                        "update": "2018-06-28T07:08:58.931+0000",
                        "title": "Áo thun tay lửng_ form đại",
                        "type": "polo",
                        "price": 55,
                        "origin": "nguyetcam00",
                        "imagePath": "/img/sample20.jpg",
                        "saleoff": 0,
                        "description": "form đại dễ mặc từ #40kg_75kg đều đc . Đã vậy nam nữ đều mặc ok hết luôn. FORM NÀY LÀ CHẤT NGẤT LUÔN NHA CẢ NHÀ.",
                        "color": "white",
                        "number": 10,
                        "__v": 0
                    },
                    "qty": 1,
                    "price": 55
                }
            },
            "totalQty": 1,
            "totalPrice": 55
        },
        "address": "88 Trần Hưng Đạo",
        "__v": 0
    }),
    new Order({
        "update": "2018-01-14T07:15:25.779+0000",
        "user": "5b348c196955eb0d345fd7c2",
        "cart": {
            "items": {
                "5b34898a22e4ce0c0499b30e": {
                    "item": {
                        "_id": "5b34898a22e4ce0c0499b30e",
                        "update": "2018-06-28T07:08:58.931+0000",
                        "title": "Áo thun tay lỡ Nam nữ Unisex",
                        "type": "polo",
                        "price": 88,
                        "origin": "thoitrang_rubik_rainbow",
                        "imagePath": "/img/sample17.jpg",
                        "saleoff": 0,
                        "description": "CHẤT LIỆU: THUN 4 CHIỀU DÀY MỊN CÓ 2 MÀU: ĐEN, TRẮNG.",
                        "color": "black",
                        "number": 10,
                        "__v": 0
                    },
                    "qty": 1,
                    "price": 88
                }
            },
            "totalQty": 1,
            "totalPrice": 88
        },
        "address": "88 Trần Hưng Đạo",
        "__v": 0
    }),
    new Order({
        "update": "2018-02-11T07:15:25.779+0000",
        "user": "5b348c196955eb0d345fd7c2",
        "cart": {
            "items": {
                "5b34898a22e4ce0c0499b30c": {
                    "item": {
                        "_id": "5b34898a22e4ce0c0499b30c",
                        "update": "2018-06-28T07:08:58.931+0000",
                        "title": "Áo thun tay lỡ cổ tròn in hình tuần lộc Giáng sinh",
                        "type": "tee",
                        "price": 22,
                        "origin": "smartime.vn",
                        "imagePath": "/img/sample15.jpg",
                        "saleoff": 0,
                        "description": "Material:Cotton Blend, Clothing, Length:Regular, Pattern, Type:Print,Striped, Sleeve, Style:Regula.",
                        "color": "black",
                        "number": 10,
                        "__v": 0
                    },
                    "qty": 1,
                    "price": 22
                }
            },
            "totalQty": 1,
            "totalPrice": 22
        },
        "address": "22 Hồng Bàng",
        "__v": 0
    }),
    new Order({
        "update": "2018-02-11T07:15:25.779+0000",
        "user": "5b348c196955eb0d345fd7c2",
        "cart": {
            "items": {
                "5b34898a22e4ce0c0499b309": {
                    "item": {
                        "_id": "5b34898a22e4ce0c0499b309",
                        "update": "2018-06-28T07:08:58.931+0000",
                        "title": "Áo thun nam tay ngắn in chữ Ramones",
                        "type": "polo",
                        "price": 34,
                        "origin": "greater.vn",
                        "imagePath": "/img/sample12.jpg",
                        "saleoff": 0,
                        "description": "Gender:Men, Item Type:Tops, Pattern Type:Print, Brand Name:Twenty One Pilots, Style:Fashion, Fabric Type:Broadcloth, Hooded:No, Material:Cotton, Polyester, Spandex, Acetate, Acrylic.",
                        "color": "gray",
                        "number": 10,
                        "__v": 0
                    },
                    "qty": 1,
                    "price": 34
                }
            },
            "totalQty": 1,
            "totalPrice": 34
        },
        "address": "22 Hồng Bàng",
        "__v": 0
    }),
    new Order({
        "update": "2018-05-11T07:15:25.779+0000",
        "user": "5b348c196955eb0d345fd7c2",
        "cart": {
            "items": {
                "5b34898a22e4ce0c0499b303": {
                    "item": {
                        "_id": "5b34898a22e4ce0c0499b303",
                        "update": "2018-06-28T07:08:58.931+0000",
                        "title": "ÁO THUN NAM 3D THÁI LAN in hình sói yêu thương",
                        "type": "polo",
                        "price": 22,
                        "origin": "NICE GUY",
                        "imagePath": "/img/sample05.jpg",
                        "saleoff": 0,
                        "description": "Chất liệu vải: thun lươi siêu thoáng mát, phù hợp cho mua hẻ nóng bức, thoải mái hoạt động không lo bị nóng.",
                        "color": "black",
                        "number": 10,
                        "__v": 0
                    },
                    "qty": 1,
                    "price": 22
                }
            },
            "totalQty": 1,
            "totalPrice": 22
        },
        "address": "22 Hồng Bàng",
        "__v": 0
    }),
    new Order({
        "update": "2018-05-11T07:15:25.779+0000",
        "user": "5b348c196955eb0d345fd7c2",
        "cart": {
            "items": {
                "5b34898a22e4ce0c0499b30a": {
                    "item": {
                        "_id": "5b34898a22e4ce0c0499b30a",
                        "update": "2018-06-28T07:08:58.931+0000",
                        "title": "Áo thun dài tay cổ tròn họa tiết hình học",
                        "type": "polo",
                        "price": 8,
                        "origin": "greater.vn",
                        "imagePath": "/img/sample13.jpg",
                        "saleoff": 0,
                        "description": "Season:Fall,Spring, Gender:Women, Occasion:Casual, Material:Polyester.",
                        "color": "blue",
                        "number": 10,
                        "__v": 0
                    },
                    "qty": 3,
                    "price": 8
                }
            },
            "totalQty": 3,
            "totalPrice": 24
        },
        "address": "22 Nguyễn Trãi",
        "__v": 0
    })
];

var done = 0;
for (var i = 0; i < orders.length; ++i){
	orders[i
    ].save(function(err, res){
		done++;
		if (done === orders.length){
			exit();
        }
    });
}

function exit(){
	mongoose.disconnect();
}