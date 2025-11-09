import CartItem from '../models/CartItem.js';
import Product from '../models/Product.js';

export const getCart = async (req, res) => {
  try {
    const cartItems = await CartItem.find().populate('product');
    const total = cartItems.reduce((sum, item) => sum + item.product.price * item.qty, 0);
    res.json({ items: cartItems, total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching cart' });
  }
};

export const addToCart = async (req, res) => {
  const { productId, qty } = req.body;

  if (!productId || !qty || qty <= 0) {
    return res.status(400).json({ message: 'Invalid productId or quantity' });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let cartItem = await CartItem.findOne({ product: productId });
    if (cartItem) {
      cartItem.qty += qty;
      await cartItem.save();
    } else {
      cartItem = new CartItem({ product: productId, qty });
      await cartItem.save();
    }

    res.json({ message: 'Item added to cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error adding to cart' });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const removed = await CartItem.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ message: 'Cart item not found' });
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error removing from cart' });
  }
};

export const checkout = async (req, res) => {
  const { cartItems, name, email } = req.body;

  if (!cartItems || !name || !email || !Array.isArray(cartItems)) {
    return res.status(400).json({ message: 'Missing checkout fields' });
  }

  try {
    let total = 0;
    for (const item of cartItems) {
      const productId = item.product?._id || item.productId;
      const product = await Product.findById(productId);
      if (product) total += product.price * item.qty;
    }

    await CartItem.deleteMany({});

    const receipt = {
      total,
      timestamp: new Date(),
      customer: { name, email }
    };

    res.json(receipt);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during checkout' });
  }
};
