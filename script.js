document.documentElement.classList.add("js");

const projects = {
    routing: {
        number: "01",
        meta: "Microsoft internship / API design / 2026",
        title: "Extensible AI client routing",
        summary: "Microsoft internship work that added a routing surface to Microsoft.Extensions.AI, letting applications select clients, retry through fallbacks, and observe every route attempt without changing the IChatClient abstraction.",
        highlights: [
            "Added RoutingChatClient, routing context, route selection, and per-attempt information.",
            "Covered normal and streaming invocation, fallback behavior, failures, disposal, and diagnostics.",
            "Followed the main contribution with corrected request-option semantics and public documentation."
        ],
        tags: ["C#", ".NET", "Microsoft.Extensions.AI", "API design", "Async streaming", "Testing"],
        links: [
            { label: "Main merged PR", url: "https://github.com/dotnet/extensions/pull/7662" },
            { label: "Options follow-up", url: "https://github.com/dotnet/extensions/pull/7685" },
            { label: "Documentation", url: "https://github.com/dotnet/docs/pull/55354" }
        ]
    },
    bitarray: {
        number: "02",
        meta: "Microsoft internship / .NET Runtime / 2026",
        title: "BitArray span constructors",
        summary: "Microsoft internship work adding ReadOnlySpan-based construction paths for BitArray, designed to make copying bool, byte, and int data direct, predictable, and efficient.",
        highlights: [
            "Added constructors for ReadOnlySpan<bool>, ReadOnlySpan<byte>, and ReadOnlySpan<int>.",
            "Covered empty, partial-word, boundary, and vectorized behavior in runtime tests.",
            "Validated performance-sensitive paths and preserved BitArray's existing representation semantics."
        ],
        tags: ["C#", ".NET Runtime", "ReadOnlySpan", "SIMD", "Collections", "Performance"],
        links: [
            { label: "Merged runtime PR", url: "https://github.com/dotnet/runtime/pull/131500" }
        ]
    },
    crypto: {
        number: "03",
        meta: "Microsoft internship / Cryptography / 2026",
        title: "Modern cross-platform crypto tests",
        summary: "Microsoft internship work modernizing PKCS and CMS test assets so the suite no longer depends on algorithms and key sizes rejected by stricter platform crypto policies.",
        highlights: [
            "Replaced SHA-1 and RSA-1024 fixtures with SHA-256 and RSA-2048 equivalents.",
            "Updated expected values and test data across the affected cryptography coverage.",
            "Re-enabled tests on Linux configurations that reject the legacy assets."
        ],
        tags: ["C#", ".NET Runtime", "Cryptography", "PKCS", "CMS", "Linux"],
        links: [
            { label: "Merged runtime PR", url: "https://github.com/dotnet/runtime/pull/131783" }
        ]
    },
    "routing-cli": {
        number: "04",
        meta: "Developer tool / AI routing / 2026",
        title: "Routing CLI sample",
        summary: "A terminal chat application that turns model routing into something concrete: users can see route selection, disable a simulated provider, and watch failover recover the conversation.",
        highlights: [
            "Runs immediately with deterministic simulated clients and no API key.",
            "Supports content-based routes, route-specific model options, and explicit failure injection.",
            "Can switch to real OpenAI models through environment-based configuration."
        ],
        tags: ["C#", ".NET", "Spectre.Console", "Microsoft.Extensions.AI", "OpenAI", "CLI"],
        links: [
            { label: "View repository", url: "https://github.com/joshuajyue/routing-cli-sample" }
        ]
    },
    "copilot-monitor": {
        number: "05",
        meta: "Developer tool / Privacy / 2026",
        title: "Copilot usage monitor",
        summary: "A local Windows application for understanding retained GitHub Copilot CLI usage without displaying prompts, changing Copilot files, or sending telemetry.",
        highlights: [
            "Reads the local SQLite session store in read-only mode.",
            "Handles retained session-state event files with shared read access.",
            "Keeps prompt and response content out of the interface and stays entirely local."
        ],
        tags: ["C#", ".NET", "Windows", "SQLite", "Privacy", "Developer tools"],
        links: [
            { label: "View repository", url: "https://github.com/joshuajyue/copilot-usage-monitor" }
        ]
    },
    harmonizer: {
        number: "06",
        meta: "Creative computing / AI / 2025",
        title: "HarmonAIzer",
        summary: "A full-stack MIDI application that analyzes a melody, generates chord accompaniment, and returns a new MIDI file through an interactive browser interface.",
        highlights: [
            "Provides a music-theory engine based on detected key and melody features.",
            "Supports a PyTorch chord model trained from Bach chorales when its model artifact is available.",
            "Combines a React piano and recording interface with FastAPI and music21 processing."
        ],
        tags: ["Python", "FastAPI", "React", "TypeScript", "PyTorch", "music21"],
        links: [
            { label: "View repository", url: "https://github.com/joshuajyue/harmonizer" }
        ]
    },
    cloudsim: {
        number: "07",
        meta: "Systems / Simulation / 2025",
        title: "Greedy cloud scheduler",
        summary: "A scheduler module for a heterogeneous cloud simulation that prioritizes work, consolidates placement, wakes sleeping capacity, and migrates virtual machines.",
        highlights: [
            "Queues tasks by SLA priority and GPU capability before placement.",
            "Selects compatible CPU architectures and reuses or creates the required VM type.",
            "My work covered the greedy scheduler, state transitions, priority fixes, and VM migration support."
        ],
        tags: ["C++", "Scheduling", "Simulation", "Virtual machines", "Resource management"],
        links: [
            { label: "View repository", url: "https://github.com/joshuajyue/cloudsim_eec" }
        ]
    },
    "wave-gen": {
        number: "08",
        meta: "Creative computing / Web / 2025",
        title: "Wave generator",
        summary: "An interactive instrument that translates notes and chords into explorable 3D Lissajous curves while synthesizing audio in the browser.",
        highlights: [
            "Generates real-time 3D curves from frequency relationships between played notes.",
            "Includes a multi-octave virtual piano, sustain, camera controls, and visual settings.",
            "Uses a static, dependency-light architecture that deploys directly to GitHub Pages."
        ],
        tags: ["JavaScript", "Three.js", "Web Audio", "WebGL", "Lissajous curves"],
        links: [
            { label: "Open live demo", url: "https://joshuajyue.github.io/wave-gen/" },
            { label: "View repository", url: "https://github.com/joshuajyue/wave-gen" }
        ]
    }
};

