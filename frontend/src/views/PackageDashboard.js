import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PackageCard from "../components/PackageDashboard/PackageCard";
import PackageForm from "../components/PackageDashboard/PackageForm";
import { CardGroup } from "reactstrap";

const PackageDashboard = () => {
  const [packages, setPackages] = useState(null);
  useEffect(() => {
    const fetchPackages = async () => {
      const response = await fetch("/package/packages");
      const data = await response.json();
      if (response.ok) {
        setPackages(data);
      } else {
        console.log(data);
      }
    };
    fetchPackages();
  }, []);

  return (
    <div>
      <h2>Package Dashboard</h2>
      {/** view packages */}
      <CardGroup style={{ margin: "10px" }}>
        {packages &&
          packages.map((Package) => (
            <PackageCard key={Package._id} Package={Package} />
          ))}
      </CardGroup>
      {/* add packages */}
      <PackageForm />
    </div>
  );
};

export default PackageDashboard;
