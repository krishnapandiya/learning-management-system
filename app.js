
/**
 * EduPulse LMS - Central Application Engine (app.js)
 * Manages Auth, Cart, Catalog Filtering, Course Details, 
 * Interactive Quizzes, Checkout, Dedicated Payment Gateway, and Localization.
 */

// ==========================================
// 1. MOCK DATA & INITIAL STATE
// ==========================================

const COURSES_DATA = [
    {
        id: 1,
        title: "Full-Stack Web Development Bootcamp",
        category: "development",
        instructor: "Alex Morgan",
        instructorTitle: "Senior Full-Stack Architect & Tech Educator",
        instructorBio: "Over 10 years of building web applications for Fortune 500 companies and mentoring 100k+ students globally.",
        rating: 4.9,
        reviewsCount: 1420,
        studentsCount: 8500,
        duration: "42 Hours",
        price: 49.99,
        originalPrice: 199.99,
        badge: "Trending",
        level: "Beginner to Adv",
        tagline: "Master modern frontend and backend development with hands-on projects, REST APIs, and database architecture.",
        objectives: [
            "Build responsive websites using semantic HTML5 and modern CSS3",
            "Master modern JavaScript (ES6+), async/await, and DOM manipulation",
            "Implement user authentication, sessions, and secure web storage",
            "Design scalable relational databases and integrate external APIs"
        ]
    },
    {
        id: 2,
        title: "Introduction to Machine Learning & Python",
        category: "ai",
        instructor: "Dr. Sarah Chen",
        instructorTitle: "AI Research Scientist & Ex-FAANG Lead",
        instructorBio: "PhD in Machine Learning with a focus on neural networks, computer vision, and high-throughput data processing.",
        rating: 4.8,
        reviewsCount: 980,
        studentsCount: 6200,
        duration: "36 Hours",
        price: 54.99,
        originalPrice: 189.99,
        badge: "Popular",
        level: "Intermediate",
        tagline: "Develop machine learning algorithms, deep learning models, and data pipelines using Scikit-Learn and PyTorch.",
        objectives: [
            "Implement supervised and unsupervised machine learning algorithms",
            "Perform exploratory data analysis using Pandas and NumPy",
            "Train deep neural network architectures using PyTorch",
            "Deploy ML models into operational production REST APIs"
        ]
    },
    {
        id: 3,
        title: "UI/UX Design Systems & Figma Pro",
        category: "design",
        instructor: "Marcus Vance",
        instructorTitle: "Product Design Lead",
        instructorBio: "Award-winning designer with 12+ years shaping interfaces, mobile design systems, and user accessibility.",
        rating: 4.7,
        reviewsCount: 720,
        studentsCount: 4300,
        duration: "28 Hours",
        price: 39.99,
        originalPrice: 149.99,
        badge: "Bestseller",
        level: "All Levels",
        tagline: "Create high-converting design systems, intuitive wireframes, and production-ready component libraries in Figma.",
        objectives: [
            "Master Figma auto-layout, components, and design tokens",
            "Conduct structured user research, testing, and persona mapping",
            "Build interactive, clickable high-fidelity mobile prototypes",
            "Prepare clean developer handoff documentation and specs"
        ]
    },
    {
        id: 4,
        title: "Modern Cloud Architecture & DevOps",
        category: "development",
        instructor: "Elena Rostova",
        instructorTitle: "DevOps & Cloud Consultant",
        instructorBio: "Certified Kubernetes Administrator and AWS Solutions Architect specializing in CI/CD automation.",
        rating: 4.9,
        reviewsCount: 510,
        studentsCount: 3100,
        duration: "32 Hours",
        price: 59.99,
        originalPrice: 179.99,
        badge: "Featured",
        level: "Advanced",
        tagline: "Deploy resilient microservices with Docker, Kubernetes, Terraform, and automated GitHub Actions CI/CD.",
        objectives: [
            "Containerize complex multi-service applications using Docker",
            "Manage container orchestration and clusters with Kubernetes",
            "Automate infrastructure provisioning with Terraform",
            "Set up zero-downtime production deployment pipelines"
        ]
    }
];

