var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	user: {type: Schema.Types.ObjectId, ref: 'User', require: true},
	cart: {type: Object, require: true},
	address: {type: String, require: true},
	time: {type: Date, require: true}, 
	reciever: {type: String, require: true}, 
	status: {type: String, require: true},
	cvv: {type: String, require: true},
	cardCode: {type: String, require: true},
	update: {type: Date, default: new Date()}
});

module.exports = mongoose.model('Order',schema);


// 'use strict';
// module.exports = (sequelize, DataTypes) => {
//   var Order = sequelize.define('Order', {
//     status: DataTypes.ENUM('waiting','shipping','delivered','cancled'),
//     deliver: DataTypes.DATE,
//     cost: DataTypes.BIGINT,
//     address: DataTypes.STRING,
//     idOwner: DataTypes.INTEGER,
//     idCard: DataTypes.INTEGER 
//   }, {});
//   Order.associate = function(models) {
//     // associations can be defined here
//   };
//   return Order;
// };
// 'use strict';
// module.exports = (sequelize, DataTypes) => {
//   var OrderDetail = sequelize.define('OrderDetail', {
//     number: DataTypes.INTEGER,
//     color: DataTypes.ENUM('white','grey','black','red','blue'),
//     size: DataTypes.ENUM('M','L','XL','XXL'),
//     idOrder: DataTypes.INTEGER,
//     idTShirt: DataTypes.INTEGER
//   }, {});
//   OrderDetail.associate = function(models) {
//     // associations can be defined here
//   };
//   return OrderDetail;
// };
// 'use strict';
// module.exports = (sequelize, DataTypes) => {
//   var CardPay = sequelize.define('CardPay', {
//     ownerName: DataTypes.STRING,
//     cardType: DataTypes.STRING,
//     CVV: DataTypes.STRING,
//     cardCode: DataTypes.STRING
//   }, {});
//   CardPay.associate = function(models) {
//     // associations can be defined here
//   };
//   return CardPay;
// };