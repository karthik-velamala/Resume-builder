import { useState } from 'react';
import { Download, Printer, Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import './styles.css';

interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  summary: string;
  experience: Array<{
    id: number;
    company: string;
    position: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    id: number;
    school: string;
    degree: string;
    percentage: string;
  }>;
  skills: string[];
}

function App() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    github: '',
    linkedin: '',
    summary: '',
    experience: [{ id: 1, company: '', position: '', duration: '', description: '' }],
    education: [{ id: 1, school: '', degree: '', percentage: '' }],
    skills: ['']
  });

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    window.print();
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const newExperience = [...resumeData.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    setResumeData({ ...resumeData, experience: newExperience });
  };

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, { id: Date.now(), company: '', position: '', duration: '', description: '' }]
    });
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const newEducation = [...resumeData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setResumeData({ ...resumeData, education: newEducation });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, { id: Date.now(), school: '', degree: '', percentage: '' }]
    });
  };

  const updateSkills = (index: number, value: string) => {
    const newSkills = [...resumeData.skills];
    newSkills[index] = value;
    setResumeData({ ...resumeData, skills: newSkills });
  };

  const addSkill = () => {
    setResumeData({ ...resumeData, skills: [...resumeData.skills, ''] });
  };

  return (
    <div className="app-container">
      <div className="editor">
        <h1 className="editor-title">Resume Builder</h1>
        
        <div className="section">
          <h2>Personal Information</h2>
          <input
            type="text"
            placeholder="Full Name"
            value={resumeData.fullName}
            onChange={(e) => setResumeData({ ...resumeData, fullName: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={resumeData.email}
            onChange={(e) => setResumeData({ ...resumeData, email: e.target.value })}
          />
          <input
            type="tel"
            placeholder="Phone"
            value={resumeData.phone}
            onChange={(e) => setResumeData({ ...resumeData, phone: e.target.value })}
          />
          <input
            type="text"
            placeholder="Location"
            value={resumeData.location}
            onChange={(e) => setResumeData({ ...resumeData, location: e.target.value })}
          />
          <input
            type="text"
            placeholder="GitHub URL"
            value={resumeData.github}
            onChange={(e) => setResumeData({ ...resumeData, github: e.target.value })}
          />
          <input
            type="text"
            placeholder="LinkedIn URL"
            value={resumeData.linkedin}
            onChange={(e) => setResumeData({ ...resumeData, linkedin: e.target.value })}
          />
        </div>

        <div className="section">
          <h2>Professional Summary</h2>
          <textarea
            placeholder="Write a brief summary about yourself..."
            value={resumeData.summary}
            onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
          />
        </div>

        <div className="section">
          <h2>Experience</h2>
          {resumeData.experience.map((exp, index) => (
            <div key={exp.id} className="subsection">
              <input
                type="text"
                placeholder="Company"
                value={exp.company}
                onChange={(e) => updateExperience(index, 'company', e.target.value)}
              />
              <input
                type="text"
                placeholder="Position"
                value={exp.position}
                onChange={(e) => updateExperience(index, 'position', e.target.value)}
              />
              <input
                type="text"
                placeholder="Duration"
                value={exp.duration}
                onChange={(e) => updateExperience(index, 'duration', e.target.value)}
              />
              <textarea
                placeholder="Description"
                value={exp.description}
                onChange={(e) => updateExperience(index, 'description', e.target.value)}
              />
            </div>
          ))}
          <button onClick={addExperience} className="add-btn">Add Experience</button>
        </div>

        <div className="section">
          <h2>Education</h2>
          {resumeData.education.map((edu, index) => (
            <div key={edu.id} className="subsection">
              <input
                type="text"
                placeholder="School"
                value={edu.school}
                onChange={(e) => updateEducation(index, 'school', e.target.value)}
              />
              <input
                type="text"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => updateEducation(index, 'degree', e.target.value)}
              />
              <input
                type="text"
                placeholder="percentage"
                value={edu.percentage}
                onChange={(e) => updateEducation(index, 'percentage', e.target.value)}
              />
            </div>
          ))}
          <button onClick={addEducation} className="add-btn">Add Education</button>
        </div>

        <div className="section">
          <h2>Skills</h2>
          {resumeData.skills.map((skill, index) => (
            <input
              key={index}
              type="text"
              placeholder="Skill"
              value={skill}
              onChange={(e) => updateSkills(index, e.target.value)}
            />
          ))}
          <button onClick={addSkill} className="add-btn">Add Skill</button>
        </div>
      </div>

      <div className="preview">
        <div className="preview-actions">
          <button onClick={handlePrint} className="action-btn">
            <Printer size={20} /> Print
          </button>
          <button onClick={handleDownload} className="action-btn">
            <Download size={20} /> Download PDF
          </button>
        </div>

        <div className="resume">
          <div className="resume-header">
            <h1>{resumeData.fullName || 'Your Name'}</h1>
            
            <div className="contact-info">
              {resumeData.email && (
                <span><Mail size={16} /> {resumeData.email}</span>
              )}
              {resumeData.phone && (
                <span><Phone size={16} /> {resumeData.phone}</span>
              )}
              {resumeData.location && (
                <span><MapPin size={16} /> {resumeData.location}</span>
              )}
              {resumeData.github && (
                <span><Github size={16} /> {resumeData.github}</span>
              )}
              {resumeData.linkedin && (
                <span><Linkedin size={16} /> {resumeData.linkedin}</span>
              )}
            </div>
          </div>

          {resumeData.summary && (
            <div className="resume-section">
              <h3>Professional Summary</h3>
              <p>{resumeData.summary}</p>
            </div>
          )}

          {resumeData.experience.some(exp => exp.company || exp.position) && (
            <div className="resume-section">
              <h3>Experience</h3>
              {resumeData.experience.map((exp, index) => (
                exp.company && (
                  <div key={index} className="experience-item">
                    <div className="experience-header">
                      <h4>{exp.position}</h4>
                      <span className="company">{exp.company}</span>
                      <span className="duration">{exp.duration}</span>
                    </div>
                    <p>{exp.description}</p>
                  </div>
                )
              ))}
            </div>
          )}

          {resumeData.education.some(edu => edu.school || edu.degree) && (
            <div className="resume-section">
              <h3>Education</h3>
              {resumeData.education.map((edu, index) => (
                edu.school && (
                  <div key={index} className="education-item">
                    <h4>{edu.school}</h4>
                    <p>{edu.degree}</p>
                    <span>{edu.percentage}</span>
                  </div>
                )
              ))}
            </div>
          )}

          {resumeData.skills.some(skill => skill) && (
            <div className="resume-section">
              <h3>Skills</h3>
              <div className="skills-list">
                {resumeData.skills.filter(skill => skill).map((skill, index) => (
                  <span key={index} className="skill-item">{skill}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;