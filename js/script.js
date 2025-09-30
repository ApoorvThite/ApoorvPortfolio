// JavaScript for interactivity will go here.
window.addEventListener('load', () => {
    const openingChime = document.getElementById('opening-chime');
    // Play the sound. Note: Autoplay may be blocked by some browsers.
    openingChime.play().catch(error => {
        console.log('Autoplay was prevented by the browser.');
    });
});

document.addEventListener('DOMContentLoaded', (event) => {
    // --- SPA Navigation Logic ---
    const navLinks = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');

    function showSection(hash) {
        // Default to '#home' if no hash is provided or it's empty
        const targetHash = hash || '#home';

        contentSections.forEach(section => {
            if (`#${section.id}` === targetHash) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });

        navLinks.forEach(link => {
            if (link.getAttribute('href') === targetHash) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetHash = link.getAttribute('href');
            window.location.hash = targetHash;
            showSection(targetHash);
        });
    });

    // Show section based on initial URL hash, or default to #about
    // Show section based on initial URL hash, or default to #home
    showSection(window.location.hash || '#home');

    // --- Dynamic KPI Logic ---
    const kpiData = {
        recruiter: [
            { value: '15+', label: 'Projects Listed' },
            { value: '4+', label: 'Years of Exp.' },
            { value: '96%', label: 'Top Skill Match' }
        ],
        alumni: [
            { value: 'Top 10', label: 'HackPSU Finalist' },
            { value: '2', label: 'Research Papers' },
            { value: '3.9 GPA', label: 'Graduated With' }
        ],
        general: [
            { value: '500+', label: 'Active Users' },
            { value: '10k+', label: 'Lines of Code' },
            { value: '+96%', label: 'Perf. Gains' }
        ]
    };

    const kpiCounters = document.querySelectorAll('.counter-item');
    const body = document.body;
    const modeSwitcher = document.getElementById('mode-switcher');
    const modeButtons = modeSwitcher.querySelectorAll('button');

    function animateValue(element, start, end, duration, finalText) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.innerHTML = finalText; // Set the final text exactly
            }
        };
        window.requestAnimationFrame(step);
    }

    let charts = []; // To hold chart instances

    function createCounterSparkline(chartId, data) {
        const options = {
            series: [{
                data: data,
                color: '#28a745' // Upward trend green
            }],
            chart: {
                type: 'line',
                width: 100,
                height: 40,
                sparkline: {
                    enabled: true
                }
            },
            tooltip: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 3
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                }
            }
        };

        const chart = new ApexCharts(document.querySelector(`#${chartId}`), options);
        chart.render();

        // Set native title tooltips on legend pills
        const legendNotes = {
            'AI/ML': 'Deep learning (LSTM, CNN), SHAP explainability, GenAI agents.',
            'Data Science': 'Strong in stats, EDA, predictive modeling with real datasets.',
            'Full‑Stack': 'React/Streamlit apps (SmartSkillMatch, StartupX, EcoSplit).',
            'Full-Stack': 'React/Streamlit apps (SmartSkillMatch, StartupX, EcoSplit).',
            'FinTech': 'Stock forecasting, backtesting frameworks, elections & markets.',
            'Cloud/DevOps': 'AWS SageMaker pipelines, CI/CD with GitHub Actions, IAM/OIDC.'
        };
        setTimeout(() => {
            document.querySelectorAll('.qr-legend .pill').forEach((pill) => {
                const key = pill.textContent.trim();
                if (legendNotes[key]) pill.setAttribute('title', legendNotes[key]);
            });
        }, 0);
        return chart;
    }

    function updateKPIs(mode) {
        const data = kpiData[mode];
        body.dataset.mode = mode; // Set data-mode on body for CSS

        // Clear previous charts
        charts.forEach(chart => chart.destroy());
        charts = [];

        kpiCounters.forEach((counter, index) => {
            const valueEl = counter.querySelector('.counter-value');
            const labelEl = counter.querySelector('.counter-label');
            
            const finalValueString = data[index].value;
            const targetNumber = parseInt(finalValueString.replace(/[^0-9]/g, ''));

            animateValue(valueEl, 0, targetNumber, 1500, finalValueString);
            labelEl.textContent = data[index].label;

            // Create new sparkline for this counter
            const sparklineData = [10, 30, 20, 50, 40, 70, 60, 90]; // Example upward data
            const chart = createCounterSparkline(`sparkline-${index + 1}`, sparklineData);
            charts.push(chart);
        });
    }

    modeSwitcher.addEventListener('click', (e) => {
        const button = e.target.closest('button');
        if (!button) return;

        const clickedMode = button.dataset.mode;
        const isAlreadyActive = button.classList.contains('active');

        // Deactivate all buttons first
        modeButtons.forEach(btn => btn.classList.remove('active'));

        if (isAlreadyActive) {
            // If clicking an active button, toggle it off and go to general mode
            updateKPIs('general');
        } else {
            // Otherwise, activate the clicked button and switch to its mode
            button.classList.add('active');
            updateKPIs(clickedMode);
        }
    });

    // Set initial KPIs on load
    updateKPIs('general');

    // --- Hero Button Navigation ---
    const viewProjectsBtn = document.getElementById('view-projects-btn');
    const contactMeBtn = document.getElementById('contact-me-btn');

    if (viewProjectsBtn) {
        viewProjectsBtn.addEventListener('click', () => {
            showSection('#projects');
            window.location.hash = '#projects'; // Update URL for consistency
        });
    }

    if (contactMeBtn) {
        contactMeBtn.addEventListener('click', () => {
            showSection('#contact');
            window.location.hash = '#contact'; // Update URL for consistency
        });
    }

    // --- Recruiter Agent Modal Logic ---
    const recruiterModal = document.getElementById('recruiter-modal');
    const closeRecruiterModalButton = recruiterModal.querySelector('.modal-close');
    const exportButton = document.getElementById('export-pager-btn');
    const generateReportButton = document.getElementById('generate-report-button');
    const jobDescriptionInput = document.getElementById('job-description');
    const recruiterOutput = document.getElementById('recruiter-output');

    exportButton.addEventListener('click', () => {
        recruiterModal.classList.add('visible');
    });

    function closeRecruiterModal() {
        recruiterModal.classList.remove('visible');
        // Optional: Clear content on close
        setTimeout(() => {
            recruiterOutput.innerHTML = '';
            jobDescriptionInput.value = '';
        }, 300);
    }

    closeRecruiterModalButton.addEventListener('click', closeRecruiterModal);
    recruiterModal.addEventListener('click', (e) => {
        if (e.target === recruiterModal) {
            closeRecruiterModal();
        }
    });

    generateReportButton.addEventListener('click', async () => {
        const jobDescription = jobDescriptionInput.value;
        if (!jobDescription.trim()) {
            alert('Please paste a job description.');
            return;
        }

        recruiterOutput.innerHTML = '<em>> Recruiter Agent is analyzing...</em>';

        // Mock API call locally
        const mockRecruiterAgent = (jobDesc) => {
            return new Promise(resolve => {
                setTimeout(() => {
                    const analysis = {
                        topProjects: [
                            { ticker: 'PARK-AI', relevance: '95%', summary: 'Strong match for ML and data analysis skills.' },
                            { ticker: 'ECO-SPLIT', relevance: '88%', summary: 'Demonstrates full-stack capabilities and UI/UX focus.' },
                        ],
                        report: `Generated 1-pager resume tailored for the provided job description. Key skills highlighted: Python, TensorFlow, RAG, React.`
                    };
                    resolve(analysis);
                }, 1000); // Simulate network delay
            });
        };

        const data = await mockRecruiterAgent(jobDescription);

        const reportHTML = `
            <p><strong>Analysis Complete:</strong></p>
            <p>${data.report}</p>
            <p><strong>Top Project Matches:</strong></p>
            <ul>
                ${data.topProjects.map(p => `<li><strong>${p.ticker} (${p.relevance}):</strong> ${p.summary}</li>`).join('')}
            </ul>
        `;
        recruiterOutput.innerHTML = reportHTML;
    });

    console.log('Portfolio Exchange initialized');


    // --- Sparkline Chart Initialization ---
    function createSparkline(chartId, dataSeries) {
        const options = {
            series: [{
                data: dataSeries
            }],
            chart: {
                type: 'area',
                height: 100,
                sparkline: {
                    enabled: true
                },
            },
            stroke: {
                curve: 'smooth',
                width: 2
            },
            fill: {
                opacity: 0.3,
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    type: "vertical",
                    shadeIntensity: 0.5,
                    gradientToColors: ['#7DF9FF'],
                    inverseColors: true,
                    opacityFrom: 0.7,
                    opacityTo: 0.2,
                    stops: [0, 100]
                }
            },
            yaxis: {
                min: Math.min(...dataSeries) * 0.9,
                max: Math.max(...dataSeries) * 1.1
            },
            colors: ['#28a745'], // Emerald Green for the line
            tooltip: {
                enabled: false
            }
        };

        const chart = new ApexCharts(document.querySelector(`#${chartId}`), options);
        chart.render();
    }

    // Data for charts
    const parkAiData = [72, 75, 80, 78, 85, 88, 92, 96];
    const ecoSplitData = [1, 3, 5, 8, 6, 7, 9, 10]; // Represents ranking improvement

    // Create charts
    createSparkline('sparkline-park-ai', parkAiData);
    createSparkline('sparkline-eco-split', ecoSplitData);

    // --- Demo Agent Modal Logic ---
    const modal = document.getElementById('demo-modal');
    const closeModalButton = modal.querySelector('.modal-close');
    const tradeButtons = document.querySelectorAll('.trade-button');
    const modalTicker = document.getElementById('modal-ticker');
    const demoOutput = document.getElementById('demo-output');

    tradeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectCard = button.closest('.project-card');
            const ticker = projectCard.querySelector('.project-ticker').textContent;
            
            // Populate modal with project-specific info
            modalTicker.textContent = ticker;
            const analysisText = `> AGENT: Analyzing trade for ${ticker}...\n> AGENT: Accessing project fundamentals...\n> AGENT: Running simulation...\n\n[...Simulation Complete...]\n\n> ${ticker} ANALYSIS:\n> Metric: Accuracy Improvement\n> Baseline: 72%\n> Result: 96%\n> Net Gain: +24%\n\n> VERDICT: Strong Buy. Project demonstrates significant performance uplift.`
            typewriter(demoOutput, analysisText, 20);
            
            // Show the modal
            modal.style.display = 'flex'; // Use flex to center it
            setTimeout(() => modal.classList.add('visible'), 10); // For transition
        });
    });

    function closeModal() {
        modal.classList.remove('visible');
        setTimeout(() => modal.style.display = 'none', 300); // Wait for transition to finish
    }

    closeModalButton.addEventListener('click', closeModal);


    // Also close modal if user clicks on the overlay
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // --- Typewriter Effect ---
    let typingTimeout;
    function typewriter(element, text, speed) {
        clearTimeout(typingTimeout); // Clear previous typing animation
        let i = 0;
        element.innerHTML = ""; // Clear previous content
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                typingTimeout = setTimeout(type, speed);
            }
        }
        type();
    }

    // ==============================
    // About Fact Sheet Interactions
    // ==============================

    // Helper: intersection observer to trigger animations once in view
    function inViewOnce(selector, callback, options = { threshold: 0.2 }) {
        const el = document.querySelector(selector);
        if (!el) return;
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    callback(el);
                    obs.disconnect();
                }
            });
        }, options);
        obs.observe(el);
    }

    // 1) Donut Chart (Sector Allocation)
    (function initDonut() {
        const svg = document.getElementById('sector-donut');
        if (!svg) return;

        const center = 110;
        const radius = 80;
        const innerR = 48;
        const data = [
            { key: 'AI/ML', value: 35, color: '#29d391' },
            { key: 'Data Science', value: 25, color: '#7DF9FF' },
            { key: 'Full‑Stack', value: 20, color: '#ffd166' },
            { key: 'FinTech', value: 20, color: '#ff6b6b' },
        ];
        const total = data.reduce((a, b) => a + b.value, 0);

        const tooltip = document.getElementById('donut-tooltip');

        let startAngle = -Math.PI / 2; // start at top
        data.forEach((d, idx) => {
            const angle = (d.value / total) * Math.PI * 2;
            const endAngle = startAngle + angle;

            // Create path for arc
            const largeArc = angle > Math.PI ? 1 : 0;
            const x0 = center + radius * Math.cos(startAngle);
            const y0 = center + radius * Math.sin(startAngle);
            const x1 = center + radius * Math.cos(endAngle);
            const y1 = center + radius * Math.sin(endAngle);

            const xi0 = center + innerR * Math.cos(endAngle);
            const yi0 = center + innerR * Math.sin(endAngle);
            const xi1 = center + innerR * Math.cos(startAngle);
            const yi1 = center + innerR * Math.sin(startAngle);

            const dPath = [
                `M ${x0} ${y0}`,
                `A ${radius} ${radius} 0 ${largeArc} 1 ${x1} ${y1}`,
                `L ${xi0} ${yi0}`,
                `A ${innerR} ${innerR} 0 ${largeArc} 0 ${xi1} ${yi1}`,
                'Z'
            ].join(' ');

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', dPath);
            path.setAttribute('fill', d.color);
            path.setAttribute('data-key', d.key);
            path.style.filter = 'drop-shadow(0 0 4px rgba(125,249,255,0.25))';

            // Hover pop-out effect
            path.addEventListener('mousemove', (e) => {
                const mid = (startAngle + endAngle) / 2;
                const offset = 6; // pop-out distance
                const tx = offset * Math.cos(mid);
                const ty = offset * Math.sin(mid);
                path.setAttribute('transform', `translate(${tx}, ${ty})`);
                if (tooltip) {
                    tooltip.style.left = `${e.offsetX + 12}px`;
                    tooltip.style.top = `${e.offsetY - 12}px`;
                    tooltip.style.opacity = '1';
                    tooltip.textContent = `${d.key}: ${d.value}%`;
                }
            });
            path.addEventListener('mouseleave', () => {
                path.removeAttribute('transform');
                if (tooltip) tooltip.style.opacity = '0';
            });

            svg.appendChild(path);
            startAngle = endAngle;
        });

        // Legend hover highlights matching slice
        document.querySelectorAll('.donut-legend li').forEach(li => {
            li.addEventListener('mouseenter', () => {
                const key = li.getAttribute('data-key');
                svg.querySelectorAll('path').forEach(p => {
                    p.style.opacity = (p.getAttribute('data-key') === key) ? '1' : '0.25';
                });
            });
            li.addEventListener('mouseleave', () => {
                svg.querySelectorAll('path').forEach(p => p.style.opacity = '1');
            });
        });
    })();

    // 4) Quant Ratings meters animation
    (function initQuantRatings() {
        const section = document.querySelector('.quant-ratings');
        if (!section) return;

        // Data for radar (0-10 like trading apps)
        const categories = ['AI/ML','Data Science','Full-Stack','FinTech','Cloud/DevOps'];
        const scores10 = [9.4, 9.0, 7.1, 8.7, 8.7];

        // Compute overall and date
        const avg = (scores10.reduce((a,b)=>a+b,0) / scores10.length).toFixed(2);
        const center = document.getElementById('qr-center');
        const overall = document.getElementById('qr-overall');
        const dateEl = document.getElementById('qr-date');
        if (center) center.textContent = avg;
        if (overall) overall.textContent = avg >= 8.5 ? 'Strong' : (avg >= 7.5 ? 'Outperform' : 'Neutral');
        if (dateEl) {
            const d = new Date();
            dateEl.textContent = `${String(d.getMonth()+1).padStart(2,'0')}/${String(d.getDate()).padStart(2,'0')}/${d.getFullYear()}`;
        }

        const el = document.querySelector('#skills-radar');
        if (!el || !window.ApexCharts) return;

        const options = {
            chart: { type: 'radar', height: 320, foreColor: '#cfcfcf', toolbar: { show: false }, animations: { enabled: true }},
            series: [{ name: 'Score', data: scores10 }],
            xaxis: { categories, labels: { style: { colors: '#9aa0a6' } } },
            yaxis: { show: false, min: 0, max: 10 },
            plotOptions: {
                radar: {
                    polygons: {
                        strokeColors: '#2a2a2a',
                        fill: { colors: ['#151515', '#121212'] }
                    }
                }
            },
            stroke: { width: 2, colors: ['#7DF9FF'] },
            fill: { opacity: 0.25, colors: ['#7DF9FF'] },
            markers: { size: 4, colors: ['#1a1a1a'], strokeColors: '#7DF9FF', strokeWidth: 2 },
            tooltip: {
                custom: function({ series, seriesIndex, dataPointIndex, w }) {
                    const cat = w.globals.labels[dataPointIndex];
                    const val = series[seriesIndex][dataPointIndex];
                    const notes = {
                        'AI/ML': 'Deep learning (LSTM, CNN), SHAP explainability, GenAI agents.',
                        'Data Science': 'Strong in stats, EDA, predictive modeling with real datasets.',
                        'Full-Stack': 'React/Streamlit apps (SmartSkillMatch, StartupX, EcoSplit).',
                        'FinTech': 'Stock forecasting, backtesting frameworks, elections & markets.',
                        'Cloud/DevOps': 'AWS SageMaker pipelines, CI/CD with GitHub Actions, IAM/OIDC.'
                    };
                    const note = notes[cat] || '';
                    return `<div class="apex-tooltip" style="padding:8px 10px;background:#121212;border:1px solid #2a2a2a;color:#eaeaea;border-radius:6px;">`+
                           `<div style="font-weight:600;margin-bottom:4px;">${cat}: ${val.toFixed(2)}</div>`+
                           `<div style="font-size:.85rem;color:#9aa0a6;max-width:220px;">${note}</div>`+
                           `</div>`;
                }
            }
        };

        const chart = new ApexCharts(el, options);
        chart.render();
    })();

    // 2) KPI underline animation and optional count up when in view
    inViewOnce('.earnings-kpis', (root) => {
        root.querySelectorAll('.kpi').forEach(k => {
            const underline = k.querySelector('.kpi-underline');
            if (underline) underline.style.width = '100%';
            const numEl = k.querySelector('.kpi-number');
            if (!numEl) return;
            const finalText = numEl.textContent;
            const target = parseInt(numEl.getAttribute('data-count') || '0', 10);
            if (!target) return;
            let startTime = null;
            function step(ts) {
                if (!startTime) startTime = ts;
                const p = Math.min((ts - startTime) / 1200, 1);
                const val = Math.floor(p * target);
                numEl.textContent = finalText.replace(/[0-9][0-9.,+]*/g, String(val));
                if (p < 1) requestAnimationFrame(step); else numEl.textContent = finalText;
            }
            requestAnimationFrame(step);
        });
    });

    // 3) Headlines vertical ticker auto-scroll with pause-on-hover
    (function initTicker() {
        const ticker = document.getElementById('news-ticker');
        if (!ticker) return;
        let pos = 0;
        const speed = 30; // ms per tick
        const stepPx = 1;
        let timer = null;

        function start() {
            if (timer) return;
            timer = setInterval(() => {
                pos += stepPx;
                ticker.scrollTop = pos;
                // loop when end reached
                if (ticker.scrollTop + ticker.clientHeight >= ticker.scrollHeight) {
                    pos = 0;
                    ticker.scrollTop = 0;
                }
            }, speed);
        }
        function stop() { if (timer) { clearInterval(timer); timer = null; } }

        ticker.addEventListener('mouseenter', stop);
        ticker.addEventListener('mouseleave', start);
        start();
    })();
});
