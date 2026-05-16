import express from "express";
import Job from "../models/Job.js";

const router = express.Router();


// CREATE JOB
router.post("/", async (req, res) => {

  try {

    const { dataset, hyperparameters } = req.body

    let algorithm = ""

    if (dataset === "house-prices.csv") {
      algorithm = "Linear Regression"
    }

    else if (dataset === "titanic.csv") {
      algorithm = "Random Forest"
    }

    else if (dataset === "mall-customers.csv") {
      algorithm = "K-Means"
    }

    const job = await Job.create({
      dataset,
      algorithm,
      hyperparameters,
      status: "queued"
    })

    res.json(job)

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }

})

// GET ALL JOBS
router.get("/", async (req, res) => {

    try {

        const jobs = await Job.find().sort({ createdAt: -1 });

        res.json(jobs);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


router.get("/:id", async (req, res) => {

    try {

        const job = await Job.findById(req.params.id)

        res.json(job)

    } catch (error) {

        res.status(500).json({
            message: error.message
        })

    }

})

export default router;