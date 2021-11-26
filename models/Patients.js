const mongoose = require("mongoose");

const patientsSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["M", "F"],
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    diagnosis: {
      diagnosisDescription: {
        type: String,
        required: true,
      },
      diagnosisTime: {
        type: Date,
        required: true,
      },
      diagnosisImageUrl: [
        {
          type: String,
          required: true,
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patients", patientsSchema);
