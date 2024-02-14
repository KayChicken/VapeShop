const { body } = require('express-validator')
const db = require('../db')


class AdminController {
    async getOrders(req, res) {

        try {
            const { id } = req.body
            if (Number.isInteger(id)) {
                const answer = await db.query(`
                SELECT cheques.id, total_cheque , date_trunc('second', cheques.date) AS date
                FROM cheques
                WHERE cheques.status = ${id}
                GROUP BY cheques.id
                ORDER BY cheques.id DESC;`)
                return res.status(200).json(answer.rows)
            }

            return res.status(400).json({ "message": "error" })

        }


        catch (e) {
            console.log(e)
            return res.status(400).json({ "message": "error" })
        }




    }


    async getFullChequeById(req, res) {
        try {
            const { id } = req.params
            if (Number(id)) {
                const answer = await db.query(`
                SELECT json_build_object(
                    'total_price',total_cheque,
                    'name' , subquery.user_name,
                    'surname' , subquery.surname,
                    'city' , subquery.city,
                    'address' , subquery.address,
                    'vk' , subquery.vk,
                    'tg' , subquery.tg,
                    'phone' , subquery.phone,
                    'products', jsonb_agg(
                         jsonb_build_object(
                                'name', subquery.name,
                                 'img' , subquery.product_img,
                                'price', subquery.current_price,
                                'attributes', attributes,
                                'dops', dops
                            )
                    )
                )
                FROM (
                    SELECT cheques.total_cheque,cheques.name as user_name,cheques.surname,cheques.city,cheques.address,cheques.vk,cheques.tg,cheques.phone,product.img as product_img,orders.id,product.name,orders.current_price, jsonb_object_agg(attribute_name, value) as attributes, json_quert.dops as dops FROM cheques
                LEFT JOIN orders ON orders.cheque_id = cheques.id
                LEFT JOIN product_item ON product_item.id = orders.product_id
                LEFT JOIN product_configuration ON product_configuration.id = product_item.id
                LEFT JOIN variation_option ON variation_option.id = product_configuration.variation_option_id
                LEFT JOIN variation ON variation.id = variation_option.attribute_id
                LEFT JOIN product ON product.id = product_item.product_id
                LEFT JOIN (
                    SELECT subquery_dops.id,jsonb_object_agg(COALESCE(title,'нет'), dops_names) as dops FROM (
                        SELECT orders.id,title, json_agg(COALESCE(product.name,'нет')) as dops_names FROM orders
                        LEFT JOIN order_additions ON orders.id = order_additions.order_id
                        LEFT JOIN addition_option ON addition_option.add_id = order_additions.add_id
                        LEFT JOIN product_item ON addition_option.add_id = product_item.id
                        LEFT JOIN additions ON additions.id = addition_option.addtions_id
                        LEFT JOIN product ON product_item.product_id = product.id
                        WHERE orders.cheque_id = ${id}
                        GROUP BY orders.id,additions.title
                        )AS subquery_dops 
                    GROUP BY subquery_dops.id) as json_quert ON json_quert.id = orders.id
                WHERE cheques.id = ${id}
                GROUP BY orders.id,json_quert.dops,product.name,orders.current_price,cheques.total_cheque,product.img,cheques.name,cheques.surname,cheques.city,cheques.address,cheques.vk,cheques.tg,product.img,cheques.phone
                ) as subquery
                GROUP BY subquery.total_cheque,subquery.user_name,subquery.surname,subquery.city,subquery.address,subquery.vk,subquery.tg,subquery.phone
                
                
                `)
                if (answer.rows.length > 0) {
                    return res.status(200).json(answer.rows[0]['json_build_object'])
                }
                return res.status(200).json({})

            }
            return res.status(400).json({ "message": "error" })
        }

        catch (e) {
            console.log(e)
            return res.status(400).json({ "message": "error" })
        }
    }


}




module.exports = new AdminController()