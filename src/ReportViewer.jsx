import React, { useEffect, useState } from 'react';
import './ReportViewer.css';
import headerImg from './assets/idcardnavbaar.png';

export default function ReportViewer({ onBack }) {
  const [student, setStudent] = useState({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem('geu_id_card');
      if (saved) {
        setStudent(JSON.parse(saved));
      }
    } catch {
      console.error("Could not load student data");
    }
  }, []);

  return (
    <div className="report-viewer-page">
      {/* Top Navbar */}
      <div className="report-navbar">
        <div className="nav-left">
          <i className="fa fa-arrow-left back-btn" aria-hidden="true" onClick={onBack} title="Back to Home"></i>
          <span className="nav-title">Graphic Era Deemed to be University</span>
        </div>
        <div className="nav-center">Report Viewer</div>
        <div className="nav-right">
          <div className="profile-icon">
            <i className="fa fa-user-circle-o" aria-hidden="true"></i>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="report-container">
        {/* Header Image */}
        <div className="report-header">
          <img src={headerImg} alt="University Header" className="idcard-header" />
        </div>

        {/* Action Bar */}
        <div className="action-bar no-print">
          <button className="print-btn" onClick={() => window.print()}>
            <i className="fa fa-print" aria-hidden="true"></i> Print ID Card
          </button>
        </div>

        {/* Content Section */}
        <div className="idcard-content">
          <div className="left-section">
            <div className="photo-container">
              {student.photo ? (
                <img src={student.photo} alt="Student" className="report-student-photo" />
              ) : (
                <div className="report-photo-placeholder">
                  <i className="fa fa-user" aria-hidden="true"></i>
                </div>
              )}
            </div>
            
            <div className="student-details-block">
              <div className="detail-item">
                <span className="detail-label">Name</span>
                <span className="detail-value">{student.name || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Course</span>
                <span className="detail-value">{student.course || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Admission/Enroll No</span>
                <span className="detail-value">{student.enrollmentNo || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Batch</span>
                <span className="detail-value">{student.yearSem || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Father's Name</span>
                <span className="detail-value">{student.fatherName || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="right-section">
            <div className="detail-item">
              <span className="detail-label">Contact Number</span>
              <span className="detail-value">{student.phone || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Blood Group</span>
              <span className="detail-value">{student.bloodGroup || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Email</span>
              <span className="detail-value">{student.email || student.officialEmail || 'N/A'}</span>
            </div>
            <div className="detail-item layout-block">
              <span className="detail-label">Residential Address</span>
              <span className="detail-value text-block">{student.address || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Valid Through</span>
              <span className="detail-value">{student.validThrough || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Emergency Contact</span>
              <span className="detail-value">{student.emergencyContact || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
