const searchForm=document.querySelector('form');
const searchResultDiv=document.querySelector('.search-result');
const container =document.querySelector('.container');
let searchQuery='';
const APP_ID ='458eb5a3';
const APP_KEY = '6ab26dd27196b6bfb9e202fc5b74d849';


searchForm.addEventListener('submit',(e) =>{
	e.preventDefault();
	searchQuery = e.target.querySelector('input').value;
	fetchAPI();
});
async function fetchAPI(){
const baseURL= `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=21`;
const response = await fetch(baseURL);
const data= await response.json();
generateHTML(data.hits); 
console.log(data);
}
function generateHTML(results){
	let generatedHTML='';
	results.map(result => {
		container.classList.remove('initial');
		generatedHTML+=
		`<div class="item">
					<img src="${result.recipe.image}">
					<div class="flex-container">
						<h1 class="title">${result.recipe.label}</h1>
						<a href="#" class="view-button">View Recipe</a>

					</div>
					<p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
					<p class="item-data">Meal Type: ${result.recipe.mealType}</p>
					<p class="item-data">Cuisine Type: ${result.recipe.cuisineType}</p>

				</div>`
	})
	searchResultDiv.innerHTML=generatedHTML;
}
