/* ── Theme tokens ─────────────────────────────────────────────────────── */
export const S0 = "#0a0a0b";
export const S1 = "#111113";
export const S2 = "#1a1a1e";
export const S3 = "#242428";
export const BORDER = "#2a2a30";
export const TEXT = "#e8e8ed";
export const TEXT2 = "#8b8b96";
export const MUTED = "#5a5a66";
export const ACCENT = "#6366f1";
export const SUCCESS = "#22c55e";
export const WARNING = "#f59e0b";

/* ── Demo data (static, defined outside component) ────────────────────── */
export const WORKERS = [
  { id: "frontend", name: "frontend", domain: "ui", color: "#00ffff", provider: "Codex", model: "gpt-5.4", ctxMax: 500000 },
  { id: "backend", name: "backend", domain: "backend", color: "#4285f4", provider: "Google", model: "gemini-3.1-pro", ctxMax: 1000000 },
  { id: "testing", name: "testing", domain: "test", color: "#00ff80", provider: "Anthropic", model: "claude-sonnet-4.6", ctxMax: 1000000 },
] as const;

export type Worker = typeof WORKERS[number];

export const SESSIONS = [
  { id: "s1", title: "Analytics Dashboard", active: true, time: "14:32", msgs: 12, cost: "$0.08" },
  { id: "s2", title: "Auth refactor", active: false, time: "12:17", msgs: 34, cost: "$0.21" },
  { id: "s3", title: "CI pipeline fixes", active: false, time: "09:05", msgs: 18, cost: "$0.14" },
  { id: "s4", title: "API v2 migration", active: false, time: "Mar 7", msgs: 45, cost: "$0.37" },
] as const;

export const STAGED = [
  { path: "src/components/Dashboard.svelte", status: "added", additions: 78 },
  { path: "src/components/ChartCard.svelte", status: "added", additions: 52 },
  { path: "src/routes/api/analytics/+server.ts", status: "added", additions: 45 },
  { path: "src/lib/db/queries.ts", status: "added", additions: 33 },
  { path: "tests/analytics.test.ts", status: "added", additions: 62 },
] as const;

export const SUGGESTIONS = [
  { label: "Build a new UI component", Icon: null as any, prompt: "Build a beautiful, responsive landing page using Tailwind and Svelte." },
  { label: "Debug an issue", Icon: null as any, prompt: "Help me find and fix a bug in my authentication logic." },
  { label: "Refactor for performance", Icon: null as any, prompt: "Analyze my code and suggest performance optimizations." },
  { label: "Write unit tests", Icon: null as any, prompt: "Generate comprehensive unit tests for my backend API routes." },
] as const;

export const MOBILE_SUGGESTIONS = ["UI Component", "Debug Issue", "Performance", "Unit Tests"] as const;

export const PROMPT = "build a full-stack analytics dashboard with charts, API routes, and tests";

