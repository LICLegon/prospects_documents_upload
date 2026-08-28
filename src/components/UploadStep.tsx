import { useRef, useState } from "react";

interface UploadStepProps {
  onFilesSelected: (files: File[]) => void;
}

export default function UploadStep({ onFilesSelected }: UploadStepProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length) {
      onFilesSelected(Array.from(e.dataTransfer.files));
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.length) {
      onFilesSelected(Array.from(e.target.files));
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
            📄
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">Upload documents</h2>
            <p className="text-sm text-gray-500">
              Drag and drop your documents below or browse from your device.
            </p>
          </div>
        </div>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`flex flex-col items-center justify-center text-center border-2 border-dashed rounded-xl py-16 px-6 cursor-pointer transition-colors ${
            isDragging
              ? "border-purple-500 bg-purple-50"
              : "border-purple-200 bg-purple-50/40"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={handleInputChange}
          />
          <div className="w-14 h-14 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-2xl mb-4">
            ⬆
          </div>
          <p className="font-semibold text-gray-900">
            Drop PDF or Word documents here{" "}
            <span className="text-purple-600 underline">or browse files</span>
          </p>
          <p className="text-sm text-gray-500 mt-1">
            PDF, DOC or DOCX files only
          </p>
          <div className="mt-5 text-xs text-gray-500 bg-white border border-gray-200 rounded-lg px-4 py-2">
            📎 Maximum file size: 10MB &nbsp;•&nbsp; .pdf, .doc, .docx
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="font-semibold text-gray-900 mb-3">
            Document Requirements
          </h3>
          <p className="text-sm text-gray-500 mb-3">
            Upload clear, readable documents.
          </p>
          <ul className="space-y-2 text-sm text-gray-700 mb-4">
            <li className="flex items-center gap-2">✅ PDF or Word format</li>
            <li className="flex items-center gap-2">
              ✅ Maximum 10MB per file
            </li>
            <li className="flex items-center gap-2">
              ✅ Password protection removed
            </li>
          </ul>
          <hr className="my-3 border-gray-100" />
          <p className="text-xs text-gray-500 mb-1">📄 Accepted file types</p>
          <p className="text-sm text-purple-600 font-medium">
            .pdf, .doc, .docx
          </p>
          <p className="text-xs text-gray-500 mt-3">
            Make sure each document opens correctly before uploading.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="font-semibold text-gray-900 mb-2">💡 Tip</h3>
          <p className="text-sm text-gray-500">
            Use clear file names so documents are easy to identify during
            review.
          </p>
        </div>
      </div>
    </div>
  );
}