const QUIZ_DATA = [
    {
        question: "Which HTML5 semantic element is best suited for wrapping independent, self-contained content?",
        options: ["<section>", "<article>", "<div>", "<aside>"],
        correctIndex: 1
    },
    {
        question: "Which JavaScript array method returns a new array with elements that satisfy a condition?",
        options: ["filter()", "map()", "forEach()", "reduce()"],
        correctIndex: 0
    },
    {
        question: "In CSS Flexbox, which property aligns items along the cross-axis?",
        options: ["justify-content", "align-items", "flex-direction", "align-content"],
        correctIndex: 1
    },
    {
        question: "Where is browser `localStorage` persisted?",
        options: ["On the server", "In temporary session memory", "Locally on the client disk with no expiration", "Inside HTTP cookie headers"],
        correctIndex: 2
    },
    {
        question: "Which status code indicates that a requested web resource was not found on the server?",
        options: ["200", "301", "404", "500"],
        correctIndex: 2
    }
];

const TRANSLATIONS = {
    en: {
        greeting: "Welcome to EduPulse",
        tagline: "Explore hands-on courses in programming, design, and AI.",
        btnSave: "Apply & Save Preferences",
        home: "Home",
        courses: "Courses",
        dashboard: "Dashboard"
    },
    es: {
        greeting: "Bienvenido a EduPulse",
        tagline: "Explora cursos prácticos de programación, diseño e inteligencia artificial.",
        btnSave: "Aplicar y Guardar Preferencias",
        home: "Inicio",
        courses: "Cursos",
        dashboard: "Panel"
    },
    hi: {
        greeting: "EduPulse में आपका स्वागत है",
        tagline: "प्रोग्रामिंग, डिज़ाइन और AI में व्यावहारिक पाठ्यक्रमों का अन्वेषण करें।",
        btnSave: "प्राथमिकताएं लागू करें और सहेजें",
        home: "होम",
        courses: "कोर्स",
        dashboard: "डैशबोर्ड"
    },
    fr: {
        greeting: "Bienvenue sur EduPulse",
        tagline: "Explorez des cours pratiques en programmation, design et IA.",
        btnSave: "Appliquer et Enregistrer",
        home: "Accueil",
        courses: "Cours",
        dashboard: "Tableau de bord"
    },
    de: {
        greeting: "Willkommen bei EduPulse",
        tagline: "Entdecken Sie praxisorientierte Kurse in Programmierung, Design und KI.",
        btnSave: "Übernehmen & Speichern",
        home: "Startseite",
        courses: "Kurse",
        dashboard: "Übersicht"
    },
    te: {
        greeting: "EduPulse కు స్వాగతం",
        tagline: "ప్రోగ్రామింగ్, డిజైన్ మరియు AI కోర్సులను నేర్చుకోండి.",
        btnSave: "ప్రాధాన్యతలను సేవ్ చేయండి",
        home: "హోమ్",
        courses: "కోర్సులు",
        dashboard: "డాష్‌బోర్డ్"
    }
};

// ==========================================
// 2. HELPER FUNCTIONS & SHARED SERVICES
// ==========================================

function getStorage(key, fallback) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
    } catch (e) {
        return fallback;
    }
}

function setStorage(key, val) {
    try {
        localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
        console.error("Storage write failed:", e);
    }
}

function updateGlobalNavbar() {
    const cart = getStorage("ep_cart", []);
    const badge = document.getElementById("navCartCount");
    if (badge) {
        badge.textContent = cart.length;
    }

    const currentUser = getStorage("ep_user", null);
    const navAuth = document.getElementById("navAuth");
    if (navAuth) {
        const isPagesDir = window.location.pathname.includes("/pages/");
        const loginPath = isPagesDir ? "login.html" : "pages/login.html";
        const regPath = isPagesDir ? "register.html" : "pages/register.html";

        if (currentUser) {
            navAuth.innerHTML = `
                <span class="user-greeting-pill">Hi, ${currentUser.name.split(" ")[0]}</span>
                <button class="btn btn-sm btn-outline" id="globalLogoutBtn">Log Out</button>
            `;
            const logoutBtn = document.getElementById("globalLogoutBtn");
            if (logoutBtn) {
                logoutBtn.addEventListener("click", () => {
                    localStorage.removeItem("ep_user");
                    window.location.reload();
                });
            }
        } else {
            navAuth.innerHTML = `
                <a href="${loginPath}" class="btn btn-outline">Log In</a>
                <a href="${regPath}" class="btn btn-primary">Sign Up</a>
            `;
        }
    }
}

