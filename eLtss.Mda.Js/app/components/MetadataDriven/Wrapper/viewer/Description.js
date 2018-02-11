import React, {PropTypes} from 'react';

class Description extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {item, name} = this.props;
    return (
      <span className="label-info" style={item.Styles}>
        {item.Description}
        {item.HyperLink && item.HyperLink.Type === 'AdditionalDisplayName' && <a href={item.HyperLink.Href} target='_blank'>{item.HyperLink.Text}
        </a>
}
      </span>
    );
  }
}

Description.propTypes = {
  name: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired
};

export default Description;
