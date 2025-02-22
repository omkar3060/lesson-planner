import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

export default function LessonForm({ generateLesson }) {
  const [lesson, setLesson] = useState({
    topic: "",
    grade: "",
    concept: "",
    materials: "",
    objectives: "",
    outline: "",
  });

  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setLesson({ ...lesson, [e.target.name]: e.target.value });
    setError(false); // Reset error when user starts typing
  };

  const handleGenerateLesson = () => {
    // Check if all fields are empty
    const allFieldsEmpty = Object.values(lesson).every((field) => field.trim() === "");

    if (allFieldsEmpty) {
      setError(true);
      return;
    }

    generateLesson(lesson);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-card relative">
      {error && (
        <div className="absolute top-0 left-0 right-0 flex justify-center">
          <div className="bg-red-500 text-white text-sm font-semibold px-4 py-2 rounded-md shadow-lg animate-shake">
            ⚠️ Please fill in at least one field to generate a lesson plan!
          </div>
        </div>
      )}

      <CardHeader className="space-y-1 bg-muted/50 rounded-t-lg">
        <CardTitle className="text-2xl font-bold tracking-tight">
          Create Lesson Plan
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Fill in the details below to generate your lesson plan
        </p>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        <div className="grid gap-6">
          {/* Topic Section */}
          <div className="space-y-2">
            <Label htmlFor="topic" className="text-sm font-medium">
              Topic
            </Label>
            <Input
              id="topic"
              name="topic"
              placeholder="Enter the main topic"
              className="w-full transition-colors focus:ring-2 focus:ring-primary"
              onChange={handleChange}
            />
          </div>

          {/* Grade Level Section */}
          <div className="space-y-2">
            <Label htmlFor="grade" className="text-sm font-medium">
              Grade Level
            </Label>
            <Input
              id="grade"
              name="grade"
              placeholder="Specify the grade level"
              className="w-full transition-colors focus:ring-2 focus:ring-primary"
              onChange={handleChange}
            />
          </div>

          {/* Main Concept Section */}
          <div className="space-y-2">
            <Label htmlFor="concept" className="text-sm font-medium">
              Main Concept
            </Label>
            <Textarea
              id="concept"
              name="concept"
              placeholder="Describe the main concept"
              className="min-h-24 transition-colors focus:ring-2 focus:ring-primary resize-none"
              onChange={handleChange}
            />
          </div>

          {/* Materials Section */}
          <div className="space-y-2">
            <Label htmlFor="materials" className="text-sm font-medium">
              Materials Needed
            </Label>
            <Textarea
              id="materials"
              name="materials"
              placeholder="List all required materials"
              className="min-h-24 transition-colors focus:ring-2 focus:ring-primary resize-none"
              onChange={handleChange}
            />
          </div>

          {/* Learning Objectives Section */}
          <div className="space-y-2">
            <Label htmlFor="objectives" className="text-sm font-medium">
              Learning Objectives
            </Label>
            <Textarea
              id="objectives"
              name="objectives"
              placeholder="Define learning objectives"
              className="min-h-24 transition-colors focus:ring-2 focus:ring-primary resize-none"
              onChange={handleChange}
            />
          </div>

          {/* Lesson Outline Section */}
          <Accordion type="single" collapsible className="w-full border rounded-lg">
            <AccordionItem value="outline">
              <AccordionTrigger className="px-4 py-2 hover:bg-muted/50">
                <span className="text-sm font-medium">Lesson Outline</span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pt-2 pb-4">
                <Textarea
                  id="outline"
                  name="outline"
                  placeholder="Structure your lesson outline"
                  className="min-h-32 transition-colors focus:ring-2 focus:ring-primary resize-none"
                  onChange={handleChange}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <Button
          onClick={handleGenerateLesson}
          className="w-full py-6 text-lg font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Generate Lesson Plan
        </Button>
      </CardContent>
    </Card>
  );
}
