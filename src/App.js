import React, { useState, useEffect } from 'react';
import { Switch, NavLink, withRouter, useHistory, Route, Redirect } from 'react-router-dom';
import config from './config';
import axios from 'axios';
import { Container } from 'reactstrap';

//Components:
import PropsRoute from './components/PropsRoute';
import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import PhotoContainer from './components/PhotoContainer';
import NotFound from './components/NotFound';

const App = () => {

    const history = useHistory();
    const [apiCallFinished, setApiCallFinished] = useState(false);
    const [searchFor, setSearchFor] = useState('');
    const [searchTag, setSearchTag] = useState('');
    const [searching, setSearching] = useState(false);
    const [searchPhotos, setSearchPhotos] = useState([]);

    //Function to get photos from flickr
    const flickrApiCall = (tag) => {
        return axios
            .get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${config.apiKey}&tags=${tag}&per_page=24&format=json&nojsoncallback=1&extras=url_n`)
            .then(response => {
                return response.data.photos && response.data.photos.photo;
            }).catch(error => {
                console.log(error);
            });
    }

    // Array of JSON data for the 3 NavLink routes:
    const [routesData, setRoutesData] = useState([
        {
            path: '/callOfDuty',
            tag: 'Call of Duty',
            photos: []
        },
        {
            path: '/assassinsCreed',
            tag: `Assassin's Creed`,
            photos: []
        },
        {
            path: '/godOfWar',
            tag: `God of War`,
            photos: []
        }
    ]);

    //On page startup, get the data for the 3 nav route components:
    useEffect(() => {

        const promises = [];

        for (let i = 0; i < routesData.length; i++) {
            const { tag } = routesData[i];
            promises.push(
                flickrApiCall(tag)
                    .then(photos => routesData[i].photos = photos)
            )
        }

        Promise.all(promises).then(() => {
            setApiCallFinished(true);
        });

    }, []);

    //Function to search for photos, update the route, and display the photos in the PhotoContainer:
    const handleSearch = (e) => {
        e.preventDefault();
        setSearching(true);
        const path = `/search/${searchFor}`;
        history.push(path);

        flickrApiCall(searchFor)
            .then(photos => {
                setSearchPhotos(photos)
                setSearchTag(searchFor);
                setSearching(false);
            });
    }

    return (
        <div className="App">
            <Container>
                <SearchForm 
                    searchFor={searchFor}
                    setSearchFor={setSearchFor}
                    handleSearch={handleSearch}
                />
                <Nav 
                    apiCallFinished={apiCallFinished}
                    routesData={routesData}
                />
                {/* Note: BrowserRouter component was used in index.js to wrap around the main App to get useHistory() to work: */}
                <Switch>
                    <Route exact path='/'>
                        <Redirect to='/callOfDuty' />
                    </Route>
                    {
                        routesData.map((route, i) => 
                            <PropsRoute 
                                path={route.path}
                                component={PhotoContainer}
                                photos={route.photos}
                                tag={route.tag}
                                key={i}
                            />
                        )
                    }
                    <PropsRoute 
                        path={'/search/:searchFor'}
                        component={PhotoContainer}
                        photos={searchPhotos}
                        tag={searchTag}
                        searching={searching}
                    />
                    {/* Bonus 3: Not found component to handle unsupported routes: */}
                    <NotFound />
                </Switch>
            </Container>
        </div>
    );
}

export default withRouter(App);
