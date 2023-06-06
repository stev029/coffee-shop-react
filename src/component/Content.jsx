import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import * as Icon from 'react-feather'

export function Hero() {
  return (
    <section className="hero" id="home">
      <main className="content">
        <h1>Mari Nikmati Secangkir <span>Kopi</span></h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, enim.</p>
        <a href="#" className="cta">Beli Sekarang</a>
      </main>
    </section>
  )
}

export function About() {
  return (
    <section id="about" className="about">
      <h2><span>Tentang</span> Kami</h2>

      <div className="row">
        <div className="about-img">
          <img src="src/static/img/tentang-kami.jpg" alt="Tentang Kami" />
        </div>
        <div className="content">
          <h3>Kenapa memilih kopi kami?</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur ducimus voluptatum dolor. Et, voluptatum
            accusantium!</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic deserunt iure amet facilis eos a quo cum
            voluptates molestias nihil.</p>
        </div>
      </div>
    </section>

  )
}

export function Menu() {
  return (
    <section id="menu" className="menu">
      <h2><span>Menu</span> Kami</h2>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita, repellendus numquam quam tempora voluptatum.
      </p>

      <div className="row">
        <div className="menu-card">
          <img src="src/static/img/menu/cream.png" alt="Cappucino" className="menu-card-img" />
          <h3 className="menu-card-title">- Cappucino -</h3>
          <p className="menu-card-price">IDR 25K</p>
        </div>
        <div className="menu-card">
          <img src="src/static/img/menu/1.jpg" alt="Espresso" className="menu-card-img" />
          <h3 className="menu-card-title">- Espresso -</h3>
          <p className="menu-card-price">IDR 15K</p>
        </div>
        <div className="menu-card">
          <img src="src/static/img/menu/americano.jpeg" alt="Americano" className="menu-card-img" />
          <h3 className="menu-card-title">- Americano -</h3>
          <p className="menu-card-price">IDR 20K</p>
        </div>
        <div className="menu-card">
          <img src="src/static/img/menu/macchiato.jpg" alt="Macchiato" className="menu-card-img" />
          <h3 className="menu-card-title">- Macchiato -</h3>
          <p className="menu-card-price">IDR 23K</p>
        </div>
        <div className="menu-card">
          <img src="src/static/img/menu/chocolate.jpg" alt="Chocolate" className="menu-card-img" />
          <h3 className="menu-card-title">- Chocolate -</h3>
          <p className="menu-card-price">IDR 20K</p>
        </div>
      </div>
    </section>

  )
}

export function Product() {
  const [open, setOpen] = useState({ target: null, status: false })
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios("http://127.0.0.1:8000/products")
      .then(res => res.data)
      .then(data => setProducts(data))
      .catch(e => console.error(e))
  }, [])

  function openModal(target) {
    setOpen(prevOpen => ({ target, status: !prevOpen.status }))
  }

  return (
    <section className="products" id="products">
      <h2><span>Produk Unggulan</span> Kami</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo unde eum, ab fuga possimus iste.</p>

      <div className="row">
        {products.length ? products.map((row) => (
          <div key={row.id} className="product-card">
            <div className="product-icons">
              <span onClick={() => openModal(row)}><Icon.ShoppingCart /></span>
              <span className="item-detail-button"><Icon.Eye /></span>
            </div>
            <div className="product-image">
              <img src={row.thumbnail} alt="Product 1" />
            </div>
            <div className="product-content">
              <h3>{row.title}</h3>
              <div className="product-stars">
                <i data-star={row.rating} />
                { /*<span className='rating'>({row.rating})</span> */}
              </div>
              <div className="product-price">{row.price}<span>Rp</span></div>
            </div>
          </div>
        )) : <h1>There nothing</h1>}
        {open.status && <Modal setIsOpen={setOpen} product={open.target} />}
      </div>
    </section >
  )
}

