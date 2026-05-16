import { useParams, Link } from "react-router-dom"
import { useGetSingleJobQuery } from "../features/jobsApi"

import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  BarChart,
  Bar,
} from "recharts"

const JobDetails = () => {

  const { id } = useParams()

  const { data, isLoading } = useGetSingleJobQuery(id, {
    pollingInterval: 5000,
  })

  const job = data?.data || data

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#020617] flex items-center justify-center text-white text-3xl font-bold">
        Loading Job Details...
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#020617] flex items-center justify-center text-red-400 text-3xl font-bold">
        Job Not Found
      </div>
    )
  }

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#020617] text-white p-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

          <div>

            <Link
              to="/"
              className="text-blue-400 hover:text-blue-300 transition duration-300"
            >
              ← Back to Dashboard
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold mt-4 break-all">
              {job.dataset}
            </h1>

            <p className="text-gray-400 text-lg mt-3">
              {job.algorithm}
            </p>

          </div>

          <span
            className={`px-5 py-3 rounded-full text-lg font-semibold h-fit ${getStatusColor(job.status)}`}
          >
            {job.status}
          </span>

        </div>

        {/* Top Cards */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6 shadow-lg">

            <p className="text-gray-400 text-lg">
              Total Rows
            </p>

            <h2 className="text-5xl font-bold text-blue-400 mt-3">
              {job.summary?.rows || 0}
            </h2>

          </div>

          <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6 shadow-lg">

            <p className="text-gray-400 text-lg">
              Total Columns
            </p>

            <h2 className="text-5xl font-bold text-yellow-400 mt-3">
              {job.summary?.columns?.length || 0}
            </h2>

          </div>

          <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6 shadow-lg">

            <p className="text-gray-400 text-lg">
              Null Values
            </p>

            <h2 className="text-5xl font-bold text-green-400 mt-3">
              {job.summary?.nulls || 0}
            </h2>

          </div>

        </div>

        {/* Dataset Columns */}

        <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6 shadow-lg mb-10">

          <h2 className="text-2xl font-bold mb-6">
            Dataset Columns
          </h2>

          <div className="flex flex-wrap gap-3">

            {
              job.summary?.columns?.map((column, index) => (
                <div
                  key={index}
                  className="bg-slate-800 border border-slate-600 px-4 py-2 rounded-xl text-gray-300"
                >
                  {column}
                </div>
              ))
            }

          </div>

        </div>

        {/* Metrics */}

        <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6 shadow-lg mb-10">

          <h2 className="text-2xl font-bold mb-6">
            Model Metrics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {
              Object.entries(job.results?.metrics || {}).map(([key, value]) => (

                <div
                  key={key}
                  className="bg-slate-800 border border-slate-700 rounded-2xl p-6"
                >

                  <p className="text-gray-400 capitalize text-lg">
                    {key}
                  </p>

                  <h2 className="text-4xl font-bold mt-3 text-blue-400 break-all">
                    {value}
                  </h2>

                </div>
              ))
            }

            {
              job.results?.slope && (
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">

                  <p className="text-gray-400 text-lg">
                    Slope
                  </p>

                  <h2 className="text-4xl font-bold mt-3 text-yellow-400 break-all">
                    {job.results.slope.toFixed(2)}
                  </h2>

                </div>
              )
            }

            {
              job.results?.intercept && (
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">

                  <p className="text-gray-400 text-lg">
                    Intercept
                  </p>

                  <h2 className="text-4xl font-bold mt-3 text-green-400 break-all">
                    {job.results.intercept.toFixed(2)}
                  </h2>

                </div>
              )
            }

          </div>

        </div>

        {/* Charts */}

        {
          job.results?.graphs && (

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-10">

              {/* Scatter Plot */}

              {
                job.results.graphs.scatterPlot && (

                  <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6 shadow-lg">

                    <h2 className="text-2xl font-bold mb-6">
                      K-Means Scatter Plot
                    </h2>

                    <div className="h-[400px]">

                      <ResponsiveContainer width="100%" height="100%">

                        <ScatterChart>

                          <CartesianGrid strokeDasharray="3 3" />

                          <XAxis dataKey="x" />

                          <YAxis dataKey="y" />

                          <Tooltip />

                          <Scatter
                            data={job.results.graphs.scatterPlot}
                          />

                        </ScatterChart>

                      </ResponsiveContainer>

                    </div>

                  </div>
                )
              }

              {/* Elbow Curve */}

              {
                job.results.graphs.elbowCurve && (

                  <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6 shadow-lg">

                    <h2 className="text-2xl font-bold mb-6">
                      Elbow Curve
                    </h2>

                    <div className="h-[400px]">

                      <ResponsiveContainer width="100%" height="100%">

                        <LineChart
                          data={job.results.graphs.elbowCurve}
                        >

                          <CartesianGrid strokeDasharray="3 3" />

                          <XAxis dataKey="k" />

                          <YAxis />

                          <Tooltip />

                          <Line
                            type="monotone"
                            dataKey="inertia"
                          />

                        </LineChart>

                      </ResponsiveContainer>

                    </div>

                  </div>
                )
              }

              {/* Confusion Matrix */}

              {
                job.results.graphs.confusionMatrix && (

                  <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6 shadow-lg xl:col-span-2">

                    <h2 className="text-2xl font-bold mb-6">
                      Confusion Matrix
                    </h2>

                    <div className="h-[400px]">

                      <ResponsiveContainer width="100%" height="100%">

                        <BarChart
                          data={[
                            {
                              name: "True Positive",
                              value: job.results.graphs.confusionMatrix[0][0],
                            },
                            {
                              name: "False Positive",
                              value: job.results.graphs.confusionMatrix[0][1],
                            },
                            {
                              name: "False Negative",
                              value: job.results.graphs.confusionMatrix[1][0],
                            },
                            {
                              name: "True Negative",
                              value: job.results.graphs.confusionMatrix[1][1],
                            },
                          ]}
                        >

                          <CartesianGrid strokeDasharray="3 3" />

                          <XAxis dataKey="name" />

                          <YAxis />

                          <Tooltip />

                          <Bar
  dataKey="value"
  fill="#3b82f6"
  radius={[10, 10, 0, 0]}
/>

                        </BarChart>

                      </ResponsiveContainer>

                    </div>

                  </div>
                )
              }

            </div>
          )
        }

        {/* Logs */}

        <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6 shadow-lg">

          <h2 className="text-2xl font-bold mb-6">
            Processing Logs
          </h2>

          <div className="space-y-4">

            {
              job.logs?.length > 0 ? (

                job.logs.map((log, index) => (

                  <div
                    key={index}
                    className="bg-slate-800 border border-slate-700 rounded-xl p-4"
                  >

                    <p className="text-gray-300">
                      {log.message}
                    </p>

                  </div>
                ))
              ) : (

                <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">

                  <p className="text-gray-400">
                    No logs available
                  </p>

                </div>
              )
            }

          </div>

        </div>

      </div>

    </div>
  )
}

export default JobDetails