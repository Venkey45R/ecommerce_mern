import Product from "../models/product.mosel.js";

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    if (!Array.isArray(user.cartItems)) user.cartItems = [];

    let existingProduct = user.cartItems
      .filter((item) => item) // remove null/undefined
      .find((item) => {
        // item could be {_id, quantity} or just an ID
        const id = item._id ? item._id : item.toString();
        return id === productId;
      });

    if (existingProduct) {
      // If item is an object, increment quantity
      if (existingProduct.quantity !== undefined) {
        existingProduct.quantity += 1;
      } else {
        // If item is just an ID, replace with object with quantity
        const index = user.cartItems.indexOf(existingProduct);
        user.cartItems[index] = { _id: existingProduct, quantity: 2 };
      }
    } else {
      // Push new product as object
      user.cartItems.push({ _id: productId, quantity: 1 });
    }

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.log("Error in addToCart controller:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const removeAllFromCart = async (req, res) => {
  try {
    const user = req.user;
    const productId = req.body?.productId; // handle safely

    if (!user) return res.status(401).json({ message: "Unauthorized" });

    if (!productId) {
      user.cartItems = []; // clear all
    } else {
      user.cartItems = user.cartItems.filter(
        (item) => item && item._id?.toString() !== productId
      );
    }

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.log("Error in removeAllFromCart controller:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { quantity } = req.body;
    const user = req.user;
    const product = user.cartItems.find((item) => item.id === productId);
    if (product) {
      if (quantity === 0) {
        user.cartItems = user.cartItems.filter((item) => item.id !== productId);
        await user.save();
        return res.json(user.cartItems);
      }
      product.quantity = quantity;
      await user.save();
      res.json(user.cartItems);
    } else {
      res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.log("Error in updateQuantity controller:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getCartProducts = async (req, res) => {
  try {
    // Defensive checks
    if (!req.user || !Array.isArray(req.user.cartItems)) {
      return res.status(400).json({ message: "User cart is invalid or empty" });
    }

    // Filter out invalid cart items
    const validCartItems = req.user.cartItems.filter(
      (item) => item && item._id
    );

    // If no valid items
    if (validCartItems.length === 0) {
      return res.json([]);
    }

    // Fetch the products
    const products = await Product.find({
      _id: { $in: validCartItems.map((i) => i._id) },
    });

    // Merge quantity info
    const cartItems = products.map((product) => {
      const matchedItem = validCartItems.find(
        (i) => i._id.toString() === product._id.toString()
      );
      return { ...product.toJSON(), quantity: matchedItem?.quantity || 1 };
    });

    res.json(cartItems);
  } catch (error) {
    console.error("Error in getCartProducts controller:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
