import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let {title, description, imgUrl, newsUrl, mode, author, date, source} = this.props
        return (
            <div className='my-3'>
                <div className="card" style={{backgroundColor: mode==='dark'?'#212529':'white'}}>
                    <img src={imgUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}<span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '77%', zIndex: 1}}>
                            {source}
                        </span></h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {!author?'Unkown':author} on {new Date(date).toLocaleString()}</small></p>
                        <a href={newsUrl} target='_blank' rel='noreferrer' className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
