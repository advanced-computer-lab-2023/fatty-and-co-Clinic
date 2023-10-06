import { useState, useEffect } from "react";

const PackageDashboard = () => {
  const [packages, setPackages] = useState(null);
  useEffect(() => {
    const fetchPackages = async () => {
      const response = await fetch("/package/packages");
      const data = await response.json();
      if (response.ok) {
        setPackages(data);
      }
    };
    fetchPackages();
  }, []);

  return (
    <div>
      {packages &&
        packages.map((Package) => <p key={Package._id}>{Package.Name}</p>)}
    </div>
  );
};

export default PackageDashboard;
