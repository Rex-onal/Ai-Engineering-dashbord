import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import NavigationTabs from './components/NavigationTabs';
import PhaseHeader from './components/PhaseHeader';
import ResourceCard from './components/ResourceCard';
import ProjectCard from './components/ProjectCard';
import Footer from './components/Footer';

const API_BASE_URL = window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1')
  ? 'http://localhost:5000/api'
  : '/_/backend/api';

// Local static backup data for immediate load or offline fallback
const FALLBACK_PHASES = [
  {
    "id": "phase_1",
    "tab": "Phase 1 — Python",
    "title": "Python: Zero to Production",
    "duration": "Months 1–3",
    "goal": "Go from zero Python to writing production-level Python code",
    "resources": [
      {
        "id": "p1_r1",
        "topic": "Python Basics — Full Beginner Course",
        "resource_name": "Learn Python Full Course for Beginners",
        "platform": "freeCodeCamp",
        "type": "YouTube",
        "url": "https://www.youtube.com/watch?v=rfscVS0vtbw",
        "cost": "Free",
        "duration_estimate": "4.5 hours"
      },
      {
        "id": "p1_r2",
        "topic": "Python Intermediate — OOP, Data Structures, Error Handling",
        "resource_name": "Python OOP Tutorials — Corey Schafer",
        "platform": "Corey Schafer",
        "type": "YouTube",
        "url": "https://www.youtube.com/watch?v=ZDa-Z5JzLYM",
        "cost": "Free",
        "duration_estimate": "2–3 hours"
      },
      {
        "id": "p1_r3",
        "topic": "Python for Everybody — APIs, JSON, File Handling",
        "resource_name": "Python for Everybody Full University Course",
        "platform": "freeCodeCamp",
        "type": "YouTube",
        "url": "https://www.youtube.com/watch?v=8DvywoWv6fI",
        "cost": "Free",
        "duration_estimate": "13 hours"
      },
      {
        "id": "p1_r4",
        "topic": "FastAPI — Building Production APIs with Python",
        "resource_name": "FastAPI Course for Beginners",
        "platform": "freeCodeCamp",
        "type": "YouTube",
        "url": "https://www.youtube.com/watch?v=tLKKmouUams",
        "cost": "Free",
        "duration_estimate": "1 hour"
      },
      {
        "id": "p1_r5",
        "topic": "FastAPI Advanced — Full API with Auth and Database",
        "resource_name": "FastAPI Full Course — Beginner to Advanced",
        "platform": "freeCodeCamp",
        "type": "YouTube",
        "url": "https://www.youtube.com/watch?v=0sOvCWFmrtA",
        "cost": "Free",
        "duration_estimate": "19 hours"
      },
      {
        "id": "p1_r6",
        "topic": "Python Text Resource — Official Docs",
        "resource_name": "Python Official Documentation",
        "platform": "python.org",
        "type": "Text/Web",
        "url": "https://docs.python.org/3/tutorial/index.html",
        "cost": "Free",
        "duration_estimate": "Reference"
      }
    ],
    "portfolio_project": {
      "title": "Phase 1 Project",
      "description": "Build a Python CLI tool that calls a REST API, handles JSON responses, and includes proper error handling"
    }
  },
  {
    "id": "phase_2",
    "tab": "Phase 2 — LLM & Prompting",
    "title": "LLM APIs + Prompt Engineering",
    "duration": "Months 4–6",
    "goal": "Learn to work with LLM APIs and engineer reliable prompts",
    "resources": [
      {
        "id": "p2_r1",
        "topic": "Prompt Engineering for Developers",
        "resource_name": "ChatGPT Prompt Engineering for Developers",
        "platform": "DeepLearning.AI",
        "type": "Course",
        "url": "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/",
        "cost": "Free",
        "duration_estimate": "1–2 hours"
      },
      {
        "id": "p2_r2",
        "topic": "Building Systems with LLM APIs",
        "resource_name": "Building Systems with the ChatGPT API",
        "platform": "DeepLearning.AI",
        "type": "Course",
        "url": "https://www.deeplearning.ai/short-courses/building-systems-with-chatgpt/",
        "cost": "Free",
        "duration_estimate": "2–3 hours"
      },
      {
        "id": "p2_r3",
        "topic": "LangChain for LLM Application Development",
        "resource_name": "LangChain for LLM Application Development",
        "platform": "DeepLearning.AI",
        "type": "Course",
        "url": "https://www.deeplearning.ai/short-courses/langchain-for-llm-application-development/",
        "cost": "Free",
        "duration_estimate": "2–3 hours"
      },
      {
        "id": "p2_r4",
        "topic": "LangChain Full Mastery Course 2025",
        "resource_name": "LangChain Mastery in 2025 — Full 5 Hour Course",
        "platform": "YouTube",
        "type": "YouTube",
        "url": "https://www.youtube.com/watch?v=Cyv-dgv80kE",
        "cost": "Free",
        "duration_estimate": "5 hours"
      },
      {
        "id": "p2_r5",
        "topic": "Anthropic API — Official Docs",
        "resource_name": "Anthropic Claude API Documentation",
        "platform": "Anthropic",
        "type": "Text/Web",
        "url": "https://docs.anthropic.com/en/docs/get-started",
        "cost": "Free",
        "duration_estimate": "Reference"
      },
      {
        "id": "p2_r6",
        "topic": "OpenAI API — Official Docs",
        "resource_name": "OpenAI API Documentation",
        "platform": "OpenAI",
        "type": "Text/Web",
        "url": "https://platform.openai.com/docs/introduction",
        "cost": "Free",
        "duration_estimate": "Reference"
      }
    ],
    "portfolio_project": {
      "title": "Phase 2 Project",
      "description": "Build a chatbot using OpenAI or Anthropic API with system prompts, few-shot examples, and conversation memory"
    }
  },
  {
    "id": "phase_3",
    "tab": "Phase 3 — RAG & Systems",
    "title": "RAG + Vector Databases + Docker",
    "duration": "Months 7–10",
    "goal": "Build production AI systems using RAG, vector databases, and Docker",
    "resources": [
      {
        "id": "p3_r1",
        "topic": "RAG from Scratch — Full Tutorial",
        "resource_name": "Learn RAG From Scratch — From a LangChain Engineer",
        "platform": "freeCodeCamp",
        "type": "YouTube",
        "url": "https://www.youtube.com/watch?v=sVcwVQRHIc8",
        "cost": "Free",
        "duration_estimate": "1.5 hours"
      },
      {
        "id": "p3_r2",
        "topic": "Build Your First RAG App with LangChain",
        "resource_name": "Build Your First RAG App — LangChain + OpenAI 2025",
        "platform": "YouTube",
        "type": "YouTube",
        "url": "https://www.youtube.com/watch?v=rS_ksLkhIrM",
        "cost": "Free",
        "duration_estimate": "1–2 hours"
      },
      {
        "id": "p3_r3",
        "topic": "Complete RAG Crash Course with LangChain",
        "resource_name": "Complete RAG Crash Course With LangChain In 2 Hours",
        "platform": "YouTube",
        "type": "YouTube",
        "url": "https://www.youtube.com/watch?v=o126p1QN_RI",
        "cost": "Free",
        "duration_estimate": "2 hours"
      },
      {
        "id": "p3_r4",
        "topic": "Building RAG Agents with LLMs",
        "resource_name": "Building Agentic RAG with LlamaIndex",
        "platform": "DeepLearning.AI",
        "type": "Course",
        "url": "https://www.deeplearning.ai/short-courses/building-agentic-rag-with-llamaindex/",
        "cost": "Free",
        "duration_estimate": "2 hours"
      },
      {
        "id": "p3_r5",
        "topic": "Docker for Beginners",
        "resource_name": "Docker Tutorial for Beginners — Full DevOps Course",
        "platform": "freeCodeCamp",
        "type": "YouTube",
        "url": "https://www.youtube.com/watch?v=fqMOX6JJhGo",
        "cost": "Free",
        "duration_estimate": "2 hours"
      },
      {
        "id": "p3_r6",
        "topic": "Docker Crash Course",
        "resource_name": "Docker Crash Course for Absolute Beginners",
        "platform": "TechWorld with Nana",
        "type": "YouTube",
        "url": "https://www.youtube.com/watch?v=pg19Z8LL06w",
        "cost": "Free",
        "duration_estimate": "1 hour"
      },
      {
        "id": "p3_r7",
        "topic": "Vector Databases & Embeddings — Text Resource",
        "resource_name": "Pinecone Learn — Vector Database Guide",
        "platform": "Pinecone",
        "type": "Text/Web",
        "url": "https://www.pinecone.io/learn/vector-database/",
        "cost": "Free",
        "duration_estimate": "Reference"
      }
    ],
    "portfolio_project": {
      "title": "Phase 3 Project",
      "description": "Build a RAG system that ingests documents, stores them in a vector database, and answers questions with source citations"
    }
  },
  {
    "id": "phase_4",
    "tab": "Phase 4 — AI Agents",
    "title": "AI Agents + Multi-Agent Systems",
    "duration": "Months 11–15",
    "goal": "Build autonomous AI agents and multi-agent systems using LangGraph, CrewAI, and MCP",
    "resources": [
      {
        "id": "p4_r1",
        "topic": "AI Agents in LangGraph",
        "resource_name": "AI Agents in LangGraph",
        "platform": "DeepLearning.AI",
        "type": "Course",
        "url": "https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/",
        "cost": "Free",
        "duration_estimate": "2–3 hours"
      },
      {
        "id": "p4_r2",
        "topic": "Multi-Agent Systems with CrewAI",
        "resource_name": "Multi AI Agent Systems with CrewAI",
        "platform": "DeepLearning.AI",
        "type": "Course",
        "url": "https://www.deeplearning.ai/short-courses/multi-ai-agent-systems-with-crewai/",
        "cost": "Free",
        "duration_estimate": "2–3 hours"
      },
      {
        "id": "p4_r3",
        "topic": "LangGraph Complete Course — Beginner to Advanced",
        "resource_name": "LangGraph Complete Course for Beginners",
        "platform": "YouTube",
        "type": "YouTube",
        "url": "https://www.youtube.com/watch?v=jGg_1h0qzaM",
        "cost": "Free",
        "duration_estimate": "3 hours"
      },
      {
        "id": "p4_r4",
        "topic": "LangGraph Full Tutorial 2026",
        "resource_name": "Complete LangGraph Tutorial Beginner to Advanced 2026",
        "platform": "YouTube",
        "type": "YouTube",
        "url": "https://www.youtube.com/watch?v=Hz21KVo0t4E",
        "cost": "Free",
        "duration_estimate": "Full course"
      },
      {
        "id": "p4_r5",
        "topic": "MCP — Model Context Protocol Explained",
        "resource_name": "Model Context Protocol Explained in 20 Minutes",
        "platform": "YouTube",
        "type": "YouTube",
        "url": "https://www.youtube.com/watch?v=N3vHJcHBS-w",
        "cost": "Free",
        "duration_estimate": "20 minutes"
      },
      {
        "id": "p4_r6",
        "topic": "MCP — You Need to Learn This Now",
        "resource_name": "You Need to Learn MCP Right Now",
        "platform": "YouTube",
        "type": "YouTube",
        "url": "https://www.youtube.com/watch?v=GuTcle5edjk",
        "cost": "Free",
        "duration_estimate": "30 minutes"
      },
      {
        "id": "p4_r7",
        "topic": "Agentic AI Full Course — LangChain, LangGraph, RAG",
        "resource_name": "Complete Agentic AI Course in 10 Hours",
        "platform": "YouTube",
        "type": "YouTube",
        "url": "https://www.youtube.com/watch?v=rV3HJ4LEZ7k",
        "cost": "Free",
        "duration_estimate": "10 hours"
      },
      {
        "id": "p4_r8",
        "topic": "LangGraph Academy — Official Free Course",
        "resource_name": "LangChain Academy — Introduction to LangGraph",
        "platform": "LangChain Academy",
        "type": "Text/Web/Course",
        "url": "https://academy.langchain.com/courses/intro-to-langgraph",
        "cost": "Free",
        "duration_estimate": "Self-paced"
      },
      {
        "id": "p4_r9",
        "topic": "Hugging Face AI Agents Course — Free with Certificate",
        "resource_name": "Hugging Face AI Agents Course",
        "platform": "Hugging Face",
        "type": "Course",
        "url": "https://huggingface.co/learn/agents-course/unit0/introduction",
        "cost": "Free + Free Certificate",
        "duration_estimate": "Self-paced"
      }
    ],
    "portfolio_project": {
      "title": "Phase 4 Project",
      "description": "Build a multi-agent system that takes a topic, researches it using web tools, and writes a structured report with an audit trail"
    }
  }
];