function addToCart(courseId) {
    const cart = getStorage("ep_cart", []);
    const idNum = parseInt(courseId, 10);
    const course = COURSES_DATA.find(c => c.id === idNum);

    if (!course) return;

    if (cart.some(item => item.id === idNum)) {
        alert("This course is already in your cart!");
        return;
    }

    cart.push(course);
    setStorage("ep_cart", cart);
    updateGlobalNavbar();
    alert(`"${course.title}" added to your cart!`);
}

// ==========================================
// 3. PAGE INITIALIZATION ROUTER
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    updateGlobalNavbar();
    const page = document.body.dataset.page;

    switch (page) {
        case "courses":
            initCoursesPage();
            break;
        case "course-detail":
            initCourseDetailPage();
            break;
        case "cart":
            initCartPage();
            break;
        case "checkout":
            initCheckoutPage();
            break;
        case "payment":
            initPaymentPage();
            break;
        case "quiz":
            initQuizPage();
            break;
        case "login":
            initLoginPage();
            break;
        case "register":
            initRegisterPage();
            break;
        case "dashboard":
            initDashboardPage();
            break;
        case "language":
            initLanguagePage();
            break;
        default:
            break;
    }
});

// ==========================================
// 4. MODULE CONTROLLERS
// ==========================================

// --- Courses Catalog Page ---
function initCoursesPage() {
    const grid = document.getElementById("coursesGrid");
    const searchInput = document.getElementById("courseSearchInput");
    const searchBtn = document.getElementById("searchBtn");
    const filterPills = document.querySelectorAll(".filter-pill");
    const sortSelect = document.getElementById("sortCourses");
    const noCourses = document.getElementById("noCoursesState");
    const resetBtn = document.getElementById("resetFiltersBtn");

    let currentCategory = "all";
    let searchQuery = "";

    function renderCourses() {
        if (!grid) return;

        let filtered = COURSES_DATA.filter(course => {
            const matchesCat = currentCategory === "all" || course.category === currentCategory;
            const matchesQuery = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                 course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCat && matchesQuery;
        });

        const sortVal = sortSelect ? sortSelect.value : "popular";
        if (sortVal === "rating") {
            filtered.sort((a, b) => b.rating - a.rating);
        } else if (sortVal === "price-low") {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortVal === "price-high") {
            filtered.sort((a, b) => b.price - a.price);
        }

        grid.innerHTML = "";

        if (filtered.length === 0) {
            if (noCourses) noCourses.style.display = "block";
            return;
        }

        if (noCourses) noCourses.style.display = "none";

        filtered.forEach(c => {
            const card = document.createElement("div");
            card.className = "course-card";
            card.setAttribute("data-category", c.category);
            card.innerHTML = `
                <div class="card-thumb ${c.category}-thumb">
                    <span class="category-badge">${c.category.toUpperCase()}</span>
                </div>
                <div class="card-body">
                    <div class="card-rating">★ ${c.rating} <span class="rating-count">(${c.reviewsCount})</span></div>
                    <h3 class="card-title">${c.title}</h3>
                    <p class="card-instructor">Instructor: ${c.instructor}</p>
                    <div class="card-meta">
                        <span>⏱️ ${c.duration}</span>
                        <span>📊 ${c.level}</span>
                    </div>
                    <div class="card-footer">
                        <div class="price-box">
                            <span class="price-current">$${c.price.toFixed(2)}</span>
                            <span class="price-old">$${c.originalPrice.toFixed(2)}</span>
                        </div>
                        <div class="card-btn-group">
                            <a href="course-detail.html?id=${c.id}" class="btn btn-sm btn-outline">Details</a>
                            <button class="btn btn-sm btn-primary add-cart-btn" data-id="${c.id}">Add Cart</button>
                        </div>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });

        grid.querySelectorAll(".add-cart-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                addToCart(e.target.dataset.id);
            });
        });
    }

    filterPills.forEach(pill => {
        pill.addEventListener("click", () => {
            filterPills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            currentCategory = pill.dataset.category;
            renderCourses();
        });
    });

    const handleSearch = () => {
        searchQuery = searchInput ? searchInput.value.trim() : "";
        renderCourses();
    };

    if (searchBtn) searchBtn.addEventListener("click", handleSearch);
    if (searchInput) searchInput.addEventListener("keyup", (e) => {
        if (e.key === "Enter") handleSearch();
    });
    if (sortSelect) sortSelect.addEventListener("change", renderCourses);

    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            searchQuery = "";
            currentCategory = "all";
            if (searchInput) searchInput.value = "";
            filterPills.forEach(p => p.classList.toggle("active", p.dataset.category === "all"));
            renderCourses();
        });
    }

    renderCourses();
}

// --- Course Detail Page ---
function initCourseDetailPage() {
    const params = new URLSearchParams(window.location.search);
    const courseId = parseInt(params.get("id"), 10) || 1;
    const course = COURSES_DATA.find(c => c.id === courseId) || COURSES_DATA[0];

    const setElem = (id, txt) => {
        const elem = document.getElementById(id);
        if (elem) elem.textContent = txt;
    };

    setElem("detailTitle", course.title);
    setElem("detailTagline", course.tagline);
    setElem("detailPrice", `$${course.price.toFixed(2)}`);
    setElem("detailOriginalPrice", `$${course.originalPrice.toFixed(2)}`);
    setElem("detailRating", course.rating);
    setElem("detailReviewsCount", course.reviewsCount.toLocaleString());
    setElem("detailStudentsCount", course.studentsCount.toLocaleString());
    setElem("detailDuration", course.duration);
    setElem("detailInstructor", course.instructor);
    setElem("instructorName", course.instructor);
    setElem("instructorTitle", course.instructorTitle);
    setElem("instructorBio", course.instructorBio);
    setElem("breadcrumbCategory", course.category.toUpperCase());

    const avatar = document.getElementById("instructorAvatar");
    if (avatar) {
        avatar.textContent = course.instructor.split(" ").map(n => n[0]).join("");
    }

    const objectivesList = document.getElementById("learningObjectivesList");
    if (objectivesList && course.objectives) {
        objectivesList.innerHTML = course.objectives.map(obj => `<li>${obj}</li>`).join("");
    }

    const headers = document.querySelectorAll(".accordion-header");
    headers.forEach(h => {
        h.addEventListener("click", () => {
            const item = h.parentElement;
            item.classList.toggle("active");
            const indicator = h.querySelector(".accordion-indicator");
            if (indicator) {
                indicator.textContent = item.classList.contains("active") ? "−" : "+";
            }
        });
    });

    const addBtn = document.getElementById("addToCartBtn");
    const buyBtn = document.getElementById("buyNowBtn");

    if (addBtn) {
        addBtn.addEventListener("click", () => addToCart(course.id));
    }
    if (buyBtn) {
        buyBtn.addEventListener("click", () => {
            addToCart(course.id);
            window.location.href = "cart.html";
        });
    }
}

// --- Cart Page ---
function initCartPage() {
    const container = document.getElementById("cartItemsContainer");
    const layout = document.getElementById("cartLayout");
    const emptyState = document.getElementById("emptyCartState");
    const subtotalElem = document.getElementById("cartSubtotal");
    const discountElem = document.getElementById("cartDiscount");
    const taxElem = document.getElementById("cartTax");
    const grandTotalElem = document.getElementById("cartGrandTotal");
    const clearBtn = document.getElementById("clearCartBtn");
    const couponInput = document.getElementById("couponCodeInput");
    const applyCouponBtn = document.getElementById("applyCouponBtn");
    const couponMsg = document.getElementById("couponStatusMsg");

    let discountMultiplier = 0.0;

    function calculateCart() {
        const cart = getStorage("ep_cart", []);
        if (cart.length === 0) {
            if (layout) layout.style.display = "none";
            if (emptyState) emptyState.style.display = "block";
            return;
        }

        if (layout) layout.style.display = "grid";
        if (emptyState) emptyState.style.display = "none";

        let subtotal = cart.reduce((sum, item) => sum + item.price, 0);
        let discount = subtotal * discountMultiplier;
        let tax = (subtotal - discount) * 0.05;
        let total = (subtotal - discount) + tax;

        if (subtotalElem) subtotalElem.textContent = `$${subtotal.toFixed(2)}`;
        if (discountElem) discountElem.textContent = `-$${discount.toFixed(2)}`;
        if (taxElem) taxElem.textContent = `$${tax.toFixed(2)}`;
        if (grandTotalElem) grandTotalElem.textContent = `$${total.toFixed(2)}`;

        setStorage("ep_checkout_totals", { subtotal, discount, tax, total });
    }

    function renderCartItems() {
        const cart = getStorage("ep_cart", []);
        if (!container) return;

        container.innerHTML = "";
        cart.forEach((item, index) => {
            const itemRow = document.createElement("div");
            itemRow.className = "cart-item-row";
            itemRow.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.title}</h4>
                    <p class="text-muted">Instructor: ${item.instructor} • ${item.duration}</p>
                </div>
                <div class="cart-item-pricing">
                    <span class="price-val">$${item.price.toFixed(2)}</span>
                    <button class="remove-btn" data-index="${index}">Remove</button>
                </div>
            `;
            container.appendChild(itemRow);
        });

        container.querySelectorAll(".remove-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const idx = parseInt(e.target.dataset.index, 10);
                const cart = getStorage("ep_cart", []);
                cart.splice(idx, 1);
                setStorage("ep_cart", cart);
                updateGlobalNavbar();
                renderCartItems();
                calculateCart();
            });
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            setStorage("ep_cart", []);
            updateGlobalNavbar();
            calculateCart();
        });
    }

    if (applyCouponBtn) {
        applyCouponBtn.addEventListener("click", () => {
            const code = couponInput ? couponInput.value.trim().toUpperCase() : "";
            if (code === "LEARN20") {
                discountMultiplier = 0.20;
                couponMsg.textContent = "Coupon 'LEARN20' applied: 20% OFF!";
                couponMsg.className = "coupon-status-msg success";
            } else if (code === "") {
                couponMsg.textContent = "Please enter a coupon code.";
                couponMsg.className = "coupon-status-msg error";
            } else {
                couponMsg.textContent = "Invalid coupon code.";
                couponMsg.className = "coupon-status-msg error";
            }
            calculateCart();
        });
    }

    renderCartItems();
    calculateCart();
}

