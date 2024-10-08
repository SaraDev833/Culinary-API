const searchButton = document.querySelector(".searchButton");
const searchBox = document.querySelector(".searchBox");
const foodContainer = document.querySelector(".main-food-container");
const recipeDetail = document.querySelector(".recipe-details");
const closeButton = document.querySelector(".closeButton");
const recipeDetailContainer = document.querySelector(
    ".recipe-detail-container"
);

searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput);
});
const fetchRecipes = async function fetchRecipes(value) {
    foodContainer.innerHTML = "<h2>Fetching Recipe...</h2>";
    try {
        const data = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`
        );
        const response = await data.json();

        foodContainer.innerHTML = "";
        response.meals.forEach((meal) => {
            const divRecipe = document.createElement("div");
            divRecipe.classList.add("recipe");
            divRecipe.innerHTML = `
        <img src="${meal.strMealThumb}" alt="" class='receipeImg'>
        <div class="text"> 
         <h3 class='recipeName'>${meal.strMeal}</h3>
         <p class='recipeArea'>${meal.strArea} Dish</P>
         <p class='recipeDetail'>Belongs to ${meal.strCategory} Category</p>
         </div>
        
        `;
            const button = document.createElement("button");
            button.classList.add("viewRecipe");
            button.textContent = "View Recipe";
            divRecipe.appendChild(button);
            foodContainer.appendChild(divRecipe);
            button.addEventListener("click", () => {
                openPopUp(meal);
            });
        });
    } catch (error) {
        foodContainer.innerHTML = "<h2>Please try another recipe..</h2>";
    }
};

function fetchIngredients(meal) {
    let ingredientList = "";
    for (i = 1; i <= 20; i++) {
        const ingredients = meal[`strIngredient${i}`];
        if (ingredients) {
            const measure = meal[`strMeasure${i}`];
            ingredientList += ingredientList.innerHTML = `
                  <li> ${measure} ${ingredients} </li>
            `;
        } else {
            break;
        }
    }
    return ingredientList;
}

function openPopUp(meal) {
    recipeDetailContainer.innerHTML = `
             <h2>${meal.strMeal}</h2>
             <p> Ingrident :</p>
            <ul>${fetchIngredients(meal)}</ul>
            <div class="instruction"><span>Instruction: <br> </span> ${meal.strInstructions
        } </div>
      
      `;

    recipeDetail.style.display = "block";
    closeButton.addEventListener("click", () => {
        recipeDetail.style.display = "none";
    });
}


