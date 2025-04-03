'use client';

import { Brain, BookOpen, MessageSquare, Activity, Calendar, Users, ChartBar, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const features = [
  {
    title: 'Personalized Learning',
    description: 'AI-driven study plans tailored to your learning style.',
    icon: BookOpen,
    href: '/personalized-learning',
  },
  {
    title: 'Live AI Tutor',
    description: 'Interact with an AI tutor for real-time guidance and problem-solving.',
    icon: MessageSquare,
    href: '/ai-tutor',
  },
  {
    title: 'Healthcare Insights',
    description: 'Monitor your health stats and receive AI-generated recommendations.',
    icon: Activity,
    href: '/healthcare',
  },
  {
    title: 'Virtual Consultation',
    description: 'Schedule AI-assisted virtual doctor consultations anytime.',
    icon: Calendar,
    href: '/consultation',
  },
  {
    title: 'Daily Tasks & Reminders',
    description: 'Organize your day with AI-powered task management and smart reminders.',
    icon: Brain,
    href: '/dashboard/tasks',
  },
  {
    title: 'Community & Forums',
    description: 'Engage with a like-minded community and discuss ideas.',
    icon: Users,
    href: '/community',
  },
  {
    title: 'AI Progress Reports',
    description: 'Track your learning and health progress with insightful reports.',
    icon: ChartBar,
    href: '/reports',
  },
  {
    title: 'Multilingual Support',
    description: 'Experience AI assistance in multiple languages.',
    icon: Globe,
    href: '/dashboard/support',
  },
];

export default function Dashboard() {
  const router = useRouter();

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
            { name: 'Personalized Learning', icon: BookOpen, href: '/personalized-learning' },
            { name: 'Live AI Tutor', icon: MessageSquare, href: '/ai-tutor' },
            { name: 'Healthcare Insights', icon: Activity, href: '/healthcare' },
            { name: 'Virtual Consultation', icon: Calendar, href: '/consultation' },
            { name: 'Daily Tasks & Reminders', icon: Brain, href: '/dashboard/tasks' },
            { name: 'Community & Forums', icon: Users, href: '/community' },
            { name: 'Profile & Settings', icon: ChartBar, href: '/settings' },
            { name: 'Multi Langauge AI', icon: ChartBar, href: '/dashboard/support' },
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
      <main className="flex-1">
        <div className="bg-yellow-400 p-4">
          <h1 className="text-xl font-bold text-center">Cognify - Brain Driven Learning Assistant</h1>
        </div>
        
        <div className="p-6">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Welcome to Cognify AI</h2>
            <p className="text-gray-600">
              Your AI-powered learning assistant designed to help you grow smarter and stay healthier.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-1"
                onClick={() => router.push(feature.href)}
              >
                <feature.icon className="w-8 h-8 text-blue-500 mb-4" />
                <h3 className="text-lg text-black font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}