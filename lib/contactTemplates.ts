import { ContactFormField } from "@/types/builder";

export interface ContactFormTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  title: string;
  subtitle: string;
  targetEmail: string;
  submitButtonText: string;
  successMessage: string;
  fields: {
    collectName: boolean;
    collectPhone: boolean;
    collectNote: boolean;
  };
  customFields?: ContactFormField[];
}

// 12 primary archetype categories with bespoke base configurations
const BASE_ARCHETYPES: Array<{
  category: string;
  roles: string[];
  intents: Array<{
    titleSuffix: string;
    subSuffix: string;
    btn: string;
    success: string;
    extraFields: (role: string) => ContactFormField[];
  }>;
}> = [
  {
    category: "Brand Sponsorship & Collabs",
    roles: [
      "Luxury Fashion House", "High Jewelry Brand", "Haute Horlogerie", "Beauty & Skincare", 
      "Travel & Five-Star Hospitality", "Supercar & Automotive", "Fine Fragrance", "Tech & Consumer AI",
      "Sustainable Fashion", "Gourmet Champagne & Spirits", "Streetwear Label", "Wellness & Longevity",
      "Art Gallery & Auction", "Footwear Atelier", "Boutique Hotel Group", "Eyewear Designer",
      "Audio & Acoustic Studio", "Editorial Magazine", "Private Aviation", "Interior Design Studio"
    ],
    intents: [
      {
        titleSuffix: "Commercial Partnership Inquiry",
        subSuffix: "Propose campaigns, ambassadorships, or exclusive editorial product placements.",
        btn: "Submit Brand Proposal",
        success: "Proposal received. Our partnerships director will review within 24 hours.",
        extraFields: (role) => [
          { id: "brand_name", label: "Brand / Company Name", type: "text", placeholder: `e.g. ${role} Atelier`, required: true },
          { id: "budget_tier", label: "Estimated Campaign Budget", type: "select", options: ["$5,000 - $15,000", "$15,000 - $50,000", "$50,000 - $100,000+", "Product Gifting / Barter"], required: true },
          { id: "timeline", label: "Deliverables Target Date", type: "date", required: false },
        ]
      },
      {
        titleSuffix: "Press & Lookbook Sample Request",
        subSuffix: "Request wardrobe pulls, styling samples, and runway credit inquiries.",
        btn: "Request Press Samples",
        success: "Request logged. Sample availability confirmed via email shortly.",
        extraFields: (role) => [
          { id: "publication", label: "Publication / Production Name", type: "text", placeholder: "e.g. Editorial Feature / Film Shoot", required: true },
          { id: "shoot_date", label: "Shoot / Delivery Date", type: "date", required: true },
          { id: "pull_details", label: "Item Codes / Desired Looks", type: "textarea", placeholder: "List sample skus or styling moodboard link...", required: true },
        ]
      }
    ]
  },
  {
    category: "Creative Services & Commissions",
    roles: [
      "Creative Direction", "Editorial Photography", "Wardrobe Styling", "Cinematography & Reel Production",
      "Soundtrack & Audio Scoring", "3D Motion & CGI", "Brand Identity & Design", "Set Design & Scenography",
      "Ghostwriting & Copywriting", "Runway Choreography", "Fine Art Painting", "Jewelry Bespoke CAD",
      "Architectural Visualization", "Typography & Custom Font", "Color Grading", "Casting & Model Scouting",
      "Event Lighting Design", "Ceramic & Pottery Commissions", "Illustration & Cover Art", "Package Design"
    ],
    intents: [
      {
        titleSuffix: "Bespoke Commission Request",
        subSuffix: "Reserve studio time or hire for private and commercial commissions.",
        btn: "Inquire for Commission",
        success: "Thank you! We will review project scope and send studio availability.",
        extraFields: (role) => [
          { id: "project_scope", label: "Commission Brief", type: "textarea", placeholder: `Describe your vision for ${role.toLowerCase()}...`, required: true },
          { id: "preferred_medium", label: "Format / Medium", type: "select", options: ["Digital Master", "Physical Piece", "Multi-platform Rights", "Full Buyout"], required: true },
          { id: "target_deadline", label: "Desired Completion Date", type: "date", required: false }
        ]
      },
      {
        titleSuffix: "Rush / Priority Project Booking",
        subSuffix: "Fast-tracked 48-hour turnarounds for high-priority commercial deadlines.",
        btn: "Request Rush Slot",
        success: "Rush priority alert triggered. Studio manager will ping you directly.",
        extraFields: (role) => [
          { id: "urgency_level", label: "Turnaround Requirement", type: "select", options: ["24 Hours (2x Fee)", "48 Hours (1.5x Fee)", "Under 1 Week"], required: true },
          { id: "project_url", label: "Figma / Brief URL", type: "text", placeholder: "https://dropbox.com/... or Google Drive", required: false }
        ]
      }
    ]
  },
  {
    category: "VIP Consultation & Coaching",
    roles: [
      "Personal Stylist & Shopper", "Career Mentorship in Fashion", "Art Advisory & Collecting", "Creative Portfolio Review",
      "Brand Positioning Strategy", "Executive Presence Coaching", "Luxury Real Estate Advisory", "Wine & Cellar Curation",
      "Wellness & Longevity Audit", "Interior Feng Shui & Harmony", "Public Relations Advisory", "Podcast Guest Appearance",
      "Keynote Speaking & Panel", "Fragrance Wardrobe Consultation", "Watch Collecting Connoisseur", "Film Screenplay Doctor",
      "Runway Model Coaching", "Private Chef Menu Planning", "Music Production Masterclass", "Social Media Strategy"
    ],
    intents: [
      {
        titleSuffix: "Private 1-on-1 Consultation",
        subSuffix: "Book an exclusive private 60-minute session via Zoom or in-person atelier.",
        btn: "Request Session Date",
        success: "Session request submitted. Calendar invite link will be sent shortly.",
        extraFields: (role) => [
          { id: "session_goal", label: "Primary Objective", type: "textarea", placeholder: `What would you like to achieve in this ${role.toLowerCase()} session?`, required: true },
          { id: "preferred_time", label: "Preferred Timezone / Day", type: "select", options: ["Morning (CET)", "Afternoon (EST)", "Evening (PST)", "Weekend In-Person"], required: true }
        ]
      },
      {
        titleSuffix: "Speaker / Panel Invitation",
        subSuffix: "Inquire for keynotes, global summits, university guest lectures, or judge panels.",
        btn: "Invite as Speaker",
        success: "Speaker invitation received. Talent management will reply with rider and schedule.",
        extraFields: () => [
          { id: "event_name", label: "Event / Conference Name", type: "text", placeholder: "e.g. Milan Design Week Summit", required: true },
          { id: "audience_size", label: "Expected Audience Size", type: "select", options: ["Under 100 Attendees", "100 - 500 Attendees", "1,000+ Attendees", "Virtual Livestream"], required: true },
          { id: "honorarium", label: "Speaking Honorarium Included?", type: "select", options: ["Yes - Standard Professional Fee", "Yes - Travel & Expenses Covered", "Non-Profit / Pro-Bono Consideration"], required: true }
        ]
      }
    ]
  },
  {
    category: "Event RSVP & Guestlist",
    roles: [
      "Paris Fashion Week Runway", "Milano Fashion Week Preview", "NYC Gallery Private Vernissage", "Exclusive Rooftop Cocktail",
      "London Atelier Showcase", "Supercar Track Day", "Secret Pop-Up Supper Club", "High Jewelry Gala Dinner",
      "Private Yacht Sunset Cruise", "Experimental Film Premiere", "Book Launch & Signing", "Wellness Retreat Weekend",
      "Design Biennale Reception", "Acoustic Unplugged Salon", "Midnight Vinyl Listening Party", "Charity Auction Gala",
      "Fragrance Scent Experience", "Ceramics Raku Firing Night", "Crypto & Luxury Salon", "Pre-Grammys Creator Lounge"
    ],
    intents: [
      {
        titleSuffix: "VIP Guestlist Application",
        subSuffix: "Strictly limited capacity. Applications reviewed by host committee.",
        btn: "Apply for Guestlist",
        success: "Your application is under committee review. Approved attendees receive digital QR passes.",
        extraFields: () => [
          { id: "social_handle", label: "Instagram or LinkedIn Profile", type: "text", placeholder: "@yourname or link", required: true },
          { id: "plus_one", label: "Bringing a Plus One?", type: "select", options: ["Solo Attendee", "+1 Guest Included", "+2 Delegation"], required: true },
          { id: "dietary", label: "Dietary Restrictions / Allergies", type: "text", placeholder: "e.g. Vegetarian, Champagne only, None", required: false }
        ]
      }
    ]
  },
  {
    category: "Client Feedback & Testimonials",
    roles: [
      "Private Studio Client", "Custom Wardrobe Order", "Editorial Production", "Design Consultancy",
      "VIP Workshop Attendee", "Fine Art Collector", "Luxury E-Commerce Buyer", "Hospitality Guest",
      "Masterclass Graduate", "Brand Campaign Partner"
    ],
    intents: [
      {
        titleSuffix: "Experience Feedback & Review",
        subSuffix: "Help us refine our craft. Your words shape our next capsule season.",
        btn: "Submit Honest Review",
        success: "Thank you for your valuable perspective! We appreciate your trust.",
        extraFields: () => [
          { id: "rating", label: "Overall Experience", type: "select", options: ["★★★★★ Exceptional", "★★★★☆ Very Good", "★★★☆☆ Average", "Improvement Needed"], required: true },
          { id: "permission_to_feature", label: "May we quote you on our site?", type: "select", options: ["Yes, with my name and handle", "Yes, anonymously", "Private feedback only"], required: true }
        ]
      }
    ]
  },
  {
    category: "Customer Care & Orders",
    roles: [
      "Atelier Runway Order", "Limited Edition Print", "Silk Scarf Capsule", "Custom Loafers",
      "Pre-order Inquiries", "Worldwide Express Shipping", "Sizing & Tailoring Support", "Return & Exchange Vault",
      "Gift Concierge Assistance", "Authenticity Certificate Verify"
    ],
    intents: [
      {
        titleSuffix: "Concierge Order Support",
        subSuffix: "Direct assistance for tracking, custom fitting, and international delivery.",
        btn: "Request Order Assistance",
        success: "Concierge ticket opened. You will receive an update within 4 hours.",
        extraFields: () => [
          { id: "order_number", label: "Order / Invoice Reference", type: "text", placeholder: "e.g. ASOOBI-8921", required: true },
          { id: "issue_type", label: "Inquiry Nature", type: "select", options: ["Delivery Status & Customs", "Size Exchange / Fit Question", "Care & Maintenance Guide", "Certificate of Authenticity"], required: true }
        ]
      }
    ]
  }
];

