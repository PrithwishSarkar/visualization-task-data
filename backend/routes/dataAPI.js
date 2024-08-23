const express = require('express');
const router = express.Router();
const {
    salesOverTime,
    salesGrowthRate,
    newCustomers,
    repeatCustomersDay,
    repeatCustomersMonth,
    repeatCustomersQuarter,
    repeatCustomersYear,
    customersDistribution,
    customerLifetimeValue,
} = require('../controllers/dataController');

router.get('/sales-over-time', salesOverTime);
router.get('/sales-growth-rate', salesGrowthRate);
router.get('/new-customers', newCustomers);
router.get('/repeat-customers-day', repeatCustomersDay);
router.get('/repeat-customers-month', repeatCustomersMonth);
router.get('/repeat-customers-quarter', repeatCustomersQuarter);
router.get('/repeat-customers-year', repeatCustomersYear);
router.get('/customers-distribution', customersDistribution);
router.get('/customer-lifetime-value', customerLifetimeValue);

module.exports = router;