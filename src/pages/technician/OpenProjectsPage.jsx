import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  CalendarIcon,
  ClockIcon,
  SewingPinIcon,
  PersonIcon,
  StarFilledIcon,
  ExternalLinkIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProjectFilterSidebar from "@/components/projects/ProjectFilterSidebar";
import ProjectCard from "@/components/projects/ProjectCard";
import { mockProjects } from "@/data/mockProjects";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronLeftIcon } from "@radix-ui/react-icons";

export default function OpenProjectsPage() {
  // --- State ---
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Calculate min/max budget from projects
  const minBudget = Math.min(...mockProjects.map((p) => p.budget));
  const maxBudget = Math.max(...mockProjects.map((p) => p.budget));

  const [filters, setFilters] = useState({
    categories: [],
    budget: [minBudget, maxBudget],
    duration: "all",
    location: "القاهرة", // Default location
  });

  // --- Filtering & Sorting Logic ---
  const filteredProjects = useMemo(() => {
    let result = [...mockProjects];

    // 1. Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // 2. Filters
    // Categories
    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }

    // Budget
    result = result.filter(
      (p) => p.budget >= filters.budget[0] && p.budget <= filters.budget[1]
    );

    // Duration
    if (filters.duration !== "all") {
      switch (filters.duration) {
        case "week_1":
          result = result.filter((p) => p.duration < 7);
          break;
        case "week_1_2":
          result = result.filter((p) => p.duration >= 7 && p.duration <= 14);
          break;
        case "month_1":
          result = result.filter((p) => p.duration > 14 && p.duration <= 30);
          break;
        case "month_1_3":
          result = result.filter((p) => p.duration > 30 && p.duration <= 90);
          break;
        case "month_3_plus":
          result = result.filter((p) => p.duration > 90);
          break;
        default:
          break;
      }
    }

    // Location
    if (filters.location) {
      result = result.filter((p) => p.location === filters.location);
    }

    // 3. Sorting
    switch (sortBy) {
      case "newest":
        result.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.postedDate) - new Date(b.postedDate));
        break;
      case "highest_budget":
        result.sort((a, b) => b.budget - a.budget);
        break;
      case "lowest_bids":
        result.sort((a, b) => a.bidsCount - b.bidsCount);
        break;
      // "matching" would require complex logic matching user skills, skipping for now or mocking
      case "matching":
        // Mock: just shuffle or keep as is for now
        break;
      default:
        break;
    }

    return result;
  }, [searchQuery, sortBy, filters]);

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy, filters]);

  // --- Handlers ---
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background pb-20" dir="rtl">
      {/* --- Hero Header Section (Matched with Portfolio) --- */}
      <div className="relative bg-primary overflow-hidden">
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full mix-blend-overlay blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        </div>

        <div className="container max-w-7xl mx-auto px-4 py-12 md:py-16 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-right">
            <div className="space-y-4 text-primary-foreground">
              <Breadcrumb>
                <BreadcrumbList className="text-primary-foreground/80 sm:gap-1">
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      asChild
                      className="text-primary-foreground/80 hover:text-white"
                    >
                      <Link to="/">الرئيسية</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="text-primary-foreground/60">
                    <ChevronLeftIcon />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-white/80 font-semibold">
                      المشاريع المفتوحة
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                المشاريع المفتوحة
              </h1>
              <p className="text-xl md:text-2xl font-medium text-primary-foreground/60 max-w-2xl">
                تصفح أحدث المشاريع المتاحة وقدم عروضك الآن
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Right Sidebar (Filters) */}
          <ProjectFilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            minBudget={minBudget}
            maxBudget={maxBudget}
          />

          {/* Left Content Area */}
          <div className="flex-1 space-y-6">
            {/* Search & Sort Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative w-full md:flex-1">
                <MagnifyingGlassIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="ابحث عن المشروع..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10 h-12! text-base bg-card border-border focus-visible:ring-primary/20 rounded-md shadow-none!"
                />
              </div>

              {/* Sort */}
              <div className="w-full  md:w-[200px] shrink-0 ">
                <Select value={sortBy} onValueChange={setSortBy} dir="rtl">
                  <SelectTrigger className="h-12! w-full bg-card border-border rounded-md shadow-none!">
                    <SelectValue placeholder="ترتيب حسب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">الأحدث (الافتراضي)</SelectItem>
                    <SelectItem value="oldest">الأقدم</SelectItem>
                    <SelectItem value="highest_budget">
                      الأكبر ميزانية
                    </SelectItem>
                    <SelectItem value="lowest_bids">الأقل عروضًا</SelectItem>
                    <SelectItem value="matching">الأكثر تطابقاً</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Projects List */}
            <div className="space-y-4">
              {filteredProjects.length === 0 ? (
                <div className="text-center py-20 bg-card rounded-xl border border-dashed border-border">
                  <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <MagnifyingGlassIcon className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    لا توجد مشاريع مطابقة
                  </h3>
                  <p className="text-muted-foreground mt-1">
                    جرب تغيير معايير البحث أو الفلترة
                  </p>
                  <Button
                    variant="link"
                    onClick={() =>
                      setFilters({
                        categories: [],
                        budget: [minBudget, maxBudget],
                        duration: "all",
                        location: "",
                      })
                    }
                    className="mt-2"
                  >
                    إعادة تعيين الفلاتر
                  </Button>
                </div>
              ) : (
                <>
                  {currentProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      linkTarget="/projects/proposal"
                    />
                  ))}

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="mt-8 flex justify-center">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                if (currentPage > 1)
                                  handlePageChange(currentPage - 1);
                              }}
                              className={
                                currentPage === 1
                                  ? "pointer-events-none opacity-50"
                                  : "cursor-pointer"
                              }
                            />
                          </PaginationItem>

                          {Array.from(
                            { length: totalPages },
                            (_, i) => i + 1
                          ).map((page) => {
                            // Logic to show limited page numbers (e.g., 1, 2, ..., 10)
                            if (
                              page === 1 ||
                              page === totalPages ||
                              (page >= currentPage - 1 &&
                                page <= currentPage + 1)
                            ) {
                              return (
                                <PaginationItem key={page}>
                                  <PaginationLink
                                    href="#"
                                    isActive={page === currentPage}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handlePageChange(page);
                                    }}
                                  >
                                    {page}
                                  </PaginationLink>
                                </PaginationItem>
                              );
                            } else if (
                              page === currentPage - 2 ||
                              page === currentPage + 2
                            ) {
                              return (
                                <PaginationItem key={page}>
                                  <PaginationEllipsis />
                                </PaginationItem>
                              );
                            }
                            return null;
                          })}

                          <PaginationItem>
                            <PaginationNext
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                if (currentPage < totalPages)
                                  handlePageChange(currentPage + 1);
                              }}
                              className={
                                currentPage === totalPages
                                  ? "pointer-events-none opacity-50"
                                  : "cursor-pointer"
                              }
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
