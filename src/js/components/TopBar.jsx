import React from "react";
import {Link} from "react-router-dom";

const TopBar = props => {
    $(".dropdown").dropdown();

    const change = () => {
        const data = $("#searchContent").val();

        props.searchState.changeState(data);

    }

    const exit = () => {
        props.pcRen.send("exit");
    }


    const rm = typeof props.page == "undefined" ? (
            <div className="right menu">
                <div className="ui right aligned category search item">
                    <div className="ui transparent icon input">
                        <input className="prompt" type="text" placeholder="Search recipes..." onKeyUp={change} id="searchContent"/>
                        <i className="search link icon"></i>
                    </div>
                    <div className="results"></div>
                </div>
            </div>
        ) : [];

    return (
        <div className="ui top attached menu">
            <div className="item">
                <img src="./imgs/logo-plain-blue-site.png" alt=""/>
            </div>
            <Link className="item" to="/">
                <i className="home icon"></i>
            </Link>
            <div className="ui dropdown icon item">
                <i className="wrench icon"></i>
                <div className="menu">
                    <div className="item" onClick={exit}>
                        Exit...
                    </div>
                    <div className="divider"></div>
                    <div className="header">
                        Export
                    </div>
                    <div className="item">
                        Share...
                    </div>
                </div>
            </div>
            {rm}
        </div>
    )
};

export default TopBar;