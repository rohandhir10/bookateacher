import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | bookateacher.in",
  description:
    "Detailed Privacy Policy for bookateacher.in — what personal data we collect from students and tutors, how we use it to match and book sessions, what we share with payment partners and analytics, your rights under India's Digital Personal Data Protection Act 2023, data retention, security, cookies, and how to contact us.",
  openGraph: {
    title: "Privacy Policy | bookateacher.in",
    description:
      "Detailed Privacy Policy for bookateacher.in — data collection, usage, sharing, your rights under India's DPDP Act 2023, cookies, security, retention.",
    type: "website",
    locale: "en_IN",
    siteName: "bookateacher.in",
    url: "https://bookateacher.in/privacy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | bookateacher.in",
    description:
      "Detailed Privacy Policy for bookateacher.in — data collection, usage, sharing, your rights under India's DPDP Act 2023, cookies, security, retention.",
  },
  alternates: {
    canonical: "https://bookateacher.in/privacy",
  },
};

const INK = "#14213D";
const INK_SOFT = "#3D4A63";
const PAPER = "#FAF7F0";
const PAPER_2 = "#F2ECE0";
const LINE = "#D9D2C5";
const MUTED = "#6B6557";
const RED = "#B23A2E";

function section(n: string, title: string, body: string) {
  return {
    n,
    title,
    body: body.replace(/\n/g, "<br />"),
  };
}

