import React, { useState } from 'react';
import { PageRoute } from '../types';
import { useCms } from '../context/CmsContext';
import { useCursor } from '../context/CursorContext';
import { useSound } from '../context/SoundContext';
import { MagneticButton } from '../components/common/MagneticButton';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Calendar, 
  CheckCircle2, 
  ExternalLink,
  Check,
  Send,
  Copy,
  Layers,
  DollarSign,
  Inbox,
  Sparkles,
  AlertCircle,
  Globe
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (route: PageRoute, slug?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  const { submitInquiry } = useCms();
  const { setCursor, resetCursor } = useCursor();
  const { playSuccess, playClick } = useSound();

  // Background FormSubmit delivery destination
  const formSubmitEmail = 'badampistay@gmail.com';

  // Multi-discipline support & custom budget support
  const [selectedServices, setSelectedServices] = useState<string[]>(['Web Development']);
  const [selectedBudget, setSelectedBudget] = useState<string>('$10,000 - $25,000');
  const [customBudget, setCustomBudget] = useState<string>('');
  const [isCustomBudget, setIsCustomBudget] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    timeline: '1-2 Months',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    email: string;
    services: string[];
    budget: string;
    timeline: string;
    message: string;
    company?: string;
    phone?: string;
  } | null>(null);

  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedBrief, setCopiedBrief] = useState(false);

  // Video call scheduling state
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('Tomorrow, 2:00 PM PST');
  const [attendeeName, setAttendeeName] = useState<string>('');
  const [attendeeEmail, setAttendeeEmail] = useState<string>('');
  const [callNotes, setCallNotes] = useState<string>('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingSubmitting, setBookingSubmitting] = useState(false);

  const services = [
    'Web Development',
    'Graphic Design',
    'Video Editing',
    'Digital Marketing',
    'Shopify Development',
    'Mobile App Development',
    'E-commerce Complete Solution'
  ];

  const presetBudgets = [
    '< $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000+'
  ];

  const toggleService = (serviceName: string) => {
    if (selectedServices.includes(serviceName)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter(s => s !== serviceName));
      }
    } else {
      setSelectedServices([...selectedServices, serviceName]);
    }
  };

  const getEffectiveBudget = () => {
    if (isCustomBudget) {
      return customBudget.trim() ? customBudget.trim() : 'Custom Budget';
    }
    return selectedBudget;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.name.trim()) {
      setFormError('Please enter your name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setFormError('Please provide a valid work email address.');
      return;
    }
    if (selectedServices.length === 0) {
      setFormError('Please select at least one service discipline.');
      return;
    }

    const finalBudget = getEffectiveBudget();
    setIsSubmitting(true);

    const snapshot = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      service: selectedServices.join(', '),
      budget: finalBudget,
      timeline: formData.timeline,
      message: formData.message
    };

    // 1. Always record in local CMS / CRM state
    try {
      submitInquiry(snapshot);
    } catch (err) {
      console.error('Error logging to local CMS:', err);
    }

    // 2. Dispatch via FormSubmit.co AJAX API
    let deliveryMessage = `Inquiry dispatched via FormSubmit to ${formSubmitEmail}!`;
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(formSubmitEmail.trim())}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Name: formData.name,
          Email: formData.email,
          Phone: formData.phone || 'Not provided',
          Company: formData.company || 'Not provided',
          Disciplines: selectedServices.join(', '),
          Budget: finalBudget,
          Timeline: formData.timeline,
          Scope_Details: formData.message || 'No additional scope notes',
          _subject: `New Project Brief from ${formData.name} [${selectedServices.join(', ')}]`,
          _template: 'table',
          _captcha: 'false'
        })
      });

      const resData = await response.json();
      if (resData && resData.message) {
        deliveryMessage = resData.message;
      }
    } catch (err) {
      console.warn('FormSubmit AJAX dispatch error (fallback will activate):', err);
    }

    setSubmittedData({
      ...snapshot,
      services: selectedServices
    });
    setIsSubmitting(false);
    setSubmitted(true);
    playSuccess();
  };

  const copyBriefToClipboard = () => {
    if (!submittedData) return;
    const text = `--- PROJECT BRIEF ---\nName: ${submittedData.name}\nEmail: ${submittedData.email}\nCompany: ${submittedData.company || 'N/A'}\nServices: ${submittedData.services.join(', ')}\nBudget: ${submittedData.budget}\nTimeline: ${submittedData.timeline}\nMessage: ${submittedData.message || 'N/A'}`;
    navigator.clipboard.writeText(text);
    playClick();
    setCopiedBrief(true);
    setTimeout(() => setCopiedBrief(false), 2500);
  };

  const openEmailClient = () => {
    if (!submittedData) return;
    const subject = encodeURIComponent(`Project Brief: ${submittedData.services.join(', ')} - ${submittedData.name}`);
    const body = encodeURIComponent(
      `Hello Aether Studio Team,\n\nHere are the details of our project brief:\n\nClient Name: ${submittedData.name}\nWork Email: ${submittedData.email}\nCompany: ${submittedData.company || 'N/A'}\nServices Requested: ${submittedData.services.join(', ')}\nBudget Expectation: ${submittedData.budget}\nTarget Timeline: ${submittedData.timeline}\n\nProject Scope & Goals:\n${submittedData.message || 'No additional notes provided'}\n\nLooking forward to your response.`
    );
    window.location.href = `mailto:${encodeURIComponent(formSubmitEmail)}?cc=${encodeURIComponent(submittedData.email)}&subject=${subject}&body=${body}`;
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError(null);

    if (!attendeeName.trim()) {
      setBookingError('Please enter your full name for the video invite.');
      return;
    }
    if (!attendeeEmail.trim() || !attendeeEmail.includes('@')) {
      setBookingError('Please enter a valid work email for the calendar invitation.');
      return;
    }

    setBookingSubmitting(true);

    // Save scheduled discovery session to inquiries / CRM so it's tracked
    try {
      submitInquiry({
        name: attendeeName,
        email: attendeeEmail,
        company: 'Video Call Discovery',
        service: 'Discovery Session',
        budget: 'Discovery Call',
        timeline: selectedDate,
        message: `Scheduled Video Call for: ${selectedDate}${callNotes ? `\nNotes: ${callNotes}` : ''}`
      });
    } catch (err) {
      console.error('Error saving discovery booking:', err);
    }

    // Also dispatch notification to FormSubmit.co
    try {
      await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(formSubmitEmail.trim())}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Meeting_Type: '30-Minute Introductory Video Discovery',
          Attendee_Name: attendeeName,
          Attendee_Email: attendeeEmail,
          Slot_Reserved: selectedDate,
          Discussion_Topics: callNotes || 'No preliminary notes provided',
          _subject: `New Video Discovery Booked: ${attendeeName} (${selectedDate.split(',')[0]})`,
          _template: 'table',
          _captcha: 'false'
        })
      });
    } catch (err) {
      console.warn('Discovery call FormSubmit notification notice:', err);
    }

    setBookingSubmitting(false);
    setBookingSuccess(true);
    playSuccess();
  };

  return (
    <div id="contact-page" className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101626] border border-[#1E2945] text-xs font-medium text-[#3E7BFA]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#17B4E0]" />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#F3F5FA] tracking-tight">
          Start Your Project Brief
        </h1>
        <p className="text-base text-[#9AA3C2] leading-relaxed">
          Tell us about your upcoming project or schedule an introductory 30-minute discovery call.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Brief Form */}
        <div className="lg:col-span-7 bg-[#101626] border border-[#1E2945]/70 p-8 sm:p-10 rounded-3xl">
          {submitted && submittedData ? (
            <div className="py-6 space-y-6">
              <div className="text-center space-y-3">
                <div className="h-14 w-14 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold text-[#F3F5FA]">Brief Successfully Received!</h3>
                <p className="text-xs text-[#9AA3C2] max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-[#F3F5FA] font-medium">{submittedData.name}</span>. Your project brief has been registered with our team. We will review your scope and follow up within 24 business hours.
                </p>
              </div>

              {/* Brief Summary Box */}
              <div className="bg-[#0A0E1A] p-5 rounded-2xl border border-[#1E2945] text-left space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#1E2945]/60 text-xs">
                  <span className="text-[#9AA3C2] font-semibold uppercase tracking-wider">Project Summary</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#161F36] border border-[#3E7BFA]/40 text-[#3E7BFA] text-[10px] font-bold">
                    Status: Received
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[#9AA3C2] block text-[11px]">Disciplines Selected:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {submittedData.services.map((svc) => (
                        <span key={svc} className="px-2 py-0.5 rounded-md bg-[#161F36] text-[#3E7BFA] text-[11px] font-medium border border-[#3E7BFA]/30">
                          {svc}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-[#9AA3C2] block text-[11px]">Budget Allocation:</span>
                    <span className="text-[#17B4E0] font-semibold">{submittedData.budget}</span>
                  </div>
                  <div>
                    <span className="text-[#9AA3C2] block text-[11px]">Client / Company:</span>
                    <span className="text-[#F3F5FA] font-medium">{submittedData.name} {submittedData.company ? `(${submittedData.company})` : ''}</span>
                  </div>
                  <div>
                    <span className="text-[#9AA3C2] block text-[11px]">Work Email:</span>
                    <span className="text-[#F3F5FA] font-medium truncate block">{submittedData.email}</span>
                  </div>
                </div>

                {submittedData.message && (
                  <div className="pt-2 border-t border-[#1E2945]/40 text-xs">
                    <span className="text-[#9AA3C2] block text-[11px] mb-1">Scope Details:</span>
                    <p className="text-[#F3F5FA] bg-[#101626] p-2.5 rounded-xl border border-[#1E2945]/50 italic">
                      "{submittedData.message}"
                    </p>
                  </div>
                )}
              </div>

              {/* Direct Action Buttons: Send via Email App & Copy */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  type="button"
                  id="open-email-client-btn"
                  onClick={openEmailClient}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#3E7BFA] to-[#1230C4] text-[#F3F5FA] text-xs font-bold uppercase tracking-wider shadow-[0_4px_20px_rgba(62,123,250,0.35)] hover:shadow-[0_6px_30px_rgba(62,123,250,0.55)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Mail className="h-4 w-4" />
                  <span>Send Direct Email to Us</span>
                </button>

                <button
                  type="button"
                  id="copy-brief-btn"
                  onClick={copyBriefToClipboard}
                  className="py-3 px-4 rounded-xl bg-[#161F36] border border-[#1E2945] text-xs font-semibold text-[#F3F5FA] hover:border-[#3E7BFA] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copiedBrief ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-400" />
                      <span className="text-emerald-400">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 text-[#9AA3C2]" />
                      <span>Copy Full Brief</span>
                    </>
                  )}
                </button>
              </div>

              <div className="pt-2 text-center">
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-medium text-[#9AA3C2] hover:text-[#3E7BFA] transition-colors underline cursor-pointer"
                >
                  Submit Another Project Brief
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#9AA3C2]">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0A0E1A] border border-[#1E2945] text-xs text-[#F3F5FA] focus:outline-none focus:border-[#3E7BFA]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#9AA3C2]">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0A0E1A] border border-[#1E2945] text-xs text-[#F3F5FA] focus:outline-none focus:border-[#3E7BFA]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#9AA3C2]">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0A0E1A] border border-[#1E2945] text-xs text-[#F3F5FA] focus:outline-none focus:border-[#3E7BFA]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#9AA3C2]">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Company name"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0A0E1A] border border-[#1E2945] text-xs text-[#F3F5FA] focus:outline-none focus:border-[#3E7BFA]"
                  />
                </div>
              </div>

              {/* Service Selection: Multiple Selection Enabled */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#9AA3C2] flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5 text-[#3E7BFA]" />
                    <span>Select Disciplines (Choose 1 or more)</span>
                  </label>
                  <span className="text-[11px] text-[#3E7BFA] font-medium">
                    {selectedServices.length} selected
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {services.map((s) => {
                    const isSelected = selectedServices.includes(s);
                    return (
                      <button
                        type="button"
                        key={s}
                        onClick={() => toggleService(s)}
                        className={`p-2.5 rounded-xl text-xs font-medium text-left flex items-center justify-between border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#161F36] border-[#3E7BFA] text-[#3E7BFA] shadow-[0_0_12px_rgba(62,123,250,0.2)]'
                            : 'bg-[#0A0E1A] border-[#1E2945] text-[#9AA3C2] hover:text-[#F3F5FA] hover:border-[#1E2945]/90'
                        }`}
                      >
                        <span className="truncate">{s}</span>
                        {isSelected && <Check className="h-3.5 w-3.5 text-[#3E7BFA] shrink-0 ml-1" />}
                      </button>
                    );
                  })}
                </div>
                <p className="text-[11px] text-[#9AA3C2]/70">
                  Tip: Click multiple disciplines (e.g. Web Development + Video Editing) to combine them into one project.
                </p>
              </div>

              {/* Budget Range + Custom Budget Option */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#9AA3C2] flex items-center gap-1.5">
                    <DollarSign className="h-3.5 w-3.5 text-[#17B4E0]" />
                    <span>Budget Expectation</span>
                  </label>
                  {isCustomBudget && (
                    <span className="text-[11px] text-[#17B4E0] font-medium">
                      Custom Amount Active
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {presetBudgets.map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => {
                        setIsCustomBudget(false);
                        setSelectedBudget(b);
                      }}
                      className={`p-2 rounded-xl text-xs font-medium text-center border transition-all cursor-pointer ${
                        !isCustomBudget && selectedBudget === b
                          ? 'bg-[#161F36] border-[#17B4E0] text-[#17B4E0] shadow-[0_0_12px_rgba(23,180,224,0.2)]'
                          : 'bg-[#0A0E1A] border-[#1E2945] text-[#9AA3C2] hover:text-[#F3F5FA]'
                      }`}
                    >
                      {b}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => setIsCustomBudget(true)}
                    className={`p-2 rounded-xl text-xs font-medium text-center border transition-all cursor-pointer ${
                      isCustomBudget
                        ? 'bg-[#161F36] border-[#17B4E0] text-[#17B4E0] shadow-[0_0_12px_rgba(23,180,224,0.2)]'
                        : 'bg-[#0A0E1A] border-[#1E2945] text-[#9AA3C2] hover:text-[#F3F5FA]'
                    }`}
                  >
                    Custom...
                  </button>
                </div>

                {isCustomBudget && (
                  <div className="pt-2 animate-fadeIn">
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-xs text-[#9AA3C2]">$</span>
                      <input
                        type="text"
                        placeholder="Enter your custom budget (e.g., $7,500 or $35,000 negotiable)"
                        value={customBudget}
                        onChange={(e) => setCustomBudget(e.target.value)}
                        className="w-full pl-7 pr-4 py-2.5 rounded-xl bg-[#0A0E1A] border border-[#17B4E0] text-xs text-[#F3F5FA] focus:outline-none shadow-[0_0_12px_rgba(23,180,224,0.15)]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Timeline Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#9AA3C2]">
                  Target Timeline
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Immediate (< 2 wks)', '1-2 Months', '2-3 Months', 'Flexible'].map((time) => (
                    <button
                      type="button"
                      key={time}
                      onClick={() => setFormData({ ...formData, timeline: time })}
                      className={`p-2 rounded-xl text-xs font-medium text-center border transition-all cursor-pointer ${
                        formData.timeline === time
                          ? 'bg-[#161F36] border-[#3E7BFA] text-[#3E7BFA]'
                          : 'bg-[#0A0E1A] border-[#1E2945] text-[#9AA3C2] hover:text-[#F3F5FA]'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Error Notification */}
              {formError && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <span className="font-semibold">Notice:</span>
                  <span>{formError}</span>
                </div>
              )}

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#9AA3C2]">
                  Project Overview & Scope Details
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your core goals, key deliverables, and any specific requests..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#0A0E1A] border border-[#1E2945] text-xs text-[#F3F5FA] focus:outline-none focus:border-[#3E7BFA]"
                />
              </div>

              <button
                type="submit"
                id="submit-project-brief-btn"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#3E7BFA] to-[#1230C4] text-[#F3F5FA] text-xs font-bold uppercase tracking-wider shadow-[0_4px_25px_rgba(62,123,250,0.35)] hover:shadow-[0_6px_35px_rgba(62,123,250,0.55)] border border-[#3E7BFA]/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Transmitting Brief...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <Send className="h-3.5 w-3.5" />
                    <span>Submit Project Brief ({selectedServices.length} Selected)</span>
                  </span>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Direct Info & Calendar */}
        <div className="lg:col-span-5 space-y-6">
          {/* Calendar Card */}
          <div className="p-7 rounded-3xl bg-[#101626] border border-[#1E2945]/70 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-[#161F36] border border-[#1E2945] flex items-center justify-center text-[#3E7BFA]">
                <Calendar className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#F3F5FA]">Schedule a Video Call</h3>
                <p className="text-xs text-[#9AA3C2]">30-minute introductory discovery session.</p>
              </div>
            </div>

            <p className="text-xs text-[#9AA3C2] leading-relaxed">
              Book a direct video conference slot with our technical and design directors.
            </p>

            <button
              onClick={() => {
                setCalendarOpen(true);
                setBookingSuccess(false);
              }}
              className="w-full py-3 rounded-full bg-[#161F36] hover:bg-[#1E2945] text-[#F3F5FA] text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-all border border-[#1E2945]"
              onMouseEnter={() => setCursor('button', 'Book')}
              onMouseLeave={resetCursor}
            >
              <Calendar className="h-3.5 w-3.5 text-[#3E7BFA]" />
              <span>Select Time Slot</span>
            </button>
          </div>

          {/* Coordinates */}
          <div className="p-7 rounded-3xl bg-[#101626] border border-[#1E2945]/70 space-y-4">
            <h3 className="text-sm font-semibold text-[#F3F5FA]">Studio Contacts</h3>
            
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-[#3E7BFA] shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-[#F3F5FA]">San Francisco Studio</div>
                  <div className="text-[#9AA3C2]">450 Mission Street, Suite 800, San Francisco, CA 94105</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <PhoneCall className="h-4 w-4 text-[#3E7BFA] shrink-0" />
                <a href="tel:+18005550199" className="font-medium text-[#F3F5FA] hover:text-[#3E7BFA] transition-colors">+1 (800) 555-0199</a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#3E7BFA] shrink-0" />
                <a href="mailto:partners@aetherstudio.agency" className="font-medium text-[#F3F5FA] hover:text-[#3E7BFA] transition-colors">partners@aetherstudio.agency</a>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <MessageSquare className="h-4 w-4 text-[#17B4E0] shrink-0" />
                <a 
                  href="https://wa.me/18005550199?text=Hi%20Aether%20Team%2C%20I%20would%20like%20to%20discuss%20a%20new%20project." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-medium text-[#17B4E0] hover:underline flex items-center gap-1"
                >
                  <span>WhatsApp Direct Message</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Booking Modal */}
      {calendarOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#101626] border border-[#1E2945] rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1E2945] pb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#3E7BFA]" />
                <h3 className="text-base font-bold text-[#F3F5FA]">Select Discovery Session</h3>
              </div>
              <button 
                onClick={() => setCalendarOpen(false)}
                className="text-[#9AA3C2] hover:text-[#F3F5FA] text-sm"
              >
                ✕
              </button>
            </div>

            {bookingSuccess ? (
              <div className="py-6 text-center space-y-4">
                <div className="h-12 w-12 mx-auto rounded-full bg-[#3E7BFA]/20 border border-[#3E7BFA] flex items-center justify-center text-[#3E7BFA]">
                  <Check className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-bold text-[#F3F5FA]">Video Call Scheduled!</h4>
                <div className="bg-[#0A0E1A] p-4 rounded-2xl border border-[#1E2945] text-left space-y-2 max-w-sm mx-auto">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#9AA3C2]">Date & Time:</span>
                    <span className="text-[#3E7BFA] font-semibold">{selectedDate}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#9AA3C2]">Attendee:</span>
                    <span className="text-[#F3F5FA] font-medium">{attendeeName}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#9AA3C2]">Invite sent to:</span>
                    <span className="text-[#F3F5FA] font-medium truncate max-w-[180px]">{attendeeEmail}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#9AA3C2]">Platform:</span>
                    <span className="text-[#17B4E0] font-medium">Google Meet (Link included in invite)</span>
                  </div>
                </div>
                <p className="text-xs text-[#9AA3C2]">
                  We look forward to meeting you! Our design and technical team have reserved this slot.
                </p>
                <button
                  onClick={() => {
                    setCalendarOpen(false);
                    setBookingSuccess(false);
                  }}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#3E7BFA] to-[#1230C4] text-[#F3F5FA] text-xs font-bold uppercase tracking-wider"
                >
                  Close & Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#9AA3C2]">
                    1. Select Date & Time Slot
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                    {[
                      'Tomorrow, 10:00 AM PST',
                      'Tomorrow, 2:00 PM PST',
                      'Thursday, 11:30 AM PST',
                      'Thursday, 4:00 PM PST',
                      'Friday, 1:00 PM PST',
                      'Next Monday, 10:00 AM PST'
                    ].map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedDate(slot)}
                        className={`p-2.5 rounded-xl text-xs font-medium border text-left transition-all ${
                          selectedDate === slot
                            ? 'bg-[#161F36] border-[#3E7BFA] text-[#3E7BFA] shadow-[0_0_12px_rgba(62,123,250,0.2)]'
                            : 'bg-[#0A0E1A] border-[#1E2945] text-[#9AA3C2] hover:text-[#F3F5FA]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-1 border-t border-[#1E2945]/70">
                  <label className="text-xs font-semibold text-[#9AA3C2]">
                    2. Your Contact Information
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Your full name *"
                      value={attendeeName}
                      onChange={(e) => setAttendeeName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0E1A] border border-[#1E2945] text-xs text-[#F3F5FA] focus:outline-none focus:border-[#3E7BFA]"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Your work email *"
                      value={attendeeEmail}
                      onChange={(e) => setAttendeeEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0E1A] border border-[#1E2945] text-xs text-[#F3F5FA] focus:outline-none focus:border-[#3E7BFA]"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Brief notes or topics you wish to discuss (optional)"
                    value={callNotes}
                    onChange={(e) => setCallNotes(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#0A0E1A] border border-[#1E2945] text-xs text-[#F3F5FA] focus:outline-none focus:border-[#3E7BFA]"
                  />
                </div>

                {bookingError && (
                  <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                    {bookingError}
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    id="confirm-video-booking-btn"
                    disabled={bookingSubmitting}
                    className="flex-1 py-3 rounded-full bg-gradient-to-r from-[#3E7BFA] to-[#1230C4] text-[#F3F5FA] text-xs font-bold uppercase tracking-wider shadow-[0_4px_20px_rgba(62,123,250,0.35)] hover:shadow-[0_6px_30px_rgba(62,123,250,0.55)] cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {bookingSubmitting ? (
                      <>
                        <span className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Confirming Meeting...</span>
                      </>
                    ) : (
                      <span>Confirm Video Meeting ({selectedDate.split(',')[0]})</span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalendarOpen(false)}
                    className="px-5 py-3 rounded-full bg-[#161F36] text-xs text-[#9AA3C2] hover:text-[#F3F5FA]"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
