import "./App.css";
import User from "./pages/User";
import { ApolloProvider } from "@apollo/client/react";
import client from "./config/grapql";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <User />
      </div>
    </ApolloProvider>
  );
}

export default App;
