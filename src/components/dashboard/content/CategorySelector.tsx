
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    "Travel", "Education", "Hotels", "Lifestyle", "Flight", "Tours and Adventure"
  ]);
  const [newCategory, setNewCategory] = useState("");
  const [showAddCategory, setShowAddCategory] = useState(false);

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      const updatedCategories = [...categories, newCategory.trim()];
      setCategories(updatedCategories);
      onSelectCategory(newCategory.trim());
      setNewCategory("");
      setShowAddCategory(false);
    }
  };

  return (
    <div className="space-y-2">
      <Select value={selectedCategory} onValueChange={onSelectCategory}>
        <SelectTrigger className="bg-white/10 border-white/20 text-white">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent className="bg-dark-primary border-white/20">
          {categories.map(category => (
            <SelectItem 
              key={category} 
              value={category}
              className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white"
            >
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {showAddCategory ? (
        <div className="flex gap-2">
          <Input
            placeholder="Enter new category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          />
          <Button 
            onClick={handleAddCategory} 
            size="sm"
            className="bg-neon-electric/20 border-neon-electric/50 text-neon-electric hover:bg-neon-electric/30"
          >
            Add
          </Button>
        </div>
      ) : (
        <Button 
          onClick={() => setShowAddCategory(true)} 
          variant="outline" 
          size="sm"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <Plus size={16} className="mr-1" /> Add Category
        </Button>
      )}
      
      <p className="text-xs text-gray-400 mt-1">
        Choose a category that best describes your content topic.
      </p>
    </div>
  );
};

export default CategorySelector;
