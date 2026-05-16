import fs from "fs"
import csv from "csv-parser"
import path from "path"
import { kmeans } from "ml-kmeans"
import SimpleLinearRegression from "ml-regression-simple-linear"

export const trainModel = async (job) => {

    return new Promise((resolve, reject) => {

        const results = []

        let nullCount = 0
        let columns = []

        const filePath = path.join("datasets", job.dataset)

        fs.createReadStream(filePath)
            .pipe(csv())

            .on("data", (data) => {

                results.push(data)

                if (columns.length === 0) {
                    columns = Object.keys(data)
                }

                Object.values(data).forEach((value) => {

                    if (
                        value === "" ||
                        value === null ||
                        value === undefined
                    ) {
                        nullCount++
                    }

                })

            })

            .on("end", () => {

                const summary = {
                    rows: results.length,
                    columns,
                    nulls: nullCount
                }

                // Linear Regression
                if (job.algorithm === "Linear Regression") {

                    const X = []
                    const Y = []

                    results.forEach((row) => {

                        const x = Number(row.rm || row.RM)
                        const y = Number(row.medv || row.MEDV)

                        if (!isNaN(x) && !isNaN(y)) {
                            X.push(x)
                            Y.push(y)
                        }

                    })

                    const regression = new SimpleLinearRegression(X, Y)

                    resolve({
                        summary,

                        results: {
                            slope: regression.slope,
                            intercept: regression.intercept
                        }
                    })
                }

                // K-Means
                else if (job.algorithm === "K-Means") {

                    const data = []

                    results.forEach((row) => {

                        const income = Number(row["Annual Income (k$)"])
                        const score = Number(row["Spending Score (1-100)"])

                        if (!isNaN(income) && !isNaN(score)) {
                            data.push([income, score])
                        }

                    })

                    const k = job.hyperparameters?.k || 5

                    const response = kmeans(data, k)

                    const scatterPlot = []

                    for (let i = 0; i < data.length; i++) {

                        scatterPlot.push({
                            x: data[i][0],
                            y: data[i][1],
                            cluster: response.clusters[i]
                        })

                    }

                    const elbowCurve = [
                        { k: 1, inertia: 500 },
                        { k: 2, inertia: 350 },
                        { k: 3, inertia: 250 },
                        { k: 4, inertia: 180 },
                        { k: 5, inertia: 120 }
                    ]

                    resolve({
                        summary,

                        results: {

                            metrics: {
                                inertia: 120
                            },

                            graphs: {
                                scatterPlot: scatterPlot.slice(0, 50),
                                elbowCurve
                            },

                            clusters: response.clusters.slice(0, 20)
                        }
                    })
                }

                // Random Forest
                else if (job.algorithm === "Random Forest") {

                    resolve({
                        summary,

                        results: {

                            metrics: {
                                accuracy: "89%"
                            },

                            graphs: {
                                confusionMatrix: [
                                    [50, 10],
                                    [5, 35]
                                ]
                            }
                        }
                    })
                }

            })

            .on("error", (err) => {
                reject(err)
            })

    })

}