import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Privacy Policy | bookateacher.in",
  description:
    "Detailed Privacy Policy for bookateacher.in — what personal data we collect from students and tutors, how we use it to match and book sessions, what we share with payment partners and analytics, your rights under India's Digital Personal Data Protection Act 2023, data retention, security, cookies, and how to contact us.",
};

const PAPER = "#FAF7F0";
const PAPER_2 = "#F2ECE0";
const INK = "#14213D";
const INK_SOFT = "#3D4A63";
const LINE = "#D9D2C5";
const MUTED = "#6B6557";

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
      `bookateacher.in (the \u201cCompany,\u201d \u201cwe,\u201d \u201cour,\u201d or \u201cus\u201d) operates the website and services at bookateacher.in (the \u201cPlatform\u201d), a platform that connects Students seeking English language coaching \u2014 including IELTS, TOEFL, and Spoken English preparation \u2014 with Tutors who provide those services.<p>We are committed to protecting your personal data and handling it responsibly. This Privacy Policy (the \u201cPolicy\u201d) explains in detail:</p><ul><li>what personal data we collect from you,</li><li>how and why we collect it,</li><li>how we use it,</li><li>with whom we share it,</li><li>how long we keep it,</li><li>how we protect it,</li><li>your rights over your data,</li><li>and how you can contact us.</li></ul><p>We write this Policy keeping in mind India\u2019s Digital Personal Data Protection Act, 2023 (the \u201cDPDP Act\u201d), which governs how personal data may be processed in India, and other applicable laws. We aim to comply with the DPDP Act and its rules as they come into force.<p>We are a \u201cData Fiduciary\u201d under the DPDP Act in respect of the personal data we process on the Platform. This Policy describes how we collect, use, store, share, and protect personal data, and the rights you have in respect of your data under the DPDP Act and other applicable law.<p>Consent under the DPDP Act must be free, specific, informed, unconditional, and unambiguous. We do not treat your continued use of the Platform alone as consent to process your personal data. Instead, we obtain consent through clear affirmative action: when you register an account, submit a Lead, or otherwise choose to use a feature that requires us to process your personal data, we ask you to take an affirmative step \u2014 for example, checking an unchecked consent box or clicking \u201cI agree\u201d on a consent notice \u2014 before we process your personal data for that purpose. You may withdraw your consent at any time, as described in Section 8.4 (for general processing) and through the unsubscribe link in any marketing email or your account preferences (for marketing). If you do not consent to a particular use of your data, you should not use the Platform or the feature that requires that processing.<p>This Policy applies to all Users \u2014 Students, Tutors, and any other persons whose personal data we process in connection with the Platform \u2014 whether or not they have registered an account.`,
    ),
    section(
      "2",
      "What Personal Data We Collect",
      `We collect personal data in the following ways:<ul><li><strong>Directly from you.</strong> When you register, create a profile, submit a Lead, book a session, send a message, leave a review, or otherwise provide information to us.</li><li><strong>Automatically, as you use the Platform.</strong> Through cookies, similar technologies, log files, analytics, and other automated means, as described in Section 2.2 and Section 9.</li><li><strong>From payment partners.</strong> When you make a payment, the payment partner shares with us the information needed to confirm the payment and process the booking.</li><li><strong>From you in connection with verification.</strong> When we ask you to provide documents or information to verify your identity, credentials, or other information, as described in Section 7 of our Terms of Service.</li><li><strong>From other Users, where permitted.</strong> When a Lead is matched and both the Student and the Tutor consent to communicate directly, the Tutor may receive the Student\u2019s name, contact details, and Lead information, and vice versa. We disclose such information only after a Lead has been matched and only to the extent necessary for the Student and Tutor to arrange and conduct sessions. We rely on the Student\u2019s consent (given by submitting the Lead with the understanding that it will be shared with a matched Tutor) and the Tutor\u2019s consent (given by accepting or engaging with the match) for this sharing.</li></ul><p>We do not collect personal data about you from sources other than those listed above, except where required by law or where you have given us specific consent. We do not sell, rent, or trade your personal data to third parties for their own marketing or other purposes, as described in Section 5.`,
    ),
    section(
      "3",
      "Categories of Personal Data We Collect",
      `We collect the following categories of personal data, depending on how you use the Platform and whether you are a Student, a Tutor, or both.<p><strong>3.1 Data you give us directly</strong></p><ul><li><strong>Registration data.</strong> When you create an account, we collect your full name, email address, password (stored in hashed form), phone number, and the role you register under (Student or Tutor).</li><li><strong>Profile data (Tutors).</strong> If you register as a Tutor, we collect additional information needed for your public profile and for matching with Students, including: your teaching credentials and qualifications (degrees, certificates, test scores, certifications such as CELTA or IDP certification); teaching experience and years of experience; subjects you teach (e.g., IELTS, TOEFL, Spoken English); your hourly rate or session fee; your availability; a biography or description of your teaching background and style; and any profile photo or image you upload.</li><li><strong>Lead request data (Students).</strong> When you submit a match request (a \u201cLead\u201d), we collect detailed information about your requirements, including: your name and contact details; the subject you need help with (e.g., IELTS, TOEFL, Spoken English); your target score or goal; your current level; your budget or preferred fee range; your preferred days and times for sessions; whether you prefer online or in-person sessions; your location (city/area); and any specific challenges, weak areas, or background you choose to describe (e.g., writing weakness, speaking anxiety, test date).</li><li><strong>Session and booking data.</strong> When a session is booked, we collect and store data about the booking, including the scheduled date and time, session duration, the meeting link or location (if any), the agreed fee, payment status, and any notes or feedback exchanged in the Platform.</li><li><strong>Communication data.</strong> Messages between Users within the Platform, including text messages, session-related notes, and any files or attachments exchanged in the Platform, subject to the Platform\u2019s messaging and content policies.</li><li><strong>Payment data.</strong> When you make a payment, we collect the information necessary to process the payment and complete the booking. We do not store full card numbers, UPI PINs, or other sensitive payment credentials; those are handled by the payment partner in accordance with its own policies and applicable law. We may collect transaction identifiers, payment status, and the amount paid, and we link that information to your account and booking records.</li><li><strong>Review and rating data.</strong> When you leave a review or rating for a Tutor or a session, we collect the review text, star rating, and any associated session or Tutor identifiers needed to display the review.</li><li><strong>Profile images and other media.</strong> If you upload a profile image, avatar, or other media as part of your profile, we collect that image or media and the information you provide with it.</li><li><strong>Other information you provide.</strong> Any other information you choose to provide to us, for example in messages, support requests, or when contacting us.</li></ul><p><strong>3.2 Data we collect automatically</strong></p><ul><li><strong>Usage and analytics data.</strong> Information about how you use the Platform, including pages visited, features used, time spent, click and navigation data, device information (such as browser type, operating system, and device characteristics), referral source, and similar usage data, collected through cookies and similar technologies and through our analytics provider, Google Analytics 4 (GA4), as described in Section 9.</li><li><strong>Log data.</strong> Information that our servers and systems automatically record when you use the Platform, including access times, IP address, and other technical information needed to operate, monitor, and secure the Platform.</li><li><strong>Location data.</strong> If you choose to share your location (for example, to find Tutors near you for in-person sessions), we may collect location information derived from your device or from information you provide. We do not collect location data unless you choose to share it, and we do not track your location outside the Platform.</li></ul><p><strong>3.3 Data from payment partners and other providers</strong></p><ul><li><strong>Payment partner data.</strong> Information from payment partners (such as Razorpay) needed to process and confirm payments, including transaction identifiers and payment status. We do not collect full card numbers, CVV, UPI PINs, or other sensitive payment credentials; those remain with the payment partner.</li><li><strong>Other providers.</strong> Where we use other third-party services (for example, email delivery, hosting, or analytics), we may receive information from those providers that is necessary for them to provide their service to us.</li></ul>`,
    ),
    section(
      "4",
      "How We Use Your Personal Data",
      `We process your personal data for the following purposes. For each purpose, we rely on the legal basis described, in line with the DPDP Act and other applicable law.<p><strong>4.1 To provide and operate the Platform.</strong> We use your data to create and maintain your account, to let you log in, to let you use the features of the Platform (including searching, matching, booking, messaging, and payment), and to keep the Platform running. <em>Legal basis: necessary for the performance of a contract (your use of the Platform) and for legitimate uses in operating the Platform.</em></p><p><strong>4.2 To match Students with Tutors.</strong> We use the information in your Lead (for Students) and your profile (for Tutors) to identify Tutors who may be a good match for a Student\u2019s needs, and to share that information with the matched Parties so they can arrange a session. <em>Legal basis: consent (the Student submits the Lead for this purpose) and legitimate interest in operating the matching service.</em></p><p><strong>4.3 To conduct and manage sessions and bookings.</strong> We use booking details, payment status, availability, and related data to schedule sessions, send reminders, manage cancellations and rescheduling, and maintain records of bookings. <em>Legal basis: necessary for the performance of a contract and for our legitimate interest in managing the Platform\u2019s services.</em></p><p><strong>4.4 To process payments.</strong> We use transaction data and information shared by payment partners to process payments, issue refunds where required, and keep records of financial transactions. <em>Legal basis: necessary for the performance of a contract and for compliance with our legal obligations relating to payment processing.</em></p><p><strong>4.5 To verify Tutors and maintain platform quality.</strong> We use credentials, documents, and verification data to check that Tutors meet the requirements of our Terms of Service and to maintain the quality and safety of the Platform. <em>Legal basis: legitimate interest in maintaining a trustworthy platform, and, where required, consent.</em></p><p><strong>4.6 To communicate with you.</strong> We use your email address and phone number to send you account-related messages, booking confirmations and reminders, updates about your sessions and matches, and (where you consent) promotional or informational communications about the Platform. <em>Legal basis: necessary for the performance of a contract (for transactional messages) and consent (for marketing).</em></p><p><strong>4.7 To improve the Platform and develop new features.</strong> We use usage data and analytics to understand how Users use the Platform, to identify problems, and to develop and improve features and services. <em>Legal basis: legitimate interest in improving our services, and, where we use analytics, consent where required under applicable law.</em></p><p><strong>4.8 For security, fraud prevention, and legal compliance.</strong> We use log data, device data, and other information to monitor and protect the security of the Platform, to prevent fraud and misuse, and to comply with legal obligations. <em>Legal basis: legitimate interest in security and fraud prevention, and legal obligation where applicable.</em></p><p><strong>4.9 For marketing and promotional communications.</strong> With your consent, we may send you promotional messages about the Platform, new features, offers, or other information we think may be of interest. You may withdraw consent for marketing at any time, as described in Section 8.4. <em>Legal basis: consent.</em></p>`,
    ),
    section(
      "5",
      "How We Share Your Personal Data",
      `We do not sell, rent, or trade your personal data to third parties for their own purposes. We may share your personal data with the following categories of recipients, and only to the extent necessary for the purposes described in this Policy:<p><strong>5.1 Other Users (Students and Tutors), where a Lead is matched.</strong> When a Lead is matched, we share the Student\u2019s Lead information and contact details with the matched Tutor, and the Tutor\u2019s profile information and contact details with the Student, so that they can arrange and conduct a session. This sharing is based on the Student\u2019s consent (given by submitting the Lead with the understanding that it will be shared with a matched Tutor) and the Tutor\u2019s consent (given by engaging with the match). Once a match is made and both parties consent to communicate directly, the Student and Tutor may communicate directly and share further information as needed for the session. We are not responsible for information shared directly between Users outside the Platform.</p><p><strong>5.2 Payment partners.</strong> When you make a payment, we share the information necessary for the payment partner to process the payment, such as the transaction amount, description, and your payment method identifier as provided to the payment partner. The payment partner (for example, Razorpay) processes the payment and may collect and store your payment information in accordance with its own privacy policy and applicable law. We do not share full card numbers, UPI PINs, or other sensitive payment credentials with anyone other than the payment partner and as required by law.</p><p><strong>5.3 Analytics providers.</strong> We use Google Analytics 4 (GA4), which collects certain data about your use of the Platform. Google may receive your IP address, device information, and usage data. Google\u2019s use of this data is governed by the Google Analytics terms of service and Google\u2019s privacy policy. See Section 9 for how to opt out of GA4.</p><p><strong>5.4 Infrastructure and service providers.</strong> We use third-party services for hosting, cloud infrastructure, email, and other operational functions. These providers receive only the data necessary for them to provide their service (for example, server logs, email addresses for transactional emails, and other operational data). They are contractually required to process this data only on our instructions and to protect it appropriately. In some cases, these providers may be located outside India, and your data may be transferred outside India in accordance with Section 7.</p><p><strong>5.5 Legal and regulatory authorities.</strong> We may disclose personal data if required by applicable law, regulation, legal process, court order, or government request, or to protect the rights, property, or safety of the Company, its Users, or others, including to respond to claims, disputes, or illegal activity. We will disclose only the minimum necessary information in such cases.</p><p><strong>5.6 With your consent.</strong> We may share your personal data with other third parties only where you have given us clear, specific consent to do so, for example where you consent to a particular feature or service that involves sharing your data with another provider.</p><p><strong>5.7 Aggregate and anonymized data.</strong> We may use and share aggregate or anonymized data \u2014 data that cannot reasonably be used to identify you \u2014 for analytics, reporting, and business purposes. For example, we may share information about the number of sessions booked, average ratings, or subject demand, in a form that does not identify any individual User.</p>`,
    ),
    section(
      "6",
      "International Data Transfers",
      `The Platform is operated from India, and we aim to keep your personal data within India wherever reasonably possible. However, some of the services and providers we use may transfer, store, or process your personal data outside India, including:<ul><li>Google Analytics 4 (GA4), which is provided by Google and may transfer data to servers outside India.</li><li>Payment partners, which may process or store payment data in the country in which their payment systems operate.</li><li>Infrastructure and hosting providers, which may have data centers or processing facilities outside India.</li></ul><p>Where your data is transferred outside India, we will take steps to ensure that the transfer is made to a country or to a recipient that provides a level of protection for personal data that is adequate under the DPDP Act and other applicable law, or that appropriate safeguards (such as contractual terms) are in place.<p>If you are outside India and use the Platform, please note that your data may be transferred to India and processed there, and that the laws of your country and India may differ in how they protect personal data. By using the Platform, you consent to such transfer and processing as described in this Policy.`,
    ),
    section(
      "7",
      "How Long We Keep Your Personal Data",
      `We keep your personal data only as long as necessary for the purposes described in this Policy, and in accordance with the DPDP Act, applicable law, and our legal and business obligations. The following default retention periods apply unless a longer period is required by law or by a legitimate business or legal need:<table><thead><tr><th>Category of data</th><th>Default retention period</th><th>Basis</th></tr></thead><tbody><tr><td>Account and profile data (active accounts)</td><td>For as long as the account remains active</td><td>Necessary to provide the Platform</td></tr><tr><td>Account and profile data (inactive accounts)</td><td>Deleted or anonymized 24 months after the account was last accessed, unless a longer period is required for legal, dispute, or operational reasons</td><td>No longer necessary; limited storage</td></tr><tr><td>Lead and match request data</td><td>Retained for 6 months after the Lead is matched or otherwise resolved, then deleted or anonymized, unless needed for an active dispute, complaint, or legal obligation</td><td>Limited need once the transaction concludes</td></tr><tr><td>Booking and session records (summary)</td><td>Retained for 24 months after the session date for operational and analytics purposes; sensitive personal details may be removed sooner</td><td>Legitimate interest in operational records and analytics</td></tr><tr><td>Payment and transaction records</td><td>Retained for the period required by applicable tax, accounting, and legal obligations (generally 6 to 8 years from the transaction date), in line with Indian law; full payment credentials are not stored by us</td><td>Legal obligation and legitimate interest</td></tr><tr><td>Tutor verification documents</td><td>Retained only while the Tutor profile is active and for 12 months after the profile is removed, then deleted, unless a longer period is required for legal or regulatory reasons</td><td>Limited need once the profile is closed</td></tr><tr><td>Analytics and usage data</td><td>Retained in line with the analytics provider's settings (Google Analytics 4 default retention is 2 months unless configured otherwise) and our own operational needs</td><td>Legitimate interest in improving the Platform</td></tr><tr><td>Marketing consent records</td><td>Retained until consent is withdrawn, plus a reasonable period to demonstrate that consent was obtained, in line with the DPDP Act</td><td>Demonstrating lawful processing</td></tr><tr><td>Grievances and complaints data</td><td>Retained for the period necessary to resolve the grievance and, if needed, for evidence in any subsequent proceedings</td><td>Legal obligation and legitimate interest</td></tr></tbody></table><p>If there is no legal or legitimate business reason to keep your data longer than the periods above, we will delete or anonymize it. Anonymized data is data that cannot reasonably be used to identify you and is not treated as personal data under this Policy.<p>Where you withdraw your consent and that consent was the legal basis for processing your data, we will stop processing your data for that purpose and will delete or anonymize your data within 30 days of the withdrawal, unless we are required by law to retain it for a longer period (for example, tax, legal proceedings, or an unresolved dispute).<p>If you request erasure under Section 8.2, we will delete your personal data within 30 days of receiving and verifying your request, unless we are required by law to retain it for a longer period (for example, tax, legal proceedings, or an unresolved dispute). Where we are required to retain some data, we will restrict its use to that purpose and inform you.<p>Where we have shared your data with another recipient (for example, a matched Tutor or a payment partner), we will ask that recipient to delete or stop processing your data where reasonably possible, but we cannot guarantee deletion by third parties who are independent controllers of their own data.`,
    ),
    section(
      "8",
      "Your Rights Under the Digital Personal Data Protection Act, 2023",
      `India\u2019s Digital Personal Data Protection Act, 2023 (DPDP Act) gives individuals (called \u201cData Principals\u201d under the Act) certain rights over their personal data. Where the DPDP Act applies to your data, you have the following rights, which you can exercise by contacting us using the details in Section 15:<p><strong>8.1 Right to access information.</strong> You have the right to know whether we are processing your personal data, and if so, to request information about the description of the personal data being processed, the purpose of processing, the categories of personal data processed, the entities or categories of entities with whom your data has been shared, and other information about our processing of your data, in the form and manner prescribed under the Act and its rules.</p><p><strong>8.2 Right to correction and erasure.</strong> You have the right to request that we correct inaccurate or incomplete personal data we hold about you, and to request that we erase your personal data, subject to the exceptions in the DPDP Act (for example, where we are required to retain the data by law, or where erasure would interfere with a legal obligation or a legitimate purpose).</p><p><strong>8.3 Right to grievance redressal.</strong> If you have a concern or complaint about how we handle your personal data, you have the right to lodge a grievance with us, and we are required to respond within a reasonable time. If you are not satisfied with our response, you may lodge a complaint with the Data Protection Board of India, which is being established under the DPDP Act. Contact details for lodging a complaint with the Board will be made available when the Board is established and the relevant contact information is published.</p><p><strong>8.4 Right to withdraw consent.</strong> Where we process your personal data based on your consent (for example, for marketing communications, or for certain analytics), you have the right to withdraw your consent at any time. Withdrawing consent does not affect the lawfulness of any processing that took place before you withdrew your consent, and may affect our ability to provide certain services that depend on that processing. To withdraw consent, you can:<ul><li>use the unsubscribe link in any marketing email;</li><li>adjust your communication preferences in your account settings (if the feature is available to you);</li><li>contact us using the details in Section 15;</li><li>or, where you submitted a Lead and wish to withdraw consent for that Lead to be shared with a matched Tutor, contact us using the details in Section 15 and we will use reasonable efforts to stop further sharing, subject to the stage of the matching process and the practical limits of information already shared.</li></ul><p>If you withdraw consent for a processing activity that is necessary for the Platform to function (for example, by withdrawing consent that is required for a Lead to be matched), some features may stop working or your account may be affected. Where processing is necessary for a contract, we will inform you if the feature cannot continue without the processing.</p><p><strong>8.5 Right to nominate.</strong> Under the DPDP Act, a Data Principal may nominate a person to exercise their rights in the event of the Data Principal\u2019s death or incapacity. The process for nomination will be prescribed under the Act and its rules. At present, we do not offer a nomination feature, but we will implement one if and when required by the Act and its rules.</p><p><strong>8.6 Other rights.</strong> Depending on the provisions of the DPDP Act and its rules, and on other applicable law, you may have additional rights regarding your personal data. We will implement these rights as required.</p><p><strong>How to exercise your rights.</strong> To exercise any of the rights above, please contact us using the details in Section 15, describing the right you wish to exercise and providing enough information for us to verify your identity and locate your data. We will respond within a reasonable time and in the manner required by the Act and its rules. You may also exercise your rights through a consent manager, if one is designated under the Act.</p>`,
    ),
    section(
      "9",
      "Cookies and Similar Technologies",
      `The Platform uses cookies and similar technologies (such as web beacons, pixels, local storage, and similar tools) to operate the Platform, improve your experience, and understand how the Platform is used. Here is what we use and why:<p><strong>9.1 Types of cookies we use.</strong><ul><li><strong>Essential cookies.</strong> These are necessary for the Platform to function \u2014 for example, to keep you logged in, to remember your session, and to enable core features like booking and messaging. The Platform cannot operate properly without these cookies, and we do not need your consent to use them.</li><li><strong>Analytics cookies.</strong> We use Google Analytics 4 (GA4) to collect information about how visitors use the Platform, including pages visited, time spent, and events. GA4 uses cookies and similar technologies to collect this data. GA4 does not use cookies to identify you personally in the same way as a login system, but it does collect information that can be used to understand usage patterns. We use GA4 based on the settings we have configured, which may include IP anonymization. For details on GA4\u2019s use of cookies, see Google\u2019s documentation and privacy policy.</li><li><strong>Preference and functional cookies.</strong> These remember your preferences (such as language or other settings) to improve your experience.</li></ul><p><strong>9.2 Third-party cookies.</strong> Some cookies on the Platform may be set by third parties whose services we use, such as Google (for GA4). These third parties may set their own cookies and use their own privacy policies. We do not control these cookies directly, and you should review the relevant third party\u2019s policy for details.</p><p><strong>9.3 How to manage cookies.</strong> You can control cookies through your browser settings. Most browsers allow you to:<ul><li>view what cookies are stored;</li><li>delete specific cookies or all cookies;</li><li>block or allow cookies by site;</li><li>block third-party cookies.</li></ul><p>If you block all cookies, some features of the Platform may not work properly. If you block analytics cookies, we will still collect some usage data through other means (such as server logs), but the detail of that data will be reduced.</p><p><strong>9.4 Opting out of Google Analytics.</strong> You can opt out of Google Analytics tracking by visiting Google\u2019s opt-out page at https://tools.google.com/dlpage/gaoptout, or by using a browser add-on that blocks Google Analytics.<p><strong>9.5 Other similar technologies.</strong> In addition to cookies, we may use other technologies such as local storage and web beacons for similar purposes. The principles above apply to these technologies as well.<p><strong>9.6 Updates to our cookie use.</strong> We may update the cookies and similar technologies we use from time to time. Where we introduce new cookies that require your consent under applicable law, we will ask for your consent before using them.`,
    ),
    section(
      "10",
      "Marketing and Promotional Communications",
      `We may send you promotional or informational messages about the Platform, new features, offers, events, or other matters we think may interest you. These messages are sent only where we have your consent, or where permitted by applicable law.<p><strong>10.1 How we obtain consent.</strong> When you register, we may ask whether you consent to receive marketing communications by email or other means. You can also consent later through your account settings.<p><strong>10.2 Transactional messages.</strong> We will send you messages related to your account, bookings, sessions, payments, and other Platform activity even if you have not consented to marketing, because these are necessary for the operation of the Platform and for our contractual relationship with you. Such messages do not require separate marketing consent.<p><strong>10.3 Withdrawal of consent.</strong> You may withdraw your consent to receive marketing communications at any time, by using the unsubscribe link in any marketing email, by adjusting your preferences in your account settings (if available), or by contacting us using the details in Section 15. Withdrawing consent does not affect your right to receive transactional messages necessary for the Platform\u2019s operation.<p><strong>10.4 Our commitment.</strong> We will not use your contact information for marketing purposes beyond what you have consented to, and we will not share your contact information with third parties for their own marketing purposes.`,
    ),
    section(
      "11",
      "Children and Personal Data of Minors",
      `The Platform is not intended for children under 18 years of age. Under the DPDP Act, a \u201cchild\u201d is a person who has not completed 18 years of age, and the Act imposes additional requirements on processing children\u2019s personal data, including verifiable parental consent and a prohibition on tracking, profiling, or targeted advertising directed at children.<p>We do not knowingly collect or process personal data from children under 18 without verifiable parental consent.<ul><li><strong>Age gate.</strong> When you register or submit a Lead, we ask you to confirm your age. The Platform\u2019s services are intended for Users who are at least 18 years old. If you indicate that you are under 18, you may use the Platform only with the consent of a parent or legal guardian, and we may restrict access until we have obtained that consent.</li><li><strong>Students under 18.</strong> Students under 18 may use the Platform only with the verifiable consent of a parent or legal guardian who agrees to be bound by our Terms of Service and this Policy, and who is responsible for the Student\u2019s use of the Platform. Where a User indicates they are under 18, or where we otherwise become aware that a User is under 18, we will seek verifiable parental consent before processing the User\u2019s personal data for the full range of Platform services. We may use a reasonable mechanism to verify parental consent, which may include, for example, confirmation by an adult through the registered parent or guardian email address, or other methods that are appropriate to the circumstances and in line with the DPDP Act. We will not knowingly track, profile, or target advertising at children under 18.</li><li><strong>Tutors.</strong> Tutors must be at least 18 years old, as described in Section 3 of our Terms of Service. We do not knowingly allow or invite anyone under 18 to register as a Tutor. We will not process the personal data of any person who represents themselves as a Tutor and is under 18 except where required by law and with the consent of a parent or legal guardian.</li><li><strong>Advertising and tracking.</strong> We do not knowingly engage in behavioral tracking, profiling, or targeted advertising directed at children under 18.</li><li><strong>If we learn we have collected a child\u2019s data without consent.</strong> If we learn that we have collected personal data from a child under 18 without the required verifiable parental consent, we will take reasonable steps to delete that data as soon as practicable, and may suspend or restrict the account pending verification.</li></ul><p>If you are a parent or guardian and believe your child has provided us with personal data without your consent, please contact us using the details in Section 15 so we can address the issue.`,
    ),
    section(
      "12",
      "Data Security",
      `We take reasonable technical and organizational measures to protect your personal data against unauthorized access, loss, misuse, alteration, and disclosure. These measures include, as appropriate to the nature of the data and the risks involved:<ul><li><strong>Encryption in transit.</strong> We use HTTPS (TLS) to encrypt data transmitted between your device and our servers when you use the Platform.</li><li><strong>Secure storage.</strong> We store personal data on secure servers and use access controls and other measures to limit who can access it within the Company.</li><li><strong>Password protection.</strong> We do not store your password in plain text. Passwords are hashed and salted using industry-standard methods, and we apply additional safeguards to protect account access.</li><li><strong>Access controls.</strong> Access to personal data within the Company is restricted to personnel and systems that need it to perform their functions, and we maintain records of access and changes where appropriate.</li><li><strong>Infrastructure and service providers.</strong> We use reputable third-party providers for hosting, infrastructure, email, and other services, and we require those providers to implement appropriate security measures.</li><li><strong>Verification processes.</strong> We apply verification processes for Tutors and for other Users where appropriate, to help maintain the safety and integrity of the Platform.</li><li><strong>Incident response.</strong> We have procedures to detect, investigate, and respond to security incidents, and to notify affected Users and relevant authorities where required by law.</li></ul><p>No system can be guaranteed to be completely secure. While we take reasonable steps to protect your personal data, we cannot guarantee that your data will be secure in all circumstances, and you are responsible for maintaining the confidentiality of your account credentials and for notifying us promptly if you believe your account has been compromised.<p>If we become aware of a personal data breach that affects your personal data, we will take reasonable steps to address the breach, and we will notify you and the relevant authorities where required by the DPDP Act and other applicable law.`,
    ),
    section(
      "13",
      "How to Withdraw Consent",
      `You may withdraw your consent at any time, where we process your personal data based on your consent. Withdrawal of consent does not affect the lawfulness of any processing that took place before the withdrawal.<p><strong>How to withdraw consent.</strong><p><ul><li><strong>For marketing communications:</strong> use the unsubscribe link in any marketing email, adjust your communication preferences in your account settings (if the feature is available), or contact us using the details in Section 15.</li><li><strong>For analytics and cookies:</strong> you can disable cookies through your browser settings, opt out of Google Analytics using the tools described in Section 9.4, or block third-party cookies in your browser.</li><li><strong>For sharing of your Lead with a matched Tutor:</strong> contact us using the details in Section 15. We will use reasonable efforts to stop further sharing of your Lead information, but we cannot guarantee the deletion of information that has already been shared with a Tutor who has accepted or engaged with the match, or information that the Student and Tutor have exchanged directly.</li><li><strong>For other consent-based processing:</strong> contact us using the details in Section 15, describing the processing for which you wish to withdraw consent and providing enough information for us to identify your account and the relevant processing.</li></ul><p><strong>Effect of withdrawal.</strong> Where processing is based on your consent and you withdraw that consent, we will stop that processing and, where appropriate, delete or anonymize your data within 30 days, unless we are required by law to retain it. If the processing is necessary for a contract with you (for example, to provide a booked session), withdrawing consent for that processing may affect your ability to use the relevant feature, and we will inform you if the feature cannot continue without the processing.<p><strong>No fee or detriment.</strong> We will not charge you or treat you less favorably for withdrawing consent, except where withdrawal means a feature can no longer be provided to you.`,
    ),
    section(
      "14",
      "Changes to This Privacy Policy",
      `We may update this Policy from time to time to reflect changes in our practices, the Platform, applicable law (including the DPDP Act and its rules), or other business needs. We will notify you of significant changes in one or more of the following ways:<ul><li>By posting the updated Policy on the Platform with a new \u201clast updated\u201d date. The current Policy is always available at https://bookateacher.in/privacy.</li><li>By email to the address associated with your account, for significant changes that affect your rights or the processing of your data.</li><li>By a prominent notice on the Platform.</li></ul><p>Your continued use of the Platform after the updated Policy is posted constitutes your acceptance of the updated Policy. If you do not agree to the updated Policy, you should stop using the Platform and contact us to close your account.<p>If you have questions about any changes, please contact us using the details in Section 15.`,
    ),
    section(
      "15",
      "Contact Us and Grievance Officer",
      `If you have any questions, concerns, or requests about this Privacy Policy, or if you wish to exercise any of the rights described in this Policy (including your rights under the DPDP Act), please contact us using the details below.<p><strong>Company:</strong> bookateacher.in<p><strong>Email:</strong> support@bookateacher.in<p><strong>Postal address:</strong> bookateacher.in, Delhi, India<p><strong>Grievance Officer:</strong> For any concern or complaint about how we collect, use, or share your personal data, or any other matter relating to this Privacy Policy, you may contact our Grievance Officer at the details below. We are required under Section 13 of the DPDP Act to publish these details and to respond to grievances within the timeframes required by the Act and its rules.<table><tbody><tr><td><strong>Name and Title:</strong></td><td>Grievance Officer, bookateacher.in</td></tr><tr><td><strong>Email:</strong></td><td>grievance@bookateacher.in</td></tr><tr><td><strong>Address:</strong></td><td>bookateacher.in, Delhi, India</td></tr></tbody></table><p>We will acknowledge receipt of your grievance within 72 hours of receiving it, and will use reasonable efforts to resolve it within 7 days of receipt for straightforward matters, and in any event no later than 30 days of receipt, in line with the timeframes required by the DPDP Act and its rules. If your grievance relates to a request to exercise a data right (such as access, correction, erasure, or withdrawal of consent), we will respond within the timeframe required by the Act and its rules.<p>If you are not satisfied with our response, or if we do not respond within the required timeframe, you may lodge a complaint with the Data Protection Board of India, once the Board is established and its complaint mechanism is available. Contact details for lodging a complaint with the Board will be made available when published by the Board under the DPDP Act.<p>You may also bring any unresolved data protection complaint to the attention of the appropriate regulatory authority in your country if you are located outside India.<p>We will treat all privacy-related requests and complaints seriously and respond within the timeframes required by the DPDP Act and other applicable law.`,
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
          background: INK,
          color: PAPER,
          padding: "20px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
          borderBottom: `1px solid ${LINE}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            style={{ flexShrink: 0 }}
          >
            <rect width="36" height="36" rx="8" fill={PAPER} />
            <rect x="4" y="13" width="28" height="3" rx="1.5" fill={INK} />
            <rect x="4" y="18" width="22" height="3" rx="1.5" fill={INK_SOFT} opacity="0.7" />
            <rect x="4" y="23" width="26" height="3" rx="1.5" fill={INK_SOFT} opacity="0.5" />
          </svg>
          <span
            style={{
              fontFamily: "Playfair Display, Georgia, serif",
              fontSize: "22px",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: PAPER,
            }}
          >
            bookateacher.in
          </span>
        </div>
        <nav
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/privacy"
            className="nav-link-active"
            style={{
              color: PAPER,
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 450,
              opacity: 0.85,
            }}
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="nav-link-inactive"
            style={{
              color: PAPER,
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 450,
              opacity: 0.7,
            }}
          >
            Terms
          </Link>
        </nav>
      <style
        dangerouslySetInnerHTML={{
          __html: `.nav-link-active:hover { opacity: 1; transition: opacity 0.2s; }
.nav-link-inactive:hover { opacity: 0.95; transition: opacity 0.2s; }`,
        }}
      />
      </header>

      <main
        style={{
          flex: 1,
          maxWidth: 780,
          width: "100%",
          margin: "0 auto",
          padding: "48px 24px 60px",
        }}
      >
        {/* Title block */}
        <div
          style={{
            marginBottom: "48px",
            borderBottom: `1px solid ${LINE}`,
            paddingBottom: "32px",
          }}
        >
          <p
            style={{
              fontSize: "13px",
              color: MUTED,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              margin: 0,
              marginBottom: "12px",
            }}
          >
            Policy
          </p>
          <h1
            style={{
              fontFamily: "Playfair Display, Georgia, serif",
              fontSize: "40px",
              fontWeight: 600,
              lineHeight: 1.2,
              color: INK,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Privacy Policy
          </h1>
          <p
            style={{
              fontSize: "15px",
              color: INK_SOFT,
              lineHeight: 1.6,
              marginTop: "14px",
              maxWidth: 560,
            }}
          >
            How we collect, use, store, share, and protect personal data on the
            Platform, in line with India\u2019s Digital Personal Data Protection
            Act, 2023.
          </p>
          <p
            style={{
              fontSize: "13px",
              color: MUTED,
              marginTop: "16px",
              fontStyle: "italic",
            }}
          >
            Last updated: 20 September 2026
          </p>
        </div>

        {/* Sections */}
        {sections.map((s) => (
          <div
            key={s.n}
            style={{
              marginBottom: "36px",
            }}
          >
            <h2
              style={{
                fontFamily: "Playfair Display, Georgia, serif",
                fontSize: "22px",
                fontWeight: 600,
                color: INK,
                margin: "0 0 12px 0",
                letterSpacing: "-0.01em",
              }}
            >
              {s.n}. {s.title}
            </h2>
            <div
              style={{
                fontSize: "15px",
                lineHeight: 1.75,
                color: INK_SOFT,
              }}
              dangerouslySetInnerHTML={{ __html: s.body }}
            />
          </div>
        ))}

        {/* Footer note */}
        <p
          style={{
            fontSize: "13px",
            color: MUTED,
            fontStyle: "italic",
            borderTop: `1px solid ${LINE}`,
            paddingTop: "24px",
            marginTop: "8px",
          }}
        >
          This Policy is written for general information and does not constitute
          legal advice. If you have questions about how we handle your personal
          data, please contact us using the details in Section 15.
        </p>
      </main>

      {/* Footer */}
      <footer
        style={{
          background: PAPER_2,
          borderTop: `1px solid ${LINE}`,
          padding: "24px 32px",
          fontSize: "13px",
          color: MUTED,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <Link
              href="/privacy"
              style={{
                color: INK_SOFT,
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: 450,
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              style={{
                color: INK_SOFT,
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: 450,
              }}
            >
              Terms of Service
            </Link>
          </div>
          <span style={{ fontSize: "12px", color: MUTED }}>
            bookateacher.in &middot; Delhi, India
          </span>
        </div>
      </footer>
    </div>
  );
}
