"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface ImageState {
  originalImage: HTMLImageElement | null;
  canvas: HTMLCanvasElement | null;
  history: ImageData[];
  historyIndex: number;
}

interface FilterSettings {
  brightness: number;
  contrast: number;
  saturation: number;
  hue: number;
  blur: number;
  sepia: number;
  grayscale: number;
  invert: number;
  opacity: number;
}

interface CropSettings {
  x: number;
  y: number;
  width: number;
  height: number;
  isActive: boolean;
}

interface TextOverlay {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
  fontFamily: string;
  bold: boolean;
  italic: boolean;
}

interface ResizeSettings {
  width: number;
  height: number;
  maintainAspectRatio: boolean;
  originalWidth: number;
  originalHeight: number;
}

export default function ImageEditorPage() {
  const [imageState, setImageState] = useState<ImageState>({
    originalImage: null,
    canvas: null,
    history: [],
    historyIndex: -1,
  });

  const [filters, setFilters] = useState<FilterSettings>({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hue: 0,
    blur: 0,
    sepia: 0,
    grayscale: 0,
    invert: 0,
    opacity: 100,
  });

  const [cropSettings, setCropSettings] = useState<CropSettings>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    isActive: false,
  });

  const [textOverlays, setTextOverlays] = useState<TextOverlay[]>([]);
  const [activeTextOverlay, setActiveTextOverlay] = useState<string | null>(
    null
  );

  const [resizeSettings, setResizeSettings] = useState<ResizeSettings>({
    width: 0,
    height: 0,
    maintainAspectRatio: true,
    originalWidth: 0,
    originalHeight: 0,
  });

  const [activeTab, setActiveTab] = useState<
    "filters" | "crop" | "resize" | "text" | "effects"
  >("filters");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  // Preset filters
  const presetFilters = [
    {
      name: "Original",
      filters: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        hue: 0,
        blur: 0,
        sepia: 0,
        grayscale: 0,
        invert: 0,
        opacity: 100,
      },
    },
    {
      name: "Vintage",
      filters: {
        brightness: 95,
        contrast: 110,
        saturation: 80,
        hue: 15,
        blur: 0,
        sepia: 30,
        grayscale: 0,
        invert: 0,
        opacity: 100,
      },
    },
    {
      name: "Black & White",
      filters: {
        brightness: 100,
        contrast: 110,
        saturation: 0,
        hue: 0,
        blur: 0,
        sepia: 0,
        grayscale: 100,
        invert: 0,
        opacity: 100,
      },
    },
    {
      name: "High Contrast",
      filters: {
        brightness: 105,
        contrast: 150,
        saturation: 120,
        hue: 0,
        blur: 0,
        sepia: 0,
        grayscale: 0,
        invert: 0,
        opacity: 100,
      },
    },
    {
      name: "Warm",
      filters: {
        brightness: 105,
        contrast: 105,
        saturation: 110,
        hue: 10,
        blur: 0,
        sepia: 15,
        grayscale: 0,
        invert: 0,
        opacity: 100,
      },
    },
    {
      name: "Cool",
      filters: {
        brightness: 100,
        contrast: 105,
        saturation: 110,
        hue: -10,
        blur: 0,
        sepia: 0,
        grayscale: 0,
        invert: 0,
        opacity: 100,
      },
    },
    {
      name: "Dramatic",
      filters: {
        brightness: 90,
        contrast: 140,
        saturation: 130,
        hue: 0,
        blur: 0,
        sepia: 0,
        grayscale: 0,
        invert: 0,
        opacity: 100,
      },
    },
    {
      name: "Soft",
      filters: {
        brightness: 110,
        contrast: 90,
        saturation: 90,
        hue: 0,
        blur: 1,
        sepia: 0,
        grayscale: 0,
        invert: 0,
        opacity: 100,
      },
    },
  ];

  // Handle image processing
  const processImageFile = useCallback((file: File) => {
    console.log("Processing file:", file.name, file.type);

    if (file && file.type.startsWith("image/")) {
      const img = new Image();
      img.onload = () => {
        console.log("Image loaded successfully:", img.width, "x", img.height);
        const canvas = canvasRef.current;
        if (canvas) {
          // Set canvas dimensions
          canvas.width = img.width;
          canvas.height = img.height;
          console.log(
            "Canvas dimensions set:",
            canvas.width,
            "x",
            canvas.height
          );

          const ctx = canvas.getContext("2d");
          if (ctx) {
            // Clear any existing content
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Draw the image
            ctx.drawImage(img, 0, 0);
            console.log("Image drawn to canvas");

            setImageState({
              originalImage: img,
              canvas,
              history: [ctx.getImageData(0, 0, canvas.width, canvas.height)],
              historyIndex: 0,
            });

            setResizeSettings({
              width: img.width,
              height: img.height,
              maintainAspectRatio: true,
              originalWidth: img.width,
              originalHeight: img.height,
            });

            setCropSettings({
              x: 0,
              y: 0,
              width: img.width,
              height: img.height,
              isActive: false,
            });

            // Reset filters to default
            setFilters({
              brightness: 100,
              contrast: 100,
              saturation: 100,
              hue: 0,
              blur: 0,
              sepia: 0,
              grayscale: 0,
              invert: 0,
              opacity: 100,
            });

            // Clear any existing text overlays
            setTextOverlays([]);
            setActiveTextOverlay(null);

            console.log("Image processing completed");
          } else {
            console.error("Failed to get canvas context");
          }
        } else {
          console.error("Canvas ref is null");
        }
        // Clean up the object URL
        URL.revokeObjectURL(img.src);
      };

      img.onerror = (error) => {
        console.error("Failed to load image:", error);
        alert("Failed to load image. Please try a different file.");
        URL.revokeObjectURL(img.src);
      };

      img.src = URL.createObjectURL(file);
      console.log("Image src set, loading...");
    } else {
      console.error("Invalid file type:", file.type);
      alert("Please select a valid image file (JPG, PNG, GIF, WebP)");
    }
  }, []);

  // Load image from file input
  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        processImageFile(file);
      }
    },
    [processImageFile]
  );

  // Sync preview canvas with main canvas
  const updatePreviewCanvas = useCallback(() => {
    if (!imageState.originalImage || !previewCanvasRef.current) return;

    const previewCanvas = previewCanvasRef.current;
    const ctx = previewCanvas.getContext("2d");
    if (!ctx) return;

    previewCanvas.width = imageState.originalImage.width;
    previewCanvas.height = imageState.originalImage.height;

    ctx.filter = `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturation}%) hue-rotate(${filters.hue}deg) blur(${filters.blur}px) sepia(${filters.sepia}%) grayscale(${filters.grayscale}%) invert(${filters.invert}%) opacity(${filters.opacity}%)`;
    ctx.drawImage(imageState.originalImage, 0, 0);
  }, [imageState.originalImage, filters]);

  // Apply filters to canvas
  const applyFilters = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageState.originalImage) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas and redraw original image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.filter = `
      brightness(${filters.brightness}%)
      contrast(${filters.contrast}%)
      saturate(${filters.saturation}%)
      hue-rotate(${filters.hue}deg)
      blur(${filters.blur}px)
      sepia(${filters.sepia}%)
      grayscale(${filters.grayscale}%)
      invert(${filters.invert}%)
      opacity(${filters.opacity}%)
    `;

    ctx.drawImage(imageState.originalImage, 0, 0);

    // Reset filter for text overlays
    ctx.filter = "none";

    // Draw text overlays
    textOverlays.forEach((overlay) => {
      ctx.save();
      ctx.font = `${overlay.bold ? "bold" : "normal"} ${
        overlay.italic ? "italic" : "normal"
      } ${overlay.fontSize}px ${overlay.fontFamily}`;
      ctx.fillStyle = overlay.color;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText(overlay.text, overlay.x, overlay.y);
      ctx.restore();
    });
  }, [filters, imageState.originalImage, textOverlays]);

  // Save current state to history
  const saveToHistory = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const newHistory = imageState.history.slice(0, imageState.historyIndex + 1);
    newHistory.push(imageData);

    setImageState((prev) => ({
      ...prev,
      history: newHistory,
      historyIndex: newHistory.length - 1,
    }));
  }, [imageState.history, imageState.historyIndex]);

  // Undo
  const undo = useCallback(() => {
    if (imageState.historyIndex > 0) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const prevIndex = imageState.historyIndex - 1;
      const imageData = imageState.history[prevIndex];
      ctx.putImageData(imageData, 0, 0);

      setImageState((prev) => ({
        ...prev,
        historyIndex: prevIndex,
      }));

      // Update preview canvas
      updatePreviewCanvas();
    }
  }, [imageState.history, imageState.historyIndex, updatePreviewCanvas]);

  // Redo
  const redo = useCallback(() => {
    if (imageState.historyIndex < imageState.history.length - 1) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const nextIndex = imageState.historyIndex + 1;
      const imageData = imageState.history[nextIndex];
      ctx.putImageData(imageData, 0, 0);

      setImageState((prev) => ({
        ...prev,
        historyIndex: nextIndex,
      }));

      // Update preview canvas
      updatePreviewCanvas();
    }
  }, [imageState.history, imageState.historyIndex, updatePreviewCanvas]);

  // Apply crop
  const applyCrop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !cropSettings.isActive) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Get cropped image data
    const croppedData = ctx.getImageData(
      cropSettings.x,
      cropSettings.y,
      cropSettings.width,
      cropSettings.height
    );

    // Resize canvas
    canvas.width = cropSettings.width;
    canvas.height = cropSettings.height;

    // Draw cropped image
    ctx.putImageData(croppedData, 0, 0);

    setCropSettings((prev) => ({ ...prev, isActive: false }));

    // Update preview canvas
    updatePreviewCanvas();

    saveToHistory();
  }, [cropSettings, saveToHistory, updatePreviewCanvas]);

  // Apply resize
  const applyResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Get current image data
    const currentImageData = ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return;
    tempCtx.putImageData(currentImageData, 0, 0);

    // Resize canvas
    canvas.width = resizeSettings.width;
    canvas.height = resizeSettings.height;

    // Draw resized image
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(
      tempCanvas,
      0,
      0,
      resizeSettings.width,
      resizeSettings.height
    );

    // Update preview canvas
    updatePreviewCanvas();

    saveToHistory();
  }, [resizeSettings, saveToHistory, updatePreviewCanvas]);

  // Add text overlay
  const addTextOverlay = useCallback(() => {
    const newOverlay: TextOverlay = {
      id: Date.now().toString(),
      text: "Your Text Here",
      x: 50,
      y: 50,
      fontSize: 32,
      color: "#ffffff",
      fontFamily: "Arial",
      bold: false,
      italic: false,
    };

    setTextOverlays((prev) => [...prev, newOverlay]);
    setActiveTextOverlay(newOverlay.id);
  }, []);

  // Update text overlay
  const updateTextOverlay = useCallback(
    (id: string, updates: Partial<TextOverlay>) => {
      setTextOverlays((prev) =>
        prev.map((overlay) =>
          overlay.id === id ? { ...overlay, ...updates } : overlay
        )
      );
    },
    []
  );

  // Remove text overlay
  const removeTextOverlay = useCallback((id: string) => {
    setTextOverlays((prev) => prev.filter((overlay) => overlay.id !== id));
    setActiveTextOverlay(null);
  }, []);

  // Download image
  const downloadImage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = canvas.toDataURL();
    link.click();
  }, []);

  // Reset all settings
  const resetAll = useCallback(() => {
    if (!imageState.originalImage) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Reset canvas size
    canvas.width = imageState.originalImage.width;
    canvas.height = imageState.originalImage.height;

    // Reset filters
    setFilters({
      brightness: 100,
      contrast: 100,
      saturation: 100,
      hue: 0,
      blur: 0,
      sepia: 0,
      grayscale: 0,
      invert: 0,
      opacity: 100,
    });

    // Clear text overlays
    setTextOverlays([]);
    setActiveTextOverlay(null);

    // Reset crop
    setCropSettings({
      x: 0,
      y: 0,
      width: imageState.originalImage.width,
      height: imageState.originalImage.height,
      isActive: false,
    });

    // Reset resize
    setResizeSettings({
      width: imageState.originalImage.width,
      height: imageState.originalImage.height,
      maintainAspectRatio: true,
      originalWidth: imageState.originalImage.width,
      originalHeight: imageState.originalImage.height,
    });

    // Redraw original image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.filter = "none";
    ctx.drawImage(imageState.originalImage, 0, 0);

    saveToHistory();
  }, [imageState.originalImage, saveToHistory]);

  // Update resize dimensions with aspect ratio
  const updateResizeDimensions = useCallback(
    (dimension: "width" | "height", value: number) => {
      setResizeSettings((prev) => {
        if (prev.maintainAspectRatio) {
          const aspectRatio = prev.originalWidth / prev.originalHeight;
          if (dimension === "width") {
            return {
              ...prev,
              width: value,
              height: Math.round(value / aspectRatio),
            };
          } else {
            return {
              ...prev,
              width: Math.round(value * aspectRatio),
              height: value,
            };
          }
        } else {
          return {
            ...prev,
            [dimension]: value,
          };
        }
      });
    },
    []
  );

  // Apply filters when they change
  useEffect(() => {
    if (imageState.originalImage) {
      applyFilters();
    }
  }, [filters, applyFilters, imageState.originalImage]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Image Editor</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Professional-grade image editing in your browser. Apply filters, crop,
          resize, add text, and more.
        </p>
      </div>

      {/* Upload Section */}
      {!imageState.originalImage && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <div className="text-center">
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-400 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file) {
                  processImageFile(file);
                }
              }}
            >
              <svg
                className="mx-auto h-12 w-12 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-lg font-medium text-gray-900 mb-2">
                Upload an image to start editing
              </p>
              <p className="text-gray-500">Drag and drop or click to select</p>
              <p className="text-sm text-gray-400 mt-2">
                Supports JPG, PNG, GIF, WebP
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </div>
      )}

      {/* Canvas Area - Always visible for image processing */}
      <div className="mb-8">
        <canvas
          ref={canvasRef}
          className="hidden"
          style={{ display: "none" }}
        />
      </div>

      {/* Editor Interface */}
      {imageState.originalImage && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Controls Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={undo}
                  disabled={imageState.historyIndex <= 0}
                  className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-md"
                >
                  Undo
                </button>
                <button
                  onClick={redo}
                  disabled={
                    imageState.historyIndex >= imageState.history.length - 1
                  }
                  className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-md"
                >
                  Redo
                </button>
                <button
                  onClick={resetAll}
                  className="px-3 py-2 text-sm bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-md"
                >
                  Reset
                </button>
                <button
                  onClick={downloadImage}
                  className="px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                >
                  Download
                </button>
              </div>

              {/* Tabs */}
              <div className="flex flex-wrap gap-1 mb-6 border-b">
                {(
                  ["filters", "crop", "resize", "text", "effects"] as const
                ).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-2 text-sm font-medium capitalize rounded-t-md ${
                      activeTab === tab
                        ? "bg-blue-100 text-blue-700 border-b-2 border-blue-700"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === "filters" && (
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Preset Filters</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {presetFilters.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => setFilters(preset.filters)}
                        className="p-2 text-xs bg-gray-100 hover:bg-gray-200 rounded-md text-center"
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>

                  <h3 className="font-medium text-gray-900 mt-6">
                    Custom Adjustments
                  </h3>
                  {Object.entries(filters).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                        {key}: {value}
                        {key === "hue"
                          ? "°"
                          : key.includes("blur")
                          ? "px"
                          : "%"}
                      </label>
                      <input
                        type="range"
                        min={key === "hue" ? -180 : key === "blur" ? 0 : 0}
                        max={key === "hue" ? 180 : key === "blur" ? 10 : 200}
                        value={value}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            [key]: Number(e.target.value),
                          }))
                        }
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "crop" && (
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Crop Settings</h3>
                  <button
                    onClick={() =>
                      setCropSettings((prev) => ({
                        ...prev,
                        isActive: !prev.isActive,
                      }))
                    }
                    className={`w-full px-4 py-2 rounded-md font-medium ${
                      cropSettings.isActive
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-gray-600 hover:bg-gray-700 text-white"
                    }`}
                  >
                    {cropSettings.isActive
                      ? "✓ Crop Mode Active - Click Image to Position"
                      : "Enable Crop Mode"}
                  </button>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        X Position
                      </label>
                      <input
                        type="number"
                        value={cropSettings.x}
                        onChange={(e) =>
                          setCropSettings((prev) => ({
                            ...prev,
                            x: Number(e.target.value),
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Y Position
                      </label>
                      <input
                        type="number"
                        value={cropSettings.y}
                        onChange={(e) =>
                          setCropSettings((prev) => ({
                            ...prev,
                            y: Number(e.target.value),
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Width
                      </label>
                      <input
                        type="number"
                        value={cropSettings.width}
                        onChange={(e) =>
                          setCropSettings((prev) => ({
                            ...prev,
                            width: Number(e.target.value),
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Height
                      </label>
                      <input
                        type="number"
                        value={cropSettings.height}
                        onChange={(e) =>
                          setCropSettings((prev) => ({
                            ...prev,
                            height: Number(e.target.value),
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                  </div>
                  <button
                    onClick={applyCrop}
                    className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                  >
                    Apply Crop
                  </button>
                </div>
              )}

              {activeTab === "resize" && (
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Resize Image</h3>
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id="aspectRatio"
                      checked={resizeSettings.maintainAspectRatio}
                      onChange={(e) =>
                        setResizeSettings((prev) => ({
                          ...prev,
                          maintainAspectRatio: e.target.checked,
                        }))
                      }
                      className="mr-2"
                    />
                    <label
                      htmlFor="aspectRatio"
                      className="text-sm font-medium text-gray-700"
                    >
                      Maintain aspect ratio
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Width
                      </label>
                      <input
                        type="number"
                        value={resizeSettings.width}
                        onChange={(e) =>
                          updateResizeDimensions(
                            "width",
                            Number(e.target.value)
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Height
                      </label>
                      <input
                        type="number"
                        value={resizeSettings.height}
                        onChange={(e) =>
                          updateResizeDimensions(
                            "height",
                            Number(e.target.value)
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                  </div>
                  <button
                    onClick={applyResize}
                    className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                  >
                    Apply Resize
                  </button>
                </div>
              )}

              {activeTab === "text" && (
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Text Overlays</h3>
                  <button
                    onClick={addTextOverlay}
                    className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
                  >
                    Add Text
                  </button>

                  {textOverlays.map((overlay) => (
                    <div
                      key={overlay.id}
                      className={`p-3 border rounded-md ${
                        activeTextOverlay === overlay.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Text Layer</span>
                        <button
                          onClick={() => removeTextOverlay(overlay.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="space-y-2">
                        <input
                          type="text"
                          value={overlay.text}
                          onChange={(e) =>
                            updateTextOverlay(overlay.id, {
                              text: e.target.value,
                            })
                          }
                          placeholder="Enter text"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />

                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="number"
                            value={overlay.x}
                            onChange={(e) =>
                              updateTextOverlay(overlay.id, {
                                x: Number(e.target.value),
                              })
                            }
                            placeholder="X position"
                            className="px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                          <input
                            type="number"
                            value={overlay.y}
                            onChange={(e) =>
                              updateTextOverlay(overlay.id, {
                                y: Number(e.target.value),
                              })
                            }
                            placeholder="Y position"
                            className="px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="number"
                            value={overlay.fontSize}
                            onChange={(e) =>
                              updateTextOverlay(overlay.id, {
                                fontSize: Number(e.target.value),
                              })
                            }
                            placeholder="Font size"
                            className="px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                          <input
                            type="color"
                            value={overlay.color}
                            onChange={(e) =>
                              updateTextOverlay(overlay.id, {
                                color: e.target.value,
                              })
                            }
                            className="px-2 py-1 border border-gray-300 rounded"
                          />
                        </div>

                        <select
                          value={overlay.fontFamily}
                          onChange={(e) =>
                            updateTextOverlay(overlay.id, {
                              fontFamily: e.target.value,
                            })
                          }
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        >
                          <option value="Arial">Arial</option>
                          <option value="Helvetica">Helvetica</option>
                          <option value="Times New Roman">
                            Times New Roman
                          </option>
                          <option value="Georgia">Georgia</option>
                          <option value="Verdana">Verdana</option>
                        </select>

                        <div className="flex gap-2">
                          <label className="flex items-center text-sm">
                            <input
                              type="checkbox"
                              checked={overlay.bold}
                              onChange={(e) =>
                                updateTextOverlay(overlay.id, {
                                  bold: e.target.checked,
                                })
                              }
                              className="mr-1"
                            />
                            Bold
                          </label>
                          <label className="flex items-center text-sm">
                            <input
                              type="checkbox"
                              checked={overlay.italic}
                              onChange={(e) =>
                                updateTextOverlay(overlay.id, {
                                  italic: e.target.checked,
                                })
                              }
                              className="mr-1"
                            />
                            Italic
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "effects" && (
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Special Effects</h3>
                  <button
                    onClick={() => {
                      const canvas = canvasRef.current;
                      if (!canvas) return;
                      const ctx = canvas.getContext("2d");
                      if (!ctx) return;

                      // Apply emboss effect (3x3 emboss kernel)
                      const imageData = ctx.getImageData(
                        0,
                        0,
                        canvas.width,
                        canvas.height
                      );
                      const data = imageData.data;
                      const width = canvas.width;
                      const height = canvas.height;
                      const output = new Uint8ClampedArray(data);

                      // Emboss kernel
                      const kernel = [
                        [-2, -1, 0],
                        [-1, 1, 1],
                        [0, 1, 2],
                      ];

                      for (let y = 1; y < height - 1; y++) {
                        for (let x = 1; x < width - 1; x++) {
                          let r = 0,
                            g = 0,
                            b = 0;

                          for (let ky = -1; ky <= 1; ky++) {
                            for (let kx = -1; kx <= 1; kx++) {
                              const idx = ((y + ky) * width + (x + kx)) * 4;
                              const weight = kernel[ky + 1][kx + 1];
                              r += data[idx] * weight;
                              g += data[idx + 1] * weight;
                              b += data[idx + 2] * weight;
                            }
                          }

                          const idx = (y * width + x) * 4;
                          output[idx] = Math.max(0, Math.min(255, r + 128));
                          output[idx + 1] = Math.max(0, Math.min(255, g + 128));
                          output[idx + 2] = Math.max(0, Math.min(255, b + 128));
                        }
                      }

                      const newImageData = new ImageData(output, width, height);
                      ctx.putImageData(newImageData, 0, 0);

                      // Update preview canvas
                      updatePreviewCanvas();

                      saveToHistory();
                    }}
                    className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md"
                  >
                    Apply Emboss
                  </button>

                  <button
                    onClick={() => {
                      const canvas = canvasRef.current;
                      if (!canvas) return;
                      const ctx = canvas.getContext("2d");
                      if (!ctx) return;

                      // Get current image data
                      const imageData = ctx.getImageData(
                        0,
                        0,
                        canvas.width,
                        canvas.height
                      );

                      // Create temporary canvas
                      const tempCanvas = document.createElement("canvas");
                      tempCanvas.width = canvas.width;
                      tempCanvas.height = canvas.height;
                      const tempCtx = tempCanvas.getContext("2d");
                      if (!tempCtx) return;

                      tempCtx.putImageData(imageData, 0, 0);

                      // Clear and flip horizontally
                      ctx.clearRect(0, 0, canvas.width, canvas.height);
                      ctx.save();
                      ctx.scale(-1, 1);
                      ctx.drawImage(tempCanvas, -canvas.width, 0);
                      ctx.restore();

                      // Update preview canvas
                      updatePreviewCanvas();

                      saveToHistory();
                    }}
                    className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
                  >
                    Flip Horizontal
                  </button>

                  <button
                    onClick={() => {
                      const canvas = canvasRef.current;
                      if (!canvas) return;
                      const ctx = canvas.getContext("2d");
                      if (!ctx) return;

                      // Get current image data
                      const imageData = ctx.getImageData(
                        0,
                        0,
                        canvas.width,
                        canvas.height
                      );

                      // Create temporary canvas
                      const tempCanvas = document.createElement("canvas");
                      tempCanvas.width = canvas.width;
                      tempCanvas.height = canvas.height;
                      const tempCtx = tempCanvas.getContext("2d");
                      if (!tempCtx) return;

                      tempCtx.putImageData(imageData, 0, 0);

                      // Clear and flip vertically
                      ctx.clearRect(0, 0, canvas.width, canvas.height);
                      ctx.save();
                      ctx.scale(1, -1);
                      ctx.drawImage(tempCanvas, 0, -canvas.height);
                      ctx.restore();

                      // Update preview canvas
                      updatePreviewCanvas();

                      saveToHistory();
                    }}
                    className="w-full px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md"
                  >
                    Flip Vertical
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Canvas Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Preview</h3>
                <div className="text-sm text-gray-500">
                  {canvasRef.current?.width} × {canvasRef.current?.height}{" "}
                  pixels
                </div>
              </div>

              <div
                className="relative inline-block max-w-full border border-gray-300 rounded-lg overflow-hidden bg-gray-50"
                style={{
                  background:
                    "url(\"data:image/svg+xml,%3csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='a' patternUnits='userSpaceOnUse' width='20' height='20'%3e%3crect width='10' height='10' fill='%23f3f4f6'/%3e%3crect x='10' y='10' width='10' height='10' fill='%23f3f4f6'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23a)'/%3e%3c/svg%3e\")",
                }}
              >
                <canvas
                  ref={previewCanvasRef}
                  className="block max-w-full h-auto"
                  style={{
                    maxHeight: "500px",
                    objectFit: "contain",
                  }}
                  onClick={(e) => {
                    if (cropSettings.isActive) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const canvas = previewCanvasRef.current;
                      if (!canvas) return;

                      const scaleX = canvas.width / rect.width;
                      const scaleY = canvas.height / rect.height;

                      const x = (e.clientX - rect.left) * scaleX;
                      const y = (e.clientY - rect.top) * scaleY;

                      setCropSettings((prev) => ({
                        ...prev,
                        x: Math.max(0, Math.min(x - 50, canvas.width - 100)),
                        y: Math.max(0, Math.min(y - 50, canvas.height - 100)),
                        width: Math.min(100, canvas.width),
                        height: Math.min(100, canvas.height),
                      }));
                    }
                  }}
                />

                {/* Crop overlay */}
                {cropSettings.isActive && previewCanvasRef.current && (
                  <div
                    className="absolute border-2 border-blue-500 bg-blue-500 bg-opacity-20 pointer-events-none"
                    style={{
                      left: `${
                        (cropSettings.x / previewCanvasRef.current.width) * 100
                      }%`,
                      top: `${
                        (cropSettings.y / previewCanvasRef.current.height) * 100
                      }%`,
                      width: `${
                        (cropSettings.width / previewCanvasRef.current.width) *
                        100
                      }%`,
                      height: `${
                        (cropSettings.height /
                          previewCanvasRef.current.height) *
                        100
                      }%`,
                    }}
                  >
                    <div className="absolute -top-6 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                      {cropSettings.width} × {cropSettings.height}
                    </div>
                  </div>
                )}
              </div>

              {/* Image Info */}
              <div className="mt-4 text-sm text-gray-600">
                <p>
                  Original: {resizeSettings.originalWidth} ×{" "}
                  {resizeSettings.originalHeight} pixels
                </p>
                <p>
                  Current: {canvasRef.current?.width} ×{" "}
                  {canvasRef.current?.height} pixels
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Features Section */}
      <div className="mt-16 bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Image Editor Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">
              Advanced Filters
            </h3>
            <p className="text-gray-600 text-sm">
              Apply professional filters including brightness, contrast,
              saturation, hue, blur, and special effects.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">
              Precision Cropping
            </h3>
            <p className="text-gray-600 text-sm">
              Crop your images with pixel-perfect precision using our intuitive
              cropping tools.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Smart Resizing</h3>
            <p className="text-gray-600 text-sm">
              Resize images while maintaining aspect ratio or set custom
              dimensions for your needs.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Text Overlays</h3>
            <p className="text-gray-600 text-sm">
              Add custom text with different fonts, sizes, colors, and styling
              options.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Undo/Redo</h3>
            <p className="text-gray-600 text-sm">
              Full history support with unlimited undo and redo capabilities.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Export Options</h3>
            <p className="text-gray-600 text-sm">
              Download your edited images in high quality PNG format ready for
              use.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
