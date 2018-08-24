import React, {Component} from 'react';

class TableHead extends Component {
  constructor(props) {
    super(props);
	}
  render() {
    let headerTitle = this.props.headerTitle;
    let head = headerTitle.map((res, index) =>
        <th className='text-center' key={index}>{res}</th>
    );
    return <tr>{head}</tr>;
    }
}
export default TableHead;
