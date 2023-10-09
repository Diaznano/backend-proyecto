const { Product } = require("../models/Product");
const { validateProductFields } = require("../utils/productValidation");
const { GenericErrors, ProductErrors } = require("../utils/errorsMessage");

exports.createProduct = async (req, res) => {
  const { name, description, price, category, stock } = req.body;
  const image = req.file ? req.file.buffer : null;

  const validationErrors = validateProductFields(
    name,
    description,
    price,
    category,
    stock
  );
  if (validationErrors.length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }

  try {
    const newProduct = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      image,
    });

    newProduct.image = newProduct.image.toString("base64");

    res.json(newProduct);
  } catch (error) {
    console.error("Problema al crear el producto", error);
    res.status(500).json({ message: GenericErrors.ServerError });
  }
};

exports.updateProduct = async (req, res) => {
  const productId = req.params.id;
  const { name, description, price, category, stock } = req.body;
  const image = req.file ? req.file.buffer : null;

  const validationErrors = validateProductFields(
    name,
    description,
    price,
    category,
    stock
  );
  if (validationErrors.length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: ProductErrors.ProductNotFound });
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;
    product.stock = stock;
    product.image = image;

    await product.save();
    product.image = product.image.toString("base64");
    res.json(product);
  } catch (error) {
    console.error("Problema al actualizar el producto", error);
    res.status(500).json({ message: GenericErrors.ServerError });
  }
};

exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: ProductErrors.ProductNotFound });
    }

    await product.destroy();

    res.json({ message: "Producto eliminado exitosamente." });
  } catch (error) {
    console.error("Problema al eliminar el producto", error);
    res.status(500).json({ message: GenericErrors.ServerError });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
  
    const productsWithBase64Images = products.map((product) => {
      if (product.image) {
        product.image = product.image.toString("base64");
      }
      return product;
    });
  
    res.json(productsWithBase64Images);
  } catch (error) {
    console.error("Problema al obtener la lista de productos", error);
    res.status(500).json({ message: GenericErrors.ServerError });
  }
};
