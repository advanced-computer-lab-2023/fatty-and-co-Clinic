import { PackageContextProvider } from "./components/Context";
import PackageI from "./index";

function Package2() {
  return (
    <PackageContextProvider>
      <PackageI />
    </PackageContextProvider>
  );
}

export default Package2;
