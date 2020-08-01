import React from 'react';
import { withRouter } from 'react-router-dom';
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";

const PhotoContainer = ({
    photos,
    tag,
    searching
}) => {

    // Bonus 1: Uses the react-spinners library to display a loading icon while searching for photos:
    // Bonues 2: If there no results, display a friendly user message that there were no matches:
    return (
        <div className='photo-container'>
            <h2>{tag}</h2>
            {
                searching ? 
                    <PulseLoader
                        size={100}
                        color={"#275270"}
                        loading={true}
                    /> :
                photos.length > 0 ?
                    <ul>
                    {
                        photos.map((photo, i) =>
                            <li key={i} >
                                <img
                                    src={photo.url_n}
                                />
                            </li>
                        )
                    }
                    </ul> :
                    <>
                        <h2>No results found</h2>
                        <p>That search did not return any results, please try again.</p>
                    </>
            }
        </div>
    );
}

export default withRouter(PhotoContainer);