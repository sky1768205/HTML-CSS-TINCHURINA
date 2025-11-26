const Database = require('./database');
const db = new Database();

async function seedSales() {
    const products = await db.getAllProducts();
    const shops = await db.getAllShops();

    for (let i = 0; i < 50; i++) {
        const product = products[Math.floor(Math.random() * products.length)];
        const shop = shops.length ? shops[Math.floor(Math.random() * shops.length)] : null;
        const quantity = Math.floor(Math.random() * 10) + 1;
        const total_price = quantity * product.price;
        const daysAgo = Math.floor(Math.random() * 30);
        const sale_date = new Date();
        sale_date.setDate(sale_date.getDate() - daysAgo);

        await db.createSale({
            product_id: product.id,
            shop_id: shop ? shop.id : null,
            quantity,
            total_price,
            sale_date
        });
    }

    console.log('Seeder выполнен');
    await db.close();
}

seedSales();
