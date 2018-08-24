import React from 'react'

export default props => (
    <tr key='1'>
        <td className='text-center' colSpan={props.colSpan}><i className='fa fa-exclamation-triangle'></i> {props.msg} </td>
    </tr>
)