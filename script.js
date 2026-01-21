<script defer>
    // Tab functionality using event listeners
    document.querySelectorAll('.tab-links').forEach(button => {
      button.addEventListener('click', () => {
        const tab = button.getAttribute('data-tab');
        document.querySelectorAll('.tab-links').forEach(btn => btn.classList.remove('active-link'));
        document.querySelectorAll('.tab-contents').forEach(content => content.classList.remove('active-tab'));
        button.classList.add('active-link');
        document.getElementById(tab).classList.add('active-tab');
      });
    });

    // Form submission functionality
    const form = document.forms['submit-to-google-sheet'];
    const msg = document.getElementById('msg');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      nameInput.classList.remove('input-error', 'input-success');
      emailInput.classList.remove('input-error', 'input-success');
      messageInput.classList.remove('input-error', 'input-success');

      let hasError = false;

      if (nameInput.value.trim() === "") {
        nameInput.classList.add('input-error');
        hasError = true;
      } 

      if (emailInput.value.trim() === "") {
        emailInput.classList.add('input-error');
        hasError = true;
      } 

      if (messageInput.value.trim() === "") {
        messageInput.classList.add('input-error');
        hasError = true;
      }

      if (hasError) {
        msg.innerHTML = "⚠️ Please fill out all fields correctly.";
        msg.style.color = "red";
        setTimeout(() => msg.innerHTML = "", 1500);
        return;
      }

      const namePattern = /^[A-Za-z\s]+$/;
      if (!namePattern.test(nameInput.value.trim())) {
        nameInput.classList.add('input-error');
        msg.innerHTML = "⚠️ Name can only contain letters and spaces.";
        msg.style.color = "red";
        setTimeout(() => msg.innerHTML = "", 1500);
        return;
      } else {
        nameInput.classList.add('input-success');
      }

      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(emailInput.value.trim()) || emailInput.value.trim().length < 8) {
        emailInput.classList.add('input-error');
        msg.innerHTML = "⚠️ Please enter a valid email address.";
        msg.style.color = "red";
        setTimeout(() => msg.innerHTML = "", 1500);
        return;
      } else {
        emailInput.classList.add('input-success');
      }

      const fakeDomains = ["test.com", "example.com", "mailinator.com", "tempmail.com"];
      const emailDomain = emailInput.value.trim().split("@")[1]; 
      if (fakeDomains.includes(emailDomain)) {
        emailInput.classList.add('input-error');
        msg.innerHTML = "⚠️ This email domain is not allowed.";
        msg.style.color = "red";
        setTimeout(() => msg.innerHTML = "", 1500);
        return;
      }

      fetch('https://script.google.com/macros/s/AKfycbxY2ns_jtRlocqzZkBLBI-ioHdcajDmHTE-e9JLIrEubA_Q9P-V8HoblQ6hyJuZKIRNiw/exec', {
        method: 'POST',
        body: new FormData(form)
      })
      .then(response => {
        msg.innerHTML = "✅ Message sent successfully!";
        msg.style.color = "green";
        setTimeout(() => msg.innerHTML = "", 1500);
        form.reset();
        nameInput.classList.remove('input-success');
        emailInput.classList.remove('input-success');
        messageInput.classList.remove('input-success');
      })
      .catch(error => {
        msg.innerHTML = "❌ Failed to send. Try again!";
        msg.style.color = "red";
        setTimeout(() => msg.innerHTML = "", 1500);
      });
    });

    // Initialize particles.js after DOM content is loaded
    window.addEventListener('DOMContentLoaded', () => {
      particlesJS('particles-js', {
        particles: {
          number: { value: 80 },
          color: { value: "#03C03C" },
          shape: { type: "circle" },
          opacity: { value: 0.7 },
          size: { value: 3 },
          move: { enable: true, speed: 1 }
        },
        interactivity: {
          events: { onClick: { enable: false } }
        }
      });
    });

    // JavaScript Typewriter Effect for Text Animation
    document.addEventListener("DOMContentLoaded", function () {
      const texts = ["UI/UX Designer", "Web Designer", "Data Analyst", "Web Developer", "Software Tester"];
      let currentTextIndex = 0;
      let currentCharIndex = 0;
      const typeSpeed = 100;
      const eraseSpeed = 50;
      const pauseTime = 1500;
      const target = document.querySelector(".text-animation span");

      function type() {
        if (currentCharIndex < texts[currentTextIndex].length) {
          target.textContent += texts[currentTextIndex].charAt(currentCharIndex);
          currentCharIndex++;
          setTimeout(type, typeSpeed);
        } else {
          setTimeout(erase, pauseTime);
        }
      }

      function erase() {
        if (currentCharIndex > 0) {
          target.textContent = texts[currentTextIndex].substring(0, currentCharIndex - 1);
          currentCharIndex--;
          setTimeout(erase, eraseSpeed);
        } else {
          currentTextIndex = (currentTextIndex + 1) % texts.length;
          setTimeout(type, 500);
        }
      }

      type();
    });
  </script>
