import mongoose from "mongoose";
import dotenv from "dotenv";

import Job from "../models/Job.js";
import { trainModel } from "./trainModel.js";

dotenv.config();

// CONNECT DB
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Worker MongoDB Connected");
});

// PROCESS JOBS
const processJobs = async () => {
  try {
    // CHECK RUNNING JOBS
    const runningJobs = await Job.countDocuments({
      status: "running",
    });

    // MAX 2 RUNNING
    if (runningJobs >= 2) {
      return;
    }

    // GET QUEUED JOBS
    const jobs = await Job.find({
      status: "queued",
    }).limit(2 - runningJobs);

    for (const job of jobs) {
      try {
        // UPDATE STATUS
        job.status = "running";

        job.logs.push({
          message: "Training started",
        });

        await job.save();

        console.log(`Processing Job ${job._id}`);

        // TRAIN MODEL
        const response = await trainModel(job);

        // COMPLETE JOB
        job.status = "completed";

        job.summary = response.summary;

        job.results = response.results;

        job.logs.push({
          message: "Training completed",
        });

        await job.save();

        console.log(`Completed Job ${job._id}`);
      } catch (error) {
        job.status = "failed";

        job.logs.push({
          message: "Training failed",
        });

        await job.save();

        console.log(error.message);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

// RUN EVERY 5 SEC
setInterval(processJobs, 5000);
