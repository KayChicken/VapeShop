import React, { useEffect, useState } from 'react';
import ShopItem from '../ShopItem/ShopItem';
import CategoryList from './CategoryList';
import axios from '../../utils/axios'


interface DataProps {
    
        id: number,
        name: string,
        short_description: string,
        img: string
      
}

interface Category {
    id: string;
    category: string;
    childs: Category[];
  }
  
  interface CategoryListProps {
    categories: Category[];
  }




const Catalog = () => {


    const [currentCategory, setCurrentCategory] = useState<number>(1)
    const [data,setData] = useState<DataProps[]>([])
    const [categories, setCategories] = useState<any>([])
    const liquids = [
        {id : 1, title : "Unicorn Poop", composition : "bla-bla-bla, dsadasdl, dsad" , img: "1"},
        {id : 2, title : "RAINBOW IS A GAY BARCODE", composition : "bla-bla-bla, dsadasdl, dsad" , img: "2"},
        {id : 3, title : "SUBURBAN RAVE", composition : "bla-bla-bla, dsadasdl, dsad" , img: "3"},
        {id : 4, title : "DENTISTS LOVE IT", composition : "bla-bla-bla, dsadasdl, dsad" , img: "4"},
        {id : 5, title : "PINK GUY LEMONADE", composition : "bla-bla-bla, dsadasdl, dsad" , img: "5"},
        {id : 6, title : "MNOGOETAGKI", composition : "bla-bla-bla, dsadasdl, dsad" , img: "6"},
        {id : 7, title : "MNOGOETAGKI", composition : "bla-bla-bla, dsadasdl, dsad" , img: "7"},

    ]

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchData = async () => {
            const data = await axios.get<DataProps[]>(`/category/${currentCategory}`)
            const categoriesData = await axios.get<CategoryListProps[]>('/catalog')
            setData(data.data)
            setCategories(categoriesData.data)

        }
        
        fetchData()
        


    }, [currentCategory])





    return (
        <section className='catalog'>
            <h1>Каталог</h1>
            <div className="catalog__inner">
                <div className="catalog__left">
                    <h3>Категории</h3>
                    <div className="category__box">
                        <CategoryList categories={categories} level={3} setCurrentCategory={setCurrentCategory}/>     
                    </div>

                </div>
                <div className="catalog__right">
                    {/* <h1>{categories[currentCategory]}</h1> */}
                    <div className="shop-items">
                        {data.map((item) => (
                            <ShopItem id={item.id} title={item.name} composition={item.short_description} img={item.img}/>
                        ))

                        }
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Catalog;