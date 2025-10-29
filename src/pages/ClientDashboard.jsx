import React from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ClientDashboard() {
  return (
    <div className="dashboard-container d-flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="main-content flex-grow-1" style={{ marginLeft: "240px" }}>
        {/* Navbar */}
        <Navbar />

        {/* Dashboard content */}
        <div className="container mt-4">
          <h2 className="mb-4">Welcome Back, Client 👋</h2>

          <div className="row g-4">
            {/* Card 1 */}
            <div className="col-md-4">
              <div className="card text-center shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title">Total Orders</h5>
                  <p className="card-text fs-4 fw-bold text-primary">24</p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-md-4">
              <div className="card text-center shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title">Active Orders</h5>
                  <p className="card-text fs-4 fw-bold text-warning">5</p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="col-md-4">
              <div className="card text-center shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title">Completed Orders</h5>
                  <p className="card-text fs-4 fw-bold text-success">19</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
