document.addEventListener("DOMContentLoaded", () => {
  // --- Product Data ---
  const products = [
    { id: "p1", name: "Green Lace Attire", price: 150000.0, image: "/images/product5.png", category: "aso-ebi" },
    { id: "p2", name: "Modern Short Gown", price: 100000.0, image: "/images/product8.png", category: "bridal" },
    { id: "p3", name: "Elegant Native Gown", price: 220000.0, image: "/images/product1.png", category: "casual" },
    { id: "p4", name: "Comfy Armless Dress", price: 38000.0, image: "/images/product4.png", category: "aso-ebi" },
    { id: "p5", name: "Shiny Black Dress", price: 92000.0, image: "/images/product3.png", category: "bridal" },
    { id: "p6", name: "Modern Styled Gown", price: 57000.0, image: "/images/product6.png", category: "casual" },
    { id: "p7", name: "Stylish Long Gown", price: 45000.0, image: "/images/product7.png", category: "aso-ebi" },
    { id: "p8", name: "White Uwana Dress", price: 30000.0, image: "/images/product2.png", category: "bridal" },
  ]

  const productGrid = document.querySelector(".product-grid")
  const filterButtons = document.querySelectorAll(".filter-button")
  const whatsappNumber = "2347069523755" // New WhatsApp number

  // --- Render Products Function ---
  const renderProducts = (category) => {
    productGrid.innerHTML = "" // Clear current products
    const filteredProducts = category === "all" ? products : products.filter((p) => p.category === category)

    if (filteredProducts.length === 0) {
      productGrid.innerHTML =
        '<p style="text-align: center; grid-column: 1 / -1; color: var(--color-dark-gray);">No products found in this category.</p>'
      return
    }

    filteredProducts.forEach((product) => {
      // Format the price with Naira currency and commas
      const formattedPrice = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 2, // Ensure two decimal places
        maximumFractionDigits: 2, // Ensure two decimal places
      }).format(product.price)

      const productCard = document.createElement("div")
      productCard.classList.add("product-card")
      productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="price">${formattedPrice}</p>
                    <button class="order-button cta-button" onclick="window.open('https://wa.me/${whatsappNumber}?text=Hello%20Macdee%20Ready-to-Wear,%20I%27m%20interested%20in%20the%20${encodeURIComponent(product.name)}%20(ID:%20${product.id}).', '_blank')">Order on WhatsApp</button>
                </div>
            `
      productGrid.appendChild(productCard)
    })
  }

  // Initial render of all products
  renderProducts("all")

  // --- Category Filter Logic ---
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      // Add active class to the clicked button
      button.classList.add("active")
      // Render products based on the selected category
      const category = button.dataset.category
      renderProducts(category)
    })
  })

  // --- Mobile Navigation Toggle ---
  const menuToggle = document.querySelector(".menu-toggle")
  const navLinks = document.querySelector(".nav-links")

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active")
    menuToggle.classList.toggle("active")
  })

  // Close mobile nav when a link is clicked
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active")
        menuToggle.classList.remove("active")
      }
    })
  })

  // --- Scroll-based Animations (Intersection Observer) ---
  const sections = document.querySelectorAll("section")

  const observerOptions = {
    root: null, // viewport
    rootMargin: "0px",
    threshold: 0.15, // 15% of the section must be visible for a more noticeable trigger
  }

  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
        observer.unobserve(entry.target) // Stop observing once visible
      }
    })
  }, observerOptions)

  sections.forEach((section) => {
    sectionObserver.observe(section)
  })

  // --- Back to Top Button Logic ---
  const backToTopBtn = document.getElementById("backToTopBtn")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      // Show button after scrolling 300px
      backToTopBtn.classList.add("show")
    } else {
      backToTopBtn.classList.remove("show")
    }
  })

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
})
