import React from "react";
import Recipe from "./Recipe";

const stringSimilarity  = require("string-similarity");

const classes = ["one", "two", "three"];

const Recipes = props => {
    let final = [];
    let count = 0;
    let temp = [];  
    let recipeArr = [];

    const recipes = props.recipes;

    recipes.forEach((recipe, i) => {
        if(props.searching) {
            if(stringSimilarity.compareTwoStrings(recipe.title, props.searchParam) >= 0.3 || stringSimilarity.compareTwoStrings(recipe.description, props.searchParam) >= 0.3) {
                recipeArr.push(<Recipe title={recipe.title} description={recipe.description} key={i} rid={recipe.id} pcRen={props.pcRen}></Recipe>);
            }
        } else {
            recipeArr.push(<Recipe title={recipe.title} description={recipe.description} key={i} rid={recipe.id} pcRen={props.pcRen}></Recipe>);
        }
        
    });

    recipeArr.forEach((item, i) => {
        count ++;
        temp.push(item);

        if(count == 3) {
            final.push(
                <div className="ui cards three column grid mt" key={i}>
                    {temp}
                </div>
            );
            temp = [];
            count = 0;
        }

        if(count < 3 && (i+1) == recipeArr.length) {
            final.push(
                <div className={`ui cards ${classes[count - 1]} column grid mt`}>
                    {temp}
                </div>
            )
        }
    });

    return final;
};

export default Recipes;