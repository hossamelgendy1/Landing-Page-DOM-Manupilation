/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');
const navBarList = document.getElementById('navbar__list');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// this function checks if the given element is in the viewport or not.
function sectionIsInViewport(element){
    let rect = element.getBoundingClientRect();
    //I used 300 so that when about half of the section is in the viewport it returns (true).
    return(rect.bottom >= 300 && rect.top < 300);
}

// finds the y-coordinate of the top of the given element.
function findTop(element) {
    var top = 0;
    if (element.offsetParent) {
        do {
            top += element.offsetTop;
        } while (element = element.offsetParent);
    return top;
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNavBar(){
    //a fragment is used to improve the performance.
    const fragment = document.createDocumentFragment();
    for(let i = 0; i < sections.length; i++){
        let sectionName = sections[i].getAttribute('data-nav');
        let sectionId = sections[i].getAttribute('id');
        let listItem = document.createElement('li');
        listItem.innerHTML = `<a class='menu__link' href='#${sectionId}'>${sectionName}</a>`
        fragment.appendChild(listItem);
    }
    navBarList.appendChild(fragment);
}

// Add class 'active' to section when near top of viewport
function updateActiveState(){
    for (const section of sections){
        if (sectionIsInViewport(section)){
            if (!section.classList.contains('your-active-class')){
                section.classList.add('your-active-class');
            }
        } else {
            section.classList.remove('your-active-class');
        }
    }
}

// Scroll to anchor ID using scrollTO event
function scrollToSection(event){
    event.preventDefault();
    window.scroll({
        top: findTop(document.querySelector(event.target.getAttribute('href'))),
        left: 0,
        behavior: 'smooth'
      });
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNavBar();

// Scroll to section on link click
navBarList.addEventListener('click',scrollToSection);

// Set sections as active
window.addEventListener('scroll', updateActiveState);