// Extended chat messages for each worker
export const WORKER_CHATS: Record<string, Array<{role: string; content: string; timestamp: string; status?: string}>> = {
  frontend: [
    { role: "manager", content: "Create a comprehensive analytics dashboard with multiple chart types. The dashboard should display user metrics, revenue data, and engagement statistics.", timestamp: "14:32:05", status: "done" },
    { role: "worker", content: "I'll create a beautiful analytics dashboard with Svelte components. Starting with the main Dashboard layout and ChartCard components.", timestamp: "14:32:06", status: "done" },
    { role: "tool", content: "write_file: src/components/Dashboard.svelte (+78 lines)\n\n- Responsive grid layout\n- Summary cards for key metrics\n- Dark mode support\n- Loading states with skeleton UI", timestamp: "14:32:08", status: "done" },
    { role: "worker", content: "Now creating the reusable ChartCard component for displaying different visualization types.", timestamp: "14:32:10", status: "done" },
    { role: "tool", content: "write_file: src/components/ChartCard.svelte (+52 lines)\n\n- Bar, line, and pie chart support\n- Interactive tooltips\n- Animated transitions\n- Export to PNG/SVG", timestamp: "14:32:12", status: "done" },
    { role: "worker", content: "Dashboard components complete. All charts are responsive and include loading states.", timestamp: "14:32:15", status: "done" },
  ],
  backend: [
    { role: "manager", content: "Build the API layer for the analytics dashboard. We need endpoints for user metrics, revenue data, and engagement stats.", timestamp: "14:32:05", status: "done" },
    { role: "worker", content: "Creating the main analytics API endpoint with proper TypeScript types and validation.", timestamp: "14:32:07", status: "done" },
    { role: "tool", content: "write_file: src/routes/api/analytics/+server.ts (+45 lines)\n\n- GET /api/analytics - Aggregate metrics\n- Query parameter validation with Zod\n- Caching headers for 5min\n- Error handling middleware", timestamp: "14:32:09", status: "done" },
    { role: "worker", content: "Now adding the database query utilities for efficient data aggregation.", timestamp: "14:32:13", status: "done" },
    { role: "tool", content: "write_file: src/lib/db/queries.ts (+33 lines)\n\n- getUserMetrics() with time ranges\n- getRevenueStats() with currency conversion\n- getEngagementData() with cohort analysis\n- Indexed query optimization", timestamp: "14:32:16", status: "done" },
    { role: "worker", content: "Backend API complete. All endpoints include proper validation and caching.", timestamp: "14:32:18", status: "done" },
  ],
  testing: [
    { role: "manager", content: "Write comprehensive tests for the analytics dashboard covering both frontend components and backend API routes.", timestamp: "14:32:05", status: "done" },
    { role: "worker", content: "Creating test suite for analytics functionality with unit and integration tests.", timestamp: "14:32:11", status: "done" },
    { role: "tool", content: "write_file: tests/analytics.test.ts (+62 lines)\n\n- Dashboard component rendering tests\n- ChartCard interaction tests\n- API endpoint integration tests\n- Edge case coverage (empty data, errors)\n- Accessibility tests with axe-core", timestamp: "14:32:13", status: "done" },
    { role: "worker", content: "Test suite complete. 94% code coverage achieved with 12 test cases.", timestamp: "14:32:17", status: "done" },
  ],
};

// Manager chat history
export const MANAGER_CHAT = [
  { role: "user", content: "build a full-stack analytics dashboard with charts, API routes, and tests", timestamp: "14:32:01" },
  { role: "manager", content: "Analyzing your request... This involves UI components, backend API development, and test coverage. I'll decompose this into 3 parallel subtasks.", timestamp: "14:32:03", status: "analyzing" },
  { role: "manager", content: "Task decomposition complete:\n\n1. frontend → gpt-5.4 (UI components, charts, responsive design)\n2. backend → gemini-3.1-pro (API routes, database queries, caching)\n3. testing → claude-sonnet-4.6 (unit tests, integration tests, coverage)\n\nAll workers will run in isolated worktrees. Estimated cost: $0.08-0.12", timestamp: "14:32:05", status: "routing" },
  { role: "worker", content: "frontend: Starting Dashboard.svelte component creation...", timestamp: "14:32:06" },
  { role: "worker", content: "backend: Initializing API route structure for analytics endpoints...", timestamp: "14:32:07" },
  { role: "worker", content: "frontend: Dashboard.svelte complete (+78 lines)", timestamp: "14:32:08" },
  { role: "worker", content: "backend: +server.ts created with GET /api/analytics endpoint (+45 lines)", timestamp: "14:32:09" },
  { role: "worker", content: "frontend: Creating ChartCard.svelte reusable component...", timestamp: "14:32:10" },
  { role: "worker", content: "testing: Starting test suite for analytics components...", timestamp: "14:32:11" },
  { role: "worker", content: "frontend: ChartCard.svelte complete with 3 chart types (+52 lines)", timestamp: "14:32:12" },
  { role: "worker", content: "testing: analytics.test.ts created with 12 test cases (+62 lines)", timestamp: "14:32:13" },
  { role: "worker", content: "backend: Adding database query utilities to queries.ts...", timestamp: "14:32:14" },
  { role: "worker", content: "testing: All tests passing. 94% coverage achieved.", timestamp: "14:32:15" },
  { role: "worker", content: "backend: queries.ts complete with optimized aggregations (+33 lines)", timestamp: "14:32:16" },
  { role: "manager", content: "All workers have completed their tasks. Sending to Critic for quality review...", timestamp: "14:32:17" },
  { role: "critic", content: "Reviewing 5 files across 3 workers...\n\n✓ Dashboard.svelte - Clean component structure, good accessibility\n✓ ChartCard.svelte - Well-typed props, smooth animations\n✓ +server.ts - Proper error handling, caching headers set\n✓ queries.ts - Efficient queries with proper indexing hints\n✓ analytics.test.ts - Good coverage, edge cases handled\n\nResult: PASS - No issues found", timestamp: "14:32:19", status: "verifying" },
  { role: "shadow", content: "All changes saved to ghost commit a3f2c1d. You can undo this operation at any time. Total cost: $0.12 (6,841 tokens across 3 providers)", timestamp: "14:32:21", status: "done" },
];

