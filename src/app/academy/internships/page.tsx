'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  Check,
  ChevronDown,
  Clock,
  FileCheck2,
  GraduationCap,
  Laptop,
  LockKeyhole,
  Network,
  Shield,
  Sparkles,
  Target,
  Users,
  X,
} from 'lucide-react';

import HeroGlow from '@/components/ui/HeroGlow';
import SectionHeader from '@/components/ui/SectionHeader';
import NeonButton from '@/components/ui/NeonButton';
import { cn } from '@/lib/utils';

/* =========================================================
   TYPES
========================================================= */

type Module = {
  id: number;
  title: string;
  objective: string;
  topics: string[];
  practical: string[];
  outcomes: string[];
  instructorNotes: string;
};

type Phase = {
  id: number;
  title: string;
  duration: string;
  hours: string;
  description: string;
  modules: Module[];
};

/* =========================================================
   COURSE DATA
========================================================= */

const phases: Phase[] = [
  {
    id: 1,
    title: 'Basics',
    duration: '2.5 Weeks',
    hours: '50 Hours',
    description:
      'Build the essential cybersecurity foundation. Students learn the security landscape, networking, Windows, Linux and the core principles used throughout the program.',
    modules: [
      {
        id: 1,
        title: 'Cybersecurity Fundamentals & Threat Landscape',
        objective:
          'Understand what cybersecurity is, why it matters and how modern organisations identify and manage cyber threats.',
        topics: [
          'Cybersecurity scope and core concepts',
          'CIA Triad: Confidentiality, Integrity & Availability',
          'AAA: Authentication, Authorisation & Accounting',
          'Threat actors and their motivations',
          'Malware, ransomware, phishing, social engineering and APTs',
          'Attack surface and cybersecurity kill chain',
          'Assets, threats, vulnerabilities and risk',
          'GDPR, HIPAA and PCI DSS awareness',
        ],
        practical: [
          'Threat mapping exercise',
          'Real-world breach case study',
          'Attacker vs defender exercise',
          'Basic organisational risk assessment',
        ],
        outcomes: [
          'Explain core cybersecurity principles',
          'Identify common threat actors and attack types',
          'Apply the CIA Triad to real scenarios',
          'Perform a basic risk identification exercise',
        ],
        instructorNotes:
          'Use real-world cyber incidents and simple scenarios to build confidence before introducing advanced terminology.',
      },

      {
        id: 2,
        title: 'Networking Fundamentals — TCP/IP, DNS, Ports & Protocols',
        objective:
          'Develop the networking knowledge required to understand how systems communicate and where security weaknesses can occur.',
        topics: [
          'OSI seven-layer model',
          'TCP/IP model and mapping',
          'IPv4, IPv6 and subnetting basics',
          'TCP vs UDP',
          'TCP three-way handshake',
          'DNS and DNS records',
          'Common ports and services',
          'HTTP, HTTPS, FTP, SSH, SMTP, DNS and DHCP',
          'Wireshark fundamentals',
          'CIDR notation',
        ],
        practical: [
          'Wireshark packet capture lab',
          'Nmap port scanning in a lab environment',
          'nslookup and dig exercises',
          'Network topology exercise',
          'Packet identification challenge',
        ],
        outcomes: [
          'Understand OSI and TCP/IP models',
          'Identify common ports and protocols',
          'Read basic network packets',
          'Perform DNS lookups',
          'Explain the TCP connection process',
        ],
        instructorNotes:
          'Use practical networking analogies and ensure every student has a working lab VM before packet-analysis exercises.',
      },

      {
        id: 3,
        title: 'Windows Security Basics',
        objective:
          'Develop practical security skills in Windows environments, including accounts, permissions, firewall, Defender and event logging.',
        topics: [
          'Windows security architecture',
          'Users, groups and least privilege',
          'NTFS permissions',
          'Windows Firewall',
          'Windows Defender',
          'Windows Registry',
          'Event Viewer and security logs',
          'Windows Update and patch management',
          'UAC security',
          'RDP risks and secure configuration',
          'Group Policy security basics',
        ],
        practical: [
          'Create users and groups',
          'Configure Windows Firewall rules',
          'Analyse Event Viewer logs',
          'Test Defender using the safe EICAR test file',
          'Configure NTFS permissions',
        ],
        outcomes: [
          'Manage Windows accounts securely',
          'Configure basic firewall rules',
          'Interpret important Windows security events',
          'Understand Windows security controls',
          'Identify common Windows security weaknesses',
        ],
        instructorNotes:
          'Connect security concepts to everyday Windows usage so students understand why security controls exist.',
      },

      {
        id: 4,
        title: 'Linux Fundamentals for Security',
        objective:
          'Build confidence with the Linux command line, file permissions, users, processes, networking and security logs.',
        topics: [
          'Ubuntu and Kali Linux',
          'Linux filesystem structure',
          'Essential terminal commands',
          'File permissions and ownership',
          'Users and groups',
          'Process management',
          'Package management',
          'Linux networking commands',
          'grep, awk, sed and cut',
          'Bash scripting basics',
          'Security log locations',
        ],
        practical: [
          'Terminal navigation challenge',
          'File permission exercise',
          'User and group configuration',
          'Log analysis using grep and awk',
          'Basic security Bash script',
        ],
        outcomes: [
          'Navigate Linux confidently',
          'Manage permissions and users',
          'Inspect network connections',
          'Analyse Linux logs',
          'Automate basic security tasks',
        ],
        instructorNotes:
          'Terminal confidence is essential. Use short, practical challenges rather than long command demonstrations.',
      },

      {
        id: 5,
        title: 'Security Principles & Best Practices',
        objective:
          'Consolidate the foundational principles used to design, operate and maintain secure environments.',
        topics: [
          'Defence in depth',
          'Least privilege',
          'Zero Trust',
          'Security policies and procedures',
          'Password security and MFA',
          'Patch management',
          'Backup and disaster recovery',
          'Physical security',
          'Social engineering awareness',
          'Secure configuration and hardening',
          'Incident response fundamentals',
        ],
        practical: [
          'Security checklist audit',
          'Phishing identification exercise',
          'Password security analysis',
          'Basic security policy creation',
          'Security hygiene discussion',
        ],
        outcomes: [
          'Apply defence-in-depth principles',
          'Explain Zero Trust',
          'Identify social engineering attempts',
          'Understand security governance',
          'Describe the incident response lifecycle',
        ],
        instructorNotes:
          'Use this module to connect the concepts from the entire foundation phase before moving into technical security tooling.',
      },
    ],
  },

  {
    id: 2,
    title: 'Intermediate',
    duration: '3 Weeks',
    hours: '60 Hours',
    description:
      'Move from fundamentals into professional security tooling, ethical hacking methodology, vulnerability assessment and web application security.',
    modules: [
      {
        id: 6,
        title: 'Security Tools — Firewalls, Endpoint Protection & Monitoring',
        objective:
          'Understand and configure the core defensive technologies used to protect, monitor and investigate modern environments.',
        topics: [
          'Firewall types and architectures',
          'Firewall rule design',
          'DMZ and network segmentation',
          'Host vs network firewalls',
          'IDS and IPS',
          'EDR concepts',
          'Antivirus vs behavioural detection',
          'System, security and network logs',
          'Syslog',
          'SIEM fundamentals',
          'Security baselines and hardening',
        ],
        practical: [
          'Configure UFW firewall rules',
          'Review firewall logs',
          'Explore Syslog',
          'Perform SIEM searches',
          'Create a basic failed-login alert',
        ],
        outcomes: [
          'Configure basic Linux firewall rules',
          'Understand IDS/IPS architecture',
          'Explain EDR functionality',
          'Review security logs',
          'Perform basic SIEM analysis',
        ],
        instructorNotes:
          'Begin with a live SIEM demonstration so students can immediately understand how security monitoring works.',
      },

      {
        id: 7,
        title: 'Ethical Hacking Methodology — Reconnaissance, Scanning & Enumeration',
        objective:
          'Learn the structured methodology used by authorised penetration testers from reconnaissance through enumeration.',
        topics: [
          'Ethical hacking and legal authorisation',
          'Black-box, white-box and grey-box testing',
          'Penetration testing lifecycle',
          'Passive OSINT',
          'Google Dorks, Shodan and WHOIS',
          'Active reconnaissance',
          'Nmap scanning',
          'TCP, UDP and service detection',
          'Service enumeration',
          'SMB, FTP, HTTP, DNS and SMTP enumeration',
          'Banner grabbing',
          'Metasploit fundamentals',
        ],
        practical: [
          'OSINT lab',
          'Nmap lab against authorised lab VMs',
          'Service enumeration',
          'Banner grabbing',
          'Professional reconnaissance report',
        ],
        outcomes: [
          'Explain the ethical hacking lifecycle',
          'Perform authorised OSINT',
          'Execute targeted Nmap scans',
          'Enumerate lab services',
          'Document reconnaissance professionally',
        ],
        instructorNotes:
          'All offensive security activities must remain inside authorised training environments and designated lab systems.',
      },

      {
        id: 8,
        title: 'Vulnerability Assessment',
        objective:
          'Identify, classify and prioritise vulnerabilities using professional vulnerability assessment methodologies.',
        topics: [
          'Vulnerability vs exploit vs risk',
          'CVE and CVSS',
          'NVD and vulnerability databases',
          'Network and host assessments',
          'Web and wireless assessment concepts',
          'Nessus and OpenVAS concepts',
          'Scan report interpretation',
          'Critical, high, medium and low findings',
          'False positives and false negatives',
          'Risk prioritisation',
          'Professional reporting',
        ],
        practical: [
          'OpenVAS / Greenbone lab',
          'CVE research',
          'Vulnerability report creation',
          'Risk prioritisation exercise',
          'Remediation recommendations',
        ],
        outcomes: [
          'Differentiate vulnerabilities, exploits and risks',
          'Run vulnerability scans in a lab',
          'Interpret CVSS scores',
          'Prioritise findings',
          'Create professional vulnerability reports',
        ],
        instructorNotes:
          'Teach students to consider business context rather than relying only on numerical severity scores.',
      },

      {
        id: 9,
        title: 'Web Application Security — OWASP Top 10, SQL Injection & XSS',
        objective:
          'Understand and safely test common web application vulnerabilities using controlled training environments.',
        topics: [
          'Web application architecture',
          'HTTP request and response cycle',
          'OWASP Top 10',
          'Broken Access Control',
          'Cryptographic Failures',
          'Injection',
          'Insecure Design',
          'Vulnerable Components',
          'Authentication Failures',
          'Security Logging Failures',
          'SQL Injection',
          'Cross-Site Scripting',
          'Burp Suite fundamentals',
        ],
        practical: [
          'OWASP Juice Shop lab',
          'Controlled SQL injection exercises',
          'Reflected and stored XSS testing',
          'Burp Suite request interception',
          'Web application security report',
        ],
        outcomes: [
          'Understand OWASP Top 10 categories',
          'Identify common web vulnerabilities',
          'Test SQL injection in a controlled lab',
          'Demonstrate XSS safely',
          'Analyse HTTP traffic using Burp Suite',
        ],
        instructorNotes:
          'Use intentionally vulnerable applications such as OWASP Juice Shop. Students must never test systems without explicit authorisation.',
      },
    ],
  },

  {
    id: 3,
    title: 'Advanced',
    duration: '2.5 Weeks',
    hours: '50 Hours',
    description:
      'Develop professional SOC, incident response, digital forensics, threat intelligence, reporting and career skills, culminating in practical security work.',
    modules: [
      {
        id: 10,
        title: 'Security Operations Center (SOC) & Incident Response',
        objective:
          'Understand modern SOC operations and develop the ability to detect, triage and respond to security incidents.',
        topics: [
          'SOC architecture and analyst tiers',
          'Alert triage and escalation',
          'SIEM dashboards and case management',
          'NIST Incident Response Lifecycle',
          'Incident classification',
          'Malware, phishing, insider threat and DDoS',
          'Containment strategies',
          'Evidence preservation',
          'Communication and escalation',
          'Post-incident reporting',
          'SOAR concepts',
        ],
        practical: [
          'Ransomware tabletop exercise',
          'SIEM alert triage',
          'Phishing incident runbook',
          'Post-incident report',
          'SOC escalation workflow',
        ],
        outcomes: [
          'Understand SOC operations',
          'Apply incident response methodology',
          'Triage security alerts',
          'Create incident reports',
          'Explain SOAR and security automation',
        ],
        instructorNotes:
          'Use realistic tabletop scenarios and assign students different SOC roles to simulate real operational environments.',
      },

      {
        id: 11,
        title: 'Digital Forensics Fundamentals & Evidence Collection',
        objective:
          'Learn the principles of identifying, collecting, preserving and analysing digital evidence.',
        topics: [
          'Digital forensics fundamentals',
          'Forensic investigation lifecycle',
          'Chain of custody',
          'Disk, memory, network and cloud evidence',
          'Forensic imaging',
          'MD5 and SHA-256 verification',
          'Memory forensics',
          'File system analysis',
          'Deleted files and metadata',
          'Network forensics',
          'Browser artefacts',
          'Autopsy and FTK Imager',
        ],
        practical: [
          'Hash verification lab',
          'Autopsy forensic image analysis',
          'Deleted file recovery',
          'Browser artefact analysis',
          'Chain of custody exercise',
        ],
        outcomes: [
          'Understand forensic investigation processes',
          'Verify evidence integrity',
          'Analyse forensic images',
          'Recover digital artefacts',
          'Create forensic reports',
        ],
        instructorNotes:
          'Use pre-prepared forensic images with planted evidence so students can practise investigation without affecting real systems.',
      },

      {
        id: 12,
        title: 'Threat Intelligence & Log Analysis',
        objective:
          'Develop the ability to use threat intelligence and log analysis to identify suspicious behaviour and support investigations.',
        topics: [
          'Strategic, tactical, operational and technical intelligence',
          'Open-source threat intelligence',
          'MISP, AlienVault OTX and VirusTotal',
          'MITRE ATT&CK',
          'Indicators of Compromise',
          'Threat hunting',
          'Windows Event Logs',
          'Linux syslog and auth.log',
          'Apache and Nginx logs',
          'Brute-force and attack patterns',
          'Command-line log analysis',
          'Threat intelligence reporting',
        ],
        practical: [
          'Threat intelligence analysis',
          'MITRE ATT&CK mapping',
          'Windows Event Log investigation',
          'Web server log analysis',
          'IoC enrichment exercise',
        ],
        outcomes: [
          'Understand threat intelligence types',
          'Map attacker behaviour using MITRE ATT&CK',
          'Identify suspicious log events',
          'Analyse web and system logs',
          'Correlate IoCs with threat intelligence',
        ],
        instructorNotes:
          'Use seeded attack logs and real-world incident scenarios to make threat hunting and log analysis practical.',
      },

      {
        id: 13,
        title: 'Security Reporting & Career Readiness',
        objective:
          'Develop professional reporting, communication and career skills required to enter the cybersecurity industry.',
        topics: [
          'Vulnerability assessment reports',
          'Penetration testing reports',
          'Incident reports',
          'Executive summaries',
          'CVSS and business risk communication',
          'Technical vs executive communication',
          'Remediation recommendations',
          'Cybersecurity portfolio development',
          'Cybersecurity resume preparation',
          'GitHub portfolio',
          'LinkedIn optimisation',
          'Interview preparation',
          'Security community networking',
        ],
        practical: [
          'Executive summary writing',
          'Peer security report review',
          'Cybersecurity resume workshop',
          'GitHub portfolio setup',
          'Mock technical interview',
        ],
        outcomes: [
          'Produce professional security reports',
          'Communicate technical findings clearly',
          'Build a cybersecurity portfolio',
          'Prepare a targeted cybersecurity resume',
          'Approach cybersecurity interviews confidently',
        ],
        instructorNotes:
          'End the program by connecting technical skills with communication, portfolio and employability outcomes.',
      },
    ],
  },
];