// --- Checkout Page ---
function initCheckoutPage() {
    const list = document.getElementById("checkoutItemsList");
    const payDisplay = document.getElementById("payAmountDisplay");
    const subtotalEl = document.getElementById("checkoutSubtotal");
    const discountEl = document.getElementById("checkoutDiscount");
    const taxEl = document.getElementById("checkoutTax");
    const grandTotalEl = document.getElementById("checkoutGrandTotal");
    const payBtn = document.getElementById("payNowBtn");
    const modal = document.getElementById("orderSuccessModal");

    const cart = getStorage("ep_cart", []);
    const totals = getStorage("ep_checkout_totals", {
        subtotal: cart.reduce((acc, c) => acc + c.price, 0),
        discount: 0,
        tax: 0,
        total: cart.reduce((acc, c) => acc + c.price, 0)
    });

    if (list) {
        list.innerHTML = cart.map(item => `
            <div class="checkout-item-mini">
                <span>${item.title}</span>
                <strong>$${item.price.toFixed(2)}</strong>
            </div>
        `).join("");
    }

    if (subtotalEl) subtotalEl.textContent = `$${totals.subtotal.toFixed(2)}`;
    if (discountEl) discountEl.textContent = `-$${totals.discount.toFixed(2)}`;
    if (taxEl) taxEl.textContent = `$${totals.tax.toFixed(2)}`;
    if (grandTotalEl) grandTotalEl.textContent = `$${totals.total.toFixed(2)}`;
    if (payDisplay) payDisplay.textContent = `$${totals.total.toFixed(2)}`;

    const tabs = document.querySelectorAll('input[name="paymentMethod"]');
    tabs.forEach(tab => {
        tab.addEventListener("change", () => {
            document.querySelectorAll(".payment-panel").forEach(p => p.style.display = "none");
            const panel = document.getElementById(`${tab.value}Panel`);
            if (panel) panel.style.display = "block";
        });
    });

    if (payBtn) {
        payBtn.addEventListener("click", () => {
            if (cart.length === 0) {
                alert("Your cart is empty.");
                return;
            }

            const orderId = `#EP-${Math.floor(100000 + Math.random() * 900000)}`;
            const orderIdElem = document.getElementById("confirmedOrderId");
            if (orderIdElem) orderIdElem.textContent = orderId;

            setStorage("ep_cart", []);
            updateGlobalNavbar();

            if (modal) modal.style.display = "flex";
        });
    }
}

