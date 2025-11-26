// src/components/ui/FileUpload.jsx
import { useState, useRef } from "react";
import {
  Cross2Icon,
  UploadIcon,
  ImageIcon,
  VideoIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * File Upload Component
 * مكون رفع الملفات مع drag & drop
 *
 * @param {Function} onFilesChange - callback عند تغيير الملفات
 * @param {Array} acceptedTypes - أنواع الملفات المقبولة
 * @param {Number} maxFiles - أقصى عدد للملفات
 */
export default function FileUpload({
  onFilesChange,
  acceptedTypes = ["image/jpeg", "image/png", "video/mp4"],
  maxFiles = 5,
}) {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (newFiles) => {
    const fileArray = Array.from(newFiles);
    const validFiles = fileArray
      .filter((file) => acceptedTypes.includes(file.type))
      .slice(0, maxFiles - files.length);

    const filesWithPreviews = validFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      type: file.type.startsWith("image") ? "image" : "video",
    }));

    const updatedFiles = [...files, ...filesWithPreviews];
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles.map((f) => f.file));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles.map((f) => f.file));
  };

  return (
    <div className="space-y-4" dir="rtl">
      {/* Upload Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/30 hover:border-primary/50 hover:bg-muted/30"
        )}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(",")}
          className="hidden"
          onChange={(e) => handleFileChange(e.target.files)}
        />

        <div className="flex flex-col items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <UploadIcon className="w-6 h-6 text-primary" />
          </div>

          <div>
            <p className="text-sm font-medium text-foreground">
              اسحب الملفات هنا أو{" "}
              <span className="text-primary">اضغط للرفع</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              JPG, PNG, MP4 (حد أقصى {maxFiles} ملفات)
            </p>
          </div>
        </div>
      </div>

      {/* File Previews */}
      {files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {files.map((fileObj, index) => (
            <div
              key={index}
              className="relative group aspect-square rounded-lg overflow-hidden border border-border bg-muted"
            >
              {fileObj.type === "image" ? (
                <img
                  src={fileObj.preview}
                  alt={`معاينة ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <VideoIcon className="w-12 h-12 text-muted-foreground" />
                </div>
              )}

              {/* Remove Button */}
              <button
                onClick={() => removeFile(index)}
                className="absolute top-2 left-2 bg-destructive/90 text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Cross2Icon className="w-4 h-4" />
              </button>

              {/* File Type Indicator */}
              <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                {fileObj.type === "image" ? (
                  <ImageIcon className="w-3 h-3" />
                ) : (
                  <VideoIcon className="w-3 h-3" />
                )}
                <span>{fileObj.type === "image" ? "صورة" : "فيديو"}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* File Count */}
      {files.length > 0 && (
        <p className="text-xs text-muted-foreground text-center">
          {files.length} / {maxFiles} ملف
        </p>
      )}
    </div>
  );
}
