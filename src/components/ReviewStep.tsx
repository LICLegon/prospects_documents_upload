import { useRef } from "react";
import type { UploadedFile } from "../types";
import { formatFileSize, getExtension } from "../types";

interface ReviewStepProps {
  files: UploadedFile[];
  onAddFiles: (files: File[]) => void;
  onRemoveFile: (id: string) => void;
  onBack: () => void;
  onComplete: () => void;
}

function iconFor(filename: string) {
  const ext = getExtension(filename);
  if (ext === ".pdf")
    return { label: "PDF", classes: "bg-red-50 text-red-600" };
  if (ext === ".doc" || ext === ".docx")
    return { label: "WORD", classes: "bg-blue-50 text-blue-600" };
  return {
    label: ext.replace(".", "").toUpperCase() || "FILE",
    classes: "bg-gray-100 text-gray-600",
  };
}

export default function ReviewStep({
  files,
  onAddFiles,
  onRemoveFile,
  onBack,
  onComplete,
}: ReviewStepProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const errorCount = files.filter((f) => f.status === "error").length;
  const readyCount = files.length - errorCount;
  const totalBytes = files.reduce((sum, f) => sum + f.file.size, 0);
  const canComplete = files.length > 0 && errorCount === 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
              📄
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">
                Review uploaded files
              </h2>
              <p className="text-sm text-gray-500">
                Check each document and resolve any issues before continuing.
              </p>
            </div>
          </div>
          <button
            onClick={() => inputRef.current?.click()}
            className="text-sm font-medium text-purple-600 border border-purple-200 rounded-lg px-4 py-2 hover:bg-purple-50"
          >
            + Add more files
          </button>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) =>
              e.target.files && onAddFiles(Array.from(e.target.files))
            }
          />
        </div>

        <div className="divide-y divide-gray-100 border border-gray-100 rounded-lg overflow-hidden">
          {files.map((f) => {
            const icon = iconFor(f.file.name);
            return (
              <div key={f.id} className="p-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-9 h-9 rounded flex items-center justify-center text-[10px] font-bold shrink-0 ${icon.classes}`}
                  >
                    {icon.label}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {f.file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {icon.label} · {formatFileSize(f.file.size)}
                    </p>
                  </div>
                  <div className="text-sm font-medium whitespace-nowrap">
                    {f.status === "ready" ? (
                      <span className="text-green-600">✓ Ready</span>
                    ) : (
                      <span className="text-red-500">
                        ⚠ Unsupported file type
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => onRemoveFile(f.id)}
                    className="text-gray-400 hover:text-gray-600 px-1"
                    aria-label={`Remove ${f.file.name}`}
                  >
                    ⋮
                  </button>
                </div>
                {f.status === "error" && (
                  <div className="mt-3 text-sm bg-red-50 text-red-600 border border-red-100 rounded-lg px-3 py-2">
                    {f.errorMessage}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-sm text-gray-500 mt-4">
          {files.length} documents · {formatFileSize(totalBytes)} total
        </p>

        <div className="flex items-center justify-between mt-6">
          <button
            onClick={onBack}
            className="text-purple-600 font-medium text-sm"
          >
            ← Back
          </button>
          <button
            onClick={onComplete}
            disabled={!canComplete}
            className={`px-5 py-2.5 rounded-lg font-medium text-sm ${
              canComplete
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Complete upload
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Upload summary</h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500">Documents</dt>
              <dd className="font-medium text-gray-900">{files.length}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Ready</dt>
              <dd className="font-medium text-green-600">{readyCount}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Errors</dt>
              <dd
                className={`font-medium ${errorCount ? "text-red-500" : "text-gray-900"}`}
              >
                {errorCount}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Total size</dt>
              <dd className="font-medium text-gray-900">
                {formatFileSize(totalBytes)}
              </dd>
            </div>
          </dl>
          {errorCount > 0 && (
            <div className="mt-4 text-sm bg-red-50 text-red-600 border border-red-100 rounded-lg px-3 py-2">
              ⚠ Remove unsupported files before completing the upload.
            </div>
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="font-semibold text-gray-900 mb-2">💡 Tip</h3>
          <p className="text-sm text-gray-500">
            Supported formats are PDF, DOC and DOCX. Remove unsupported files to
            continue.
          </p>
        </div>
      </div>
    </div>
  );
}
