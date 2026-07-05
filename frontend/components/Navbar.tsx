'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { logout } from '../services/auth';

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verifica se tem token salvo, só roda no navegador
    setIsLoggedIn(!!localStorage.getItem('taskflow_token'));
  }, []);

  function handleLogout() {
    logout();
    setIsLoggedIn(false);
    router.push('/');
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <Link href="/" className="text-xl font-bold text-zinc-900">
        TaskFlow
      </Link>

      <nav className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            <Link href="/tasks" className="text-zinc-700 hover:text-zinc-900">
              Minhas tarefas
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:underline"
            >
              Sair
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-zinc-700 hover:text-zinc-900">
              Entrar
            </Link>
            <Link
              href="/register"
              className="rounded-full bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-700"
            >
              Cadastrar
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}