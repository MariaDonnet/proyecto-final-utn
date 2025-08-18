import { Footer } from "./Footer"
import { Header } from "./Header"
import "../styles/components/Layout.css";

const Layout = (props) => {
  return (
    <div className={`layout-container ${props.background}`}>
      <Header />
      <main>
        {props.children}
      </main>
      <Footer />
    </div>
  )
}

export { Layout }