import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api/api";
import JobCardList from "../jobs/JobCardList";


function Company() {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function getCompanyAndJobs() {
      let company = await JoblyApi.getCompany(handle);
      setCompany(company);
    }

    getCompanyAndJobs();
  }, [handle]);

  if (!company) return <p> Loading ... </p>;

  return (
      <div className="Company col-md-8 offset-md-2">
        <h4>{company.name}</h4>
        <p>{company.description}</p>
        <JobCardList jobs={company.jobs} />
      </div>
  );
}

export default Company;
