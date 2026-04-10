import { useState, useRef, useEffect, useMemo } from "react";
import logo from "./assets/logo.png";
import mePhoto from "./assets/me.png";

// ─── Icons ───────────────────────────────────────────────────────────────────

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const SidebarToggleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <line x1="9" y1="3" x2="9" y2="21"/>
  </svg>
);

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
    <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
  </svg>
);

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);

// ─── Constants ────────────────────────────────────────────────────────────────

const HIRE_ME_CHAT = {
  id: "hire-me",
  title: "Hire me!",
  messages: [
    {
      role: "user",
      content: "I'd love to get in touch. How can I contact you?",
    },
    {
      role: "assistant",
      content: "HIRE_ME_CONTACTS",
    },
  ],
};

const INITIAL_CHATS = [
  {
    id: 1,
    title: "E-commerce & Web Development Experience",
    messages: [
      {
        role: "user",
        content: "Can you walk me through your experience in e-commerce and web development?",
      },
      {
        role: "assistant",
        content:
          "Absolutely! I have over seven years of experience working at the intersection of e-commerce and web development. I started on the business side, managing digital operations and campaigns, and naturally evolved into a more technical role as I became deeply involved in website optimization and performance. At Oba Hortifruti, I led the migration to VTEX and worked end-to-end on the e-commerce operation, including UX improvements, front-end adjustments, and integration with internal systems. I also collaborated closely with developers to enhance site performance and user experience. Before that, at Kärcher Brazil, I contributed to UX/UI improvements and digital optimization projects. Over time, I built strong technical skills in HTML, CSS, JavaScript, React, PHP, and Python/Django, which allow me to bridge the gap between business needs and technical execution.",
      },
    ],
  },
  {
    id: 2,
    title: "Measurable Business Impact",
    messages: [
      {
        role: "user",
        content: "What measurable results have you achieved in your previous roles?",
      },
      {
        role: "assistant",
        content:
          "In my most recent role, I focused heavily on data-driven optimization and performance improvement. By leveraging tools like GA4, GTM, and user behavior analysis (including heatmaps), I identified key friction points in the user journey and implemented targeted improvements. These efforts resulted in a 49% increase in revenue over a 12-month period. I also contributed to category growth campaigns that achieved around 30% uplift in specific product segments. Beyond revenue, I improved key metrics such as conversion rate, bounce rate, and average session duration by continuously testing and refining landing pages, product pages, and checkout flows.",
      },
    ],
  },
  {
    id: 3,
    title: "Bridging Tech & Business",
    messages: [
      {
        role: "user",
        content: "How do you combine technical development with business goals in your projects?",
      },
      {
        role: "assistant",
        content:
          "I always start by understanding the business objective — whether it's increasing conversion, improving retention, or boosting average order value. From there, I translate those goals into technical and UX solutions. For example, instead of just building a page, I focus on how layout, performance, and content hierarchy impact user behavior. I use data to guide decisions, prioritize changes based on impact, and validate results through testing. Because I have both technical and business experience, I can communicate effectively with stakeholders, designers, and developers, ensuring that every implementation aligns with measurable outcomes. My goal is always the same: build solutions that not only work technically, but also drive real business results.",
      },
    ],
  },
];

const SUGGESTED_PROMPTS = [
  { label: "Review your e-commerce experience", sub: "and tell me more about it" },
  { label: "What results have you achieved?", sub: "in your previous roles" },
  { label: "Can you walk me through your experience in e-commerce", sub: "and web development?" },
  { label: "Tell me more about your", sub: "projects" },
];

// ─── Theme helper ─────────────────────────────────────────────────────────────

function getTheme(dark) {
  return {
    bg: dark ? "#212121" : "#ffffff",
    sidebar: dark ? "#171717" : "#f9f9f9",
    text: dark ? "#ececec" : "#0d0d0d",
    textMuted: dark ? "#8e8ea0" : "#6e6e80",
    border: dark ? "#2f2f2f" : "#e5e5e5",
    hover: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
    active: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)",
    inputBg: dark ? "#2f2f2f" : "#f4f4f4",
    inputBorder: dark ? "#3f3f3f" : "#d9d9d9",
    bubbleUser: dark ? "#2f2f2f" : "#f4f4f4",
    suggestBg: dark ? "#2a2a2a" : "#f9f9f9",
    suggestHover: dark ? "#333333" : "#f0f0f0",
    suggestBorder: dark ? "#3a3a3a" : "#e5e5e5",
    bubbleAssistant: "transparent",
  };
}

// ─── Contact content ──────────────────────────────────────────────────────────

