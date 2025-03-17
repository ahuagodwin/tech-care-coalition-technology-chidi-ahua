
import { ISchool } from "../types/types";
import { Schema, Model, model } from "mongoose";

const schoolSchema = new Schema<ISchool>(
    {
        name: { type: String, required: true, unique: true },
        faculties: [
          {
            name: { type: String, required: true },
            departments: [
              {
                name: { type: String, required: true },
                courses: [{ name: { type: String, required: true } }],
              },
            ],
          },
        ],
      },
    { timestamps: true }
);

const School: Model<any> = model("School", schoolSchema);
export default School;

