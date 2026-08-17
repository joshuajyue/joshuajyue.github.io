document.documentElement.classList.add("js");

const projectData = {
    "routing-app": {
        number: "01",
        monogram: "APP",
        category: "AI infrastructure",
        meta: "C# · Blazor · Microsoft.Extensions.AI",
        title: "Routing App",
        summary: "Blazor application for composing and testing semantic routing and failover pipelines with deterministic mock responses.",
        highlights: [
            "Builds interactive semantic, ordered-failover, cooldown, and emergency-fallback pipelines.",
            "Includes runtime health controls, semantic score evidence, and nested diagnostics.",
            "Runs locally without an API key."
        ],
        links: [
            ["View repository", "https://github.com/joshuajyue/routing-app"]
        ]
    },
    "routing-cli": {
        number: "02",
        monogram: "CLI",
        category: "AI infrastructure",
        meta: "C# · .NET · Spectre.Console",
        title: "Routing CLI",
        summary: "Terminal chat sample demonstrating content-based model routing, route-specific configuration, and failover.",
        highlights: [
            "Runs with deterministic simulated clients and no API key.",
            "Supports per-route model, reasoning, and temperature settings.",
            "Can use real OpenAI models through environment variables."
        ],
        links: [
            ["View repository", "https://github.com/joshuajyue/routing-cli-sample"]
        ]
    },
    "copilot-monitor": {
        number: "03",
        monogram: "LOG",
        category: "Developer tools",
        meta: "C# · Windows · SQLite",
        title: "Copilot Usage Monitor",
        summary: "Windows desktop application for viewing locally retained GitHub Copilot CLI usage data.",
        highlights: [
            "Reads the local SQLite session store in read-only mode.",
            "Does not display prompts or responses.",
            "Does not upload data or write to Copilot files."
        ],
        links: [
            ["View repository", "https://github.com/joshuajyue/copilot-usage-monitor"]
        ]
    },
    harmonizer: {
        number: "04",
        monogram: "MIDI",
        category: "Full-stack application",
        meta: "Python · FastAPI · React · PyTorch",
        title: "HarmonAIzer",
        summary: "MIDI harmonizer with rule-based music-theory and neural-network chord engines.",
        highlights: [
            "Detects the input key and generates chord accompaniment.",
            "Supports a music-theory engine and a PyTorch model.",
            "Includes an interactive browser piano and MIDI export."
        ],
        links: [
            ["View repository", "https://github.com/joshuajyue/harmonizer"]
        ]
    },
    cloudsim: {
        number: "05",
        monogram: "C++",
        category: "Systems simulation",
        meta: "C++ · Scheduling · VM migration",
        title: "Greedy Cloud Scheduler",
        summary: "Scheduler for a heterogeneous cloud simulation with SLA-aware placement and VM migration.",
        highlights: [
            "Queues tasks by SLA priority and GPU capability.",
            "Selects compatible CPU architectures and VM types.",
            "Wakes sleeping machines and migrates VMs to consolidate utilization."
        ],
        links: [
            ["View repository", "https://github.com/joshuajyue/cloudsim_eec"]
        ]
    },
    "wave-gen": {
        number: "06",
        monogram: "3D",
        category: "Creative coding",
        meta: "JavaScript · Three.js · Web Audio",
        title: "Wave Generator",
        summary: "Interactive 3D Lissajous visualizer driven by notes played on a virtual piano.",
        highlights: [
            "Generates curves from frequency relationships between notes.",
            "Includes keyboard, sustain, camera, and visual controls.",
            "Runs as a static browser application."
        ],
        links: [
            ["Live demo", "https://joshuajyue.github.io/wave-gen/"],
            ["View repository", "https://github.com/joshuajyue/wave-gen"]
        ]
    }
};

const experienceData = {
    microsoft: {
        type: "Software Engineering Internship · 2026",
        title: "Microsoft",
        summary: "Contributed merged .NET framework, runtime, cryptography, and documentation work across Microsoft.Extensions.AI, dotnet/runtime, and dotnet/docs.",
        tags: [".NET", "C#", "API design", "Runtime", "Cryptography"]
    },
    usaa: {
        type: "Software Engineering Internship · 2025",
        title: "USAA",
        summary: "Worked on cloud infrastructure, data engineering, and enterprise software systems.",
        tags: ["Cloud infrastructure", "Data engineering", "Enterprise systems"]
    },
    luminescence: {
        type: "Backend Developer · 2023",
        title: "Texas Luminescence",
        summary: "Developed backend functionality for an AI-based web application, with work on data storage and application scalability.",
        tags: ["Backend services", "Data storage", "Web applications"]
    },
    utaustin: {
        type: "B.S. Computer Science + B.S. Mathematics · Expected 2027",
        title: "UT Austin",
        summary: "Coursework and project work across algorithms, systems, software engineering, linear algebra, and machine learning.",
        tags: ["Computer Science", "Mathematics", "UT Austin"]
    }
};

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

