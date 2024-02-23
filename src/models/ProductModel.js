const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
    },
    description: {
      type: String,
      required: true,
    },
    categories: {
      type: [],
      default: [],
    },
    brand: {
      type: String,
    },
    images: {
      type: [String],
    },
    price: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    discount: {
      type: Number,
      min: 0,
      max: 99,
      default: 0,
    },
    detail: {
      type: mongoose.Schema.Types.Mixed,
      // require,
      default: {
        rear_camera: "14",
        front_camera: "14",
        operating_system: "IOS",
        display_size: "6.1",
        power: "3279",
        memory: "12",
        ram: "4",
      },
    },
    // số lượng còn trong kho
    quantity: {
      type: Number,
      default: 0,
    },
    // số lượng đã bán
    sold: {
      type: Number,
      default: 0,
    },
    ratings: [
      {
        star: Number,
        comment: String,
        postedby: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    totalRating: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.virtual("realPrice").get(function () {
  return (this.price * (100 - this.discount)) / 100;
});

module.exports = mongoose.model("Product", productSchema);
