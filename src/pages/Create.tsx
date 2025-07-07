import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useGetOneProductsQuery,
  useUpdateProductMutation,
} from "@/store/ProductApi";
import type { ProductType } from "@/types/ProductType";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Create = () => {
  const { id } = useParams();

  const { data: product = {} } = useGetOneProductsQuery({ id });

  const navigate = useNavigate();
  const [image, setImage] = useState(
    "https://i.pinimg.com/736x/b1/27/87/b1278788d01279d81fef43e0a653f31c.jpg"
  );

  const [titleName, setTitleName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [brand, setBrand] = useState("");
  const [createdAt] = useState(Date.now().toString());
  const [updatedAt] = useState(Date.now().toString());

  useEffect(() => {
    if (product && product.title) {
      setTitleName(product.title);
      setDescription(product.description);
      setCategory(product.category);
      setPrice(product.price);
      setRating(product.rating);
      setBrand(product.brand);
      setImage(product.thumbnail);
    }
  }, [product]);

  const { data: products = [] } = useGetAllProductsQuery("");
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  }

  async function CreatePrd(e: React.FormEvent) {
    e.preventDefault();

    const data: ProductType = {
      id: product?.id || (products.length + 1).toString(),
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

    try {
      if (id) {
        await updateProduct({ id: data.id, body: data }).unwrap();
      } else {
        await createProduct({ body: data }).unwrap();
      }
      navigate(-1);
    } catch (error) {
      console.error("Ошибка при создании/обновлении продукта:", error);
    }
  }

  return (
    <form onSubmit={CreatePrd} className="mt-[100px] p-4 ">
      <Button
        className="fixed top-20 right-10 bg-blue-700 hover:opacity-80 hover:bg-blue-700"
        size={"lg"}
        type="submit"
      >
        {id ? "Update" : "Create"}
      </Button>
      <div className="flex justify-between">
        <div className="space-y-4 w-[48%]">
          <Label htmlFor="Title">Title</Label>
          <Input
            required
            id="Title"
            placeholder="Title"
            value={titleName}
            onChange={(e) => setTitleName(e.target.value)}
          />
          <Label htmlFor="Description">Description</Label>
          <Input
            required
            id="Description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Label htmlFor="Category">Category</Label>
          <Input
            required
            id="Category"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="space-y-4 w-[48%]">
          <Label htmlFor="Price">Price</Label>
          <Input
            required
            id="Price"
            placeholder="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <Label htmlFor="Rating">Rating</Label>
          <Input
            required
            id="Rating"
            placeholder="Rating"
            type="number"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          />
          <Label htmlFor="Brand">Brand</Label>
          <Input
            required
            id="Brand"
            placeholder="Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>
      </div>
      <div className="w-[300px] mx-auto mt-6">
        <label>
          <Input id="picture" onChange={handleImageChange} hidden type="file" />
          <div className="w-full h-[300px] border-dotted border-[3px] border-gray-700 flex items-center justify-center">
            <img
              className="w-full h-full object-cover"
              src={image}
              alt="Preview"
            />
          </div>
        </label>
      </div>
    </form>
  );
};

export default Create;
