import { useState } from "react";

export const TranscriptGenerator = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [pattern, setPattern] = useState("");
  const [withMetadata, setWithMetadata] = useState(false);
  const [withComments, setWithComments] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoUrl) {
      setError("Please enter a YouTube video URL");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("https://fabric-api-production.up.railway.app/api/youtube", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: videoUrl,
          pattern: pattern || undefined,
          language: "en",
          with_metadata: withMetadata,
          with_comments: withComments,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="transcript-generator bg-bgDark3 p-6 rounded-xl border-2 border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-primaryText">YouTube Transcript Generator</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="videoUrl" className="text-sm font-medium text-gray-300 mb-1">
            YouTube Video URL
          </label>
          <input
            type="text"
            id="videoUrl"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="p-2 bg-bgDark2 border border-gray-700 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-200"
            placeholder="https://youtu.be/..."
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="pattern" className="text-sm font-medium text-gray-300 mb-1">
            Analysis Pattern (Optional)
          </label>
          <select
            id="pattern"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            className="p-2 bg-bgDark2 border border-gray-700 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-200"
          >
            <option value="">No Pattern (Raw Transcript)</option>
            <option value="create_summary">Create Summary</option>
            <option value="extract_main_idea">Extract Main Idea</option>
            <option value="analyze_content">Analyze Content</option>
            <option value="create_visualization">Create Visualization</option>
            <option value="extract_insights">Extract Insights</option>
            <option value="summarize">Summarize</option>
            <option value="create_micro_summary">Micro Summary</option>
          </select>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={withMetadata}
              onChange={(e) => setWithMetadata(e.target.checked)}
              className="rounded border-gray-700 bg-bgDark2 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-300">Include video metadata</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={withComments}
              onChange={(e) => setWithComments(e.target.checked)}
              className="rounded border-gray-700 bg-bgDark2 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-300">Include video comments</span>
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Transcript"}
        </button>

        {error && (
          <div className="mt-4 p-4 bg-red-900/50 text-red-200 rounded-md">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-4 space-y-4">
            {result.metadata && withMetadata && (
              <div className="p-4 bg-bgDark2 rounded-md border border-gray-700">
                <h3 className="text-lg font-semibold mb-2 text-primaryText">Video Metadata</h3>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                  {Object.entries(result.metadata).map(([key, value]) => (
                    <div key={key} className="py-1">
                      <span className="font-medium text-gray-200">{key}:</span>{" "}
                      <span>{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="p-4 bg-bgDark2 rounded-md border border-gray-700">
              {result.pattern_result ? (
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-primaryText">
                    {pattern.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                  </h3>
                  <pre className="text-gray-300 whitespace-pre-wrap text-sm">
                    {typeof result.pattern_result === "string"
                      ? result.pattern_result
                      : JSON.stringify(result.pattern_result, null, 2)}
                  </pre>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-primaryText">Full Transcript</h3>
                  <div className="text-gray-300 whitespace-pre-wrap text-sm">{result.transcript}</div>
                </div>
              )}
            </div>

            {result.comments && withComments && (
              <div className="p-4 bg-bgDark2 rounded-md border border-gray-700">
                <h3 className="text-lg font-semibold mb-2 text-primaryText">Top Comments</h3>
                <div className="space-y-3">
                  {result.comments.map((comment, index) => (
                    <div key={index} className="p-3 bg-bgDark1 rounded-md">
                      <p className="text-gray-300 text-sm">{comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
};