export default function App() {
  const [phases, setPhases] = useState(FALLBACK_PHASES);
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);

  // Initialize and load states
  useEffect(() => {
    // 1. Load initial progress from localStorage (for immediate UX response)
    const localProgress = localStorage.getItem('ai_roadmap_progress');
    if (localProgress) {
      setProgress(JSON.parse(localProgress));
    }

    // 2. Fetch phases data from Express Backend
    fetch(`${API_BASE_URL}/phases`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch phases');
        return res.json();
      })
      .then((data) => {
        setPhases(data);
      })
      .catch((err) => {
        console.warn('Backend server not connected. Falling back to local dataset.', err);
      });

    // 3. Fetch server progress database and merge with localStorage
    fetch(`${API_BASE_URL}/progress`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch progress');
        return res.json();
      })
      .then((serverProgress) => {
        setProgress((prevProgress) => {
          const merged = { ...prevProgress, ...serverProgress };
          localStorage.setItem('ai_roadmap_progress', JSON.stringify(merged));
          return merged;
        });
      })
      .catch((err) => {
        console.warn('Backend server not connected. Using local progress state.', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Update Status state
  const handleStatusChange = (resourceId, newStatus) => {
    // Update local state immediately
    const updatedProgress = { ...progress, [resourceId]: newStatus };
    setProgress(updatedProgress);
    localStorage.setItem('ai_roadmap_progress', JSON.stringify(updatedProgress));

    // Async sync update to Express server database
    fetch(`${API_BASE_URL}/progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resourceId, status: newStatus }),
    })
      .then((res) => {
        if (!res.ok) console.error('Failed to sync progress update to backend');
      })
      .catch((err) => {
        console.warn('Backend sync unavailable. Saved progress locally.', err);
      });
  };

  // Helper function to calculate phase statistics
  const calculatePhaseStats = (phaseIndex) => {
    const phase = phases[phaseIndex];
    if (!phase || !phase.resources) return { progressPercent: 0, completed: 0, total: 0 };

    const total = phase.resources.length;
    let score = 0;
    let completed = 0;

    phase.resources.forEach((r) => {
      const status = progress[r.id] || 'Not Started';
      if (status === 'Done') {
        score += 100;
        completed += 1;
      } else if (status === 'In Progress') {
        score += 50;
      }
    });

    const progressPercent = total > 0 ? score / total : 0;
    return { progressPercent, completed, total };
  };

  // Calculate completion percentage for each navigation tab
  const getTabsProgress = () => {
    return phases.map((_, idx) => calculatePhaseStats(idx).progressPercent);
  };

  const tabs = phases.map((p) => p.tab);
  const activePhase = phases[activeTab];
  const { progressPercent, completed, total } = calculatePhaseStats(activeTab);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans antialiased">
      {/* Fixed top Header */}
      <Header />

      {/* Main Roadmap Container */}
      <main className="flex-1 pt-24 px-6 md:px-12 w-full max-w-[1280px] mx-auto flex flex-col">
        {/* Navigation Tabs */}
        <NavigationTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          phaseProgress={getTabsProgress()}
        />

        {activePhase && (
          <div className="animate-fade-in duration-300">
            {/* Phase info and progress bar */}
            <PhaseHeader
              title={activePhase.title}
              duration={activePhase.duration}
              goal={activePhase.goal}
              progress={progressPercent}
              completedCount={completed}
              totalCount={total}
            />

            {/* Grid of Resource Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activePhase.resources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  status={progress[resource.id] || 'Not Started'}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>

            {/* Portfolio Project Footer Card */}
            {activePhase.portfolio_project && (
              <ProjectCard
                title={activePhase.portfolio_project.title}
                description={activePhase.portfolio_project.description}
              />
            )}
          </div>
        )}
      </main>

      {/* Standard Footer */}
      <Footer />
    </div>
  );
}
