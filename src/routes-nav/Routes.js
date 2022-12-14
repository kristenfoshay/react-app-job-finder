import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import Companies from "../companies/Companies";
import JobList from "../jobs/JobList";
import Company from "../companies/Company";
import LoginForm from "../auth/LoginForm";
import ProfileForm from "../profiles/ProfileForm";
import SignupForm from "../auth/SignupForm";

function Routes({ login, signup }) {

  return (
      <div className="pt-5">
        <Switch>

          <Route exact path="/">
            <Homepage />
          </Route>

          <Route exact path="/login">
            <LoginForm login={login} />
          </Route>

          <Route exact path="/signup">
            <SignupForm signup={signup} />
          </Route>

          <Route exact path="/companies">
            <Companies />
          </Route>

          <Route exact path="/jobs">
            <JobList />
          </Route>

          <Route exact path="/companies/:handle">
            <Company/>
          </Route>

          <Route path="/profile">
            <ProfileForm />
          </Route>

          <Redirect to="/" />
        </Switch>
      </div>
  );
}

export default Routes;
