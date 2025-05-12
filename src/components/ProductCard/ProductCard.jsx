import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import ProductDetails from "../ProductDetails/ProductDetails";

export default function ProductCard({ product }) {
  const {
    product_name,
    image_url,
    categories,
    ingredients_text,
    nutrition_grades,
  } = product;

  const navigate=useNavigate()
  const handleViewMore=()=>{
    navigate(`/productlist/${product.code}`)
  }

  return (
    <Card
      className="w-80 transition-transform duration-300 transform hover:scale-105 shadow-md rounded-2xl"
    >
      <CardHeader
        color="blue-gray"
        className="relative h-56 rounded-t-2xl overflow-hidden"
      >
        <img
          src={image_url || "https://via.placeholder.com/300x200?text=No+Image"}
          alt={product_name}
          className="object-cover w-full h-full"
        />
      </CardHeader>
      <CardBody className="p-4">
        <Typography variant="h6" color="blue-gray" className="mb-1">
          {product_name || "Unnamed Product"}
        </Typography>
        {categories && (
          <Typography className="text-sm text-gray-600 mb-1">
            <strong>Category:</strong> {categories}
          </Typography>
        )}
        {ingredients_text && (
          <Typography className="text-sm text-gray-600 mb-1">
            <strong>Ingredients:</strong> {ingredients_text}
          </Typography>
        )}
        {nutrition_grades && (
          <Typography className="text-sm text-gray-600 mb-1">
            <strong>Nutrition Grade:</strong> {nutrition_grades.toUpperCase()}
          </Typography>
        )}
      </CardBody>
      <CardFooter className="pt-0">
        <Button color="blue" fullWidth onClick={handleViewMore}>
          View More
        </Button>
      </CardFooter>
    </Card>
  );
}
