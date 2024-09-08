import { useContext } from "react"
import { Link } from "react-router-dom"
import { ShopContext } from "../context/ShopContext"

export interface ProductItemProps {
    id: string,
    image: string[],
    name: string,
    price: number
}

export default function ProductItem(props: ProductItemProps) {

    const { currency } = useContext(ShopContext)

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/products/${props.id}`}>
        <div className="overflow-hidden">
            <img className="hover:scale-110 transition ease-in-out" src={props.image[0]} alt="" />
        </div>
        <p className="pt-3 pb-1 text-sm">{props.name}</p>
        <p className="text-sm font-medium">{currency}{props.price}</p>
    </Link>
  )
}
