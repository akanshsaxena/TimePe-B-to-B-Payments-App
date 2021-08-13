import "./styles.css";
import AuthCheck from "./screens/AuthCheck";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import WelcomeAboard from "./screens/WelcomeAboard";
import { useEffect } from "react";
export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <AuthCheck />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/welcome-aboard">
            <WelcomeAboard />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/redirection">
            <Redirection />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

function Redirection() {
  const history = useHistory();
  useEffect(() => {
    history.push("/");
  }, []);
  return <></>;
}
