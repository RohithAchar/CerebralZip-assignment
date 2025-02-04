import { useEffect, useState } from "react";
import { CommunityFeedback } from "../utils/types";
import { getFeedback } from "../utils/api";
import { LoaderCircle } from "lucide-react";
import { Tooltip } from "react-tooltip";

function FeedbackCard() {
  const [feedbackData, setFeedbackData] = useState<
    CommunityFeedback | undefined
  >(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFeedback();
        setFeedbackData(response);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };
    fetchData();
  }, []);

  // Show loading state until data is available
  if (!feedbackData) {
    return (
      <div className="bg-white rounded-2xl flex items-center justify-center shadow-lg p-6">
        <LoaderCircle className="h-8 w-8 animate-spin text-gray-500 mt-4" />
      </div>
    );
  }

  const total =
    feedbackData.positive + feedbackData.neutral + feedbackData.negative;

  const getPercentage = (value: number) =>
    total > 0 ? (value / total) * 100 : 0;

  const result =
    feedbackData.positive > feedbackData.negative ? "Positive" : "Negative";

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full">
      <div className="space-y-2 mb-2">
        <p className="text-gray-500 text-sm">Community feedback</p>
        <h2 className="text-xl font-semibold">Mostly {result}</h2>
      </div>

      <div className="flex h-2 rounded-full overflow-hidden mb-4 bg-gray-200">
        <div
          className="bg-red-400"
          style={{ width: `${getPercentage(feedbackData.negative)}%` }}
          data-tooltip-id="negative-tooltip"
        />
        <div
          className="bg-yellow-400"
          style={{ width: `${getPercentage(feedbackData.neutral)}%` }}
          data-tooltip-id="neutral-tooltip"
        />
        <div
          className="bg-green-400"
          style={{ width: `${getPercentage(feedbackData.positive)}%` }}
          data-tooltip-id="positive-tooltip"
        />
      </div>

      <div className="flex justify-between text-sm text-gray-600">
        <div data-tooltip-id="negative-tooltip" className="relative">
          Negative
          <Tooltip
            id="negative-tooltip"
            place="top"
            content="Feedback labeled as negative."
            className="bg-gray-800 text-white text-xs p-2 rounded"
          />
        </div>
        <div data-tooltip-id="neutral-tooltip" className="relative">
          Neutral
          <Tooltip
            id="neutral-tooltip"
            place="top"
            content="Feedback labeled as neutral."
            className="bg-gray-800 text-white text-xs p-2 rounded"
          />
        </div>
        <div data-tooltip-id="positive-tooltip" className="relative">
          Positive
          <Tooltip
            id="positive-tooltip"
            place="top"
            content="Feedback labeled as positive."
            className="bg-gray-800 text-white text-xs p-2 rounded"
          />
        </div>
      </div>

      <div className="flex justify-between text-sm font-medium mt-1">
        <div>{feedbackData.negative}</div>
        <div>{feedbackData.neutral}</div>
        <div>{feedbackData.positive}</div>
      </div>
    </div>
  );
}

export default FeedbackCard;
