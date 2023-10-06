import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardText, Button } from "reactstrap";

const PackageCard = ({ Package }) => {
  const [message, setMessage] = useState("");
  const handleDelete = async () => {
    const response = await fetch("/package/deletePackage/" + Package._id, {
      method: "DELETE",
    });
    const data = await response.json();
    if (response.ok) {
      window.location.reload();
    } else {
      setMessage(data.message);
    }
  };

  const handleEdit = async () => {
    const response = await fetch("/package/updatePackage/" + Package._id, {
      method: "PATCH",
      body: JSON.stringify(Package),
    });
    const data = await response.json();
    if (response.ok) {
      window.location.reload();
    } else {
      setMessage(data.message);
    }
  };

  return (
    <Card
      className="text-center"
      style={{
        width: "18rem",
      }}
    >
      <CardHeader>{Package.Name}</CardHeader>
      <CardBody>
        <CardText>
          Price <small>(per year) L.E</small> : {Package.Price}
        </CardText>
        <CardText>
          Price <small>(per year) L.E</small> : {Package.Price}
        </CardText>
        <CardText>
          Price <small>(per year) L.E</small> : {Package.Price}
        </CardText>
        <Button
          onClick={handleEdit}
          color="primary"
          style={{ margin: "5px", width: "70%" }}
        >
          Edit
        </Button>
        <Button
          onClick={handleDelete}
          color="danger"
          style={{ margin: "5px", width: "70%" }}
        >
          Delete
        </Button>
        {message && <p>message</p>}
      </CardBody>
    </Card>
  );
};

export default PackageCard;
