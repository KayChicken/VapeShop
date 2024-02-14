const db = require('../db')

class OrderController {

    async addOrder(req, res) {

        try {

            const { cart, userId,name,surname,city, address, vk, tg,phone } = req.body;
            if (!userId) {
                return res.status(401).json({"message" : "Пользователь не авторизован"})
            }
    
            if (cart) {
                const chequeQuery = await db.query("INSERT INTO cheques (user_id,name,surname, phone,total_cheque, status, city, address, vk , tg,date) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,NOW()) RETURNING *", [userId,name,surname , phone,0, 1, city, address, vk, tg]);
                const cheque = chequeQuery.rows;
    
                for (const item of cart) {
                    const orderQuery = await db.query("INSERT INTO orders (cheque_id, current_price, quantity, product_id) VALUES ($1, $2, $3, $4) RETURNING id", [cheque[0].id, 0, item.quantity, item.id_prod]);
                    const order = orderQuery.rows;
                    for (const element of item.dops) {
                        const orderAdditions = await db.query("INSERT INTO order_additions (order_id, add_id) VALUES ($1, $2)", [order[0].id, element.values.add_id]);
                    }
    
                    const total_price = await db.query(`SELECT SUM((product_item.price + COALESCE(addition_price, 0)) * orders.quantity) AS total_price
                                                        FROM orders
                                                        JOIN product_item ON product_item.id = orders.product_id
                                                        LEFT JOIN
                                                            (
                                                                SELECT order_id, SUM(COALESCE(addition.price, 0)) AS addition_price
                                                                FROM order_additions
                                                                LEFT JOIN product_item AS addition ON addition.id = order_additions.add_id
                                                                GROUP BY order_id) AS additions_agg ON orders.id = additions_agg.order_id
                                                                WHERE orders.id = ${order[0].id}
                                                                GROUP BY orders.id
                                                                ORDER BY orders.id;
                                                            `)
                    const q = await db.query(`UPDATE orders SET current_price = $1 WHERE id = $2`, [total_price.rows[0].total_price, order[0].id])
                }

                const cheque_price = await db.query(`SELECT SUM(orders.current_price) FROM cheques
                LEFT JOIN orders ON orders.cheque_id = cheques.id
                WHERE cheques.id = ${cheque[0].id}
                GROUP BY cheques.id
                ORDER BY cheques.id`)
                await db.query(`UPDATE cheques SET total_cheque = $1 WHERE cheques.id = $2`,[cheque_price.rows[0].sum,cheque[0].id])
            }

            return res.status(201).json({"message" : "succesful"})




        }


        catch(e) {
            console.log(e)
            return res.status(404).json({"message" : "error"})
        }
       
    }
}

module.exports = new OrderController();
