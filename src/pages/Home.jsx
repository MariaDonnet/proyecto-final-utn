import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { useAuth } from "../context/UserContext";
import Swal from 'sweetalert2';
import "../styles/pages/Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null);
  const [titleEdit, setTitleEdit] = useState("");
  const [priceEdit, setPriceEdit] = useState("");
  const [descriptionEdit, setDescriptionEdit] = useState("");
  const [categoryEdit, setCategoryEdit] = useState("");
  const [imageEdit, setImageEdit] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

  // simulando existencia del usuario, proximamente este estado será global
  const { user } = useAuth();

  const fetchingProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products", { method: "GET" });
    const data = await response.json();
    setProducts(data);
  };

  // El array vacío (dependencias) espera a que ejecute el return del jsx. Si tiene algo, useEffect se va a ejecutar cada vez que se modifique lo que este dentro de la dependencia.
  useEffect(() => {
    fetchingProducts();
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, { method: "DELETE" });
        // Confirmación con SweetAlert2
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Este producto será eliminado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProducts((prevProduct) =>
          prevProduct.filter((product) => product.id !== id)
        );

        // Mensaje de éxito
        Swal.fire({
          icon: "success",
          title: "Producto eliminado",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  const handleOpenEdit = (product) => {
    setShowPopup(true);
    setProductToEdit(product);
    setTitleEdit(product.title);
    setPriceEdit(product.price);
    setDescriptionEdit(product.description);
    setCategoryEdit(product.category);
    setImageEdit(product.image);
  };

  // petición al backend mediante fetch para modificar-> método PATCH / PUT https://fakeproductapi.com/products
  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      id: productToEdit.id,
      title: titleEdit,
      price: Number(priceEdit),
      description: descriptionEdit,
      category: categoryEdit,
      image: imageEdit,
    };

    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productToEdit.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        const data = await response.json();
        setProducts((prevProduct) => prevProduct.map((product) => (product.id === productToEdit.id ? data : product)));
        // fetchingProducts()
      }
      setShowPopup(false);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts = products.filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Layout>
      <div className="container">
        <section className="home-hero">
          <h1>Bienvenido a Nuestra Tienda</h1>
          <p>Descubrí una selección exclusiva de productos para vos. Calidad, confianza y atención personalizada.</p>
        </section>

        <section className="benefits-section">
          <h2>¿Por qué elegirnos?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <i className="bi bi-truck"></i>
              <h5>Envíos a todo el país</h5>
              <p>Recibí tu compra en la puerta de tu casa estés donde estés.</p>
            </div>
            <div className="benefit-card">
              <i className="bi bi-shield-lock"></i>
              <h5>Pagos seguros</h5>
              <p>Trabajamos con plataformas que garantizan tu seguridad.</p>
            </div>
            <div className="benefit-card">
              <i className="bi bi-person-check"></i>
              <h5>Atención personalizada</h5>
              <p>Estamos disponibles para ayudarte en todo momento.</p>
            </div>
          </div>
        </section>

        <section className="products-intro">
          <h2 className="products-title">Nuestros productos</h2>
          <p className="products-text">Elegí entre nuestras categorías más populares.</p>
          <div className="search-container">
            <i className="bi bi-search"></i>
            <input type="text" placeholder="Buscar producto..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>

          {showPopup && (
            <section className="popup-edit">
              <h2>Editando producto.</h2>

              <form onSubmit={handleUpdate}>
                <input type="text" placeholder="Ingrese el titulo" value={titleEdit} onChange={(e) => setTitleEdit(e.target.value)} />
                <input type="number" placeholder="Ingrese el precio" value={priceEdit} onChange={(e) => setPriceEdit(e.target.value)} />
                <textarea placeholder="Ingrese la descripción" value={descriptionEdit} onChange={(e) => setDescriptionEdit(e.target.value)}></textarea>
                <input type="text" placeholder="Ingrese la categoria" value={categoryEdit} onChange={(e) => setCategoryEdit(e.target.value)} />
                <input type="text" placeholder="Ingrese la URL de la imagen" value={imageEdit} onChange={(e) => setImageEdit(e.target.value)} />
                <button>Actualizar</button>
                <button onClick={() => setShowPopup(null)}>Cerrar</button>
              </form>
            </section>
          )}

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <div className="product-image-container">
                  <img src={product.image} alt={`Imagen de ${product.title}`} className="product-image" />
                </div>
                <div className="product-info">
                  <h3 className="product_title">{product.title}</h3>
                  <p className="product_price">${product.price}</p>
                  <p className="product_description">{product.description}</p>
                  <p className="product_category">{product.category}</p>
                </div>

                {user && (
                  <div className="product-actions">
                    <button onClick={() => handleOpenEdit(product)} className="product-update">Editar</button>
                    <button onClick={() => handleDelete(product.id)} className="product-delete">Eliminar</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export { Home };
