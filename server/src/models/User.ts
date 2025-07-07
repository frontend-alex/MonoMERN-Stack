import mongoose, { Document, Schema, Types } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.subscription?.subscriptionId;
    delete ret.subscription?.customerId;
    return ret;
  },
});

const User = mongoose.model("User", userSchema);

export { User };
