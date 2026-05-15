// src/components/AdminPage.js
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

  // Sync when parent content changes
  useEffect(() => {
    setSavedContent(content);
    setDraftContent(content);
    setJsonText(JSON.stringify(content, null, 2));
    setEditingSection(null);
  }, [content]);

  // Clear editing when switching sections
  useEffect(() => {
    setEditingSection(null);
  }, [activeSection]);

  // Update JSON text when draft changes and JSON tab is active
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

  // Generic field updater for a section
  const updateDraftField = (section, field, value) => {
    setDraftContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  // Updater for array items inside a section (e.g., stats, expertise items)
  const updateDraftArrayItem = (section, arrayName, index, field, value) => {
    setDraftContent(prev => {
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

  // Updaters for specific complex sections
  const updatePricingItem = (index, field, value) => {
    // Pricing section not currently used, but kept for compatibility
  };

  const updateBuiltDifferentItem = (index, field, value) => {
    setDraftContent(prev => ({
      ...prev,
      builtDifferent: {
        ...prev.builtDifferent,
        items: prev.builtDifferent.items.map((item, idx) =>
          idx === index ? { ...item, [field]: value } : item
        ),
      },
    }));
  };

  const updateTestimonialItem = (index, field, value) => {
    setDraftContent(prev => ({
      ...prev,
      testimonials: {
        ...prev.testimonials,
        items: prev.testimonials.items.map((item, idx) =>
          idx === index ? { ...item, [field]: value } : item
        ),
      },
    }));
  };

  const updatePortfolioItem = (index, field, value) => {
    setDraftContent(prev => ({
      ...prev,
      portfolio: {
        ...prev.portfolio,
        items: prev.portfolio.items.map((item, idx) =>
          idx === index ? { ...item, [field]: value } : item
        ),
      },
    }));
  };

  const updateFinalCtaFormLabel = (field, value) => {
    setDraftContent(prev => ({
      ...prev,
      finalCta: {
        ...prev.finalCta,
        formLabels: {
          ...prev.finalCta.formLabels,
          [field]: value,
        },
      },
    }));
  };

  // JSON editing
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

  // Helper to convert array of strings to textarea lines
  const arrayToLines = (arr) => (arr || []).join('\n');
  const linesToArray = (str) => str.split('\n').map(s => s.trim()).filter(Boolean);

  // Sidebar section titles
  const sectionTitle = {
    navbar: 'Navigation Bar',
    hero: 'Hero Section',
    stats: 'Statistics',
    studio: 'Studio Section',
    expertise: 'Expertise Services',
    builtDifferent: 'Built Different Features',
    testimonials: 'Testimonials',
    portfolio: 'Portfolio',
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
          {['navbar', 'hero', 'stats', 'studio', 'expertise', 'builtDifferent', 'testimonials', 'portfolio', 'finalCta', 'footer', 'json'].map(section => (
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

          {/* NAVBAR */}
          {activeSection === 'navbar' && (
            <div className="admin-section">
              <div className="admin-field">
                <label>Brand Name</label>
                <input disabled={!isEditing} value={currentData.navbar?.brandName || ''} onChange={e => updateDraftField('navbar', 'brandName', e.target.value)} />
              </div>
              <div className="admin-field">
                <label>Brand Tag</label>
                <input disabled={!isEditing} value={currentData.navbar?.brandTag || ''} onChange={e => updateDraftField('navbar', 'brandTag', e.target.value)} />
              </div>
              <h4 style={{ marginTop: '24px', marginBottom: '16px', color: 'var(--cyan-accent)' }}>Navigation Links</h4>
              {currentData.navbar?.links?.map((link, idx) => (
                <div key={idx} className="admin-card-item">
                  <h4>Link #{idx + 1}</h4>
                  <div className="admin-field">
                    <label>Label</label>
                    <input disabled={!isEditing} value={link.label || ''} onChange={e => updateDraftArrayItem('navbar', 'links', idx, 'label', e.target.value)} />
                  </div>
                  <div className="admin-field">
                    <label>Target (section ID, e.g. 'about')</label>
                    <input disabled={!isEditing} value={link.target || ''} onChange={e => updateDraftArrayItem('navbar', 'links', idx, 'target', e.target.value)} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* HERO */}
          {activeSection === 'hero' && (
            <div className="admin-section">
              <div className="admin-field"><label>Title</label><textarea disabled={!isEditing} rows="3" value={currentData.hero?.title || ''} onChange={e => updateDraftField('hero', 'title', e.target.value)} /></div>
              <div className="admin-field"><label>Subtitle</label><textarea disabled={!isEditing} rows="3" value={currentData.hero?.subtitle || ''} onChange={e => updateDraftField('hero', 'subtitle', e.target.value)} /></div>
              <div className="admin-field"><label>Button Text</label><input disabled={!isEditing} value={currentData.hero?.button || ''} onChange={e => updateDraftField('hero', 'button', e.target.value)} /></div>
            </div>
          )}

          {/* STATS */}
          {activeSection === 'stats' && (
            <div className="admin-section">
              {currentData.stats?.map((stat, idx) => (
                <div key={idx} className="admin-card-item">
                  <h4>Stat #{idx + 1}</h4>
                  <div className="admin-field"><label>Value</label><input disabled={!isEditing} value={stat.value} onChange={e => updateDraftArrayItem('stats', null, idx, 'value', e.target.value)} /></div>
                  <div className="admin-field"><label>Label</label><input disabled={!isEditing} value={stat.label} onChange={e => updateDraftArrayItem('stats', null, idx, 'label', e.target.value)} /></div>
                </div>
              ))}
            </div>
          )}

          {/* STUDIO */}
          {activeSection === 'studio' && (
            <div className="admin-section">
              <div className="admin-field"><label>Title</label><input disabled={!isEditing} value={currentData.studio?.title || ''} onChange={e => updateDraftField('studio', 'title', e.target.value)} /></div>
              <div className="admin-field"><label>Subtitle</label><textarea disabled={!isEditing} rows="3" value={currentData.studio?.subtitle || ''} onChange={e => updateDraftField('studio', 'subtitle', e.target.value)} /></div>
              <div className="admin-field"><label>Vision</label><textarea disabled={!isEditing} rows="3" value={currentData.studio?.vision || ''} onChange={e => updateDraftField('studio', 'vision', e.target.value)} /></div>
              <div className="admin-field"><label>Mission</label><textarea disabled={!isEditing} rows="3" value={currentData.studio?.mission || ''} onChange={e => updateDraftField('studio', 'mission', e.target.value)} /></div>
            </div>
          )}

          {/* EXPERTISE */}
          {activeSection === 'expertise' && (
            <div className="admin-section">
              <div className="admin-field"><label>Section Title</label><input disabled={!isEditing} value={currentData.expertise?.title || ''} onChange={e => updateDraftField('expertise', 'title', e.target.value)} /></div>
              <div className="admin-field"><label>Section Subtitle</label><textarea disabled={!isEditing} rows="2" value={currentData.expertise?.subtitle || ''} onChange={e => updateDraftField('expertise', 'subtitle', e.target.value)} /></div>
              {currentData.expertise?.items?.map((item, idx) => (
                <div key={idx} className="admin-card-item">
                  <h4>Service #{idx + 1}</h4>
                  <div className="admin-field"><label>Title</label><input disabled={!isEditing} value={item.title} onChange={e => updateDraftArrayItem('expertise', 'items', idx, 'title', e.target.value)} /></div>
                  <div className="admin-field"><label>Description</label><textarea disabled={!isEditing} rows="2" value={item.description} onChange={e => updateDraftArrayItem('expertise', 'items', idx, 'description', e.target.value)} /></div>
                  <div className="admin-field"><label>Icon (emoji)</label><input disabled={!isEditing} value={item.icon} onChange={e => updateDraftArrayItem('expertise', 'items', idx, 'icon', e.target.value)} /></div>
                </div>
              ))}
            </div>
          )}

          {/* BUILT DIFFERENT */}
          {activeSection === 'builtDifferent' && (
            <div className="admin-section">
              <div className="admin-field"><label>Section Title</label><input disabled={!isEditing} value={currentData.builtDifferent?.title || ''} onChange={e => updateDraftField('builtDifferent', 'title', e.target.value)} /></div>
              {currentData.builtDifferent?.items?.map((item, idx) => (
                <div key={idx} className="admin-card-item">
                  <h4>Feature #{idx + 1}</h4>
                  <div className="admin-field"><label>Title</label><input disabled={!isEditing} value={item.title} onChange={e => updateBuiltDifferentItem(idx, 'title', e.target.value)} /></div>
                  <div className="admin-field"><label>Description</label><textarea disabled={!isEditing} rows="2" value={item.description} onChange={e => updateBuiltDifferentItem(idx, 'description', e.target.value)} /></div>
                  <div className="admin-field"><label>Icon (emoji)</label><input disabled={!isEditing} value={item.icon} onChange={e => updateBuiltDifferentItem(idx, 'icon', e.target.value)} /></div>
                </div>
              ))}
            </div>
          )}

          {/* TESTIMONIALS */}
          {activeSection === 'testimonials' && (
            <div className="admin-section">
              <div className="admin-field"><label>Section Label</label><input disabled={!isEditing} value={currentData.testimonials?.label || ''} onChange={e => updateDraftField('testimonials', 'label', e.target.value)} /></div>
              <div className="admin-field"><label>Title</label><input disabled={!isEditing} value={currentData.testimonials?.title || ''} onChange={e => updateDraftField('testimonials', 'title', e.target.value)} /></div>
              {currentData.testimonials?.items?.map((item, idx) => (
                <div key={idx} className="admin-card-item">
                  <h4>Testimonial #{idx + 1}</h4>
                  <div className="admin-field"><label>Quote</label><textarea disabled={!isEditing} rows="3" value={item.quote} onChange={e => updateTestimonialItem(idx, 'quote', e.target.value)} /></div>
                  <div className="admin-field"><label>Name</label><input disabled={!isEditing} value={item.name} onChange={e => updateTestimonialItem(idx, 'name', e.target.value)} /></div>
                  <div className="admin-field"><label>Role</label><input disabled={!isEditing} value={item.role} onChange={e => updateTestimonialItem(idx, 'role', e.target.value)} /></div>
                  <div className="admin-field"><label>Avatar (first letter)</label><input disabled={!isEditing} value={item.avatar} onChange={e => updateTestimonialItem(idx, 'avatar', e.target.value)} /></div>
                </div>
              ))}
            </div>
          )}

          {/* PORTFOLIO */}
          {activeSection === 'portfolio' && (
            <div className="admin-section">
              <div className="admin-field"><label>Section Label</label><input disabled={!isEditing} value={currentData.portfolio?.label || ''} onChange={e => updateDraftField('portfolio', 'label', e.target.value)} /></div>
              <div className="admin-field"><label>Title</label><input disabled={!isEditing} value={currentData.portfolio?.title || ''} onChange={e => updateDraftField('portfolio', 'title', e.target.value)} /></div>
              <div className="admin-field">
                <label>Categories (one per line)</label>
                <textarea disabled={!isEditing} rows="4" value={arrayToLines(currentData.portfolio?.categories)} onChange={e => updateDraftField('portfolio', 'categories', linesToArray(e.target.value))} />
              </div>
              {currentData.portfolio?.items?.map((item, idx) => (
                <div key={idx} className="admin-card-item">
                  <h4>Project #{idx + 1}</h4>
                  <div className="admin-field"><label>Title</label><input disabled={!isEditing} value={item.title} onChange={e => updatePortfolioItem(idx, 'title', e.target.value)} /></div>
                  <div className="admin-field"><label>Subtitle</label><input disabled={!isEditing} value={item.subtitle} onChange={e => updatePortfolioItem(idx, 'subtitle', e.target.value)} /></div>
                  <div className="admin-field"><label>Category</label><input disabled={!isEditing} value={item.category} onChange={e => updatePortfolioItem(idx, 'category', e.target.value)} /></div>
                  <div className="admin-field"><label>Image filename (e.g. portfolio1.jpeg)</label><input disabled={!isEditing} value={item.image} onChange={e => updatePortfolioItem(idx, 'image', e.target.value)} /></div>
                </div>
              ))}
            </div>
          )}

          {/* FINAL CTA */}
          {activeSection === 'finalCta' && (
            <div className="admin-section">
              <div className="admin-field"><label>Label</label><input disabled={!isEditing} value={currentData.finalCta?.label || ''} onChange={e => updateDraftField('finalCta', 'label', e.target.value)} /></div>
              <div className="admin-field"><label>Title</label><input disabled={!isEditing} value={currentData.finalCta?.title || ''} onChange={e => updateDraftField('finalCta', 'title', e.target.value)} /></div>
              <div className="admin-field"><label>Subtitle</label><textarea disabled={!isEditing} rows="2" value={currentData.finalCta?.subtitle || ''} onChange={e => updateDraftField('finalCta', 'subtitle', e.target.value)} /></div>
              <div className="admin-field"><label>Email</label><input disabled={!isEditing} value={currentData.finalCta?.email || ''} onChange={e => updateDraftField('finalCta', 'email', e.target.value)} /></div>
              <div className="admin-field"><label>Phone</label><input disabled={!isEditing} value={currentData.finalCta?.phone || ''} onChange={e => updateDraftField('finalCta', 'phone', e.target.value)} /></div>
              <div className="admin-field"><label>Location</label><input disabled={!isEditing} value={currentData.finalCta?.location || ''} onChange={e => updateDraftField('finalCta', 'location', e.target.value)} /></div>
              <div className="admin-field"><label>WhatsApp label</label><input disabled={!isEditing} value={currentData.finalCta?.whatsapp || ''} onChange={e => updateDraftField('finalCta', 'whatsapp', e.target.value)} /></div>
              <h4 style={{ marginTop: '24px', marginBottom: '16px', color: 'var(--cyan-accent)' }}>Form Labels</h4>
              <div className="admin-field"><label>Name label</label><input disabled={!isEditing} value={currentData.finalCta?.formLabels?.name || ''} onChange={e => updateFinalCtaFormLabel('name', e.target.value)} /></div>
              <div className="admin-field"><label>Email label</label><input disabled={!isEditing} value={currentData.finalCta?.formLabels?.email || ''} onChange={e => updateFinalCtaFormLabel('email', e.target.value)} /></div>
              <div className="admin-field"><label>Project label</label><input disabled={!isEditing} value={currentData.finalCta?.formLabels?.project || ''} onChange={e => updateFinalCtaFormLabel('project', e.target.value)} /></div>
              <div className="admin-field"><label>Submit button text</label><input disabled={!isEditing} value={currentData.finalCta?.formLabels?.submit || ''} onChange={e => updateFinalCtaFormLabel('submit', e.target.value)} /></div>
            </div>
          )}

          {/* FOOTER */}
          {activeSection === 'footer' && (
            <div className="admin-section">
              <div className="admin-field"><label>Brand Name</label><input disabled={!isEditing} value={currentData.footer?.brandName || ''} onChange={e => updateDraftField('footer', 'brandName', e.target.value)} /></div>
              <div className="admin-field"><label>Tagline</label><input disabled={!isEditing} value={currentData.footer?.tagline || ''} onChange={e => updateDraftField('footer', 'tagline', e.target.value)} /></div>
              <div className="admin-field">
                <label>Navigate Links (one per line)</label>
                <textarea disabled={!isEditing} rows="4" value={arrayToLines(currentData.footer?.links?.navigate)} onChange={e => updateDraftField('footer', 'links', { ...currentData.footer?.links, navigate: linesToArray(e.target.value) })} />
              </div>
              <div className="admin-field"><label>Copyright</label><input disabled={!isEditing} value={currentData.footer?.copyright || ''} onChange={e => updateDraftField('footer', 'copyright', e.target.value)} /></div>
            </div>
          )}

          {/* JSON EDITOR */}
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