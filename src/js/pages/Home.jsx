import React, {useState, useEffect} from "react";
import {autorun} from "mobx";

import Recipes from "../components/home/Recipes";
import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";
import NewRecipe from "../components/home/NewRecipe";

import State from "../observables/State";

import HomeAppRender from "../appRender/home.apprender";

const SearchState = new State("");

let last = 0;

const Home = ({pcRen}) => {
    const [data, setData] = useState([]); 
    const [searching, setSearching] = useState(false);
    const [searchingData, setSearchingData] = useState({});

    if(!HomeAppRender.recipesFetched && !HomeAppRender.recipesFetching) {
        HomeAppRender.getRecipes(pcRen).then(res => {
            console.log(res);
            setData(res);
        })
    }

    autorun(() => {
        if(SearchState.content !== "" && last !== SearchState.actual) {
            setSearching(true);
            setSearchingData(SearchState.content);
            last = SearchState.actual;
        } else if(SearchState.content == "" && last !== SearchState.actual) {
            setSearching(false);
            last = SearchState.actual;
        }
    });

    useEffect(() => {
        return () => {
            HomeAppRender.recipesFetched = false;
        }
    })

    return (
        <>
            <TopBar searchState={SearchState} pcRen={pcRen}></TopBar>
            <div className="ui container">
                <Recipes recipes={data} searching={searching} searchParam={searchingData} pcRen={pcRen}></Recipes>
                <NewRecipe pcRen={pcRen}></NewRecipe>
            </div>
            <BottomBar page="home"></BottomBar>
        </>
    )
};

export default Home;