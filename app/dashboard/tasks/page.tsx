'use client';

import { useState, useEffect } from 'react';
import { Brain, Plus, Calendar, Clock, CheckCircle2, Trash2, Bell } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  completed: boolean;
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
  });

  useEffect(() => {
    // Request notification permission when component mounts
    if ('Notification' in window) {
      Notification.requestPermission();
    }

    // Check for tasks every minute
    const interval = setInterval(checkTasks, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Check tasks whenever tasks array changes
    checkTasks();
  }, [tasks]);

  const checkTasks = () => {
    const now = new Date();
    tasks.forEach(task => {
      if (task.completed) return;

      const taskDateTime = new Date(`${task.date}T${task.time}`);
      if (isTimeToNotify(now, taskDateTime)) {
        notifyTask(task);
      }
    });
  };

  const isTimeToNotify = (now: Date, taskTime: Date) => {
    // Check if the current time matches the task time (within the same minute)
    return Math.abs(now.getTime() - taskTime.getTime()) < 60000;
  };

  const notifyTask = (task: Task) => {
    // Play notification sound
    const audio = new Audio('/notification.mp3');
    audio.play().catch(error => console.log('Audio playback failed:', error));

    // Show browser notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Task Reminder', {
        body: task.title,
        icon: '/favicon.ico'
      });
    }

    // Show toast notification
    toast('Task Reminder', {
      description: task.title,
      duration: 10000,
      icon: <Bell className="w-4 h-4" />,
    });
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    const task: Task = {
      id: Math.random().toString(36).substr(2, 9),
      ...newTask,
      completed: false,
    };
    setTasks([...tasks, task]);
    setNewTask({ title: '', description: '', date: '', time: '' });
    
    toast.success('Task added successfully', {
      description: `Scheduled for ${task.date} at ${task.time}`,
    });
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast.success('Task deleted successfully');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white">
        <div className="p-4">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Brain className="w-6 h-6" />
            Cognify AI
          </h1>
        </div>
        <nav className="mt-4">
          {[
            { name: 'Home', icon: Brain, href: '/dashboard' },
            { name: 'Daily Tasks & Reminders', icon: Calendar, href: '/tasks' },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Daily Tasks & Reminders</h1>

          {/* Add new task form */}
          <form onSubmit={addTask} className="bg-white rounded-lg p-6 shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add New Task
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Task title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Task description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={newTask.date}
                  onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={newTask.time}
                  onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add Task
            </button>
          </form>

          {/* Tasks list */}
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`bg-white rounded-lg p-6 shadow-md flex items-center justify-between ${
                  task.completed ? 'opacity-75' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`rounded-full p-1 ${
                      task.completed ? 'text-green-500' : 'text-gray-400'
                    }`}
                  >
                    <CheckCircle2 className="w-6 h-6" />
                  </button>
                  <div>
                    <h3 className={`text-lg font-semibold ${
                      task.completed ? 'line-through text-gray-500' : ''
                    }`}>
                      {task.title}
                    </h3>
                    <p className="text-gray-600">{task.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {task.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {task.time}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            {tasks.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                No tasks yet. Add your first task above!
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
