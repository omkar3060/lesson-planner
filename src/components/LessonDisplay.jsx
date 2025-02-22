import { useRef, useEffect, useState } from "react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Download, Loader2 } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function LessonDisplay({ lesson }) {
  const contentRef = useRef(null);
  const [editableLesson, setEditableLesson] = useState(lesson);
  const [isReady, setIsReady] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (lesson && lesson.trim()) {
      setEditableLesson(lesson);
      setIsReady(true);
    }
  }, [lesson]);

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;
    setIsGenerating(true);

    try {
      // Create a standalone HTML document for PDF generation
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                margin: 0;
                padding: 40px;
                background: rgb(255, 255, 255);
                color: rgb(0, 0, 0);
                font-family: Arial, sans-serif;
                width: 800px;
              }
              .title {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 20px;
                color: rgb(0, 0, 0);
              }
              .date {
                font-size: 14px;
                color: rgb(102, 102, 102);
                margin-bottom: 30px;
              }
              .content {
                line-height: 1.6;
                font-size: 16px;
              }
              p {
                margin-bottom: 16px;
                color: rgb(0, 0, 0);
              }
            </style>
          </head>
          <body>
            <div class="title">Generated Lesson Plan</div>
            <div class="date">${new Date().toLocaleDateString()}</div>
            <div class="content">
              ${editableLesson
                .split("\n")
                .filter(para => para.trim())
                .map(para => `<p>${para}</p>`)
                .join('')}
            </div>
          </body>
        </html>
      `;

      // Create an iframe with the content
      const iframe = document.createElement('iframe');
      iframe.style.position = 'absolute';
      iframe.style.left = '-9999px';
      iframe.style.top = '0';
      document.body.appendChild(iframe);

      // Write the content to the iframe
      iframe.contentDocument.open();
      iframe.contentDocument.write(htmlContent);
      iframe.contentDocument.close();

      // Wait for iframe content to load
      await new Promise(resolve => {
        iframe.onload = resolve;
      });

      // Generate canvas from iframe content
      const canvas = await html2canvas(iframe.contentDocument.body, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        windowWidth: 800,
        windowHeight: iframe.contentDocument.body.scrollHeight
      });

      // Clean up iframe
      document.body.removeChild(iframe);

      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
        putOnlyUsedFonts: true
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

      if (pdfHeight > pdf.internal.pageSize.getHeight()) {
        const pageCount = Math.ceil(pdfHeight / pdf.internal.pageSize.getHeight());
        for (let i = 1; i < pageCount; i++) {
          pdf.addPage();
          pdf.addImage(
            imgData,
            'JPEG',
            0,
            -(pdf.internal.pageSize.getHeight() * i),
            pdfWidth,
            pdfHeight
          );
        }
      }

      pdf.save('lesson_plan.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto mt-8">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center justify-between">
          <span className="text-2xl font-bold">Generated Lesson Plan</span>
          <span className="text-sm text-gray-500">
            {new Date().toLocaleDateString()}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        {!isReady ? (
          <div className="min-h-48 flex flex-col items-center justify-center space-y-4 text-gray-500">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="text-sm">Generating your lesson plan...</p>
          </div>
        ) : (
          <div
            ref={contentRef}
            contentEditable={true}
            suppressContentEditableWarning={true}
            className="prose max-w-none p-4 min-h-48 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {editableLesson.split("\n").map((paragraph, index) => (
              paragraph.trim() && (
                <p key={index} className="mb-4 text-base leading-relaxed">
                  {paragraph}
                </p>
              )
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-end gap-4 border-t p-6 bg-gray-50">
        <Button
          onClick={handleDownloadPDF}
          disabled={!isReady || isGenerating}
          className="flex items-center gap-2 min-w-32"
        >
          {!isReady || isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>{isGenerating ? 'Generating PDF...' : 'Generating...'}</span>
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              <span>Download as PDF</span>
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}