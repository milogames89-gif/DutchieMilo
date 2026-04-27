"use client";

import { useState } from "react";
import words from "../data/words.json";

const BLOCK_SIZE = 20;

type Result = "correct" | "wrong" | null;

export default function Home() {
  const [block, setBlock] = useState(0);
  const [current, setCurrent] = useState(() => getRandomWord(0));
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<Result>(null);
  const [showTranslation, setShowTranslation] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  function getBlockWords(blockIndex: number) {
    const start = blockIndex * BLOCK_SIZE;
    const end = start + BLOCK_SIZE;
    return words.slice(start, end);
  }

  function getRandomWord(blockIndex: number) {
    const blockWords = getBlockWords(blockIndex);

    if (!blockWords.length) {
      return { dutch: "NO WORDS", english: "NO WORDS" };
    }

    return blockWords[Math.floor(Math.random() * blockWords.length)];
  }

  function changeBlock(value: number) {
    setBlock(value);
    setCurrent(getRandomWord(value));
    setAnswer("");
    setResult(null);
    setShowTranslation(false);
  }

  function checkAnswer() {
    const isCorrect =
      answer.trim().toLowerCase() === current.dutch.toLowerCase();

    setResult(isCorrect ? "correct" : "wrong");
    setShowTranslation(true);
  }

  function nextWord() {
    setCurrent(getRandomWord(block));
    setAnswer("");
    setResult(null);
    setShowTranslation(false);
  }

  const totalBlocks = Math.ceil(words.length / BLOCK_SIZE);

  return (
  <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white p-6">

    {/* TITLE */}
    <h1 className="text-4xl font-bold mb-6 text-green-400">
      Dutchie Milo
    </h1>

    

    {/* DROPDOWN */}
    <select
      value={block}
      onChange={(e) => changeBlock(Number(e.target.value))}
      className="p-3 rounded-lg bg-slate-700 text-white border border-slate-600 mb-6"
    >
      {Array.from({ length: totalBlocks }).map((_, i) => (
        <option key={i} value={i}>
          Block {i + 1}
        </option>
      ))}
    </select>

    {/* CARD */}
    <div className="bg-slate-800 shadow-xl rounded-2xl p-10 w-full max-w-md flex flex-col items-center">
    <>
  {/* IMAGE */}
  <img
    src="/dutchies.png"
    alt="Dutchies"
    onClick={() => setZoomed(true)}
    className="w-72 h-80 rounded-2xl object-cover object-center mb-6 border-4 border-blue-400 shadow-xl cursor-pointer hover:scale-105 transition"
  />

  {/* MODAL */}
  {zoomed && (
    <div
      onClick={() => setZoomed(false)}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
    >
      <img
        src="/dutchies.png"
        alt="Dutchies zoom"
        className="max-w-[85vw] max-h-[85vh] rounded-2xl shadow-2xl border-4 border-blue-400"
      />
    </div>
  )}
</>

      {/* WORD */}
      <h2 className="text-5xl font-extrabold mb-6 text-blue-400">
        {current.english}
      </h2>

      {/* INPUT */}
      <input
        className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 text-center mb-4"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Write in Dutch"
      />

      {/* BUTTONS */}
      <div className="flex gap-3 w-full">
        <button
          onClick={checkAnswer}
          className="flex-1 bg-blue-600 hover:bg-blue-700 transition rounded-lg py-2"
        >
          Check
        </button>

        <button
          onClick={nextWord}
          className="flex-1 bg-green-600 hover:bg-green-700 transition rounded-lg py-2"
        >
          Next word
        </button>
      </div>

      {/* RESULT */}
      {result && (
        <p
          className={`mt-4 text-lg font-semibold ${
            result === "correct" ? "text-green-400" : "text-red-400"
          }`}
        >
          {result === "correct" ? "Correct ✅" : "IncorrectComp ❌"}
        </p>
      )}

      {/* TRANSLATION */}
      {showTranslation && (
        <p className="mt-6 text-2xl text-gray-300">
          {current.dutch}
        </p>
      )}

    </div>
  </main>
);
}