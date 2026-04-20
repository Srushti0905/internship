
export const getSavedProducts = () => {
    return JSON.parse(localStorage.getItem("savedProducts")) || [];
  };
  
  export const saveProduct = (product) => {
    const saved = getSavedProducts();
    const exists = saved.find((item) => item.id === product.id);
  
    if (!exists) {
      const updated = [...saved, product];
      localStorage.setItem("savedProducts", JSON.stringify(updated));
    }
  };
  
  export const removeProduct = (id) => {
    const saved = getSavedProducts();
    const updated = saved.filter((item) => item.id !== id);
    localStorage.setItem("savedProducts", JSON.stringify(updated));
  };
  
  export const isProductSaved = (id) => {
    const saved = getSavedProducts();
    return saved.some((item) => item.id === id);
  };