import { useState, useEffect, useRef } from 'react'
import './IDCard.css'

import iconAcademic from './assets/icon2.png';
import iconFee from './assets/icon3.png';
import iconCircular from './assets/icon4.png';
import iconExam from './assets/icon 5.png';
import iconPlacement from './assets/icon6.png';
import iconHostel from './assets/icon8.png';
import iconGrievance from './assets/icons.png';

// ─── Default student data ────────────────────────────────────────────────────
const DEFAULT_DATA = {
  name: 'RANGOLI',
  enrollNo: '2512350005',
  email: 'rangolinaik.sk@gmail.com',
  phone: '7668707141',
  officialEmail: '2512350005@geu.ac.in',
  fatherName: 'ROOP LAL',
  motherName: 'NISHA DEVI',
  dob: '16/06/2007',
  college: 'Graphic Era (Deemed to be University)',
  course: 'B.A (Hons)- Psychology',
  specialization: '',
  yearSem: '2',
  branch: 'N/A',
  section: 'N/A',
  classRollNo: '64',
  enrollmentNo: 'GE-25360806',
  universityRollNo: '3600806',
  highSchoolPct: '70.40',
  intermediatePct: '70.00',
  status: 'Active',
  photo: null,
}

function EditableField({ label, value, fieldKey, editing, onChange, type = 'text' }) {
  return (
    <div className="field-row">
      <span className="field-label">{label} :</span>
      {editing ? (
        <input
          className="field-input"
          type={type}
          value={value}
          onChange={e => onChange(fieldKey, e.target.value)}
          placeholder={label}
        />
      ) : (
        <span className="field-value">{value || '—'}</span>
      )}
    </div>
  )
}

