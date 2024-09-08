import { createContext, ReactNode, useState } from "react";
import { products, Product } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export interface ShopContextType {
    products?: Product[];
    currency: string;
    delivery_fee: number;
    search: string;
    setSearch: (search: string) => void;
    showSearch: boolean;
    setShowSearch: (showSearch: boolean) => void;
    cartItems: any,
    addToCart: (itemId:string, size: string) => void,
    getCartCount: () => Promise<number>,
    updateQuantity: (itemId:string, size: string, quantity: number) => void,
    getCartAmount: () => Promise<number>,
    navigate: any
}

export interface CartItem {
    [size: string]: number;
  }
  
export interface CartItems {
    [itemId: string]: CartItem;
}

const defaultValue: ShopContextType = {
    products: products, 
    currency: '$', 
    delivery_fee: 10,
    search: '',
    setSearch: () => {},
    showSearch: true,
    setShowSearch:() => {},
    cartItems: {},
    addToCart: () => {},
    getCartCount: async () => 0,
    updateQuantity: () => {},
    getCartAmount: async () => 0,
    navigate: () => {}
};

export const ShopContext = createContext<ShopContextType>(defaultValue)

interface ShopContextProviderProps {
    children: ReactNode;
}

const ShopContextProvider = ({ children }: ShopContextProviderProps) => {
    const currency = '$'
    const delivery_fee = 10
    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState<CartItems>({})
    const navigate = useNavigate()

    const addToCart = async (itemId: string, size: string) => {

        if(!size) {
            toast.error("Select Product Size")
            return
        }

        let cartData = structuredClone(cartItems)

        if(cartData[itemId]) {
            if(cartData[itemId][size]) {
                cartData[itemId][size] += 1
            } else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        setCartItems(cartData)
    }

   const getCartCount = async (): Promise<number> =>{
     let totalCount = 0
     for(const items in cartItems) {
        for(const item in cartItems[items]) {
            try{
                if(cartItems[items][item] > 0) {
                    totalCount += cartItems[items][item]
                }
            } catch (error) {
                console.log("An error occured in getCartCount: ", error)
            }
        }
     }
     return totalCount
   }

   const updateQuantity = async (itemId: string, size: string, quantity: number) => {
     let cartData = structuredClone(cartItems)
     cartData[itemId][size] = quantity
     setCartItems(cartData)
   }

   const getCartAmount = async (): Promise<number> => {
     let totalAmount = 0
     for(const items in cartItems) {
        let itemInfo = products?.find((product)=> product._id === items)
        if(itemInfo) {
            for(const item in cartItems[items]) {
                try {
                    if(cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item]
                    }
                } catch(error) {

                }
            }
        }
     }
     return totalAmount
   }

    const value: ShopContextType = {
        products, 
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate
    }

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider