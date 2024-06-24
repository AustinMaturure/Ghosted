import igImg from '../assets/ig.svg'
import wpImg from '../assets/wp.svg'
import fbImg from '../assets/fb.svg'
import ttImg from '../assets/tt.svg'
import ytImg from '../assets/yt.svg'
export default function Footer() {
    return (
      <>
      <footer>
        <h1>GHOSTED</h1>
        <h2>{`Feel Free to Write to Us (We Promise we won't Ghost you.)`}</h2>
        <input type="email" placeholder="Write Message..."></input>
        <div className='s-links'>
        <a className="social-link" href="https://austinmaturure.netlify.app" target="_blank" rel="noopener noreferrer"><img src={igImg} alt="" /></a>
            <img src={wpImg} alt="" />
            <img src={fbImg} alt="" />
            <img src={ttImg} alt="" />
            <img src={ytImg} alt="" />
        </div>
        <div className="legal">
        <p className="copy-right">&copy; {new Date().getFullYear()} Ghosted. All rights reserved.</p>
  <p className="author">Designed and developed by <a className="austin-portfolio" href="https://austinmaturure.netlify.app" target="_blank" rel="noopener noreferrer">⚡</a>, 
    <a className="faiz-portfolio" href="https://github.com/faiz-kirsten" target="_blank" rel="noopener noreferrer"> 🎯</a>, <a className="success-portfolio" href="https://github.com/suskidee" target="_blank" rel="noopener noreferrer">👨‍💻</a></p>
   
   </div>
    </footer></>
    )

}