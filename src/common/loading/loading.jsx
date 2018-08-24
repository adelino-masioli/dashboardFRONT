import React, {Component} from 'react';

class LoadingPage extends Component {
    render() {
        return (
        <div className={`preload ${this.props.isActive===false ? 'preload-out' : ''}`}>
          <span>
            <img src={require('./../../assets/brand.png')} alt=""/>
          </span>
        </div>
        )
    }
}
export default LoadingPage;