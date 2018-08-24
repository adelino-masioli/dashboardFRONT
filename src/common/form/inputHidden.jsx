import React from 'react';
import Grid from '../layout/layoutGrid';

export default props => (   
	<input {...props.input} className='form-control'
		readOnly={props.readOnly} type={props.type}		
		maxLength={props.maxlength} />
);