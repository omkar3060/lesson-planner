import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import LessonForm from "../components/LessonForm";
import LessonDisplay from "../components/LessonDisplay";
import { fetchLessonPlan } from "../api/gemini";

export default function Planner() {
  const [lesson, setLesson] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load lesson from localStorage on mount
  useEffect(() => {
    const savedLesson = localStorage.getItem("lessonPlan");
    if (savedLesson) {
      setLesson(JSON.parse(savedLesson));
    }
  }, []);

  const generateLesson = async (details) => {
    try {
      setIsLoading(true);
      const content = await fetchLessonPlan(details);

      // Save lesson to localStorage
      localStorage.setItem("lessonPlan", JSON.stringify(content));

      setLesson(content);
    } catch (error) {
      console.error("Error generating lesson:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <LessonForm generateLesson={generateLesson} />
      
      {isLoading && (
        <div className="w-full max-w-4xl mx-auto mt-8">
          <div className="space-y-4">
            {/* Header skeleton */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-24" />
            </div>
            
            {/* Content skeleton */}
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[95%]" />
              <Skeleton className="h-4 w-[85%]" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[92%]" />
            </div>
          </div>
        </div>
      )}

      {!isLoading && lesson && <LessonDisplay lesson={lesson} />}
    </div>
  );
}
