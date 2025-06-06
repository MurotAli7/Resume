'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const initialFormData = {
  name: '',
  title: '',
  phone: '',
  email: '',
  about: 'Lorem ipsum dolor sit amet...',
  language: 'English, Germany (basic), Spain (basic)',
  expertise: 'Management Skills, Creativity, Digital Marketing...',
  experience: 'Arowa Industries Sydney - Australia 2002 - 2022...',
  education: 'Borcele University\nBachelor of Business Management...',
  skills: 'Design Process:78, Project Management:61',
  image: ''
};

export default function FormPage() {
  const router = useRouter();
  const [formData, setFormData] = useState(initialFormData);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('portfolio');
    if (stored) {
      try {
        const parsedData = JSON.parse(stored);
        setFormData({
          ...initialFormData,
          ...parsedData,
          name: parsedData.name || '',
          title: parsedData.title || '',
          phone: parsedData.phone || '',
          email: parsedData.email || '',
          image: parsedData.image || ''
        });
        if (parsedData.image) {
          setImagePreview(parsedData.image);
        }
      } catch (err) {
        console.error('LocalStorage parsing error:', err);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: value || '' 
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result;
        setImagePreview(imageDataUrl);
        setFormData(prev => ({ 
          ...prev, 
          image: imageDataUrl || '' 
        }));
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('portfolio', JSON.stringify(formData));
    router.push('/preview');
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Portfolio Ma'lumotlarini Kiriting</h1>
      <form onSubmit={handleSubmit} className="portfolio-form">
        <div className="form-row">
          <div className="form-group">
            <label>Ism</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Richard Sanchez"
              required
            />
          </div>
          <div className="form-group">
            <label>Lavozim</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Product Designer"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Telefon</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="123-4567-7890"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="hello@example.com"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Profil Rasmi</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <div className="image-preview-container">
              <img 
                src={imagePreview} 
                alt="Profile Preview" 
                className="image-preview"
              />
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Haqida</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            rows={4}
          />
        </div>

        <div className="form-group">
          <label>Tillar (vergul bilan ajratilgan)</label>
          <input
            name="language"
            value={formData.language}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Ko'nikmalar (format: Ko'nikma:Foiz, masalan, Design Process:78)</label>
          <textarea
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <div className="form-group">
          <label>Tajriba</label>
          <textarea
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            rows={6}
          />
        </div>

        <div className="form-group">
          <label>Ta'lim</label>
          <textarea
            name="education"
            value={formData.education}
            onChange={handleChange}
            rows={6}
          />
        </div>

        <button type="submit" className="submit-button">
          Ko'rish
        </button>
      </form>
    </div>
  );
}