import React from 'react';
import { browserHistory, Link} from 'react-router';
import Grid from '../layout/layoutGrid';

export default props => (
	<Grid cols={props.cols}>
		<div className={`small-box bg-${props.color}`}>
			<div className='inner'>
				<h3>{props.value}</h3>
				<p>{props.text}</p>
			</div>
			<div className='icon'>
				<i className={`fa fa-${props.icon}`}></i>
			</div>
			<Link to={props.url} className='small-box-footer'>More info  <i className='fa fa-arrow-circle-right'></i> </Link>
		</div>
	</Grid>
);