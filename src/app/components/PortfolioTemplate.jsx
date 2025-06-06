'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TelegramModal from './TelegramModal'; 

export default function PortfolioTemplate({ data }) {
  const router = useRouter();
  const [bgColor, setBgColor] = useState('#2c3e50');
  const [showTelegramModal, setShowTelegramModal] = useState(false); 

  const colors = ['#2c3e50', '#16a085', '#27ae60', '#e74c3c', '#9b59b6', '#34495e', '#d35400'];

  const skillsArray = data.skills?.split(',').map(item => {
    const [label, value] = item.split(':');
    return { label: label.trim(), value: parseInt(value) || 50 };
  });

  const changeColor = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(randomColor);
  };

  return (
    <div className="portfolio-generator-container">
      <div className="portfolio" style={{ '--sidebar-bg': bgColor }}>
        <div className="portfolio-sidebar">
          {data.image ? (
            <img src={data.image} alt="Profile" className="profile-image" />
          ) : (
            <div className="profile-placeholder">No Image</div>
          )}
          
          <h1 className="portfolio-name">{data.name || 'RICHARD SANCHEZ'}</h1>
          <h2 className="portfolio-title">{data.title || 'Product Designer'}</h2>
          
          <div className="portfolio-section">
            <h3>About Me</h3>
            <p>{data.about || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}</p>
          </div>
          
          <div className="portfolio-section">
            <h3>Contact</h3>
            <ul className="contact-list">
              <li>📞 {data.phone || '123-4567-7890'}</li>
              <li>✉️ {data.email || 'hello@example.com'}</li>
            </ul>
          </div>
          
          <div className="portfolio-section">
            <h3>Language</h3>
            <ul>
              {data.language?.split(',').map((lang, i) => (
                <li key={i}>{lang.trim()}</li>
              ))}
            </ul>
          </div>
          
          <div className="portfolio-section">
            <h3>Expertise</h3>
            <ul>
              {data.expertise?.split(',').map((item, i) => (
                <li key={i}>{item.trim()}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="portfolio-main">
          <div className="portfolio-section">
            <h3>Experience</h3>
            {data.experience?.split('\n\n').map((exp, i) => {
              const [title, ...description] = exp.split('\n');
              return (
                <div key={i} className="experience-item">
                  <h4>{title}</h4>
                  <p>{description.join('\n')}</p>
                </div>
              );
            })}
          </div>
          
          <div className="portfolio-section">
            <h3>Education</h3>
            {data.education?.split('\n\n').map((edu, i) => {
              const [university, ...details] = edu.split('\n');
              return (
                <div key={i} className="education-item">
                  <h4>{university}</h4>
                  <p>{details.join('\n')}</p>
                </div>
              );
            })}
          </div>
          
          <div className="portfolio-section">
            <h3>Skills Summary</h3>
            {skillsArray?.map((skill, i) => (
              <div key={i} className="skill-item">
                <span>{skill.label}</span>
                <div className="skill-bar">
                  <div 
                    className="skill-progress" 
                    style={{ width: `${skill.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="action-buttons">
        <button onClick={changeColor} className="color-button">
          Change Color
        </button>
        <button 
          onClick={() => setShowTelegramModal(true)} 
          className="download-button"
        >
          Download PDF
        </button>
      </div>
      
      {showTelegramModal && ( 
        <TelegramModal 
          onClose={() => setShowTelegramModal(false)} 
          onSuccess={() => router.push('/download?success=true')} 
        />
      )}
    </div>
  );
}