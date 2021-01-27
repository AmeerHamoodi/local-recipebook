const RecipeAppRender = {
    recipeFetched: false,
    recipeFetching: false,
    getRecipe(pcRen, id) {
        RecipeAppRender.recipeFetching = true;
        pcRen.send("getRecipeById", id);

        return new Promise((resolve, reject) => {
            pcRen.on("recipe", (ev, args) => {
                resolve(args);
                RecipeAppRender.recipeFetching = false;
                RecipeAppRender.recipeFetched = true;
            });
        })
    }
};

export default RecipeAppRender;