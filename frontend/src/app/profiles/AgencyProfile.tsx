import { useEffect, useState } from "react";
import Header from "../../components/Header.tsx";
import Navbar from "../../components/Navbar.tsx";
import { Agency, Astronaut, SpaceMissionForListing } from "../../data-types/entities.tsx";
import { useParams } from "react-router-dom";
import {
  getAgencyProfile,
  getApprovedSpaceMissionOfAgency,
  getApprovedAstronautsOfAgency,
} from "../../calling/agencyCaller.tsx";

export default function AgencyProfile() {
  const { id } = useParams<{ id?: string }>();
  const [agencyInfo, setAgencyInfo] = useState<Agency | null>(null);
  const [spaceMissions, setSpaceMissions] = useState<SpaceMissionForListing[] | null>(null);
  const [astronauts, setAstronauts] = useState<Astronaut[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("Company ID is missing");
      return;
    }

    const numericAgencyId = parseInt(id, 10);
    if (isNaN(numericAgencyId)) {
      setError("Invalid Company ID");
      return;
    }

    const token = ""; // Assuming token management
    const user = { token };

    getAgencyProfile(numericAgencyId, user)
        .then((data) => {
          setAgencyInfo(data);
          return getApprovedSpaceMissionOfAgency(numericAgencyId, user);
        })
        .then((missions) => {
          const parsedMissions = missions.map((mission) => ({
            ...mission,
            startDate: new Date(mission.startDate),
            endDate: new Date(mission.endDate),
          }));
          setSpaceMissions(parsedMissions);

          setError(""); // Clear any previous errors
        })
        .catch((err) => {
          setError(err.message);
          setAgencyInfo(null);
          setSpaceMissions(null);
          console.error("API error:", err);
        });
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!agencyInfo) {
    return <div>Loading...</div>;
  }

  const handleApproveAgencyClick = () => {
    // Placeholder for approval functionality
  };

  return (
      <div className="outer">
        <Header />
        <Navbar />

        <div className="profile-container">
          <div className="button-bar">
            {localStorage.getItem("userRole") === "ADMIN" && (
                <button className="top-button" onClick={handleApproveAgencyClick}>
                  Approve Agency
                </button>
            )}
          </div>

          <div className="profile-header">
            <div className="profile-image">
              <img src={agencyInfo.logo} alt={`${agencyInfo.name} logo`} style={{ width: "150px" }} />
            </div>
            <div className="profile-info">
              <h1>{agencyInfo.name}</h1>
              <p>Email: {agencyInfo.mail}</p>
              <p>Is Approved: {agencyInfo.isApproved}</p>
            </div>
          </div>

          <div className="profile-details">
            <div className="missions-section">
              <h2>Space Missions</h2>
              {spaceMissions ? (
                  <ul>
                    {spaceMissions.map((mission) => (
                        <li key={mission.id}>
                          <h3>{mission.missionName}</h3>
                          <p>Created by: {mission.companyName}</p>
                          <p>Status: {mission.status}</p>
                          <p>Start Date: {mission.startDate.toLocaleDateString()}</p>
                          <p>End Date: {mission.endDate.toLocaleDateString()}</p>
                          <img src={mission.image} alt={mission.missionName} style={{ width: "100px" }} />
                        </li>
                    ))}
                  </ul>
              ) : (
                  <div>Loading space missions...</div>
              )}
            </div>
            <div className="astronauts-section">
              <h2>Approved Astronauts</h2>
              {astronauts ? (
                  <ul>
                    {astronauts.map((astronaut) => (
                        <li key={astronaut.id}>
                          <img src={astronaut.image} alt={astronaut.name} style={{ width: "100px", height: "100px" }} />
                          <h3>{astronaut.name}</h3>
                          <p>Date of Birth: {new Date(astronaut.dateOfBirth).toLocaleDateString()}</p>
                          <p>Country: {astronaut.country}</p>
                          <p>On Duty: {astronaut.onDuty ? "Yes" : "No"}</p>
                          <p>Salary: ${astronaut.salary.toLocaleString()}</p>
                        </li>
                    ))}
                  </ul>
              ) : (
                  <div>Loading astronauts...</div>
              )}
            </div>
          </div>
        </div>

        <style>{`
        .profile-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          max-width: 960px;
          margin: auto;
        }
        .profile-header {
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 20px;
        }
        .profile-image img {
          width: auto;
          height: 150px;
        }
        .profile-info {
          margin-left: 20px;
        }
        .profile-details {
          display: flex;
          justify-content: space-between;
          width: 100%;
        }
        .missions-section, .astronauts-section {
          flex: 1;
          padding: 10px;
          margin: 5px;
          background: #f0f0f0;
          border: 1px solid #ccc;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        li {
          margin-bottom: 10px;
          background: white;
          padding: 10px;
          border: 1px solid #ddd;
        }
        .top-button {
          padding: 8px 16px;
          margin: 0 10px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          width: fit-content;
          align-self: flex-end;
        }
        .top-button:hover {
          background-color: #0056b3;
        }
      `}</style>
      </div>
  );
}
