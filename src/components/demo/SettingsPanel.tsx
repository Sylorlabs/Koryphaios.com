"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Settings, X, Copy, CheckCircle2 } from "lucide-react";
import { S1, S2, S3, BORDER, TEXT, TEXT2, MUTED, ACCENT, SUCCESS, SETTINGS_DATA } from "./types";

interface SettingsPanelProps {
  onClose: () => void;
}

export const SettingsPanel = ({ onClose }: SettingsPanelProps) => {
  const [activeTab, setActiveTab] = useState<"providers" | "preferences" | "shortcuts">("providers");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyKey = useCallback((providerName: string) => {
    setCopiedKey(providerName);
    setTimeout(() => setCopiedKey(null), 2000);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-2xl rounded-xl overflow-hidden"
        style={{ background: S1, border: `1px solid ${BORDER}` }}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: BORDER }}>
          <div className="flex items-center gap-2">
            <Settings size={18} style={{ color: ACCENT }} />
            <span className="font-semibold" style={{ color: TEXT }}>Settings</span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/5" style={{ color: MUTED }}>
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b" style={{ borderColor: BORDER }}>
          {(["providers", "preferences", "shortcuts"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2.5 text-sm font-medium capitalize transition-colors"
              style={{ 
                color: activeTab === tab ? ACCENT : TEXT2,
                borderBottom: activeTab === tab ? `2px solid ${ACCENT}` : "2px solid transparent",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-4" style={{ maxHeight: 400, overflowY: "auto" }}>
          {activeTab === "providers" && (
            <div className="space-y-4">
              {SETTINGS_DATA.providers.map((provider) => (
                <div key={provider.name} className="p-3 rounded-lg" style={{ background: S2 }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: provider.enabled ? SUCCESS : MUTED }} />
                      <span className="font-medium text-sm" style={{ color: TEXT }}>{provider.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs" style={{ color: provider.enabled ? SUCCESS : MUTED }}>
                        {provider.enabled ? "Enabled" : "Disabled"}
                      </span>
                      <div className="w-8 h-4 rounded-full relative cursor-pointer" style={{ background: provider.enabled ? ACCENT : S3 }}>
                        <div className="absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all" style={{ left: provider.enabled ? "18px" : "2px" }} />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={provider.key}
                      readOnly
                      className="flex-1 text-xs px-2 py-1.5 rounded border font-mono"
                      style={{ background: S1, borderColor: BORDER, color: TEXT2 }}
                    />
                    <button
                      onClick={() => copyKey(provider.name)}
                      className="p-1.5 rounded"
                      style={{ background: S3, color: copiedKey === provider.name ? SUCCESS : MUTED }}
                    >
                      {copiedKey === provider.name ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {provider.models.map((model) => (
                      <span key={model} className="text-[10px] px-2 py-0.5 rounded" style={{ background: S3, color: TEXT2 }}>
                        {model}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "preferences" && (
            <div className="space-y-4">
              <div className="p-3 rounded-lg" style={{ background: S2 }}>
                <h4 className="text-sm font-medium mb-3" style={{ color: TEXT }}>General</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: TEXT2 }}>Auto-commit on completion</span>
                    <div className="w-8 h-4 rounded-full relative" style={{ background: SETTINGS_DATA.preferences.autoCommit ? ACCENT : S3 }}>
                      <div className="absolute top-0.5 w-3 h-3 rounded-full bg-white" style={{ left: SETTINGS_DATA.preferences.autoCommit ? "18px" : "2px" }} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: TEXT2 }}>Auto-run linter on save</span>
                    <div className="w-8 h-4 rounded-full relative" style={{ background: SETTINGS_DATA.preferences.autoLint ? ACCENT : S3 }}>
                      <div className="absolute top-0.5 w-3 h-3 rounded-full bg-white" style={{ left: SETTINGS_DATA.preferences.autoLint ? "18px" : "2px" }} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: TEXT2 }}>Parallel workers</span>
                    <select className="text-xs px-2 py-1 rounded border" style={{ background: S1, borderColor: BORDER, color: TEXT }}>
                      {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-lg" style={{ background: S2 }}>
                <h4 className="text-sm font-medium mb-3" style={{ color: TEXT }}>Appearance</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: TEXT2 }}>Theme</span>
                    <select className="text-xs px-2 py-1 rounded border" style={{ background: S1, borderColor: BORDER, color: TEXT }}>
                      <option>Dark</option>
                      <option>Light</option>
                      <option>System</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: TEXT2 }}>Font size</span>
                    <div className="flex items-center gap-2">
                      <button className="px-2 py-0.5 rounded text-xs" style={{ background: S3, color: TEXT2 }}>-</button>
                      <span className="text-xs w-6 text-center" style={{ color: TEXT }}>{SETTINGS_DATA.preferences.fontSize}px</span>
                      <button className="px-2 py-0.5 rounded text-xs" style={{ background: S3, color: TEXT2 }}>+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "shortcuts" && (
            <div className="space-y-2">
              {SETTINGS_DATA.shortcuts.map((shortcut) => (
                <div key={shortcut.action} className="flex items-center justify-between p-3 rounded-lg" style={{ background: S2 }}>
                  <span className="text-xs" style={{ color: TEXT2 }}>{shortcut.action}</span>
                  <kbd className="text-xs px-2 py-1 rounded font-mono" style={{ background: S3, color: TEXT }}>{shortcut.key}</kbd>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
