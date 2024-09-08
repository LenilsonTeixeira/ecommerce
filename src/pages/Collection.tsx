import { ChangeEvent, useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import { assets, Product } from "../assets/frontend_assets/assets"
import Title from "../components/Title"
import ProductItem from "../components/ProductItem"

export default function Collection() {

  const { products, search, showSearch } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState<Product[]>([])
  const [category, setCategory] = useState<string[]>([])
  const [subCategory, setSubCategory] = useState<string[]>([])
  const [sortType, setSortType] = useState('relavent')

  const toggleCategory = (e: ChangeEvent<HTMLInputElement>) => {
    if(category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSubCategory(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const applyFilter = () => {
    if(products) {
      let productCopy = products?.slice()

      if (showSearch && search) {
        productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
      }
      if(category.length > 0) {
        productCopy = productCopy?.filter(item => category.includes(item.category))
      }

      if(subCategory.length > 0) {
        productCopy = productCopy?.filter(item => subCategory.includes(item.subCategory))
      }

      setFilterProducts(productCopy)
    }
  }

  const sortProduct = () => {
    let filterProduct = filterProducts.slice()

    switch(sortType) {
      case 'low-high': {
        setFilterProducts(filterProduct.sort((a,b)=>(a.price - b.price)))
        break
      }
      case 'high-low': {
        setFilterProducts(filterProduct.sort((a,b)=>(b.price - a.price)))
        break
      }
      default: {
        applyFilter()
        break
      }

    }
  }

  useEffect(() => {
    applyFilter()
  },[category, subCategory, search, showSearch])

  useEffect(()=> {
    sortProduct()
  }, [sortType])

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter options */}
      <div className="min-w-60">
        <p onClick={()=> setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">FILTERS
          <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} alt="" />
        </p>
        {/* Category Filter */}
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <p className="flex gap-2">
                <input type="checkbox" className="w-3" value={'Men'} onChange={toggleCategory}/>Men
              </p>
              <p className="flex gap-2">
                <input type="checkbox" className="w-3" value={'Women'} onChange={toggleCategory} />Women
              </p>
              <p className="flex gap-2">
                <input type="checkbox" className="w-3" value={'Kids'} onChange={toggleCategory} />Kids
              </p>
            </div>
          </div>
        {/* SubCategory Filter */}
            <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
              <p className="mb-3 text-sm font-medium">TYPE</p>
              <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                <p className="flex gap-2">
                  <input type="checkbox" className="w-3" value={'Topwear'} onChange={toggleSubCategory}/>Topwear
                </p>
                <p className="flex gap-2">
                  <input type="checkbox" className="w-3" value={'Bottomwear'} onChange={toggleSubCategory}/>Bottomwear
                </p>
                <p className="flex gap-2">
                  <input type="checkbox" className="w-3" value={'Winterwear'} onChange={toggleSubCategory}/>Winterwear
                </p>
              </div>
            </div>
      </div>
      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title texts={['ALL', 'COLLECTIONS']}/>
          {/* Product Sort */}
          <select onChange={(e)=> setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {
            filterProducts.map((item, index)=>(
              <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
            ))
          }
        </div>
      </div>
    </div>
  )
}
