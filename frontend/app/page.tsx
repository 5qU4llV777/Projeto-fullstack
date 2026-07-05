import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-4xl font-bold text-zinc-900">TaskFlow</h1>
      <p className="max-w-md text-zinc-600">
        Organize seus projetos e tarefas em um só lugar.
      </p>
      <Link
        href="/login"
        className="rounded-full bg-zinc-900 px-6 py-3 text-white transition-colors hover:bg-zinc-700"
      >
        Entrar
      </Link>
    </main>
  );
}