import React from "react";
import {Link} from "react-router-dom";
import HomeAppRender from "../../appRender/home.apprender";

const Recipe = props => {

    const click = () => {
        if(confirm("Are you sure you want to delete this recipe, this cannot be reversed.")) {
            HomeAppRender.deleteRecipe(props.pcRen, props.rid);
            location.reload();
        }
    };

    return (
        <div className="ui card">
            <div className="content">
                <Link className="header" to={`/viewRecipe/${props.rid}`}>{props.title}</Link>
                <div className="description">
                    {props.description}
                </div>
                <Link className="ui bottom attached button" to={`/viewRecipe/${props.rid}`}>
                    <i className="add icon"></i>
                    Open
                </Link>
                <div className="ui bottom attached button" onClick={click}>
                    <i className="close icon"></i>
                    Delete
                </div>
            </div>
        </div>
    )
};

export default Recipe;