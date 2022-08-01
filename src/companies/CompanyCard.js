import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./CompanyCard.css";


 const DEFAULT_LOGO = 'https://png.pngtree.com/svg/20170307/the_company_default_logo_574534.png';

 class CompanyCard extends Component {
  render() {
    const { name, description, logo_url, handle } = this.props;

  return (
      <Link className="CompanyCard card" to={`/companies/${handle}`}>
      <div className="companyCard">
        <div className="companyCard-name">
            <h3>{name}</h3>
          </div>
          <div className="companyCard-description">
            {description}
          </div>
          <div className="companyCard-logo">
            <img style={{ maxWidth: "100%", maxHeight: "100%" }}
              src={logo_url || DEFAULT_LOGO}
              alt={handle} />
          </div>
          </div>
      </Link>
  );
}
 }

export default CompanyCard;
