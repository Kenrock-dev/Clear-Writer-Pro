
import React from 'react';
import { Download, Sparkles, Shield, Zap, MousePointer2, Settings, MessageSquare, CheckCircle2, ArrowRight } from 'lucide-react';
import { generateExtensionZip } from '../services/zipGenerator';

const Features = [
  {
    title: "Instant Rewriting",
    description: "Highlight any text on any website to instantly rewrite, improve flow, or fix grammar with one click.",
    icon: <Sparkles className="w-6 h-6 text-indigo-500" />
  },
  {
    title: "Multiple AI Models",
    description: "Connect your own API keys for Google Gemini 3 or Groq (Llama 3) for lightning-fast professional edits.",
    icon: <Zap className="w-6 h-6 text-amber-500" />
  },
  {
    title: "Total Privacy",
    description: "Your API keys and rewritten text never touch our servers. Everything stays in your browser's local storage.",
    icon: <Shield className="w-6 h-6 text-emerald-500" />
  }
];

const UseCases = [
  {
    name: "Email Professionalism",
    text: "Convert quick, messy drafts into polished professional emails that command respect.",
    icon: <MessageSquare className="w-5 h-5" />
  },
  {
    name: "Creative Writing",
    text: "Stuck on a sentence? Use 'Improve flow' to find a better way to express your ideas.",
    icon: <Sparkles className="w-5 h-5" />
  },
  {
    name: "Simplification",
    text: "Make complex jargon easy for everyone to understand with the 'Simplify' feature.",
    icon: <Zap className="w-5 h-5" />
  }
];