// --- Dedicated Payment Page Engine ---
function initPaymentPage() {
    const totals = getStorage("ep_checkout_totals", { total: 49.99 });
    const amountStr = `$${totals.total.toFixed(2)}`;

    const payableAmount = document.getElementById("paymentPayableAmount");
    if (payableAmount) payableAmount.textContent = amountStr;

    document.querySelectorAll(".btn-amount-span").forEach(span => {
        span.textContent = amountStr;
    });

    const txnRef = document.getElementById("txnRefId");
    if (txnRef) txnRef.textContent = `#TXN-${Math.floor(10000 + Math.random() * 90000)}`;

    const tabBtns = document.querySelectorAll(".gateway-tab-btn");
    const tabContents = document.querySelectorAll(".gateway-tab-content");

    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            tabContents.forEach(c => (c.style.display = "none"));

            btn.classList.add("active");
            const target = document.getElementById(btn.dataset.tab);
            if (target) target.style.display = "block";
        });
    });

    document.querySelectorAll(".bank-pill").forEach(pill => {
        pill.addEventListener("click", () => {
            document.querySelectorAll(".bank-pill").forEach(p => p.classList.remove("selected"));
            pill.classList.add("selected");
        });
    });

    const modal = document.getElementById("paymentProcessModal");
    const loadingState = document.getElementById("paymentLoadingState");
    const successState = document.getElementById("paymentSuccessState");
    const receiptId = document.getElementById("approvedReceiptId");

    document.querySelectorAll(".trigger-pay-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            if (modal) modal.style.display = "flex";
            if (loadingState) loadingState.style.display = "block";
            if (successState) successState.style.display = "none";

            setTimeout(() => {
                if (loadingState) loadingState.style.display = "none";
                if (successState) successState.style.display = "block";
                if (receiptId) receiptId.textContent = `#REC-${Math.floor(10000 + Math.random() * 90000)}`;

                setStorage("ep_cart", []);
                updateGlobalNavbar();
            }, 1800);
        });
    });
}

