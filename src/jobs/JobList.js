import React, { Component } from 'react';
import Search from "./Search";
import JoblyApi from "../api/api";
import JobCard from "./JobCard";

class JobList extends Component {


  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      loading: true,
    }
    this.handleJobSearch = this.handleJobSearch.bind(this);
  }

  async componentDidMount() {

        let jobs = await JoblyApi.getJobs();
        this.setState({ jobs, loading: false })
      }

  async handleJobSearch(searchTerms) {
    this.setState({ loading: true }, async function () {
      let jobs = await JoblyApi.getJobs(searchTerms);
      this.setState({ jobs, loading: false });
    })
  }

  render() {
    if (this.state.loading === true) {
      return <p>Loading...</p>
    }

    const jobs = this.state.jobs.map(job =>
      <JobCard
        equity={job.equity}
        salary={job.salary}
        title={job.title}
        id={job.id}
        key={job.id} />);

    return (
      <div>
        <Search searchFor="jobs"
          searchJobs={this.handleJobSearch} />
        {jobs}
      </div>
    );
  }
}

export default JobList;