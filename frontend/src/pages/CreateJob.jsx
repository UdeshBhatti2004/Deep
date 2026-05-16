import { useState } from "react"
import { Link } from "react-router-dom"
import { useCreateJobMutation } from "../features/jobsApi"
import Navbar from "../components/Navbar"

function CreateJob() {

    const [createJob] = useCreateJobMutation()

    const [dataset, setDataset] = useState("mall-customers.csv")

    const [hyperparameters, setHyperparameters] = useState({
        k: 5
    })

    const algorithmMap = {
        "mall-customers.csv": "K-Means",
        "house-prices.csv": "Linear Regression",
        "titanic.csv": "Random Forest"
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            const data = {
                dataset,
                hyperparameters
            }

            const res = await createJob(data)

            console.log(res)

            alert("Job Created")

        } catch (error) {

            console.log(error)
        }
    }

    return (

        <>
        <Navbar />

        <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#020617] text-white px-4 sm:px-6 py-6">


            <div className="flex justify-center items-center">

                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-xl bg-[#1e293b] border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
                >

                    {/* Header */}

                    <div className="mb-8">

                        <Link
                            to="/"
                            className="text-blue-400 hover:text-blue-300 transition-all duration-300"
                        >
                            ← Back to Dashboard
                        </Link>

                        <h1 className="text-3xl sm:text-4xl font-bold mt-4">
                            Create ML Job
                        </h1>

                        <p className="text-gray-400 mt-3">
                            Submit a machine learning training job to the processing queue
                        </p>

                    </div>

                    {/* Dataset */}

                    <div className="mb-6">

                        <label className="block mb-3 text-gray-300 font-medium">
                            Dataset
                        </label>

                        <select
                            value={dataset}
                            onChange={(e) => setDataset(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all duration-300"
                        >

                            <option value="mall-customers.csv">
                                mall-customers.csv
                            </option>

                            <option value="house-prices.csv">
                                house-prices.csv
                            </option>

                            <option value="titanic.csv">
                                titanic.csv
                            </option>

                        </select>

                    </div>

                    {/* Algorithm */}

                    <div className="mb-6">

                        <label className="block mb-3 text-gray-300 font-medium">
                            Algorithm
                        </label>

                        <input
                            type="text"
                            value={algorithmMap[dataset]}
                            disabled
                            className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3 text-gray-300"
                        />

                    </div>

                    {/* Hyperparameters */}

                    {
                        dataset === "mall-customers.csv" && (

                            <div className="mb-8">

                                <label className="block mb-3 text-gray-300 font-medium">
                                    K Value
                                </label>

                                <input
                                    type="number"
                                    value={hyperparameters.k}
                                    onChange={(e) =>
                                        setHyperparameters({
                                            k: Number(e.target.value)
                                        })
                                    }
                                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all duration-300"
                                />

                            </div>
                        )
                    }

                    {/* Info Card */}

                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 mb-8">

                        <p className="text-blue-400 font-semibold">
                            Real-Time Queue Processing
                        </p>

                        <p className="text-gray-400 mt-2 text-sm sm:text-base">
                            Your job will enter the processing queue and automatically update in the dashboard.
                        </p>

                    </div>

                    {/* Submit */}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-[1.02]"
                    >
                        Submit Job
                    </button>

                </form>

            </div>

        </div>

        </>
    )
}

export default CreateJob