import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "../components/Main";
import Articles from "../components/Articles";
import Words from "../components/Words";
import NotFound from "../components/NotFound";
import { SearchContext } from "../context/searchContext";

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: "",
      article: "",
    };
  }

  render() {
    return (
      <BrowserRouter>
        <SearchContext.Provider>
          <Switch>
            <Route path="/" component={Main} exact={true} />
            <Route path="/articles" component={Articles} />
            <Route path="/words" component={Words} />
            <Route component={NotFound} />
          </Switch>
        </SearchContext.Provider>
      </BrowserRouter>
    );
  }
}

export default AppRouter;
