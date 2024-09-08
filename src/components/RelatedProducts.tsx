import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import { Product } from "../assets/frontend_assets/assets"
import Title from "./Title"
import ProductItem from "./ProductItem"

export interface RelatedProductsProps {
    category: string,
    subCategory: string
}

export default function RelatedProducts({category, subCategory}: RelatedProductsProps) {

  const { products } = useContext(ShopContext)
  const [related, setRelated] = useState<Product[]>([])

  useEffect(()=>{
    if(products) {
        if(products.length > 0) {
            let productsCopy = products.slice()
            productsCopy = productsCopy.filter((item)=> category === item.category)
            productsCopy = productsCopy.filter((item)=> subCategory === item.subCategory)
            setRelated(productsCopy.slice(0,5))
        }
    }
  },[products])
  return (
    <div className="my-24">
        <div className="text-center text-3xl py-2">
            <Title texts={['RELATED', 'PRODUCTS']}/>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {
                related.map((item,index)=> (
                    <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
                ))
            }
        </div>
    </div>
  )
}
