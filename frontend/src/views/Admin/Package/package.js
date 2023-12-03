import { PackageContextProvider } from "./components/Context";
import PackageI from "./index";

function MyPackage() {
  return (
    <PackageContextProvider>
      <PackageI />
    </PackageContextProvider>
  );
}

export default MyPackage;
