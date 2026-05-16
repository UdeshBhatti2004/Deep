import { BrowserRouter, Routes, Route } from "react-router-dom"

import CreateJob from "./pages/CreateJob"
import JobsList from "./pages/JobsList"
import JobDetails from "./pages/JobDetails"

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<JobsList />} />

        <Route path="/create" element={<CreateJob />} />

        <Route path="/jobs/:id" element={<JobDetails />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App