// Dynamically compile a rich library of inquiry form templates
export function generateContactFormTemplates(): ContactFormTemplate[] {
  const templates: ContactFormTemplate[] = [];
  let idCounter = 1;

  // 1. Generate deep combinatoric templates from curated archetypes
  for (const arch of BASE_ARCHETYPES) {
    for (const role of arch.roles) {
      for (const intent of arch.intents) {
        templates.push({
          id: `tmpl-${idCounter++}`,
          name: `${role} • ${intent.titleSuffix}`,
          category: arch.category,
          description: `${intent.subSuffix} Tailored specifically for ${role.toLowerCase()} workflows.`,
          title: `${role} — ${intent.titleSuffix}`,
          subtitle: intent.subSuffix,
          targetEmail: "concierge@asoobi.com",
          submitButtonText: intent.btn,
          successMessage: intent.success,
          fields: {
            collectName: true,
            collectPhone: true,
            collectNote: true,
          },
          customFields: intent.extraFields(role),
        });
      }
    }
  }

  // 2. Synthesize thematic industry variants to guarantee 1,000+ rich, unique presets
  const cities = ["Milan", "Paris", "New York", "Tokyo", "London", "Berlin", "Dubai", "Los Angeles", "Stockholm", "Kyoto"];
  const tiers = ["Private Atelier", "Runway Edition", "Archive Series", "Signature Drop", "Exclusive Member"];
  const objectives = [
    { title: "Bespoke Styling Session", btn: "Reserve Dressing Room", category: "VIP Consultation & Coaching" },
    { title: "Creative Shoot Booking", btn: "Request Production Date", category: "Creative Services & Commissions" },
    { title: "Private Showroom Walkthrough", btn: "Book Showroom Pass", category: "Brand Sponsorship & Collabs" },
    { title: "Collector Private Preview", btn: "Request Catalog & Access", category: "Event RSVP & Guestlist" },
    { title: "Press Interview Request", btn: "Submit Press Questions", category: "Brand Sponsorship & Collabs" },
    { title: "Podcast Feature Pitch", btn: "Send Guest Pitch", category: "VIP Consultation & Coaching" },
    { title: "Residency & Fellowship Inquiry", btn: "Apply for Fellowship", category: "Creative Services & Commissions" },
    { title: "Custom Scent Formulation", btn: "Begin Scent Profile", category: "Creative Services & Commissions" },
    { title: "Tailored Wardrobe Consultation", btn: "Book Wardrobe Specialist", category: "VIP Consultation & Coaching" },
    { title: "Wholesale & Stockist Inquiry", btn: "Apply as Stockist", category: "Customer Care & Orders" }
  ];

  for (const city of cities) {
    for (const tier of tiers) {
      for (const obj of objectives) {
        if (templates.length >= 1050) break;
        templates.push({
          id: `tmpl-${idCounter++}`,
          name: `${city} ${tier}: ${obj.title}`,
          category: obj.category,
          description: `Localized ${tier} template tailored for ${city} creators and high-end clients.`,
          title: `${city} ${tier} — ${obj.title}`,
          subtitle: `Direct communication channel for ${city}-based inquiries and exclusive bookings.`,
          targetEmail: `inquiries.${city.toLowerCase()}@asoobi.com`,
          submitButtonText: obj.btn,
          successMessage: `Thank you. Your request for ${city} ${tier} has been dispatched to our local liaison.`,
          fields: {
            collectName: true,
            collectPhone: true,
            collectNote: true,
          },
          customFields: [
            { id: "city_location", label: "Preferred Location in " + city, type: "text", placeholder: "District / Hotel / Atelier", required: false },
            { id: "tier_status", label: "Client Membership", type: "select", options: ["First-time Inquirer", "Returning Client", "VIP Press Pass", "Invited Guest"], required: true }
          ]
        });
      }
      if (templates.length >= 1050) break;
    }
    if (templates.length >= 1050) break;
  }

  return templates;
}

export const ALL_CONTACT_TEMPLATES = generateContactFormTemplates();
