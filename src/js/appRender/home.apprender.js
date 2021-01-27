const HomeAppRender = {
    recipesFetched: false,
    recipesFetching: false,
    getRecipes(pcRen) {
        return new Promise((resolve, reject) => {
            HomeAppRender.recipesFetching = true;
            pcRen.send("getRecipes");

            pcRen.on("recipes", (eve, args) => {
                console.log(args);
                resolve(args);
                HomeAppRender.recipesFetched = true;
                HomeAppRender.recipesFetching = false;
            })
        })
    },
    newRecipe(pcRen, params) {
        pcRen.send("newRecipe", params);
    },
    deleteRecipe(pcRen, id) {
        pcRen.send("deleteRecipe", id);
    }
};

export default HomeAppRender;