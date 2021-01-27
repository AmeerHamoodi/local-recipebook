import React from "react";
import HomeAppRender from "../../appRender/home.apprender";

const NewRecipe = props => {
    const click = () => {
        let data = {};
        let name = $("#recipeName").val();
        let desc = $("#recipeDescription").val();

        data.title = name;
        data.description = desc;
        HomeAppRender.newRecipe(props.pcRen, data);
        location.reload();
    }
    return (
        <div className="ui basic segment mt mb">
            <div className="ui icon header" style={{textAlign:"center"}}>
                New Recipe
            </div>
            <div className="inline">
                <div className="ui form">
                    <div className="field">
                        <label>Recipe name:</label>
                        <input type="text" id="recipeName" placeholder="Enter the recipe name" />
                    </div>
                    <div className="field">
                        <label>Recipe description :</label>
                        <input type="text" id="recipeDescription" placeholder="Enter the recipe description" />
                    </div>
                    <div className="ui button" onClick={click}>Create new recipe</div>
                </div>
            </div>
        </div>
    )
};

export default NewRecipe;