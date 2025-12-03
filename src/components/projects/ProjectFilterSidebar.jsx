import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ReloadIcon, Cross2Icon } from "@radix-ui/react-icons";
import { locations } from "@/data/mockProjects";
import { servicesData } from "@/data/servicesData";

export default function ProjectFilterSidebar({
  filters,
  onFilterChange,
  minBudget = 0,
  maxBudget = 50000,
}) {
  // Local state for sliders to avoid excessive re-renders on parent
  const [budgetRange, setBudgetRange] = useState(filters.budget);

  // Sync local state when props change (e.g. reset)
  useEffect(() => {
    setBudgetRange(filters.budget);
  }, [filters.budget]);

  const handleCategoryChange = (category) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handleBudgetChange = (value) => {
    setBudgetRange(value);
  };

  const handleBudgetCommit = (value) => {
    onFilterChange({ ...filters, budget: value });
  };

  const handleDurationChange = (value) => {
    onFilterChange({ ...filters, duration: value });
  };

  const handleLocationChange = (value) => {
    onFilterChange({ ...filters, location: value === "all" ? "" : value });
  };

  const clearAllFilters = () => {
    onFilterChange({
      categories: [],
      budget: [minBudget, maxBudget],
      duration: "all",
      location: "",
    });
  };

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.budget[0] > minBudget ||
    filters.budget[1] < maxBudget ||
    filters.duration !== "all" ||
    filters.location !== "";

  // Extract categories from servicesData and add "Other"
  const allCategories = [...servicesData.map((s) => s.title), "أخرى"];

  const durationOptions = [
    { value: "week_1", label: "أقل من أسبوع واحد" },
    { value: "week_1_2", label: "من 1 إلى 2 أسابيع" },
    { value: "month_1", label: "من 2 أسابيع إلى شهر" },
    { value: "month_1_3", label: "من شهر إلى 3 أشهر" },
    { value: "month_3_plus", label: "أكثر من 3 أشهر" },
  ];

  return (
    <div className="w-full lg:w-[350px] shrink-0  bg-card p-6 pb-8 space-y-8 rounded-md border-0 shadow-sm h-fit">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg text-foreground">تصفية المشاريع</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAllFilters}
          className="text-muted-foreground hover:text-foreground h-8 px-2 text-xs gap-1"
        >
          <ReloadIcon className="w-3 h-3" />
          إعادة التعيين
        </Button>
      </div>

      {/* Active Filters Chips (Moved to Top) */}
      {hasActiveFilters && (
        <div className="animate-in fade-in slide-in-from-top-2">
          <Separator className="mb-4" />
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {filters.categories.map((cat) => (
                <Badge
                  key={cat}
                  variant="secondary"
                  className="gap-1 px-2 py-1 text-xs font-normal"
                >
                  {cat}
                  <button
                    onClick={() => handleCategoryChange(cat)}
                    className="hover:text-red-500 transition-colors"
                  >
                    <Cross2Icon className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
              {(budgetRange[0] > minBudget || budgetRange[1] < maxBudget) && (
                <Badge
                  variant="secondary"
                  className="gap-1 px-2 py-1 text-xs font-normal"
                >
                  ميزانية: {budgetRange[0]} - {budgetRange[1]}
                  <button
                    onClick={() =>
                      onFilterChange({
                        ...filters,
                        budget: [minBudget, maxBudget],
                      })
                    }
                    className="hover:text-red-500 transition-colors"
                  >
                    <Cross2Icon className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {filters.duration !== "all" && (
                <Badge
                  variant="secondary"
                  className="gap-1 px-2 py-1 text-xs font-normal"
                >
                  المدة:{" "}
                  {durationOptions.find((o) => o.value === filters.duration)
                    ?.label || filters.duration}
                  <button
                    onClick={() =>
                      onFilterChange({ ...filters, duration: "all" })
                    }
                    className="hover:text-red-500 transition-colors"
                  >
                    <Cross2Icon className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {filters.location && (
                <Badge
                  variant="secondary"
                  className="gap-1 px-2 py-1 text-xs font-normal"
                >
                  {filters.location}
                  <button
                    onClick={() => onFilterChange({ ...filters, location: "" })}
                    className="hover:text-red-500 transition-colors"
                  >
                    <Cross2Icon className="w-3 h-3" />
                  </button>
                </Badge>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Location (Moved to Top) */}
      <div className="space-y-4">
        <h4 className="font-semibold text-sm text-foreground">الموقع (مصر)</h4>
        <Select
          value={filters.location || "all"}
          onValueChange={handleLocationChange}
          dir="rtl"
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="اختر المحافظة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">كل المحافظات</SelectItem>
            {locations.map((loc) => (
              <SelectItem key={loc} value={loc}>
                {loc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Categories (No Scroll, Fixed RTL) */}
      <div className="space-y-4">
        <h4 className="font-semibold text-sm text-foreground">الفئات</h4>
        <div className="space-y-3">
          {allCategories.map((category) => (
            <div key={category} className="flex items-center gap-2">
              <Checkbox
                id={`cat-${category}`}
                checked={filters.categories.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <label
                htmlFor={`cat-${category}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-muted-foreground"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-sm text-foreground">
            الميزانية (جنيه)
          </h4>
        </div>
        <div className="pt-2 px-1">
          <Slider
            value={budgetRange}
            min={minBudget}
            max={maxBudget}
            step={500}
            onValueChange={handleBudgetChange}
            onValueCommit={handleBudgetCommit}
            dir="rtl"
            className="my-4"
          />
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="bg-muted px-2 py-1 rounded">من: {budgetRange[0]}</div>
          <div className="bg-muted px-2 py-1 rounded">
            إلى: {budgetRange[1]}
          </div>
        </div>
      </div>

      {/* Duration (Ranges, Fixed RTL) */}
      <div className="space-y-4">
        <h4 className="font-semibold text-sm text-foreground">مدة التنفيذ</h4>
        <RadioGroup
          value={filters.duration}
          onValueChange={handleDurationChange}
          className="space-y-2"
          dir="rtl"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="all" id="duration-all" />
            <Label
              htmlFor="duration-all"
              className="cursor-pointer text-muted-foreground"
            >
              الكل
            </Label>
          </div>
          {durationOptions.map((option) => (
            <div key={option.value} className="flex items-center gap-2">
              <RadioGroupItem
                value={option.value}
                id={`duration-${option.value}`}
              />
              <Label
                htmlFor={`duration-${option.value}`}
                className="cursor-pointer text-muted-foreground"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
