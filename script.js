'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]"); // Correction de la sélection ici
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.getAttribute("data-select-item"); // Utilisation de getAttribute pour obtenir la valeur
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}


// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// Fonction pour ouvrir le modal
function openModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.style.display = "block";
}

// Fonction pour fermer le modal
function closeModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.style.display = "none";
}

// Intégration de la structure HTML de la page portfolio

// Sélection de l'article de portfolio
const portfolio = document.querySelector("[data-page='portfolio']");

if (portfolio) {
  // Sélection des boutons de filtrage dans le portfolio
  const portfolioFilterBtns = portfolio.querySelectorAll("[data-filter-btn]");

  // Ajout d'un écouteur d'événement à chaque bouton de filtrage dans le portfolio
  portfolioFilterBtns.forEach(btn => {
    btn.addEventListener("click", function () {
      const selectedValue = this.getAttribute("data-filter-btn");
      filterFunc(selectedValue); // Appel de la fonction de filtrage avec la valeur du bouton

      // Optionnel : activer/désactiver la classe active pour le bouton cliqué
      portfolioFilterBtns.forEach(btn => btn.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Sélection des éléments de sélection personnalisée (dropdown) dans le portfolio
  const portfolioSelectItems = portfolio.querySelectorAll("[data-select-item]");

  // Ajout d'un écouteur d'événement à chaque élément de sélection personnalisée dans le portfolio
  portfolioSelectItems.forEach(item => {
    item.addEventListener("click", function () {
      const selectedValue = this.getAttribute("data-select-item");
      const selectValueElem = portfolio.querySelector("[data-select-value]");
      selectValueElem.innerText = this.innerText;

      filterFunc(selectedValue); // Appel de la fonction de filtrage avec la valeur sélectionnée
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const filterButtons = document.querySelectorAll('[data-filter-btn]');
  const projects = document.querySelectorAll('.project');

  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      const filter = this.getAttribute('data-filter-btn');
      
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      projects.forEach(project => {
        if (filter === 'all' || project.getAttribute('data-category') === filter) {
          project.style.display = 'block';
        } else {
          project.style.display = 'none';
        }
      });
    });
  });
});


document.addEventListener("DOMContentLoaded", function() {
  const seeMoreButtons = document.querySelectorAll(".see-more");

  seeMoreButtons.forEach(button => {
    button.addEventListener("click", function() {
      const description = this.previousElementSibling;
      if (description.classList.contains("expanded")) {
        description.classList.remove("expanded");
        this.textContent = "Voir plus";
      } else {
        description.classList.add("expanded");
        this.textContent = "Voir moins";
      }
    });
  });
});

