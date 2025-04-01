import axios from "axios";

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await fetch("/api/auth", {
    method: "POST",
    body: JSON.stringify({ name, email, password, action: "register" }),
    headers: { "Content-Type": "application/json" },
  });

  return res.json();
};

export const login = async (email: string, password: string) => {
  const res = await fetch("/api/auth", {
    method: "POST",
    body: JSON.stringify({ email, password, action: "login" }),
    headers: { "Content-Type": "application/json" },
  });

  return res.json();
};

export const logout = async () => {
  const res = await fetch("/api/auth", {
    method: "POST",
    body: JSON.stringify({ action: "logout" }),
    headers: { "Content-Type": "application/json" },
  });

  return res.json();
};

export const fetchCarts = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      console.log("Products fetched successfully:", response.data);
      
      return response.data.products.map((product: any) => ({
        id: product.id,
        title: product.title,
        description: product.description,
        category: product.category,
        price: product.price,
        stock: product.stock,
      }));
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };
  
