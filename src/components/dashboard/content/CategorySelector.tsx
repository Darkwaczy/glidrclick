
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Plus } from "lucide-react";

interface CategorySelectorProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  const [categories, setCategories] = useState([
    "Marketing", 
    "Social Media", 
    "Technology", 
    "Business", 
    "Lifestyle",
    "Health & Wellness"
  ]);
  const [newCategory, setNewCategory] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      toast.error("Please enter a category name");
      return;
    }
    
    if (categories.includes(newCategory.trim())) {
      toast.error("Category already exists");
      return;
    }
    
    setCategories([...categories, newCategory.trim()]);
    onSelectCategory(newCategory.trim());
    setNewCategory("");
    setShowAddForm(false);
    toast.success("New category added successfully!");
  };

  return (
    <div className="space-y-3">
      <Label>Select Category</Label>
      {showAddForm ? (
        <div className="space-y-2">
          <Input
            placeholder="Enter new category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <div className="flex gap-2">
            <Button 
              type="button" 
              variant="default" 
              size="sm" 
              onClick={handleAddCategory}
            >
              Add
            </Button>
            <Button 
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button 
          type="button"
          variant="outline" 
          className="w-full flex justify-center items-center gap-2 mb-2"
          onClick={() => setShowAddForm(true)}
        >
          <Plus size={16} /> Add New Category
        </Button>
      )}
      
      <RadioGroup 
        value={selectedCategory} 
        onValueChange={onSelectCategory}
        className="max-h-[200px] overflow-y-auto space-y-2"
      >
        {categories.map(category => (
          <div key={category} className="flex items-center space-x-2 border rounded-md p-2 hover:bg-gray-50">
            <RadioGroupItem value={category} id={category} />
            <Label htmlFor={category} className="flex-1 cursor-pointer">
              {category}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default CategorySelector;
