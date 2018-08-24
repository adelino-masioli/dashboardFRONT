import React from "react";

export default props => (
  <li className={props.active}>
    { props.active === 'active' ?
      props.label
    :
      <a href={props.path}>
        <i className={`fa fa-${props.icon}`}></i> {props.label}
      </a>
    }
  </li>
);
