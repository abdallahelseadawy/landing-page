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
 * Define Global Variables
 * 
*/

const allSections = document.querySelectorAll('section');
const navigationMenu = document.querySelector('#navbar__list');
let allSectionsArray = Array.from(allSections);

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

//Boolean function to determine if a section is into ViewPort or not
function isSectionInViewPort(section) {
    const clientRectangle = section.getBoundingClientRect();
    //checking on top of the section to handle the responsive layout of different devices  
    if (clientRectangle.top >= -100 && clientRectangle.top <= 300) 
        return true;
    else
        return false;
  }

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildingNavMenu() {
    //Using  Document Fragment to enhance the perfomance
    const fragment = document.createDocumentFragment();
    for (let i=0; i<allSections.length; i++){
        //Creating hyperlinks
        const hyperLink = document.createElement('a');      
        hyperLink.innerText = allSections[i].getAttribute('data-nav'); 
        hyperLink.setAttribute('class', 'menu__link');

        //Creating List Items
        const listItem = document.createElement('li'); 

        //Appending the hyperLink to the List Item
        listItem.appendChild(hyperLink);
        
        //Appending the listItem to the fragment
        fragment.appendChild(listItem);
    }
    //Adding all the links to the navigation unordered list
    navigationMenu.appendChild(fragment);
}


// Add class 'my-active-class' to section when in viewport
function activateSectionClass(){
    for (let i=0; i<allSections.length; i++){
        //calling the helper function to check if the section is in the viewport or not
        if (isSectionInViewPort(allSectionsArray[i])){
            //adding the class
            allSectionsArray[i].classList.add("my-active-class");
            // Highlighting the navigation menu item
            navigationMenu.getElementsByClassName("menu__link")[i].classList.add("my-active-class");
        }else{
            //removing the class
            allSectionsArray[i].classList.remove("my-active-class");
            // Removing the highlight of the navigation menu item
            navigationMenu.getElementsByClassName("menu__link")[i].classList.remove("my-active-class");
        }
    }
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildingNavMenu();

// Scroll to section on link click
for (let i=0; i<allSectionsArray.length; i++){
    //Retreiving hyperlinks
    const hyperLink = document.getElementsByTagName('a');      
    //Listenning to the link click in order to navigate to the required section
    hyperLink[i].addEventListener("click", function() {
        allSectionsArray[i].scrollIntoView(
            {  
                behavior: "smooth" //friendly than auto
            }
        );
    });
}

// Set sections as active
document.addEventListener('scroll', activateSectionClass);