const themeToggle = document.querySelector(".theme-toggle");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const siteHeader = document.querySelector(".site-header");
const progressBar = document.querySelector(".scroll-progress span");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function updateThemeButton() {
    const isDark = document.documentElement.dataset.theme === "dark";
    themeToggle.setAttribute("aria-label", isDark ? "Use light theme" : "Use dark theme");
}

themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("portfolio-theme", nextTheme);
    updateThemeButton();
});

updateThemeButton();

function closeNavigation() {
    navToggle.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
}

navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    siteNav.classList.toggle("is-open", !isOpen);
});

siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNavigation);
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 820) {
        closeNavigation();
    }
});

let scrollFramePending = false;

function updateScrollState() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
    progressBar.style.transform = `scaleX(${progress})`;
    siteHeader.classList.toggle("is-scrolled", window.scrollY > 24);
    scrollFramePending = false;
}

window.addEventListener("scroll", () => {
    if (!scrollFramePending) {
        requestAnimationFrame(updateScrollState);
        scrollFramePending = true;
    }
}, { passive: true });

updateScrollState();

const revealElements = document.querySelectorAll(".reveal");

if (reduceMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px"
    });

    revealElements.forEach((element) => revealObserver.observe(element));
}

const navigationLinks = [...siteNav.querySelectorAll('a[href^="#"]')];
const observedSections = navigationLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
        const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) {
            return;
        }

        navigationLinks.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
        });
    }, {
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0.05, 0.2, 0.5]
    });

    observedSections.forEach((section) => sectionObserver.observe(section));
}

const timelineTabs = [...document.querySelectorAll("[data-timeline]")];
const timelinePanels = [...document.querySelectorAll("[data-timeline-panel]")];

function activateTimeline(id, moveFocus = false) {
    timelineTabs.forEach((tab) => {
        const active = tab.dataset.timeline === id;
        tab.setAttribute("aria-selected", String(active));
        tab.tabIndex = active ? 0 : -1;

        if (active && moveFocus) {
            tab.focus();
        }
    });

    timelinePanels.forEach((panel) => {
        panel.hidden = panel.dataset.timelinePanel !== id;
    });
}

timelineTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateTimeline(tab.dataset.timeline));
    tab.addEventListener("keydown", (event) => {
        if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) {
            return;
        }

        event.preventDefault();
        let nextIndex = index;

        if (event.key === "ArrowRight") {
            nextIndex = (index + 1) % timelineTabs.length;
        } else if (event.key === "ArrowLeft") {
            nextIndex = (index - 1 + timelineTabs.length) % timelineTabs.length;
        } else if (event.key === "Home") {
            nextIndex = 0;
        } else if (event.key === "End") {
            nextIndex = timelineTabs.length - 1;
        }

        activateTimeline(timelineTabs[nextIndex].dataset.timeline, true);
    });
});

const filterButtons = [...document.querySelectorAll("[data-filter]")];
const projectCards = [...document.querySelectorAll("[data-project]")];

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        filterButtons.forEach((candidate) => {
            candidate.setAttribute("aria-pressed", String(candidate === button));
        });

        projectCards.forEach((card) => {
            const categories = card.dataset.category.split(" ");
            card.hidden = filter !== "all" && !categories.includes(filter);
        });
    });
});

const dialog = document.querySelector("#project-dialog");
const dialogClose = dialog.querySelector(".dialog-close");
const dialogNumber = dialog.querySelector("#project-dialog-number");
const dialogMeta = dialog.querySelector("#project-dialog-meta");
const dialogTitle = dialog.querySelector("#project-dialog-title");
const dialogSummary = dialog.querySelector("#project-dialog-summary");
const dialogHighlights = dialog.querySelector("#project-dialog-highlights");
const dialogTags = dialog.querySelector("#project-dialog-tags");
const dialogLinks = dialog.querySelector("#project-dialog-links");
let lastProjectTrigger = null;

function populateProjectDialog(project) {
    dialogNumber.textContent = project.number;
    dialogMeta.textContent = project.meta;
    dialogTitle.textContent = project.title;
    dialogSummary.textContent = project.summary;

    dialogHighlights.replaceChildren(...project.highlights.map((highlight) => {
        const item = document.createElement("li");
        item.textContent = highlight;
        return item;
    }));

    dialogTags.replaceChildren(...project.tags.map((tag) => {
        const item = document.createElement("span");
        item.textContent = tag;
        return item;
    }));

    dialogLinks.replaceChildren(...project.links.map((link) => {
        const anchor = document.createElement("a");
        anchor.href = link.url;
        anchor.target = "_blank";
        anchor.rel = "noopener";
        anchor.innerHTML = `${link.label} <span aria-hidden="true">&nearr;</span>`;
        return anchor;
    }));
}

function openProject(projectId, updateHash = true) {
    const project = projects[projectId];

    if (!project) {
        return;
    }

    populateProjectDialog(project);

    if (!dialog.open) {
        dialog.showModal();
    }

    document.body.classList.add("dialog-open");

    if (updateHash && window.location.hash !== `#project-${projectId}`) {
        history.pushState({ project: projectId }, "", `#project-${projectId}`);
    }
}

projectCards.forEach((card) => {
    const trigger = card.querySelector(".project-card-trigger");
    trigger.addEventListener("click", () => {
        lastProjectTrigger = trigger;
        openProject(card.dataset.project);
    });
});

dialogClose.addEventListener("click", () => dialog.close());

dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
        dialog.close();
    }
});

dialog.addEventListener("close", () => {
    document.body.classList.remove("dialog-open");

    if (window.location.hash.startsWith("#project-")) {
        history.replaceState({}, "", `${window.location.pathname}${window.location.search}`);
    }

    if (lastProjectTrigger) {
        lastProjectTrigger.focus();
    }
});

function openProjectFromHash() {
    if (!window.location.hash.startsWith("#project-")) {
        if (dialog.open) {
            dialog.close();
        }
        return;
    }

    const projectId = window.location.hash.replace("#project-", "");
    openProject(projectId, false);
}

window.addEventListener("hashchange", openProjectFromHash);
openProjectFromHash();

document.querySelector("#current-year").textContent = String(new Date().getFullYear());
