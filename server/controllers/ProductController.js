import Product from "../models/Product";        

export const addProduct = async (req, res) => {
  const { name, description, quantity, price } = req.body;
  const userId = req.userId;
  try {
    const newProduct = new Product({
      userId,
      name,
      description,
      quantity,
      price,
      history: [{ quantity }],
    });
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateProductQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.userId;
  try {
    const product = await Product.findOne({ _id: productId, userId });
    if (!product) return res.status(404).json({ error: "Product not found" });

    product.quantity = quantity;
    product.history.push({ quantity });
    await product.save();
    res.json({ message: "Product quantity updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUserProducts = async (req, res) => {
  const userId = req.userId;
  try {
    const products = await Product.find({ userId });
    res.json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
