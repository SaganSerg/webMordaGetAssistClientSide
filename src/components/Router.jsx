import WrapperPage from './WrapperPage';
import Pages from "./Pages";
import { Routes, Route } from "react-router";
function Router() {
  return (
    <>
      <Routes>
      {Pages.map((route, i) => (
        <Route 
          key={i}
          path={route.path} 
          element={<WrapperPage children={route.element} pageParams={route}/>}
        />
      ))}
    </Routes>
    </>
  );
}
export default Router;
