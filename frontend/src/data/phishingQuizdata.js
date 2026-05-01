// ✅ src/data/phishingQuizData.js

export const phishingQuizTopics = [
  {
    id: "topic_1",
    title: "What is Phishing?",
    prompts: [
      {
        question:
          "You receive an email from your bank asking you to “verify your account within 1 hour.” What is the safest action?",
        options: [
          "Click the link and log in immediately",
          "Call the bank using their official website number",
          "Reply to the email asking for confirmation",
          "Ignore and delete without checking",
        ],
        correctAnswer: 1,
      },
      {
        question: "A phishing email often tries to:",
        options: [
          "Educate users about security",
          "Offer free antivirus software",
          "Trick users into revealing sensitive information",
          "Send harmless promotional messages",
        ],
        correctAnswer: 2,
      },
      {
        question: "Which of the following best describes phishing?",
        options: [
          "Hacking through Wi-Fi networks",
          "Sending fraudulent communications posing as trusted entities",
          "Installing ransomware",
          "Using DDoS attacks",
        ],
        correctAnswer: 1,
      },
      {
        question: "The psychological element most exploited in phishing is:",
        options: ["Laziness", "Trust", "Intelligence", "Speed"],
        correctAnswer: 1,
      },
      {
        question:
          "You get a message claiming your email password will expire today; it includes a link. What should you do first?",
        options: [
          "Open the link immediately",
          "Verify the sender’s authenticity",
          "Change password through that link",
          "Share the link with friends",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which of the following is not a phishing channel?",
        options: ["SMS", "Email", "Social media", "BIOS firmware"],
        correctAnswer: 3,
      },
      {
        question: "Phishing attacks are most effective because they:",
        options: [
          "Use advanced encryption",
          "Exploit human behavior",
          "Infect systems automatically",
          "Require admin access",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which is an example of spear phishing?",
        options: [
          "Random spam emails",
          "A personalized email to a company’s finance manager",
          "Pop-up advertisements",
          "Generic malware infection",
        ],
        correctAnswer: 1,
      },
      {
        question: "The best preventive measure against phishing is:",
        options: [
          "Using only mobile devices",
          "User awareness and training",
          "Ignoring all emails",
          "Regular PC restarts",
        ],
        correctAnswer: 1,
      },
      {
        question: "The term “phishing” originated because attackers were:",
        options: [
          "Fishing for personal information",
          "Coding fake websites",
          "Encrypting hard drives",
          "Testing email servers",
        ],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: "topic_2",
    title: "How Phishing Works (Anatomy of an Attack)",
    prompts: [
      {
        question:
          "An attacker researches an employee’s LinkedIn profile before crafting an email. Which attack phase is this?",
        options: ["Delivery", "Reconnaissance", "Exploitation", "Exfiltration"],
        correctAnswer: 1,
      },
      {
        question:
          "You receive an email urging you to “reset your password now” with a branded button. Which phase does this represent?",
        options: [
          "Crafting the lure & deception stage",
          "Reconnaissance",
          "C2 communication",
          "Data exfiltration",
        ],
        correctAnswer: 0,
      },
      {
        question:
          "A user enters their credentials into a fake login page. What is occurring?",
        options: [
          "Malware installation",
          "Credential harvesting",
          "Reconnaissance",
          "Delivery",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "An email with a malicious attachment successfully arrives in your inbox. Which phase is this?",
        options: ["Exploitation", "Delivery", "Interaction", "Lure creation"],
        correctAnswer: 1,
      },
      {
        question:
          "Attackers sending millions of phishing emails at once is an example of:",
        options: [
          "C2 channel",
          "Automated reconnaissance",
          "Mass delivery using botnets",
          "Exfiltration",
        ],
        correctAnswer: 2,
      },
      {
        question:
          "A phishing page that relays your login attempt to the real website to bypass MFA is known as:",
        options: [
          "Static phishing",
          "Proxy-based phishing attack",
          "Social login attack",
          "Credential stuffing",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "The attacker installs spyware after you open a document attachment. Which stage?",
        options: [
          "Delivery",
          "Exploitation / Installation of malware",
          "Reconnaissance",
          "Exfiltration",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "A compromised machine starts sending data to an external server regularly. This indicates:",
        options: [
          "Credential harvesting",
          "Command & control communication (C2)",
          "Reconnaissance",
          "Lure crafting",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "An attacker uses stolen credentials to access a payroll system. Which stage is this?",
        options: [
          "Exploitation & misuse of data",
          "Delivery",
          "Reconnaissance",
          "Interaction",
        ],
        correctAnswer: 0,
      },
      {
        question:
          "A user clicks a link because the message claims their 'account will be disabled today.' This reflects:",
        options: [
          "Technical vulnerability",
          "Psychological manipulation (urgency trigger)",
          "Browser failure",
          "Network misconfiguration",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "topic_3",
    title: "Recognizing Red Flags",
    prompts: [
      {
        question:
          "You receive an email from “IT Support,” but the reply-to address belongs to a Gmail account. What is the red flag?",
        options: [
          "Clear formatting",
          "Suspicious sender domain",
          "Too many images",
          "Long subject line",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "A message says, “Your payroll will be suspended unless you verify now.” This represents which common tactic?",
        options: [
          "Accuracy",
          "Urgency manipulation",
          "Technical update",
          "Scheduled maintenance",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "You hover over a link labeled “www.bank.com,” but it shows “www.bank-security-check.net.” What red flag is this?",
        options: [
          "Non-urgent message",
          "Link mismatch and typosquatting",
          "Missing attachments",
          "Large file size",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "An email addressed “Dear Customer” claims your employee record needs updating. What’s suspicious?",
        options: [
          "Generic greeting used instead of personalized name",
          "Use of bold text",
          "Normal salutation",
          "Simple formatting",
        ],
        correctAnswer: 0,
      },
      {
        question:
          "You receive an attachment titled “Invoice_0725.exe” from an unknown sender. What red flag stands out?",
        options: [
          "File is too small",
          "Executable attachment from an unexpected source",
          "Logo quality",
          "No CC recipients",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "A message contains poor grammar and unusual sentence structure. What does this indicate?",
        options: [
          "Official communication",
          "Possibly machine translated or attacker-written content",
          "Internal memo",
          "Confidential approval",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "A social media message claims you won a free iPhone but you never entered any contest. What is the red flag?",
        options: [
          "Normal support content",
          "“Too good to be true” offer",
          "Regular promotion",
          "Technical update",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "You notice the sender's company logo is stretched and blurry. This is an example of:",
        options: [
          "Perfect branding",
          "Visual inconsistency indicating possible phishing page/email",
          "High-quality corporate design",
          "Internal customization",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "You receive an email late at night from a colleague who never works after hours, asking for confidential files. What red flag is most relevant?",
        options: [
          "Normal workflow",
          "Behavioral anomaly in timing and request nature",
          "Correct email format",
          "Short subject line",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "A message asks you to “Enable Macros” to view a document. Why is this suspicious?",
        options: [
          "Macros improve quality",
          "Macros are required for safe browsing",
          "Macros can run malicious code inside documents—major red flag",
          "It increases file size",
        ],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "topic_4",
    title: "Email Header & Link Inspection",
    prompts: [
      {
        question:
          "You inspect the header and see SPF = “Fail.” What does this indicate?",
        options: [
          "Email is fully verified",
          "Sender IP is not authorized for that domain",
          "Email is encrypted",
          "Email is from internal network",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "The “From” address shows your manager, but the “Return-Path” shows a strange foreign domain. What is likely happening?",
        options: [
          "Normal routing",
          "Display name conflict",
          "Email spoofing attempt",
          "Server maintenance",
        ],
        correctAnswer: 2,
      },
      {
        question:
          "You hover over a button labeled “Update Password,” and the link shows a non-HTTPS site. What should you conclude?",
        options: [
          "Safe company page",
          "Possibly insecure or malicious link",
          "Link is broken",
          "Certificate is optional",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "An email’s Received chain shows it originated from an IP not associated with your company. Why is this a red flag?",
        options: [
          "Emails must always come from localhost",
          "Origin IP helps identify spoofing or compromised servers",
          "All emails should have the same IP",
          "Emails never travel through multiple servers",
        ],
        correctAnswer: 1,
      },
      {
        question: "DKIM fails during header inspection. What does this imply?",
        options: [
          "Email content might have been altered in transit",
          "Email is guaranteed safe",
          "Server time is incorrect",
          "Signature not required",
        ],
        correctAnswer: 0,
      },
      {
        question:
          "A link appears as “www.microsoft.com,” but after hovering, it displays “m1crosoft-sec-login.net.” What technique is being used?",
        options: [
          "Hashing",
          "Typosquatting & link masking",
          "Port scanning",
          "Tunneling",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "You find an email with a newly registered domain created 3 days ago. Why is this suspicious?",
        options: [
          "New domains are always safe",
          "Attackers often register new domains for quick phishing campaigns",
          "Email filters prefer new domains",
          "Older domains block emails",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "An attacker embeds an invisible link behind an image. What tactic is this?",
        options: [
          "Redirection via image hyperlinking (obfuscation)",
          "Domain aging",
          "Macro injection",
          "Header forwarding",
        ],
        correctAnswer: 0,
      },
      {
        question:
          "You see an email where the SPF passes but DKIM fails. What is most likely?",
        options: [
          "Email is secure",
          "Sender IP is valid but message content may be altered",
          "Domain expiration warning",
          "Multi-factor authentication issue",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "You hover over a link and notice it redirects through multiple unknown websites before landing on a login page. What does this indicate?",
        options: [
          "Normal corporate routing",
          "Multi-layer security",
          "Potential malicious redirect chain used to hide phishing pages",
          "Browser update needed",
        ],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "topic_5",
    title: "Attachment & File-Based Threats",
    prompts: [
      {
        question:
          "You receive a file named “PaymentDetails.pdf.exe.” What is the red flag?",
        options: [
          "PDF is too large",
          "Double extension hiding an executable file",
          "File name is too long",
          "Email has no greeting",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "An email asks you to “Enable Content” in an attached document. What should you suspect?",
        options: [
          "Document needs formatting",
          "Macro-based malware delivery attempt",
          "File is corrupted",
          "Printer issue",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "You receive a ZIP file from an unknown sender with a password in the message. What is suspicious?",
        options: [
          "File compression",
          "Encrypted ZIP used to bypass security scans",
          "File is small",
          "Sender used uppercase letters",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "A vendor sends an invoice, but you're not responsible for processing invoices. What is this?",
        options: [
          "Standard operation",
          "Role mismatch—likely phishing attempt via malicious attachment",
          "Friendly communication",
          "Accidental email",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "A scanned PDF opens with a prompt to update Adobe Reader. What should you assume?",
        options: [
          "Normal update",
          "Potential malicious script embedded in PDF prompting fake updates",
          "Software optimization",
          "Missing font",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "An employee receives an encrypted Excel file but was not expecting it. What should they do first?",
        options: [
          "Enter the password",
          "Immediately open the file",
          "Verify the sender and purpose through a separate communication channel",
          "Upload it to shared drive",
        ],
        correctAnswer: 2,
      },
      {
        question:
          "The attachment preview feature in cloud storage helps because:",
        options: [
          "It downloads files faster",
          "It bypasses network monitoring",
          "It allows viewing without executing the file locally, reducing risk",
          "It reduces storage cost",
        ],
        correctAnswer: 2,
      },
      {
        question:
          "You run a suspicious attachment in a sandbox, and it starts contacting external IP addresses. What does this indicate?",
        options: [
          "Normal file behavior",
          "Potential malware trying to establish command & control communication",
          "Software update",
          "Network optimization",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "An email claims to be from HR but the file inside contains JavaScript code. Why is this suspicious?",
        options: [
          "HR always uses JavaScript",
          "JavaScript attachments are uncommon and often malicious in corporate workflows",
          "JavaScript files run safer",
          "Script automates attendance",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "You receive an attachment with an extension “.xlsm,” but you expected “.xlsx.” What should you conclude?",
        options: [
          "It's just a color change",
          "File is macro-enabled and may contain active scripts—needs caution",
          "File is corrupted",
          "It’s a temporary file",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "topic_6",
    title: "Social Engineering & Human Exploitation",
    prompts: [
      {
        question:
          "You receive a call from “IT Support” asking for your password to fix an urgent issue. What should you do?",
        options: [
          "Provide the password since they sound professional",
          "Ask them to email confirmation",
          "Verify through official IT channels before responding",
          "Ignore the call",
        ],
        correctAnswer: 2,
      },
      {
        question:
          "An attacker researches an employee’s LinkedIn and creates a believable HR pretext. What technique is being used?",
        options: ["Vishing", "Pretexting", "Tailgating", "Credential stuffing"],
        correctAnswer: 1,
      },
      {
        question:
          "You receive an SMS claiming your bank account is frozen. What type of attack is this?",
        options: ["Vishing", "Smishing", "Pretexting", "Malware injection"],
        correctAnswer: 1,
      },
      {
        question:
          "A caller pretends to be your manager and requests financial documents. What should you do?",
        options: [
          "Send the documents immediately",
          "Ask for verification through internal channels",
          "Appear cooperative to avoid conflict",
          "Ignore and block the number",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "An attacker impersonates a vendor requesting payment details. What are they exploiting?",
        options: [
          "Technical flaws",
          "Human trust",
          "Database vulnerabilities",
          "MFA gaps",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "Someone tailgates you into a secure office area. This is an example of:",
        options: [
          "Social engineering",
          "Malware",
          "Password spraying",
          "Reconnaissance",
        ],
        correctAnswer: 0,
      },
      {
        question:
          "You receive an email from “HR” with 'Updated Salary Structure' attached. What should you do?",
        options: [
          "Directly open it",
          "Forward it to colleagues",
          "Inspect the sender address and verify legitimacy",
          "Download it to check later",
        ],
        correctAnswer: 2,
      },
      {
        question:
          "An attacker pressures you to act quickly by saying “system will shut down in 10 minutes.” What tactic is this?",
        options: [
          "Technical exploitation",
          "Urgency principle",
          "Reverse engineering",
          "MFA bypass",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "Someone posing as an auditor asks for your system login. What should you do?",
        options: [
          "Give temporary access",
          "Ask a coworker",
          "Refuse and report it",
          "Share limited credentials",
        ],
        correctAnswer: 2,
      },
      {
        question:
          "A fake WhatsApp message claiming to be CEO asks for gift card codes. This attack relies on:",
        options: [
          "Complex malware",
          "Authority exploitation",
          "System misconfiguration",
          "Encryption failure",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "topic_7",
    title: "Password & MFA Security",
    prompts: [
      {
        question:
          "You receive an MFA push notification you didn’t initiate. What should you do?",
        options: [
          "Approve it",
          "Ignore and report it",
          "Restart device",
          "Approve repeated prompts",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "A phishing page steals your password then asks for OTP. Which attack is this?",
        options: [
          "Password spraying",
          "MFA fatigue attack",
          "Real-time phishing proxy",
          "Brute force",
        ],
        correctAnswer: 2,
      },
      {
        question:
          "A colleague shares their password with a team member. This increases the risk of:",
        options: [
          "MFA bypass",
          "Credential compromise",
          "Software malfunction",
          "Network latency",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "An attacker steals your password but MFA blocks login because:",
        options: [
          "Wrong browser",
          "Attacker lacks second factor",
          "Works only in office hours",
          "System glitch",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "Message pretending to be cybersecurity team asking for password is:",
        options: [
          "Legitimate maintenance",
          "Password reset",
          "Credential phishing",
          "MFA enrollment",
        ],
        correctAnswer: 2,
      },
      {
        question: "Using the same password everywhere increases risk of:",
        options: [
          "Zero-day",
          "Credential stuffing",
          "Encryption failure",
          "Firewall issue",
        ],
        correctAnswer: 1,
      },
      {
        question: "System asking for extra verification due to foreign IP is:",
        options: [
          "Social engineering",
          "Conditional access control",
          "Firewall enforcement",
          "Patch management",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "Approving repeated MFA prompts out of frustration causes compromise. This attack is:",
        options: [
          "Push fatigue attack",
          "SQL injection",
          "DDoS",
          "Brute forcing",
        ],
        correctAnswer: 0,
      },
      {
        question: "SIM swapping is used to steal:",
        options: [
          "Device settings",
          "Email provider",
          "Your second authentication factor",
          "Password manager",
        ],
        correctAnswer: 2,
      },
      {
        question: "Login requiring password + fingerprint is:",
        options: [
          "Single-factor",
          "Two-factor authentication",
          "Passwordless",
          "No authentication",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "topic_8",
    title: "Reporting Phishing & Incident Response",
    prompts: [
      {
        question:
          "You receive a suspicious bank email. What should you do first?",
        options: [
          "Delete it",
          "Report to security",
          "Forward to coworkers",
          "Reply",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "Coworker clicked a suspicious link but says 'nothing happened.' What should they do?",
        options: ["Ignore", "Wait", "Report immediately", "Restart laptop"],
        correctAnswer: 2,
      },
      {
        question: "Unsure about an email? Best action?",
        options: [
          "Open it",
          "Mark spam",
          "Report even if unsure",
          "Ask friends",
        ],
        correctAnswer: 2,
      },
      {
        question: "Most important info to include when reporting phishing?",
        options: [
          "Personal opinion",
          "Email header and link details",
          "Only subject",
          "Summary without evidence",
        ],
        correctAnswer: 1,
      },
      {
        question: "Forwarding phishing email to team members is:",
        options: [
          "Helpful",
          "Neutral",
          "Risky and should be avoided",
          "Required",
        ],
        correctAnswer: 2,
      },
      {
        question:
          "IT asks you to reset password after reporting phishing. You should:",
        options: ["Delay", "Ignore", "Reset immediately", "Log out only"],
        correctAnswer: 2,
      },
      {
        question:
          "Security blocks malicious domain after your report. This means:",
        options: [
          "Reporting was unnecessary",
          "Early reporting prevents compromise",
          "Incident resolves itself",
          "Domain was harmless",
        ],
        correctAnswer: 1,
      },
      {
        question: "You deleted a phishing email before reporting. What now?",
        options: [
          "Stay silent",
          "Report even without email",
          "Recover it only",
          "Recreate from memory",
        ],
        correctAnswer: 1,
      },
      {
        question: "You get suspicious login alerts. Whom should you contact?",
        options: ["HR", "Legal", "Security/IT", "Front desk"],
        correctAnswer: 2,
      },
      {
        question:
          "Incident team asks for screenshots after reporting. This means:",
        options: [
          "They are blaming you",
          "They need more data for investigation",
          "Report was incorrect",
          "Issue already resolved",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "topic_9",
    title: "Post-Phishing Response & Recovery",
    prompts: [
      {
        question:
          "You clicked a suspicious link but entered no info. First step?",
        options: [
          "Ignore",
          "Report to security",
          "Delete history",
          "Restart PC",
        ],
        correctAnswer: 1,
      },
      {
        question: "You entered your password into a phishing page. What now?",
        options: [
          "Log out and continue",
          "Disable account",
          "Change password immediately",
          "Wait",
        ],
        correctAnswer: 2,
      },
      {
        question:
          "After opening suspicious attachment, device is slow. Best action?",
        options: [
          "Keep working",
          "Disconnect from internet",
          "Delete temp files",
          "Update OS",
        ],
        correctAnswer: 1,
      },
      {
        question: "Login attempts from foreign countries indicate:",
        options: [
          "Routine scanning",
          "Account compromise",
          "System update",
          "VPN malfunction",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "Security asks user to enable MFA after credential theft because:",
        options: [
          "Restore deleted files",
          "Block unauthorized access",
          "Speed up login",
          "Avoid password resets",
        ],
        correctAnswer: 1,
      },
      {
        question: "Repeated MFA prompts you didn’t initiate suggest:",
        options: [
          "Network downtime",
          "Someone trying to log in",
          "MFA app malfunction",
          "Account deactivation",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "Browser auto-downloads a file after malicious link click. You should:",
        options: [
          "Open the file",
          "Delete quietly",
          "Report and stop using device",
          "Upload to cloud",
        ],
        correctAnswer: 2,
      },
      {
        question:
          "IT asking for time and screenshot of suspicious email means:",
        options: [
          "They doubt your claim",
          "Need evidence for investigation",
          "Reinstall OS needed",
          "Punish sender",
        ],
        correctAnswer: 1,
      },
      {
        question: "Colleague clicked link but 'did nothing else.' You advise:",
        options: ["No action", "Wait", "Report it anyway", "Clear cache"],
        correctAnswer: 2,
      },
      {
        question: "Which behavior is a sign of device compromise?",
        options: [
          "System normal",
          "Pop-ups and unknown apps",
          "Antivirus updating",
          "Longer boot after updates",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "topic_10",
    title: "Role_specific-Scenario",
    prompts: [
      {
        question:
          "A finance officer receives an email from a vendor requesting a bank account update for future payments. What should they do?",
        options: [
          "Update the bank details immediately",
          "Ignore the email",
          "Verify with the vendor using official contact channels",
          "Forward it to coworkers",
        ],
        correctAnswer: 2,
      },
      {
        question:
          "A CEO receives an email asking them to urgently approve a wire transfer while traveling. Red flag?",
        options: [
          "The urgency and unusual request",
          "The email is polite",
          "The message includes greetings",
          "The email is short",
        ],
        correctAnswer: 0,
      },
      {
        question:
          "An HR manager receives a resume PDF that requires enabling macros. What should they do?",
        options: [
          "Enable macros to read it",
          "Delete without reporting",
          "Report it as suspicious",
          "Forward it to a colleague",
        ],
        correctAnswer: 2,
      },
      {
        question:
          "A developer gets an email saying 'Critical security patch — install now' with a link. Correct action?",
        options: [
          "Download immediately",
          "Verify through official documentation",
          "Ignore the patch",
          "Run it in a sandbox yourself",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "IT admin receives a request to reset a password urgently. What should the admin do?",
        options: [
          "Reset immediately",
          "Ask for identity verification",
          "Ignore the request",
          "Share a default password",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "Support rep gets a call asking for account details. What must they do first?",
        options: [
          "Provide the details",
          "Transfer the call to HR",
          "Authenticate the caller",
          "Continue casually",
        ],
        correctAnswer: 2,
      },
      {
        question:
          "A marketing employee receives a collaboration link redirecting to a login page. This is a sign of:",
        options: [
          "Normal partnership process",
          "Branding survey",
          "Credential phishing",
          "Browser update",
        ],
        correctAnswer: 2,
      },
      {
        question:
          "Academic staff receives an .exe file from a student claiming portal issues. What should they do?",
        options: [
          "Run it",
          "Reply asking for another version",
          "Report and avoid opening the attachment",
          "Upload to campus portal",
        ],
        correctAnswer: 2,
      },
      {
        question:
          "Sales employee receives login verification link for a discount. Correct response?",
        options: [
          "Enter login details",
          "Share with friends",
          "Check if the domain matches official services",
          "Click first then verify",
        ],
        correctAnswer: 2,
      },
      {
        question:
          "Sysadmin sees multiple reset requests from an employee who didn’t initiate them. This indicates:",
        options: [
          "Normal reset attempt",
          "Account compromise attempt",
          "Device malfunction",
          "Attacker testing antivirus",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "topic_11",
    title: "Safe Social Media & Public Info Hygiene",
    prompts: [
      {
        question:
          "You receive a friend request from someone with your colleague’s name/photo but the account is new. What’s the safest response?",
        options: [
          "Accept the request",
          "Message them on another platform for confirmation",
          "Ignore the request",
          "Report immediately",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "An attacker gathers your birthday, hometown, and school from social media. What attack is likely?",
        options: [
          "SQL injection",
          "Social engineering to bypass authentication questions",
          "DDoS attack",
          "Network sniffing",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "Friend tags you in a giveaway with a suspicious external link. What should you do?",
        options: [
          "Click the link",
          "Ignore it",
          "Remove the tag and warn your friend",
          "Repost it",
        ],
        correctAnswer: 2,
      },
      {
        question:
          "You posted a photo accidentally showing confidential info. Correct action?",
        options: [
          "Delete the post and inform supervisor",
          "Edit the caption",
          "Leave it",
          "Blur and reupload before deletion",
        ],
        correctAnswer: 0,
      },
      {
        question:
          "A message claims your Instagram violated guidelines and asks you to click a link. This is:",
        options: [
          "Routine verification",
          "Social media phishing",
          "Security audit",
          "Password reminder",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "Coworker posts office photo showing ID cards/screens. Biggest risk?",
        options: [
          "Loss of likes",
          "Brand reputation damage",
          "Leakage of confidential info",
          "Lower engagement",
        ],
        correctAnswer: 2,
      },
      {
        question:
          "Using same password for Facebook and corporate account results in what risk?",
        options: [
          "Website shutdown",
          "Unauthorized access to corporate account",
          "Deletion of FB posts",
          "Slow internet",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "Influencer promotes investment group using shortened link. Safest step?",
        options: [
          "Preview the link using expander/scanner",
          "Open in incognito",
          "Ask others",
          "Disable antivirus",
        ],
        correctAnswer: 0,
      },
      {
        question:
          "Attacker creates fake profile using your public photos/info. What practice prevents this?",
        options: [
          "Posting more",
          "Limiting profile visibility",
          "Using VPN",
          "Following fewer people",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "Sibling posts your personal details publicly. What should you do?",
        options: [
          "Ignore it",
          "Request removal or remove identifiable details",
          "Comment more details",
          "Block them",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "topic_12",
    title: "Legal / Policy / Consequences",
    prompts: [
      {
        question:
          "Company delays breach reporting beyond legal time. Consequence?",
        options: [
          "More email traffic",
          "Regulatory fines for non-compliance",
          "Faster recovery",
          "Auto-dismissal of employees",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "Employee shares login credentials with colleague. What violation?",
        options: [
          "Acceptable social media use",
          "Password confidentiality breach",
          "Bandwidth misuse",
          "Data retention violation",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "Phishing attack is launched from another country. Which is correct?",
        options: [
          "Cannot be prosecuted",
          "Only victim country's laws apply",
          "International frameworks can enable prosecution",
          "No action possible",
        ],
        correctAnswer: 2,
      },
      {
        question:
          "User clicks phishing link, leaks data, but doesn't report. Result?",
        options: [
          "More storage use",
          "Delayed response worsening breach",
          "Better performance",
          "Auto password reset",
        ],
        correctAnswer: 1,
      },
      {
        question: "Breach due to no MFA. Consequence?",
        options: [
          "Criminal charges for customers",
          "Legal penalties for failing to protect data",
          "Free advertising",
          "Employee morale boost",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "Terminated employee still has access and attacks org. Failure?",
        options: [
          "Poor asset procurement",
          "Ineffective access management",
          "Weak auditing",
          "Too much training",
        ],
        correctAnswer: 1,
      },
      {
        question: "Employee ignoring training — HR issues warning. This is:",
        options: [
          "Criminal",
          "Regulatory",
          "Organizational disciplinary action",
          "Technical malfunction",
        ],
        correctAnswer: 2,
      },
      {
        question:
          "Company suffers reputation damage from phishing breach. Long-term effect?",
        options: [
          "Increased trust",
          "Higher stock price",
          "Loss of clients & financial decline",
          "Better system stability",
        ],
        correctAnswer: 2,
      },
      {
        question: "Manager instructs staff to hide incident. Issue?",
        options: [
          "Improves morale",
          "Ensures compliance",
          "Violates ethical/reporting obligations",
          "Strengthens security",
        ],
        correctAnswer: 2,
      },
      {
        question:
          "Hacker running phishing operation is arrested. Likely outcome?",
        options: [
          "Mandatory training",
          "Civil fines, prison time, or both",
          "Promotion",
          "A warning letter",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "topic_13",
    title: "Ongoing Threat Trends & Real Case Studies",
    prompts: [
      {
        question:
          "Vendor email requests updated bank details but domain is slightly different. This represents:",
        options: [
          "Random spam",
          "Business Email Compromise (BEC)",
          "DDoS attack",
          "System upgrade",
        ],
        correctAnswer: 1,
      },
      {
        question: "CEO voice is impersonated using AI in voicemail. This is:",
        options: [
          "SQL injection",
          "Deepfake-assisted phishing",
          "Password violation",
          "Network sniffing",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "QR code at restaurant redirects to login page. What is happening?",
        options: [
          "Cloud failure",
          "Quishing (QR phishing)",
          "WPA2 attack",
          "Normal marketing",
        ],
        correctAnswer: 1,
      },
      {
        question: "Fake Microsoft 365 login page targets:",
        options: [
          "Local hardware",
          "Cloud credentials",
          "Wi-Fi encryption",
          "USB devices",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "Fake job offer via LinkedIn followed by malicious form. Attack relies on:",
        options: [
          "Random guessing",
          "Trust-building via social media",
          "Hardware weakness",
          "Router issues",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "SMS about package delivery leads to fake payment page. This is:",
        options: [
          "Smishing",
          "Privilege escalation",
          "Data compression",
          "Software patching",
        ],
        correctAnswer: 0,
      },
      {
        question:
          "Phishing email with no links/attachments asks for files directly. Trend?",
        options: [
          "Malware-driven attack",
          "BEC simplicity (no payload phishing)",
          "Hardware sabotage",
          "DNS poisoning",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "Attackers use OAuth permissions instead of stealing passwords. Technique?",
        options: [
          "Zero-day",
          "Token-based phishing",
          "SQL truncation",
          "VPN tunneling",
        ],
        correctAnswer: 1,
      },
      {
        question: "Multiple MFA push prompts until user accepts. Threat?",
        options: [
          "MFA-fatigue attack",
          "Botnet attack",
          "Physical breach",
          "Drive-by download",
        ],
        correctAnswer: 0,
      },
      {
        question: "Criminals impersonate govt officials via WhatsApp. This is:",
        options: [
          "Hardware failure",
          "Multi-channel social engineering",
          "Network misconfiguration",
          "Firewall bypass",
        ],
        correctAnswer: 1,
      },
    ],
  },
];

// ---------------- PAGE 2 ----------------

export const phishingAttackCategories = [
  {
    id: "email_message",
    title: "Email / message-based",
    subtopics: [
      {
        name: "Generic Email Phishing",
        prompts: [
          {
            question:
              "You receive an email saying “Your mailbox is full. Click here to upgrade.” It is sent to thousands of employees. This is:",
            options: ["Spear phishing", "BEC", "Whaling", "Generic phishing"],
            correctAnswer: 3,
          },
          {
            question:
              "An email from “support@secure-update.net” claims your password will expire and asks you to click a link. What should you do?",
            options: [
              "Click the link",
              "Hover over the link to check the URL",
              "Forward it to everyone",
              "Ignore it completely",
            ],
            correctAnswer: 1,
          },

          {
            question: "Generic phishing emails often rely on:",
            options: [
              "Personalization",
              "Internal company data",
              "Phone call follow-ups",
              "Urgency and volume",
            ],
            correctAnswer: 3,
          },

          {
            question:
              "You receive an email promising a prize if you click a link. The sender’s domain is unfamiliar. This is likely:",
            options: [
              "A legitimate offer",
              "Generic phishing",
              "Spear phishing",
              "Clone phishing",
            ],
            correctAnswer: 1,
          },

          {
            question:
              "Which of the following is a red flag in a generic phishing email?",
            options: [
              "Poor grammar",
              "Personalized greeting",
              "Known sender domain",
              "No attachments",
            ],
            correctAnswer: 0,
          },

          {
            question:
              "What should you do if you receive an unsolicited attachment from an unknown sender?",
            options: [
              "Open it to check",
              "Download and scan it",
              "Never download it",
              "Forward it to IT",
            ],
            correctAnswer: 2,
          },

          {
            question: "Generic phishing is effective because:",
            options: [
              "It only targets executives",
              "It needs only one person to make a mistake",
              "It uses personalized information",
              "It is always caught by spam filters",
            ],
            correctAnswer: 1,
          },

          {
            question:
              "An email claims you have a package delivery waiting and asks you to click a link. The sender is 'noreply@delivery-alert.com.' This is:",
            options: ["Generic phishing", "Legitimate", "BEC", "Whaling"],
            correctAnswer: 0,
          },

          {
            question: "How can you avoid falling for generic phishing?",
            options: [
              "Click links quickly before they expire",
              "Inspect the sender’s domain",
              "Trust all emails from 'support'",
              "Reply to suspicious emails",
            ],
            correctAnswer: 1,
          },

          {
            question:
              "You receive a mass email warning of a system outage with a link to 'fix' the issue. What is the safest action?",
            options: [
              "Contact IT directly",
              "Click the link",
              "Forward it to your team",
              "Ignore it",
            ],
            correctAnswer: 0,
          },
        ],
      },
      {
        name: "Spear-phishing",
        prompts: [
          {
            question:
              "You receive an email addressed to you by name, mentioning your manager and department, with an attachment labeled “Q4 Report.” This is most likely an example of:",
            options: [
              "Generic phishing",
              "Spear phishing",
              "Whaling",
              "Clone phishing",
            ],
            correctAnswer: 1,
          },

          {
            question:
              "An attacker researches your job title and recent projects on LinkedIn to craft a convincing email. What type of attack is this?",
            options: [
              "Spear phishing",
              "Business Email Compromise",
              "Mass phishing",
              "Vishing",
            ],
            correctAnswer: 0,
          },

          {
            question:
              "You get an email from “HR” asking you to open an attached “updated policy” file. It uses your full name and mentions your team lead. What should you do first?",
            options: [
              "Open the attachment",
              "Ignore it",
              "Forward it to all colleagues",
              "Verify the sender via a separate channel",
            ],
            correctAnswer: 3,
          },

          {
            question:
              "Which of the following is NOT typically used in spear-phishing attacks?",
            options: [
              "Email signatures",
              "Company hierarchy",
              "Random phone numbers",
              "Social media posts",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "A colleague receives an email that appears to be from IT, but it addresses them by name and references a recent ticket. This could be:",
            options: [
              "Generic spam",
              "Spear phishing",
              "Clone phishing",
              "Whaling",
            ],
            correctAnswer: 1,
          },

          {
            question: "What is the primary goal of spear phishing?",
            options: [
              "To infect thousands of random users",
              "To spoof executive emails",
              "To target specific individuals with personalized messages",
              "To resend legitimate emails",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "You receive an email that looks like it’s from your CEO, but it’s only addressed to you and references a project only your team knows about. This is likely:",
            options: ["Spear phishing", "BEC", "Generic phishing", "Whaling"],
            correctAnswer: 0,
          },

          {
            question: "Which red flag might indicate a spear-phishing email?",
            options: [
              "The email is sent to multiple recipients",
              "The tone is slightly different from the usual sender",
              "It contains no attachments",
              "It has a generic greeting like 'Dear User'",
            ],
            correctAnswer: 1,
          },

          {
            question:
              "What should you do if you receive a personalized email with an unexpected attachment from a trusted source?",
            options: [
              "Open it immediately",
              "Reply and ask for confirmation",
              "Verify through another channel first",
              "Delete it without checking",
            ],
            correctAnswer: 2,
          },

          {
            question: "Spear phishing is harder to detect because:",
            options: [
              "It uses urgent language",
              "It is personalized and targeted",
              "It comes from external domains",
              "It always contains malware",
            ],
            correctAnswer: 1,
          },
        ],
      },
      {
        name: "Whaling / Executive Targeting",
        prompts: [
          {
            question:
              "An email from what appears to be the CEO asks the finance director to authorize a confidential payment immediately. This is:",
            options: ["Generic phishing", "Clone phishing", "Whaling", "BEC"],
            correctAnswer: 2,
          },

          {
            question: "Why are executives often targeted in whaling attacks?",
            options: [
              "They have less security training",
              "They rarely check email",
              "They use personal email for work",
              "They approve payments and have high access",
            ],
            correctAnswer: 3,
          },

          {
            question:
              "A whaling email might include the instruction: “Do not call me, I’m in a meeting.” Why is this suspicious?",
            options: [
              "It prevents verification",
              "It is polite",
              "It is common in legitimate emails",
              "It is a legal requirement",
            ],
            correctAnswer: 0,
          },

          {
            question:
              "You receive an email from the “CFO” asking for an urgent salary adjustment for a new hire. What should you do?",
            options: [
              "Process it immediately",
              "Verify through a secondary channel",
              "Forward to HR",
              "Ignore it",
            ],
            correctAnswer: 1,
          },

          {
            question: "Which of the following is a sign of a whaling attempt?",
            options: [
              "Email sent to all employees",
              "No sender details",
              "Generic greeting",
              "Request for a secret, time-sensitive payment",
            ],
            correctAnswer: 3,
          },

          {
            question: "Whaling is a form of:",
            options: [
              "Mass phishing",
              "Spear phishing targeting executives",
              "Clone phishing",
              "Social media hacking",
            ],
            correctAnswer: 1,
          },

          {
            question: "How can companies defend against whaling?",
            options: [
              "Train executives regularly",
              "Allow single-approval payments",
              "Disable MFA for executives",
              "Use only email for verification",
            ],
            correctAnswer: 0,
          },

          {
            question:
              "An attacker spoofs the CEO’s email and requests a large transfer to a new bank account. This is an example of:",
            options: [
              "Generic phishing",
              "Whaling",
              "IT scam",
              "Clone phishing",
            ],
            correctAnswer: 1,
          },

          {
            question: "What makes whaling different from generic phishing?",
            options: [
              "It targets high-value individuals",
              "It is sent to thousands",
              "It uses malware links",
              "It is always caught by filters",
            ],
            correctAnswer: 0,
          },

          {
            question:
              "You receive an email from “director@companyy.com” asking for an urgent fund transfer for a confidential deal. What is the best response?",
            options: [
              "Verify by calling the director’s known number",
              "Process the transfer immediately",
              "Reply to the email for more details",
              "Delete the email",
            ],
            correctAnswer: 0,
          },
        ],
      },
      {
        name: "Business Email Compromise (BEC) / CEO Fraud",
        prompts: [
          {
            question:
              "An employee receives an email from the CFO asking to update a vendor’s bank details immediately. What type of attack is this?",
            options: [
              "Spear phishing",
              "Business Email Compromise",
              "Clone phishing",
              "Generic phishing",
            ],
            correctAnswer: 1,
          },

          {
            question:
              "You get an email from your CEO asking you to process a confidential payment urgently. What should you do?",
            options: [
              "Process it immediately",
              "Verify via phone call or secure chat",
              "Forward it to finance",
              "Ignore it",
            ],
            correctAnswer: 1,
          },

          {
            question: "Which action can help prevent BEC attacks?",
            options: [
              "Disabling multi-factor authentication",
              "Enabling automatic email forwarding",
              "Implementing payment approval workflows",
              "Using the same password for all accounts",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "An attacker creates a domain that looks almost identical to your company’s domain to send fake payment requests. This is a method used in:",
            options: ["Generic phishing", "BEC", "Whaling", "Spear phishing"],
            correctAnswer: 1,
          },

          {
            question:
              "A finance employee receives an email from what appears to be the CEO’s email, asking for an urgent wire transfer. This is an example of:",
            options: [
              "CEO Fraud",
              "Clone phishing",
              "IT scam",
              "Social engineering",
            ],
            correctAnswer: 0,
          },

          {
            question: "What is a common BEC variant?",
            options: [
              "Fake IT alerts",
              "Fake vendor payment updates",
              "Fake newsletter sign-ups",
              "Fake social media invites",
            ],
            correctAnswer: 1,
          },

          {
            question: "Why is BEC particularly dangerous?",
            options: [
              "It targets only low-level employees",
              "It uses malware attachments",
              "It is always sent to thousands of people",
              "It exploits trust in senior leadership",
            ],
            correctAnswer: 3,
          },

          {
            question:
              "An email from “ceo@companyy.com” (with an extra ‘y’) asks for a payment. What should you do?",
            options: [
              "Check the domain carefully",
              "Process the payment",
              "Reply to the email",
              "Ignore it",
            ],
            correctAnswer: 0,
          },

          {
            question: "Which of the following is a defense against BEC?",
            options: [
              "Opening all urgent emails",
              "Verifying bank detail changes via phone",
              "Using weak passwords",
              "Disabling MFA",
            ],
            correctAnswer: 1,
          },

          {
            question:
              "You receive an email that appears to be part of a real email thread, but with a new payment instruction inserted. This could be:",
            options: ["Generic phishing", "Clone phishing", "BEC", "Whaling"],
            correctAnswer: 2,
          },
        ],
      },
      {
        name: "Clone Phishing",
        prompts: [
          {
            question:
              "You receive an email that looks identical to one you got from HR yesterday, but this time it says 'resending due to issues.' This could be:",
            options: ["Generic phishing", "Whaling", "BEC", "Clone phishing"],
            correctAnswer: 3,
          },

          {
            question: "In clone phishing, attackers:",
            options: [
              "Call you directly",
              "Copy a legitimate email and replace links/attachments",
              "Send completely new emails",
              "Use social media only",
            ],
            correctAnswer: 1,
          },

          {
            question:
              "You get a 'resent' email from a known sender, but the attachment icon looks odd. What should you do?",
            options: [
              "Open it",
              "Reply to the sender",
              "Compare with the original email",
              "Ignore it",
            ],
            correctAnswer: 2,
          },

          {
            question: "Which excuse is commonly used in clone phishing emails?",
            options: [
              "New policy update",
              "System upgrade notification",
              "Happy holidays",
              "Resending due to error",
            ],
            correctAnswer: 3,
          },

          {
            question: "A clone phishing email often tricks users because:",
            options: [
              "It comes from an unknown sender",
              "It contains no attachments",
              "It looks identical to a previous legitimate email",
              "It looks unfamiliar",
            ],
            correctAnswer: 2,
          },

          {
            question: "What is a red flag in a clone phishing email?",
            options: [
              "It is sent to multiple recipients",
              "It contains no links",
              "The email is personalized",
              "The sender’s domain is slightly different",
            ],
            correctAnswer: 3,
          },

          {
            question: "How can you prevent falling for clone phishing?",
            options: [
              "Trust all emails from known contacts",
              "Forward suspicious emails to the security team",
              "Always click 'resend' links",
              "Never check previous emails",
            ],
            correctAnswer: 1,
          },

          {
            question:
              "An email claims to resend a document you received last week, but the link points to a different URL. This is likely:",
            options: [
              "Whaling",
              "Legitimate",
              "Generic phishing",
              "Clone phishing",
            ],
            correctAnswer: 3,
          },

          {
            question:
              "What should you do if you’re unsure about a 'resent' email?",
            options: [
              "Reply to the email",
              "Contact the sender via a separate channel",
              "Open the attachment in a sandbox",
              "Ignore it",
            ],
            correctAnswer: 1,
          },

          {
            question: "Clone phishing relies on:",
            options: [
              "Fear and urgency",
              "Random targeting",
              "Executive authority",
              "Familiarity and trust",
            ],
            correctAnswer: 3,
          },
        ],
      },
      {
        name: "Invoice / Payment Diversion Scams",
        prompts: [
          {
            question:
              "Your finance team receives an email from a regular vendor with an updated invoice and new bank details. What should the team do before processing the payment?",
            options: [
              "Reply to the email for confirmation",
              "Forward the invoice to accounting",
              "Call the vendor using a verified phone number",
              "Process the payment immediately",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "An attacker compromises a vendor's email and sends a fake invoice with altered bank details. This is known as:",
            options: [
              "Invoice/payment diversion scam",
              "Thread hijacking",
              "Credential harvesting",
              "OAuth phishing",
            ],
            correctAnswer: 0,
          },

          {
            question:
              "Which of the following is a red flag for invoice phishing?",
            options: [
              "The email is professionally written",
              "The vendor uses their standard logo",
              "Last-minute bank account changes",
              "The invoice is sent on the usual date",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "An email from a vendor pressures you to pay an invoice urgently to avoid late fees. What should you suspect?",
            options: [
              "The vendor is having cash flow issues",
              "You should pay immediately to maintain relations",
              "The invoice is definitely legitimate",
              "This is a common phishing tactic",
            ],
            correctAnswer: 3,
          },

          {
            question:
              "How do attackers often bypass finance teams in invoice scams?",
            options: [
              "By calling the finance team directly",
              "By replying inside real email threads",
              "By using encrypted email services",
              "By sending invoices from personal email accounts",
            ],
            correctAnswer: 1,
          },

          {
            question:
              "You receive an invoice where the PDF metadata shows an unknown creator name. This is a sign of:",
            options: [
              "A legitimate invoice from a new employee",
              "A cross-platform compatibility problem",
              "A potentially altered or fake invoice",
              "A software update issue",
            ],
            correctAnswer: 2,
          },

          {
            question: "What is a key prevention tip for invoice phishing?",
            options: [
              "Pay invoices quickly to avoid delays",
              "Ignore minor discrepancies in invoices",
              "Trust all email instructions from vendors",
              "Use ticketing systems for payment changes",
            ],
            correctAnswer: 3,
          },

          {
            question:
              "An attacker hijacks a vendor's mailbox and sends a fake 'vendor update' email. What makes this convincing?",
            options: [
              "The email is addressed to 'Dear Customer'",
              "The email contains spelling errors",
              "The logo, tone, and signature look perfect",
              "The email is sent from an unknown domain",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "Which of the following should raise suspicion in an invoice email?",
            options: [
              "The vendor's contact information is included",
              "The invoice is for the correct amount",
              "The email tone is slightly unusual for that vendor",
              "The email is sent during business hours",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "Before changing payment details for a vendor, what is the safest verification method?",
            options: [
              "Replying to the email",
              "Checking the vendor's website",
              "Using the contact details in the email signature",
              "Calling the vendor on a known, verified number",
            ],
            correctAnswer: 3,
          },
        ],
      },
      {
        name: "Attachment-based Phishing (Macro Malware)",
        prompts: [
          {
            question:
              "You receive an Excel file from an unknown sender with the subject 'Quarterly Bonus Calculation.' When you open it, a prompt says 'Enable Macros to view content.' What should you do?",
            options: [
              "Scan the file first and verify the sender",
              "Enable macros to see the bonus details",
              "Close the file and delete it",
              "Forward it to the finance team",
            ],
            correctAnswer: 0,
          },

          {
            question:
              "An email contains a ZIP file labeled 'Meeting Minutes.' The email urges you to open it immediately. This is a common tactic in:",
            options: [
              "Thread hijacking",
              "Invoice scams",
              "Attachment-based phishing",
              "OAuth phishing",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "Why might an employee fall for a malicious attachment titled 'Updated Company Policy'?",
            options: [
              "It's sent from a known internal email",
              "Policy updates are a believable pretext",
              "It's always safe to open PDFs",
              "It contains no links",
            ],
            correctAnswer: 1,
          },

          {
            question:
              "You open a Word document and see a yellow bar asking you to 'Enable Content.' What is the safest action?",
            options: [
              "Save the document and open it later",
              "Click 'Enable Content'",
              "Close the document and report it",
              "Print the document to review it",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "Which of the following is a red flag in a malicious attachment?",
            options: [
              "The email has no subject",
              "The attachment is a PDF",
              "The file asks you to enable macros",
              "The file is from a trusted colleague",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "An attacker sends a file that appears to be a PDF but has a Word icon. This discrepancy is a sign of:",
            options: [
              "Email formatting error",
              "Malicious attachment",
              "Legitimate file corruption",
              "Safe file type conversion",
            ],
            correctAnswer: 1,
          },

          {
            question:
              "What is a recommended prevention tip for attachment-based phishing?",
            options: [
              "Disable all email security filters",
              "Always enable macros for important files",
              "Use cloud-viewer mode when possible",
              "Open attachments from unknown senders to check",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "You receive an unexpected email with a large attachment titled 'Salary Revision.' The file size is 50MB for a simple document. This is suspicious because:",
            options: [
              "All HR emails are safe",
              "Large files cannot contain malware",
              "Large file size for a small message is a red flag",
              "Salary files are always small",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "Macro-based malware often spreads through which file types?",
            options: [
              ".MP3 and .MP4 files",
              ".JPG and .PNG files",
              ".TXT and .RTF files",
              ".PDF, .DOCX, .XLSX, and .ZIP files",
            ],
            correctAnswer: 3,
          },

          {
            question:
              "After opening a suspicious attachment, your computer starts running slowly. What should you do first?",
            options: [
              "Report to IT immediately",
              "Continue working as normal",
              "Ignore it",
              "Restart your computer",
            ],
            correctAnswer: 0,
          },
        ],
      },
      {
        name: "Credential-Harvesting Pages (Fake Login Pages)",
        prompts: [
          {
            question:
              "You receive an email stating your VPN password will expire soon with a link to reset it. The login page looks identical to the real VPN portal. What should you do first?",
            options: [
              "Enter your credentials quickly",
              "Close the page and ignore the email",
              "Check the URL in the address bar",
              "Forward the email to colleagues",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "Credential-harvesting attacks use fake login pages that mimic:",
            options: [
              "Internal file servers only",
              "Office 365, Gmail, webmail, and VPN portals",
              "Social media sites only",
              "Public news websites",
            ],
            correctAnswer: 1,
          },

          {
            question:
              "You click a link in an email and see a login page that looks like Microsoft Office 365, but the URL is 'office365-verify-login.com.' This is likely:",
            options: [
              "A temporary redirect",
              "A legitimate Microsoft subdomain",
              "A new security feature",
              "A fake credential-harvesting page",
            ],
            correctAnswer: 3,
          },

          {
            question:
              "What is the primary goal of credential-harvesting pages?",
            options: [
              "To display advertisements",
              "To sign you up for newsletters",
              "To trick you into entering your login credentials",
              "To install malware on your computer",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "Which of the following is a red flag for a fake login page?",
            options: [
              "The page loads quickly",
              "The URL is slightly different from the usual one",
              "The page has a valid HTTPS certificate",
              "The page displays the correct company logo",
            ],
            correctAnswer: 1,
          },

          {
            question:
              "How can you avoid falling for credential-harvesting attacks?",
            options: [
              "Disable multi-factor authentication",
              "Always click password reset links in emails",
              "Use bookmarks for important login portals",
              "Enter your credentials on any page that looks familiar",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "An attacker creates a fake login page using stolen logos and a lookalike domain. This makes the page:",
            options: [
              "Easy to detect by antivirus software",
              "Highly convincing",
              "Obviously fake",
              "Illegal but harmless",
            ],
            correctAnswer: 1,
          },

          {
            question:
              "You receive an unexpected email asking you to log in to update your account information. What should you do?",
            options: [
              "Reply to the email asking for details",
              "Click the link and log in",
              "Go directly to the official website instead",
              "Ignore all account update emails",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "What additional security measure can protect you even if you enter credentials on a fake page?",
            options: [
              "Using a strong password",
              "Clearing your browser cache",
              "Enabling multi-factor authentication (MFA)",
              "Using incognito mode",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "A fake login page asks for your password twice. This is suspicious because:",
            options: [
              "It's a standard security check",
              "Your password might be too weak",
              "Legitimate pages never ask for passwords",
              "It may be attempting to steal your credentials multiple times",
            ],
            correctAnswer: 3,
          },
        ],
      },
      {
        name: "OAuth Consent Phishing",
        prompts: [
          {
            question:
              "You receive an email asking you to sign a document using a new 'PDF Viewer' app. When you click the link, you see a Microsoft permissions page asking for access to your email and files. What should you do?",
            options: [
              "Grant limited permissions only",
              "Close the page and report the email",
              "Click 'Allow' to sign the document quickly",
              "Use a different browser",
            ],
            correctAnswer: 1,
          },

          {
            question: "OAuth consent phishing involves attackers:",
            options: [
              "Hijacking email threads",
              "Stealing your password directly",
              "Sending fake invoices",
              "Tricking you into granting access to a malicious app",
            ],
            correctAnswer: 3,
          },

          {
            question:
              "What do attackers gain when you grant permissions to a malicious OAuth app?",
            options: [
              "Your computer's IP address only",
              "Your social security number",
              "Access to your email, drive, contacts, and calendar",
              "Your physical address",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "You see an app permission request that says 'This app is not verified.' What does this indicate?",
            options: [
              "The app is safe but new",
              "The app needs an update",
              "A standard security message",
              "A red flag for potential OAuth abuse",
            ],
            correctAnswer: 3,
          },

          {
            question: "How do OAuth attacks typically work?",
            options: [
              "Attackers call you pretending to be IT support",
              "Attackers send links to fake login pages",
              "Attackers register fake apps and request permissions",
              "Attackers send malicious attachments",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "Which of the following is a red flag in an OAuth permission request?",
            options: [
              "The app requests minimal permissions",
              "The permission page uses HTTPS",
              "The app is from a known company like Microsoft",
              "The request comes unexpectedly",
            ],
            correctAnswer: 3,
          },

          {
            question:
              "What is a key prevention tip for OAuth consent phishing?",
            options: [
              "Use the same app for all document signing",
              "Never approve apps you don't recognize",
              "Always approve apps to avoid workflow delays",
              "Disable all permission prompts",
            ],
            correctAnswer: 1,
          },

          {
            question:
              "An attacker's fake app requests permission to 'read, write, and delete all your emails.' Why is this suspicious?",
            options: [
              "All apps need this level of access",
              "This is a standard Microsoft request",
              "It's necessary for document signing",
              "It's an example of excessive permissions",
            ],
            correctAnswer: 3,
          },

          {
            question:
              "You receive an email with a link to sign a document. The link takes you to a legitimate-looking Microsoft page asking for app permissions. What should you check?",
            options: [
              "Whether you expected to sign a document",
              "The email's grammar",
              "The app's name and requested permissions",
              "All of the above",
            ],
            correctAnswer: 3,
          },

          {
            question: "How can organizations protect against OAuth phishing?",
            options: [
              "Block all permission requests",
              "Allow all apps by default",
              "Use admin-approved app policies",
              "Disable all third-party app integrations",
            ],
            correctAnswer: 2,
          },
        ],
      },
      {
        name: "Reply-Chain / Thread Hijacking",
        prompts: [
          {
            question:
              "You are in an ongoing email thread with a trusted vendor. Suddenly, they send an unexpected attachment labeled 'Updated Proposal.' What should you do?",
            options: [
              "Verify with the vendor before opening",
              "Open it immediately",
              "Forward it to your manager",
              "Ignore it since it's from a trusted thread",
            ],
            correctAnswer: 0,
          },

          {
            question:
              "Attackers take over a legitimate email conversation and reply within the thread. This is called:",
            options: [
              "Invoice diversion",
              "Thread hijacking",
              "Clone phishing",
              "OAuth phishing",
            ],
            correctAnswer: 1,
          },

          {
            question: "Why is thread hijacking particularly dangerous?",
            options: [
              "It always comes from unknown senders",
              "It only targets executives",
              "It exploits existing trust and real email context",
              "It uses fake login pages",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "You receive a reply in an active project thread asking for urgent action on a payment. What should you check first?",
            options: [
              "Whether the request is unexpected",
              "The tone of the email",
              "The sender’s email address",
              "All of the above",
            ],
            correctAnswer: 3,
          },

          {
            question: "Which of the following is a sign of thread hijacking?",
            options: [
              "The reply comes at an odd hour",
              "The email is part of a new conversation",
              "The email contains no attachments",
              "The sender is someone you’ve never emailed",
            ],
            correctAnswer: 0,
          },

          {
            question: "What makes a thread hijacking email convincing?",
            options: [
              "It uses urgent threats",
              "It always contains spelling errors",
              "The email context is real and ongoing",
              "It comes from a completely new sender",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "How can you prevent falling for thread hijacking attacks?",
            options: [
              "Only communicate via phone",
              "Use multi-factor authentication (MFA)",
              "Never reply to emails in threads",
              "Disable email threading features",
            ],
            correctAnswer: 1,
          },

          {
            question:
              "An email in an ongoing thread suddenly asks for sensitive information. What is the best response?",
            options: [
              "Forward the request to IT",
              "Reply to the email asking why",
              "Call the sender to verify the request",
              "Provide the information quickly",
            ],
            correctAnswer: 2,
          },

          {
            question: "Attackers use thread hijacking to:",
            options: [
              "Create fake login pages",
              "Send mass spam emails",
              "Gain credibility by replying in trusted conversations",
              "Distribute malicious apps",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "You notice an attachment in a thread that wasn’t discussed previously. What should you do?",
            options: [
              "Open it to see what it is",
              "Verify with the sender before opening",
              "Delete the email",
              "Assume it's related to the conversation",
            ],
            correctAnswer: 1,
          },
        ],
      },
    ],
  },
  {
    id: "web_url",
    title: "Web / URL / domain-based",
    subtopics: [
      {
        name: "Typosquatting / Domain Squatting",
        prompts: [
          {
            question:
              "An attacker registers the domain 'micorsoft.com' instead of 'microsoft.com'. This is an example of:",
            options: [
              "SEO poisoning",
              "Homograph attack",
              "Pharming",
              "Typosquatting",
            ],
            correctAnswer: 3,
          },

          {
            question:
              "You receive an email with a link to 'tech6solutions.com' (with a zero). You should first:",
            options: [
              "Enter your login credentials",
              "Double-check the URL for spelling",
              "Click the link to see if it's real",
              "Forward it to IT",
            ],
            correctAnswer: 1,
          },

          {
            question: "Why does typosquatting often succeed?",
            options: [
              "Because companies own all similar domains",
              "Because employees may type URLs manually and quickly",
              "Because users always verify URLs",
              "Because browsers block all fake domains",
            ],
            correctAnswer: 1,
          },

          {
            question:
              "You are about to log into your company portal but notice the URL is 'company-portal.com' with a hyphen. This could be a sign of:",
            options: [
              "A lookalike domain",
              "An official website update",
              "A browser error",
              "A secure subdomain",
            ],
            correctAnswer: 0,
          },

          {
            question: "What is a key prevention method against typosquatting?",
            options: [
              "Ignoring URL differences",
              "Bookmarking official corporate URLs",
              "Typing URLs quickly under pressure",
              "Clicking the first search result always",
            ],
            correctAnswer: 1,
          },

          {
            question:
              "An attacker replaces the letter 'o' with the number '0' in a domain. This technique is used in:",
            options: [
              "Pharming",
              "QR code phishing",
              "Malvertising",
              "Typosquatting",
            ],
            correctAnswer: 3,
          },

          {
            question:
              "Which of the following is a legitimate-looking but potentially malicious domain?",
            options: [
              "google.org",
              "google.com",
              "g00gle.com (with zeros)",
              "google-search.com",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "You manually type 'facebok.com' by mistake and land on a fake login page. This is possible due to:",
            options: [
              "A legitimate Facebook mirror site",
              "A browser virus",
              "Typosquatting",
              "An ISP error",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "What should you train employees to do to detect typosquatting?",
            options: [
              "Always trust email links",
              "Use only mobile apps",
              "Visually inspect domains carefully",
              "Ignore URL spelling",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "You see a link to 'amaz0n.com' in an email. What is the safest action?",
            options: [
              "Copy the link and paste it in a new tab",
              "Hover to see the full URL",
              "Report the email as phishing",
              "Click and shop",
            ],
            correctAnswer: 2,
          },
        ],
      },
      {
        name: "Homograph / IDN Spoofing",
        prompts: [
          {
            question:
              "An attacker uses a Cyrillic 'o' in 'google.com' to create a fake domain. This is called:",
            options: [
              "QR phishing",
              "Homograph spoofing",
              "Typosquatting",
              "Pharming",
            ],
            correctAnswer: 1,
          },

          {
            question:
              "You receive a link to 'vpn-tech6solutions.com' where the 'o' is a foreign character. What makes this dangerous?",
            options: [
              "It uses HTTPS",
              "It comes from IT",
              "It looks almost identical to the real domain",
              "The domain is too long",
            ],
            correctAnswer: 2,
          },

          {
            question: "How can you spot a homograph attack?",
            options: [
              "By clicking the link quickly",
              "By checking the email sender's name only",
              "By copying the URL into a plain text editor",
              "By trusting the padlock icon",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "A homograph attack might use which of the following to trick users?",
            options: [
              "Misspelled words",
              "Extra subdomains",
              "Different colored text",
              "Unicode characters that look like English letters",
            ],
            correctAnswer: 3,
          },

          {
            question:
              "Which tool can help detect fake domains in homograph attacks?",
            options: [
              "A spreadsheet",
              "A video player",
              "A password manager",
              "A word processor",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "You hover over a link and the preview shows 'paypal.com' but with a capital 'I' instead of 'l'. This is likely:",
            options: [
              "A secure redirect",
              "A browser rendering error",
              "A homograph attack",
              "A legitimate PayPal subdomain",
            ],
            correctAnswer: 2,
          },

          {
            question: "What is a key lesson from homograph attacks?",
            options: [
              "Foreign characters are always safe",
              "HTTPS means a site is genuine",
              "Always click links in emails from IT",
              "Check URLs carefully before logging in",
            ],
            correctAnswer: 3,
          },

          {
            question: "Attackers can register homograph domains using:",
            options: [
              "Free hosting services only",
              "Company trademarks",
              "International domain names (IDN)",
              "Only .com extensions",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "Your browser shows a warning about a site's certificate not matching the domain. This could be a sign of:",
            options: [
              "A homograph attack",
              "A firewall blocking the site",
              "A need to update your browser",
              "A safe but outdated site",
            ],
            correctAnswer: 0,
          },

          {
            question: "To prevent falling for homograph attacks, you should:",
            options: [
              "Only visit websites you know by heart",
              "Use browser protection tools and password managers",
              "Ignore SSL warnings",
              "Disable Unicode support in your browser",
            ],
            correctAnswer: 1,
          },
        ],
      },
      {
        name: "Pharming / DNS Hijack",
        prompts: [
          {
            question:
              "You type 'facebook.com' correctly but are redirected to a fake login page. This could be:",
            options: [
              "SEO poisoning",
              "Typosquatting",
              "Pharming",
              "Homograph attack",
            ],
            correctAnswer: 2,
          },

          {
            question: "Pharming attacks can happen when:",
            options: [
              "A user clicks a phishing link",
              "A user misspells a URL",
              "A DNS server is compromised",
              "A website uses HTTP instead of HTTPS",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "Your home router's DNS settings have been changed by malware. This could lead to:",
            options: [
              "Automatic software updates",
              "Blocked websites",
              "Pharming attacks",
              "Faster internet speed",
            ],
            correctAnswer: 2,
          },

          {
            question: "How can you help prevent pharming?",
            options: [
              "Type URLs very quickly",
              "Use default DNS settings",
              "Keep your router firmware updated",
              "Disable your firewall",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "You visit your bank's website and notice the layout looks slightly different and there's no padlock icon. This might indicate:",
            options: [
              "A website redesign",
              "A slow internet connection",
              "An ad blocker issue",
              "A possible DNS hijacking",
            ],
            correctAnswer: 3,
          },

          {
            question:
              "Which of the following is a secure DNS service you could use?",
            options: ["192.168.1.1", "255.255.255.0", "0.0.0.0", "1.1.1.1"],
            correctAnswer: 3,
          },

          {
            question: "Pharming is difficult to detect because:",
            options: [
              "It requires clicking a link",
              "The user types the correct URL",
              "It only affects mobile devices",
              "It always shows a warning message",
            ],
            correctAnswer: 1,
          },

          {
            question:
              "If multiple trusted websites start behaving strangely or redirecting, you should suspect:",
            options: [
              "A possible DNS hijacking",
              "Your computer is too old",
              "All websites are down",
              "A browser update is needed",
            ],
            correctAnswer: 0,
          },

          {
            question:
              "What technology can help protect against DNS-based attacks like pharming?",
            options: [
              "DNS-over-HTTPS",
              "Clearing browser cookies",
              "Pop-up blockers",
              "Incognito mode",
            ],
            correctAnswer: 0,
          },

          {
            question:
              "You type a URL and land on a site that asks for credentials but lacks an SSL certificate. You should:",
            options: [
              "Close the page and check your network",
              "Contact the website owner via email",
              "Enter your login details",
              "Refresh the page",
            ],
            correctAnswer: 0,
          },
        ],
      },
      {
        name: "Drive-by Download / Malvertising",
        prompts: [
          {
            question:
              "You visit a legitimate news site and an ad on the page silently installs malware. This is called:",
            options: [
              "Pharming",
              "Typosquatting",
              "Homograph attack",
              "Malvertising",
            ],
            correctAnswer: 3,
          },

          {
            question: "A drive-by download can happen when:",
            options: [
              "You type a URL incorrectly",
              "You download an email attachment",
              "You click a malicious link",
              "You simply visit a compromised webpage",
            ],
            correctAnswer: 3,
          },

          {
            question: "How can malvertising infect your computer?",
            options: [
              "By sending you a phishing email",
              "By exploiting vulnerabilities in your browser",
              "By changing your DNS settings",
              "By requiring you to enter your password",
            ],
            correctAnswer: 1,
          },

          {
            question: "Which of the following can help prevent malvertising?",
            options: [
              "Clicking on ads to see where they lead",
              "Using outdated software",
              "Disabling your antivirus",
              "Keeping your browser and plugins updated",
            ],
            correctAnswer: 3,
          },

          {
            question:
              "Your browser suddenly becomes slow and pop-ups appear while browsing a trusted site. This could be a sign of:",
            options: [
              "A good internet connection",
              "A needed browser update",
              "A successful download",
              "A possible malvertising attack",
            ],
            correctAnswer: 3,
          },

          {
            question: "Attackers often use malvertising by:",
            options: [
              "Sending spam emails",
              "Creating fake social media posts",
              "Hacking into website source code",
              "Buying ad slots on legitimate sites",
            ],
            correctAnswer: 3,
          },

          {
            question: "What is a key lesson about drive-by downloads?",
            options: [
              "Pop-up blockers cause infections",
              "Only illegal sites are dangerous",
              "You must click something to get infected",
              "Simply visiting a site can be enough",
            ],
            correctAnswer: 3,
          },

          {
            question: "Which practice increases the risk of malvertising?",
            options: [
              "Visiting pirated movie streaming sites",
              "Using a secure DNS",
              "Using an ad-blocker",
              "Keeping software updated",
            ],
            correctAnswer: 0,
          },

          {
            question:
              "If your antivirus alerts you while browsing a website, you should:",
            options: [
              "Disable the antivirus",
              "Close the browser and run a scan",
              "Refresh the page",
              "Ignore the alert and continue",
            ],
            correctAnswer: 1,
          },

          {
            question: "To protect against malvertising, you can:",
            options: [
              "Enable all browser plugins",
              "Disable automatic updates",
              "Use ad-blockers and enable real-time protection",
              "Click on ads to support websites",
            ],
            correctAnswer: 2,
          },
        ],
      },
      {
        name: "SEO Poisoning",
        prompts: [
          {
            question:
              "You search for 'Adobe Reader download' on Google and click the first result, which is a sponsored ad. This could lead to:",
            options: [
              "A faster download",
              "A website review",
              "SEO poisoning",
              "A legitimate installer",
            ],
            correctAnswer: 2,
          },

          {
            question: "SEO poisoning works by:",
            options: [
              "Sending phishing emails",
              "Hacking Google's servers",
              "Creating fake social media profiles",
              "Manipulating search rankings for malicious sites",
            ],
            correctAnswer: 3,
          },

          {
            question:
              "A website offering a free download of popular software has many pop-ups and fake reviews. This is a red flag for:",
            options: [
              "A company blog",
              "An official partner",
              "SEO poisoning",
              "A legitimate discount site",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "How can you avoid SEO poisoning when downloading software?",
            options: [
              "Download only from official websites",
              "Use any 'download accelerator' link",
              "Always click the top search result",
              "Trust sponsored ads",
            ],
            correctAnswer: 0,
          },

          {
            question:
              "You search for 'free tax software' and see a site with a domain like 'best-tax-soft-download.net'. What should you do?",
            options: [
              "Download immediately",
              "Check if the domain is official",
              "Click the link",
              "Ignore the search results",
            ],
            correctAnswer: 1,
          },

          {
            question: "Why do employees often fall for SEO poisoning?",
            options: [
              "They only use mobile apps",
              "They trust top search results",
              "They verify every domain carefully",
              "They never use search engines",
            ],
            correctAnswer: 1,
          },

          {
            question:
              "Which of the following is a prevention tip against SEO poisoning?",
            options: [
              "Use pirated software to save money",
              "Avoid sponsored search results",
              "Download from any site with good reviews",
              "Always trust Google ads",
            ],
            correctAnswer: 1,
          },

          {
            question:
              "A site ranked #1 for 'word processor free download' has a domain unrelated to any known software company. This is likely:",
            options: [
              "A browser error",
              "A government website",
              "An SEO poisoned result",
              "An official mirror site",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "What should you do if you accidentally download software from a suspicious site?",
            options: [
              "Delete it and ignore",
              "Scan the file with antivirus and report it",
              "Share it with colleagues",
              "Run the installer",
            ],
            correctAnswer: 1,
          },

          {
            question: "Your company can help prevent SEO poisoning by:",
            options: [
              "Blocking all search engines",
              "Encouraging employees to find their own software",
              "Disabling internet access",
              "Providing official links to approved software stores",
            ],
            correctAnswer: 3,
          },
        ],
      },
      {
        name: "QR Code Phishing",
        prompts: [
          {
            question:
              "You see a QR code on a poster in a cafe offering free WiFi. What should you do before scanning?",
            options: [
              "Take a picture of it",
              "Ignore it",
              "Scan it immediately",
              "Verify the poster is official",
            ],
            correctAnswer: 3,
          },

          {
            question: "QR code phishing is dangerous because:",
            options: [
              "It hides the actual URL from the user",
              "It requires clicking a link",
              "QR codes always link to safe sites",
              "It only works on Android phones",
            ],
            correctAnswer: 0,
          },

          {
            question:
              "After scanning a QR code, your phone shows a login page. What should you do?",
            options: [
              "Check the URL in the browser bar",
              "Close the page immediately",
              "Enter your credentials",
              "Scan the code again",
            ],
            correctAnswer: 0,
          },

          {
            question:
              "Why might an employee trust a malicious QR code in public?",
            options: [
              "Because it appears on a physical sign or sticker",
              "Because QR codes are always safe",
              "Because companies never use QR codes",
              "Because their phone blocks malicious links",
            ],
            correctAnswer: 0,
          },

          {
            question:
              "Which of the following is a prevention tip for QR code phishing?",
            options: [
              "Always scan QR codes to see where they go",
              "Trust QR codes in official-looking emails",
              "Use secure QR scanning apps that preview links",
              "Enter your password after scanning any QR",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "You scan a QR code and the browser shows a strange URL with many random characters. This is likely:",
            options: [
              "A website error",
              "A normal login portal",
              "A secure shortened link",
              "A sign of a malicious QR code",
            ],
            correctAnswer: 3,
          },

          {
            question: "Attackers can use QR code phishing to direct users to:",
            options: [
              "Fake login pages",
              "Payment scam sites",
              "Malware downloads",
              "All of the above",
            ],
            correctAnswer: 3,
          },

          {
            question:
              "A QR code sticker on a parking meter looks slightly peeled off. This could indicate:",
            options: [
              "A printing error",
              "A replaced malicious sticker",
              "A city-approved update",
              "Normal wear and tear",
            ],
            correctAnswer: 1,
          },

          {
            question:
              "What is a safe practice when encountering QR codes in emails?",
            options: [
              "Always trust QR codes from known senders",
              "Preview the link before opening if possible",
              "Scan all QR codes to verify content",
              "Disable QR scanning on your phone",
            ],
            correctAnswer: 1,
          },

          {
            question:
              "Your colleague scans a QR code from a flyer and their phone starts downloading a file. What should they do?",
            options: [
              "Restart the phone",
              "Cancel the download and report the incident",
              "Ignore it",
              "Open the file to see what it is",
            ],
            correctAnswer: 1,
          },
        ],
      },
    ],
  },
  {
    id: "telephony_sms",
    title: "Telephony & SMS",
    subtopics: [
      {
        name: "Vishing (Voice Phishing)",
        prompts: [
          {
            question:
              "You receive a phone call from someone claiming to be from your bank's fraud department. They say there's suspicious activity and ask for your online banking password. This is an example of:",
            options: ["Pharming", "Smishing", "Vishing", "SEO poisoning"],
            correctAnswer: 2,
          },
          {
            question: "What is a common goal of vishing attacks?",
            options: [
              "To extract sensitive information or pressure you into urgent action",
              "To update your contact details",
              "To conduct a customer satisfaction survey",
              "To sell you a new product",
            ],
            correctAnswer: 0,
          },
          {
            question:
              "A caller says they are from IT support and need your OTP to fix a security issue. What should you remember?",
            options: [
              "OTPs are only used for logging in, not for support",
              "Legitimate IT support often asks for OTPs over the phone",
              "You should never share OTPs or passwords over the phone",
              "It's safe to share if they sound knowledgeable",
            ],
            correctAnswer: 2,
          },
          {
            question: "Which of the following is a common vishing scenario?",
            options: [
              "A fake login page in your browser",
              "A delivery company calling about a package issue",
              "An email with a malicious attachment",
              "A pop-up ad on your computer",
            ],
            correctAnswer: 1,
          },
          {
            question: "Attackers use spoofed caller IDs in vishing to:",
            options: [
              "Reduce their phone bill",
              "Hide their location",
              "Make the call appear to come from a trusted organization",
              "Make their number appear as 'Unknown'",
            ],
            correctAnswer: 2,
          },
          {
            question: "What is a major red flag during an unsolicited call?",
            options: [
              "The call is during work hours",
              "The caller has a calm and professional tone",
              "The caller asks for sensitive information like passwords or OTPs",
              "The caller identifies themselves",
            ],
            correctAnswer: 2,
          },
          {
            question:
              "If you get a suspicious call from your 'bank,' what is the safest way to verify?",
            options: [
              "Tell them you'll visit a branch later",
              "Hang up and call back using the number on the back of your card",
              "Ask them to send you an email",
              "Provide some information to see if they are legitimate",
            ],
            correctAnswer: 1,
          },
          {
            question: "A vishing attacker might use urgent language to:",
            options: [
              "Practice their acting skills",
              "Comply with telemarketing regulations",
              "Create a sense of fear so you act without thinking",
              "Make the conversation more interesting",
            ],
            correctAnswer: 2,
          },
          {
            question: "What is a key prevention tip against vishing?",
            options: [
              "Install any software the caller recommends",
              "Share information if the caller sounds official",
              "Treat unexpected calls as suspicious",
              "Always answer calls from unknown numbers",
            ],
            correctAnswer: 2,
          },
          {
            question:
              "A caller claims to be from the tax department and says you owe money immediately or face legal action. What should you do?",
            options: [
              "Give them your email address to receive an invoice",
              "Hang up and contact the tax department through their official website or number",
              "Pay over the phone to avoid trouble",
              "Ask for a callback number",
            ],
            correctAnswer: 1,
          },
        ],
      },
      {
        name: "Smishing (SMS Phishing)",
        prompts: [
          {
            question:
              "You receive a text message saying 'Your bank account has been locked. Click here to unlock: [shortened link]'. What type of attack is this?",
            options: ["Callback scam", "Vishing", "Pharming", "Smishing"],
            correctAnswer: 3,
          },
          {
            question:
              "A friend gets an SMS with a link to track a package they didn't order. What should they do?",
            options: [
              "Click the link to see what it is",
              "Visit the official courier website directly",
              "Delete the message",
              "Reply to the message asking for details",
            ],
            correctAnswer: 1,
          },
          {
            question: "Why might someone fall for a smishing attack?",
            options: [
              "SMS messages often appear urgent or personal",
              "Text messages always come from trusted sources",
              "People never use their phones for banking",
              "Mobile networks block all malicious links",
            ],
            correctAnswer: 0,
          },
          {
            question:
              "You see an SMS offering a huge mobile wallet bonus if you click a link. What is a safe approach?",
            options: [
              "Manually open the official app or website",
              "Reply with your phone number",
              "Click the link to claim the bonus",
              "Forward the message to your friends",
            ],
            correctAnswer: 0,
          },
          {
            question: "Attackers use short, scary messages in smishing to:",
            options: [
              "Test your typing speed",
              "Push you to act quickly without thinking",
              "Make you laugh",
              "Improve your grammar",
            ],
            correctAnswer: 1,
          },
          {
            question: "Which of the following is a common smishing theme?",
            options: [
              "Fake payroll or bonus messages via SMS",
              "A phone call from your CEO",
              "A pop-up ad on a website",
              "Free movie tickets via email",
            ],
            correctAnswer: 0,
          },
          {
            question:
              "An SMS contains a bit.ly link and says 'Reply STOP to unsubscribe.' What should you be wary of?",
            options: [
              "Bit.ly links are always official",
              "The unsubscribe link might be malicious",
              "Replying STOP is always safe",
              "You should forward the message to report it",
            ],
            correctAnswer: 1,
          },
          {
            question: "What is a key prevention tip against smishing?",
            options: [
              "Share suspicious messages on social media",
              "Call the number in the SMS to verify",
              "Manually type official website addresses instead of clicking links",
              "Always click SMS links from unknown numbers",
            ],
            correctAnswer: 2,
          },
          {
            question:
              "You receive a text claiming to be from DHL about a missed delivery. What is the safest first step?",
            options: [
              "Go to the official DHL website or app",
              "Click the tracking link in the SMS",
              "Call the number provided in the text",
              "Ignore it completely",
            ],
            correctAnswer: 0,
          },
          {
            question:
              "After accidentally clicking a smishing link, what should you do?",
            options: [
              "Close the page and block the sender",
              "Enter your information to see what happens",
              "Restart your phone",
              "Take a screenshot and post it online",
            ],
            correctAnswer: 0,
          },
        ],
      },
      {
        name: "Callback / Missed-call Scams",
        prompts: [
          {
            question:
              "You get a missed call from an unknown international number, followed by an email asking you to call back for 'important account information.' This is likely a:",
            options: [
              "Legitimate customer service outreach",
              "Wrong number",
              "Callback or missed-call scam",
              "Telemarketing call",
            ],
            correctAnswer: 2,
          },
          {
            question:
              "A message claims your Amazon account has an issue and provides a phone number to call. What should you do?",
            options: [
              "Reply to the message with your account details",
              "Ignore it; Amazon never contacts customers",
              "Call the number immediately",
              "Go to the official Amazon website and contact support through there",
            ],
            correctAnswer: 3,
          },
          {
            question:
              "During a callback scam, what might the attacker ask for?",
            options: [
              "Your debit card details and OTP",
              "To update your mailing address",
              "Your favorite color",
              "Feedback on their service",
            ],
            correctAnswer: 0,
          },
          {
            question:
              "Which of the following is a common theme in callback scams?",
            options: [
              "You've won a free vacation",
              "Your software update is ready",
              "Your SIM will be blocked",
              "A friend has tagged you in a photo",
            ],
            correctAnswer: 2,
          },
          {
            question: "A warning sign of a callback scam is:",
            options: [
              "The caller uses a friendly, non-threatening tone",
              "The call comes during regular business hours",
              "The callback number is listed on the official company website",
              "The caller asks you to 'confirm your identity' with sensitive details",
            ],
            correctAnswer: 3,
          },
          {
            question:
              "You receive a threatening voicemail saying your bank account will be closed if you don't call back. What is the safest action?",
            options: [
              "Share your account number with the caller to speed things up",
              "Delete the voicemail and forget about it",
              "Hang up and call your bank using the number on your card or their official website",
              "Call the number in the voicemail to resolve the issue",
            ],
            correctAnswer: 2,
          },
          {
            question: "What is a key prevention tip for callback scams?",
            options: [
              "Trust that caller ID is always accurate",
              "Always call back numbers from unsolicited messages",
              "Never share bank information over the phone",
              "Give out your OTP if the caller sounds official",
            ],
            correctAnswer: 2,
          },
          {
            question:
              "An email says your subscription will auto-renew for a large amount and provides a 'customer service' number to cancel. What should you do?",
            options: [
              "Do nothing; it's probably a mistake",
              "Reply to the email asking to cancel",
              "Call the number to cancel",
              "Log into your account on the official website to check subscriptions",
            ],
            correctAnswer: 3,
          },
          {
            question:
              "If you feel uncomfortable during an unsolicited call, you should:",
            options: [
              "Ask them to call back later",
              "Hang up immediately",
              "Stay on the line to be polite",
              "Share minimal information to get them off the phone",
            ],
            correctAnswer: 1,
          },
          {
            question: "How can you verify if a callback number is legitimate?",
            options: [
              "Ask a friend if they recognize the number",
              "Search for the number online",
              "Check the official website of the organization",
              "Trust the number provided in the email or text",
            ],
            correctAnswer: 2,
          },
        ],
      },
    ],
  },
  {
    id: "social_platforms",
    title: "Social platforms & apps",
    subtopics: [
      {
        name: "Social Media Phishing / Profile Reconnaissance",
        prompts: [
          {
            question:
              "You receive a LinkedIn message from a recruiter with a professional profile, asking you to download a job description file. What should be your first step?",
            options: [
              "Reply and ask for more personal information.",
              "Download the file immediately.",
              "Forward the message to all your connections.",
              "Verify the recruiter and company through official channels.",
            ],
            correctAnswer: 3,
          },
          {
            question:
              "An attacker creates a fake Facebook profile pretending to be a colleague and sends you a link. This is an example of:",
            options: [
              "Social media phishing.",
              "Vishing.",
              "QR phishing.",
              "Callback scam.",
            ],
            correctAnswer: 0,
          },
          {
            question:
              "Which of the following is a common tactic in social media phishing?",
            options: [
              "Placing malicious ads on search engines.",
              "Making phone calls from a blocked number.",
              "Using fake profiles to pose as recruiters or support agents.",
              "Sending official emails from HR.",
            ],
            correctAnswer: 2,
          },
          {
            question:
              "You see a profile on Instagram offering a free giveaway if you click a link and enter your email and password. This is likely:",
            options: [
              "A social media phishing attempt.",
              "A legitimate marketing campaign.",
              "A system glitch.",
              "An official partnership.",
            ],
            correctAnswer: 0,
          },
          {
            question: "What is a key sign of a fake social media profile?",
            options: [
              "The profile uses a personal photo.",
              "The profile includes detailed work history.",
              "The profile was created very recently.",
              "The profile has thousands of connections.",
            ],
            correctAnswer: 2,
          },
          {
            question:
              "A message on X (Twitter) from someone claiming to be tech support asks for your login details to fix an issue. What should you do?",
            options: [
              "Report the profile and contact official support directly.",
              "Ask them to call you instead.",
              "Provide the details to get help quickly.",
              "Ignore the message.",
            ],
            correctAnswer: 0,
          },
          {
            question:
              "How can you protect yourself from social media phishing?",
            options: [
              "Accept all connection requests to grow your network.",
              "Avoid downloading files from unknown profiles.",
              "Keep your social media privacy settings loose.",
              "Share your work email publicly on your profile.",
            ],
            correctAnswer: 1,
          },
          {
            question:
              "A fake HR recruiter on LinkedIn sends you a file. What is the primary risk?",
            options: [
              "The file could be a legitimate contract.",
              "The file might be empty.",
              "The file could contain malware.",
              "The file might be a large video.",
            ],
            correctAnswer: 2,
          },
          {
            question:
              "What should you do if you receive a suspicious message from a social media contact?",
            options: [
              "Click any links to see where they lead.",
              "Delete the message and block the sender.",
              "Share the message in a public post.",
              "Reply and confront them.",
            ],
            correctAnswer: 1,
          },
          {
            question: "Why is social media phishing effective?",
            options: [
              "Because people never use social media.",
              "Because all profiles are verified.",
              "Because social media platforms are completely secure.",
              "Because attackers can appear credible and familiar.",
            ],
            correctAnswer: 3,
          },
        ],
      },
      {
        name: "Angler Phishing (Customer-service Impersonation)",
        prompts: [
          {
            question:
              "You tweet a complaint about a service issue, and an account with 'Support' in the name quickly replies with a link to 'resolve' it. This is likely:",
            options: [
              "An automated bot.",
              "Angler phishing.",
              "A brand ambassador.",
              "Excellent customer service.",
            ],
            correctAnswer: 1,
          },
          {
            question: "What is the main goal of angler phishing?",
            options: [
              "To increase your social media followers.",
              "To conduct a survey.",
              "To sell you a product.",
              "To steal your credentials by posing as support.",
            ],
            correctAnswer: 3,
          },
          {
            question:
              "A fake support account on social media often uses which tactic to seem legitimate?",
            options: [
              "A username with many random numbers.",
              "Slow response times.",
              "No profile picture.",
              "Copied branding from the real company.",
            ],
            correctAnswer: 3,
          },
          {
            question:
              "You receive a direct message from 'Amazon_Help' after complaining online. They ask you to click a link to verify your account. What should you do?",
            options: [
              "Ignore it.",
              "Reply with your account details.",
              "Go to the official Amazon website directly for help.",
              "Click the link; it's from Amazon.",
            ],
            correctAnswer: 2,
          },
          {
            question:
              "Which of the following is a red flag for a fake support account?",
            options: [
              "They use polite language.",
              "The account is verified (blue checkmark).",
              "They respond within an hour.",
              "The link they provide does not belong to the official website.",
            ],
            correctAnswer: 3,
          },
          {
            question: "How can angler phishing create a false sense of trust?",
            options: [
              "By having no posts on their profile.",
              "By asking for payment upfront.",
              "By responding very slowly to your complaint.",
              "By using a fast response time and professional-looking profile.",
            ],
            correctAnswer: 3,
          },
          {
            question: "What is a key prevention tip against angler phishing?",
            options: [
              "Share your issue publicly with as many details as possible.",
              "Trust all accounts that reply to your public posts.",
              "Never enter credentials on a link sent via social media.",
              "Always click links from accounts with 'Support' in the name.",
            ],
            correctAnswer: 2,
          },
          {
            question:
              "You notice a support account that replied to you has a username with a spelling error, like '@BankSuppport'. This is a sign of:",
            options: [
              "A technical glitch.",
              "A new intern at the bank.",
              "A potential angler phishing attempt.",
              "An international branch.",
            ],
            correctAnswer: 2,
          },
          {
            question:
              "After clicking a suspicious link from a fake support account, what should you do?",
            options: [
              "Clear your browser history.",
              "Enter your information to see what happens.",
              "Close the page and report the account.",
              "Take a screenshot and post it.",
            ],
            correctAnswer: 2,
          },
          {
            question:
              "Official company support accounts on social media typically:",
            options: [
              "Never ask you to log in through random links in replies.",
              "Ask you to DM your password.",
              "Have usernames with many special characters.",
              "Send you to third-party websites for verification.",
            ],
            correctAnswer: 0,
          },
        ],
      },
      {
        name: "Fake Apps / App Store Phishing",
        prompts: [
          {
            question:
              'You find a mobile app called "SecureBank Pro" on a website, not in the official app store. It promises advanced features. What is the biggest risk?',
            options: [
              "The app might be free",
              "The app could be from a lesser-known developer",
              "The app might not have a dark mode",
              "The app could be fake and contain malware",
            ],
            correctAnswer: 3,
          },
          {
            question:
              "Fake apps often mimic which types of legitimate applications?",
            options: [
              "Weather apps only",
              "Social media apps only",
              "Banking, email, office, or utility apps",
              "Gaming apps only",
            ],
            correctAnswer: 2,
          },
          {
            question:
              "An app you installed asks for permission to read your text messages and contacts, even though it's a flashlight app. This is:",
            options: [
              "Required for the flashlight to work",
              "Normal for all apps",
              "A sign of a well-designed app",
              "A major red flag",
            ],
            correctAnswer: 3,
          },
          {
            question: "Where is the safest place to download mobile apps?",
            options: [
              "From third-party app stores",
              "From links sent in emails",
              "From any website with good reviews",
              "From official app stores (Google Play, Apple App Store)",
            ],
            correctAnswer: 3,
          },
          {
            question:
              "What is a common trick used by fake apps to appear legitimate?",
            options: [
              "Having a very high price",
              "Using look-alike icons and names",
              "Having no icon at all",
              "Being developed by a well-known company",
            ],
            correctAnswer: 1,
          },
          {
            question:
              "You see an app with thousands of fake positive reviews and copied screenshots. This is a sign the app might be:",
            options: [
              "Malicious or fake",
              "Award-winning",
              "Very popular",
              "In beta testing",
            ],
            correctAnswer: 0,
          },
          {
            question: "Before installing an app, what should you check?",
            options: [
              "The file size only",
              "The number of ads it shows",
              "The developer name and app history",
              "The color scheme of the icon",
            ],
            correctAnswer: 2,
          },
          {
            question:
              'An app has "Unknown Developer" listed and requests access to your camera, microphone, and location unnecessarily. What should you do?',
            options: [
              "Disable your phone's security settings",
              "Cancel the installation and report the app",
              "Grant the permissions; they might be needed later",
              "Install it anyway; it's probably fine",
            ],
            correctAnswer: 1,
          },
          {
            question: "What is a key prevention tip against fake apps?",
            options: [
              "Only install apps from official app stores",
              "Trust apps with very few downloads",
              "Install apps from any source to get more features",
              "Always grant all permissions an app asks for",
            ],
            correctAnswer: 0,
          },
          {
            question:
              "After accidentally installing a suspicious app, your phone starts behaving strangely. What is the first thing you should do?",
            options: [
              "Post about it on social media",
              "Restart your phone multiple times",
              "Ignore it; it will fix itself",
              "Uninstall the app and run a security scan",
            ],
            correctAnswer: 3,
          },
        ],
      },
    ],
  },
  {
    id: "network_infra",
    title: "Network & infrastructure",
    subtopics: [
      {
        name: "Evil-Twin Wi-Fi / Rogue AP",
        prompts: [
          {
            question:
              'At a coffee shop, you see two Wi-Fi networks: "CoffeeShop" and "CoffeeShop_Free" with a stronger signal. The stronger one might be:',
            options: [
              "The owner's personal network",
              "An evil-twin Wi-Fi attack",
              "A mobile hotspot from another customer",
              "A premium paid service",
            ],
            correctAnswer: 1,
          },

          {
            question: "What is the main purpose of an evil-twin Wi-Fi attack?",
            options: [
              "To capture users' internet traffic and steal credentials",
              "To block access to certain websites",
              "To boost the shop's Wi-Fi signal",
              "To provide faster internet to customers",
            ],
            correctAnswer: 0,
          },

          {
            question:
              "You connect to a public Wi-Fi network and a login page pops up asking for your social media credentials. What should you do?",
            options: [
              "Verify with staff if this is the official login page",
              "Restart your device",
              "Enter your details to get online quickly",
              "Connect to a different network with no login",
            ],
            correctAnswer: 0,
          },

          {
            question:
              "Why might an evil-twin network have a stronger signal than the legitimate one?",
            options: [
              "Because it has fewer users",
              "Because it uses better hardware provided by the shop",
              "To encourage more people to connect to it",
              "Because it is closer to the router",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "Which of the following is a red flag for a rogue access point?",
            options: [
              "The network requires a strong password",
              "The network is provided by a well-known ISP",
              "The network name is slightly different from the official one (e.g., 'Cafe_WiFi' vs 'Cafe_WiFi-Free')",
              "You need to ask for the password at the counter",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "What is the safest alternative to using public Wi-Fi for sensitive work?",
            options: [
              "Asking for the Wi-Fi password from strangers",
              "Using your phone's mobile hotspot",
              "Turning off your firewall to connect easier",
              "Using the strongest open network available",
            ],
            correctAnswer: 1,
          },

          {
            question:
              "After connecting to a suspicious public Wi-Fi, your browser shows a warning about an invalid security certificate. This likely means:",
            options: [
              "You need to update your browser",
              "The website is down",
              "Your connection may be intercepted",
              "The Wi-Fi is filtering content",
            ],
            correctAnswer: 2,
          },

          {
            question: "How can using a company VPN on a public network help?",
            options: [
              "It can make you more visible to attackers",
              "It can encrypt your data, protecting it from eavesdroppers",
              "It can slow down your connection significantly",
              "It can bypass all website security checks",
            ],
            correctAnswer: 1,
          },

          {
            question:
              "An attacker's fake Wi-Fi network often has what characteristic to trick users?",
            options: [
              "It only appears at night",
              "A name identical or very similar to a legitimate network",
              "A very complex and unique name",
              "No signal at all",
            ],
            correctAnswer: 1,
          },

          {
            question:
              "What should you do if you suspect you've connected to an evil-twin network?",
            options: [
              "Disconnect immediately and notify IT if it was for work",
              "Change your device's Wi-Fi settings to 'forget' the network later",
              "Continue browsing but avoid banking sites",
              "Run a speed test to check the connection",
            ],
            correctAnswer: 0,
          },
        ],
      },
      {
        name: "Man-in-the-Middle (MitM) Phishing",
        prompts: [
          {
            question: "In a Man-in-the-Middle (MITM) attack, the attacker:",
            options: [
              "Secretly intercepts communication between you and a website",
              "Physically steals your device",
              "Sends you a phishing email",
              "Guesses your password through brute force",
            ],
            correctAnswer: 0,
          },

          {
            question:
              "You try to log into your company portal and see a login page appear twice in a row. This could be a sign of:",
            options: [
              "A required security update",
              "A MITM attack injecting a fake page",
              "A browser cache issue",
              "A slow internet connection",
            ],
            correctAnswer: 1,
          },

          {
            question:
              "How can an attacker in a MITM position steal your credentials?",
            options: [
              "By calling you on the phone",
              "By posting on social media",
              "By injecting a fake login page before the real one loads",
              "By sending you a malicious attachment",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "Which of the following is a red flag for a potential MITM attack?",
            options: [
              "The website URL starts with 'https://'",
              "A website loads very quickly",
              "Your browser shows a certificate warning",
              "You are automatically logged out after inactivity",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "To help prevent MITM attacks on your home network, you should:",
            options: [
              "Share your Wi-Fi password with neighbors",
              "Keep your router's firmware updated",
              "Disable Wi-Fi encryption",
              "Use the default router password",
            ],
            correctAnswer: 1,
          },

          {
            question:
              "During a MITM attack, the attacker might forward you to the real website after stealing your credentials to:",
            options: [
              "Help you complete your task",
              "Avoid raising suspicion",
              "Improve your browsing speed",
              "Test their hacking skills",
            ],
            correctAnswer: 1,
          },

          {
            question:
              "What should you do if you encounter repeated, unexpected login prompts on a trusted site?",
            options: [
              "Stop and report the issue immediately",
              "Clear your browser cookies and try again",
              "Keep entering your credentials until it works",
              "Ignore it; it's probably a glitch",
            ],
            correctAnswer: 0,
          },

          {
            question:
              "Using a company VPN when working outside the office helps protect against MITM attacks by:",
            options: [
              "Encrypting the data between your device and the company network",
              "Blocking all websites",
              "Making your internet slower",
              "Showing more ads",
            ],
            correctAnswer: 0,
          },

          {
            question:
              "An attacker performs a MITM attack by compromising a home router. What can the attacker then do?",
            options: [
              "Intercept, read, and modify data sent from your device",
              "Only see which websites you visit",
              "Change your Wi-Fi network name only",
              "Physically damage the router",
            ],
            correctAnswer: 0,
          },

          {
            question:
              "The 'S' in HTTPS indicates a site should have a valid security certificate. Why is this important?",
            options: [
              "It makes the website load faster",
              "It helps ensure the connection is encrypted and the server is verified",
              "It guarantees the website is never hacked",
              "It allows you to save passwords more securely",
            ],
            correctAnswer: 1,
          },
        ],
      },
      {
        name: "Session Hijacking / Cookie Theft",
        prompts: [
          {
            question:
              "An attacker steals your active session cookie while you're logged into your email on a public network. This allows them to:",
            options: [
              "See your saved passwords in the browser",
              "Change your password",
              "Access your account without needing your password",
              "Lock you out of your account permanently",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "You check your work email at an airport using free public Wi-Fi. What is the primary security risk?",
            options: [
              "Your laptop battery might drain faster",
              "Your session cookie could be intercepted and stolen",
              "You might receive spam emails",
              "The Wi-Fi might be slow",
            ],
            correctAnswer: 1,
          },

          {
            question:
              "What is one sign that your session might have been hijacked?",
            options: [
              "A website asks you to accept cookies",
              "You receive a 'new login detected' security alert",
              "Your browser auto-fills your username",
              "Your computer screen brightness changes",
            ],
            correctAnswer: 1,
          },

          {
            question:
              "How can you protect yourself from session hijacking on public Wi-Fi?",
            options: [
              "Log in repeatedly to refresh your session",
              "Disable your firewall",
              "Use a VPN to encrypt your connection",
              "Use the same password for all accounts",
            ],
            correctAnswer: 2,
          },

          {
            question: "Session hijacking is dangerous because:",
            options: [
              "It always requires your password",
              "It only affects mobile phones",
              "It causes immediate system crashes",
              "It can happen silently without you knowing",
            ],
            correctAnswer: 3,
          },

          {
            question:
              "After using a public computer, what should you always do?",
            options: [
              "Restart the computer",
              "Clear the browser history only",
              "Take a screenshot of your session",
              "Log out completely from all accounts",
            ],
            correctAnswer: 3,
          },

          {
            question:
              "Which of the following can limit the damage if a session is hijacked?",
            options: [
              "Saving your password in the browser",
              "Using incognito mode",
              "Using a very long username",
              "Enabling Multi-Factor Authentication (MFA)",
            ],
            correctAnswer: 3,
          },

          {
            question: "An attacker with your session cookie can:",
            options: [
              "Access your computer's hard drive directly",
              "Only see your login page",
              "Reset your password without your knowledge",
              "Perform actions as if they were you while you're logged in",
            ],
            correctAnswer: 3,
          },

          {
            question:
              "You notice emails in your 'Sent' folder that you didn't write. This could indicate:",
            options: [
              "A colleague has your password",
              "A spam filter failure",
              "An email auto-responder is on",
              "A possible session hijacking",
            ],
            correctAnswer: 3,
          },

          {
            question:
              "What is the safest practice when accessing sensitive accounts remotely?",
            options: [
              "Share your session cookie with IT for monitoring",
              "Use a company-approved VPN",
              "Disable your antivirus to speed up login",
              "Use open Wi-Fi networks for better speed",
            ],
            correctAnswer: 1,
          },
        ],
      },
    ],
  },
  {
    id: "advanced_media",
    title: "Advanced / multimedia / social engineering",
    subtopics: [
      {
        name: "Deepfake / Synthetic Media Impersonation",
        prompts: [
          {
            question:
              "You receive a voice message on WhatsApp that sounds exactly like your boss asking for an urgent file transfer. This could be:",
            options: [
              "A deepfake voice impersonation",
              "A new company policy",
              "Your boss using a new phone",
              "A poor-quality recording",
            ],
            correctAnswer: 0,
          },

          {
            question: "Deepfake technology can be used to create convincing:",
            options: [
              "Physical security badges",
              "Synthetic audio or video impersonations",
              "Handwritten notes",
              "Phishing emails only",
            ],
            correctAnswer: 1,
          },

          {
            question:
              "What should you do if you receive an urgent request via voice note from a superior?",
            options: [
              "Forward the voice note to IT",
              "Act immediately to avoid delay",
              "Verify the request through a separate, official channel",
              "Reply to the voice note asking for confirmation",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "How do attackers often obtain the material to create deepfakes?",
            options: [
              "By physically recording the target in secret",
              "From publicly available audio or video clips",
              "From company internal databases",
              "By hacking into private servers",
            ],
            correctAnswer: 1,
          },

          {
            question: "A red flag for a deepfake audio message is:",
            options: [
              "The speaker identifies themselves",
              "The request is outside of normal procedures and highly urgent",
              "The message is sent during work hours",
              "The message is clear and audible",
            ],
            correctAnswer: 1,
          },

          {
            question: "What is a key prevention tip against deepfake scams?",
            options: [
              "Verify surprising requests via a known, trusted phone number",
              "Share internal data quickly if the voice sounds real",
              "Always comply with voice message requests",
              "Assume all voice messages from executives are legitimate",
            ],
            correctAnswer: 0,
          },

          {
            question: "Why are deepfake attacks particularly dangerous?",
            options: [
              "They can convincingly mimic trusted individuals",
              "They require advanced technical skills from the target",
              "They only work on specific devices",
              "They are easy to detect with the naked eye",
            ],
            correctAnswer: 0,
          },

          {
            question:
              "If you receive a suspicious video call from a 'colleague' asking for sensitive information, you should:",
            options: [
              "Record the call for evidence",
              "Provide the information if their face looks correct",
              "End the call and contact the colleague through a different method",
              "Ask them to send an email instead",
            ],
            correctAnswer: 2,
          },

          {
            question: "Attackers use urgency in deepfake messages to:",
            options: [
              "Comply with legal requirements",
              "Pressure the target into acting without verification",
              "Test the quality of the deepfake",
              "Give the target more time to think",
            ],
            correctAnswer: 1,
          },

          {
            question:
              "What should organizations do to defend against deepfake threats?",
            options: [
              "Train employees to verify unusual requests through established protocols",
              "Only use text-based email for all requests",
              "Ban all voice and video communication",
              "Trust all communications that appear to come from leadership",
            ],
            correctAnswer: 0,
          },
        ],
      },
      {
        name: "Pretexting / In-person Social Engineering",
        prompts: [
          {
            question:
              "A person calls you claiming to be from IT, saying they need your password to fix an urgent issue. This is an example of:",
            options: [
              "Deepfake impersonation",
              "Watering-hole attack",
              "Pretexting",
              "Clipboard hijacking",
            ],
            correctAnswer: 2,
          },

          {
            question: "The main goal of pretexting is to:",
            options: [
              "Infect a website with malware",
              "Manipulate someone into revealing sensitive information",
              "Physically steal a laptop",
              "Block access to a network",
            ],
            correctAnswer: 1,
          },

          {
            question:
              "You receive a call from someone using internal company terminology and asking for your two-factor authentication code. What should you do?",
            options: [
              "Ask for their employee ID and then provide the code",
              "Provide the code to help them resolve the issue",
              "Hang up and call IT through the official support number",
              "Forward the call to your manager",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "Which of the following is a red flag for a pretexting call?",
            options: [
              "The call is during business hours",
              "The caller identifies themselves as an employee",
              "The caller asks for your password or login codes",
              "The caller is polite and professional",
            ],
            correctAnswer: 2,
          },

          {
            question: "How do attackers make their pretext seem believable?",
            options: [
              "By sending a follow-up email first",
              "By creating a sense of urgency and sounding authoritative",
              "By calling from an international number",
              "By speaking very quickly and hanging up",
            ],
            correctAnswer: 1,
          },

          {
            question:
              "A 'vendor' visits your office without an appointment and asks for access to the server room to fix a non-existent problem. This is likely:",
            options: [
              "A new employee",
              "A delivery person",
              "A scheduled maintenance visit",
              "A pretexting attempt",
            ],
            correctAnswer: 3,
          },

          {
            question: "What is a key prevention tip against pretexting?",
            options: [
              "Give out information if the caller knows your manager's name",
              "Trust calls that reference internal ticket numbers",
              "Always share information if the caller sounds urgent",
              "Never share passwords or 2FA codes over unsolicited calls",
            ],
            correctAnswer: 3,
          },

          {
            question:
              "If you receive a suspicious call requesting sensitive information, you should:",
            options: [
              "Provide partial information to see if they are legitimate",
              "Call them back on the number they provide",
              "Engage the caller to gather more details",
              "Report the call to your security or IT team",
            ],
            correctAnswer: 3,
          },

          {
            question: "Pretexting often relies on the attacker:",
            options: [
              "Sending a malicious email attachment",
              "Hacking into the company's website",
              "Creating a convincing story or scenario",
              "Having physical access to your computer",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "Why is verifying a caller's identity through official channels important?",
            options: [
              "It helps confirm the request is legitimate and not a pretext",
              "It is only necessary for external calls",
              "It wastes time and slows down problem resolution",
              "It is a company policy with no real security benefit",
            ],
            correctAnswer: 0,
          },
        ],
      },
      {
        name: "Watering-hole Attacks",
        prompts: [
          {
            question:
              "A website you frequently visit for industry news is compromised and begins hosting malicious downloads. This is called:",
            options: [
              "A supply-chain attack",
              "A deepfake attack",
              "A watering-hole attack",
              "A pretexting attack",
            ],
            correctAnswer: 2,
          },

          {
            question: "In a watering-hole attack, attackers target:",
            options: [
              "Random internet users",
              "A single individual's personal computer",
              "The company's main server",
              "Websites frequently visited by a specific group",
            ],
            correctAnswer: 3,
          },

          {
            question:
              "You see a 'Download Latest Tool' pop-up on a trusted industry blog. What should you do?",
            options: [
              "Click and download immediately",
              "Report the blog to the authorities",
              "Verify the download link with the official source and avoid if unexpected",
              "Close the pop-up and continue browsing",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "How do attackers typically compromise a site for a watering-hole attack?",
            options: [
              "By paying for advertising on the site",
              "By exploiting vulnerabilities to inject malicious code",
              "By sending phishing emails to the site's visitors",
              "By calling the website owner",
            ],
            correctAnswer: 1,
          },

          {
            question: "A red flag on a normally trusted website is:",
            options: [
              "The website requires a login",
              "The website has updated its design",
              "The website loads quickly",
              "Unexpected download prompts or pop-ups appear",
            ],
            correctAnswer: 3,
          },

          {
            question: "Why are watering-hole attacks effective?",
            options: [
              "They only work on outdated browsers",
              "They target people who never visit websites",
              "They are easy to detect with antivirus software",
              "They exploit the trust users have in familiar websites",
            ],
            correctAnswer: 3,
          },

          {
            question: "What can help protect you from watering-hole attacks?",
            options: [
              "Visiting only one website for all your needs",
              "Keeping your browser and endpoint protection software updated",
              "Disabling your browser's security settings",
              "Using the same password for all website logins",
            ],
            correctAnswer: 1,
          },

          {
            question:
              "If a familiar website starts behaving strangely or asking for credentials, you should:",
            options: [
              "Enter your credentials to see what happens",
              "Clear your browser cookies",
              "Leave the site and report the suspicious behavior",
              "Refresh the page multiple times",
            ],
            correctAnswer: 2,
          },

          {
            question: "The lesson from a watering-hole attack scenario is to:",
            options: [
              "Disable pop-up blockers to see all content",
              "Be cautious with downloads, even from trusted sites",
              "Only download files from links in emails",
              "Never visit any external websites",
            ],
            correctAnswer: 1,
          },

          {
            question: "What is the attacker's goal in a watering-hole attack?",
            options: [
              "To infect the computers of the website's visitors",
              "To steal the website owner's credentials",
              "To increase the website's traffic",
              "To deface the website's homepage",
            ],
            correctAnswer: 0,
          },
        ],
      },
      {
        name: "Supply-chain / Vendor Compromise",
        prompts: [
          {
            question:
              "An email arrives from your company's regular office supplier with an attached invoice. The supplier's email account was recently hacked. This is an example of:",
            options: [
              "Deepfake",
              "Watering-hole attack",
              "Pretexting",
              "Supply-chain phishing attack",
            ],
            correctAnswer: 3,
          },

          {
            question:
              "In a supply-chain attack, who do the attackers typically target first?",
            options: [
              "The company's CEO",
              "The company's public website",
              "A trusted vendor or partner",
              "A random employee",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "You receive a contract update attachment from a known vendor's email address. What should you do before opening it?",
            options: [
              "Save it to your desktop and scan it later",
              "Open it immediately; it's from a trusted source",
              "Contact the vendor through a separate, verified channel to confirm",
              "Forward it to your entire team for review",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "Why are supply-chain phishing emails particularly convincing?",
            options: [
              "They are sent to thousands of random addresses",
              "They exploit existing trust in a familiar vendor",
              "They always come from unknown senders",
              "They use poor grammar and spelling",
            ],
            correctAnswer: 1,
          },

          {
            question: "Which of the following is a red flag in a vendor email?",
            options: [
              "The sender's address matches the vendor's domain",
              "The email contains the vendor's correct logo",
              "The email is regarding a scheduled delivery",
              "The vendor suddenly asks for your login credentials",
            ],
            correctAnswer: 3,
          },

          {
            question: "How can an attacker use a compromised vendor account?",
            options: [
              "To improve the vendor's customer service",
              "To update the vendor's product catalog",
              "To send legitimate marketing newsletters",
              "To send phishing emails that appear to come from the trusted vendor",
            ],
            correctAnswer: 3,
          },

          {
            question:
              "What is a key prevention measure against supply-chain attacks?",
            options: [
              "Never open any emails from vendors",
              "Disable email filters to ensure all vendor emails are received",
              "Treat unexpected attachments from trusted sources with caution",
              "Share vendor emails freely within the company",
            ],
            correctAnswer: 2,
          },

          {
            question:
              "If a regular vendor's communication style suddenly seems different, you should:",
            options: [
              "Assume their email system has been updated",
              "Reply to the email asking why their tone changed",
              "Alert your security team and verify the request",
              "Ignore it; they might have hired new staff",
            ],
            correctAnswer: 2,
          },

          {
            question: "The lesson from a supply-chain attack scenario is to:",
            options: [
              "Block all emails from external vendors",
              "Only open attachments from internal senders",
              "Trust all emails from known domains",
              "Verify unexpected requests, even from trusted partners",
            ],
            correctAnswer: 3,
          },

          {
            question:
              "An attacker uses a compromised vendor's email to send malware. What might be their goal?",
            options: [
              "To gain access to the vendor's customer networks",
              "To test the vendor's email server capacity",
              "To help the vendor improve their security",
              "To increase the vendor's email open rates",
            ],
            correctAnswer: 0,
          },
        ],
      },
      {
        name: "Clipboard Hijacking",
        prompts: [
          {
            question:
              "You copy a cryptocurrency wallet address to make a payment, but when you paste it, one character is different. This could be due to:",
            options: [
              "A typing error.",
              "A website loading slowly.",
              "Your keyboard malfunctioning.",
              "Clipboard hijacking malware.",
            ],
            correctAnswer: 3,
          },
          {
            question:
              "What is the primary function of clipboard hijacking malware?",
            options: [
              "To encrypt your files for ransom.",
              "To monitor and replace copied text with attacker-controlled data.",
              "To log your keystrokes.",
              "To take screenshots of your desktop.",
            ],
            correctAnswer: 1,
          },
          {
            question:
              "After copying a bank account number, you paste it and it appears correct at a glance. Why should you still double-check?",
            options: [
              "Your computer might restart.",
              "To practice your typing skills.",
              "Clipboard hijacking could have changed it subtly.",
              "The clipboard might be full.",
            ],
            correctAnswer: 2,
          },
          {
            question: "How can you help prevent clipboard hijacking?",
            options: [
              "Keep your operating system and antivirus software updated.",
              "Copy and paste sensitive information repeatedly.",
              "Use the same password for all accounts.",
              "Disable your firewall.",
            ],
            correctAnswer: 0,
          },
          {
            question:
              "Which of the following is a common target for clipboard hijacking?",
            options: [
              "Social media posts.",
              "Word documents.",
              "Cryptocurrency wallet addresses and payment details.",
              "Email signatures.",
            ],
            correctAnswer: 2,
          },
          {
            question: "A red flag for clipboard hijacking is:",
            options: [
              "The pasted text matches what you copied exactly.",
              "Your clipboard history is empty.",
              "The pasted value is slightly different from what you copied.",
              "You cannot copy text at all.",
            ],
            correctAnswer: 2,
          },
          {
            question:
              "What should you do if you suspect your clipboard has been hijacked?",
            options: [
              "Restart your computer and ignore the issue.",
              "Continue your work as normal.",
              "Run a full antivirus scan and check pasted data carefully.",
              "Reinstall your web browser.",
            ],
            correctAnswer: 2,
          },
          {
            question: "Clipboard hijacking malware often runs:",
            options: [
              "Silently in the background.",
              "During system startup with a warning message.",
              "As a visible application on your desktop.",
              "Only when you open a specific file.",
            ],
            correctAnswer: 0,
          },
          {
            question:
              "To securely transfer a sensitive address, what is a safer method than copy-paste?",
            options: [
              "Sending it via an unencrypted email.",
              "Reading it aloud over the phone.",
              "Typing it manually from a trusted source.",
              "Taking a photo of it with your phone.",
            ],
            correctAnswer: 2,
          },
          {
            question: "The lesson from clipboard hijacking is to:",
            options: [
              "Trust that your antivirus will catch all changes.",
              "Always double-check pasted sensitive information character by character.",
              "Never use the copy-paste function.",
              "Only copy text from secure websites.",
            ],
            correctAnswer: 1,
          },
        ],
      },
    ],
  },
  {
    id: "physical_offline",
    title: "Physical / offline vectors",
    subtopics: [
      {
        name: "USB Drop / Rogue USBs",
        prompts: [
          {
            question:
              "You find a USB drive labeled 'Confidential - Q4 Financials' in the office parking lot. What should you do?",
            options: [
              "Take it home and plug it into your personal computer",
              "Plug it into your work computer to find the owner",
              "Hand it over to the IT or security department",
              "Throw it away",
            ],
            correctAnswer: 2,
          },
          {
            question: "What is a USB drop attack?",
            options: [
              "Using a USB drive to transfer files between computers",
              "A method to charge your phone via USB",
              "Leaving infected USB drives in public places to trick people into plugging them in",
              "Accidentally dropping a USB drive",
            ],
            correctAnswer: 2,
          },
          {
            question:
              "Why might an employee plug a found USB into their computer?",
            options: [
              "Because it is company property",
              "Out of curiosity or a desire to return it to the owner",
              "To steal data from it",
              "To test the USB port",
            ],
            correctAnswer: 1,
          },
          {
            question:
              "What can happen immediately when a malicious USB is plugged in?",
            options: [
              "A message will appear asking for the owner's permission",
              "The USB will format itself",
              "Malware can auto-run and infect the system",
              "The computer might install legitimate updates",
            ],
            correctAnswer: 2,
          },
          {
            question:
              "Attackers often label malicious USB drives with enticing names like 'Payroll' to:",
            options: [
              "Comply with labeling laws",
              "Make them easier to identify",
              "Help the owner find them",
              "Trigger urgency and curiosity",
            ],
            correctAnswer: 3,
          },
          {
            question: "A red flag for a malicious USB drive is:",
            options: [
              "It is a standard brand like SanDisk",
              "It has a professional-looking label for a sensitive topic",
              "It is unlabeled and plain",
              "It is found in a public area",
            ],
            correctAnswer: 3,
          },
          {
            question: "How can organizations help prevent USB drop attacks?",
            options: [
              "Disable auto-run features on corporate systems",
              "Provide free USB drives to all employees",
              "Encourage employees to check found USBs",
              "Allow USB usage only for IT staff",
            ],
            correctAnswer: 0,
          },
          {
            question:
              "If you accidentally plug an unknown USB into your computer and see unusual pop-ups, what should you do?",
            options: [
              "Unplug the USB and ignore the pop-ups",
              "Restart your computer",
              "Unplug the USB and immediately report it to IT",
              "Try to open the files on the USB",
            ],
            correctAnswer: 2,
          },
          {
            question: "What is a key lesson from USB drop attack scenarios?",
            options: [
              "Never plug unknown USB devices into work computers",
              "Lost USBs should be kept as personal backups",
              "USB drives are always safe to use",
              "Label all your USBs clearly to avoid loss",
            ],
            correctAnswer: 0,
          },
          {
            question:
              "Which of the following is a prevention tip against USB attacks?",
            options: [
              "Use hardware restrictions to block unauthorized USB ports",
              "Use any USB you find to save money",
              "Share found USBs with colleagues",
              "Always plug in USBs to see what's on them",
            ],
            correctAnswer: 0,
          },
        ],
      },
      {
        name: "Mail / Physical Letter Phishing",
        prompts: [
          {
            question:
              "You receive an official-looking letter at your desk with a QR code asking you to verify your account. What is the safest action?",
            options: [
              "Scan the QR code immediately to see what it is",
              "Throw the letter away",
              "Forward the letter to a colleague",
              "Contact the organization directly using a known phone number to verify",
            ],
            correctAnswer: 3,
          },
          {
            question: "Physical mail phishing can be convincing because:",
            options: [
              "Letters cannot contain malicious content",
              "Emails are more trusted than letters",
              "Physical documents often feel more formal and trustworthy",
              "Mail is always delivered by trusted couriers",
            ],
            correctAnswer: 2,
          },
          {
            question:
              "A letter threatens that your account will be suspended if you don't scan a QR code. This tactic uses:",
            options: [
              "A reward offer",
              "Fear and urgency to prompt action",
              "A complex technical explanation",
              "Humor to engage you",
            ],
            correctAnswer: 1,
          },
          {
            question: "What is a red flag in a physical phishing letter?",
            options: [
              "It is delivered by the postal service",
              "It contains typos or grammatical errors",
              "It is printed on high-quality paper",
              "It has the organization's correct logo",
            ],
            correctAnswer: 1,
          },
          {
            question: "Attackers use QR codes in physical mail to:",
            options: [
              "Comply with postal regulations",
              "Save on printing costs",
              "Make the letter look more colorful",
              "Bypass the user's suspicion of typing a URL",
            ],
            correctAnswer: 3,
          },
          {
            question:
              "You receive an unexpected 'tax refund' letter with a link to claim it. What should you do?",
            options: [
              "Call the number provided in the letter",
              "Click the link to check if it's real",
              "Assume it's junk mail and recycle it",
              "Visit the official tax website directly instead",
            ],
            correctAnswer: 3,
          },
          {
            question:
              "How can you help prevent falling for physical mail phishing?",
            options: [
              "Open all mail immediately to check contents",
              "Always scan every QR code you receive",
              "Trust letters that look very official",
              "Shred unsolicited mail containing links or codes",
            ],
            correctAnswer: 3,
          },
          {
            question:
              "A physical letter appears to be from your bank but has a generic greeting like 'Dear Customer.' Why is this suspicious?",
            options: [
              "All bank letters are generic",
              "Legitimate banks usually personalize correspondence with your name",
              "It is a sign of a new marketing campaign",
              "Banks never use greetings in letters",
            ],
            correctAnswer: 1,
          },
          {
            question:
              "What should you do with a suspicious physical document you receive at work?",
            options: [
              "Try to find the sender online",
              "Report it to your security or IT team",
              "Show it to your coworkers",
              "Keep it on your desk as a reminder",
            ],
            correctAnswer: 1,
          },
          {
            question: "The lesson from physical mail phishing is to:",
            options: [
              "Trust all official-looking documents",
              "Ignore all mail that isn't from a known sender",
              "Verify unexpected physical notices with the actual organization",
              "Use QR codes as a faster way to access websites",
            ],
            correctAnswer: 2,
          },
        ],
      },
      {
        name: "On-site Social Engineering",
        prompts: [
          {
            question:
              "A person carrying boxes asks you to hold the office door open because their hands are full. What should you do?",
            options: [
              "Ask them for their personal identification",
              "Direct them to the reception for proper verification",
              "Ignore them and walk away",
              "Politely hold the door open for them",
            ],
            correctAnswer: 1,
          },
          {
            question: "On-site social engineering often relies on:",
            options: [
              "Sending phishing emails",
              "Complex hacking software",
              "Exploiting human politeness and trust",
              "Using deepfake technology",
            ],
            correctAnswer: 2,
          },
          {
            question:
              "You see an unfamiliar person in a uniform walking quickly through the office without a visitor pass. This could be:",
            options: [
              "A potential on-site social engineering attempt",
              "A manager from another department",
              "A new employee on their first day",
              "A cleaner who started early",
            ],
            correctAnswer: 0,
          },
          {
            question: "What is a common tactic used in tailgating attacks?",
            options: [
              "Leaving infected USB drives in the lobby",
              "Following closely behind an employee to enter a secure area",
              "Sending malicious links via email",
              "Making fraudulent phone calls",
            ],
            correctAnswer: 1,
          },
          {
            question:
              "A 'delivery person' tries to enter a restricted area claiming they are in a hurry. What is a red flag?",
            options: [
              "They are carrying a package",
              "They are wearing a uniform",
              "They are avoiding security checks and verification",
              "They are speaking politely",
            ],
            correctAnswer: 2,
          },
          {
            question:
              "The primary goal of an on-site social engineering attack is often to:",
            options: [
              "Gain physical access to steal data or plant malware",
              "Fix a broken piece of equipment",
              "Deliver a package to the right person",
              "Conduct a customer survey",
            ],
            correctAnswer: 0,
          },
          {
            question:
              "If you notice someone tailgating you into a secure building, you should:",
            options: [
              "Assume they are authorized",
              "Hold the door open for them to be polite",
              "Politely challenge them or report them to security",
              "Speed up to get away from them",
            ],
            correctAnswer: 2,
          },
          {
            question:
              "An attacker pretending to be an IT technician asks to be let into the server room. What should you do?",
            options: [
              "Verify their identity with the IT department",
              "Let them in if they sound knowledgeable",
              "Ask them to come back later",
              "Give them a temporary access code",
            ],
            correctAnswer: 0,
          },
          {
            question: "Why are social engineering attacks effective in person?",
            options: [
              "Because all employees know each other",
              "Because they exploit natural human tendencies to be helpful",
              "Because security cameras are always off",
              "Because office doors are always unlocked",
            ],
            correctAnswer: 1,
          },
          {
            question:
              "What is a key prevention tip against on-site social engineering?",
            options: [
              "Wear your ID badge at all times",
              "Direct all unknown individuals to reception or security",
              "Ignore people who look suspicious",
              "Always be polite and hold doors for everyone",
            ],
            correctAnswer: 1,
          },
        ],
      },
    ],
  },
  // {
  //   id: "other_variants",
  //   title: "Other noteworthy variants",
  //   subtopics: [
  //     {
  //       name: "Malicious Chatbots / Automated Scams",
  //       prompts: [
  //         {
  //           question: "Malicious chatbots are used to:",
  //           options: [
  //             "Trick users into revealing credentials or clicking links",
  //             "Improve customer support",
  //             "Scan QR codes safely",
  //             "Encrypt user data",
  //           ],
  //           correctAnswer: 0,
  //         },
  //       ],
  //     },
  //     {
  //       name: "Pop-up / Browser Alert Phishing",
  //       prompts: [
  //         {
  //           question: "Pop-up phishing uses:",
  //           options: [
  //             "Fake browser alerts warning of infections to get users to call or click",
  //             "Legitimate system notifications",
  //             "Secure website certificates",
  //             "Antivirus software updates",
  //           ],
  //           correctAnswer: 0,
  //         },
  //       ],
  //     },
  //     {
  //       name: "Credential Stuffing (related risk)",
  //       prompts: [
  //         {
  //           question: "Credential stuffing is:",
  //           options: [
  //             "Using stolen credentials from one breach to try logging into other services",
  //             "A method to securely store passwords",
  //             "A type of multi-factor authentication",
  //             "A way to generate strong, unique passwords",
  //           ],
  //           correctAnswer: 0,
  //         },
  //       ],
  //     },
  //   ],
  // },
];
