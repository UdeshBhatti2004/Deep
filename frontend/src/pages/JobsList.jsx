import { Link } from "react-router-dom"
import { useGetJobsQuery } from "../features/jobsApi"

const JobsList = () => {

  const { data, isLoading } = useGetJobsQuery(undefined, {
    pollingInterval: 5000,
  })

  const jobs = data || []

  const queuedJobs = jobs.filter((job) => job.status === "queued").length

  const runningJobs = jobs.filter((job) => job.status === "running").length

  const completedJobs = jobs.filter((job) => job.status === "completed").length

  const queuedList = jobs.filter((job) => job.status === "queued")

  const getStatusColor = (status) => {

    if (status === "completed") {
      return "bg-green-500/20 text-green-400 border border-green-500/30"
    }

    if (status === "running") {
      return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 animate-pulse"
    }

    if (status === "queued") {
      return "bg-blue-500/20 text-blue-400 border border-blue-500/30"
    }

    return "bg-red-500/20 text-red-400 border border-red-500/30"
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#020617] flex items-center justify-center text-white text-3xl font-bold">
        Loading Dashboard...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#020617] text-white p-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

          <div>

            <h1 className="text-4xl md:text-5xl font-bold">
              DeepQuantica ML Platform
            </h1>

            <p className="text-gray-400 mt-3 text-lg">
              Real-time machine learning job monitoring dashboard
            </p>

            <div className="flex items-center gap-2 mt-4">

              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>

              <p className="text-green-400 text-sm font-semibold">
                Live Monitoring Active
              </p>

            </div>

          </div>

          <Link
            to="/create"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-4 rounded-2xl font-semibold transition duration-300 w-fit shadow-lg"
          >
            + Create New Job
          </Link>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6 shadow-lg">

            <p className="text-gray-400 text-lg">
              Queued Jobs
            </p>

            <h2 className="text-5xl font-bold mt-3 text-blue-400">
              {queuedJobs}
            </h2>

          </div>

          <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6 shadow-lg">

            <p className="text-gray-400 text-lg">
              Running Jobs
            </p>

            <h2 className="text-5xl font-bold mt-3 text-yellow-400">
              {runningJobs}
            </h2>

          </div>

          <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6 shadow-lg">

            <p className="text-gray-400 text-lg">
              Completed Jobs
            </p>

            <h2 className="text-5xl font-bold mt-3 text-green-400">
              {completedJobs}
            </h2>

          </div>

        </div>

        {/* Jobs Grid */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {
            jobs.map((job) => {

              const queuePosition =
                queuedList.findIndex((q) => q._id === job._id) + 1

              return (

                <div
                  key={job._id}
                  className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-blue-500/10 hover:scale-[1.02] transition duration-300 flex flex-col gap-6"
                >

                  {/* Top */}

                  <div className="flex items-start justify-between gap-4">

                    <div>

                      <h2 className="text-2xl font-bold break-all">
                        {job.dataset}
                      </h2>

                      <p className="text-gray-400 mt-2 text-lg">
                        {job.algorithm}
                      </p>

                    </div>

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${getStatusColor(job.status)}`}
                    >
                      {job.status}
                    </span>

                  </div>

                  {/* Info */}

                  <div className="space-y-3 text-sm text-gray-300">

                    <p className="break-all">
                      <span className="text-gray-500">
                        Job ID:
                      </span>{" "}
                      {job._id}
                    </p>

                    <p>
                      <span className="text-gray-500">
                        Created:
                      </span>{" "}
                      {new Date(job.createdAt).toLocaleString()}
                    </p>

                  </div>

                  {/* Queue UI */}

                  {
                    job.status === "queued" && (

                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">

                        <p className="text-blue-400 font-semibold text-lg">
                          Waiting in Batch Queue
                        </p>

                        <p className="text-gray-400 mt-2">
                          Queue Position: #{queuePosition}
                        </p>

                      </div>
                    )
                  }

                  {/* Running UI */}

                  {
                    job.status === "running" && (

                      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 animate-pulse">

                        <p className="text-yellow-400 font-semibold text-lg">
                          Training Model...
                        </p>

                        <p className="text-gray-400 mt-2">
                          Processing dataset and generating metrics
                        </p>

                      </div>
                    )
                  }

                  {/* Completed UI */}

                  {
                    job.status === "completed" && (

                      <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">

                        <p className="text-green-400 font-semibold text-lg">
                          Training Finished
                        </p>

                        <p className="text-gray-400 mt-2">
                          Results ready for visualization
                        </p>

                      </div>
                    )
                  }

                  {/* Button */}

                  <Link
                    to={`/jobs/${job._id}`}
                    className="bg-white text-black px-5 py-3 rounded-xl font-semibold hover:bg-gray-200 transition duration-300 text-center"
                  >
                    View Details
                  </Link>

                </div>
              )
            })
          }

        </div>

        {/* Empty State */}

        {
          jobs.length === 0 && (

            <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-12 text-center mt-10">

              <h2 className="text-3xl font-bold mb-3">
                No Jobs Yet
              </h2>

              <p className="text-gray-400 mb-6 text-lg">
                Create your first ML training job
              </p>

              <Link
                to="/create"
                className="bg-blue-600 hover:bg-blue-700 px-6 py-4 rounded-2xl font-semibold transition duration-300"
              >
                Create Job
              </Link>

            </div>
          )
        }

      </div>

    </div>
  )
}

export default JobsList