const InstallationSteps = [
  {
    number: 1,
    title: "Download the Files",
    description: "Click the download button above to get the extension ZIP package."
  },
  {
    number: 2,
    title: "Extract & Open Extensions",
    description: "Unzip the folder. Open Chrome and go to chrome://extensions in your address bar."
  },
  {
    number: 3,
    title: "Enable Developer Mode",
    description: "Toggle the 'Developer mode' switch in the top right corner of the Extensions page."
  },
  {
    number: 4,
    title: "Load Unpacked",
    description: "Click 'Load unpacked' and select the unzipped ClearWriter Pro folder."
  }
];

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-extrabold text-slate-900 tracking-tight">ClearWriter <span className="text-indigo-600">Pro</span></span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-semibold text-slate-600">
          <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
          <a href="#install" className="hover:text-indigo-600 transition-colors">How to Install</a>
          <a href="#use-cases" className="hover:text-indigo-600 transition-colors">Use Cases</a>
        </div>
        <button 
          onClick={generateExtensionZip}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Get Extension
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold mb-6">
              <Zap className="w-3 h-3 fill-indigo-600" />
              <span>POWERED BY GEMINI & GROQ</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.1] text-slate-900 mb-6">
              Write Better. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Everywhere you type.</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-xl leading-relaxed">
              ClearWriter Pro is a lightweight Chrome extension that brings professional AI editing to every tab. Bring your own API keys for ultimate privacy and speed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={generateExtensionZip}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-xl shadow-indigo-100 transition-all flex items-center justify-center gap-3"
              >
                <Download className="w-5 h-5" />
                Download Extension ZIP
              </button>
              <a 
                href="#install"
                className="bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                View Setup Guide
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-slate-500 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                No Monthly Fees
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Local Privacy
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Universal Support
              </div>
            </div>
          </div>

          {/* Interactive Preview Mockup */}
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-400 rounded-full blur-[100px] opacity-20"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-violet-400 rounded-full blur-[100px] opacity-20"></div>
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative z-10">
              <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                </div>
                <div className="flex-1 bg-white h-7 rounded-md border border-slate-200 mx-4 flex items-center px-3 text-[10px] text-slate-400">
                  Compose - Gmail
                </div>
              </div>
              <div className="p-8 pb-12 min-h-[300px] space-y-4">
                <div className="h-4 w-3/4 bg-slate-100 rounded-full"></div>
                <div className="relative group">
                   <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100 text-slate-800 text-sm leading-relaxed cursor-default transition-all group-hover:bg-indigo-100/50">
                    Hey just checking in on the report is it ready soon? I really need to send it today to the boss.
                    <div className="absolute -top-4 right-10 bg-indigo-600 text-white p-1.5 rounded-lg shadow-lg animate-bounce">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  </div>
                  
                  {/* Floating Menu Mockup */}
                  <div className="absolute top-12 left-1/4 bg-white rounded-xl shadow-2xl border border-slate-200 w-48 p-2 z-20 animate-in fade-in slide-in-from-top-4 duration-500">
                    {['Improve flow', 'Fix grammar', 'Simplify', 'Professional tone'].map((op, i) => (
                      <div key={op} className={`p-2.5 rounded-lg text-xs font-bold ${i === 3 ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600'} flex items-center justify-between`}>
                        {op}
                        {i === 3 && <ArrowRight className="w-3 h-3" />}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="h-4 w-full bg-slate-100 rounded-full opacity-50"></div>
                <div className="h-4 w-2/3 bg-slate-100 rounded-full opacity-50"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Everything you need to write better.</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Powerful writing tools that live wherever you work — Gmail, LinkedIn, Slack, and beyond.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Features.map((f, i) => (
              <div key={i} className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all duration-300">
                <div className="mb-6 p-3 bg-white w-fit rounded-2xl shadow-sm border border-slate-100">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Guide */}
      <section id="install" className="py-24 bg-slate-900 text-white px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
              <h2 className="text-4xl font-extrabold mb-8">Ready in 2 minutes.</h2>
              <div className="space-y-10">
                {InstallationSteps.map((step, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-indigo-900/40 group-hover:scale-110 transition-transform">
                      {step.number}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-slate-400 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-indigo-500/20 p-2 rounded-lg">
                  <Settings className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold">Extension Settings</h3>
              </div>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                After installing, click the extension icon to set up your preferred provider. Use your own API keys to avoid subscriptions.
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Provider</div>
                  <div className="flex items-center justify-between font-bold text-slate-200">
                    Google Gemini 3
                    <ArrowRight className="w-4 h-4 text-slate-600" />
                  </div>
                </div>
                <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">API Key</div>
                  <div className="flex items-center justify-between font-bold text-slate-600 overflow-hidden">
                    ••••••••••••••••••••••••••••••••
                  </div>
                </div>
              </div>
              <button 
                onClick={generateExtensionZip}
                className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-950 transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Zip Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-24 bg-white px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Built for your workflow.</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Whether you're writing code documentation, customer emails, or creative stories.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {UseCases.map((uc, i) => (
              <div key={i} className="group p-1 bg-gradient-to-br from-slate-100 to-white rounded-[2rem] hover:from-indigo-100 hover:to-violet-100 transition-all">
                <div className="bg-white p-8 rounded-[1.8rem] h-full shadow-sm">
                  <div className="mb-4 text-indigo-600">{uc.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{uc.name}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{uc.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="bg-indigo-600 p-3 rounded-2xl mb-6 shadow-xl shadow-indigo-200">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Upgrade your writing today.</h2>
          <p className="text-slate-600 max-lg mb-10 leading-relaxed">
            Free to use forever with your own API keys. Professional quality rewriting at your fingertips.
          </p>
          <button 
            onClick={generateExtensionZip}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-5 rounded-3xl text-xl font-bold shadow-2xl shadow-indigo-100 transition-all active:scale-95 flex items-center gap-3"
          >
            <Download className="w-6 h-6" />
            Get ClearWriter Pro
          </button>
          <div className="mt-12 pt-8 border-t border-slate-200 w-full flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900 tracking-tight">ClearWriter <span className="text-indigo-600">Pro</span></span>
              <span className="text-xs text-slate-400">v3.5.0</span>
            </div>
            <div className="flex gap-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <span>Open Source Extension</span>
              <span>Local Execution</span>
              <span>Chrome Manifest V3</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;