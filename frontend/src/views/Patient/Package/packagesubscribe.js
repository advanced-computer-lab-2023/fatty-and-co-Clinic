import { PackageContextProvider } from "./components/Context";
import PackageI from "./index";

function Packagesubscibe() {
  return (
    <PackageContextProvider>
      <PackageI />
    </PackageContextProvider>
  );
}

export default Packagesubscibe;
