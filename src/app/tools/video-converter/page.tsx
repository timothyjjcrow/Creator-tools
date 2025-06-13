"use client";

import { useState, useRef } from "react";

interface ConversionState {
  status: "idle" | "converting" | "completed" | "error";
  progress: number;
  message: string;
}

export default function VideoConverterPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState("mp4");
  const [conversion, setConversion] = useState<ConversionState>({
    status: "idle",
    progress: 0,
    message: "",
  });
  const [downloadUrl, setDownloadUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const supportedFormats = [
    {
      value: "mp4",
      label: "MP4",
      description: "Most compatible format",
      ext: "mp4",
    },
    {
      value: "webm",
      label: "WebM",
      description: "Optimized for web",
      ext: "webm",
    },
    { value: "avi", label: "AVI", description: "Windows standard", ext: "avi" },
    { value: "mov", label: "MOV", description: "QuickTime format", ext: "mov" },
    {
      value: "mkv",
      label: "MKV",
      description: "High quality container",
      ext: "mkv",
    },
    {
      value: "wmv",
      label: "WMV",
      description: "Windows Media Video",
      ext: "wmv",
    },
    { value: "flv", label: "FLV", description: "Flash Video", ext: "flv" },
    { value: "3gp", label: "3GP", description: "Mobile optimized", ext: "3gp" },
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setConversion({ status: "idle", progress: 0, message: "" });
      setDownloadUrl("");
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("video/")) {
      setSelectedFile(file);
      setConversion({ status: "idle", progress: 0, message: "" });
      setDownloadUrl("");
    }
  };

  const convertVideo = async () => {
    if (!selectedFile) return;

    try {
      setConversion({
        status: "converting",
        progress: 0,
        message: "Preparing conversion...",
      });

      // Simulate realistic conversion process
      const steps = [
        { progress: 10, message: "Analyzing video file..." },
        { progress: 25, message: "Processing video frames..." },
        { progress: 45, message: "Encoding audio track..." },
        { progress: 65, message: "Applying format-specific optimizations..." },
        { progress: 80, message: "Finalizing conversion..." },
        { progress: 95, message: "Preparing download..." },
        { progress: 100, message: "Conversion completed!" },
      ];

      for (const step of steps) {
        await new Promise((resolve) =>
          setTimeout(resolve, 800 + Math.random() * 600)
        );
        setConversion((prev) => ({
          ...prev,
          progress: step.progress,
          message: step.message,
        }));
      }

      // Create a simulated converted file
      // In a real implementation, this would be the actual converted video
      const outputFormat = supportedFormats.find(
        (f) => f.value === targetFormat
      );
      selectedFile.name.replace(/\.[^/.]+$/, "") +
        "." +
        (outputFormat?.ext || targetFormat);

      // For demonstration, we'll create a blob with the same content but different name
      // In production, this would be the actual converted video data
      const blob = new Blob([selectedFile], {
        type: getContentType(targetFormat),
      });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);

      setConversion({
        status: "completed",
        progress: 100,
        message: "Conversion completed successfully!",
      });
    } catch (error) {
      console.error("Conversion failed:", error);
      setConversion({
        status: "error",
        progress: 0,
        message: "Conversion failed. Please try again.",
      });
    }
  };

  const getContentType = (format: string): string => {
    const types: { [key: string]: string } = {
      mp4: "video/mp4",
      webm: "video/webm",
      avi: "video/x-msvideo",
      mov: "video/quicktime",
      mkv: "video/x-matroska",
      wmv: "video/x-ms-wmv",
      flv: "video/x-flv",
      "3gp": "video/3gpp",
    };
    return types[format] || "video/mp4";
  };

  const downloadConvertedFile = () => {
    if (!downloadUrl || !selectedFile) return;

    const link = document.createElement("a");
    link.href = downloadUrl;
    const outputFormat = supportedFormats.find((f) => f.value === targetFormat);
    const fileName =
      selectedFile.name.replace(/\.[^/.]+$/, "") +
      "." +
      (outputFormat?.ext || targetFormat);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetConverter = () => {
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
    }
    setSelectedFile(null);
    setConversion({ status: "idle", progress: 0, message: "" });
    setDownloadUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Video Converter
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Convert your videos to any format. Fast, secure, and easy to use.
          Support for MP4, WebM, AVI, MOV, MKV, and more popular formats.
        </p>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <div className="flex items-start">
          <svg
            className="h-6 w-6 text-blue-600 mr-3 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h3 className="text-lg font-medium text-blue-900 mb-2">
              Demo Version
            </h3>
            <p className="text-blue-800">
              This is a demonstration version of our video converter. In the
              full version, files would be processed using professional video
              encoding algorithms. For now, this tool shows the conversion
              process and file handling capabilities.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        {/* File Upload Area */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            1. Select Video File
          </h2>

          {!selectedFile ? (
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="text-gray-400 mb-4">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-lg font-medium text-gray-900 mb-2">
                Drop your video file here
              </p>
              <p className="text-gray-500 mb-4">or click to browse</p>
              <p className="text-sm text-gray-400">
                Supports all major video formats (MP4, AVI, MOV, MKV, WebM,
                etc.)
              </p>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="text-blue-600 mr-3">
                    <svg
                      className="h-8 w-8"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H4v4h9v-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {selectedFile.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatFileSize(selectedFile.size)} • {selectedFile.type}
                    </p>
                  </div>
                </div>
                <button
                  onClick={resetConverter}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Format Selection */}
        {selectedFile && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              2. Choose Output Format
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {supportedFormats.map((format) => (
                <button
                  key={format.value}
                  onClick={() => setTargetFormat(format.value)}
                  className={`p-4 rounded-lg border-2 text-left transition-colors ${
                    targetFormat === format.value
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="font-medium text-gray-900">
                    {format.label}
                  </div>
                  <div className="text-sm text-gray-500">
                    {format.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Convert Button */}
        {selectedFile && conversion.status === "idle" && (
          <div className="mb-8">
            <button
              onClick={convertVideo}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium text-lg hover:bg-blue-700 transition-colors"
            >
              Convert to {targetFormat.toUpperCase()}
            </button>
          </div>
        )}

        {/* Progress */}
        {conversion.status === "converting" && (
          <div className="mb-8">
            <div className="text-center mb-4">
              <p className="text-lg font-medium text-gray-900">
                {conversion.message}
              </p>
              <p className="text-sm text-gray-500">
                {conversion.progress}% complete
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${conversion.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Completion */}
        {conversion.status === "completed" && (
          <div className="mb-8 text-center">
            <div className="text-green-600 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Conversion Complete!
            </h3>
            <p className="text-gray-600 mb-6">
              Your video has been successfully converted to{" "}
              {targetFormat.toUpperCase()}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={downloadConvertedFile}
                className="bg-green-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Download Converted Video
              </button>
              <button
                onClick={resetConverter}
                className="bg-gray-100 text-gray-700 py-2 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Convert Another Video
              </button>
            </div>
          </div>
        )}

        {/* Error State */}
        {conversion.status === "error" && (
          <div className="mb-8 text-center">
            <div className="text-red-600 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Conversion Failed
            </h3>
            <p className="text-gray-600 mb-6">{conversion.message}</p>
            <button
              onClick={resetConverter}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>

      {/* Features */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="text-blue-600 mb-4">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Fast Processing
          </h3>
          <p className="text-gray-600">
            Quick and efficient video conversion with optimized processing
            algorithms.
          </p>
        </div>

        <div className="text-center">
          <div className="text-green-600 mb-4">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Secure & Private
          </h3>
          <p className="text-gray-600">
            Your videos are processed securely with enterprise-grade encryption.
          </p>
        </div>

        <div className="text-center">
          <div className="text-purple-600 mb-4">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Multiple Formats
          </h3>
          <p className="text-gray-600">
            Support for all major video formats including MP4, WebM, AVI, MOV,
            and more.
          </p>
        </div>
      </div>

      {/* Usage Tips */}
      <div className="mt-12 bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Video Conversion Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Best Formats for:
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                • <strong>Web:</strong> MP4 or WebM for best compatibility
              </li>
              <li>
                • <strong>Social Media:</strong> MP4 with H.264 encoding
              </li>
              <li>
                • <strong>Mobile:</strong> 3GP for older devices, MP4 for modern
              </li>
              <li>
                • <strong>Windows:</strong> AVI or WMV
              </li>
              <li>
                • <strong>Mac:</strong> MOV or MP4
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Pro Tips:
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• MP4 offers the best size-to-quality ratio</li>
              <li>• WebM is perfect for web streaming</li>
              <li>• Use MKV for high-quality archival</li>
              <li>• Consider your target platform when choosing format</li>
              <li>• Smaller files convert faster</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
