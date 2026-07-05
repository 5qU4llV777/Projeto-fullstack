'use client';

import { useEffect, useState, FormEvent } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../../services/tasks';
import { getProjects, createProject } from '../../services/projects';
import { Task, Project } from '../../types';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState('');
  const [projectId, setProjectId] = useState<number | ''>('');
  const [newProjectName, setNewProjectName] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  async function loadData() {
    setLoading(true);
    setErrorMsg('');
    try {
      const [tasksData, projectsData] = await Promise.all([
        getTasks(),
        getProjects(),
      ]);
      setTasks(tasksData);
      setProjects(projectsData);
      if (projectsData.length > 0 && !projectId) {
        setProjectId(projectsData[0].id);
      }
    } catch (err) {
      setErrorMsg('Não foi possível carregar seus dados. Faça login novamente.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleCreateProject(e: FormEvent) {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    await createProject(newProjectName);
    setNewProjectName('');
    loadData();
  }

  async function handleCreateTask(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || !projectId) return;
    await createTask(title, projectId);
    setTitle('');
    loadData();
  }

  async function handleToggle(task: Task) {
    await updateTask(task.id, { completed: !task.completed });
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, completed: !t.completed } : t)),
    );
  }

  async function handleDelete(id: number) {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <main className="flex flex-1 flex-col items-center px-6 py-10 gap-8">
      <h1 className="text-3xl font-bold text-zinc-900">Minhas tarefas</h1>
      {errorMsg && <p className="text-red-600">{errorMsg}</p>}

      {/* Criar projeto */}
      <form onSubmit={handleCreateProject} className="flex w-full max-w-md gap-2">
        <input
          type="text"
          placeholder="Novo projeto"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          className="flex-1 rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-2 text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-zinc-900"
        />
        <button
          type="submit"
          className="rounded-lg bg-zinc-200 px-4 py-2 text-zinc-900 hover:bg-zinc-300"
        >
          + Projeto
        </button>
      </form>

      {/* Criar tarefa */}
      <form
        onSubmit={handleCreateTask}
        className="flex w-full max-w-md flex-col gap-2 rounded-2xl bg-white p-6 shadow-sm"
      >
        <input
          type="text"
          placeholder="Título da tarefa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-lg border border-zinc-300 px-4 py-2 text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-zinc-900"
        />
        <select
          value={projectId}
          onChange={(e) => setProjectId(Number(e.target.value))}
          className="rounded-lg border border-zinc-300 px-4 py-2 text-zinc-900 outline-none focus:border-zinc-900"
        >
          {projects.length === 0 && <option value="">Crie um projeto primeiro</option>}
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={projects.length === 0}
          className="rounded-lg bg-zinc-900 py-2 text-white hover:bg-zinc-700 disabled:opacity-50"
        >
          Criar tarefa
        </button>
      </form>

      {/* Lista de tarefas */}
      <div className="w-full max-w-md flex flex-col gap-3">
        {loading && <p className="text-zinc-500">Carregando...</p>}
        {!loading && tasks.length === 0 && (
          <p className="text-zinc-500">Nenhuma tarefa ainda.</p>
        )}
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm"
          >
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggle(task)}
                className="h-5 w-5"
              />
              <span className={task.completed ? 'line-through text-zinc-400' : 'text-zinc-900'}>
                {task.title}
              </span>
            </label>
            <button
              onClick={() => handleDelete(task.id)}
              className="text-sm text-red-500 hover:underline"
            >
              excluir
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}