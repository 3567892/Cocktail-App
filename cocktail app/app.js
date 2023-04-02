const result = document.getElementById('result');
const searchButton= document.getElementById('search-button');
const url = "https://thecocktaildb.com/api/json/v1/1/search.php?s=";
let data;
const getInfo = () => {
    const userInput = document.getElementById('user-input').value.trim();
    console.log(data);
    if (!userInput){
        result.innerHTML = `<h3 class="msg">The input field cannot be empty</h3>`;
        return;
    }
    else{
        fetch(url+userInput)
        .then((response => response.json()))
        .then((data) => {
            document.getElementById('user-input').value=" ";
const myDrink = data.drinks[0];
 let count =1;
       let ingredients = [];
       for (let i in myDrink) {
        let ingredient = "";
        let measure = "";
        if(i.startsWith('strIngredient') && myDrink[i]){
            ingredient = myDrink[i];
            if(myDrink[`strMeasure` + count ]){
                measure=myDrink[`strMeasure` + count ];
            }
            else{
                measure=""
            }
            count += 1;
            ingredients.push(`${measure} ${ingredient}`);
        }
       }

result.innerHTML = `
      <img src=${myDrink.strDrinkThumb}>
      <h2>${myDrink.strDrink}</h2>
      <h3>Ingredients:</h3>
      <ul class="ingredients"></ul>
      <h3>Instructions:</h3>
      <p>${myDrink.strInstructions}</p>
      `;
      let ingredientsCon = document.querySelector(".ingredients");
        ingredients.forEach((item) => {
          let listItem = document.createElement("li");
          listItem.innerText = item;
          ingredientsCon.appendChild(listItem);
        });
    })
    .catch(() => {
      result.innerHTML = `<h3 class="msg">Please enter a valid input</h3>`;
    });
    }
};
window.addEventListener("load", getInfo);
searchButton.addEventListener("click", getInfo);