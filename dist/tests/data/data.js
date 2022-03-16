"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.order = exports.products = exports.users = void 0;
exports.users = [
    {
        first_name: 'ahmed',
        last_name: 'mohamed',
        password: '123456',
    },
    {
        first_name: 'jack',
        last_name: 'dany',
        password: 'asd123',
    },
    {
        first_name: 'anna',
        last_name: 'barker',
        password: 'asd159',
    },
    {
        first_name: 'ahmed',
        last_name: 'mohamed',
        password: 'asd369',
    },
];
exports.products = [
    {
        name: 'shirt',
        price: 20,
    },
    {
        name: 'jacket',
        price: 200,
    },
    {
        name: 'hoody',
        price: 100,
    },
    {
        name: 'bag',
        price: 30,
    },
];
exports.order = [
    {
        user_id: 1,
        status: 'active',
        items: [
            {
                product_id: 2,
                quantity: 3,
            },
            {
                product_id: 1,
                quantity: 3,
            },
        ],
    },
    {
        user_id: 5,
        status: 'active',
        items: [
            {
                product_id: 100,
                quantity: 3,
            },
            {
                product_id: 15,
                quantity: 3,
            },
        ],
    },
];
