import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardText,
  Button,
  Collapse,
} from "reactstrap";

const PackageCard = ({ Package }) => {
  // handle edit
  const [Name, setName] = useState(Package.Name);
  const [Price, setPrice] = useState(Package.Price);
  const [Session_Discount, setSession_Discount] = useState(
    Package.Session_Discount
  );
  const [Medicine_Discount, setMedicine_Discount] = useState(
    Package.Medicine_Discount
  );
  const [Family_Discount, setFamily_Discount] = useState(
    Package.Family_Discount
  );

  const [message, setMessage] = useState("");

  // handle delete
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

  // handle edit
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const handleEdit = async () => {
    const response = await fetch("/package/updatePackage/" + Package._id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name,
        Price,
        Session_Discount,
        Medicine_Discount,
        Family_Discount,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      window.location.reload();
    } else {
      setMessage(data.message);
    }
  };

  //end edit

  return (
    <Card
      className="text-center"
      style={{
        width: "18rem",
      }}
    >
      <CardHeader>{Package.Name}</CardHeader>
      <CardBody>
        <React.StrictMode>
          <Collapse isOpen={!isOpen} {...Package}>
            <CardText>
              Price <small>(per year)</small> : {Package.Price} L.E
            </CardText>
            <CardText>
              Session Discount : {Package.Session_Discount} <small>%</small>
            </CardText>
            <CardText>
              Medicine Discount : {Package.Medicine_Discount} <small>%</small>
            </CardText>
            <CardText>
              Family Discount : {Package.Family_Discount} <small>%</small>
            </CardText>
            <Button
              onClick={toggle}
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
          </Collapse>
          <Collapse isOpen={isOpen} {...Package}>
            <CardText>
              <input
                type="text"
                name="Name"
                id="NameEdit"
                required
                style={{ width: "80%", margin: "10px" }}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                // value={Package.Name}
              />
            </CardText>
            <CardText>
              <input
                type="number"
                name="Price"
                id="PriceEdit"
                required
                style={{ width: "80%", margin: "10px" }}
                placeholder="Price in L.E"
                onChange={(e) => setPrice(e.target.value)}
                // value={Package.Price}
              />
            </CardText>
            <CardText>
              <input
                type="number"
                name="Session_Discount"
                id="Session_DiscountEdit"
                required
                style={{ width: "80%", margin: "10px" }}
                placeholder="Session Discount"
                onChange={(e) => setSession_Discount(e.target.value)}
                // value={Package.Session_Discount}
              />
            </CardText>
            <CardText>
              <input
                type="number"
                name="Medicine_Discount"
                id="Medicine_DiscountEdit"
                required
                style={{ width: "80%", margin: "10px" }}
                placeholder="Medicine Discount"
                onChange={(e) => setMedicine_Discount(e.target.value)}
                // value={Package.Medicine_Discount}
              />
            </CardText>
            <CardText>
              <input
                type="number"
                name="Family_Discount"
                id="Family_DiscountEdit"
                required
                style={{ width: "80%", margin: "10px" }}
                placeholder="Family Discount"
                // value={Package.Family_Discount}
                onChange={(e) => setFamily_Discount(e.target.value)}
              />
            </CardText>
            <Button
              onClick={handleEdit}
              color="primary"
              style={{ margin: "5px", width: "70%" }}
            >
              Save
            </Button>
            <Button
              onClick={toggle}
              color="danger"
              style={{ margin: "5px", width: "70%" }}
            >
              Cancel
            </Button>
            {message && <p>message</p>}
          </Collapse>
        </React.StrictMode>
      </CardBody>
    </Card>
  );
};

export default PackageCard;
