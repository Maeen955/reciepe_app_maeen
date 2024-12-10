const btn = document.getElementById("btn")
const input = document.getElementById("input")
const result = document.getElementById("result")
const closeBtn = document.getElementById("closeBtn")
const recipeDetailsContent = document.getElementById("recipeDetailsContent")


btn.addEventListener("click", (e) => {
    e.preventDefault();
    fetchRecipe(input.value.trim())
   
    input.value = ""
})

async function fetchRecipe(recipe) {
    result.innerHTML = `<h2>Fetching recipes..</h2>`
    try {
        
        const url = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`);
        const data = await url.json();
        result.innerHTML = ""
        data.meals.forEach(meal => {
            const div = document.createElement("div")
            div.classList.add("ree")
            div.innerHTML = `<div class="re"> 
            <img src="${meal.strMealThumb}" width:100%>
            
            <h1>${meal.strMeal}</h1>
            <h2>${meal.strArea} Dish</h2>
            <h3>Belongs to <span>${meal.strCategory}<span></h3>
            
            </div>`
            result.appendChild(div)
            const button = document.createElement('button');
            button.classList.add("viewBtn")
            button.textContent = `View Recipe`;
            div.appendChild(button)
            button.addEventListener('click', () => {
                // Do something with the specific meal, like fetching its recipe
                openPopup(meal);
            });

 const fetchIngredients = (meal) => {
   let IngredientLists = "";
   for(let i = 1; i < 20; i++){
    let Ingredient = meal[`strIngredient${i}`];
    if(Ingredient){
        let measure = meal[`strMeasure${i}`];
        IngredientLists += `<li>${measure} ${Ingredient}</li>`
    }else{
        break
    }
   }
   return IngredientLists;
 }


            const openPopup = (meal) => {
                recipeDetailsContent.innerHTML = `
                <h2>${meal.strMeal}</h2>
                <h3>Ingredients:</h3>
                <ul>${fetchIngredients(meal)}</ul>
                <h3>Instractions:</h3>
                <p>${meal.strInstructions}</p>
                `

     recipeDetailsContent.parentElement.style.display = "block"
            }
    closeBtn.addEventListener("click", ()=>{
        removePop();
    })

    const removePop = ()=>{
        recipeDetailsContent.parentElement.style.display = "none"

    }


        });


    }
    catch (error) {
        result.innerHTML = `<h2>Type the recipe name accurately</h2>
`
    }
}

