import React, { useState, useEffect } from "react";

import JoblyApi from "../api/api";
import CompanyCard from "./CompanyCard";


function Companies() {
  let [companies, setCompanies] = useState(null);
  

  useEffect(() => {
    async function getCompanyJobs() {
 
    let companies = await JoblyApi.getCompanies();
    setCompanies(companies);
  }
  getCompanyJobs();  
}, []);

  if (!companies) return <p> Loading ...</p>;

  return (
      <div className="Companies col-md-8 offset-md-2">
        {/* <SearchForm searchFor={search} /> */}
        {companies.length
            ? (
                <div className="Companies-list">
                  {companies.map(c => (
                      <CompanyCard
                          key={c.handle}
                          handle={c.handle}
                          name={c.name}
                          description={c.description}
                          logoUrl={c.logoUrl}
                      />
                  ))}
                </div>
            ) : (
                <p className="lead">Sorry, no results were found!</p>
            )}
      </div>
  );
}

export default Companies;
