import React from 'react';

function News(props) {
    return (
        <div className="news__item">
            <div>
                {props.item.date}
            </div>
            <a target="_blank" rel="noopener noreferrer" className="news__item_link" href={props.item.url}>{props.item.title}</a>
        </div>
    );
}

export default News;