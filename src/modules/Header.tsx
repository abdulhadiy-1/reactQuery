import { Button } from "@/components/ui/button"
import { PlusOutlined } from "@ant-design/icons"
import { NavLink, useNavigate } from "react-router-dom"

const Header = () => {
    const navigate = useNavigate()
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gray-800 p-3 flex justify-between">
        <NavLink to={"/"} className="font-bold text-[23px] cursor-pointer text-blue-700">Products</NavLink>
        <Button onClick={() => navigate("/create")}  className="bg-blue-700 hover:bg-blue-600 duration-300 cursor-pointer"><PlusOutlined />Create</Button>
    </div>
  )
}

export default Header