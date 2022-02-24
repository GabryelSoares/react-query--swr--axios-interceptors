import { Route, Routes } from "react-router-dom";
import { Repo } from "./pages/Repo";
import { Repos } from "./pages/Repos";


export const App = () => {
  return(
    <Routes>
      <Route path="/repo/*" element={<Repo />} />
      <Route path="/repos/" element={<Repos />} />
    </Routes>
  );
}

