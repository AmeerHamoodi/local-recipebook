import React from "react";


const BottomBar = ({page}) => {
    const appVersion = window.require('electron').remote.app.getVersion();
    const classes = page == "home" ? "ui bottom fixed inverted menu" : "ui bottom inverted menu";
    return (
        <div className={classes}>
            <a href="" className="item">Built by: Al-Souftware</a>
            <a className="item" href="">Version: {appVersion}</a>
            <a className="item" href="https://github.com/AmeerHamoodi/Al-Notes#current-features">Features</a>
            <a className="item" href="https://github.com/AmeerHamoodi/al-notes/releases">Releases</a>
        </div>
    )
}

export default BottomBar;