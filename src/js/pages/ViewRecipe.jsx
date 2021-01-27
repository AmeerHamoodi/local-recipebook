import React, {useEffect, useState} from "react";
import Editor from "../components/viewRecipe/RecipeTextContent";
import TopBar from "../components/TopBar";
import State from "../observables/State";
import RecipeAppRender from "../appRender/recipe.apprender";

const editRecipeState = new State(true);

const ViewRecipe = (props) => {
    const [clickData, setClickData] = useState("Save the recipe and disable editor.");
    const [toEdit, setToEdit] = useState(true);
    const [recipeData, setRecipeData] = useState(0);

    const id = props.match.params.id;

    const click = () => {
        if(!editRecipeState.content) {
            setClickData("Save the recipe and disable editor.");
        } else {
            setClickData("Edit the recipe.");
            props.pcRen.send("save");
        }

        editRecipeState.changeState(!editRecipeState.content);
        setToEdit(editRecipeState.content);
    }

    useEffect(() => {
        $(".dropdown").dropdown();

        return () => {
            RecipeAppRender.recipeFetched = false;
        }
    });


    if(!RecipeAppRender.recipeFetched && !RecipeAppRender.recipeFetching) {
        RecipeAppRender.getRecipe(props.pcRen, id).then(result => {
            setRecipeData(result.recipe);
            console.log(result.recipe);
        })
    }

    return (
        <>
            <TopBar page="app"></TopBar>
            <h1 style={{textAlign: "center"}}>Recipe Name:</h1>
            <div className="ui button primary mb" onClick={click}>{clickData}</div>
            <Editor content={recipeData} pcRen={props.pcRen} toEdit={toEdit} contentId={id}></Editor>
        </>
    )
};

export default ViewRecipe;