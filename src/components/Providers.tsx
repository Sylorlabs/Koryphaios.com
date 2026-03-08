"use client";

import { motion } from "framer-motion";

interface Provider {
  name: string;
  url: string;
  /** filename in /providers/ (without extension), tries .png first */
  img: string;
}

function ProviderLogo({ img, name }: { img: string; name: string }) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={`/providers/${img}.png`}
      alt={name}
      width={32}
      height={32}
      className="rounded-md object-contain flex-shrink-0"
      style={{ imageRendering: "auto" }}
    />
  );
}

const providerGroups: { label: string; providers: Provider[] }[] = [
  {
    label: "Frontier Labs",
    providers: [
      { name: "Anthropic",     url: "https://anthropic.com",   img: "anthropic" },
      { name: "OpenAI",        url: "https://openai.com",       img: "openai" },
      { name: "Google Gemini", url: "https://ai.google.dev",   img: "googlegemini" },
      { name: "xAI",           url: "https://x.ai",             img: "xai" },
      { name: "DeepSeek",      url: "https://deepseek.com",     img: "deepseek" },
      { name: "Mistral",       url: "https://mistral.ai",       img: "mistral" },
    ],
  },
  {
    label: "Fast Inference",
    providers: [
      { name: "Groq",         url: "https://groq.com",        img: "groq" },
      { name: "Cerebras",     url: "https://cerebras.ai",     img: "cerebras" },
      { name: "Fireworks AI", url: "https://fireworks.ai",    img: "fireworks" },
      { name: "Together AI",  url: "https://together.ai",     img: "together" },
      { name: "DeepInfra",    url: "https://deepinfra.com",   img: "deepinfra" },
      { name: "SiliconFlow",  url: "https://siliconflow.cn",  img: "siliconflow" },
    ],
  },
  {
    label: "Aggregators & Gateways",
    providers: [
      { name: "OpenRouter",     url: "https://openrouter.ai",                     img: "openrouter" },
      { name: "Portkey",        url: "https://portkey.ai",                         img: "portkey" },
      { name: "Helicone",       url: "https://helicone.ai",                        img: "helicone" },
      { name: "Requesty",       url: "https://requesty.ai",                        img: "requesty" },
      { name: "GitHub Models",  url: "https://github.com/marketplace/models",     img: "github" },
    ],
  },
  {
    label: "Cloud Platforms",
    providers: [
      { name: "AWS Bedrock",    url: "https://aws.amazon.com/bedrock",                                           img: "aws" },
      { name: "Azure OpenAI",   url: "https://azure.microsoft.com/products/ai-services/openai-service",         img: "azure" },
      { name: "Google Vertex",  url: "https://cloud.google.com/vertex-ai",    img: "googlecloud" },
      { name: "GitHub Copilot", url: "https://github.com/features/copilot",   img: "github" },
      { name: "Cloudflare AI",  url: "https://ai.cloudflare.com",             img: "cloudflare" },
      { name: "Vercel AI",      url: "https://vercel.com/ai",                 img: "vercel" },
    ],
  },
  {
    label: "Local & Self Hosted",
    providers: [
      { name: "Ollama",    url: "https://ollama.ai",                      img: "ollama" },
      { name: "LM Studio", url: "https://lmstudio.ai",                    img: "lmstudio" },
      { name: "llama.cpp", url: "https://github.com/ggml-org/llama.cpp", img: "llamacpp" },
    ],
  },
  {
    label: "Specialized & Regional",
    providers: [
      { name: "Moonshot (Kimi)", url: "https://moonshot.ai",    img: "moonshot" },
      { name: "MiniMax",         url: "https://minimaxi.com",   img: "minimax" },
      { name: "Nebius",          url: "https://nebius.ai",      img: "nebius" },
      { name: "Venice",          url: "https://venice.ai",      img: "venice" },
      { name: "Scaleway",        url: "https://scaleway.com",   img: "scaleway" },
      { name: "HuggingFace",     url: "https://huggingface.co", img: "huggingface" },
    ],
  },
  {
    label: "Additional Providers",
    providers: [
      { name: "Cohere",      url: "https://cohere.com",                 img: "cohere" },
      { name: "Perplexity",  url: "https://perplexity.ai",              img: "perplexity" },
      { name: "Replicate",   url: "https://replicate.com",              img: "replicate" },
      { name: "Modal",       url: "https://modal.com",                  img: "modal" },
      { name: "NVIDIA NIM",  url: "https://developer.nvidia.com/nim",   img: "nvidia" },
      { name: "OVHcloud",    url: "https://ovhcloud.com",               img: "ovh" },
    ],
  },
];

export default function Providers() {
  return (
    <section id="providers" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="kintsugi-badge mb-6 inline-flex">40+ Providers</span>
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--porcelain)] mb-4">
            Every model. One dashboard.
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Koryphaios auto detects your API keys, routes to the best available model,
            and fails over automatically when a provider goes down. Circuit breaker pattern
            with fallback chains up to 25 models deep.
          </p>
        </motion.div>

        {/* Provider groups */}
        <div className="max-w-6xl mx-auto space-y-6">
          {providerGroups.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: gi * 0.06 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xs uppercase tracking-[0.3em] text-[var(--kintsugi-gold)] mb-3 font-semibold">
                {group.label}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {group.providers.map((provider) => (
                  <a
                    key={provider.name}
                    href={provider.url}
                    target="_blank"
                    rel="noreferrer"
                    className="provider-card hover:border-[var(--kintsugi-gold)] hover:text-[var(--kintsugi-gold)] transition-all cursor-pointer flex flex-col items-center gap-2 py-4 text-center"
                  >
                    <ProviderLogo img={provider.img} name={provider.name} />
                    <span className="text-xs leading-tight">{provider.name}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-xs text-[var(--text-secondary)] mt-8 text-center opacity-60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Provider costs are pass through. No markup. You pay them directly at their published rates.
        </motion.p>
      </div>
    </section>
  );
}
