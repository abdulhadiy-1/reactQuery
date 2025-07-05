import Create from "@/pages/Create"
import Home from "@/pages/Home"
import { Route, Routes } from "react-router-dom"

const PageRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/create" element={<Create />}/>
    </Routes>
  )
}

export default PageRoutes