import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import path from 'path';
// import {permissionChecker} from './../../core/permissions/permissionChecker';

const AuthorizedLinkLtss = ({to, text}) => {
  const host = "http://localhost:19010/";
  to.pathname = path.resolve(host, to.pathname);

  AuthorizedLinkLtss.propTypes = {
    to: PropTypes.object.isRequired,
    text: PropTypes.string.isRequired
  };

  return (
    <Link to={to} activeClassName="active">{text}</Link>
  );
};

export default AuthorizedLinkLtss;