function closeNavigation() {
    navToggle.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("open");
}

navToggle.addEventListener("click", () => {
    const open = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!open));
    navLinks.classList.toggle("open", !open);
});

navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNavigation);
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 920) {
        closeNavigation();
    }
});

const revealElements = document.querySelectorAll(".reveal");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("visible"));
} else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -6% 0px"
    });

    revealElements.forEach((element) => revealObserver.observe(element));
}

const projectButtons = [...document.querySelectorAll("[data-project]")];
const projectPreview = document.querySelector(".project-preview");
const projectNumber = document.querySelector("#project-number");
const projectMonogram = document.querySelector("#project-monogram");
const projectCategory = document.querySelector("#project-category");
const projectMeta = document.querySelector("#project-meta");
const projectTitle = document.querySelector("#project-title");
const projectSummary = document.querySelector("#project-summary");
const projectHighlights = document.querySelector("#project-highlights");
const projectLinks = document.querySelector("#project-links");

function setProject(projectId, focus = false) {
    const project = projectData[projectId];

    if (!project) {
        return;
    }

    projectButtons.forEach((button) => {
        const selected = button.dataset.project === projectId;
        button.setAttribute("aria-selected", String(selected));
        button.tabIndex = selected ? 0 : -1;

        if (selected && focus) {
            button.focus();
        }
    });

    projectNumber.textContent = project.number;
    projectMonogram.textContent = project.monogram;
    projectCategory.textContent = project.category;
    projectMeta.textContent = project.meta;
    projectTitle.textContent = project.title;
    projectSummary.textContent = project.summary;

    projectHighlights.replaceChildren(...project.highlights.map((text) => {
        const item = document.createElement("li");
        item.textContent = text;
        return item;
    }));

    projectLinks.replaceChildren(...project.links.map(([label, url]) => {
        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener";
        link.innerHTML = `${label} <span aria-hidden="true">&nearr;</span>`;
        return link;
    }));
}

projectButtons.forEach((button, index) => {
    button.addEventListener("click", () => setProject(button.dataset.project));
    button.addEventListener("keydown", (event) => {
        if (!["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"].includes(event.key)) {
            return;
        }

        event.preventDefault();
        let nextIndex = index;

        if (event.key === "ArrowDown" || event.key === "ArrowRight") {
            nextIndex = (index + 1) % projectButtons.length;
        } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
            nextIndex = (index - 1 + projectButtons.length) % projectButtons.length;
        } else if (event.key === "Home") {
            nextIndex = 0;
        } else if (event.key === "End") {
            nextIndex = projectButtons.length - 1;
        }

        setProject(projectButtons[nextIndex].dataset.project, true);
    });
});

const experienceButtons = [...document.querySelectorAll("[data-experience]")];
const experienceType = document.querySelector("#experience-type");
const experienceTitle = document.querySelector("#experience-title");
const experienceSummary = document.querySelector("#experience-summary");
const experienceTags = document.querySelector("#experience-tags");

function setExperience(experienceId, focus = false) {
    const experience = experienceData[experienceId];

    if (!experience) {
        return;
    }

    experienceButtons.forEach((button) => {
        const selected = button.dataset.experience === experienceId;
        button.setAttribute("aria-selected", String(selected));
        button.tabIndex = selected ? 0 : -1;

        if (selected && focus) {
            button.focus();
        }
    });

    experienceType.textContent = experience.type;
    experienceTitle.textContent = experience.title;
    experienceSummary.textContent = experience.summary;
    experienceTags.replaceChildren(...experience.tags.map((text) => {
        const tag = document.createElement("span");
        tag.textContent = text;
        return tag;
    }));
}

experienceButtons.forEach((button, index) => {
    button.addEventListener("click", () => setExperience(button.dataset.experience));
    button.addEventListener("keydown", (event) => {
        if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) {
            return;
        }

        event.preventDefault();
        let nextIndex = index;

        if (event.key === "ArrowRight") {
            nextIndex = (index + 1) % experienceButtons.length;
        } else if (event.key === "ArrowLeft") {
            nextIndex = (index - 1 + experienceButtons.length) % experienceButtons.length;
        } else if (event.key === "Home") {
            nextIndex = 0;
        } else if (event.key === "End") {
            nextIndex = experienceButtons.length - 1;
        }

        setExperience(experienceButtons[nextIndex].dataset.experience, true);
    });
});

document.querySelector("#year").textContent = String(new Date().getFullYear());
