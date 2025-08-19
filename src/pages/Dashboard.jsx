import { useState } from "react"
import { Layout } from "../components/Layout"
import "../styles/pages/Dashboard.css"  

const Dashboard = () => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [product, setProduct] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!name || !price || !description) {
      setError("Debes completar todos los campos")
      return
    }

    if (name.length < 3) {
      setError("El nombre debe tener al menos 3 caracteres")
      return
    }

    const newProduct = {
      id: crypto.randomUUID(),
      title: name,
      price: price,
      description: description,
      category: "",
      image: ""
    }

    // petición al backend mediante fetch -> método POST https://fakeproductapi.com/products
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProduct)
    })

    const data = await response.json()
    setProduct(data)
    setName("")
    setPrice("")
    setDescription("")
  }

  return (
    <Layout>
      <h1 className="dashboard-title">Panel de Administración</h1>

      <section className="dashboard-section">
        <h2 className="section-title">Cargar nuevo producto</h2>
        <form className="product-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nombre del producto:</label>
            <input
              type="text"
              name="nombre"
              className="form-input"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Precio:</label>
            <input
              type="number"
              name="precio"
              className="form-input"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Descripción:</label>
            <textarea
              name="descripcion"
              rows="4"
              className="form-textarea"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button className="submit-button">Guardar producto</button>
        </form>

        {product && (
          <div className="product-display">
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">${product.price}</p>
            <p className="product-description">{product.description}</p>
          </div>
        )}
      </section>
    </Layout>
  )
}

export { Dashboard }