// --- Interactive Quiz Page ---
function initQuizPage() {
    let currentIdx = 0;
    let selectedAnswers = new Array(QUIZ_DATA.length).fill(null);

    const questionText = document.getElementById("questionText");
    const optionsContainer = document.getElementById("optionsContainer");
    const progressText = document.getElementById("quizProgressText");
    const progressBar = document.getElementById("quizProgressBar");
    const prevBtn = document.getElementById("prevQuestionBtn");
    const nextBtn = document.getElementById("nextQuestionBtn");
    const quizCard = document.getElementById("quizContainer");
    const resultCard = document.getElementById("quizResultContainer");
    const retryBtn = document.getElementById("retryQuizBtn");

    function renderQuestion() {
        const q = QUIZ_DATA[currentIdx];
        if (questionText) questionText.textContent = `${currentIdx + 1}. ${q.question}`;
        if (progressText) progressText.textContent = `Question ${currentIdx + 1} of ${QUIZ_DATA.length}`;
        if (progressBar) progressBar.style.width = `${((currentIdx + 1) / QUIZ_DATA.length) * 100}%`;

        if (prevBtn) prevBtn.disabled = currentIdx === 0;
        if (nextBtn) {
            nextBtn.textContent = currentIdx === QUIZ_DATA.length - 1 ? "Submit Assessment" : "Next Question";
        }

        if (optionsContainer) {
            optionsContainer.innerHTML = "";
            q.options.forEach((opt, idx) => {
                const btn = document.createElement("button");
                btn.className = "quiz-option-btn";
                if (selectedAnswers[currentIdx] === idx) {
                    btn.classList.add("selected");
                }
                btn.textContent = opt;
                btn.addEventListener("click", () => {
                    selectedAnswers[currentIdx] = idx;
                    renderQuestion();
                });
                optionsContainer.appendChild(btn);
            });
        }
    }

    function calculateResults() {
        let correct = 0;
        QUIZ_DATA.forEach((q, idx) => {
            if (selectedAnswers[idx] === q.correctIndex) {
                correct++;
            }
        });

        const percent = Math.round((correct / QUIZ_DATA.length) * 100);

        if (quizCard) quizCard.style.display = "none";
        if (resultCard) resultCard.style.display = "block";

        const finalScore = document.getElementById("finalScorePercent");
        const correctCount = document.getElementById("correctAnswersCount");
        const totalCount = document.getElementById("totalQuestionsCount");

        if (finalScore) finalScore.textContent = `${percent}%`;
        if (correctCount) correctCount.textContent = correct;
        if (totalCount) totalCount.textContent = QUIZ_DATA.length;
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            if (currentIdx > 0) {
                currentIdx--;
                renderQuestion();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            if (selectedAnswers[currentIdx] === null) {
                alert("Please select an answer before continuing.");
                return;
            }

            if (currentIdx < QUIZ_DATA.length - 1) {
                currentIdx++;
                renderQuestion();
            } else {
                calculateResults();
            }
        });
    }

    if (retryBtn) {
        retryBtn.addEventListener("click", () => {
            currentIdx = 0;
            selectedAnswers = new Array(QUIZ_DATA.length).fill(null);
            if (resultCard) resultCard.style.display = "none";
            if (quizCard) quizCard.style.display = "block";
            renderQuestion();
        });
    }

    renderQuestion();
}

