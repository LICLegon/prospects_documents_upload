interface Step {
  label: string;
  description: string;
}

const STEPS: Step[] = [
  { label: "Upload documents", description: "Choose your document files" },
  { label: "Review files", description: "Preview and confirm documents" },
  { label: "Complete upload", description: "Finish the document upload" },
];

export default function StepIndicator({
  currentStep,
}: {
  currentStep: number;
}) {
  return (
    <div className="flex rounded-xl border border-gray-200 overflow-hidden bg-white">
      {STEPS.map((step, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === currentStep;
        const isDone = stepNum < currentStep;

        return (
          <div
            key={step.label}
            className={`flex-1 flex items-center gap-3 px-6 py-4 ${
              isActive ? "bg-purple-50" : ""
            } ${i > 0 ? "border-l border-gray-200" : ""}`}
          >
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full border-2 shrink-0 font-semibold text-sm ${
                isDone
                  ? "bg-purple-600 border-purple-600 text-white"
                  : isActive
                    ? "border-purple-600 text-purple-600"
                    : "border-gray-300 text-gray-400"
              }`}
            >
              {isDone ? "✓" : stepNum}
            </div>
            <div>
              <p
                className={`font-semibold text-sm ${isActive || isDone ? "text-gray-900" : "text-gray-400"}`}
              >
                {step.label}
              </p>
              <p className="text-xs text-gray-500">{step.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
