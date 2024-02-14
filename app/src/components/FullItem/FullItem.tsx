import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../utils/axios';
import { addCart } from '../../store/slices/cartSlice';
import { useDispatch } from 'react-redux'

interface IFullItem {
    dops: {
        [key: string]: {
            add_id: number;
            name: string;
            price: number;
        }[];
    };
    name: string;
    category: string;
    description: string;
    short_description: string;
    img: string;
    prices: {
        id: number;
        sku: string;
        price: number;
        attributes: {
            name: string;
            value: string;
        }[];
    }[];
}



export interface PriceInterface {
    id: number;
    sku: string;
    price: number;
    attributes: {
        name: string;
        value: string;
    }[];
    
};

const FullItem = () => {

    const [count, setCount] = useState<number>(1);
    const [data, setData] = useState<IFullItem | null>(null);
    const { id } = useParams();
    const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
    const [selectedDops, setSelectedDops] = useState<any>([])
    const [selectedBtnDops, setSelectedBtnDops] = useState<number[]>([])
    const dispatch = useDispatch()
    let selectProductId: PriceInterface | null = null

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<IFullItem>(`/product/${id}`);
                setData(response.data);
            } catch (e) {
                console.log(e);
            }
        };

        fetchData();
    }, [id]);

    const handleAttributeChange = (attributeName: string, value: string) => {
        setSelectedAttributes({
            ...selectedAttributes,
            [attributeName]: value,
        });
    };










    const handleClickDopsBtn = (index: number, title: string, values: any) => {
        if (!selectedBtnDops.includes(index)) {
            setSelectedBtnDops([...selectedBtnDops, index]);
            setSelectedDops([...selectedDops, { title, values }]);
            
        } else {
            setSelectedBtnDops([...selectedBtnDops].filter((btnIndex) => btnIndex !== index));
            setSelectedDops(selectedDops.filter((item: any) => item.title !== title || item.values !== values));
        }
    };


    




    const getSelectedPrice = (value: number) => {
        if (!data) {
            return 'Loading...';
        }

        const selectedPriceOption = data.prices.find((priceOption) => {

            return priceOption.attributes.every((attribute) => {
                const { name, value } = attribute;
                return selectedAttributes[name] === value;
            });
        });

        if (selectedPriceOption) {

            const addPrice = selectedDops.reduce((accumulator: number, item: any) => {
                console.log(item.values.price)
                return accumulator + item.values.price;
            }, 0);

            selectProductId = selectedPriceOption
            return `Стоимость: ${(selectedPriceOption.price + addPrice) * value}`;
        }


        return '';
    };



    const getUniqueAttributes = () => {
        const uniqueAttributes: Record<string, string[]> = {};

        for (const priceOption of data?.prices || []) {
            for (const attribute of priceOption.attributes) {
                const { name, value } = attribute;

                if (!uniqueAttributes[name]) {
                    uniqueAttributes[name] = [value];
                } else if (!uniqueAttributes[name].includes(value)) {
                    uniqueAttributes[name].push(value);
                }
            }
        }

        return uniqueAttributes;
    };

    const isDisabledBtn = (attributeName: string, value: string) => {
        let isDisabled = false;
        if (Object.keys(selectedAttributes).length !== 0) {
            const nextChoose = { ...selectedAttributes, [attributeName]: value };

            const find = data?.prices.find((item) => {
                return Object.keys(nextChoose).every((att) => {
                    return item.attributes.find((attribute) => {
                        return attribute.name === att && attribute.value === nextChoose[att]
                    })
                })


            })
            isDisabled = Boolean(!find)

        }
        return isDisabled;
    };


    const handleCount = (action: string) => {
        switch (action) {
            case 'plus':
                setCount((prevCount) => prevCount + 1)
                break;
            case 'minus':
                if (count !== 1) {
                    setCount((prevCount) => prevCount - 1)
                    break;
                }
        }

    }


    const handleAddToCart = () => {
        if (selectProductId && data) {
            dispatch(addCart({
                "id" : Date.now(),
                "id_prod": selectProductId.id,
                "attributes": selectProductId.attributes,
                "dops": selectedDops,
                "img": data.img,
                "name": data.name,
                "quantity" : count,
                "price" : selectProductId.price
            }));
        }
    };


    return (
        <div className="full-item">
            {data ? (
                !Object.keys(getUniqueAttributes()).includes('none')

                    ? (<>
                        <h1>{data.name}</h1>
                        <div className="full-item__container">
                            <div className="full-item__img">
                                <img src={`/img/liquid/${data.img}`} alt="item.png" />
                            </div>
                            <div className="full-item__content">
                                <p className="full-item__composition">{data.short_description}</p>
                                <div className="full-item__settings">
                                    {Object.entries(getUniqueAttributes()).map(([attributeName, values]) => (
                                        <div key={attributeName} className='full-item__attribute'>
                                            <h2>{attributeName}</h2>
                                            <div className="full-item__values">
                                                {values.map((value) => {
                                                    const isDisabled = isDisabledBtn(attributeName, value)
                                                    return <button key={`${attributeName}-${value}`}
                                                        className={
                                                            `attribute-value ${selectedAttributes[attributeName] === value ? "active" : (isDisabled ? 'not-active' : '')}`
                                                        }
                                                        onClick={() => handleAttributeChange(attributeName, value)}
                                                        disabled={isDisabled}
                                                    >
                                                        {value}
                                                    </button>
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="full-item__settings">
                                    {Object.entries(data.dops).map(([title, values]) => (
                                        <div key={title} className='full-item__attribute'>
                                            <h2>{title}</h2>
                                            <div className="full-item__values">
                                                {values.map((value, index) => (
                                                    <button key={`${title}-${value.name}`} className={`attribute-value ${selectedBtnDops.includes(index) ? 'active' : ''}`} onClick={() => { handleClickDopsBtn(index, title, value) }} >{value.name}</button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}


                                </div>
                                <div className="full-item__settings">
                                    <h2>Описание</h2>
                                    <p className="full-item__desc">{data.description}</p>
                                </div>
                                <div className="full-item__settings">
                                    <h2>Количество</h2>
                                    <div className="full-item__add">

                                        <div className="full-item__add">
                                            <svg onClick={() => { handleCount('minus') }} x="0px" y="0px" width="18px" height="18px" viewBox="0 0 80.593 122.88" enableBackground="new 0 0 80.593 122.88" ><g><polygon points="80.593,0 49.771,0 0,61.44 49.771,122.88 80.593,122.88 30.82,61.44 80.593,0" /></g></svg>
                                            <input value={count} className='full-item__count' onChange={(e) => setCount(Number(e.target.value))} />
                                            <svg onClick={() => { handleCount('plus') }} x="0px" y="0px" width="18px" height="18px" viewBox="0 0 80.593 122.88" enableBackground="new 0 0 80.593 122.88"><g><polygon points="0,0 30.82,0 80.593,61.44 30.82,122.88 0,122.88 49.772,61.44 0,0" /></g></svg>
                                        </div>

                                    </div>
                                </div>
                                <div className="full-item__price">{getSelectedPrice(count)}</div>
                                <button className="item-add-cart" onClick={handleAddToCart}>В корзину</button>
                            </div>
                        </div>
                    </>)
                    : (<>
                        <h1>{data.name}</h1>
                        <div className="full-item__container">
                            <div className="full-item__img">
                                <img src={`/img/liquid/${data.img}`} alt="item.png" />
                            </div>
                            <div className="full-item__content">
                                <p className="full-item__composition">{data.short_description}</p>
                                <div className="full-item__settings">
                                </div>
                                <div className="full-item__settings">
                                    <h2>Допы</h2>
                                    <div className="full-item__values">
                                        <button className="attribute-value">
                                            <span>Йогурт</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="full-item__settings">
                                    <h2>Описание</h2>
                                    <p className="full-item__desc">{data.description}</p>
                                </div>
                                <div className="full-item__settings">
                                    <h2>Количество</h2>
                                    <div className="full-item__add">

                                        <div className="full-item__add">
                                            <svg onClick={() => { handleCount('minus') }} x="0px" y="0px" width="18px" height="18px" viewBox="0 0 80.593 122.88" enableBackground="new 0 0 80.593 122.88" ><g><polygon points="80.593,0 49.771,0 0,61.44 49.771,122.88 80.593,122.88 30.82,61.44 80.593,0" /></g></svg>
                                            <input value={count} className='full-item__count' onChange={(e) => setCount(Number(e.target.value))} />
                                            <svg onClick={() => { handleCount('plus') }} x="0px" y="0px" width="18px" height="18px" viewBox="0 0 80.593 122.88" enableBackground="new 0 0 80.593 122.88"><g><polygon points="0,0 30.82,0 80.593,61.44 30.82,122.88 0,122.88 49.772,61.44 0,0" /></g></svg>
                                        </div>

                                    </div>
                                </div>
                                <div className="full-item__price">Стоимость: {data.prices[0].price * count}</div>
                                {/* <button className="item-add-cart" onClick={() => {dispatch(addCart({"id" : data.prices[0].id}))}}>В корзину</button> */}
                            </div>
                        </div>
                    </>)

            ) : (
                'Загрузка...'
            )}
        </div>
    );
};

export default FullItem;
