import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetAllProductsQuery } from "@/store/ProductApi";
import type { ProductType } from "@/types/ProductType";
import { useState } from "react";

const Create = () => {
  const [image, setImage] = useState(
    "https://i.pinimg.com/736x/b1/27/87/b1278788d01279d81fef43e0a653f31c.jpg"
  );
  const [titleName, setTitleName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState(0)
  const [rating, setRaiting] = useState(0)
  const [brand, setBrand] = useState("")
  const [createdAt, setCreatedAt] = useState(Date.now().toString())
  const [updatedAt, setUpdatedAt] = useState(Date.now().toString())

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const {data: products = [],isLoading,isError,} = useGetAllProductsQuery("");
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }

    const data:ProductType = {
      id: products[products.length + 1],
      title: titleName,
      description,
      category,
      price,
      rating,
      brand,
      meta: {
        createdAt,
        updatedAt,
      },
      thumbnail: image,
    };
  }

  return (
    <div className="mt-[100px] p-4 ">
      <div className="flex justify-between">
        <div className="space-y-4 w-[48%]">
          <Label htmlFor="Title">Title</Label>
          <Input id="Title" placeholder="Title" />
          <Label htmlFor="Description">Description</Label>
          <Input id="Description" placeholder="Description" />
          <Label htmlFor="Category">Category</Label>
          <Input id="Category" placeholder="Category" />
        </div>
        <div className="space-y-4 w-[48%]">
          <Label htmlFor="Price">Price</Label>
          <Input id="Price" placeholder="Price" />
          <Label htmlFor="Rating">Rating</Label>
          <Input id="Rating" placeholder="Rating" />
          <Label htmlFor="Brand">Brand</Label>
          <Input id="Brand" placeholder="Brand" />
        </div>
      </div>
      <div className="w-[300px] mx-auto mt-6 ">
        <label>
          <Input id="picture" onChange={handleChange} hidden type="file" />
          <div className="w-full h-[300px] border-dotted border-[3px] border-gray-700 flex items-center justify-center">
            <img className="w-full h-full" src={image} alt="" />
          </div>
        </label>
      </div>
    </div>
  );
};

export default Create;
