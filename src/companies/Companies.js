import React, { useState, useEffect } from "react";
//import SearchForm from "../common/SearchForm";
import JoblyApi from "../api/api";
import CompanyCard from "./CompanyCard";
//import { useParams } from "react-router-dom";
//import LoadingSpinner from "../common/LoadingSpinner";

/** Show page with list of companies.
 *cd 
 * On mount, loads companies from API.
 * Re-loads filtered companies on submit from search form.
 *
 * This is routed to at /companies
 *
 * Routes -> { CompanyCard, SearchForm }
 */

function Companies() {
  //console.debug("Companies");

  //const [isLoading, setIsLoading] = useState(true);
  
  let [companies, setCompanies] = useState(null);
  

  useEffect(() => {
    async function getCompanyJobs() {

  /** Triggered by search form submit; reloads companies. */
 
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
