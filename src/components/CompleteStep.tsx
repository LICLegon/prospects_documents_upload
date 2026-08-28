import type { UploadedFile } from "../types";
import { formatFileSize, getExtension } from "../types";
interface CompleteStepProps {
  files: UploadedFile[];
  onUploadMore: () => void;
  onReturnToDashboard: () => void;
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

export default function CompleteStep({
  files,
  onUploadMore,
  onReturnToDashboard,
}: CompleteStepProps) {
  const totalBytes = files.reduce((sum, f) => sum + f.file.size, 0);
  const completedAt = new Date().toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex flex-col items-center text-center py-8">
          <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-3xl mb-4">
            ✓
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Upload complete
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {files.length} documents were uploaded successfully and are ready
            for review.
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Completed today at {completedAt}
          </p>
        </div>

        <div className="border border-gray-100 rounded-lg divide-y divide-gray-100">
          <p className="px-4 py-2 text-sm font-medium text-gray-900">
            Uploaded documents
          </p>
          {files.map((f) => {
            const icon = iconFor(f.file.name);
            return (
              <div key={f.id} className="flex items-center gap-3 px-4 py-3">
                <div
                  className={`w-8 h-8 rounded flex items-center justify-center text-[9px] font-bold shrink-0 ${icon.classes}`}
                >
                  {icon.label}
                </div>
                <p className="flex-1 text-sm text-gray-900 truncate">
                  {f.file.name}
                </p>
                <span className="text-sm text-green-600 font-medium">
                  ✓ Uploaded
                </span>
              </div>
            );
          })}
        </div>

        <p className="text-sm text-gray-500 mt-4">
          {files.length} documents · {formatFileSize(totalBytes)} total
        </p>

        <div className="flex flex-wrap items-center gap-3 mt-6">
          <button className="px-5 py-2.5 rounded-lg font-medium text-sm bg-purple-600 text-white hover:bg-purple-700">
            View documents
          </button>
          <button
            onClick={onUploadMore}
            className="px-5 py-2.5 rounded-lg font-medium text-sm border border-purple-200 text-purple-600 hover:bg-purple-50"
          >
            Upload more documents
          </button>
          <button
            onClick={onReturnToDashboard}
            className="text-purple-600 font-medium text-sm ml-auto"
          >
            Return to dashboard
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5 h-fit">
        <h3 className="font-semibold text-gray-900 mb-4">Upload summary</h3>
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-500">Documents uploaded</dt>
            <dd className="font-medium text-gray-900">{files.length}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Failed</dt>
            <dd className="font-medium text-gray-900">0</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Total size</dt>
            <dd className="font-medium text-gray-900">
              {formatFileSize(totalBytes)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Status</dt>
            <dd className="font-medium text-green-600">Complete</dd>
          </div>
        </dl>
        <div className="mt-4 text-sm bg-green-50 text-green-700 border border-green-100 rounded-lg px-3 py-2">
          ✓ All documents were uploaded without errors.
        </div>
      </div>
    </div>
  );
}
