import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarIcon,
  ClockIcon,
  SewingPinIcon,
  PersonIcon,
  ExternalLinkIcon,
  ChevronLeftIcon,
  ArrowLeftIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function ProjectCard({ project, linkTarget }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 180;

  // Default link target if not provided
  const target = linkTarget || `/projects/${project.id}`;

  // Date Formatting Logic
  const formatPostedDate = (dateString) => {
    const now = new Date();
    const posted = new Date(dateString);
    const diff = now - posted;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const remainingDays = days % 30;

    if (hours < 24) {
      return `منذ ${hours} ساعات`;
    } else if (days < 30) {
      return `منذ ${days} أيام`;
    } else {
      return `منذ ${months} شهور و ${remainingDays} أيام`;
    }
  };

  const shouldTruncate = project.description.length > maxLength;
  const displayDescription =
    isExpanded || !shouldTruncate
      ? project.description
      : `${project.description.substring(0, maxLength)}...`;

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start py-8 border-b border-border last:border-0 group hover:bg-muted/50 cursor-pointer px-4 -mx-4 mb-0 transition-all duration-300">
      {/* Image (Right) */}
      <div className="w-full md:w-48 h-48 shrink-0 rounded-xl overflow-hidden bg-muted shadow-sm group-hover:shadow-md transition-all duration-300 relative">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content (Left) */}
      <div className="flex-1 min-w-0 space-y-4 w-full">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-2">
              {/* Date Badge (Moved Above Title) */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground whitespace-nowrap bg-muted/50 px-2 py-1 rounded-full flex items-center gap-1 w-fit">
                  <ClockIcon className="w-3 h-3" />
                  {formatPostedDate(project.postedDate)}
                </span>
              </div>

              {/* Title */}
              <Link
                to={target}
                className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1 block"
              >
                {project.title}
              </Link>

              {/* Badges Section */}
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className="text-primary border-primary/20 bg-primary/5"
                >
                  {project.category}
                </Badge>
                {project.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="text-xs font-normal bg-muted text-muted-foreground hover:bg-accent"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div className=" shrink-0 flex flex-row md:flex-col items-center  justify-center md:justify-start gap-2 md:gap-1 bg-muted/30 p-3 md:p-0 md:bg-transparent rounded-lg md:rounded-none">
              <div className="text-lg font-bold text-primary">
                {project.budget.toLocaleString()} ج.م
              </div>
              <div className="text-xs text-muted-foreground">
                الميزانية المتوقعة
              </div>
            </div>
          </div>
        </div>

        {/* Description with Read More */}
        <div className="text-base leading-7 text-muted-foreground pl-4 md:pl-8">
          {displayDescription}
          {shouldTruncate && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="text-primary font-bold hover:underline mr-1 inline-flex items-center gap-1 group cursor-pointer select-none"
            >
              {isExpanded ? "عرض أقل" : "رؤية المزيد"}
              <ChevronLeftIcon
                className={cn(
                  "w-4 h-4 transition-transform duration-300",
                  isExpanded ? "rotate-90" : "group-hover:-translate-x-1"
                )}
              />
            </span>
          )}
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-border mt-4">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground py-2">
            <SewingPinIcon className="w-4 h-4 text-red-500" />
            {project.location}
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground py-2">
            <CalendarIcon className="w-4 h-4 text-blue-500" />
            مدة التنفيذ: {project.duration} يوم
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground py-2">
            <PersonIcon className="w-4 h-4 text-emerald-500" />
            {project.bidsCount} عروض مقدمة
          </div>
          <div className="flex-1"></div>
          <Button asChild size="sm" variant="secondary">
            <Link to={target} className="flex items-center gap-1">
              التفاصيل
              <ArrowLeftIcon className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
