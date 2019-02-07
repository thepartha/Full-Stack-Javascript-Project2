/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Get main list form DOM
const mainList = document.querySelector('.student-list');
const pageDiv = document.querySelector('.page');
const li = mainList.children;

// Create pagination elements 
const paginationDiv = document.createElement('div');
paginationDiv.className = "pagination";
const paginationUL = document.createElement('ul');
let currentPage = 1;


//Showpage function to hide all the list elements and show them 10 at a time.
function showPage(pageNum,list) { 
   const li = list.children;
   const numOfPages = Math.ceil(li.length / 10); // Generate number of pages for the given list.
   currentPage = pageNum; // Store page number
   for (let i = 0; i < li.length ; i ++){  // Hide all the list elements
      li[i].style.display = "none";
   } 
   for (let i = pageNum * 10 - 10; i < pageNum * 10 ; i ++){  //Display 10 elements based on the pagenumber
      if (li[i]){
      li[i].style.display = "block";
      }
   }
   removeButtons(); // Remove current pagination buttons 
   if (numOfPages > 1) { //Create pagination buttons 
   appendPageLinks(list,numOfPages);
   }
}
showPage(currentPage, mainList); 



//Create buttons for pagination
function appendPageLinks(currentList, numOfPages){   
for (let i = 1; i < numOfPages + 1; i++) { 
   const li = document.createElement('li');
   li.setAttribute("id", "pagination-buttons");
   if (currentPage == i) { //Set page number class to Active for the current page
      li.innerHTML = `<a href='#' class='active'>${i}</a> `;
      li.addEventListener('click',function(){
         showPage(i,currentList);
      });       
   } else { 
      li.innerHTML = `<a href='#'>${i}</a> `;
      li.addEventListener('click',function(){
         showPage(i,currentList);
      }); 
    
   }
   paginationUL.appendChild(li);  // Add pagniation buttons to Pagination List
}
paginationDiv.appendChild(paginationUL) 
pageDiv.appendChild(paginationDiv); // Add pagination to the page
}


//Remove all buttons on the page 
function removeButtons() {
   let li = document.querySelectorAll("#pagination-buttons");
   if (li.length > 0) {
   for (let i = 0; i < li.length ; i++) { 
      li[i].parentNode.removeChild(li[i]);
   }
   }
}



//create and add search elemnts to main page div 
 const searchDiv = document.createElement('div');
 searchDiv.className = "student-search"

 const searchText = document.createElement('input');
 searchText.placeholder = "Search for students...";
 searchDiv.appendChild(searchText);

 const searchButton = document.createElement('button');
 const txt = document.createTextNode("Search");
 searchButton.appendChild(txt);
 searchDiv.appendChild(searchButton);
 
 const searchHeader = document.querySelector('.page-header');
 searchHeader.appendChild(searchDiv);
  
  


//Create Search list to store search results 
let searchResults = document.createElement('ul');
searchResults.className = "student-list";

//Create paragraph element to show No Results Found
let noResultsFound = document.createElement('p');
noResultsFound.innerHTML = "No Matching Results Found";
pageDiv.appendChild(noResultsFound);
noResultsFound.style.display = "none";



//Event Listeners for text field and search button 
 searchButton.addEventListener('click', search);
 searchText.addEventListener('keyup', search); 


//Search function  
function search() {
   
   //Hide main list and reset all the search results from previous search if any.
   noResultsFound.style.display = "none";
   mainList.style.display = "none";
   searchResults.innerHTML = '';
   
   // Get entered search string from DOM
   const searchString = searchText.value; 
   if (searchString){ // If a search string has been entered
      pageDiv.appendChild(searchResults);
         createSearchResults(function() { 
            for (let i = 0; i < li.length ; i ++){             
            if (li[i].innerText.search(searchString) > -1) { //search each list item for matching string 
               searchResults.appendChild(li[i].cloneNode(true)); //Clone element from the main list and append to Search list 
              li[i].style.display = "none"; 
                } else {
               li[i].style.display = "none";               
               }               
            }

         });                  
              
   } else { //If no search string entered
      noResultsFound.style.display = "none";  //Show no reuslts found
      searchResults.innerHTML = ''; //Clear search results
      mainList.style.display = "block"; // Toggle display back on the main list
      showPage(1, mainList); // Call showpage to paginate        
   }
}


 function createSearchResults(callback) { //Callback function to make sure the search results are fully generated
   callback();
   if (searchResults.children.length <= 0 ) { // If no results found, show No Results found message
      noResultsFound.style.display = "block";
   }
   showPage(1, searchResults); //Show page with search results
  
 }
 