/* =========================================================
   PRICING
========================================================= */

const pricing = [
  {
    name: 'Basic',
    price: '$500',
    certificate: 'eJPT',
    description:
      'A focused entry package for students beginning their cybersecurity career.',
    features: [
      'Complete Cybersecurity Course',
      'Hands-on practical labs',
      'eJPT certification pathway',
      'Course completion support',
      'Digital learning resources',
    ],
  },
  {
    name: 'Professional',
    price: '$600',
    certificate: 'CompTIA Network+',
    description:
      'The recommended package for students seeking stronger industry recognition.',
    features: [
      'Complete Cybersecurity Course',
      'Hands-on practical labs',
      'CompTIA Network+ certification pathway',
      'Professional security reporting',
      'Career readiness support',
      'Portfolio guidance',
    ],
    popular: true,
  },
  {
    name: 'Premium',
    price: '$700',
    certificate: 'CompTIA Certification',
    description:
      'A career-focused package designed for students targeting professional cybersecurity roles.',
    features: [
      'Complete Cybersecurity Course',
      'Advanced practical labs',
      'CompTIA certification pathway',
      'Professional reporting practice',
      'Portfolio and GitHub guidance',
      'Resume & interview preparation',
      'Career-focused mentorship',
    ],
  },
];

/* =========================================================
   MODULE CARD
========================================================= */