export default function PrivacyPage() {
  const sections = [
    section(
      "1",
      "Introduction",
      `bookateacher.in (the \u201cCompany,\u201d \u201cwe,\u201d \u201cour,\u201d or \u201cus\u201d) operates the website and services at bookateacher.in (the \u201cPlatform\u201d), a platform that connects Students seeking English language coaching \u2014 including IELTS, TOEFL, and Spoken English preparation \u2014 with Tutors who provide those services.<p>We are committed to protecting your personal data and handling it responsibly. This Privacy Policy (the \u201cPolicy\u201d) explains in detail:</p><ul><li>what personal data we collect from you,</li><li>how and why we collect it,</li><li>how we use it,</li><li>with whom we share it,</li><li>how long we keep it,</li><li>how we protect it,</li><li>your rights over your data,</li><li>and how you can contact us.</li></ul><p>We write this Policy keeping in mind India\u2019s Digital Personal Data Protection Act, 2023 (the \u201cDPDP Act\u201d), which governs how personal data may be processed in India, and other applicable laws. We aim to comply with the DPDP Act and its rules as they come into force.<p>By using the Platform, you consent to the collection, use, and sharing of your personal data as described in this Policy. If you do not agree, you should not use the Platform.<p>This Policy applies to all Users \u2014 Students, Tutors, and any other persons whose personal data we process in connection with the Platform \u2014 whether or not they have registered an account.`
    ),
    section(
      "2",
      "What Personal Data We Collect",
      `We collect the following categories of personal data, depending on how you use the Platform and whether you are a Student, a Tutor, or both.<p><strong>2.1 Data you give us directly</strong></p><ul><li><strong>Registration data.</strong> When you create an account, we collect your full name, email address, password (stored in hashed form), phone number, and the role you register under (Student or Tutor).</li><li><strong>Profile data (Tutors).</strong> If you register as a Tutor, we collect additional information needed for your public profile and for matching with Students, including: your teaching credentials and qualifications (degrees, certificates, test scores, certifications such as CELTA or IDP certification); teaching experience and years of experience; subjects you teach (e.g., IELTS, TOEFL, Spoken English); your hourly rate or session fee; your availability; a biography or description of your teaching background and style; and any profile photo or image you upload.</li><li><strong>Lead request data (Students).</strong> When you submit a match request (a \u201cLead\u201d), we collect detailed information about your requirements, including: your name and contact details; the subject you need help with (e.g., IELTS, TOEFL, Spoken English); your target score or goal; your current level; your budget or preferred fee range; your preferred days and times for sessions; whether you prefer online or in-person sessions; your location (city/area); and any specific challenges, weak areas, or background you choose to describe (e.g., writing weakness, speaking anxiety, test date).</li><li><strong>Session and booking data.</strong> When a session is booked, we collect and store data about the booking, including the scheduled date and time, session duration, the meeting link or location (if any), the agreed fee, payment status, and any notes or feedback exchanged in the Platform.</li><li><strong>Communication data.</strong> Messages between Users within the Platform, and any other communications you have with us through the Platform or by email, including the content of those communications and any attachments.</li><li><strong>Reviews and ratings.</strong> If you leave a review for a Tutor, we collect the review text, the rating you give, and the fact that you had a session with that Tutor. We do not collect your full name in reviews unless you choose to share it.</li><li><strong>Documents and verification data.</strong> If we require documents for Tutor verification (such as identity documents, degree certificates, or test score reports), we collect and store those documents or images, and may verify them against the relevant issuing authority or database where permitted and lawful.</li></ul><p><strong>2.2 Data collected automatically</strong></p><ul><li><strong>Usage data.</strong> When you access the Platform, we collect information about how you use it, including the pages you visit, the features you use, the time and date of your visits, the duration of your visits, the links you click, and the referral source.</li><li><strong>Device and technical data.</strong> We collect information about the device and software you use to access the Platform, including your IP address, browser type and version, operating system, device type, screen resolution, and certain cookies and similar technologies (see Section 9).</li><li><strong>Log data.</strong> We collect server log data, including access times, error logs, and other technical information, for operational and security purposes.</li></ul><p><strong>2.3 Data from payment partners</strong></p><ul><li><strong>Payment and transaction data.</strong> When you make a payment through a payment partner such as Razorpay, the payment partner collects and processes your payment information (card number, UPI ID, or other payment details). We do not store full card numbers, CVV codes, UPI PINs, or other sensitive payment credentials on our servers. We receive confirmation of payment, the transaction ID, the amount, the date, and the fact of payment. The payment partner is responsible for its own data handling, which is governed by the partner\u2019s privacy policy.</li></ul><p><strong>2.4 Data from analytics and third-party services</strong></p><ul><li><strong>Analytics data.</strong> We use Google Analytics 4 (GA4), a web analytics service provided by Google. GA4 collects data about your use of the Platform, including your IP address (which Google may truncate or anonymize), device and browser information, pages visited, and events triggered on the Platform. Google may transfer this data to servers outside India. See Section 9 for details and how to opt out.</li><li><strong>Other third-party services.</strong> The Platform may use other third-party services for hosting, infrastructure, email delivery, or other functions. Each such service may receive data in the course of providing its service. Where we use such a service, we will list it here or describe its role.</li></ul>`
    ),
    section(
      "3",
      "How We Collect Personal Data",
      `We collect personal data in the following ways:<ul><li><strong>Directly from you.</strong> When you register, create a profile, submit a Lead, book a session, send a message, leave a review, or otherwise provide information to us.</li><li><strong>Automatically, as you use the Platform.</strong> Through cookies, similar technologies, log files, analytics, and other automated means, as described in Section 2.2 and Section 9.</li><li><strong>From payment partners.</strong> When you make a payment, the payment partner shares with us the information needed to confirm the payment and process the booking.</li><li><strong>From you in connection with verification.</strong> When we ask you to provide documents or information to verify your identity, credentials, or other information, as described in Section 7 of our Terms of Service.</li><li><strong>From other Users, where permitted.</strong> When a Lead is matched and both the Student and the Tutor consent to communicate directly, the Tutor may receive the Student\u2019s name, contact details, and Lead information, and vice versa. We disclose such information only after a Lead has been matched and only to the extent necessary for the Student and Tutor to arrange and conduct sessions. We rely on the Student\u2019s consent (given by submitting the Lead with the understanding that it will be shared with a matched Tutor) and the Tutor\u2019s consent (given by accepting or engaging with the match) for this sharing.</li></ul><p>We do not collect personal data about you from sources other than those listed above, except where required by law or where you have given us specific consent. We do not sell, rent, or trade your personal data to third parties for their own marketing or other purposes, as described in Section 5.`
    ),
    section(
      "4",
      "Why We Use Your Personal Data — Purpose and Legal Basis",
      `We process your personal data for the following purposes. For each purpose, we rely on the legal basis described, in line with the DPDP Act and other applicable law.<p><strong>4.1 To provide and operate the Platform.</strong> We use your data to create and maintain your account, to let you log in, to let you use the features of the Platform (including searching, matching, booking, messaging, and payment), and to keep the Platform running. <em>Legal basis: necessary for the performance of a contract (your use of the Platform) and for legitimate uses in operating the Platform.</em></p><p><strong>4.2 To match Students with Tutors.</strong> We use the information in your Lead (for Students) and your profile (for Tutors) to identify Tutors who may be a good match for a Student\u2019s needs, and to share that information with the matched Parties so they can arrange a session. <em>Legal basis: consent (the Student submits the Lead for this purpose) and legitimate interest in operating the matching service.</em></p><p><strong>4.3 To conduct and manage sessions and bookings.</strong> We use booking details, payment status, availability, and related data to schedule sessions, send reminders, manage cancellations and rescheduling, and maintain records of bookings. <em>Legal basis: necessary for the performance of a contract and for our legitimate interest in managing the Platform\u2019s services.</em></p><p><strong>4.4 To process payments.</strong> We use transaction data and information shared by payment partners to process payments, issue refunds where required, and keep records of financial transactions. <em>Legal basis: necessary for the performance of a contract and for compliance with our legal obligations relating to payment processing.</em></p><p><strong>4.5 To verify Tutors and maintain platform quality.</strong> We use credentials, documents, and verification data to check that Tutors meet the requirements of our Terms of Service and to maintain the quality and safety of the Platform. <em>Legal basis: legitimate interest in maintaining a trustworthy platform, and, where required, consent.</em></p><p><strong>4.6 To communicate with you.</strong> We use your email address and phone number to send you account-related messages, booking confirmations and reminders, updates about your sessions and matches, and (where you consent) promotional or informational communications about the Platform. <em>Legal basis: necessary for the performance of a contract (for transactional messages) and consent (for marketing).</em></p><p><strong>4.7 To improve the Platform and develop new features.</strong> We use usage data and analytics to understand how Users use the Platform, to identify problems, and to develop and improve features and services. <em>Legal basis: legitimate interest in improving our services, and, where we use analytics, consent where required under applicable law.</em></p><p><strong>4.8 For security, fraud prevention, and legal compliance.</strong> We use log data, device data, and other information to monitor and protect the security of the Platform, to prevent fraud and misuse, and to comply with legal obligations. <em>Legal basis: legitimate interest in security and fraud prevention, and legal obligation where applicable.</em></p><p><strong>4.9 For marketing and promotional communications.</strong> With your consent, we may send you promotional messages about the Platform, new features, offers, or other information we think may be of interest. You may withdraw consent for marketing at any time, as described in Section 8. <em>Legal basis: consent.</em></p>`
    ),
    section(
      "5",
      "Who We Share Your Personal Data With",
      `We do not sell, rent, or trade your personal data to third parties for their own purposes. We may share your personal data with the following categories of recipients, and only to the extent necessary for the purposes described in this Policy:<p><strong>5.1 Other Users (Students and Tutors), where a Lead is matched.</strong> When a Lead is matched, we share the Student\u2019s Lead information and contact details with the matched Tutor, and the Tutor\u2019s profile information and contact details with the Student, so that they can arrange and conduct a session. This sharing is based on the Student\u2019s consent (given by submitting the Lead with the understanding that it will be shared with a matched Tutor) and the Tutor\u2019s consent (given by engaging with the match). Once a match is made and both parties consent to communicate directly, the Student and Tutor may communicate directly and share further information as needed for the session. We are not responsible for information shared directly between Users outside the Platform.</p><p><strong>5.2 Payment partners.</strong> When you make a payment, we share the information necessary for the payment partner to process the payment, such as the transaction amount, description, and your payment method identifier as provided to the payment partner. The payment partner (for example, Razorpay) processes the payment and may collect and store your payment information in accordance with its own privacy policy and applicable law. We do not share full card numbers, UPI PINs, or other sensitive payment credentials with anyone other than the payment partner and as required by law.</p><p><strong>5.3 Analytics providers.</strong> We use Google Analytics 4 (GA4), which collects certain data about your use of the Platform. Google may receive your IP address, device information, and usage data. Google\u2019s use of this data is governed by the Google Analytics terms of service and Google\u2019s privacy policy. See Section 9 for how to opt out of GA4.</p><p><strong>5.4 Infrastructure and service providers.</strong> We use third-party services for hosting, cloud infrastructure, email, and other operational functions. These providers receive only the data necessary for them to provide their service (for example, server logs, email addresses for transactional emails, and other operational data). They are contractually required to process this data only on our instructions and to protect it appropriately. In some cases, these providers may be located outside India, and your data may be transferred outside India in accordance with Section 7.</p><p><strong>5.5 Legal and regulatory authorities.</strong> We may disclose personal data if required by applicable law, regulation, legal process, court order, or government request, or to protect the rights, property, or safety of the Company, its Users, or others, including to respond to claims, disputes, or illegal activity. We will disclose only the minimum necessary information in such cases.</p><p><strong>5.6 With your consent.</strong> We may share your personal data with other third parties only where you have given us clear, specific consent to do so, for example where you consent to a particular feature or service that involves sharing your data with another provider.</p><p><strong>5.7 Aggregate and anonymized data.</strong> We may use and share aggregate or anonymized data \u2014 data that cannot reasonably be used to identify you \u2014 for analytics, reporting, and business purposes. For example, we may share information about the number of sessions booked, average ratings, or subject demand, in a form that does not identify any individual User.</p>`
    ),
    section(
      "6",
      "International Data Transfers",
      `The Platform is operated from India, and we aim to keep your personal data within India wherever reasonably possible. However, some of the services and providers we use may transfer, store, or process your personal data outside India, including:<ul><li>Google Analytics 4 (GA4), which is provided by Google and may transfer data to servers outside India.</li><li>Payment partners, which may process or store payment data in the country in which their payment systems operate.</li><li>Infrastructure and hosting providers, which may have data centers or processing facilities outside India.</li></ul><p>Where your data is transferred outside India, we will take steps to ensure that the transfer is made to a country or to a recipient that provides a level of protection for personal data that is adequate under the DPDP Act and other applicable law, or that appropriate safeguards (such as contractual terms) are in place.<p>If you are outside India and use the Platform, please note that your data may be transferred to India and processed there, and that the laws of your country and India may differ in how they protect personal data. By using the Platform, you consent to such transfer and processing as described in this Policy.`
    ),
    section(
      "7",
      "How Long We Keep Your Personal Data",
      `We keep your personal data only as long as necessary for the purposes described in this Policy, and in accordance with the DPDP Act, applicable law, and our legal and business obligations. The following retention principles apply:<p><strong>7.1 Account and profile data.</strong> We keep your account and profile data for as long as your account is active, or for a limited period after your account is closed if we need to retain it for legal, dispute, or operational reasons (for example, to handle unresolved bookings, refunds, or complaints). After that period, we will delete or anonymize the data.</p><p><strong>7.2 Lead and booking data.</strong> We retain lead and booking records for as long as needed to manage sessions, handle disputes and complaints, process payments and refunds, and comply with legal obligations. Once a booking is complete and any related issues are resolved, we may retain summary records (without sensitive details) for analytics and business planning.</p><p><strong>7.3 Payment and transaction data.</strong> We retain payment and transaction records for the period required for accounting, tax, and legal compliance, which may be several years depending on applicable law. We do not store full payment credentials; those are retained by the payment partner in accordance with its own retention practices.</p><p><strong>7.4 Verification documents.</strong> We retain Tutor verification documents only as long as the Tutor\u2019s profile is active and for a reasonable period after the profile is removed, to support the integrity of the Platform and, where necessary, legal or regulatory compliance.</p><p><strong>7.5 Analytics and usage data.</strong> We retain analytics and usage data in accordance with the retention practices of our analytics provider (Google Analytics 4) and our own operational needs. Google Analytics data is retained by Google for the period set in the Google Analytics settings (typically 2 months by default, or longer if configured).</p><p><strong>7.6 Inactivity.</strong> If your account is inactive for an extended period (for example, more than 12 months without login, subject to any legal obligations to retain data longer), we may close your account and delete or anonymize your personal data, after giving you reasonable notice where contact information is available.</p><p><strong>7.7 Legal holds.</strong> We may retain personal data for longer than the periods described above if required by law, by a legal proceeding, or to establish, exercise, or defend legal rights.</p>`
    ),
    section(
      "8",
      "Your Rights Under the Digital Personal Data Protection Act, 2023",
      `India\u2019s Digital Personal Data Protection Act, 2023 (DPDP Act) gives individuals (called \u201cData Principals\u201d under the Act) certain rights over their personal data. Where the DPDP Act applies to your data, you have the following rights, which you can exercise by contacting us using the details in Section 12:<p><strong>8.1 Right to access information.</strong> You have the right to know whether we are processing your personal data, and if so, to request information about the description of the personal data being processed, the purpose of processing, the categories of personal data processed, the entities or categories of entities with whom your data has been shared, and other information about our processing of your data, in the form and manner prescribed under the Act and its rules.</p><p><strong>8.2 Right to correction and erasure.</strong> You have the right to request that we correct inaccurate or incomplete personal data we hold about you, and to request that we erase your personal data, subject to the exceptions in the DPDP Act (for example, where we are required to retain the data by law, or where erasure would interfere with a legal obligation or a legitimate purpose).</p><p><strong>8.3 Right to grievance redressal.</strong> If you have a concern or complaint about how we handle your personal data, you have the right to lodge a grievance with us, and we are required to respond within a reasonable time. If you are not satisfied with our response, you may lodge a complaint with the Data Protection Board of India, which is being established under the DPDP Act. Contact details for lodging a complaint with the Board will be made available when the Board is established and the relevant contact information is published.</p><p><strong>8.4 Right to withdraw consent.</strong> Where we process your personal data based on your consent (for example, for marketing communications, or for certain analytics), you have the right to withdraw your consent at any time. Withdrawing consent does not affect the lawfulness of any processing that took place before you withdrew your consent, and may affect our ability to provide certain services that depend on that processing. To withdraw consent, you can use the unsubscribe link in any marketing email, adjust your preferences in your account, or contact us using the details in Section 12.</p><p><strong>8.5 Right to nominate.</strong> Under the DPDP Act, a Data Principal may nominate a person to exercise their rights in the event of the Data Principal\u2019s death or incapacity. The process for nomination will be prescribed under the Act and its rules. At present, we do not offer a nomination feature, but we will implement one if and when required by the Act and its rules.</p><p><strong>8.6 Other rights.</strong> Depending on the provisions of the DPDP Act and its rules, and on other applicable law, you may have additional rights regarding your personal data. We will implement these rights as required.</p><p><strong>How to exercise your rights.</strong> To exercise any of the rights above, please contact us using the details in Section 12, describing the right you wish to exercise and providing enough information for us to verify your identity and locate your data. We will respond within a reasonable time and in the manner required by the Act and its rules. You may also exercise your rights through a consent manager, if one is designated under the Act.</p>`
    ),
    section(
      "9",
      "Cookies and Similar Technologies",
      `The Platform uses cookies and similar technologies (such as web beacons, pixels, local storage, and similar tools) to operate the Platform, improve your experience, and understand how the Platform is used. Here is what we use and why:<p><strong>9.1 Types of cookies we use.</strong><ul><li><strong>Essential cookies.</strong> These are necessary for the Platform to function \u2014 for example, to keep you logged in, to remember your session, and to enable core features like booking and messaging. The Platform cannot operate properly without these cookies, and we do not need your consent to use them.</li><li><strong>Analytics cookies.</strong> We use Google Analytics 4 (GA4) to collect information about how visitors use the Platform, including pages visited, time spent, and events. GA4 uses cookies and similar technologies to collect this data. GA4 does not use cookies to identify you personally in the same way as a login system, but it does collect information that can be used to understand usage patterns. We use GA4 based on the settings we have configured, which may include IP anonymization. For details on GA4\u2019s use of cookies, see Google\u2019s documentation and privacy policy.</li><li><strong>Preference and functional cookies.</strong> These remember your preferences (such as language or other settings) to improve your experience.</li></ul><p><strong>9.2 Third-party cookies.</strong> Some cookies on the Platform may be set by third parties whose services we use, such as Google (for GA4). These third parties may set their own cookies and use their own privacy policies. We do not control these cookies directly, and you should review the relevant third party\u2019s policy for details.</p><p><strong>9.3 How to manage cookies.</strong> You can control cookies through your browser settings. Most browsers allow you to:<ul><li>view what cookies are stored;</li><li>delete specific cookies or all cookies;</li><li>block or allow cookies by site;</li><li>block third-party cookies.</li></ul><p>If you block all cookies, some features of the Platform may not work properly. If you block analytics cookies, we will still collect some usage data through other means (such as server logs), but the detail of that data will be reduced.</p><p><strong>9.4 Opting out of Google Analytics.</strong> You can opt out of Google Analytics tracking by visiting Google\u2019s opt-out page at https://tools.google.com/dlpage/gaoptout, or by using a browser add-on that blocks Google Analytics.<p><strong>9.5 Other similar technologies.</strong> In addition to cookies, we may use other technologies such as local storage and web beacons for similar purposes. The principles above apply to these technologies as well.<p><strong>9.6 Updates to our cookie use.</strong> We may update the cookies and similar technologies we use from time to time. Where we introduce new cookies that require your consent under applicable law, we will ask for your consent before using them.`
    ),
    section(
      "10",
      "Marketing and Promotional Communications",
      `We may send you promotional or informational messages about the Platform, new features, offers, events, or other matters we think may interest you. These messages are sent only where we have your consent, or where permitted by applicable law.<p><strong>10.1 How we obtain consent.</strong> When you register, we may ask whether you consent to receive marketing communications by email or other means. You can also consent later through your account settings.<p><strong>10.2 Transactional messages.</strong> We will send you messages related to your account, bookings, sessions, payments, and other Platform activity even if you have not consented to marketing, because these are necessary for the operation of the Platform and for our contractual relationship with you. Such messages do not require separate marketing consent.<p><strong>10.3 Withdrawal of consent.</strong> You may withdraw your consent to receive marketing communications at any time, by using the unsubscribe link in any marketing email, by adjusting your preferences in your account, or by contacting us using the details in Section 12. Withdrawing consent does not affect your right to receive transactional messages necessary for the Platform\u2019s operation.<p><strong>10.4 Our commitment.</strong> We will not use your contact information for marketing purposes beyond what you have consented to, and we will not share your contact information with third parties for their own marketing purposes.`
    ),
    section(
      "11",
      "Data Security",
      `We take reasonable measures to protect your personal data against unauthorized access, loss, misuse, alteration, and disclosure. These measures include:<ul><li><strong>Encryption in transit.</strong> We use HTTPS (TLS) to encrypt data transmitted between your device and the Platform.</li><li><strong>Encryption and hashing at rest.</strong> Where we store personal data, we use appropriate measures to protect it, including encryption and secure hashing of passwords (using strong, salted hashing algorithms).</li><li><strong>Access controls.</strong> Access to personal data within the Company is limited to employees, contractors, and agents who need it to perform their functions, and is controlled by authentication and access-management procedures.</li><li><strong>Secure infrastructure.</strong> We use reputable hosting and infrastructure providers, and we rely on their security measures as part of our overall protection.</li><li><strong>Regular review.</strong> We periodically review our security practices and update them as needed and as technology and threats evolve.</li><li><strong>Verification processes.</strong> For Tutors, we use the verification processes described in Section 7 of our Terms of Service to confirm identity and credentials before publishing profiles.</li></ul><p><strong>However, no method of transmission over the internet or electronic storage is 100% secure.</strong> While we strive to protect your data, we cannot guarantee absolute security. If we become aware of a personal data breach affecting your data, we will take reasonable steps to address it and, where required by law, notify you and the relevant authorities.</p>`
    ),
    section(
      "12",
      "Children and Personal Data of Minors",
      `The Platform is not intended for children under 18 years of age. Under the DPDP Act, a \u201cchild\u201d is a person who has not completed 18 years of age, and the Act imposes additional requirements on processing children\u2019s personal data, including parental consent.<p>We do not knowingly collect or process personal data from children under 18 without parental consent.<ul><li><strong>Students under 18.</strong> Students under 18 may use the Platform only with the consent of a parent or legal guardian who agrees to be bound by our Terms of Service and this Policy, and who is responsible for the Student\u2019s use of the Platform. Where we become aware that a User is under 18, we may require parental confirmation before allowing full use of the Platform.</li><li><strong>Tutors.</strong> Tutors must be at least 18 years old, as described in Section 3 of our Terms of Service. We do not knowingly allow or invite anyone under 18 to register as a Tutor.</li><li><strong>If we learn we have collected a child\u2019s data without consent.</strong> If we learn that we have collected personal data from a child under 18 without the required parental consent, we will take reasonable steps to delete that data, and may suspend or restrict the account pending verification.</li></ul><p>If you are a parent or guardian and believe your child has provided us with personal data without your consent, please contact us using the details in Section 13 so we can address the issue.`
    ),
    section(
      "13",
      "Your Data Protection Rights Outside India",
      `If you are located outside India, you may have additional rights under the data protection or privacy laws of your country, such as the right to access, correct, erase, restrict processing, object to processing, or receive your data in a portable format. These rights may differ from, and may not overlap with, the rights under the DPDP Act described in Section 8.<p>If you wish to exercise rights under the laws of your country, please contact us using the details in Section 14, and we will consider your request in accordance with applicable law. We will not respond to requests that are unlawful or that would conflict with our legal obligations.</p>`
    ),
    section(
      "14",
      "Changes to This Privacy Policy",
      `We may update this Policy from time to time to reflect changes in our practices, the Platform, applicable law (including the DPDP Act and its rules), or other business needs. We will notify you of significant changes in one or more of the following ways:<ul><li>By posting the updated Policy on the Platform with a new \u201clast updated\u201d date. The current Policy is always available at https://bookateacher.in/privacy.</li><li>By email to the address associated with your account, for significant changes that affect your rights or the processing of your data.</li><li>By a prominent notice on the Platform.</li></ul><p>Your continued use of the Platform after the updated Policy is posted constitutes your acceptance of the updated Policy. If you do not agree to the updated Policy, you should stop using the Platform and contact us to close your account.<p>If you have questions about any changes, please contact us using the details in Section 14.`
    ),
    section(
      "15",
      "Contact Us",
      `If you have any questions, concerns, or requests about this Privacy Policy, or if you wish to exercise any of the rights described in this Policy (including your rights under the DPDP Act), please contact us:<p><strong>By email:</strong> support@bookateacher.in</p><p><strong>By post:</strong> bookateacher.in, Delhi, India</p><p><strong>Grievances:</strong> If you have a concern or complaint about how we handle your personal data, you may lodge a grievance with us by email at the address above. We will make reasonable efforts to respond within a reasonable time. If you are not satisfied with our response, you may lodge a complaint with the Data Protection Board of India, once the Board is established and its complaint mechanism is available.<p>We will treat requests and complaints about privacy and data protection seriously and respond in the manner required by the DPDP Act and other applicable law.`
    ),
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: PAPER,
        color: INK,
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: `rgba(${parseInt(INK_SOFT.slice(1, 3), 16)}, ${parseInt(INK_SOFT.slice(3, 5), 16)}, ${parseInt(INK_SOFT.slice(5, 7), 16)}, 0.92)`,
          backdropFilter: "blur(8px)",
          borderBottom: `1px solid ${LINE}`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
            gap: 24,
            width: "100%",
            maxWidth: 1180,
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          <Link
            href="/"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 600,
              fontSize: "1.25rem",
              letterSpacing: "-0.02em",
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: INK,
              textDecoration: "none",
            }}
          >
            <span
              style={{
                width: 28,
                height: 28,
                background: INK,
                borderRadius: 5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M3 8h18M3 12h13M3 16h9" stroke={PAPER} strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>
            <span style={{ color: INK }}>
              bookateacher
              <span
                style={{
                  color: MUTED,
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 400,
                }}
              >
                .in
              </span>
            </span>
          </Link>
        </div>
      </header>

      {/* Main */}
      <main style={{ flex: 1, padding: "48px 24px" }}>
        <div style={{ width: "100%", maxWidth: 760, margin: "0 auto" }}>
          {/* Breadcrumb */}
          <nav
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 24,
              paddingBottom: 16,
              borderBottom: `1px solid ${LINE}`,
              fontSize: "0.8125rem",
              color: MUTED,
            }}
            aria-label="Breadcrumb"
          >
            <Link href="/" style={{ color: INK_SOFT, textDecoration: "none" }}>
              Home
            </Link>
            <span>/</span>
            <span style={{ color: INK, fontWeight: 500 }}>Privacy Policy</span>
          </nav>

          <div style={{ marginBottom: 32 }}>
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                color: INK,
                marginBottom: 8,
                lineHeight: 1.1,
              }}
            >
              Privacy Policy
            </h1>
            <p style={{ fontSize: "0.9375rem", color: MUTED }}>
              Last updated: 20 September 2026
            </p>
          </div>

          {/* Content */}
          <div
            style={{
              background: PAPER_2,
              border: `1px solid ${LINE}`,
              borderRadius: 14,
              padding: "32px 36px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {sections.map((s) => (
                <div key={s.n}>
                  <h2
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: "1.125rem",
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                      color: INK,
                      marginBottom: 8,
                      lineHeight: 1.3,
                    }}
                  >
                    {s.n}. {s.title}
                  </h2>
                  <div
                    style={{
                      fontSize: "0.9375rem",
                      color: INK_SOFT,
                      lineHeight: 1.75,
                    }}
                    dangerouslySetInnerHTML={{ __html: s.body }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Closing */}
          <div
            style={{
              marginTop: 32,
              paddingTop: 24,
              borderTop: `1px solid ${LINE}`,
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "0.875rem", color: MUTED, lineHeight: 1.6 }}>
              By using bookateacher.in, you agree to this Privacy Policy and our Terms of Service.
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 24,
                marginTop: 16,
              }}
            >
              <Link
                href="/"
                style={{ fontSize: "0.875rem", color: INK_SOFT, textDecoration: "underline" }}
              >
                Back to homepage
              </Link>
              <Link
                href="/terms"
                style={{ fontSize: "0.875rem", color: INK_SOFT, textDecoration: "underline" }}
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: `1px solid ${LINE}`,
          padding: "24px 0",
          background: PAPER_2,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
            width: "100%",
            maxWidth: 1180,
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          <div
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 600,
              fontSize: "1.125rem",
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: INK,
            }}
          >
            <span
              style={{
                width: 28,
                height: 28,
                background: INK,
                borderRadius: 5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M3 8h18M3 12h13M3 16h9" stroke={PAPER} strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>
            <span style={{ color: INK }}>
              bookateacher
              <span
                style={{
                  color: MUTED,
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 400,
                }}
              >
                .in
              </span>
            </span>
          </div>
          <div style={{ display: "flex", gap: 28 }}>
            <Link href="/privacy" style={{ fontSize: "0.875rem", color: INK_SOFT, textDecoration: "none" }}>
              Privacy
            </Link>
            <Link href="/terms" style={{ fontSize: "0.875rem", color: INK_SOFT, textDecoration: "none" }}>
              Terms
            </Link>
            <Link href="/contact" style={{ fontSize: "0.875rem", color: INK_SOFT, textDecoration: "none" }}>
              Contact
            </Link>
          </div>
          <p style={{ fontSize: "0.8125rem", color: MUTED, textAlign: "right", flex: 1 }}>
            © {new Date().getFullYear()} bookateacher.in — Made in India
          </p>
        </div>
      </footer>
    </div>
  );
}