// Settings configuration data
export const SETTINGS_DATA = {
  providers: [
    { name: "OpenAI", enabled: true, key: "sk-••••••••••••••••••••••••••••••", models: ["gpt-4.1", "gpt-4.5-preview", "o1", "o3-mini"] },
    { name: "Anthropic", enabled: true, key: "sk-ant-••••••••••••••••••••••", models: ["claude-opus-4", "claude-sonnet-4.6", "claude-haiku-4"] },
    { name: "Google", enabled: true, key: "AIza••••••••••••••••••••••••••••", models: ["gemini-2.5-pro", "gemini-3.1-pro"] },
    { name: "Codex", enabled: true, key: "sk-••••••••••••••••••••••••••••••", models: ["gpt-5.4"] },
  ],
  preferences: {
    autoCommit: true,
    autoLint: true,
    parallelWorkers: 3,
    contextWindow: "large",
    theme: "dark",
    fontSize: 14,
  },
  shortcuts: [
    { key: "⌘K", action: "Command palette" },
    { key: "⌘Enter", action: "Send message" },
    { key: "⌘ShiftEnter", action: "Commit changes" },
    { key: "⌘B", action: "Toggle sidebar" },
    { key: "⌘P", action: "Quick file open" },
    { key: "⌘Z", action: "Undo last operation" },
  ],
};

// Commands palette data
export const COMMANDS = [
  { category: "Actions", items: [
    { name: "New Session", shortcut: "⌘N", icon: "Plus" },
    { name: "Send Message", shortcut: "⌘Enter", icon: "Send" },
    { name: "Commit Changes", shortcut: "⌘ShiftEnter", icon: "GitCommit" },
    { name: "Undo Last Operation", shortcut: "⌘Z", icon: "RefreshCw" },
  ]},
  { category: "Workers", items: [
    { name: "View Frontend Worker", shortcut: "", icon: "Paintbrush" },
    { name: "View Backend Worker", shortcut: "", icon: "Terminal" },
    { name: "View Testing Worker", shortcut: "", icon: "Beaker" },
    { name: "View Manager Chat", shortcut: "", icon: "MessageSquare" },
  ]},
  { category: "Settings", items: [
    { name: "API Providers", shortcut: "", icon: "Key" },
    { name: "Preferences", shortcut: "", icon: "Settings" },
    { name: "Keyboard Shortcuts", shortcut: "", icon: "Command" },
  ]},
];

/* ── Helper functions ─────────────────────────────────────────────────── */
export function statusLetter(s: string) { return s === "added" ? "A" : s === "modified" ? "M" : s === "deleted" ? "D" : "?"; }
export function statusColor(s: string) { return s === "added" ? "#4ade80" : s === "modified" ? "#fbbf24" : s === "deleted" ? "#f87171" : TEXT2; }
