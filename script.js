// Wait for the DOM to fully load before running scripts that interact with it
document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. TYPING ANIMATION
    // ==========================================
    // Safety check: Only run if the element exists and the Typed library is loaded
    const typedElement = document.querySelector(".text");
    if (typedElement && typeof Typed !== 'undefined') {
        var type = new Typed(".text", {
            strings: ["Web Developer", "AI/ML Enthusiast", "GATE Qualified", "Competitive Programmer"],
            typeSpeed: 50,
            backSpeed: 50,
            backDelay: 1000,
            loop: true
        });
    }

    // ==========================================
    // 2. DOM LOADED EVENTS (Observer & Theme Toggle)
    // ==========================================
    
    // --- SKILLS OBSERVER ---
    const skillsSection = document.getElementById('skills');

    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillsSection.classList.add('show-animate');
                } else {
                    skillsSection.classList.remove('show-animate');
                }
            });
        }, {
            threshold: 0.3
        });
        
        observer.observe(skillsSection);
    }

    // --- THEME TOGGLE LOGIC ---
    const themeToggleBtn = document.querySelector('.theme-toggle');

    // Safety check to make sure the button exists on the page
    if (themeToggleBtn) {
        // Check local storage when the page loads
        if (localStorage.getItem('theme') === 'light') {
            document.body.classList.add('light-mode');
            themeToggleBtn.textContent = '☀️';
        } else {
            themeToggleBtn.textContent = '🌙';
        }

        // Listen for clicks on the button
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');

            if (document.body.classList.contains('light-mode')) {
                themeToggleBtn.textContent = '☀️';
                localStorage.setItem('theme', 'light'); // Save preference
            } else {
                themeToggleBtn.textContent = '🌙';
                localStorage.setItem('theme', 'dark'); // Save preference
            }
        });
    }

    // ==========================================
    // 3. DIGITAL CLOCK
    // ==========================================
    function updateClock() {
        const clockElement = document.getElementById('digital-clock');

        // If the clock element doesn't exist on this page, stop running
        if (!clockElement) return;

        const now = new Date();

        let hours = now.getHours();
        let minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';

        hours = hours % 12;
        hours = hours ? hours : 12;

        minutes = minutes < 10 ? '0' + minutes : minutes;
        hours = hours < 10 ? '0' + hours : hours;

        const timeString = `${hours}:${minutes} ${ampm}`;

        clockElement.textContent = timeString;
    }

    // Initialize the clock immediately upon DOM load, then set the interval
    updateClock();
    setInterval(updateClock, 1000);
});

// ==========================================
// 4. COLORFUL FLOATING STARS BACKGROUND
// ==========================================
const canvas = document.getElementById("star-canvas");
const ctx = canvas.getContext("2d");

// Set canvas size to fit the screen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const stars = [];
const numStars = 150; // Change this to add more or fewer stars

// Colors matching your neon theme
const colors = ["#00ffff", "#ff0077", "#ffff00", "#ffffff"]; 

// Create the stars
for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5, // Size of stars
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 1 + 0.2 // Speed moving upwards
    });
}

// Animate the stars
function animateStars() {
    // Clear the canvas every frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < stars.length; i++) {
        let star = stars[i];

        // Draw the star with a glow
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.shadowBlur = 10; // Glowing effect
        ctx.shadowColor = star.color;
        ctx.fill();
        ctx.closePath();

        // Move the star upwards
        star.y -= star.speed;

        // If the star goes off the top, reset it at the bottom
        if (star.y < -10) {
            star.y = canvas.height + 10;
            star.x = Math.random() * canvas.width;
        }
    }

    // Call the next frame
    requestAnimationFrame(animateStars);
}

// Start the animation
animateStars();

// --- HAMBURGER MENU TOGGLE ---
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.querySelector('.navbar');

    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', () => {
            // Toggle the 'bx-x' class to change the icon to an X
            menuIcon.classList.toggle('bx-x');
            // Toggle the 'active' class to show/hide the menu
            navbar.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = document.querySelectorAll('.navbar a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuIcon.classList.remove('bx-x');
                navbar.classList.remove('active');
            });
        });
    }
