export type FileStatus = "ready" | "error";

export interface UploadedFile {
  id: string;
  file: File;
  status: FileStatus;
  errorMessage?: string;
}

export const ACCEPTED_EXTENSIONS = [".pdf", ".doc", ".docx"];
export const MAX_FILE_SIZE_MB = 10;

export function formatFileSize(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) return `${mb.toFixed(1)} MB`;
  return `${(bytes / 1024).toFixed(0)} KB`;
}

export function getExtension(filename: string): string {
  const idx = filename.lastIndexOf(".");
  return idx === -1 ? "" : filename.slice(idx).toLowerCase();
}

export function validateFile(file: File): {
  status: FileStatus;
  errorMessage?: string;
} {
  const ext = getExtension(file.name);
  if (!ACCEPTED_EXTENSIONS.includes(ext)) {
    return {
      status: "error",
      errorMessage:
        "This file type is not supported. Remove it or upload a PDF or Word document.",
    };
  }
  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    return {
      status: "error",
      errorMessage: `File exceeds the ${MAX_FILE_SIZE_MB}MB limit.`,
    };
  }
  return { status: "ready" };
}
