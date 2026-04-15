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
    <div className="rv-page">
      {/* Navbar Container */}
      <div className="rv-top-bar">
        {/* Mobile menu (only visible on mobile) */}
        <div className="rv-mobile-menu">
          <i className="fa fa-bars"></i>
        </div>

        <div className="rv-logo-section">
          <img src="/assets/geu-logo.png" alt="logo" className="rv-geu-logo" />
        </div>
        
        <div className="rv-header-blue">
          <div className="rv-header-title">| Report Viewer</div>
          <div className="rv-header-right">
            <i className="fa fa-bar-chart rv-nav-icon" title="Dashboard"></i>
            <div className="rv-home-icon-wrap" onClick={onBack} title="Home">
              <i className="fa fa-home"></i>
            </div>
            <span className="rv-username">{student.name || 'STUDENT'}</span>
            <img src={student.photo || "/assets/geu-logo.png"} alt="profile" className="rv-nav-profile-pic" />
            <i className="fa fa-caret-down" style={{fontSize: '10px', marginLeft: '3px'}}></i>
          </div>
        </div>
      </div>

      {/* Crystal Reports Toolbar */}
      <div className="rv-toolbar">
        <div className="rv-tb-group">
          <div className="rv-tb-icon rv-disabled"><i className="fa fa-fast-backward"></i></div>
          <div className="rv-tb-icon rv-disabled"><i className="fa fa-caret-left"></i></div>
          <input type="text" className="rv-page-input" value="1" readOnly />
          <span className="rv-text">of 1</span>
          <div className="rv-tb-icon rv-disabled"><i className="fa fa-caret-right"></i></div>
          <div className="rv-tb-icon rv-disabled"><i className="fa fa-fast-forward"></i></div>
        </div>
        
        <div className="rv-tb-divider"></div>
        
        <div className="rv-tb-group">
          <div className="rv-tb-icon rv-disabled" style={{transform: 'scaleX(-1)'}}><i className="fa fa-share"></i></div>
          <input type="text" className="rv-find-input" />
          <span className="rv-text">Find | Next</span>
        </div>
        
        <div className="rv-tb-divider"></div>
        
        <div className="rv-tb-group">
          <div className="rv-export-btn">
             <img src="/assets/geu-logo.png" style={{opacity: 0}} width="14" alt="stub"/>
             <i className="fa fa-floppy-o" style={{color: '#2869a8', position:'absolute', left: '2px', top: '1px'}}></i>
             <i className="fa fa-caret-down" style={{fontSize: '10px', position:'absolute', right: '0px', top: '3px'}}></i>
          </div>
          <i className="fa fa-refresh rv-refresh-btn" style={{color: '#2b7fb9'}}></i>
        </div>
      </div>

      {/* Report Content */}
      <div className="rv-content-area">
        <div className="rv-id-cards-wrapper">
          
          {/* FRONT OF ID CARD */}
          <div className="rv-card-front">
            <div className="rv-vertical-banner">
              <span>PROVISIONAL ID CARD</span>
            </div>
            <div className="rv-front-main">
              <img src={headerImg} className="rv-front-header-img" alt="header" />
              
              <div className="rv-front-body">
                <div className="rv-front-photo-wrapper">
                  {student.photo ? (
                    <img src={student.photo} className="rv-front-photo" alt="Student" />
                  ) : (
                    <div className="rv-photo-placeholder"><i className="fa fa-user"></i></div>
                  )}
                </div>
                
                <div className="rv-front-details">
                  <div className="rv-fd-name">{student.name || 'N/A'}</div>
                  <div className="rv-fd-course">{student.course || 'N/A'}</div>
                  
                  <div className="rv-fd-row">
                    <div className="rv-fd-label">ADMISSION NO.</div>
                    <div className="rv-fd-colon">:</div>
                    <div className="rv-fd-val">{student.enrollmentNo || student.enrollNo || 'N/A'}</div>
                  </div>
                  
                  <div className="rv-fd-row">
                    <div className="rv-fd-label">BATCH</div>
                    <div className="rv-fd-colon">:</div>
                    <div className="rv-fd-val">{student.yearSem === '2' ? '2025-2028' : 'N/A'}</div>
                  </div>
                  
                  <div className="rv-fd-row">
                    <div className="rv-fd-label">FATHER'S NAME</div>
                    <div className="rv-fd-colon">:</div>
                    <div className="rv-fd-val">{student.fatherName || 'N/A'}</div>
                  </div>

                  <div className="rv-fd-enroll-bottom">
                    {student.enrollmentNo || student.enrollNo || 'N/A'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BACK OF ID CARD */}
          <div className="rv-card-back">
            <div className="rv-bk-row">
              <div className="rv-bk-label">Contact No.</div>
              <div className="rv-bk-colon">:</div>
              <div className="rv-bk-val">{student.phone || 'N/A'}</div>
            </div>
            <div className="rv-bk-row">
              <div className="rv-bk-label">Blood Group</div>
              <div className="rv-bk-colon">:</div>
              <div className="rv-bk-val">{student.bloodGroup || 'N/A'}</div>
            </div>
            <div className="rv-bk-row">
              <div className="rv-bk-label">E-mail</div>
              <div className="rv-bk-colon">:</div>
              <div className="rv-bk-val">{student.email || 'N/A'}</div>
            </div>
            <div className="rv-bk-row" style={{alignItems: 'flex-start'}}>
              <div className="rv-bk-label">Resi. Address</div>
              <div className="rv-bk-colon">:</div>
              <div className="rv-bk-val" style={{textTransform: 'uppercase'}}>{student.address || 'N/A'}</div>
            </div>

            <div className="rv-bk-row rv-mt-10">
              <div className="rv-bk-label">Valid Through</div>
              <div className="rv-bk-colon">:</div>
              <div className="rv-bk-val">{student.validThrough || 'N/A'}</div>
            </div>

            <div className="rv-emergency-row">
              <div className="rv-emer-details">
                <span className="rv-txt-red">Emergency Contact</span>
                <span style={{margin: '0 4px', fontWeight: 'bold'}}>:</span>
                <span className="rv-emer-val">{student.emergencyContact || 'N/A'}</span>
              </div>
              <div className="rv-signature-box">
                <div className="rv-sig-squiggle"></div>
                <div className="rv-sig-text">ISSUED BY</div>
              </div>
            </div>

            <div className="rv-blue-line"></div>

            <div className="rv-back-footer">
              <div className="rv-bf-title">If found please return to :</div>
              <div className="rv-bf-uni">Graphic Era (Deemed to be University)</div>
              <div className="rv-bf-text">Bell Road, Clement Town Dehradun, Uttarakhand India - 248002</div>
              <div className="rv-bf-text">Phone No : +91-135-2643421, 2642727</div>
              <div className="rv-bf-text">www.geu.ac.in</div>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Footer (Matches image 3) */}
      <div className="rv-mobile-footer">
        <div className="rv-mf-item" onClick={onBack}>
          <i className="fa fa-home"></i>
          <span>Home</span>
        </div>
        <div className="rv-mf-item">
          <i className="fa fa-book"></i>
          <span>Attendance</span>
        </div>
        <div className="rv-mf-item">
          <i className="fa fa-file-text"></i>
          <span>Syllabus</span>
        </div>
        <div className="rv-mf-item">
          <i className="fa fa-desktop"></i>
          <span>Dashboard</span>
        </div>
        <div className="rv-mf-item">
          <i className="fa fa-cog"></i>
          <span>Settings</span>
        </div>
      </div>

    </div>
  );
}
