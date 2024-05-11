import { useEffect, useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { Agency } from "../data-types/props";
import { getAgencies } from "../calling/agencyCaller";

export default function Agencies() {
  const [agencies, setAgencies] = useState<Agency[]>([]);

  useEffect(() => {
    getAgencies({ token: "" }).then((data) => {
      setAgencies(data);
    });
  }, []);

  return (
    <div className="outer">
      <Header />
      <Navbar />
      <div className="list-container">
        {agencies.map((agency: Agency) => (
          <div className="list-item" key={agency.id}>
            <div className="list-image-box">
              <img src={agency.logo} />
            </div>
            <div className="list-information-box">
              <p>Name: {agency.name}</p>
              <p>{agency.isApproved ? "Approved" : "Not approved"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