// --- Authentication: Login Page ---
function initLoginPage() {
    const form = document.getElementById("loginForm");
    const emailInput = document.getElementById("loginEmail");
    const passInput = document.getElementById("loginPassword");
    const toggleBtn = document.getElementById("togglePasswordBtn");
    const alertBox = document.getElementById("loginAlert");

    if (toggleBtn && passInput) {
        toggleBtn.addEventListener("click", () => {
            const isPass = passInput.type === "password";
            passInput.type = isPass ? "text" : "password";
            toggleBtn.textContent = isPass ? "🔒" : "👁️";
        });
    }

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = emailInput ? emailInput.value.trim() : "";
            const pass = passInput ? passInput.value.trim() : "";

            if (!email || !pass) {
                if (alertBox) {
                    alertBox.textContent = "Please provide both email and password.";
                    alertBox.style.display = "block";
                }
                return;
            }

            const user = {
                name: email.split("@")[0].replace(".", " "),
                email: email
            };

            setStorage("ep_user", user);
            window.location.href = "dashboard.html";
        });
    }
}

// --- Authentication: Register Page ---
function initRegisterPage() {
    const form = document.getElementById("registerForm");
    const nameInput = document.getElementById("regFullName");
    const emailInput = document.getElementById("regEmail");
    const passInput = document.getElementById("regPassword");
    const confirmInput = document.getElementById("regConfirmPassword");
    const termsInput = document.getElementById("acceptTerms");
    const alertBox = document.getElementById("registerAlert");
    const successBox = document.getElementById("registerSuccess");
    const strengthMeter = document.getElementById("strengthMeter");
    const strengthText = document.getElementById("strengthText");

    if (passInput && strengthMeter && strengthText) {
        passInput.addEventListener("input", () => {
            const len = passInput.value.length;
            if (len === 0) {
                strengthMeter.style.width = "0%";
                strengthMeter.style.backgroundColor = "transparent";
                strengthText.textContent = "Strength: Empty";
            } else if (len < 6) {
                strengthMeter.style.width = "30%";
                strengthMeter.style.backgroundColor = "#ef4444";
                strengthText.textContent = "Strength: Weak (6+ chars needed)";
            } else if (len < 10) {
                strengthMeter.style.width = "70%";
                strengthMeter.style.backgroundColor = "#f59e0b";
                strengthText.textContent = "Strength: Medium";
            } else {
                strengthMeter.style.width = "100%";
                strengthMeter.style.backgroundColor = "#10b981";
                strengthText.textContent = "Strength: Strong";
            }
        });
    }

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            if (alertBox) alertBox.style.display = "none";

            const name = nameInput ? nameInput.value.trim() : "";
            const email = emailInput ? emailInput.value.trim() : "";
            const pass = passInput ? passInput.value.trim() : "";
            const confirm = confirmInput ? confirmInput.value.trim() : "";

            if (!name || !email || !pass) {
                alertBox.textContent = "All fields are required.";
                alertBox.style.display = "block";
                return;
            }

            if (pass.length < 6) {
                alertBox.textContent = "Password must be at least 6 characters.";
                alertBox.style.display = "block";
                return;
            }

            if (pass !== confirm) {
                alertBox.textContent = "Passwords do not match.";
                alertBox.style.display = "block";
                return;
            }

            if (termsInput && !termsInput.checked) {
                alertBox.textContent = "Please agree to the Terms of Service.";
                alertBox.style.display = "block";
                return;
            }

            setStorage("ep_user", { name, email });
            if (successBox) successBox.style.display = "block";

            setTimeout(() => {
                window.location.href = "login.html";
            }, 1200);
        });
    }
}

