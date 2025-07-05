import { useGetAllProductsQuery } from "@/store/ProductApi";
import NotFound from "./NotFound";
import type { ProductType } from "@/types/ProductType";
import {
  DeleteOutlined,
  EditOutlined,
  StarFilled,
  StarOutlined,
} from "@ant-design/icons";
import { Button } from "@/components/ui/button";

const Home = () => {
  const {
    data: products = [],
    isLoading,
    isError,
  } = useGetAllProductsQuery("");
  if (isError) return <NotFound />;
  if (isLoading) return <div>Loading...</div>;

  function stars(rating: number) {
    const fullStars = Math.floor(rating);
    const starsArray = [];

    for (let i = 0; i < fullStars; i++) {
      starsArray.push(
        <span key={`full-${i}`}>
          <StarFilled />
        </span>
      );
    }
    while (starsArray.length < 5) {
      starsArray.push(
        <span key={`empty-${starsArray.length}`}>
          <StarOutlined />
        </span>
      );
    }

    return <div className="text-yellow-500 text-sm">{starsArray}</div>;
  }

  return (
    <div className="flex flex-wrap justify-between bg-gray-200 h-[100vh] overflow-y-auto gap-5 p-5 pt-20">
      {products?.map((item: ProductType) => (
        <div
          key={item.id}
          className="w-[300px] rounded-md bg-white hover:scale-[1.01] hover:shadow-white hover:shadow-md duration-300"
        >
          <img src={item.thumbnail} alt="" />
          <div className="p-4 space-y-2">
            <div>
              <span className="text-[15px] text-gray-400">{item.brand}</span>
              <p className="font-bold text-lg line-clamp-1">{item.title}</p>
            </div>
            <p className="line-clamp-2">{item.description}</p>
            {stars(item.rating)}
            <div className="flex items-center gap-3 justify-end">
              <Button className="hover:scale-[1.02] bg-blue-700 hover:bg-blue-600 duration-300 cursor-pointer">
                More
              </Button>
              <Button
                className="hover:scale-[1.02] bg-yellow-600 hover:bg-yellow-500 duration-300 cursor-pointer"
                size={"icon"}
              >
                <EditOutlined />
              </Button>
              <Button
                className="hover:scale-[1.02] bg-red-700 hover:bg-red-600 duration-300 cursor-pointer"
                size={"icon"}
              >
                <DeleteOutlined />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
