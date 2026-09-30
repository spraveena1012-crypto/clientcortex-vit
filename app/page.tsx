"use client";

import { useState } from "react";
import { pipeline } from "@huggingface/transformers";

type Prediction = {
  label: string;
  score: number;
};

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [results, setResults] = useState<Prediction[]>([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setImage(imageUrl);
    setResults([]);
    setLoading(true);
    setStatus("Initializing vision model...");

    try {
      const classifier = await pipeline(
        "image-classification",
        "Xenova/vit-base-patch16-224"
      );

      setStatus("Analyzing visual patterns...");

      const output = await classifier(imageUrl);

      setResults(output as Prediction[]);
      setStatus("Analysis complete");
    } catch (error) {
      console.error(error);
      setStatus("Unable to analyze this image");
    } finally {
      setLoading(false);
    }
  };

  const resetImage = () => {
    setImage(null);
    setResults([]);
    setStatus("");
  };

  return (
    <main className="min-h-screen bg-[#07090d] text-white">

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2
          w-[700px] h-[400px]
          bg-cyan-500/10 blur-[140px] rounded-full" />

        <div className="absolute bottom-0 right-0
          w-[500px] h-[300px]
          bg-violet-500/10 blur-[130px] rounded-full" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-9 h-9 rounded-xl
              bg-white/[0.06]
              border border-white/10
              flex items-center justify-center">

              <div className="w-3 h-3 rounded-full bg-cyan-400
                shadow-[0_0_15px_rgba(34,211,238,0.8)]" />

            </div>

            <div>
              <h1 className="font-semibold tracking-tight">
                ClientCortex
              </h1>

              <p className="text-[10px] uppercase tracking-[0.25em]
                text-slate-500">
                Vision Intelligence
              </p>
            </div>

          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">

            <span className="w-2 h-2 rounded-full bg-emerald-400" />

            Local AI

          </div>

        </div>
      </nav>

      {/* Main */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16">

        {/* Hero */}
        <div className="max-w-3xl mb-12">

          <p className="text-cyan-400 text-xs font-semibold
            uppercase tracking-[0.3em] mb-5">
            AI Vision Engine
          </p>

          <h2 className="text-5xl md:text-6xl font-semibold
            tracking-[-0.04em] leading-[1.05]">

            Give your image
            <br />

            <span className="text-slate-500">
              to the cortex.
            </span>

          </h2>

          <p className="mt-6 text-slate-400 max-w-xl leading-7">
            Upload an image and ClientCortex analyzes its visual patterns
            using a transformer-based vision model running in your browser.
          </p>

        </div>

        {/* Workspace */}
        <div className="grid lg:grid-cols-[1.4fr_0.6fr]
          gap-5">

          {/* Image workspace */}
          <div className="relative min-h-[520px]
            rounded-3xl
            border border-white/[0.08]
            bg-white/[0.025]
            overflow-hidden">

            {!image ? (

              <label className="absolute inset-0 cursor-pointer
                flex flex-col items-center justify-center">

                <div className="w-20 h-20 rounded-2xl
                  border border-white/10
                  bg-white/[0.04]
                  flex items-center justify-center mb-7">

                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-slate-400"
                  >
                    <path d="M12 3v12" />
                    <path d="m7 8 5-5 5 5" />
                    <path d="M5 21h14" />
                  </svg>

                </div>

                <h3 className="text-xl font-medium">
                  Upload an image
                </h3>

                <p className="text-sm text-slate-500 mt-2">
                  JPG, PNG or WEBP
                </p>

                <div className="mt-7 px-5 py-2.5 rounded-lg
                  bg-white text-black text-sm font-medium">
                  Choose image
                </div>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

              </label>

            ) : (

              <div className="absolute inset-0">

                <img
                  src={image}
                  alt="Uploaded image"
                  className="w-full h-full object-contain p-8"
                />

                {/* Scanning overlay */}
                {loading && (
                  <div className="absolute inset-0
                    bg-black/40 backdrop-blur-[2px]
                    flex items-center justify-center">

                    <div className="w-full h-[2px]
                      bg-cyan-400
                      shadow-[0_0_25px_rgba(34,211,238,1)]
                      absolute animate-pulse" />

                    <div className="px-5 py-3 rounded-xl
                      bg-black/70
                      border border-white/10
                      backdrop-blur-xl">

                      <p className="text-sm text-cyan-300">
                        {status}
                      </p>

                    </div>

                  </div>
                )}

                {/* Change image */}
                <label className="absolute top-5 right-5
                  px-4 py-2 rounded-lg
                  bg-black/70 border border-white/10
                  backdrop-blur-xl
                  text-xs cursor-pointer
                  hover:bg-black transition">

                  Change image

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                </label>

              </div>

            )}

          </div>

          {/* Intelligence panel */}
          <div className="rounded-3xl
            border border-white/[0.08]
            bg-white/[0.025]
            p-7">

            <div className="flex items-center justify-between mb-8">

              <div>
                <p className="text-xs uppercase tracking-[0.2em]
                  text-slate-500">
                  Intelligence
                </p>

                <h3 className="text-lg font-medium mt-1">
                  Analysis
                </h3>
              </div>

              <div className="w-2 h-2 rounded-full bg-cyan-400
                shadow-[0_0_12px_rgba(34,211,238,0.9)]" />

            </div>

            {!results.length ? (

              <div className="h-[350px]
                flex flex-col items-center justify-center
                text-center">

                <div className="text-4xl font-light text-white/10">
                  AI
                </div>

                <p className="text-sm text-slate-500 mt-4">
                  Waiting for visual input
                </p>

                <p className="text-xs text-slate-600 mt-2 max-w-[220px]">
                  Upload an image to begin the analysis.
                </p>

              </div>

            ) : (

              <div>

                {/* Main prediction */}
                <div className="mb-8">

                  <p className="text-xs text-slate-500 mb-2">
                    PRIMARY DETECTION
                  </p>

                  <h4 className="text-3xl font-semibold
                    capitalize tracking-tight">
                    {results[0].label}
                  </h4>

                  <div className="flex items-center gap-3 mt-4">

                    <div className="flex-1 h-1.5 rounded-full
                      bg-white/10 overflow-hidden">

                      <div
                        className="h-full bg-cyan-400 rounded-full"
                        style={{
                          width: `${results[0].score * 100}%`,
                        }}
                      />

                    </div>

                    <span className="text-sm font-medium
                      text-cyan-300">
                      {(results[0].score * 100).toFixed(1)}%
                    </span>

                  </div>

                </div>

                {/* Other predictions */}
                <div>

                  <p className="text-xs text-slate-500 mb-4">
                    OTHER POSSIBILITIES
                  </p>

                  <div className="space-y-4">

                    {results.slice(1, 5).map((result, index) => (

                      <div key={index}>

                        <div className="flex justify-between
                          text-sm mb-2">

                          <span className="capitalize text-slate-300">
                            {result.label}
                          </span>

                          <span className="text-slate-500">
                            {(result.score * 100).toFixed(1)}%
                          </span>

                        </div>

                        <div className="h-1 rounded-full bg-white/[0.07]">

                          <div
                            className="h-full bg-slate-500 rounded-full"
                            style={{
                              width: `${result.score * 100}%`,
                            }}
                          />

                        </div>

                      </div>

                    ))}

                  </div>

                </div>

                {/* Reset */}
                <button
                  onClick={resetImage}
                  className="w-full mt-10 py-3 rounded-xl
                  border border-white/10
                  text-sm text-slate-400
                  hover:text-white
                  hover:bg-white/[0.04]
                  transition"
                >
                  Analyze another image
                </button>

              </div>

            )}

          </div>

        </div>

        {/* Footer information */}
        <div className="flex flex-col md:flex-row
          justify-between gap-4 mt-8
          text-xs text-slate-600">

          <span>
            ClientCortex Vision Engine
          </span>

          <span>
            Transformer-based image classification
          </span>

          <span>
            Processing locally in browser
          </span>

        </div>

      </section>

    </main>
  );
}