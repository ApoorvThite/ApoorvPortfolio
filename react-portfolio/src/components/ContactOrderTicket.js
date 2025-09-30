import React, { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const Toast = ({ message, onClose }) => (
  <div className="fixed bottom-6 right-6 z-50">
    <div className="bg-gray-900 border border-dark-border text-dark-text px-4 py-3 rounded-lg shadow-glow-cyan flex items-center gap-3">
      <span>✅</span>
      <span>{message}</span>
      <button onClick={onClose} className="ml-3 text-accent-cyan hover:underline">Close</button>
    </div>
  </div>
);

const ContactOrderTicket = () => {
  const prefersReducedMotion = useReducedMotion();
  const [form, setForm] = useState({
    name: '',
    contact: '',
    intent: 'Interview',
    message: '',
    consent: false,
    attachment: null,
    honey: '' // honeypot
  });
  const [charCount, setCharCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState(null);

  const intents = ['Interview', 'Collaboration', 'Research', 'Mentorship', 'Speaking', 'Other'];

  const emailObfuscated = useMemo(() => {
    // Simple obfuscation split
    const u = 'apoorv';
    const d = 'thite';
    const dom = 'gmail.com';
    return `${u}${'.'}${d}@${dom}`;
  }, []);

  const isEmail = (v) => /.+@.+\..+/.test(v);
  const isLinkedIn = (v) => /^https?:\/\/(www\.)?linkedin\.com\//i.test(v);

  const validate = () => {
    if (!form.name.trim()) return 'Please enter your name or organization.';
    if (!form.contact.trim()) return 'Please enter an email or LinkedIn URL.';
    if (!(isEmail(form.contact) || isLinkedIn(form.contact))) return 'Contact must be a valid email or LinkedIn URL.';
    if (form.message.trim().length < 20) return 'Please provide a bit more detail (>= 20 chars).';
    if (!form.consent) return 'Please provide consent to be contacted.';
    if (form.attachment && form.attachment.type !== 'application/pdf') return 'Only PDF attachments are accepted.';
    if (form.honey) return 'Bot detected.';
    return null;
  };

  const onDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setForm((f) => ({ ...f, attachment: file }));
      } else {
        setToast('Only PDF attachments are accepted.');
      }
    }
  };

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setForm((f) => ({ ...f, attachment: file }));
      } else {
        setToast('Only PDF attachments are accepted.');
        e.target.value = '';
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setToast(err);
      return;
    }
    setSubmitting(true);
    // Simulate request
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setToast('Order received. I\'ll confirm within 2 business days.');
    }, 900);
  };

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { when: 'beforeChildren', staggerChildren: prefersReducedMotion ? 0 : 0.08 } }
  };
  const item = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="visible" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left: Order Ticket */}
      <motion.div variants={item} className="lg:col-span-7 panel panel-glow">
        <div className="mb-3">
          <div className="text-xs uppercase tracking-wider text-accent-cyan">Contact / Open a Position</div>
          <h3 className="text-2xl font-bold text-dark-text mt-1">Want to invest in me?</h3>
          <p className="text-dark-muted">Let\'s ship something great—reach out below or book time directly.</p>
        </div>

        {!submitted ? (
          <form onSubmit={onSubmit} className="space-y-4" noValidate>
            {/* Name / Org */}
            <div>
              <label className="block text-sm text-dark-muted mb-1">Name / Org</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-gray-800 border border-dark-border rounded px-3 py-2 text-dark-text"
                placeholder="Jane Doe @ Example Corp"
              />
            </div>

            {/* Contact */}
            <div>
              <label className="block text-sm text-dark-muted mb-1">Contact (email or LinkedIn URL)</label>
              <input
                type="text"
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                className="w-full bg-gray-800 border border-dark-border rounded px-3 py-2 text-dark-text"
                placeholder="jane@company.com or https://linkedin.com/in/..."
              />
            </div>

            {/* Intent */}
            <div>
              <label className="block text-sm text-dark-muted mb-1">Intent</label>
              <select
                value={form.intent}
                onChange={(e) => setForm({ ...form, intent: e.target.value })}
                className="w-full bg-gray-800 border border-dark-border rounded px-3 py-2 text-dark-text"
              >
                {intents.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm text-dark-muted mb-1">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => { setForm({ ...form, message: e.target.value }); setCharCount(e.target.value.length); }}
                rows={5}
                maxLength={600}
                className="w-full bg-gray-800 border border-dark-border rounded px-3 py-2 text-dark-text"
                placeholder="Quick context (300–500 chars recommended)."
              />
              <div className="text-xs text-dark-muted mt-1">{charCount} / 600</div>
            </div>

            {/* Attachments */}
            <div>
              <label className="block text-sm text-dark-muted mb-1">Attachment (PDF only, optional)</label>
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={onDrop}
                className="border-2 border-dashed border-dark-border rounded p-4 bg-gray-800 text-dark-muted"
              >
                <div className="flex items-center justify-between">
                  <div>
                    {form.attachment ? (
                      <span className="text-dark-text">{form.attachment.name}</span>
                    ) : (
                      <span>Drag & drop PDF here or choose a file</span>
                    )}
                  </div>
                  <label className="px-3 py-1 bg-gray-700 text-gray-200 rounded cursor-pointer">
                    Browse
                    <input type="file" accept="application/pdf" className="hidden" onChange={onFileChange} />
                  </label>
                </div>
              </div>
            </div>

            {/* Consent */}
            <div className="flex items-center gap-2">
              <input id="consent" type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} />
              <label htmlFor="consent" className="text-sm text-dark-muted">You can contact me about this inquiry.</label>
            </div>

            {/* Honeypot */}
            <div className="hidden">
              <label>Leave this empty</label>
              <input type="text" value={form.honey} onChange={(e) => setForm({ ...form, honey: e.target.value })} />
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <motion.button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 rounded bg-accent-blue text-white hover:bg-opacity-90 disabled:opacity-60"
                whileHover={{ scale: prefersReducedMotion ? 1 : 1.03 }}
                whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
              >
                {submitting ? 'Sending…' : 'Send order'}
              </motion.button>

              <motion.a
                href="https://calendly.com/apoorvthite/intro"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded border border-accent-cyan text-accent-cyan hover:bg-accent-cyan hover:text-dark-bg"
                whileHover={{ scale: prefersReducedMotion ? 1 : 1.03 }}
                whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
              >
                Book a call
              </motion.a>
            </div>
          </form>
        ) : (
          <div className="bg-gray-800 border border-dark-border rounded p-6 text-dark-text">
            <div className="text-lg font-semibold mb-1">Order received.</div>
            <div className="text-dark-muted">I\'ll confirm within 2 business days.</div>
          </div>
        )}
      </motion.div>

      {/* Right: IR / Quick Links */}
      <motion.aside variants={item} className="lg:col-span-5 panel">
        <div className="space-y-4">
          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-dark-text mb-2">IR / Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="bg-gray-800 border border-dark-border rounded p-3 hover:border-accent-cyan transition-colors">📄 Resume</a>
              <button onClick={() => { navigator.clipboard.writeText(emailObfuscated); setToast('Email copied'); }} className="bg-gray-800 border border-dark-border rounded p-3 hover:border-accent-cyan transition-colors">✉️ Email</button>
              <a href="https://github.com/ApoorvThite" target="_blank" rel="noopener noreferrer" className="bg-gray-800 border border-dark-border rounded p-3 hover:border-accent-cyan transition-colors">🐙 GitHub</a>
              <a href="https://linkedin.com/in/apoorvthite21" target="_blank" rel="noopener noreferrer" className="bg-gray-800 border border-dark-border rounded p-3 hover:border-accent-cyan transition-colors">💼 LinkedIn</a>
              <a href="/press-kit.zip" className="bg-gray-800 border border-dark-border rounded p-3 hover:border-accent-cyan transition-colors">🧰 Press Kit</a>
              <a href="https://calendly.com/apoorvthite/intro" target="_blank" rel="noopener noreferrer" className="bg-gray-800 border border-dark-border rounded p-3 hover:border-accent-cyan transition-colors">🗓 Office Hours</a>
            </div>
          </div>

          {/* Signal Chips */}
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-2 py-1 rounded-full bg-gray-800 border border-dark-border text-dark-muted">Response SLA: &lt;48h</span>
            <span className="px-2 py-1 rounded-full bg-gray-800 border border-dark-border text-dark-muted">Preferred: AI/ML, DS, FinTech, Research</span>
            <span className="px-2 py-1 rounded-full bg-gray-800 border border-dark-border text-dark-muted">Based in: US (ET)</span>
          </div>

          {/* Analyst Notes */}
          <div>
            <h4 className="text-sm font-semibold text-dark-text mb-2">Analyst Notes</h4>
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
              <li>Deployed NLP on 5M+ docs; latency ↓50%</li>
              <li>Parkinson’s dual-modal: 96–97% acc with SHAP</li>
              <li>AWS SageMaker + CI/CD, React dashboards</li>
            </ul>
          </div>
        </div>
      </motion.aside>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </motion.div>
  );
};

export default ContactOrderTicket;
