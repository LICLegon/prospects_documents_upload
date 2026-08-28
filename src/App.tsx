import { useState } from "react";
import StepIndicator from "./components/StepIndicator";
import UploadStep from "./components/UploadStep";
import ReviewStep from "./components/ReviewStep";
import CompleteStep from "./components/CompleteStep";
import type { UploadedFile } from "./types";
import { validateFile } from "./types";

function App() {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState<UploadedFile[]>([]);

  function addFiles(newFiles: File[]) {
    const wrapped: UploadedFile[] = newFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      ...validateFile(file),
    }));
    setFiles((prev) => [...prev, ...wrapped]);
    if (step === 1) setStep(2);
  }

  function removeFile(id: string) {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }

  function resetWizard() {
    setFiles([]);
    setStep(1);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center gap-3 mb-1">
          <button className="text-gray-500 text-xl">‹</button>
          <h1 className="text-2xl font-bold text-gray-900">Upload Documents</h1>
        </div>
        <p className="text-gray-500 mb-6 ml-8">
          {step === 1 && "Upload documents for review and processing"}
          {step === 2 && "Review documents before completing the upload"}
          {step === 3 && "Your documents have been uploaded successfully"}
        </p>

        <div className="mb-6">
          <StepIndicator currentStep={step} />
        </div>

        {step === 1 && <UploadStep onFilesSelected={addFiles} />}

        {step === 2 && (
          <ReviewStep
            files={files}
            onAddFiles={addFiles}
            onRemoveFile={removeFile}
            onBack={() => setStep(1)}
            onComplete={() => setStep(3)}
          />
        )}

        {step === 3 && (
          <CompleteStep
            files={files}
            onUploadMore={resetWizard}
            onReturnToDashboard={resetWizard}
          />
        )}
      </div>
    </div>
  );
}

export default App;
