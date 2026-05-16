import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    dataset: {
      type: String,
      required: true
    },

    algorithm: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["queued", "running", "completed", "failed"],
      default: "queued"
    },

    hyperparameters: {
      type: Object,
      default: {}
    },

    logs: [
      {
        message: String,

        timestamp: {
          type: Date,
          default: Date.now
        }
      }
    ],

    results: {
      type: Object,
      default: {}
    },

     summary: {
      rows: Number,
      columns: [String],
      nulls: Number
   }

  },
  {
    timestamps: true
  }
);

const Job = mongoose.model("Job", JobSchema);

export default Job;