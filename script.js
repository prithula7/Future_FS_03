// script.js

document.addEventListener("DOMContentLoaded", () => {
    // 1. Dark Mode Toggle
    // Dark Mode Toggle with Local Storage
const toggleBtn = document.getElementById("darkToggle");

// Check for saved user preference
if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark-mode");
  toggleBtn.checked = true;
}

// Toggle dark mode
toggleBtn?.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  
  // Save user preference
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "enabled");
  } else {
    localStorage.setItem("darkMode", "disabled");
  }
});

// JavaScript for interactive menu
document.addEventListener('DOMContentLoaded', function() {
    // Category selection
    const categoryCards = document.querySelectorAll('.card');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    categoryCards.forEach((card, index) => {
      card.addEventListener('click', () => {
        // Update active category card
        categoryCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        
        // Scroll to corresponding menu section
        menuCategories.forEach(cat => cat.classList.remove('active'));
        menuCategories[index].classList.add('active');
        
        // Scroll to the category
        menuCategories[index].scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
    });
    
    // Handle swipe gestures for menu items
    const menuContainer = document.querySelector('.menu-items-container');
    let startX, moveX;
    
    menuContainer.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, {passive: true});
    
    menuContainer.addEventListener('touchmove', (e) => {
      moveX = e.touches[0].clientX;
    }, {passive: true});
    
    menuContainer.addEventListener('touchend', () => {
      if (startX - moveX > 50) {
        // Swiped left
        const activeIndex = Array.from(categoryCards).findIndex(card => card.classList.contains('active'));
        if (activeIndex < categoryCards.length - 1) {
          categoryCards[activeIndex + 1].click();
        }
      } else if (moveX - startX > 50) {
        // Swiped right
        const activeIndex = Array.from(categoryCards).findIndex(card => card.classList.contains('active'));
        if (activeIndex > 0) {
          categoryCards[activeIndex - 1].click();
        }
      }
    }, {passive: true});
  });
  
    // 2. Add-to-Cart Popup
    const quickAddBtns = document.querySelectorAll(".quick-add");
    quickAddBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        alert("Item added to cart!");
      });
    });
  
    // 3. Custom Order Dropdown (simple popup)
    const customizeBtns = document.querySelectorAll(".customize");
    customizeBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const sides = prompt("Choose your side (Fries, Salad, Rice):");
        const drink = prompt("Choose a drink (Soda, Juice, Water):");
        alert(`Order customized with ${sides} and ${drink}.`);
      });
    });
  
    // 4. Simulate Order Progress
      const startOrderBtn = document.getElementById('startOrderBtn');
      const steps = document.querySelectorAll('.step');
      
      // Debug checks
      console.log('Button exists:', !!startOrderBtn);
      console.log('Steps found:', steps.length);
      
      let currentStep = 0;
      let intervalId = null;
      let countdownInterval = null;
      console.log('Updating step', currentStep);
    
      function updateProgress() {
        if (countdownInterval) clearInterval(countdownInterval);
      
        // Reset all steps
        steps.forEach((step, index) => {
          step.classList.remove('active');
          const label = step.getAttribute('data-status')?.replace(/-/g, ' ') || step.textContent;
          step.textContent = label;
        });
      
        const currentStepEl = steps[currentStep];
        const statusLabel = currentStepEl.getAttribute('data-status').replace(/-/g, ' ');
      
        currentStepEl.classList.add('active');
      
        if (currentStep < steps.length - 1) {
          let secondsLeft = 5;
          currentStepEl.textContent = `${statusLabel} (${secondsLeft}s)`;
      
          countdownInterval = setInterval(() => {
            secondsLeft--;
            currentStepEl.textContent = `${statusLabel} (${secondsLeft}s)`;
            if (secondsLeft <= 0) {
              clearInterval(countdownInterval);
            }
          }, 1000);
        } else {
          currentStepEl.textContent = "Delivered! 🎉";
          clearInterval(intervalId);
          startOrderBtn.disabled = false;
        }
      
        currentStep++;
      }
      
    
      function startNewOrder() {
        // Reset state
        currentStep = 0;
        startOrderBtn.disabled = true;
        
        // Clear any existing intervals
        if (intervalId) clearInterval(intervalId);
        if (countdownInterval) clearInterval(countdownInterval);
        
        // Start the progress
        updateProgress(); // Show first step immediately
        
        // Set interval for subsequent steps (reduced to 5 seconds for testing)
        intervalId = setInterval(updateProgress, 5000); // 5000ms = 5 seconds
      }
    
      // Event listener for the start button
      startOrderBtn.addEventListener('click', startNewOrder);

    // 5. Spin the Bucket Mini Game
    const spinBtn = document.getElementById("spinBucket");
    const discounts = ["10% OFF", "Free Drink", "20% OFF", "Try Again", "5% OFF"];
    spinBtn?.addEventListener("click", () => {
      const prize = discounts[Math.floor(Math.random() * discounts.length)];
      alert(`🎉 You got: ${prize}`);
    });
  
    // 6. Simple Chatbot
    const chatbotIcon = document.querySelector(".chatbot");
    chatbotIcon?.addEventListener("click", () => {
      const question = prompt("Hi! Ask me anything about your order:");
      alert("Thanks! A support agent will reach out shortly.");
    });
  });
  