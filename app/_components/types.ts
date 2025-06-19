export interface ContactInfo {
  telegram?: string;
  github?: string;
  email?: string;
  orcid?: string;
}

export interface SectionHeader {
  h4: string;
  body2: string;
}

export interface TeamMember {
  first_name: string;
  last_name: string;
  job_title: string;
  education: string;
  photo: string;
  contacts: ContactInfo;
}

export interface Dictionary {
  [key: string]: unknown;
}

export interface FAQItem {
  question: string;
  answer: string[];
}

export interface FAQContent {
  h2: string;
  Content: FAQItem[];
  SectionHeader: SectionHeader;
}

export interface CapabilityItem {
  title: string;
  description: string[];
}

export interface FooterContent {
  header: string;
  description: string;
  content: string[];
  Button: string;
}

export interface CapabilitiesSection {
  SectionHeader: SectionHeader;
  Content: CapabilityItem[];
  Footer: FooterContent;
}

export interface ApplicationItem {
  title: string;
  description: string[];
  link: string;
}

export interface ButtonItem {
  title: string;
  description: string;
}

export interface ContentItem {
  block: ApplicationItem;
  button: ButtonItem;
}

export interface ApplicationsSection {
  SectionHeader: SectionHeader;
  Button: string;
  Content: ContentItem[];
}

export interface CallToActionSection {
  h3: string;
  body1: string;
  StyledButton: string[];
}

export interface AboutSection {
  SectionHeader: SectionHeader;
}

export interface FeatureItem {
  title: string;
  description: string[];
  more: string[];
}

export interface FeaturesSection {
  SectionHeader: SectionHeader;
  Content: FeatureItem[];
}

export interface FooterContent {
  row1Title: string;
  row1Title2: string;
  row1Subtitle: string;
  row1Subtitle2: string;
  row1ButtonText: string;
  row2TermsTitle: string;
  row2PrivacyTitle: string;
  row2CookiesTitle: string;
  row3Copyright: string;
  row3Follows: string;
}

export interface HeroContent {
  slogan: string;
  button: {
    title: string;
    description: string[];
    link: string;
  }[];
}

export interface NavbarContent {
  home: string;
  features: string;
  research: string;
}

export interface WorksContent {
  SectionHeader: {
    h4: string;
    body2: string;
  };
  Content: string[];
}

export interface ContentItem {
  title: string;
  description: string[];
  image: string;
}

export interface SectionHeaderContent {
  h4: string;
  body2: string;
}

export interface OptimizationContent {
  SectionHeader: SectionHeaderContent;
  Content: ContentItem[];
}

export interface PredictionContent {
  SectionHeader: SectionHeaderContent;
  Content: ContentItem[];
}

export interface ProcessingContent {
  SectionHeader: SectionHeaderContent;
  Content: ContentItem[];
}

export interface FeaturesContent {
  Optimization: OptimizationContent;
  Prediction: PredictionContent;
  Processing: ProcessingContent;
}

export interface ResearchContent {
  title: string;
  image: string;
  description: string[];
  Button: string;
}

export interface PaperWorkProps {
  item: ResearchContent;
}

export interface ResearchItem {
  id: string;
  title: string;
  image: string;
  description: string[];
  Button: string;
  link: string;
  content?: string;
}

export interface ResearchContent {
  Content: ResearchItem[];
}

export interface LegalSection {
  title: string;
  content: string;
}

export interface LegalContent {
  Title: string;
  LastUpdated: string;
  Sections: LegalSection[];
}

export interface LegalDictionary {
  Terms: LegalContent;
  Privacy: LegalContent;
  Cookies: LegalContent;
}

export interface AppDictionary extends Dictionary {
  Home: {
    Hero: HeroContent;
    Capabilities: CapabilitiesSection;
    Applications: ApplicationsSection;
    CallToAction: CallToActionSection;
    About: AboutSection;
    Faq: FAQContent;
    Features: FeaturesSection;
    Footer: FooterContent;
    Navbar: NavbarContent;
    Works: WorksContent;
  };
  Features: FeaturesContent;
  Research: {
    Content: ResearchItem[];
    Button: string;
  };
  Team: TeamMember[];
  FeedbackForm: {
    [key: string]: {
      [key: string]: string;
    };
  };
  Legal: LegalDictionary;
}
