const mongoose = require("mongoose");
const Produkt = require("./models/produkt");
const User = require("./models/user");
require("dotenv").config();
const products = [
  {
    name: "Comfy Sofa",
    price: 500,
    description: "A comfortable sofa for your living room.",
    val: 3,
    measurements: "80 40 ",
    category: "Living Room",
    image: "",
  },
  {
    name: "Modern Coffee Table",
    price: 150,
    description: "A modern coffee table to complement your living room decor.",
    val: 2,
    measurements: "40 inches (Width) x 20 inches (Height)",
    category: "Living Room",
    image: "",
  },
  {
    name: "Stylish Armchair",
    price: 300,
    description: "A stylish armchair for relaxation in your living room.",
    val: 4,
    measurements: "30 inches (Width) x 35 inches (Height)",
    category: "Living Room",
    image: "",
  },
  {
    name: "Entertainment Center",
    price: 700,
    description: "An entertainment center for your TV and media equipment.",
    val: 5,
    measurements: "60 inches (Width) x 50 inches (Height)",
    category: "Living Room",
    image: "",
  },
  {
    name: "Decorative Floor Lamp",
    price: 80,
    description: "A decorative floor lamp to add ambiance to your living room.",
    val: 2,
    measurements: "65 inches (Height)",
    category: "Living Room",
    image: "",
  },
  {
    name: "Queen Size Bed",
    price: 800,
    description: "An elegant queen-sized bed for your bedroom.",
    val: 4,
    measurements: "60 inches (Width) x 80 inches (Height)",
    category: "Bedroom",
    image: "",
  },
  {
    name: "Nightstand with Drawer",
    price: 100,
    description:
      "A compact nightstand with drawer for your bedroom essentials.",
    val: 1,
    measurements: "Standard",
    category: "Bedroom",
    image: "",
  },
  {
    name: "Dresser with Mirror",
    price: 600,
    description: "A dresser with a mirror for storing your clothes in style.",
    val: 3,
    measurements: "Standard",
    category: "Bedroom",
    image: "",
  },
  {
    name: "Cozy Blanket",
    price: 50,
    description: "A cozy blanket to keep you warm during chilly nights.",
    val: 2,
    measurements: "Standard",
    category: "Bedroom",
    image: "",
  },
  {
    name: "Bedside Table Lamp",
    price: 30,
    description: "A bedside table lamp for reading at night.",
    val: 1,
    measurements: "Standard",
    category: "Bedroom",
    image: "",
  },
  {
    name: "Stainless Steel Fridge",
    price: 1200,
    description: "A spacious stainless steel fridge for your kitchen.",
    val: 5,
    measurements: "Standard",
    category: "Kitchen",
    image: "",
  },
  {
    name: "Electric Kettle",
    price: 30,
    description: "An electric kettle for your kitchen to boil water quickly.",
    val: 1,
    measurements: "Standard",
    category: "Kitchen",
    image: "",
  },
  {
    name: "Non-Stick Cookware Set",
    price: 100,
    description: "A set of non-stick cookware for all your cooking needs.",
    val: 3,
    measurements: "Standard",
    category: "Kitchen",
    image: "",
  },
  {
    name: "Microwave Oven",
    price: 150,
    description: "A microwave oven for convenient heating and cooking.",
    val: 2,
    measurements: "Standard",
    category: "Kitchen",
    image: "",
  },
  {
    name: "Kitchen Knife Set",
    price: 50,
    description: "A set of sharp kitchen knives for precision cutting.",
    val: 2,
    measurements: "Standard",
    category: "Kitchen",
    image: "",
  },
  {
    name: "Modern Vanity Mirror",
    price: 100,
    description: "A modern vanity mirror for your bathroom.",
    val: 3,
    measurements: "Standard",
    category: "Bathroom",
    image: "",
  },
  {
    name: "Shower Curtain Set",
    price: 20,
    description: "A stylish shower curtain set to enhance your bathroom decor.",
    val: 1,
    measurements: "Standard",
    category: "Bathroom",
    image: "",
  },
  {
    name: "Towel Rack Stand",
    price: 50,
    description:
      "A sturdy towel rack stand for organizing your towels in the bathroom.",
    val: 2,
    measurements: "Standard",
    category: "Bathroom",
    image: "",
  },
  {
    name: "Bathroom Wall Shelf",
    price: 30,
    description: "A practical wall shelf for storing bathroom essentials.",
    val: 1,
    measurements: "Standard",
    category: "Bathroom",
    image: "",
  },
  {
    name: "Soft Bath Mat",
    price: 15,
    description: "A soft and absorbent bath mat to keep your feet comfortable.",
    val: 1,
    measurements: "Standard",
    category: "Bathroom",
    image: "",
  },
  {
    name: "Dining Table with Chairs Set",
    price: 800,
    description: "A dining table set with chairs for your dining room.",
    val: 4,
    measurements: "60 inches (Width) x Standard (Height)",
    category: "Dining",
    image: "",
  },
  {
    name: "Upholstered Dining Chairs (Set of 4)",
    price: 300,
    description:
      "Set of four upholstered dining chairs for comfortable seating.",
    val: 3,
    measurements: "Standard",
    category: "Dining",
    image: "",
  },
  {
    name: "Patio Lounge Chair",
    price: 150,
    description: "A comfortable lounge chair for your outdoor patio.",
    val: 3,
    measurements: "Standard",
    category: "Outdoor",
    image: "",
  },
  {
    name: "Outdoor Dining Table with Umbrella",
    price: 600,
    description:
      "An outdoor dining table set with umbrella for alfresco dining.",
    val: 4,
    measurements: "70 inches (Width) x Standard (Height)",
    category: "Outdoor",
    image: "",
  },
  {
    name: "Garden Bench",
    price: 200,
    description: "A sturdy garden bench for relaxation in your outdoor space.",
    val: 3,
    measurements: "Standard",
    category: "Outdoor",
    image: "",
  },
  {
    name: "Outdoor Cushion Set",
    price: 50,
    description:
      "A set of outdoor cushions to add comfort to your outdoor furniture.",
    val: 2,
    measurements: "Standard",
    category: "Outdoor",
    image: "",
  },
  {
    name: "Solar-Powered Outdoor Lights (Set of 6)",
    price: 80,
    description:
      "Set of six solar-powered outdoor lights to illuminate your garden or patio.",
    val: 2,
    measurements: "Standard",
    category: "Outdoor",
    image: "",
  },
  {
    name: "Comfy Sofa",
    price: 500,
    description: "A comfortable sofa for your living room.",
    val: 3,
    measurements: "80 40 ",
    category: "Living Room",
    image: "",
  },
  {
    name: "Modern Coffee Table",
    price: 150,
    description: "A modern coffee table to complement your living room decor.",
    val: 2,
    measurements: "40 inches (Width) x 20 inches (Height)",
    category: "Living Room",
    image: "",
  },
  {
    name: "Stylish Armchair",
    price: 300,
    description: "A stylish armchair for relaxation in your living room.",
    val: 4,
    measurements: "30 inches (Width) x 35 inches (Height)",
    category: "Living Room",
    image: "",
  },
  {
    name: "Entertainment Center",
    price: 700,
    description: "An entertainment center for your TV and media equipment.",
    val: 5,
    measurements: "60 inches (Width) x 50 inches (Height)",
    category: "Living Room",
    image: "",
  },
  {
    name: "Decorative Floor Lamp",
    price: 80,
    description: "A decorative floor lamp to add ambiance to your living room.",
    val: 2,
    measurements: "65 inches (Height)",
    category: "Living Room",
    image: "",
  },
  {
    name: "Queen Size Bed",
    price: 800,
    description: "An elegant queen-sized bed for your bedroom.",
    val: 4,
    measurements: "60 inches (Width) x 80 inches (Height)",
    category: "Bedroom",
    image: "",
  },
  {
    name: "Nightstand with Drawer",
    price: 100,
    description:
      "A compact nightstand with drawer for your bedroom essentials.",
    val: 1,
    measurements: "Standard",
    category: "Bedroom",
    image: "",
  },
  {
    name: "Dresser with Mirror",
    price: 600,
    description: "A dresser with a mirror for storing your clothes in style.",
    val: 3,
    measurements: "Standard",
    category: "Bedroom",
    image: "",
  },
  {
    name: "Cozy Blanket",
    price: 50,
    description: "A cozy blanket to keep you warm during chilly nights.",
    val: 2,
    measurements: "Standard",
    category: "Bedroom",
    image: "",
  },
  {
    name: "Bedside Table Lamp",
    price: 30,
    description: "A bedside table lamp for reading at night.",
    val: 1,
    measurements: "Standard",
    category: "Bedroom",
    image: "",
  },
  {
    name: "Stainless Steel Fridge",
    price: 1200,
    description: "A spacious stainless steel fridge for your kitchen.",
    val: 5,
    measurements: "Standard",
    category: "Kitchen",
    image: "",
  },
  {
    name: "Electric Kettle",
    price: 30,
    description: "An electric kettle for your kitchen to boil water quickly.",
    val: 1,
    measurements: "Standard",
    category: "Kitchen",
    image: "",
  },
  {
    name: "Non-Stick Cookware Set",
    price: 100,
    description: "A set of non-stick cookware for all your cooking needs.",
    val: 3,
    measurements: "Standard",
    category: "Kitchen",
    image: "",
  },
  {
    name: "Microwave Oven",
    price: 150,
    description: "A microwave oven for convenient heating and cooking.",
    val: 2,
    measurements: "Standard",
    category: "Kitchen",
    image: "",
  },
  {
    name: "Kitchen Knife Set",
    price: 50,
    description: "A set of sharp kitchen knives for precision cutting.",
    val: 2,
    measurements: "Standard",
    category: "Kitchen",
    image: "",
  },
  {
    name: "Modern Vanity Mirror",
    price: 100,
    description: "A modern vanity mirror for your bathroom.",
    val: 3,
    measurements: "Standard",
    category: "Bathroom",
    image: "",
  },
  {
    name: "Shower Curtain Set",
    price: 20,
    description: "A stylish shower curtain set to enhance your bathroom decor.",
    val: 1,
    measurements: "Standard",
    category: "Bathroom",
    image: "",
  },
  {
    name: "Towel Rack Stand",
    price: 50,
    description:
      "A sturdy towel rack stand for organizing your towels in the bathroom.",
    val: 2,
    measurements: "Standard",
    category: "Bathroom",
    image: "",
  },
  {
    name: "Bathroom Wall Shelf",
    price: 30,
    description: "A practical wall shelf for storing bathroom essentials.",
    val: 1,
    measurements: "Standard",
    category: "Bathroom",
    image: "",
  },
  {
    name: "Soft Bath Mat",
    price: 15,
    description: "A soft and absorbent bath mat to keep your feet comfortable.",
    val: 1,
    measurements: "Standard",
    category: "Bathroom",
    image: "",
  },
  {
    name: "Dining Table with Chairs Set",
    price: 800,
    description: "A dining table set with chairs for your dining room.",
    val: 4,
    measurements: "60 inches (Width) x Standard (Height)",
    category: "Dining",
    image: "",
  },
  {
    name: "Upholstered Dining Chairs (Set of 4)",
    price: 300,
    description:
      "Set of four upholstered dining chairs for comfortable seating.",
    val: 3,
    measurements: "Standard",
    category: "Dining",
    image: "",
  },
  {
    name: "Patio Lounge Chair",
    price: 150,
    description: "A comfortable lounge chair for your outdoor patio.",
    val: 3,
    measurements: "Standard",
    category: "Outdoor",
    image: "",
  },
  {
    name: "Outdoor Dining Table with Umbrella",
    price: 600,
    description:
      "An outdoor dining table set with umbrella for alfresco dining.",
    val: 4,
    measurements: "70 inches (Width) x Standard (Height)",
    category: "Outdoor",
    image: "",
  },
  {
    name: "Garden Bench",
    price: 200,
    description: "A sturdy garden bench for relaxation in your outdoor space.",
    val: 3,
    measurements: "Standard",
    category: "Outdoor",
    image: "",
  },
  {
    name: "Outdoor Cushion Set",
    price: 50,
    description:
      "A set of outdoor cushions to add comfort to your outdoor furniture.",
    val: 2,
    measurements: "Standard",
    category: "Outdoor",
    image: "",
  },
  {
    name: "Solar-Powered Outdoor Lights (Set of 6)",
    price: 80,
    description:
      "Set of six solar-powered outdoor lights to illuminate your garden or patio.",
    val: 2,
    measurements: "Standard",
    category: "Outdoor",
    image: "",
  },
];

const { MongoClient, ServerApiVersion } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

const axios = require("axios");

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

const seedDB = async () => {
  await connectDB();
  try {
    for (const product of products) {
      // Generate a new product document
      let newProduct = new Produkt({
        name: product.name,
        price: product.price,
        description: product.description,
        val: product.val,
        measurements: product.measurements,
        category: product.category,
        author: process.env.ADMIN,
      });

      try {
        const response = await axios.get(
          `https://source.unsplash.com/random?${product.name}`
        );
        newProduct.image = response.request.res.responseUrl;
      } catch (error) {
        console.error("Error fetching image:", error);
        newProduct.image = "https://source.unsplash.com/random?interior"; // Provide a default image URL in case of an error
      }

      await newProduct.save(); // Save the product document
    }
    console.log("Database seeding complete");
  } catch (err) {
    console.error("Error during seeding:", err);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  }
};

seedDB();
