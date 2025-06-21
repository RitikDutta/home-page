export default function Interview() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-50 to-sky-100">
      <div className="max-w-xl p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-4">
          Interview Ready – Beta
        </h1>

        <p className="text-gray-700 leading-relaxed text-center">
          Your AI-powered mock interviewer is under active development.
          Upload a résumé, choose your domain, and practice in real time!
        </p>

        {/* 👉🏽 Drop your existing component or iframe here */}
      </div>
    </section>
  );
}