// ─── Main IDCard component ────────────────────────────────────────────────────
export default function IDCard() {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('geu_id_card')
      return saved ? { ...DEFAULT_DATA, ...JSON.parse(saved) } : DEFAULT_DATA
    } catch {
      return DEFAULT_DATA
    }
  })

  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(data)
  const [saved, setSaved] = useState(false)
  const photoInputRef = useRef(null)

  // Persist to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('geu_id_card', JSON.stringify(data))
  }, [data])

  const handleEdit = () => {
    setDraft({ ...data })
    setEditing(true)
  }

  const handleSave = () => {
    setData({ ...draft })
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleCancel = () => {
    setDraft({ ...data })
    setEditing(false)
  }

  const handleChange = (key, value) => {
    setDraft(prev => ({ ...prev, [key]: value }))
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const base64 = ev.target.result
      if (editing) {
        handleChange('photo', base64)
      } else {
        setData(prev => ({ ...prev, photo: base64 }))
      }
    }
    reader.readAsDataURL(file)
  }

  const handleReset = () => {
    if (window.confirm('Reset all data to defaults?')) {
      setData(DEFAULT_DATA)
      setDraft(DEFAULT_DATA)
      setEditing(false)
    }
  }

  const current = editing ? draft : data

  return (
    <div className="page-wrapper">

      {/* ── Phone Frame ──────────────────────────── */}
      <div className="phone-frame">

        {/* Navbar Header */}
        <div className="navbar">
          {/* LOGO AREA */}
          <div className="logo-area">
              <img src="/assets/geu-logo.png" className="logo" alt="logo" />
          </div>

          {/* MENU BUTTON */}
          <div className="menu-btn" onClick={editing ? handleCancel : handleEdit} title={editing ? 'Cancel' : 'Edit'}>
              <i className={editing ? "fa fa-times" : "fa fa-bars"}></i>
          </div>
        </div>

        {/* Attendance Marquee */}
        <div className="attendance-banner">
          <span>75% attendance is mandatory to be eligible for examinations &nbsp;•&nbsp; Keep your ID card updated &nbsp;•&nbsp; 75% attendance is mandatory</span>
        </div>

        {/* Content Sections (Scrollable) */}
        <div className="content-area">

          {/* Profile Card */}
          <div className="profile-card">
            {/* Photo */}
            <div className="photo-wrapper" onClick={() => photoInputRef.current.click()} title="Click to change photo">
              {current.photo ? (
                <img src={current.photo} alt="Student" className="student-photo" />
              ) : (
                <div className="photo-placeholder">
                  <svg viewBox="0 0 24 24" width="36" height="36" fill="rgba(255,255,255,0.6)">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                  </svg>
                </div>
              )}
              <div className="photo-overlay">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="white">
                  <path d="M12 15.2A3.2 3.2 0 1 0 12 8.8a3.2 3.2 0 0 0 0 6.4zm6.4-9.6h-1.76l-1.28-1.6H8.64L7.36 5.6H5.6C4.72 5.6 4 6.32 4 7.2v9.6c0 .88.72 1.6 1.6 1.6h12.8c.88 0 1.6-.72 1.6-1.6V7.2c0-.88-.72-1.6-1.6-1.6z"/>
                </svg>
              </div>
            </div>
            <input ref={photoInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoUpload} />

            {/* Name & ID */}
            {editing ? (
              <input
                className="name-input"
                value={draft.name}
                onChange={e => handleChange('name', e.target.value)}
                placeholder="Full Name"
              />
            ) : (
              <h2 className="student-name">{current.name}</h2>
            )}

            {editing ? (
              <input
                className="enroll-input"
                value={draft.enrollNo}
                onChange={e => handleChange('enrollNo', e.target.value)}
                placeholder="Enroll No."
              />
            ) : (
              <p className="student-enroll">{current.enrollNo}</p>
            )}

            {/* Contact Row */}
            <div className="contact-row">
              <div className="contact-item">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="rgba(255,255,255,0.85)"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                {editing ? (
                  <input className="contact-input" value={draft.email} onChange={e => handleChange('email', e.target.value)} placeholder="Personal Email" />
                ) : (
                  <span>{current.email}</span>
                )}
              </div>
              <div className="contact-item">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="rgba(255,255,255,0.85)"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                {editing ? (
                  <input className="contact-input" value={draft.phone} onChange={e => handleChange('phone', e.target.value)} placeholder="Phone" />
                ) : (
                  <span>{current.phone}</span>
                )}
              </div>
            </div>
          </div>

          {/* ── ID Card Card ── */}
          <div className="section-card">
            <div className="id-card-title">
                <i className="fa fa-id-card-o" aria-hidden="true" style={{ fontSize: '24px', color: 'red', marginBottom: '5px' }}></i>
                <span>ID Card</span>
            </div>
            <EditableField label="Father Name" value={current.fatherName} fieldKey="fatherName" editing={editing} onChange={handleChange} />
            <EditableField label="Mother Name" value={current.motherName} fieldKey="motherName" editing={editing} onChange={handleChange} />
            <EditableField label="D.O.B." value={current.dob} fieldKey="dob" editing={editing} onChange={handleChange} />
            <EditableField label="Official Email" value={current.officialEmail} fieldKey="officialEmail" editing={editing} onChange={handleChange} />
            <EditableField label="College" value={current.college} fieldKey="college" editing={editing} onChange={handleChange} />
            <EditableField label="Course" value={current.course} fieldKey="course" editing={editing} onChange={handleChange} />
            <EditableField label="Specialization" value={current.specialization} fieldKey="specialization" editing={editing} onChange={handleChange} />
            <EditableField label="Year / Sem" value={current.yearSem} fieldKey="yearSem" editing={editing} onChange={handleChange} />
            <EditableField label="Branch" value={current.branch} fieldKey="branch" editing={editing} onChange={handleChange} />
            <EditableField label="Section" value={current.section} fieldKey="section" editing={editing} onChange={handleChange} />
            <EditableField label="Class Roll No." value={current.classRollNo} fieldKey="classRollNo" editing={editing} onChange={handleChange} />
            <EditableField label="Enroll No." value={current.enrollmentNo} fieldKey="enrollmentNo" editing={editing} onChange={handleChange} />
            <EditableField label="University Roll No." value={current.universityRollNo} fieldKey="universityRollNo" editing={editing} onChange={handleChange} />
            <EditableField label="HighSchool %" value={current.highSchoolPct} fieldKey="highSchoolPct" editing={editing} onChange={handleChange} />
            <EditableField label="Intermediate %" value={current.intermediatePct} fieldKey="intermediatePct" editing={editing} onChange={handleChange} />
            <EditableField label="Status" value={current.status} fieldKey="status" editing={editing} onChange={handleChange} />
          </div>

          {/* ── Edit Action Buttons ── */}
          {editing && (
            <div className="edit-actions">
              <button className="btn-save" onClick={handleSave}>
                ✓ Save Changes
              </button>
              <button className="btn-cancel" onClick={handleCancel}>
                ✕ Cancel
              </button>
              <button className="btn-reset" onClick={handleReset}>
                ↺ Reset to Default
              </button>
            </div>
          )}

          {/* Save Success Toast */}
          {saved && (
            <div className="toast-saved">
              ✓ Changes saved successfully!
            </div>
          )}
          
          <div className="modules-section">
            <div className="modules-header-bar">
              <input type="text" className="modules-search" placeholder="Search Modules.." />
              <button className="modules-menu"><i className="fa fa-bars" aria-hidden="true"></i></button>
            </div>
            <div className="modules-grid">
              {[
                { iconSrc: iconAcademic, label: 'Academic' },
                { iconSrc: iconFee, label: 'Fee' },
                { iconSrc: iconCircular, label: 'Circular' },
                { iconSrc: iconExam, label: 'Exam' },
                { iconSrc: iconPlacement, label: 'Placement' },
                { iconSrc: iconHostel, label: 'Hostel' },
                { iconSrc: iconGrievance, label: 'Grievance' },
              ].map(m => (
                <button key={m.label} className="module-tile">
                  <span className="module-icon"><img src={m.iconSrc} alt={m.label} /></span>
                  <span className="module-label">{m.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="bottom-nav">
          {[
            { icon: 'fa fa-home', label: 'Home' },
            { icon: 'fa fa-bar-chart', label: 'Dashboard' },
            { icon: 'fa fa-file-text', label: 'Assignment' },
            { icon: 'fa fa-money', label: 'Fee' },
            { icon: 'fa fa-cog', label: 'Settings' },
          ].map(n => (
            <button key={n.label} className="nav-btn">
              <i className={`nav-icon ${n.icon}`}></i>
              <span className="nav-label">{n.label}</span>
            </button>
          ))}
        </div>

      </div>
      {/* End phone frame */}
    </div>
  )
}
