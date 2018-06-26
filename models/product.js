var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	title: {type: String, require: true},
	imagePath: {type: String, require: true},
	description: {type: String, require: true},
	price: {type: Number, require: true},
	type: {type: String, require: true}, //polo or tee
	origin: {type: String, require: true},
	saleoff: {type: Number, require: true},
	color: {type: String, require: true},
	number: {type: Number, require: true},
	update: {type: Date, default: new Date()},
	madeBy: {type: Schema.Types.ObjectId, ref: 'User', require: false},
});

schema.index({ title: 'text', description: 'text'});

module.exports = mongoose.model('Product',schema);

// 'use strict';
// module.exports = (sequelize, DataTypes) => {
//   var TShirt = sequelize.define('TShirt', { 
//     name: DataTypes.STRING,
//     type: DataTypes.ENUM('tee', 'polo'),
//     color: DataTypes.ARRAY(DataTypes.STRING),  //'white','grey','black','red','blue'
//     cost: DataTypes.BIGINT,
//     size: DataTypes.ARRAY(DataTypes.STRING), // 'M', 'L', 'XL', 'XXL'
//     origin: DataTypes.STRING,
//     image: DataTypes.STRING,
//     description: DataTypes.TEXT,
//     sellof: DataTypes.INTEGER,
//     number: DataTypes.INTEGER
//   }, {});
//   TShirt.associate = function(models) {
//     // associations can be defined here
//   };
//   return TShirt;
// };