export function Contact() {
  return (
    <section id="contact" className="contact">
      <h2><span>Kontak</span> Kami</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, provident.
      </p>

      <div className="row">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63459.36012732144!2d107.00005907596437!3d-6.236026080321581!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69920f5fef7b73%3A0xcf6dd78f4f28a839!2sJl.%20Jati%20Tengah%20VIII%20227-237%2C%20RT.005%2FRW.009%2C%20Bojong%20Menteng%2C%20Kec.%20Rawalumbu%2C%20Kota%20Bks%2C%20Jawa%20Barat%2017117!5e0!3m2!1sid!2sid!4v1684851975632!5m2!1sid!2sid"
          allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" className="map"></iframe>

        <form action="">
          <div className="input-group">
            <i data-feather="user"></i>
            <input type="text" placeholder="nama" />
          </div>
          <div className="input-group">
            <i data-feather="mail"></i>
            <input type="text" placeholder="email" />
          </div>
          <div className="input-group">
            <i data-feather="phone"></i>
            <input type="text" placeholder="no hp" />
          </div>
          <button type="submit" className="btn">kirim pesan</button>
        </form>

      </div>
    </section>

  )
}

function Modal({ setIsOpen, product }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const imgRef = useRef([])
  const dotsRef = useRef([])

  useEffect(() => {
    slideImage(currentSlide)
  }, [currentSlide])

  function slideImage(index) {
    if (currentSlide > imgRef.current.length - 1) return setCurrentSlide(0)
    if (currentSlide < 0) return setCurrentSlide(imgRef.current.length - 1)
    imgRef.current.map((el, i) => {
      el.style.display = "none"
      dotsRef.current[i].className = "dot"
    })
    imgRef.current[index].style.display = "block"
    dotsRef.current[index].className += " active"
    console.log(currentSlide)
  }

  function addToRef(el) {
    if (el && !imgRef.current.includes(el)) {
      imgRef.current.push(el)
    }
  }

  function close(e) {
    if (e.target.className === "modal") {
      closeModal(e)
    }
  }

  function closeModal(e) {
    setIsOpen(prevOpen => ({ ...prevOpen, status: false }))
  }

  return (
    <div className="modal" id="item-detail-modal" onClick={close}>
      <div className="modal-container">
        <div className="close">
          <span className="close-icon" onClick={closeModal}><Icon.X /></span>
        </div>
        <div className="modal-content">
          <div className="image-container">
            {product.images.length > 1
              ? product.images.map((image, key) => (
                <div key={key} ref={addToRef} className="image-content fade">
                  <div className="text-number">{`${key + 1}/${product.images.length}`}</div>
                  <img src={image} alt={product.title} />
                </div>
              ))
              : (
                <div className="image-content single" ref={addToRef}>
                  <div className="text-number">{`1/${product.images.length}`}</div>
                  <img src={product.images[0]} alt={product.title} />
                </div>
              )
            }
            <span className={`prev${product.images.length > 1 ? "" : " disabled"}`} onClick={() => setCurrentSlide(prev => prev - 1)}>&#10094;</span>
            <span className={`next${product.images.length > 1 ? "" : " disabled"}`} onClick={() => setCurrentSlide(prev => prev + 1)}>&#10095;</span>
            <div className='dots'>
              {Array(product.images.length).fill().map((_, i) =>
              (
                <span key={i} ref={el => dotsRef.current[i] = el} onClick={() => setCurrentSlide(i)} className="dot" />
              )
              )}
            </div>
          </div>
          <div className="product-content">
            <div className="title">
              <h3>{product.title}</h3>
            </div>
            <p>{product.description}</p>
            <div className="product-stars">
              <i data-star={product.rating} />
              <span className='rating'>({product.rating})</span>
            </div>
            <div className="product-price"><span>Rp{product.price}</span></div>
            <div className="cart">
              <a href="#"><Icon.ShoppingCart /> <span>add to cart</span></a>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
