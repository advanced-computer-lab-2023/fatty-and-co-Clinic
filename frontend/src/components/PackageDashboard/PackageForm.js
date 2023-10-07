import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Card,
  Form,
  FormGroup,
  Input,
  CardHeader,
  Button,
} from "reactstrap";
const PackageForm = () => {
  const [Name, setName] = useState("");
  const [Price, setPrice] = useState("");
  const [Session_Discount, setSession_Discount] = useState("");
  const [Medicine_Discount, setMedicine_Discount] = useState("");
  const [Family_Discount, setFamily_Discount] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    const Package = {
      Name,
      Price,
      Session_Discount,
      Medicine_Discount,
      Family_Discount,
    };

    const response = await fetch("/package/addPackage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Package),
    });
    const data = await response.json();
    if (response.ok) {
      setMessage(null);
      setName("");
      setPrice("");
      setSession_Discount("");
      setMedicine_Discount("");
      setFamily_Discount("");
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div>
      <Card style={{ width: "40%", margin: "10px" }}> 
        <CardHeader>Add Package</CardHeader>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              type="text"
              name="Name"
              id="Name"
              required
              style={{ width: "80%", margin: "10px" }}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              value={Name}
            />
            <Input
              type="number"
              name="Price"
              id="Price"
              required
              style={{ width: "80%", margin: "10px" }}
              placeholder="Price in L.E"
              onChange={(e) => setPrice(e.target.value)}
              value={Price}
            />
            <Input
              type="number"
              name="Session_Discount"
              id="Session_Discount"
              required
              style={{ width: "80%", margin: "10px" }}
              placeholder="Session Discount %"
              onChange={(e) => setSession_Discount(e.target.value)}
              value={Session_Discount}
            />
            <Input
              type="number"
              name="Medicine_Discount"
              id="Medicine_Discount"
              required
              style={{ width: "80%", margin: "10px" }}
              placeholder="Medicine Discount %"
              onChange={(e) => setMedicine_Discount(e.target.value)}
              value={Medicine_Discount}
            />
            <Input
              type="number"
              name="Family_Discount"
              id="Family_Discount"
              required
              style={{ width: "80%", margin: "10px" }}
              placeholder="Family Discount %"
              onChange={(e) => setFamily_Discount(e.target.value)}
              value={Family_Discount}
            />
          </FormGroup>
          {message && <p className="text-danger">{message}</p>}
          <Button color="primary" style={{ margin: "5px", width: "70%" }}>
            Add
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default PackageForm;
