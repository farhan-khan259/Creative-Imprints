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

  const updatePricingItem = (index, field, value) => {
    setDraftContent((prev) => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        items: prev.pricing.items.map((item, idx) =>
          idx === index ? { ...item, [field]: value } : item
        ),
      },
    }));
  };

  const updateBuiltDifferentItem = (index, field, value) => {
    setDraftContent((prev) => ({
      ...prev,
      builtDifferent: {
        ...prev.builtDifferent,
        items: prev.builtDifferent.items.map((item, idx) =>
          idx === index ? { ...item, [field]: value } : item
        ),
      },
    }));
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
    hero: 'Hero Section',
    stats: 'Statistics',
    studio: 'Studio Section',
    expertise: 'Expertise Services',
    builtDifferent: 'Built Different Features',
    pricing: 'Pricing Plans',
    finalCta: 'Final CTA',
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
        brandTag={content.navbar?.brandTag || 'Cinematic Digital Studio'}
      />
      <div className="admin-layout">
        <aside className={`admin-sidebar ${sidebarOpen ? 'show' : ''}`}>
          <h3 style={{ marginBottom: '24px' }}>⚙️ Admin Panel</h3>
          {['hero', 'stats', 'studio', 'expertise', 'builtDifferent', 'pricing', 'finalCta', 'footer', 'json'].map((section) => (
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

          {activeSection === 'hero' && (
            <div className="admin-section">
              <div className="admin-field"><label>Title</label><textarea disabled={!isEditing} rows="3" value={currentData.hero?.title || ''} onChange={(e) => updateDraftField('hero', 'title', e.target.value)} /></div>
              <div className="admin-field"><label>Subtitle</label><textarea disabled={!isEditing} rows="3" value={currentData.hero?.subtitle || ''} onChange={(e) => updateDraftField('hero', 'subtitle', e.target.value)} /></div>
              <div className="admin-field"><label>Button Text</label><input disabled={!isEditing} value={currentData.hero?.button || ''} onChange={(e) => updateDraftField('hero', 'button', e.target.value)} /></div>
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

          {activeSection === 'studio' && (
            <div className="admin-section">
              <div className="admin-field"><label>Title</label><input disabled={!isEditing} value={currentData.studio?.title || ''} onChange={(e) => updateDraftField('studio', 'title', e.target.value)} /></div>
              <div className="admin-field"><label>Subtitle</label><textarea disabled={!isEditing} rows="3" value={currentData.studio?.subtitle || ''} onChange={(e) => updateDraftField('studio', 'subtitle', e.target.value)} /></div>
              <div className="admin-field"><label>Vision</label><textarea disabled={!isEditing} rows="3" value={currentData.studio?.vision || ''} onChange={(e) => updateDraftField('studio', 'vision', e.target.value)} /></div>
              <div className="admin-field"><label>Mission</label><textarea disabled={!isEditing} rows="3" value={currentData.studio?.mission || ''} onChange={(e) => updateDraftField('studio', 'mission', e.target.value)} /></div>
            </div>
          )}

          {activeSection === 'expertise' && (
            <div className="admin-section">
              <div className="admin-field"><label>Section Title</label><input disabled={!isEditing} value={currentData.expertise?.title || ''} onChange={(e) => updateDraftField('expertise', 'title', e.target.value)} /></div>
              <div className="admin-field"><label>Section Subtitle</label><textarea disabled={!isEditing} rows="2" value={currentData.expertise?.subtitle || ''} onChange={(e) => updateDraftField('expertise', 'subtitle', e.target.value)} /></div>
              {currentData.expertise?.items?.map((item, idx) => (
                <div key={idx} className="admin-card-item">
                  <h4>Service #{idx + 1}</h4>
                  <div className="admin-field"><label>Title</label><input disabled={!isEditing} value={item.title} onChange={(e) => updateDraftArrayItem('expertise', 'items', idx, 'title', e.target.value)} /></div>
                  <div className="admin-field"><label>Description</label><textarea disabled={!isEditing} rows="2" value={item.description} onChange={(e) => updateDraftArrayItem('expertise', 'items', idx, 'description', e.target.value)} /></div>
                  <div className="admin-field"><label>Icon (emoji)</label><input disabled={!isEditing} value={item.icon} onChange={(e) => updateDraftArrayItem('expertise', 'items', idx, 'icon', e.target.value)} /></div>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'builtDifferent' && (
            <div className="admin-section">
              <div className="admin-field"><label>Section Title</label><input disabled={!isEditing} value={currentData.builtDifferent?.title || ''} onChange={(e) => updateDraftField('builtDifferent', 'title', e.target.value)} /></div>
              {currentData.builtDifferent?.items?.map((item, idx) => (
                <div key={idx} className="admin-card-item">
                  <h4>Feature #{idx + 1}</h4>
                  <div className="admin-field"><label>Title</label><input disabled={!isEditing} value={item.title} onChange={(e) => updateBuiltDifferentItem(idx, 'title', e.target.value)} /></div>
                  <div className="admin-field"><label>Description</label><textarea disabled={!isEditing} rows="2" value={item.description} onChange={(e) => updateBuiltDifferentItem(idx, 'description', e.target.value)} /></div>
                  <div className="admin-field"><label>Icon (emoji)</label><input disabled={!isEditing} value={item.icon} onChange={(e) => updateBuiltDifferentItem(idx, 'icon', e.target.value)} /></div>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'pricing' && (
            <div className="admin-section">
              <div className="admin-field"><label>Section Title</label><input disabled={!isEditing} value={currentData.pricing?.title || ''} onChange={(e) => updateDraftField('pricing', 'title', e.target.value)} /></div>
              {currentData.pricing?.items?.map((item, idx) => (
                <div key={idx} className="admin-card-item">
                  <h4>Plan #{idx + 1}</h4>
                  <div className="admin-field"><label>Name</label><input disabled={!isEditing} value={item.name} onChange={(e) => updatePricingItem(idx, 'name', e.target.value)} /></div>
                  <div className="admin-field"><label>Price</label><input disabled={!isEditing} value={item.price} onChange={(e) => updatePricingItem(idx, 'price', e.target.value)} /></div>
                  <div className="admin-field"><label>Description</label><input disabled={!isEditing} value={item.description} onChange={(e) => updatePricingItem(idx, 'description', e.target.value)} /></div>
                  <div className="admin-field"><label>Button Text</label><input disabled={!isEditing} value={item.buttonText} onChange={(e) => updatePricingItem(idx, 'buttonText', e.target.value)} /></div>
                  <div className="admin-field"><label>Button Link</label><input disabled={!isEditing} value={item.buttonLink} onChange={(e) => updatePricingItem(idx, 'buttonLink', e.target.value)} /></div>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'finalCta' && (
            <div className="admin-section">
              <div className="admin-field"><label>Title</label><input disabled={!isEditing} value={currentData.finalCta?.title || ''} onChange={(e) => updateDraftField('finalCta', 'title', e.target.value)} /></div>
              <div className="admin-field"><label>Subtitle</label><textarea disabled={!isEditing} rows="2" value={currentData.finalCta?.subtitle || ''} onChange={(e) => updateDraftField('finalCta', 'subtitle', e.target.value)} /></div>
              <div className="admin-field"><label>Email Button Text</label><input disabled={!isEditing} value={currentData.finalCta?.emailButton || ''} onChange={(e) => updateDraftField('finalCta', 'emailButton', e.target.value)} /></div>
              <div className="admin-field"><label>Email Link</label><input disabled={!isEditing} value={currentData.finalCta?.emailLink || ''} onChange={(e) => updateDraftField('finalCta', 'emailLink', e.target.value)} /></div>
              <div className="admin-field"><label>Schedule Button Text</label><input disabled={!isEditing} value={currentData.finalCta?.scheduleButton || ''} onChange={(e) => updateDraftField('finalCta', 'scheduleButton', e.target.value)} /></div>
              <div className="admin-field"><label>Schedule Link</label><input disabled={!isEditing} value={currentData.finalCta?.scheduleLink || ''} onChange={(e) => updateDraftField('finalCta', 'scheduleLink', e.target.value)} /></div>
            </div>
          )}

          {activeSection === 'footer' && (
            <div className="admin-section">
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