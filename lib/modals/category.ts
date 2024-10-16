import { Schema, model, models } from "mongoose";

const CategoriaSchema = new Schema(
  {
    title: { type: "string", require: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Category = models.Category || model("Categories", CategoriaSchema);

export default Category;
