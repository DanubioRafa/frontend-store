export const fetchCategories = async (endpoint) => {
  const object = await fetch(endpoint);
  const categories = await object.json();

  return categories;
}

export const fetchProductsFromCategory = async (categoryID) => {
  const endPoint = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryID}`;
  const object = await fetch(endPoint);
  const products = await object.json();

  return products.results;
} 

export const fetchProductsBySearch = async (name) => {
  const endPoint = `https://api.mercadolibre.com/sites/MLB/search?q=${name}`;
  const object = await fetch(endPoint);
  const products = await object.json();

  return products.results;
}

export const fetchProductByID = async (id) => {
  const endPoint = `https://api.mercadolibre.com/items/${id}`;
  const object = await fetch(endPoint);
  const product = await object.json();

  return product;
}
