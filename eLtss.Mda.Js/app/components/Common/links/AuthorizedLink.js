import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import path from 'path';
import {getRoutePrefix} from "config";
import * as aclHelper from 'utils/aclHelper';

const AuthorizedLink = ({to, text, securityContext, resourceName, prefix, hasReadonlyAccess}) => {
  let routePrefix = getRoutePrefix(prefix);
  to.pathname = path.resolve(routePrefix, to.pathname);
  
  if (securityContext && resourceName && !aclHelper.canManage(securityContext, resourceName) && !hasReadonlyAccess) {
    return null;
  }
  return (
    <Link to={to} activeClassName="active">
      {text}
    </Link>
  );
};
AuthorizedLink.propTypes = {
  to: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  securityContext: PropTypes.object,
  resourceName: PropTypes.string,
  prefix: PropTypes.string
};
export default AuthorizedLink;
