import { useState } from "react";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { foodItems, foodCategories } from "../data/dummyData";
import toast from "react-hot-toast";

export default function Canteen() {
  const [category, setCategory] = useState("All");

  const filteredFood = category === "All"
    ? foodItems
    : foodItems.filter((f) => f.category === category);

  const handleOrder = (item) => {
    if (!item.available) {
      toast.error("This item is currently unavailable");
      return;
    }
    toast.success(`Added ${item.name} to cart!`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Canteen</h1>
        <p className="text-gray-500 mt-1">Order food from campus canteen</p>
      </div>

      {/* Category Buttons */}
      <div className="flex flex-wrap gap-2">
        {foodCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              category === cat
                ? "bg-edubites-sky text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Food Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFood.map((item) => (
          <Card key={item.id} hover className="overflow-hidden">
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className={`w-full h-40 object-cover ${!item.available ? "opacity-60 grayscale" : ""}`}
              />
              <Badge
                variant={item.available ? "success" : "danger"}
                className="absolute top-2 right-2"
              >
                {item.available ? "Available" : "Unavailable"}
              </Badge>
            </div>
            <div className="p-5">
              <span className="text-xs text-gray-500">{item.category}</span>
              <h3 className="text-lg font-semibold text-gray-800 mt-1">{item.name}</h3>
              <p className="text-gray-600 text-sm mt-2 line-clamp-2">{item.description}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xl font-bold text-edubites-sky">₹{item.price}</span>
                <Button
                  size="sm"
                  onClick={() => handleOrder(item)}
                  disabled={!item.available}
                >
                  Order Now
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
