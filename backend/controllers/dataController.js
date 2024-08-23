const { ShopifyCustomer,
    ShopifyProduct,
    ShopifyOrder
} = require('../models/Data');

const salesOverTime = async (req, res) => {
    try {
        const sales = await ShopifyOrder.aggregate([
            {
                $addFields: {
                    date: {
                        $dateFromString: {
                            dateString: "$created_at"
                        }
                    }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$date" },
                        month: { $month: "$date" },
                        day: { $dayOfMonth: "$date" }
                    },
                    totalSales: { $sum: { $toDouble: "$total_price_set.shop_money.amount" } }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }
        ]);
        res.json(sales);
    } catch (err) {
        res.status(500).send(err);
    }
};

const salesGrowthRate = async (req, res) => {
    try {
        const sales = await ShopifyOrder.aggregate([
            {
                $addFields: {
                    date: {
                        $dateFromString: {
                            dateString: "$created_at"
                        }
                    }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$date" },
                        month: { $month: "$date" }
                    },
                    totalSales: { $sum: { $toDouble: "$total_price_set.shop_money.amount" } }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } },
            {
                $project: {
                    _id: 0,
                    year: "$_id.year",
                    month: "$_id.month",
                    totalSales: 1
                }
            }
        ]);

        let growthRate = [];
        for (let i = 1; i < sales.length; i++) {
            let prev = sales[i - 1].totalSales;
            let curr = sales[i].totalSales;
            let rate = ((curr - prev) / prev) * 100;

            growthRate.push({
                year: sales[i].year,
                month: sales[i].month,
                growthRate: rate.toFixed(2)
            });
        }

        res.json(growthRate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const newCustomers = async (req, res) => {
    try {
        const customers = await ShopifyCustomer.aggregate([
            {
                $addFields: {
                    date: {
                        $dateFromString: {
                            dateString: "$created_at"
                        }
                    }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$date" },
                        month: { $month: "$date" },
                        day: { $dayOfMonth: "$date" }
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }
        ]);
        res.json(customers);
    } catch (err) {
        res.status(500).send(err);
    }
}

const repeatCustomersDay = async (req, res) => {
    try {
        const dailyCustomers = await ShopifyOrder.aggregate([
            {
                $addFields: {
                    date: {
                        $dateFromString: {
                            dateString: "$created_at"
                        }
                    }
                }
            },
            {
                $group: {
                    _id: {
                        customer_id: "$customer.id",
                        year: { $year: "$date" },
                        month: { $month: "$date" },
                        day: { $dayOfMonth: "$date" }
                    },
                    purchaseCount: { $sum: 1 }
                }
            },
            {
                $match: {
                    purchaseCount: { $gt: 1 }
                }
            },
            {
                $group: {
                    _id: {
                        year: "$_id.year",
                        month: "$_id.month",
                        day: "$_id.day"
                    },
                    customerCount: { $sum: 1 }
                }
            },
            {
                $sort: {
                    "_id.year": 1,   
                    "_id.month": 1,  
                    "_id.day": 1     
                }
            },
            {
                $project: {
                    _id: 0,
                    year: "$_id.year",
                    month: "$_id.month",
                    day: "$_id.day",
                    customerCount: 1
                }
            }
        ]);

        res.json(dailyCustomers);
    } catch (err) {
        res.status(500).send(err);
    }
};

const repeatCustomersMonth = async (req, res) => {
    try {
        const monthlyCustomers = await ShopifyOrder.aggregate([
            {
                $addFields: {
                    date: {
                        $dateFromString: {
                            dateString: "$created_at"
                        }
                    }
                }
            },
            {
                $group: {
                    _id: {
                        customer_id: "$customer.id",
                        year: { $year: "$date" },
                        month: { $month: "$date" }
                    },
                    purchaseCount: { $sum: 1 }
                }
            },
            {
                $match: {
                    purchaseCount: { $gt: 1 }
                }
            },
            {
                $group: {
                    _id: {
                        year: "$_id.year",
                        month: "$_id.month"
                    },
                    customerCount: { $sum: 1 }
                }
            },
            {
                $sort: {
                    "_id.year": 1,   
                    "_id.month": 1   
                }
            },
            {
                $project: {
                    _id: 0,
                    year: "$_id.year",
                    month: "$_id.month",
                    customerCount: 1
                }
            }
        ]);
        

        res.json(monthlyCustomers);
    } catch (err) {
        res.status(500).send(err);
    }
};

const repeatCustomersQuarter = async (req, res) => {
    try {
        const quarterlyCustomers = await ShopifyOrder.aggregate([
            {
                $addFields: {
                    date: {
                        $dateFromString: {
                            dateString: "$created_at"
                        }
                    }
                }
            },
            {
                $group: {
                    _id: {
                        customer_id: "$customer.id",
                        year: { $year: "$date" },
                        quarter: {
                            $ceil: { $divide: [{ $month: "$date" }, 3] }
                        }
                    },
                    purchaseCount: { $sum: 1 }
                }
            },
            {
                $match: {
                    purchaseCount: { $gt: 1 }
                }
            },
            {
                $group: {
                    _id: {
                        year: "$_id.year",
                        quarter: "$_id.quarter"
                    },
                    customerCount: { $sum: 1 }
                }
            },
            {
                $sort: {
                    "_id.year": 1,   
                    "_id.quarter": 1 
                }
            },
            {
                $project: {
                    _id: 0,
                    year: "$_id.year",
                    quarter: "$_id.quarter",
                    customerCount: 1
                }
            }
        ]);
        

        res.json(quarterlyCustomers);
    } catch (err) {
        res.status(500).send(err);
    }
};

const repeatCustomersYear = async (req, res) => {
    try {
        const yearlyCustomers = await ShopifyOrder.aggregate([
            {
                $addFields: {
                    date: {
                        $dateFromString: {
                            dateString: "$created_at"
                        }
                    }
                }
            },
            {
                $group: {
                    _id: {
                        customer_id: "$customer.id",
                        year: { $year: "$date" }
                    },
                    purchaseCount: { $sum: 1 }
                }
            },
            {
                $match: {
                    purchaseCount: { $gt: 1 }
                }
            },
            {
                $group: {
                    _id: "$_id.year",
                    customerCount: { $sum: 1 }
                }
            },
            {
                $sort: {
                    "_id": 1 
                }
            },
            {
                $project: {
                    _id: 0,
                    year: "$_id",
                    customerCount: 1
                }
            }
        ]);

        res.json(yearlyCustomers);
    } catch (err) {
        res.status(500).send(err);
    }
};

const customersDistribution = async (req, res) => {
    try {
        const distribution = await ShopifyCustomer.aggregate([
            {
                $group: {
                    _id: "$default_address.city",
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } }
        ]);
        res.json(distribution);
    } catch (err) {
        res.status(500).send(err);
    }
}

const customerLifetimeValue = async (req, res) => {
    try {
        const lifetimeValue = await ShopifyOrder.aggregate([
            {
                $addFields: {
                    date: {
                        $dateFromString: {
                            dateString: "$created_at"
                        }
                    }
                }
            },
            {
                $group: {
                    _id: {
                        customerId: "$customer.id",
                        year: { $year: "$date" },
                        month: { $month: "$date" }
                    },
                    totalSpent: { $sum: { $toDouble: "$total_price_set.shop_money.amount" } }
                }
            },
            {
                $group: {
                    _id: {
                        year: "$_id.year",
                        month: "$_id.month"
                    },
                    totalLifetimeValue: { $sum: "$totalSpent" }
                }
            }
        ]);
        res.json(lifetimeValue);
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = {
    salesOverTime,
    salesGrowthRate,
    newCustomers,
    repeatCustomersDay,
    repeatCustomersMonth,
    repeatCustomersQuarter,
    repeatCustomersYear,
    customersDistribution,
    customerLifetimeValue,
};