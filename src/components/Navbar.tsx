import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";

export default function Navbar() {
  const [visible, setVisible] = useState(false)
  const { setShowSearch, getCartCount } = useContext(ShopContext)
  const [cartCount, setCartCount] = useState<number>(0);

    useEffect(() => {
        const fetchCartCount = async () => {
            try {
                const count = await getCartCount();
                setCartCount(count);
            } catch (error) {
                console.error("Failed to fetch cart count:", error);
            }
        };

        fetchCartCount();
    }, [getCartCount]);

  return (
    <div className="flex items-center justify-between py-5 font-medium">
        <Link to="/"><img src={assets.logo} alt="Logo ecommerce app" className="w-36" /></Link>
        <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
          <NavLink to="/" className="flex flex-col items-center gap-1">
            <p>HOME</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink to="/collection" className="flex flex-col items-center gap-1">
            <p>COLLECTION</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink to="/about" className="flex flex-col items-center gap-1">
            <p>ABOUT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink to="/contact" className="flex flex-col items-center gap-1">
            <p>CONTACT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </ul>

        <div className="flex items-center gap-6">
          <img onClick={()=>setShowSearch(true)} src={assets.search_icon} alt="" className="w-5 cursor-pointer"/>
          <div className="group relative">
            <Link to="/login"><img className="w-5 cursor-pointer" src={assets.profile_icon} alt=""/></Link>
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 bg-slate-100 text-gray-500 rounded">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p className="cursor-pointer hover:text-black">Orders</p>
                <p className="cursor-pointer hover:text-black">Logout</p>
              </div>
            </div>
          </div>
          <Link to="/cart" className="relative">
            <img src={assets.cart_icon} alt="" className="w-5 min-w-5"/>
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 text-white bg-black aspect-square rounded-full text-[8px]">{cartCount}</p>
          </Link>
          <img onClick={() => setVisible(true)} src={assets.menu_icon} alt="" className="w-5 cursor-pointer sm:hidden"/>
        </div>

        {/* Sidebar menu for small screen */}

        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
          <div className="flex flex-col text-gray-600">
            <div onClick={()=> setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
              <img src={assets.dropdown_icon} alt="" className="h-4 rotate-180" />
              <p>Back</p>
            </div>
            <NavLink onClick={()=> setVisible(false)} className="py-2 pl-6 border" to="/">HOME</NavLink>
            <NavLink onClick={()=> setVisible(false)} className="py-2 pl-6 border" to="/collection">COLLECTION</NavLink>
            <NavLink onClick={()=> setVisible(false)} className="py-2 pl-6 border" to="/about">ABOUT</NavLink>
            <NavLink onClick={()=> setVisible(false)} className="py-2 pl-6 border" to="/contact">CONTACT</NavLink>

          </div>
        </div>
    </div>
  )
}