import { Route, Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginRoute from "./components/LoginRoute";
import AllNotes from "./components/AllNotes";
import RegisterRoute from "./components/RegisterRoute";
import CreateNote from "./components/CreateNote";

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginRoute} />
    <Route exact path="/register" component={RegisterRoute} />
    <ProtectedRoute exact path="/" component={AllNotes} />
    <ProtectedRoute exact path="/createNote" component={CreateNote} />
    <Redirect to="/login" />
  </Switch>
);

export default App;
