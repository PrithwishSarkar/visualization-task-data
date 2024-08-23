const mongoose = require('mongoose');

const shopifyCustomerSchema = new mongoose.Schema({}, { collection: 'shopifyCustomers' });
const ShopifyCustomer = mongoose.model('ShopifyCustomer', shopifyCustomerSchema);

const shopifyProductSchema = new mongoose.Schema({}, { collection: 'shopifyProducts' });
const ShopifyProduct = mongoose.model('ShopifyProduct', shopifyProductSchema);

const shopifyOrderSchema = new mongoose.Schema({}, { collection: 'shopifyOrders' });
const ShopifyOrder = mongoose.model('ShopifyOrder', shopifyOrderSchema);

module.exports = {
    ShopifyCustomer,
    ShopifyProduct,
    ShopifyOrder
};