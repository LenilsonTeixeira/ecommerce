import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "./Title"

export default function CartTotal() {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext)
  const [totalCartAmount, setTotalCartAmount] = useState<number>(0)
  
  const fetchCartTotal = async () => {
    try {
        const totalCartAmount = await getCartAmount()
        setTotalCartAmount(totalCartAmount)
    } catch (error) {
        
    }
  }
  useEffect(()=>{
    fetchCartTotal()
  },[])
  return (
    <div className="w-full">
        <div className="text-2xl">
            <Title texts={['CART', 'TOTALS']}/>
        </div>
        <div className="flex flex-col gap-2 mt-2 text-sm">
            <div className="flex justify-between">
                <p>Subtotal</p>
                <p>{currency} {totalCartAmount}.00</p>
            </div>
            <hr />
            <div className="flex justify-between">
                <p>Shipping Fee</p>
                <p>{currency} {delivery_fee}.00</p>
            </div>
            <hr />
            <div className="flex justify-between">
                <b>Total</b>
                <b>{currency} {totalCartAmount === 0 ? 0 : totalCartAmount + delivery_fee}.00</b>
            </div>
        </div>
    </div>
  )
}
