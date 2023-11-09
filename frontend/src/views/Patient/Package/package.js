import { PackageContextProvider } from "./components/Context";
import PackageI from "./index";

function Package() {
  return (
    <PackageContextProvider>
      <PackageI />
    </PackageContextProvider>
  );
}

export default Package;
