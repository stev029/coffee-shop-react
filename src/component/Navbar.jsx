import * as Icon from "react-feather"
import { useEffect, useState } from "react"
import { useRef } from "react"
import axios from "axios"

export default function Navbar() {
  const [extras, setExtras] = useState({ navbar: false, search: false, shoppingCart: false })

  function handleClick(event) {
    const target = event.currentTarget.name
    Object.keys(extras).map((key) => {
      if (key !== target) {
        setExtras(prevExtras => ({ ...prevExtras, [key]: false }))
      }
    })
    setExtras(prevExtras => ({ ...prevExtras, [target]: !prevExtras[target] }))
    event.preventDefault();
  }

  return (
    <nav class="navbar">
      <a href="#" class="navbar-logo">kebersamaan<span>kopi</span>.</a>

      <div className={extras.navbar ? "navbar-nav active" : "navbar-nav"}>
        <a href="#home">Home</a>
        <a href="#about">Tentang Kami</a>
        <a href="#menu">Menu</a>
        <a href="#products">Produk</a>
        <a href="#contact">Kontak</a>
      </div>

      <div className="navbar-extra">
        <a href="#" id="search-button" onClick={handleClick} name="search"><Icon.Search /></a>
        <a href="#" name="shoppingCart" id="shopping-cart-button" onClick={handleClick}><Icon.ShoppingCart /></a>
        <a href="#" name="navbar" id="hamburger-menu" onClick={handleClick}><Icon.Menu /></a>
      </div>
      {extras.search && <SearchBtn />}
      <div className={extras.shoppingCart ? "shopping-cart active" : "shopping-cart"}>
        <div className="cart-item">
          <img src="src/static/img/products/1.jpg" alt="Product 1" />
          <div className="item-detail">
            <h3>Product 1</h3>
            <div className="item-price">IDR 30K</div>
          </div>
          <i data-feather="trash-2" className="remove-item"></i>
        </div>
        <div className="cart-item">
          <img src="src/static/img/products/1.jpg" alt="Product 1" />
          <div className="item-detail">
            <h3>Product 1</h3>
            <div className="item-price">IDR 30K</div>
          </div>
          <i data-feather="trash-2" className="remove-item"></i>
        </div>
        <div className="cart-item">
          <img src="src/static/img/products/1.jpg" alt="Product 1" />
          <div className="item-detail">
            <h3>Product 1</h3>
            <div className="item-price">IDR 30K</div>
          </div>
          <i data-feather="trash-2" className="remove-item"></i>
        </div>
      </div>
    </nav>
  )
}

function SearchBtn() {
  const refSearch = useRef()
  const [searchValue, setSearchValue] = useState("")
  const [products, setProducts] = useState([])

  useEffect(() => {
    refSearch.current.focus()
  }, [])

  useEffect(() => {
    if (!searchValue) {
      return setProducts([])
    }
    axios(`http://127.0.0.1:8000/products?search=${searchValue}&limit=5`)
      .then(res => res.data)
      .then(res => setProducts(res))
      .catch(e => console.error(e))
  }, [searchValue])

  return (
    <div className="search">
      <div className="search-form">
        <input ref={refSearch} type="search" placeholder="search here..." onChange={(e) => setSearchValue(e.target.value)} />
        <a className="btn-search"><Icon.Search /></a>
      </div>
      <div className="search-result">
        {products.length ? products.map(product => (
          <div className="result-row">
            <a className="title">{product.title}</a>
            <p className="description">{product.description}</p>
          </div>
        )) : <h1>Not Found!</h1>}
        <div className="all-product">
          <a href="#">See all produts</a>
        </div>
      </div>
    </div>
  )
}