function ModuleCard({
  module,
  open,
  onToggle,
}: {
  module: Module;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border transition-all duration-300',
        open
          ? 'border-accent/50 bg-surface shadow-glow-soft'
          : 'border-line bg-soft hover:border-line-strong',
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6"
      >
        <span
          className={cn(
            'flex h-10 w-10 flex-none items-center justify-center rounded-xl border font-mono text-xs font-bold',
            open
              ? 'border-accent bg-accent text-inverse'
              : 'border-line bg-base text-muted',
          )}
        >
          {module.id.toString().padStart(2, '0')}
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-dim">
            Module {module.id}
          </p>

          <h3 className="mt-1 text-sm font-bold leading-snug">
            {module.title}
          </h3>
        </div>

        <ChevronDown
          className={cn(
            'h-5 w-5 flex-none text-dim transition-transform duration-300',
            open && 'rotate-180 text-accent',
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.2, 0.7, 0.3, 1],
            }}
            className="overflow-hidden"
          >
            <div className="border-t border-line px-5 pb-6 pt-5 sm:px-6">
              {/* Objective */}
              <div className="rounded-xl border border-line bg-base p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                  Module Objective
                </p>

                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {module.objective}
                </p>
              </div>

              <div className="mt-5 grid gap-5 lg:grid-cols-2">
                {/* Topics */}
                <div>
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
                    Topics Covered
                  </p>

                  <ul className="space-y-2">
                    {module.topics.map((topic) => (
                      <li
                        key={topic}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-muted"
                      >
                        <Check className="mt-0.5 h-4 w-4 flex-none text-accent" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Practical */}
                <div>
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
                    Practical Activities
                  </p>

                  <ul className="space-y-2">
                    {module.practical.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-muted"
                      >
                        <Laptop className="mt-0.5 h-4 w-4 flex-none text-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Learning Outcomes */}
              <div className="mt-5 rounded-xl border border-line bg-soft p-4">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
                  Expected Learning Outcomes
                </p>

                <div className="grid gap-2 sm:grid-cols-2">
                  {module.outcomes.map((outcome) => (
                    <div
                      key={outcome}
                      className="flex items-start gap-2 text-sm text-muted"
                    >
                      <Target className="mt-0.5 h-4 w-4 flex-none text-fg" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructor Notes */}
              <div className="mt-5 border-l-2 border-accent/50 pl-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
                  Instructor Note
                </p>

                <p className="mt-1.5 text-xs leading-relaxed text-muted">
                  {module.instructorNotes}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* =========================================================
   PRICING CARD
========================================================= */

function PricingCard({
  item,
  onSelect,
}: {
  item: (typeof pricing)[number];
  onSelect: () => void;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className={cn(
        'relative flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 sm:p-7',
        item.popular
          ? 'border-accent bg-surface shadow-glow-soft'
          : 'border-line bg-soft hover:border-line-strong',
      )}
    >
      {item.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent bg-accent px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-inverse">
            <Sparkles className="h-3 w-3" />
            Most Popular
          </span>
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
            {item.name}
          </p>

          <h3 className="mt-2 text-xl font-bold text-fg">
            {item.certificate}
          </h3>
        </div>

        <Award className="h-6 w-6 flex-none text-accent" />
      </div>

      <div className="mt-6">
        <span className="text-4xl font-extrabold tracking-tight text-fg">
          {item.price}
        </span>
      </div>

      <p className="mt-4 min-h-[64px] text-sm leading-relaxed text-muted">
        {item.description}
      </p>

      <div className="my-6 h-px bg-line" />

      <p className="font-mono text-[10px] uppercase tracking-widest text-dim">
        Included
      </p>

      <ul className="mt-4 flex-1 space-y-3">
        {item.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2.5 text-sm text-muted"
          >
            <Check className="mt-0.5 h-4 w-4 flex-none text-accent" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-7">
        <NeonButton
          onClick={onSelect}
          className="w-full justify-center"
          variant={item.popular ? 'solid' : 'outline'}
        >
          Choose {item.name}
          <ArrowRight className="h-4 w-4" />
        </NeonButton>
      </div>
    </motion.div>
  );
}

/* =========================================================
   ENROLLMENT MODAL
========================================================= */

function EnrollmentModal({
  selectedPackage,
  onClose,
}: {
  selectedPackage: (typeof pricing)[number];
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Enroll in ${selectedPackage.name} package`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{
          duration: 0.25,
          ease: [0.2, 0.7, 0.3, 1],
        }}
        onClick={(e) => e.stopPropagation()}
        className="glass-panel max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl p-6 shadow-elevated sm:p-8"
      >
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-dim">
              Course Enquiry
            </p>

            <h2 className="mt-2 text-xl font-bold text-fg">
              {selectedPackage.name} Package
            </h2>

            <p className="mt-1 text-sm text-muted">
              {selectedPackage.certificate} pathway · {selectedPackage.price}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-line text-muted transition hover:border-accent hover:text-accent"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-7 rounded-xl border border-line bg-soft p-7 text-center"
          >
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent">
              <Check className="h-7 w-7 text-inverse" />
            </span>

            <h3 className="mt-5 text-lg font-bold text-fg">
              Enquiry received.
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-muted">
              Thank you for your interest in the NexForTech Cybersecurity
              program. Our team will contact you with the next steps.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-6 font-mono text-[10px] uppercase tracking-widest text-fg underline-offset-4 hover:underline"
            >
              Close
            </button>
          </motion.div>
        ) : (
          <form
            className="mt-7 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <label className="block">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-dim">
                Full Name
              </span>

              <input
                required
                type="text"
                placeholder="Your full name"
                className="w-full rounded-lg border border-line bg-base px-3.5 py-3 text-sm text-fg outline-none placeholder:text-dim focus:border-accent"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-dim">
                  Email
                </span>

                <input
                  required
                  type="email"
                  placeholder="you@email.com"
                  className="w-full rounded-lg border border-line bg-base px-3.5 py-3 text-sm text-fg outline-none placeholder:text-dim focus:border-accent"
                />
              </label>

              <label className="block">
                <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-dim">
                  Phone
                </span>

                <input
                  required
                  type="tel"
                  placeholder="+61 / +91"
                  className="w-full rounded-lg border border-line bg-base px-3.5 py-3 text-sm text-fg outline-none placeholder:text-dim focus:border-accent"
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-dim">
                Package
              </span>

              <input
                value={`${selectedPackage.name} — ${selectedPackage.certificate} — ${selectedPackage.price}`}
                readOnly
                className="w-full rounded-lg border border-line bg-soft px-3.5 py-3 text-sm text-fg outline-none"
              />
            </label>

            <label className="block">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-dim">
                Message
              </span>

              <textarea
                rows={4}
                placeholder="Tell us about your background or cybersecurity goals..."
                className="w-full resize-y rounded-lg border border-line bg-base px-3.5 py-3 text-sm leading-relaxed text-fg outline-none placeholder:text-dim focus:border-accent"
              />
            </label>

            <NeonButton type="submit" className="w-full justify-center">
              Submit Enquiry
              <ArrowRight className="h-4 w-4" />
            </NeonButton>

            <p className="text-center font-mono text-[9px] leading-relaxed text-dim">
              Your information will only be used to respond to your course
              enquiry.
            </p>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function CyberSecurityCourse() {
  const [activePhase, setActivePhase] = useState(1);
  const [openModule, setOpenModule] = useState<number | null>(1);
  const [selectedPackage, setSelectedPackage] =
    useState<(typeof pricing)[number] | null>(null);

  const phase = phases.find((item) => item.id === activePhase) ?? phases[0];

  const totalModules = phases.reduce(
    (total, currentPhase) => total + currentPhase.modules.length,
    0,
  );

  return (
    <>
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden border-b border-overlay/[0.08]">
        <HeroGlow />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 md:px-8 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              ease: [0.2, 0.7, 0.3, 1],
            }}
            className="max-w-4xl"
          >
            <span className="inline-flex items-center gap-2 rounded-md border border-line bg-overlay/[0.04] px-3 py-1.5 font-mono text-[10px] tracking-[0.16em] text-muted sm:text-[11px]">
              <Shield className="h-3.5 w-3.5 text-accent" />
              NEXFORTECH · CYBERSECURITY PROGRAM
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.04] tracking-tight text-fg sm:text-5xl md:text-6xl lg:text-7xl">
              Learn cybersecurity.
              <br />
              <span className="text-gradient-white">
                Build real-world skills.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted sm:text-base md:text-lg">
              A structured cybersecurity program covering fundamentals,
              ethical hacking, vulnerability assessment, web security, SOC
              operations, digital forensics, threat intelligence and career
              readiness.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <NeonButton
                onClick={() => setSelectedPackage(pricing[1])}
              >
                Explore Professional
                <ArrowRight className="h-4 w-4" />
              </NeonButton>

              <NeonButton href="#curriculum" variant="outline">
                View Curriculum
              </NeonButton>
            </div>

            {/* Stats */}
            <div className="mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                {
                  icon: Clock,
                  value: '160+',
                  label: 'Training Hours',
                },
                {
                  icon: FileCheck2,
                  value: '13',
                  label: 'Core Modules',
                },
                {
                  icon: Laptop,
                  value: 'Hands-On',
                  label: 'Practical Labs',
                },
                {
                  icon: Award,
                  value: '3',
                  label: 'Package Options',
                },
              ].map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-line bg-soft p-4"
                  >
                    <Icon className="h-4 w-4 text-accent" />

                    <p className="mt-3 text-lg font-bold text-fg">
                      {stat.value}
                    </p>

                    <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-dim">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          PROGRAM OVERVIEW
      ===================================================== */}
      <section className="py-16 sm:py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-8">
          <SectionHeader
            badge="flag{program.overview}"
            title="A complete cybersecurity learning path."
            description="Start with the fundamentals, move into practical security testing, and finish with professional SOC, investigation and career skills."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Network,
                title: 'Foundation',
                text: 'Networking, operating systems and security principles.',
              },
              {
                icon: LockKeyhole,
                title: 'Offensive Security',
                text: 'Ethical hacking, reconnaissance and vulnerability assessment.',
              },
              {
                icon: Shield,
                title: 'Defensive Security',
                text: 'SOC, SIEM, incident response and threat intelligence.',
              },
              {
                icon: GraduationCap,
                title: 'Career Ready',
                text: 'Reporting, portfolio, resume and interview preparation.',
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  whileHover={{ y: -3 }}
                  className="rounded-2xl border border-line bg-soft p-6"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-base">
                    <Icon className="h-5 w-5 text-accent" />
                  </span>

                  <h3 className="mt-5 text-base font-bold text-fg">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          CURRICULUM
      ===================================================== */}
      <section
        id="curriculum"
        className="border-y border-overlay/[0.08] bg-soft/30 py-20 md:py-28"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-8">
          <SectionHeader
            badge="flag{full.curriculum}"
            title="Three phases. Thirteen modules."
            description="The curriculum is structured to take students from cybersecurity fundamentals to practical security operations and career readiness."
          />

          {/* Phase Tabs */}
          <div className="mt-12 grid gap-3 md:grid-cols-3">
            {phases.map((item) => {
              const active = item.id === activePhase;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActivePhase(item.id);
                    setOpenModule(item.modules[0]?.id ?? null);
                  }}
                  aria-pressed={active}
                  className={cn(
                    'group rounded-2xl border p-5 text-left transition-all duration-300',
                    active
                      ? 'border-accent bg-surface shadow-glow-soft'
                      : 'border-line bg-soft hover:border-line-strong',
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        'font-mono text-[10px] uppercase tracking-[0.18em]',
                        active ? 'text-accent' : 'text-dim',
                      )}
                    >
                      Phase {item.id}
                    </span>

                    <span className="font-mono text-[10px] text-dim">
                      {item.duration}
                    </span>
                  </div>

                  <h3 className="mt-3 text-xl font-bold capitalize text-fg">
                    {item.title}
                  </h3>

                  <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-dim">
                    {item.hours}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Phase Header */}
          <AnimatePresence mode="wait">
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-8"
            >
              <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
                <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                  <div className="max-w-3xl">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                      Phase {phase.id} · {phase.duration} · {phase.hours}
                    </p>

                    <h2 className="mt-2 text-2xl font-bold capitalize tracking-tight text-fg sm:text-3xl">
                      {phase.title}
                    </h2>

                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {phase.description}
                    </p>
                  </div>

                  <div className="flex-none rounded-xl border border-line bg-soft px-4 py-3">
                    <p className="font-mono text-[9px] uppercase tracking-widest text-dim">
                      Modules
                    </p>

                    <p className="mt-1 text-lg font-bold text-fg">
                      {phase.modules.length}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modules */}
              <div className="mt-5 space-y-3">
                {phase.modules.map((module) => (
                  <ModuleCard
                    key={module.id}
                    module={module}
                    open={openModule === module.id}
                    onToggle={() =>
                      setOpenModule(
                        openModule === module.id ? null : module.id,
                      )
                    }
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* =====================================================
          WHAT STUDENTS GET
      ===================================================== */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-8">
          <SectionHeader
            badge="flag{student.outcomes}"
            title="More than course content."
            description="The program is designed around practical capability, evidence of skills and career preparation."
          />

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Laptop,
                title: 'Hands-On Labs',
                text: 'Work through practical security scenarios in controlled learning environments.',
              },
              {
                icon: Shield,
                title: 'Security Skills',
                text: 'Build offensive and defensive cybersecurity foundations.',
              },
              {
                icon: FileCheck2,
                title: 'Professional Reports',
                text: 'Learn how to document vulnerabilities, incidents and investigations.',
              },
              {
                icon: Users,
                title: 'Career Readiness',
                text: 'Build a portfolio, improve your resume and prepare for interviews.',
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-line bg-soft p-6"
                >
                  <Icon className="h-5 w-5 text-accent" />

                  <h3 className="mt-4 text-base font-bold text-fg">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          CERTIFICATION + PRICING
      ===================================================== */}
      <section
        id="pricing"
        className="border-y border-overlay/[0.08] bg-soft/30 py-20 md:py-28"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-8">
          <SectionHeader
            badge="flag{certification.packages}"
            title="Choose your certification pathway."
            description="Select the package that best matches your learning and career goals. Certification is positioned as the core outcome, with NexForTech training providing the structured path to prepare."
          />

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {pricing.map((item) => (
              <PricingCard
                key={item.name}
                item={item}
                onSelect={() => setSelectedPackage(item)}
              />
            ))}
          </div>

          {/* Pricing Note */}
          <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-line bg-surface p-5 text-center">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-dim">
              Client-facing package pricing
            </p>

            <p className="mt-2 text-sm leading-relaxed text-muted">
              Package pricing includes the cybersecurity learning pathway and
              the certification-focused components listed above.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <HeroGlow />

        <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-soft px-4 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-dim">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            NexForTech Cybersecurity
          </span>

          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-fg sm:text-4xl md:text-5xl">
            Ready to build your cybersecurity career?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            Choose your certification pathway and start building practical
            cybersecurity skills through a structured, hands-on program.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <NeonButton
              onClick={() => setSelectedPackage(pricing[1])}
            >
              Choose Professional
              <ArrowRight className="h-4 w-4" />
            </NeonButton>

            <NeonButton href="#curriculum" variant="outline">
              Explore Curriculum
            </NeonButton>
          </div>
        </div>
      </section>

      {/* =====================================================
          ENROLLMENT MODAL
      ===================================================== */}
      <AnimatePresence>
        {selectedPackage && (
          <EnrollmentModal
            selectedPackage={selectedPackage}
            onClose={() => setSelectedPackage(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}