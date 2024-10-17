const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategoriaSchema = new Schema(
  {
    title: { type: "string", require: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

let Categoria =
  mongoose.models.categoria || mongoose.model("categoria", CategoriaSchema);

export default Categoria;
