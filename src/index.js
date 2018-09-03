import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSerach from 'youtube-api-search';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = { videos: [] };

        YTSerach({key: process.env.YOUTUBE_API_KEY, term: 'dota2'}, videos => {
            this.setState({ videos });
        });
    }

    render() {
        return (
            <div>
                <SearchBar />
                <VideoList videos={this.state.videos} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));