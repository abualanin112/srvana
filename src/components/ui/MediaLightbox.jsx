import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Cross2Icon,
  PlayIcon,
} from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

/**
 * MediaLightbox Component
 *
 * @param {Object} props
 * @param {Array} props.items - Array of items. Each item can be a string (URL) or object { type: 'image'|'video', url: string, title?: string }
 * @param {number} props.initialIndex - Index to start at
 * @param {boolean} props.open - Whether the lightbox is open
 * @param {function} props.onOpenChange - Callback when open state changes
 */
export default function MediaLightbox({
  items = [],
  initialIndex = 0,
  open,
  onOpenChange,
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Reset index when opening
  useEffect(() => {
    if (open) setCurrentIndex(initialIndex);
  }, [open, initialIndex]);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % items.length);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!open) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, items.length]);

  if (!items.length) return null;

  const currentItem = items[currentIndex];

  // Normalize item to object format
  const normalizeItem = (item) => {
    if (typeof item === "string") return { type: "image", url: item };
    return item;
  };

  const normalizedCurrent = normalizeItem(currentItem);
  const normalizedItems = items.map(normalizeItem);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-screen! w-screen! h-screen p-0! m-0 border-0 rounded-none bg-black/95 backdrop-blur-xl shadow-none flex flex-col overflow-hidden focus:outline-none z-9999">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-6 z-50 flex justify-between items-start pointer-events-none">
          <div className="pointer-events-auto">
            <h2 className="text-white/90 text-xl font-bold drop-shadow-lg tracking-wide">
              {normalizedCurrent.title || "المعرض"}
            </h2>
            <p className="text-white/70 text-sm font-medium drop-shadow-md mt-1">
              {currentIndex + 1} / {items.length}
            </p>
          </div>
          <DialogClose className="pointer-events-auto text-white hover:text-white/80 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors backdrop-blur-sm">
            <Cross2Icon className="w-6 h-6" />
          </DialogClose>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 relative flex items-center justify-center overflow-hidden pt-12">
          <div className="relative w-full h-full flex items-center justify-center p-3 md:p-6 gap-4 md:gap-12">
            {/* Prev Button */}
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-white/80 bg-white/10 hover:bg-white/20 rounded-full w-12 h-12 shrink-0 z-40 transition-all backdrop-blur-sm hidden md:flex"
              onClick={prevImage}
            >
              <ChevronRightIcon className="w-6 h-6" />
            </Button>

            {/* Media Container - Fixed Display Area */}
            <div className="relative w-full max-w-5xl h-[50vh] md:h-[75vh] bg-black/20 rounded-xl overflow-hidden flex items-center justify-center border border-white/5 backdrop-blur-sm">
              {normalizedCurrent.type === "video" ? (
                <video
                  controls
                  className="w-full h-full object-contain shadow-2xl outline-none"
                  key={normalizedCurrent.url} // Force re-render on change
                >
                  <source src={normalizedCurrent.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={normalizedCurrent.url}
                  alt={`Media ${currentIndex + 1}`}
                  className="w-full h-full object-contain shadow-2xl select-none animate-in fade-in zoom-in-95 duration-300"
                />
              )}
            </div>

            {/* Next Button */}
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-white/80 bg-white/10 hover:bg-white/20 rounded-full w-12 h-12 shrink-0 z-40 transition-all backdrop-blur-sm hidden md:flex"
              onClick={nextImage}
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation (Bottom Overlay) */}
        <div className="md:hidden absolute bottom-28 left-0 right-0 flex justify-center gap-8 pointer-events-none z-50">
          <Button
            variant="ghost"
            size="icon"
            className="pointer-events-auto text-white hover:text-white/80 bg-white/10 hover:bg-white/20 rounded-full w-12 h-12 backdrop-blur-sm transition-colors"
            onClick={prevImage}
          >
            <ChevronRightIcon className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="pointer-events-auto text-white hover:text-white/80 bg-white/10 hover:bg-white/20 rounded-full w-12 h-12 backdrop-blur-sm transition-colors"
            onClick={nextImage}
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </Button>
        </div>

        {/* Thumbnails Strip */}
        <div className="h-24 bg-black/85 backdrop-blur-md border-t border-white/10 flex items-center justify-center gap-4 px-8 py-4 overflow-x-auto shrink-0 z-50">
          {normalizedItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "relative h-16 w-16 rounded-lg overflow-hidden transition-all duration-300 shrink-0 border-2 group",
                currentIndex === idx
                  ? "border-secondary scale-110 opacity-100 ring-2 ring-secondary/20"
                  : "border-transparent opacity-50 hover:opacity-100"
              )}
            >
              {item.type === "video" ? (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                  <PlayIcon className="w-6 h-6 text-white" />
                </div>
              ) : (
                <img
                  src={item.url}
                  alt={`Thumb ${idx}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              )}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
