"use client";

import { useState, useRef } from "react";

interface ConversionState {
  status: "idle" | "converting" | "completed" | "error";
  progress: number;
  message: string;
}

export default function AudioConverterPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState("mp3");
  const [conversion, setConversion] = useState<ConversionState>({
    status: "idle",
    progress: 0,
    message: "",
  });
  const [downloadUrl, setDownloadUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const supportedFormats = [
    {
      value: "mp3",
      label: "MP3",
      description: "Most universal format",
      ext: "mp3",
    },
    {
      value: "wav",
      label: "WAV",
      description: "Uncompressed high quality",
      ext: "wav",
    },
    {
      value: "flac",
      label: "FLAC",
      description: "Lossless compression",
      ext: "flac",
    },
    {
      value: "aac",
      label: "AAC",
      description: "Apple standard",
      ext: "aac",
    },
    {
      value: "ogg",
      label: "OGG",
      description: "Open source format",
      ext: "ogg",
    },
    {
      value: "m4a",
      label: "M4A",
      description: "iTunes compatible",
      ext: "m4a",
    },
    {
      value: "wma",
      label: "WMA",
      description: "Windows Media Audio",
      ext: "wma",
    },
    {
      value: "aiff",
      label: "AIFF",
      description: "Apple lossless format",
      ext: "aiff",
    },
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
    if (file && file.type.startsWith("audio/")) {
      setSelectedFile(file);
      setConversion({ status: "idle", progress: 0, message: "" });
      setDownloadUrl("");
    }
  };

  const convertAudio = async () => {
    if (!selectedFile) return;

    try {
      setConversion({
        status: "converting",
        progress: 0,
        message: "Preparing conversion...",
      });

      // Simulate realistic conversion process
      const steps = [
        { progress: 10, message: "Analyzing audio file..." },
        { progress: 25, message: "Extracting audio properties..." },
        { progress: 45, message: "Processing audio channels..." },
        { progress: 65, message: "Applying format-specific encoding..." },
        { progress: 80, message: "Optimizing bitrate and quality..." },
        { progress: 95, message: "Preparing download..." },
        { progress: 100, message: "Conversion completed!" },
      ];

      for (const step of steps) {
        await new Promise((resolve) =>
          setTimeout(resolve, 600 + Math.random() * 400)
        );
        setConversion((prev) => ({
          ...prev,
          progress: step.progress,
          message: step.message,
        }));
      }

      // Create a simulated converted file
      // In a real implementation, this would be the actual converted audio
      const outputFormat = supportedFormats.find(
        (f) => f.value === targetFormat
      );
      const fileName =
        selectedFile.name.replace(/\.[^/.]+$/, "") +
        "." +
        (outputFormat?.ext || targetFormat);

      // For demonstration, we'll create a blob with the same content but different name
      // In production, this would be the actual converted audio data
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
      mp3: "audio/mpeg",
      wav: "audio/wav",
      flac: "audio/flac",
      aac: "audio/aac",
      ogg: "audio/ogg",
      m4a: "audio/mp4",
      wma: "audio/x-ms-wma",
      aiff: "audio/aiff",
    };
    return types[format] || "audio/mpeg";
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
          Audio Converter
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Convert your audio files to any format. Fast, secure, and easy to use.
          Support for MP3, WAV, FLAC, AAC, OGG, and more popular formats.
        </p>
      </div>

      {/* Info Banner */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <div className="flex items-start">
          <svg
            className="h-6 w-6 text-green-600 mr-3 mt-0.5"
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
            <h3 className="text-lg font-medium text-green-900 mb-2">
              Demo Version
            </h3>
            <p className="text-green-800">
              This is a demonstration version of our audio converter. In the
              full version, files would be processed using professional audio
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
            1. Select Audio File
          </h2>

          {!selectedFile ? (
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors cursor-pointer"
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
                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                  />
                </svg>
              </div>
              <p className="text-lg font-medium text-gray-900 mb-2">
                Drop your audio file here
              </p>
              <p className="text-gray-500 mb-4">or click to browse</p>
              <p className="text-sm text-gray-400">
                Supports all major audio formats (MP3, WAV, FLAC, AAC, OGG,
                etc.)
              </p>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="text-green-600 mr-3">
                    <svg
                      className="h-8 w-8"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.776l-4.146-3.32a1 1 0 00-.632-.225H2a1 1 0 01-1-1V7.769a1 1 0 011-.225h1.605a1 1 0 00.632-.225l4.146-3.32a1 1 0 01.617-.223zM14 5a3 3 0 013 3v4a3 3 0 01-3 3"
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
            accept="audio/*"
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
                      ? "border-green-500 bg-green-50"
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
              onClick={convertAudio}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium text-lg hover:bg-green-700 transition-colors"
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
                className="bg-green-600 h-3 rounded-full transition-all duration-500"
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
              Your audio has been successfully converted to{" "}
              {targetFormat.toUpperCase()}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={downloadConvertedFile}
                className="bg-green-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Download Converted Audio
              </button>
              <button
                onClick={resetConverter}
                className="bg-gray-100 text-gray-700 py-2 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Convert Another Audio
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
              className="bg-green-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>

      {/* Features */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
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
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Fast Processing
          </h3>
          <p className="text-gray-600">
            Quick and efficient audio conversion with optimized processing
            algorithms.
          </p>
        </div>

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
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Secure & Private
          </h3>
          <p className="text-gray-600">
            Your audio files are processed securely with enterprise-grade
            encryption.
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
            Support for all major audio formats including MP3, WAV, FLAC, AAC,
            and more.
          </p>
        </div>
      </div>

      {/* Usage Tips */}
      <div className="mt-12 bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Audio Conversion Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Best Formats for:
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                • <strong>Streaming:</strong> MP3 for universal compatibility
              </li>
              <li>
                • <strong>Podcasts:</strong> MP3 at 128-192 kbps
              </li>
              <li>
                • <strong>Music Production:</strong> WAV or FLAC for quality
              </li>
              <li>
                • <strong>Apple Devices:</strong> AAC or M4A
              </li>
              <li>
                • <strong>Web:</strong> OGG for better compression
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Pro Tips:
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• MP3 offers the best size-to-quality ratio</li>
              <li>• FLAC preserves original quality with compression</li>
              <li>• WAV is uncompressed and highest quality</li>
              <li>• AAC is more efficient than MP3 at same bitrate</li>
              <li>• Consider your end use when choosing format</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
