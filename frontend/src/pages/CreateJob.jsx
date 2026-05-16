import { useState } from "react"
import { useCreateJobMutation } from "../features/jobsApi"

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
        <div className="min-h-screen flex justify-center items-center bg-gray-100">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-[400px]"
            >

                <h1 className="text-2xl font-bold mb-6">
                    Create ML Job
                </h1>

                <div className="mb-4">

                    <label className="block mb-2">
                        Dataset
                    </label>

                    <select
                        value={dataset}
                        onChange={(e) => setDataset(e.target.value)}
                        className="w-full border p-2 rounded"
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

                <div className="mb-4">

                    <label className="block mb-2">
                        Algorithm
                    </label>

                    <input
                        type="text"
                        value={algorithmMap[dataset]}
                        disabled
                        className="w-full border p-2 rounded bg-gray-100"
                    />

                </div>

                {
                    dataset === "mall-customers.csv" && (

                        <div className="mb-4">

                            <label className="block mb-2">
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
                                className="w-full border p-2 rounded"
                            />

                        </div>
                    )
                }

                <button
                    type="submit"
                    className="bg-black text-white w-full py-2 rounded"
                >
                    Submit Job
                </button>

            </form>

        </div>
    )
}

export default CreateJob