function ContactMessage({ t }) {
  const contacts = [
    {
      icon: <EmailIcon />,
      label: "Email",
      value: "bellamarcucci@gmail.com",
      href: "mailto:bellamarcucci@gmail.com",
    },
    {
      icon: <LinkedInIcon />,
      label: "LinkedIn",
      value: "linkedin.com/in/isabellamarcucci",
      href: "https://www.linkedin.com/in/isabellamarcucci",
    },
    {
      icon: <GitHubIcon />,
      label: "GitHub",
      value: "github.com/bellamarcucci",
      href: "https://github.com/bellamarcucci",
    },
  ];

  return (
    <div style={{ color: t.text }} className="text-sm leading-relaxed pt-1">
      <p className="mb-4">
        Absolutely — here&apos;s how you can reach me. I&apos;d be happy to talk
        about web development, e-commerce, UX, and digital growth opportunities.
      </p>

      <div className="space-y-3">
        {contacts.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: t.text,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
            className="group"
          >
            <div
              style={{ color: t.textMuted }}
              className="flex items-center justify-center flex-shrink-0"
            >
              {c.icon}
            </div>

            <div>
              <div
                style={{ color: t.textMuted }}
                className="text-[11px] font-semibold uppercase tracking-[0.06em] mb-0.5"
              >
                {c.label}
              </div>
              <div style={{ color: t.text }} className="text-sm group-hover:underline">
                {c.value}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({
  mobile,
  t,
  dark,
  chats,
  activeChatId,
  onSelectChat,
  onDeleteChat,
  onToggleDark,
  onCloseMobile,
  onToggleSidebar,
  onHireMe,
}) {
  const hoverStyle = (e) => (e.currentTarget.style.background = t.hover);
  const clearStyle = (e) => (e.currentTarget.style.background = "transparent");

  return (
    <div style={{ background: t.sidebar, color: t.text }} className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 pt-4 pb-3">
        <img src={logo} alt="Logo" className="h-8 w-auto object-contain" style={{ maxWidth: 120 }} />
        <button
          onClick={mobile ? onCloseMobile : onToggleSidebar}
          style={{ color: t.textMuted }}
          className="p-2 rounded-lg transition-colors"
          onMouseEnter={hoverStyle}
          onMouseLeave={clearStyle}
        >
          <SidebarToggleIcon />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-1">
        {chats.length > 0 && (
          <p style={{ color: t.textMuted }} className="text-xs font-semibold px-2 py-2 uppercase tracking-wider">
            Recents
          </p>
        )}

        {chats.map((chat) => {
          const isActive = activeChatId === chat.id;

          return (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              style={{ background: isActive ? t.active : "transparent", color: t.text }}
              className="group relative flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer text-sm transition-colors mb-0.5"
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.background = t.hover;
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = "transparent";
              }}
            >
              <span className="flex-1 truncate">{chat.title}</span>

              <button
                onClick={(e) => onDeleteChat(chat.id, e)}
                style={{ color: t.textMuted }}
                className="opacity-0 group-hover:opacity-100 p-1 rounded-md transition-all hover:text-red-400 flex-shrink-0"
              >
                <TrashIcon />
              </button>
            </div>
          );
        })}
      </div>

      <div style={{ borderTop: `1px solid ${t.border}` }} className="p-3 space-y-1">
        <button
          onClick={onHireMe}
          style={{
            background: activeChatId === "hire-me" ? t.active : "transparent",
            color: t.text,
            cursor: "pointer",
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors"
          onMouseEnter={hoverStyle}
          onMouseLeave={clearStyle}
        >
          <span style={{ fontSize: 16 }}>👋</span>
          <span>Hire me!</span>
        </button>

        <div className="flex items-center justify-between px-3 py-1.5">
          <span style={{ color: t.textMuted }} className="text-xs">
            {dark ? "Dark mode" : "Light mode"}
          </span>

          <button
            onClick={onToggleDark}
            style={{ color: t.textMuted }}
            className="p-1.5 rounded-lg transition-colors"
            onMouseEnter={hoverStyle}
            onMouseLeave={clearStyle}
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function ChatApp() {
  const [dark, setDark] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [chats, setChats] = useState(INITIAL_CHATS);
  const [activeChatId, setActiveChatId] = useState(null);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const t = getTheme(dark);
  const isHireMeChat = activeChatId === "hire-me";

  const activeChat = isHireMeChat ? HIRE_ME_CHAT : chats.find((c) => c.id === activeChatId);
  const messages = useMemo(() => activeChat?.messages ?? [], [activeChat]);

  useEffect(() => {
    document.title = activeChat ? `${activeChat.title} — BELL.Ai` : "BELL.Ai";

    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.type = "image/png";
    link.href = logo;
  }, [activeChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleNewChat = () => {
    const newId = Date.now();
    setChats((prev) => [{ id: newId, title: "New chat", messages: [] }, ...prev]);
    setActiveChatId(newId);
    setMobileSidebar(false);
  };

  const handleHireMe = () => {
    setActiveChatId("hire-me");
    setMobileSidebar(false);
  };

  const handleSelectChat = (id) => {
    setActiveChatId(id);
    setMobileSidebar(false);
  };

  const handleDeleteChat = (id, e) => {
    e.stopPropagation();
    setChats((prev) => prev.filter((c) => c.id !== id));
    if (activeChatId === id) setActiveChatId(null);
  };

  const handleSend = async (textOverride) => {
    const content = (textOverride ?? input).trim();
    if (!content || isHireMeChat) return;

    let chatId = activeChatId;

    if (!chatId) {
      chatId = Date.now();
      const title = content.length > 35 ? `${content.slice(0, 35)}…` : content;
      setChats((prev) => [{ id: chatId, title, messages: [] }, ...prev]);
      setActiveChatId(chatId);
    }

    const userMsg = { role: "user", content };

    setChats((prev) =>
      prev.map((c) =>
        c.id === chatId
          ? {
              ...c,
              title:
                c.messages.length === 0
                  ? content.length > 35
                    ? `${content.slice(0, 35)}…`
                    : content
                  : c.title,
              messages: [...c.messages, userMsg],
            }
          : c
      )
    );

    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("https://ai-agents-2.onrender.com/api/v1/test/bell-ai/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: content,
          conversation_id: chatId.toString(),
          agent_type: "BellAi",
        }),
      });

      const data = await response.json();
      const reply = data?.text || "No response from server";

      setChats((prev) =>
        prev.map((c) =>
          c.id === chatId
            ? { ...c, messages: [...c.messages, { role: "assistant", content: reply }] }
            : c
        )
      );
    } catch (error) {
      console.error("Error sending message:", error);

      setChats((prev) =>
        prev.map((c) =>
          c.id === chatId
            ? {
                ...c,
                messages: [...c.messages, { role: "assistant", content: "Ops! Something went wrong." }],
              }
            : c
        )
      );
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const sidebarProps = {
    t,
    dark,
    chats,
    activeChatId,
    onSelectChat: handleSelectChat,
    onDeleteChat: handleDeleteChat,
    onToggleDark: () => setDark((d) => !d),
    onCloseMobile: () => setMobileSidebar(false),
    onToggleSidebar: () => setSidebarOpen(false),
    onHireMe: handleHireMe,
  };

  const hov = (e) => {
    e.currentTarget.style.background = t.hover;
  };

  const clr = (e) => {
    e.currentTarget.style.background = "transparent";
  };

  const mobileComposerSpace = isHireMeChat ? 24 : 118;

  return (
    <div
      style={{
        background: t.bg,
        color: t.text,
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      }}
      className="flex h-[100dvh] w-screen overflow-hidden md:h-screen"
    >
      {sidebarOpen && (
        <div
          style={{ borderRight: `1px solid ${t.border}`, width: 260 }}
          className="hidden md:flex flex-col flex-shrink-0 h-full"
        >
          <Sidebar {...sidebarProps} />
        </div>
      )}

      {mobileSidebar && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div style={{ width: 280 }} className="h-[100dvh] flex flex-col shadow-2xl">
            <Sidebar {...sidebarProps} mobile />
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setMobileSidebar(false)} />
        </div>
      )}

      <div className="flex flex-col flex-1 min-w-0 min-h-0 h-[100dvh] md:h-full">
        <div
          style={{ borderBottom: `1px solid ${t.border}` }}
          className="flex items-center justify-between px-3 sm:px-4 py-3 flex-shrink-0"
        >
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => setMobileSidebar(true)}
              style={{ color: t.textMuted }}
              className="md:hidden p-2 rounded-lg transition-colors flex-shrink-0"
              onMouseEnter={hov}
              onMouseLeave={clr}
            >
              <SidebarToggleIcon />
            </button>

            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                style={{ color: t.textMuted }}
                className="hidden md:flex p-2 rounded-lg transition-colors"
                onMouseEnter={hov}
                onMouseLeave={clr}
              >
                <SidebarToggleIcon />
              </button>
            )}

            <img src={logo} alt="Logo" className="h-7 w-auto object-contain" style={{ maxWidth: 100 }} />
          </div>

          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <button
              onClick={() => setDark((d) => !d)}
              style={{ color: t.textMuted }}
              className="p-2 rounded-lg transition-colors"
              onMouseEnter={hov}
              onMouseLeave={clr}
            >
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>

            <button
              onClick={handleNewChat}
              style={{ color: t.text, cursor: "pointer"}}
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
              onMouseEnter={hov}
              onMouseLeave={clr}
            >
              <EditIcon />
              <span className="hidden sm:inline">New Chat</span>
            </button>
          </div>
        </div>

        <div
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain"
          style={{
            paddingBottom: `${mobileComposerSpace}px`,
          }}
        >
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-full px-4 py-8 md:py-10">
              <img src={logo} alt="Logo" className="h-14 md:h-16 w-auto object-contain mb-5 md:mb-6" style={{ maxWidth: 160 }} />
              <h1 style={{ color: t.text }} className="text-xl md:text-2xl font-bold mb-1 text-center">
                What would you like to know about me?
              </h1>
              <p style={{ color: t.textMuted }} className="text-sm mb-6 md:mb-8 text-center">
                Start a conversation or choose a suggestion below
              </p>

              <div className="grid grid-cols-1 gap-3 w-full max-w-xl sm:grid-cols-2">
                {SUGGESTED_PROMPTS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(`${s.label} ${s.sub}`)}
                    style={{
                      background: t.suggestBg,
                      borderColor: t.suggestBorder,
                      color: t.text,
                      cursor: "pointer",
                    }}
                    className="text-left px-4 py-3.5 rounded-xl border text-sm transition-all"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = t.suggestHover;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = t.suggestBg;
                    }}
                  >
                    <div className="font-medium mb-0.5">{s.label}</div>
                    <div style={{ color: t.textMuted }} className="text-xs">
                      {s.sub}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto px-3 sm:px-4 py-4 md:py-6 space-y-5 md:space-y-6 w-full">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2.5 sm:gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex-shrink-0 mt-0.5 overflow-hidden shadow-md">
                      <img src={mePhoto} alt="Isabella" className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="max-w-[88%] sm:max-w-[75%]">
                    {msg.role === "user" ? (
                      <div
                        style={{ background: t.bubbleUser, color: t.text }}
                        className="px-4 py-2.5 rounded-2xl rounded-tr-sm text-sm leading-relaxed break-words"
                      >
                        {msg.content}
                      </div>
                    ) : msg.content === "HIRE_ME_CONTACTS" ? (
                      <ContactMessage t={t} />
                    ) : (
                      <div style={{ color: t.text }} className="text-sm leading-relaxed pt-1 break-words">
                        {msg.content}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2.5 sm:gap-3 justify-start">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex-shrink-0 mt-0.5 overflow-hidden shadow-md">
                    <img src={mePhoto} alt="Isabella" className="w-full h-full object-cover" />
                  </div>

                  <div
                    style={{ background: t.bubbleUser }}
                    className="px-4 py-3.5 rounded-2xl rounded-tl-sm flex items-center gap-1.5"
                  >
                    {[0, 150, 300].map((delay, idx) => (
                      <span
                        key={idx}
                        style={{ background: t.textMuted, animationDelay: `${delay}ms` }}
                        className="w-2 h-2 rounded-full animate-bounce block"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {!isHireMeChat && (
          <div
            className="md:relative md:px-4 md:pb-5 md:pt-2 flex-shrink-0 fixed bottom-0 left-0 right-0 z-30 md:z-auto"
            style={{
              background: t.bg,
              paddingBottom: "max(12px, env(safe-area-inset-bottom))",
            }}
          >
            <div className="max-w-3xl mx-auto px-3 md:px-0">
              <div
                style={{
                  background: t.inputBg,
                  border: `1px solid ${t.inputBorder}`,
                  borderRadius: 16,
                }}
                className="flex items-end gap-3 px-3.5 md:px-4 py-3 transition-all focus-within:border-violet-500/60 shadow-[0_-6px_24px_rgba(0,0,0,0.06)] md:shadow-none"
              >
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me about my professional experience, skills, and results!"
                  rows={1}
                  style={{
                    background: "transparent",
                    color: t.text,
                    fontFamily: "inherit",
                    resize: "none",
                    maxHeight: 200,
                  }}
                  className="flex-1 outline-none text-sm leading-relaxed placeholder:opacity-40 min-h-[24px]"
                />

                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  style={{
                    background:
                      input.trim() && !isTyping
                        ? "linear-gradient(135deg, #818181ff)"
                        : t.inputBorder,
                    color: input.trim() && !isTyping ? "white" : t.textMuted,
                    opacity: input.trim() && !isTyping ? 1 : 0.5,
                    borderRadius: 10,
                    padding: "8px 10px",
                    flexShrink: 0,
                    transition: "all 0.2s",
                    cursor: input.trim() && !isTyping ? "pointer" : "not-allowed",
                  }}
                >
                  <SendIcon />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}