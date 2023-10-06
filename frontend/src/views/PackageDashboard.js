import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PackageCard from "../components/PackageCard";
import PackageForm from "../components/PackageForm";
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
    //show all packages
    <div>
      <h2>Package Dashboard</h2>
      <CardGroup style={{margin:"10px"}}>
        {packages &&
          packages.map((Package) => (
            <PackageCard key={Package._id} Package={Package} />
          ))}
      </CardGroup>
      <PackageForm />

    </div>
  );
};

export default PackageDashboard;
