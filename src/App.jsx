import React, { useState } from "react";

const App = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [history, setHistory] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const steps = {
    1: {
      title: "Data Availability",
      question: "Do you have data related to this problem?",
      options: [
        { label: "Yes", nextStep: 2 },
        { label: "No", nextStep: 1.1 },
      ],
    },
    1.1: {
      title: "Data Collection Possibility",
      question: "Can you collect this data going forward?",
      options: [
        {
          label: "Yes",
          result:
            "Consider AI as a future solution after collecting 3-6 months of data",
          isResult: true,
          resultType: "future",
        },
        {
          label: "No",
          result: "Not currently an AI candidate",
          isResult: true,
          resultType: "negative",
        },
      ],
    },
    2: {
      title: "Problem Type",
      question: "What kind of problem are you trying to solve?",
      options: [
        {
          label: "Pattern recognition (finding trends, anomalies, groupings)",
          value: "pattern",
          nextStep: 3,
        },
        {
          label: "Prediction (forecasting outcomes, behavior, needs)",
          value: "prediction",
          nextStep: 3,
        },
        {
          label: "Classification (sorting items, prioritizing, categorizing)",
          value: "classification",
          nextStep: 3,
        },
        {
          label: "Language processing (understanding text, generating content)",
          value: "language",
          nextStep: 3,
        },
        {
          label: "Image/video analysis (identifying objects, people, scenes)",
          value: "image",
          nextStep: 3,
        },
        {
          label: "Making complex ethical judgments",
          value: "ethical",
          result: "Not ideal for AI alone",
          isResult: true,
          resultType: "negative",
        },
      ],
    },
    3: {
      title: "Data Quantity",
      question:
        "Do you have sufficient quantity of data (hundreds or thousands of examples)?",
      options: [
        { label: "Yes", nextStep: 3.1 },
        {
          label: "No",
          result: "Not currently an AI candidate",
          isResult: true,
          resultType: "negative",
        },
      ],
    },
    3.1: {
      title: "Data Quality",
      question: "Is your data reasonably accurate and consistent?",
      options: [
        { label: "Yes", nextStep: 4 },
        {
          label: "No",
          result: "Requires data cleanup before AI implementation",
          isResult: true,
          resultType: "conditional",
        },
      ],
    },
    4: {
      title: "Task Repetitiveness",
      question: "Is the task repetitive with consistent patterns?",
      options: [
        { label: "Yes", nextStep: 4.1 },
        { label: "No", nextStep: 4.1 },
      ],
    },
    4.1: {
      title: "Rules-Based Nature",
      question: "Is the task rules-based but with many variables?",
      options: [
        { label: "Yes", nextStep: 4.2 },
        { label: "No", nextStep: 4.2 },
      ],
    },
    4.2: {
      title: "Human Judgment Requirement",
      question:
        "Does the task require human judgment or empathy as the primary value?",
      options: [
        {
          label: "Yes",
          result: "Consider AI as an assistant, not a replacement",
          isResult: true,
          resultType: "conditional",
        },
        { label: "No", nextStep: 5 },
      ],
    },
    5: {
      title: "Time/Resource Impact",
      question: "Will solving this problem save significant time or resources?",
      options: [
        { label: "Yes", nextStep: 5.1 },
        { label: "No", nextStep: 5.1 },
      ],
    },
    5.1: {
      title: "Customer/Revenue Impact",
      question:
        "Will solving this problem directly impact customer experience or revenue?",
      options: [
        { label: "Yes", nextStep: 5.2 },
        { label: "No", nextStep: 5.2 },
      ],
    },
    5.2: {
      title: "Strategic Importance",
      question: "Does this problem address a strategic business need?",
      options: [
        { label: "Yes", nextStep: 6 },
        {
          label: "No",
          result: "Reconsider priority - may not be worth AI investment",
          isResult: true,
          resultType: "conditional",
        },
      ],
    },
    6: {
      title: "Budget Availability",
      question:
        "Do you have budget for AI implementation (tools, possible consulting)?",
      options: [
        { label: "Yes", nextStep: 6.1 },
        {
          label: "No",
          result: "Consider pre-built, affordable AI solutions or postpone",
          isResult: true,
          resultType: "conditional",
        },
      ],
    },
    6.1: {
      title: "Technical Capacity",
      question: "Do you have technical capacity (in-house or contracted)?",
      options: [
        { label: "Yes", nextStep: 6.2 },
        {
          label: "No",
          result: "Consider user-friendly AI tools or external support",
          isResult: true,
          resultType: "conditional",
        },
      ],
    },
    6.2: {
      title: "Organizational Readiness",
      question: "Is your organization ready for process change?",
      options: [
        {
          label: "Yes",
          result: "This problem is a good AI candidate!",
          isResult: true,
          resultType: "positive",
        },
        {
          label: "No",
          result: "Address change management before implementation",
          isResult: true,
          resultType: "conditional",
        },
      ],
    },
  };

  const handleSelect = (option) => {
    const newAnswers = { ...answers, [currentStep]: option.label };
    setAnswers(newAnswers);
    setHistory([
      ...history,
      {
        step: currentStep,
        question: steps[currentStep].question,
        answer: option.label,
      },
    ]);

    if (option.isResult) {
      setShowResult(option.result);
    } else {
      setCurrentStep(option.nextStep);
    }
  };

  const resetTree = () => {
    setCurrentStep(1);
    setAnswers({});
    setHistory([]);
    setShowResult(false);
  };

  const goBack = () => {
    if (history.length > 0) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);

      const newAnswers = { ...answers };
      delete newAnswers[currentStep];
      setAnswers(newAnswers);

      if (showResult) {
        setShowResult(false);
        setCurrentStep(history[history.length - 1].step);
      } else if (history.length > 0) {
        setCurrentStep(history[history.length - 1].step);
      } else {
        setCurrentStep(1);
      }
    } else {
      resetTree();
    }
  };

  const getResultColor = (resultType) => {
    switch (resultType) {
      case "positive":
        return "bg-green-100 border-green-500 text-green-700";
      case "negative":
        return "bg-red-100 border-red-500 text-red-700";
      case "conditional":
        return "bg-yellow-100 border-yellow-500 text-yellow-700";
      case "future":
        return "bg-blue-100 border-blue-500 text-blue-700";
      default:
        return "bg-gray-100 border-gray-500";
    }
  };

  const currentQuestion = steps[currentStep];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">
        Is This Problem a Good AI Candidate?
      </h2>
      <div className="mb-4 text-sm">
        <div className="flex justify-between mb-2">
          <div className="font-semibold">Progress:</div>
          <div>{Math.min(Math.round((history.length / 12) * 100), 100)}%</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{
              width: `${Math.min(
                Math.round((history.length / 12) * 100),
                100
              )}%`,
            }}
          ></div>
        </div>
      </div>

      {showResult ? (
        <div
          className={`p-4 mb-6 rounded-lg border ${getResultColor(
            currentQuestion.options.find(
              (o) => o.label === answers[currentStep]
            )?.resultType
          )}`}
        >
          <h2 className="text-xl font-semibold mb-2">Result:</h2>
          <p className="text-lg">{showResult}</p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              {currentQuestion.title}
            </h2>
            <p className="text-lg">{currentQuestion.question}</p>
          </div>

          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className="w-full p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-300"
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}

      <div className="flex justify-between">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          onClick={goBack}
          disabled={history.length === 0}
        >
          Back
        </button>

        {showResult && (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={resetTree}
          >
            Start Over
          </button>
        )}
      </div>

      {history.length > 0 && (
        <div className="mt-8 border-t pt-4">
          <h3 className="font-semibold mb-2">Your Path:</h3>
          <div className="text-sm">
            {history.map((item, index) => (
              <div key={index} className="mb-2">
                <div className="font-medium">{item.question}</div>
                <div className="ml-4 text-gray-600">→ {item.answer}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
