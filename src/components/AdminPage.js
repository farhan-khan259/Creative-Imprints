import React, { useState, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';

const AdminPage = ({ lang, toggleLang, content, onContentUpdate, storageKey }) => {
  const [savedContent, setSavedContent] = useState(content);
  const [draftContent, setDraftContent] = useState(content);
  const [activeSection, setActiveSection] = useState('hero');
  const [editingSection, setEditingSection] = useState(null);
  const [message, setMessage] = useState('');
  const [jsonText, setJsonText] = useState(JSON.stringify(content, null, 2));
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSavedContent(content);
    setDraftContent(content);
    setJsonText(JSON.stringify(content, null, 2));
    setEditingSection(null);
  }, [content]);

  useEffect(() => {
    setEditingSection(null);
  }, [activeSection]);

  useEffect(() => {
    if (activeSection === 'json') {
      setJsonText(JSON.stringify(draftContent, null, 2));
    }
  }, [activeSection, draftContent]);

  const startEditing = (section) => {
    setEditingSection(section);
    setMessage('Editing section. Changes are not saved until you click Save.');
    setTimeout(() => setMessage(''), 2500);
  };

  const cancelEditing = () => {
    setDraftContent(savedContent);
    setJsonText(JSON.stringify(savedContent, null, 2));
    setEditingSection(null);
    setMessage('Changes canceled.');
    setTimeout(() => setMessage(''), 2000);
  };

  const saveEditing = () => {
    setSavedContent(draftContent);
    setEditingSection(null);
    onContentUpdate(draftContent);
    setMessage('Changes saved successfully.');
    setTimeout(() => setMessage(''), 2000);
  };

  const updateDraftField = (section, field, value) => {
    setDraftContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const updateDraftArrayItem = (section, arrayName, index, field, value) => {
    setDraftContent((prev) => {
      const updated = { ...prev };
      if (arrayName) {
        updated[section] = {
          ...updated[section],
          [arrayName]: updated[section][arrayName].map((item, idx) =>
            idx === index ? { ...item, [field]: value } : item
          ),
        };
      } else {
        updated[section] = updated[section].map((item, idx) =>
          idx === index ? { ...item, [field]: value } : item
        );
      }
      return updated;
    });
  };

  const updateFooterLinks = (value) => {
    const links = value.split(',').map((link) => link.trim()).filter(Boolean);
    updateDraftField('footer', 'quickLinks', links);
  };

  const handleJsonChange = (value) => {
    setJsonText(value);
  };

  const saveJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setDraftContent(parsed);
      setSavedContent(parsed);
      setEditingSection(null);
      onContentUpdate(parsed);
      setMessage('JSON saved successfully.');
      setTimeout(() => setMessage(''), 2000);
    } catch (error) {
      setMessage('Invalid JSON. Fix syntax before saving.');
    }
  };

  const sectionTitle = {
    logo: 'Logo & Brand Identity',
    hero: 'Hero Section',
    stats: 'Statistics',
    services: 'Services',
    portfolio: 'Latest Works',
    cta: 'Call to Action',
    contact: 'Contact Information',
    footer: 'Footer',
    json: 'JSON Editor',
  };

  const isEditing = editingSection === activeSection;
  const currentData = draftContent;

  const handleHamburgerClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebarOnSectionClick = (section) => {
    setActiveSection(section);
    setSidebarOpen(false);
  };

  return (
    <div className="admin-wrapper">
      <AdminNavbar 
        onHamburgerClick={handleHamburgerClick} 
        sidebarOpen={sidebarOpen}
        lang={lang}
        toggleLang={toggleLang}
        brandName={content.navbar?.brandName || 'Creative Imprints'}
        brandTag={content.navbar?.brandTag || 'Futuristic digital experiences'}
      />
      <div className="admin-layout">
      <aside className={`admin-sidebar ${sidebarOpen ? 'show' : ''}`}>
        <h3 style={{ marginBottom: '24px' }}>⚙️ Admin Panel</h3>
        {['logo', 'hero', 'stats', 'services', 'portfolio', 'cta', 'contact', 'footer', 'json'].map((section) => (
          <button
            key={section}
            className={activeSection === section ? 'active' : ''}
            onClick={() => closeSidebarOnSectionClick(section)}
          >
            {sectionTitle[section]}
          </button>
        ))}
      </aside>

      <main className="admin-main">
        {message && <div className="admin-message">{message}</div>}

        <div className="admin-toolbar">
          <h2>{sectionTitle[activeSection]}</h2>
          <div className="admin-actions">
            {isEditing ? (
              <>
                <button className="button button--primary" onClick={activeSection === 'json' ? saveJson : saveEditing}>Save</button>
                <button className="button button--outline" onClick={cancelEditing}>Cancel</button>
              </>
            ) : (
              <button className="button button--secondary" onClick={() => startEditing(activeSection)}>Edit</button>
            )}
          </div>
        </div>

        {activeSection === 'logo' && (
          <div className="admin-section">
            <div className="admin-field">
              <label>Upload Logo (PNG/JPG)</label>
              <input
                type="file"
                accept="image/*"
                disabled={!isEditing}
                onChange={(e) => {
                  if (!isEditing) return;
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      localStorage.setItem('cimprints_logo', reader.result);
                      setMessage('Logo updated! Refresh page to see changes.');
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <p className="admin-hint">Upload a new logo to replace the current one across the site.</p>
            </div>
            <div className="admin-field">
              <label>Brand Name</label>
              <input
                type="text"
                value={currentData.navbar?.brandName || ''}
                disabled={!isEditing}
                onChange={(e) => updateDraftField('navbar', 'brandName', e.target.value)}
              />
            </div>
            <div className="admin-field">
              <label>Brand Tagline</label>
              <input
                type="text"
                value={currentData.navbar?.brandTag || ''}
                disabled={!isEditing}
                onChange={(e) => updateDraftField('navbar', 'brandTag', e.target.value)}
              />
            </div>
          </div>
        )}

        {activeSection === 'hero' && (
          <div className="admin-section">
            <div className="admin-field"><label>Eyebrow Text</label><input disabled={!isEditing} value={currentData.hero?.eyebrow || ''} onChange={(e) => updateDraftField('hero', 'eyebrow', e.target.value)} /></div>
            <div className="admin-field"><label>Title</label><textarea disabled={!isEditing} rows="3" value={currentData.hero?.title || ''} onChange={(e) => updateDraftField('hero', 'title', e.target.value)} /></div>
            <div className="admin-field"><label>Subtitle</label><textarea disabled={!isEditing} rows="3" value={currentData.hero?.subtitle || ''} onChange={(e) => updateDraftField('hero', 'subtitle', e.target.value)} /></div>
            <div className="admin-field"><label>Primary Button Text</label><input disabled={!isEditing} value={currentData.hero?.primaryButton || ''} onChange={(e) => updateDraftField('hero', 'primaryButton', e.target.value)} /></div>
            <div className="admin-field"><label>Outline Button Text</label><input disabled={!isEditing} value={currentData.hero?.outlineButton || ''} onChange={(e) => updateDraftField('hero', 'outlineButton', e.target.value)} /></div>
          </div>
        )}

        {activeSection === 'stats' && (
          <div className="admin-section">
            {currentData.stats?.map((stat, idx) => (
              <div key={idx} className="admin-card-item">
                <h4>Stat #{idx + 1}</h4>
                <div className="admin-field"><label>Value</label><input disabled={!isEditing} value={stat.value} onChange={(e) => updateDraftArrayItem('stats', null, idx, 'value', e.target.value)} /></div>
                <div className="admin-field"><label>Label</label><input disabled={!isEditing} value={stat.label} onChange={(e) => updateDraftArrayItem('stats', null, idx, 'label', e.target.value)} /></div>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'services' && (
          <div className="admin-section">
            <div className="admin-field"><label>Section Title</label><input disabled={!isEditing} value={currentData.services?.title || ''} onChange={(e) => updateDraftField('services', 'title', e.target.value)} /></div>
            {currentData.services?.items?.map((item, idx) => (
              <div key={idx} className="admin-card-item">
                <h4>Service #{idx + 1}</h4>
                <div className="admin-field"><label>Title</label><input disabled={!isEditing} value={item.title} onChange={(e) => updateDraftArrayItem('services', 'items', idx, 'title', e.target.value)} /></div>
                <div className="admin-field"><label>Description</label><textarea disabled={!isEditing} rows="2" value={item.description} onChange={(e) => updateDraftArrayItem('services', 'items', idx, 'description', e.target.value)} /></div>
                <div className="admin-field"><label>Icon</label><input disabled={!isEditing} value={item.icon} onChange={(e) => updateDraftArrayItem('services', 'items', idx, 'icon', e.target.value)} /></div>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'portfolio' && (
          <div className="admin-section">
            <div className="admin-field"><label>Section Title</label><input disabled={!isEditing} value={currentData.portfolio?.title || ''} onChange={(e) => updateDraftField('portfolio', 'title', e.target.value)} /></div>
            {currentData.portfolio?.items?.map((item, idx) => (
              <div key={idx} className="admin-card-item">
                <h4>Project #{idx + 1}</h4>
                <div className="admin-field"><label>Title</label><input disabled={!isEditing} value={item.title} onChange={(e) => updateDraftArrayItem('portfolio', 'items', idx, 'title', e.target.value)} /></div>
                <div className="admin-field"><label>Subtitle</label><input disabled={!isEditing} value={item.subtitle} onChange={(e) => updateDraftArrayItem('portfolio', 'items', idx, 'subtitle', e.target.value)} /></div>
                <div className="admin-field"><label>Image Key</label><input disabled={!isEditing} value={item.imageKey} onChange={(e) => updateDraftArrayItem('portfolio', 'items', idx, 'imageKey', e.target.value)} /></div>
                <div className="admin-field"><label>Link</label><input disabled={!isEditing} value={item.link || ''} onChange={(e) => updateDraftArrayItem('portfolio', 'items', idx, 'link', e.target.value)} /></div>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'cta' && (
          <div className="admin-section">
            <div className="admin-field"><label>Title</label><textarea disabled={!isEditing} rows="2" value={currentData.cta?.title || ''} onChange={(e) => updateDraftField('cta', 'title', e.target.value)} /></div>
            <div className="admin-field"><label>Subtitle</label><textarea disabled={!isEditing} rows="3" value={currentData.cta?.subtitle || ''} onChange={(e) => updateDraftField('cta', 'subtitle', e.target.value)} /></div>
            <div className="admin-field"><label>Button Text</label><input disabled={!isEditing} value={currentData.cta?.button || ''} onChange={(e) => updateDraftField('cta', 'button', e.target.value)} /></div>
          </div>
        )}

        {activeSection === 'contact' && (
          <div className="admin-section">
            <div className="admin-field"><label>Section Title</label><input disabled={!isEditing} value={currentData.contact?.title || ''} onChange={(e) => updateDraftField('contact', 'title', e.target.value)} /></div>
            <div className="admin-field"><label>Full Name Label</label><input disabled={!isEditing} value={currentData.contact?.fullName || ''} onChange={(e) => updateDraftField('contact', 'fullName', e.target.value)} /></div>
            <div className="admin-field"><label>Phone Label</label><input disabled={!isEditing} value={currentData.contact?.phoneNumber || ''} onChange={(e) => updateDraftField('contact', 'phoneNumber', e.target.value)} /></div>
            <div className="admin-field"><label>Message Label</label><input disabled={!isEditing} value={currentData.contact?.message || ''} onChange={(e) => updateDraftField('contact', 'message', e.target.value)} /></div>
            <div className="admin-field"><label>Button Text</label><input disabled={!isEditing} value={currentData.contact?.button || ''} onChange={(e) => updateDraftField('contact', 'button', e.target.value)} /></div>
            <div className="admin-field"><label>Info Title</label><input disabled={!isEditing} value={currentData.contact?.infoTitle || ''} onChange={(e) => updateDraftField('contact', 'infoTitle', e.target.value)} /></div>
            <div className="admin-field"><label>Address</label><input disabled={!isEditing} value={currentData.contact?.address || ''} onChange={(e) => updateDraftField('contact', 'address', e.target.value)} /></div>
            <div className="admin-field"><label>Phone Number</label><input disabled={!isEditing} value={currentData.contact?.phone || ''} onChange={(e) => updateDraftField('contact', 'phone', e.target.value)} /></div>
            <div className="admin-field"><label>Email</label><input disabled={!isEditing} value={currentData.contact?.email || ''} onChange={(e) => updateDraftField('contact', 'email', e.target.value)} /></div>
          </div>
        )}

        {activeSection === 'footer' && (
          <div className="admin-section">
            <div className="admin-field"><label>Brand Description</label><input disabled={!isEditing} value={currentData.footer?.brandDescription || ''} onChange={(e) => updateDraftField('footer', 'brandDescription', e.target.value)} /></div>
            <div className="admin-field"><label>Quick Links (comma separated)</label><input disabled={!isEditing} value={currentData.footer?.quickLinks?.join(', ') || ''} onChange={(e) => updateFooterLinks(e.target.value)} /></div>
            <div className="admin-field"><label>Contact Title</label><input disabled={!isEditing} value={currentData.footer?.contactTitle || ''} onChange={(e) => updateDraftField('footer', 'contactTitle', e.target.value)} /></div>
            <div className="admin-field"><label>Address</label><input disabled={!isEditing} value={currentData.footer?.address || ''} onChange={(e) => updateDraftField('footer', 'address', e.target.value)} /></div>
            <div className="admin-field"><label>Phone</label><input disabled={!isEditing} value={currentData.footer?.phone || ''} onChange={(e) => updateDraftField('footer', 'phone', e.target.value)} /></div>
            <div className="admin-field"><label>Follow Title</label><input disabled={!isEditing} value={currentData.footer?.followTitle || ''} onChange={(e) => updateDraftField('footer', 'followTitle', e.target.value)} /></div>
            <div className="admin-field"><label>WhatsApp Label</label><input disabled={!isEditing} value={currentData.footer?.socialWhatsApp || ''} onChange={(e) => updateDraftField('footer', 'socialWhatsApp', e.target.value)} /></div>
            <div className="admin-field"><label>Facebook Label</label><input disabled={!isEditing} value={currentData.footer?.socialFacebook || ''} onChange={(e) => updateDraftField('footer', 'socialFacebook', e.target.value)} /></div>
            <div className="admin-field"><label>Copyright Text</label><input disabled={!isEditing} value={currentData.footer?.copyright || ''} onChange={(e) => updateDraftField('footer', 'copyright', e.target.value)} /></div>
          </div>
        )}

        {activeSection === 'json' && (
          <div className="admin-section">
            <textarea
              rows="20"
              className="admin-json-editor"
              value={jsonText}
              readOnly={!isEditing}
              onChange={(e) => handleJsonChange(e.target.value)}
            />
            <p className="admin-hint">Edit raw JSON directly. Save to apply changes.</p>
          </div>
        )}
      </main>
      </div>
    </div>
  );
};

export default AdminPage;
