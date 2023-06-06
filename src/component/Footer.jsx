import * as Icon from 'react-feather'

export default function Footer() {
  return (
    <footer>
      <div className="socials">
        <a target="_blank" href="https://www.instagram.com/dn_mrsl/"><Icon.Instagram /></a>
        <a target="_blank" href=" https://wa.me/+62895393041611?text=Hello!!"><Icon.MessageCircle /></a>
      </div>

      <div className="links">
        <a href="#home">Home</a>
        <a href="#about">Tentang Kami</a>
        <a href="#menu">Menu</a>
        <a href="#contact">Kontak</a>
      </div>

      <div className="credit">
        <p>Created by <a href="">Marsel</a>. | &copy; 2023.</p>
      </div>
    </footer>

  )
}
