"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";

type Dir = "es" | "ary";

export default function Uploader() {
  const [file, setFile] = useState<File | null>(null);
  const [extracting, setExtracting] = useState(false);
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState<{ translation: string; phonetics?: string } | null>(null);
  const [from, setFrom] = useState<Dir>("es");
  const [to, setTo] = useState<Dir>("ary");

  const onDrop = (accepted: File[]) => {
    if (accepted[0]) {
      setFile(accepted[0]);
      setText("");
      setTranslated(null);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    maxSize: 10 * 1024 * 1024,
  });

  async function extract() {
    if (!file) return;
    setExtracting(true);
    setText("");
    setTranslated(null);

    // 🔑 Leer el token que Turnstile mete en un input hidden
    const token =
      (document.querySelector('input[name="cf-turnstile-response"]') as HTMLInputElement)?.value || "";

    const fd = new FormData();
    fd.append("file", file);
    fd.append("token", token); // el backend lo validará

    const resp = await fetch("/api/ocr", { method: "POST", body: fd });
    const data = await resp.json();
    setExtracting(false);

    if (!resp.ok) {
      alert(data?.error || "No se pudo leer el documento");
      return;
    }
    setText(data.text || "");
  }

  async function translate() {
    if (!text.trim()) return;
    const resp = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        from,
        to,
        domain: "tramites",
        precision: "high",
      }),
    });
    const data = await resp.json();
    if (!resp.ok) {
      alert(data?.error || "Error al traducir");
      return;
    }
    setTranslated(data);
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition ${
          isDragActive ? "border-emerald-500 bg-emerald-50" : "border-slate-300"
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-sm">
          {file ? <b>{file.name}</b> : "Arrastra aquí tu PDF/JPG/PNG o haz clic para seleccionar"}
        </p>
      </div>

      {/* Widget Turnstile: aquí se inyecta el input hidden cf-turnstile-response */}
      <div
        className="cf-turnstile"
        data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
        data-theme="light"
      />

      <div className="flex flex-wrap gap-3 items-center">
        <label className="text-sm">
          De
          <select
            className="ml-2 input"
            value={from}
            onChange={(e) => setFrom(e.target.value as Dir)}
          >
            <option value="es">Español</option>
            <option value="ary">Darija (Norte)</option>
          </select>
        </label>
        <label className="text-sm">
          A
          <select
            className="ml-2 input"
            value={to}
            onChange={(e) => setTo(e.target.value as Dir)}
          >
            <option value="ary">Darija (Norte)</option>
            <option value="es">Español</option>
          </select>
        </label>

        <button className="btn btn-ghost" onClick={extract} disabled={!file || extracting}>
          {extracting ? "Leyendo…" : "Leer documento"}
        </button>

        <button className="btn btn-brand" onClick={translate} disabled={!text.trim()}>
          Traducir texto extraído
        </button>
      </div>

      {text && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="card p-4">
            <h3 className="font-medium mb-2">Texto extraído</h3>
            <textarea
              className="w-full h-56 textarea"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="card p-4">
            <h3 className="font-medium mb-2">Traducción</h3>
            <div className="min-h-[14rem] whitespace-pre-wrap text-sm">
              {translated ? (
                <>
                  <p>{translated.translation}</p>
                  {translated.phonetics && (
                    <p className="text-slate-500 mt-2">Fonética: {translated.phonetics}</p>
                  )}
                </>
              ) : (
                <p className="text-slate-500">Aún no has traducido.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

