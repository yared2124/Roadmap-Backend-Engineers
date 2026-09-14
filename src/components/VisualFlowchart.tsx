"use client";

import React, { useState } from "react";
import {
  ArchitectureDiagramFlow,
  ArchitectureFlowNode,
  ArchitectureFlowStep,
} from "../types/roadmap";
import {
  Server,
  Database,
  Zap,
  Shield,
  Layers,
  Cpu,
  ArrowRight,
  Clock,
  AlertTriangle,
  CheckCircle2,
  HardDrive,
  KeyRound,
  User,
  Workflow,
  Sparkles,
} from "lucide-react";

interface VisualFlowchartProps {
  flow: ArchitectureDiagramFlow;
}

export function VisualFlowchart({ flow }: VisualFlowchartProps) {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const getNodeIcon = (type: ArchitectureFlowNode["type"]) => {
    switch (type) {
      case "client":
        return <User className="h-4 w-4" />;
      case "gateway":
        return <Shield className="h-4 w-4" />;
      case "service":
        return <Cpu className="h-4 w-4" />;
      case "cache":
        return <Zap className="h-4 w-4" />;
      case "database":
        return <Database className="h-4 w-4" />;
      case "queue":
        return <Layers className="h-4 w-4" />;
      case "auth":
        return <KeyRound className="h-4 w-4" />;
      case "storage":
        return <HardDrive className="h-4 w-4" />;
      default:
        return <Server className="h-4 w-4" />;
    }
  };

  const getNodeColor = (type: ArchitectureFlowNode["type"]) => {
    switch (type) {
      case "client":
        return "border-blue-300 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300";
      case "gateway":
        return "border-purple-300 bg-purple-50 text-purple-900 dark:border-purple-800 dark:bg-purple-950/40 dark:text-purple-300";
      case "service":
        return "border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300";
      case "cache":
        return "border-rose-300 bg-rose-50 text-rose-900 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-300";
      case "database":
        return "border-cyan-300 bg-cyan-50 text-cyan-900 dark:border-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-300";
      case "queue":
        return "border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300";
      case "auth":
        return "border-indigo-300 bg-indigo-50 text-indigo-900 dark:border-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-300";
      case "storage":
        return "border-zinc-300 bg-zinc-100 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200";
      default:
        return "border-zinc-300 bg-zinc-50 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200";
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-7 dark:border-zinc-800 dark:bg-zinc-950 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-900 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 border border-blue-500/20 shadow-2xs">
            <Workflow className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-zinc-950 dark:text-zinc-50">
                Visual System Architecture & Lifecycle
              </h3>
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-[10.5px] font-bold text-blue-900 dark:bg-blue-950/70 dark:text-blue-200 font-mono">
                <Sparkles className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                Interactive Data Flow
              </span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-zinc-950 dark:text-zinc-50 mt-0.5">
              {flow.title}
            </h4>
          </div>
        </div>
      </div>

      {/* Summary Narrative */}
      <p className="text-xs sm:text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 font-medium">
        {flow.summary}
      </p>

      {/* Node Topology Strip */}
      <div className="space-y-2">
        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Architecture Topology Nodes:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 pt-1">
          {flow.nodes.map((node) => {
            const isHighlighted =
              activeStep !== null &&
              (flow.steps[activeStep]?.from === node.id || flow.steps[activeStep]?.to === node.id);

            return (
              <div
                key={node.id}
                className={`flex flex-col justify-between rounded-xl border p-3 transition-all ${getNodeColor(
                  node.type
                )} ${isHighlighted ? "ring-2 ring-black dark:ring-white scale-[1.02] shadow-sm" : "opacity-95"}`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="font-bold text-xs sm:text-[13px] truncate">{node.label}</span>
                  <div className="shrink-0 opacity-80">{getNodeIcon(node.type)}</div>
                </div>
                <span className="text-[10.5px] font-mono opacity-75 mt-1 truncate">
                  {node.role}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step-by-Step Flow Path */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Request Execution Lifecycle (Hover to highlight):
          </span>
          <span className="font-mono text-[11px] text-zinc-400">
            {flow.steps.length} Sequenced Operations
          </span>
        </div>

        <div className="space-y-2.5">
          {flow.steps.map((step, idx) => {
            const isActive = activeStep === idx;
            const fromNode = flow.nodes.find((n) => n.id === step.from);
            const toNode = flow.nodes.find((n) => n.id === step.to);

            return (
              <div
                key={idx}
                onMouseEnter={() => setActiveStep(idx)}
                onMouseLeave={() => setActiveStep(null)}
                className={`rounded-xl border p-3.5 sm:p-4 transition-all cursor-pointer ${
                  isActive
                    ? "border-zinc-400 bg-zinc-100/90 dark:border-zinc-600 dark:bg-zinc-900 shadow-xs"
                    : step.isFallback
                    ? "border-amber-200/80 bg-amber-50/40 dark:border-amber-900/40 dark:bg-amber-950/20"
                    : "border-zinc-200/80 bg-zinc-50/60 dark:border-zinc-900 dark:bg-zinc-900/40"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-start sm:items-center gap-2.5 flex-wrap">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-zinc-950 text-white font-mono text-xs font-bold dark:bg-white dark:text-zinc-950">
                      0{step.stepNumber}
                    </span>

                    <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-zinc-800 dark:text-zinc-200">
                      <span>{fromNode?.label || step.from}</span>
                      <ArrowRight className="h-3 w-3 text-zinc-400" />
                      <span>{toNode?.label || step.to}</span>
                    </div>

                    <span className="text-xs sm:text-[13px] font-bold text-zinc-950 dark:text-zinc-50">
                      • {step.action}
                    </span>

                    {step.isFallback && (
                      <span className="inline-flex items-center gap-1 rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-mono">
                        <AlertTriangle className="h-3 w-3" />
                        Fallback / Miss Path
                      </span>
                    )}
                  </div>

                  {step.latency && (
                    <div className="flex items-center gap-1 font-mono text-xs font-semibold text-zinc-500 dark:text-zinc-400 shrink-0">
                      <Clock className="h-3 w-3" />
                      <span>{step.latency}</span>
                    </div>
                  )}
                </div>

                <p className="mt-2 text-xs sm:text-[13px] text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium pl-8 sm:pl-8.5">
                  {step.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
