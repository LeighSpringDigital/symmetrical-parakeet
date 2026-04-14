const NAVY = "#002942";
const GOLD = "#C9A227";
const FONT = "'Century Gothic', 'Avant Garde', CenturyGothic, AppleGothic, sans-serif";

export default function Privacy() {
  return (
    <div style={{ backgroundColor: NAVY, fontFamily: FONT }} className="min-h-screen">
      <nav className="px-8 py-5 border-b border-white/10 flex items-center justify-between">
        <a href="/" className="font-black uppercase tracking-widest text-sm transition-colors hover:text-[#C9A227]" style={{ color: GOLD }}>
          ← Old Tigers Head
        </a>
      </nav>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-12">
          <p className="text-xs tracking-[0.5em] uppercase font-semibold mb-3" style={{ color: GOLD }}>Legal</p>
          <h1 className="text-white text-4xl font-black uppercase tracking-wide" style={{ fontFamily: FONT }}>Privacy Policy</h1>
          <p className="text-white/40 text-sm mt-3">Last updated: April 2026</p>
        </div>

        <div className="space-y-10 text-white/70 text-sm leading-relaxed">
          {[
            {
              title: "Who we are",
              body: "The Old Tigers Head is located at 351 Lee High Road, London SE12 8RU. We are the data controller for personal information collected through this website. If you have any questions about how we use your data, please contact us at enquiries@theoldtigershead.com."
            },
            {
              title: "What data we collect",
              body: "We may collect your name, phone number, email address, and any other information you provide when making a table booking, enquiring about venue hire, or signing up to our community. We only collect what is necessary to respond to your request or manage your relationship with us."
            },
            {
              title: "How we use your data",
              body: "Your data is used to: confirm and manage bookings; respond to enquiries; send updates about events and news if you have opted in; and improve the functionality of this website. We will never sell, rent, or share your personal data with third parties for marketing purposes."
            },
            {
              title: "Lawful basis",
              body: "We process your data on the basis of: contract performance (e.g. managing a booking); legitimate interests (e.g. responding to an enquiry); or consent (e.g. if you opt in to our mailing list). You can withdraw consent at any time by emailing enquiries@theoldtigershead.com."
            },
            {
              title: "Cookies",
              id: "cookies",
              body: "We use a small number of essential cookies to make this website function. We do not use third-party advertising cookies or tracking pixels without your explicit consent. You can accept or decline non-essential cookies using the banner displayed on your first visit. Essential cookies cannot be disabled as they are required for the site to work."
            },
            {
              title: "Data retention",
              body: "Booking and enquiry data is retained for up to 12 months. If you join our community mailing list, we retain your details until you unsubscribe. You may request deletion of your data at any time."
            },
            {
              title: "Your rights",
              body: "Under UK GDPR, you have the right to: access the personal data we hold about you; request correction of inaccurate data; request deletion of your data; object to certain processing; and withdraw consent at any time. To exercise any of these rights, contact us at enquiries@theoldtigershead.com."
            },
            {
              title: "Third-party services",
              body: "This website may link to external sites (e.g. Google Maps, TfL Journey Planner). We are not responsible for the privacy practices of those sites. We recommend you review their policies before sharing personal information."
            },
            {
              title: "Contact",
              body: "If you have any questions or concerns about how we handle your data, please email enquiries@theoldtigershead.com or write to: The Old Tigers Head, 351 Lee High Road, London SE12 8RU."
            },
          ].map((section) => (
            <div key={section.title} id={section.id}>
              <h2 className="text-white font-black uppercase tracking-wide text-base mb-3" style={{ fontFamily: FONT }}>{section.title}</h2>
              <div className="w-8 h-0.5 mb-4" style={{ backgroundColor: GOLD }} />
              <p>{section.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <a href="/" className="text-xs font-bold tracking-widest uppercase transition-colors hover:text-white" style={{ color: GOLD }}>
            ← Back to the pub
          </a>
        </div>
      </div>
    </div>
  );
}
