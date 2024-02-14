const express = require('express')
const userRouter = require('./routes/user_routes')
const orderRouter = require('./routes/order_routes')
const adminRouter = require('./routes/admin_routes')
const cors = require('cors');
const db = require('./db');
const app = express()



app.use(cors());
app.use(express.json())
app.use('/' , userRouter)
app.use('/', orderRouter)
app.use('/', adminRouter)





app.get('/', async (req, res) => {
    const answer = await db.query("SELECT * FROM product")
    res.send(answer.rows)
})


app.get('/catalog', async (req, res) => {
    try {

        const answer = await db.query("SELECT * FROM category")

        const parentCatalog = (categories, parentId) => {
            const categoryTree = {};
            for (const category of categories) {
                if (category.parent_category_id === parentId) {
                    const categoryId = category.id;
                    categoryTree[categoryId] = {
                        category: category.category_name,
                        childs: parentCatalog(categories, categoryId)
                    };
                }
            }
            return categoryTree;
        }

        res.send(JSON.stringify(parentCatalog(answer.rows , null), null, 4))


    }

    catch (e) {
        console.log(e)
    }
})




app.get('/category/:category', async (req, res) => {
    try {
        const category = req.params.category ? req.params.category : 1
        console.log(req.params.category)

        const answer = await db.query(`
        SELECT product.id,name,short_description,img FROM category_product JOIN category ON category.id = category_id JOIN product ON product_id = product.id WHERE category.id = ${category}
        `)

        res.send(JSON.stringify(answer.rows, null, 4))

    }

    catch (e) {
        console.log(e)
    }
})







app.get('/product/:id', async (req, res) => {

    const id = req.params.id


    const answer = await db.query(`
    SELECT product_configuration.id,sku,price,category_name,value,name,description,short_description,img,attribute_name FROM product_configuration 
    JOIN product_item ON product_configuration.id = product_item.id
    JOIN variation_option ON variation_option.id = variation_option_id 
    JOIN product ON product.id = product_id
    JOIN variation ON variation.id = attribute_id
    JOIN category ON category.id = product.category_id
    WHERE product_id = ${id}
    ORDER BY product_item.id
    `)

    const dops = await db.query(`
    SELECT * FROM addition_option
    JOIN additions ON additions.id = addition_option.addtions_id
    JOIN product_item ON product_item.id = addition_option.add_id
    JOIN product ON product.id = product_item.product_id
    WHERE additions.product_id = 1
    `)

    const dopsData = {}

    dops.rows.forEach((dop) => {
        const { add_id, title, price, name } = dop
        if (!dopsData[title]) {
            dopsData[title] = [{ add_id, name, price }]
        }
        else {
            dopsData[title].push({ add_id, name, price })
        }
    })



    const transformedData = {};

    answer.rows.forEach(item => {
        if (!transformedData.name) {
            transformedData.dops = dopsData
            transformedData.name = item.name;
            transformedData.category = item.category_name
            transformedData.description = item.description
            transformedData.short_description = item.short_description
            transformedData.img = item.img
            transformedData.prices = [];
        }

        const existingPrice = transformedData.prices.find(price => price.id === item.id);

        if (existingPrice) {
            existingPrice.attributes.push({ name: item.attribute_name, value: item.value });
        } else {
            transformedData.prices.push({
                id: item.id,
                sku: item.sku,
                price: item.price,
                attributes: [{ name: item.attribute_name, value: item.value }]
            });
        }
    });


    res.send(JSON.stringify(transformedData, null, 4))
})


app.get('/home', (req, res) => {
    console.log(req.params)
    res.json({
        succes: true
    })
})



app.get("/homes" , async (req,res) => {
    const answer = await db.query(`SELECT product_configuration.id,product_item.sku,product_item.price,category_name,product.name,product.description,product.short_description,product.img,additions.title,dopping.sku as dop_sku,dopping.price as dop_price,dop_product.name as dop_name, addition_option.add_id, json_object_agg(attribute_name, value) as attributes FROM product_configuration 
    JOIN product_item ON product_configuration.id = product_item.id
    JOIN variation_option ON variation_option.id = variation_option_id 
    JOIN product ON product.id = product_id
    JOIN variation ON variation.id = attribute_id
    JOIN category ON category.id = product.category_id
	LEFT JOIN additions ON additions.product_id = product.id
	LEFT JOIN addition_option ON addition_option.addtions_id = additions.id
	LEFT JOIN product_item AS dopping ON dopping.id = addition_option.add_id
	LEFT JOIN product as dop_product ON dopping.product_id = dop_product.id
	WHERE product_item.product_id = 1
	GROUP BY product_configuration.id,product_item.sku,product_item.price,category_name,product.name,product.description,product.short_description,product.img,additions.title,dop_sku,dop_price,dop_name,addition_option.add_id,product_item.id
	ORDER BY product_item.id`)
    return res.send(JSON.stringify(answer.rows))
})

app.listen('3030', () => {
    console.log("SERVER STARTED")
})












