const Store = require("electron-store");
const store = new Store();

class Recipe {
    constructor(params) {
        this.title = params.title;
        this.description = params.description;
        this.recipe = "";
        this.id = Math.random().toString(36).slice(2);
    }
}

class Storage {
    constructor() {
        this.db = null;
        this._init();
    }
    _init() {
        const data = store.get("recipeDB");

        if (typeof data == "undefined") {
            const objectData = {
                recipes: []
            };
            store.set("recipeDB", JSON.stringify(objectData));
        } else {
            this.db = JSON.parse(data);
        }
    }
    saveAll() {
        store.set("recipeDB", JSON.stringify(this.db));
    }
    getRecipes() {
        return this.db.recipes;
    }
    getDate() {
        let date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        let stringed = `${month}/${day}/${year}`;

        return stringed;
    }
    generateId() {
        let id = Math.random().toString(36).slice(2);

        return id;
    }
    newRecipe(data) {
        this.db.recipes.push(new Recipe(data));
        this.saveAll();
    }
    getRecipeById(id) {
        return this.db.recipes.find(item => item.id == id);
    }
    updateRecipe(id, content) {
        const recipe = this.getRecipeById(id);
        const i = this.db.recipes.indexOf(recipe);
        this.db.recipes[i].recipe = content;
        console.log(JSON.stringify(this.db.recipes[i]));

        this.saveAll();
    }
    deleteRecipe(id) {
        const recipe = this.getRecipeById(id);
        const i = this.db.recipes.indexOf(recipe);

        this.db.recipes.splice(i, 1);

        this.saveAll();
    }
}

module.exports = Storage;