// --- Dashboard Page ---
function initDashboardPage() {
    const user = getStorage("ep_user", { name: "Learner", email: "student@example.com" });
    const nameDisplay = document.getElementById("userNameDisplay");
    const avatar = document.getElementById("userAvatar");

    if (nameDisplay) nameDisplay.textContent = user.name;
    if (avatar) avatar.textContent = user.name[0].toUpperCase();
}

// --- Language Selection Page ---
function initLanguagePage() {
    const langCards = document.querySelectorAll(".lang-option-card");
    const saveBtn = document.getElementById("saveLanguageBtn");
    const notice = document.getElementById("languageSaveNotice");
    const previewGreeting = document.getElementById("previewGreeting");
    const previewText = document.getElementById("previewText");

    const currentLang = getStorage("ep_lang", "en");

    function applyPreview(code) {
        const trans = TRANSLATIONS[code] || TRANSLATIONS.en;
        if (previewGreeting) previewGreeting.textContent = trans.greeting;
        if (previewText) previewText.textContent = trans.tagline;
    }

    langCards.forEach(card => {
        const input = card.querySelector('input[type="radio"]');
        if (input.value === currentLang) {
            input.checked = true;
            card.classList.add("selected");
        } else {
            card.classList.remove("selected");
        }

        card.addEventListener("click", () => {
            langCards.forEach(c => c.classList.remove("selected"));
            card.classList.add("selected");
            input.checked = true;
            applyPreview(input.value);
        });
    });

    applyPreview(currentLang);

    if (saveBtn) {
        saveBtn.addEventListener("click", () => {
            const selected = document.querySelector('input[name="siteLanguage"]:checked');
            if (selected) {
                setStorage("ep_lang", selected.value);
                if (notice) notice.style.display = "block";
                setTimeout(() => {
                    if (notice) notice.style.display = "none";
                }, 2500);
            }
        });
    }
}