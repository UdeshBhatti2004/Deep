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

  console.log("Checking jobs...");

  try {

    // CHECK RUNNING JOBS
    const runningJobs = await Job.countDocuments({
      status: "running",
    });

    console.log("Running Jobs:", runningJobs);

    // MAX 2 RUNNING
    if (runningJobs >= 2) {
      console.log("Max running jobs reached");
      return;
    }

    // GET QUEUED JOBS
    const jobs = await Job.find({
      status: "queued",
    }).limit(2 - runningJobs);

    console.log("Queued Jobs:", jobs);

    for (const job of jobs) {

      console.log("Starting Processing");

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

        console.log("Train Model Response:", response);

         await new Promise((resolve) => setTimeout(resolve, 10000))
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

        console.log("INNER ERROR:");
        console.log(error);

      }

    }

  } catch (error) {

    console.log("OUTER ERROR:");
    console.log(error);

  }

};

processJobs();

setInterval(processJobs, 5000);