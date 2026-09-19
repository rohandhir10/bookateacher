import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | bookateacher.in",
  description:
    "Complete Terms of Service for bookateacher.in — the IELTS, TOEFL, and Spoken English tutoring platform. Covers eligibility, tutor requirements, session booking, cancellations, refunds, payments, fees, content, disclaimers, liability, termination, governing law, and dispute resolution.",
  openGraph: {
    title: "Terms of Service | bookateacher.in",
    description:
      "Complete Terms of Service for bookateacher.in — eligibility, bookings, cancellations, refunds, payments, fees, disclaimers, liability.",
    type: "website",
    locale: "en_IN",
    siteName: "bookateacher.in",
    url: "https://bookateacher.in/terms",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | bookateacher.in",
    description:
      "Complete Terms of Service for bookateacher.in — eligibility, bookings, cancellations, refunds, payments, fees, disclaimers, liability.",
  },
  alternates: {
    canonical: "https://bookateacher.in/terms",
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

export default function TermsPage() {
  const sections = [
    section(
      "1",
      "Acceptance of Terms",
      `By accessing or using bookateacher.in (the \u201cPlatform\u201d), including any website, mobile application, email communications, or other services provided by bookateacher.in (the \u201cCompany,\u201d \u201cwe,\u201d \u201cour,\u201d or \u201cus\u201d), you agree to be bound by these Terms of Service (the \u201cTerms\u201d) and our Privacy Policy. If you do not agree to these Terms, you may not access or use the Platform. These Terms apply to all visitors, users, students, tutors, and other persons who access or use the Platform, whether or not they have registered an account. We may update these Terms from time to time \u2014 see Section 21. Your continued use of the Platform after any update constitutes acceptance of the updated Terms.`
    ),
    section(
      "2",
      "Definitions",
      `For the purposes of these Terms, the following definitions apply:<strong>Platform:</strong> The website at bookateacher.in and any associated applications, services, or features made available by the Company.<strong>Student:</strong> A user who accesses the Platform to find, evaluate, and book tutors for English language coaching, including IELTS, TOEFL, and Spoken English preparation.<strong>Tutor:</strong> A user who has been approved to list their teaching services on the Platform and who receives booking requests from Students. Tutors must meet the requirements described in Section 7.<strong>Session:</strong> A scheduled, paid, one-on-one coaching session between a Student and a Tutor, conducted in person or online as agreed by the parties.<strong>Lead:</strong> A Student\u2019s match request submitted through the Platform, which the Company uses to identify and connect the Student with a suitable Tutor.<strong>Booking:</strong> A confirmed session between a Student and a Tutor, including the agreed date, time, duration, location or meeting link, and fee.<strong>User Content:</strong> Any content submitted by a User to the Platform, including profile information, descriptions, photos, reviews, messages, and session notes.<strong>Payment Partner:</strong> A third-party payment processor used by the Company or Users to process payments, such as Razorpay or card networks.`
    ),
    section(
      "3",
      "Eligibility",
      `You must be at least 18 years old to create an account as a Tutor. Students under 18 may use the Platform only with the consent of a parent or legal guardian who agrees to be bound by these Terms and who is responsible for the Student\u2019s use of the Platform. You must have a valid email address and a valid phone number to register. You may not create more than one account under the same identity unless expressly permitted by the Company. The Company reserves the right to request additional identification, verification, or documentation from any User before granting access to certain features. If the Company reasonably believes that a User is not who they claim to be, is underage, or is ineligible under these Terms, the Company may suspend or refuse access to the Platform at its discretion.By registering as a Tutor, you confirm that you are legally entitled to provide tutoring services in your jurisdiction, that you have the credentials and experience you disclose, and that you are not subject to any legal or regulatory restriction that would prevent you from providing such services.`
    ),
    section(
      "4",
      "Account Registration and Security",
      `To use certain features of the Platform, you must create an account. You agree to:<strong>Provide accurate, current, and complete information</strong> during registration and keep your profile information up to date. This includes your name, email address, phone number, and (for Tutors) your credentials, qualifications, subjects, hourly rate, availability, and any other information required to operate your Tutor profile.<strong>Keep your account credentials confidential.</strong> You are responsible for all activity under your account, including activity by any person to whom you disclose your password or access.<strong>Notify us immediately</strong> of any unauthorized use of your account or any suspected security breach, by contacting us at support@bookateacher.in.<strong>Not transfer, sell, or share your account</strong> with any other person. Each account is personal to the registrant.<strong>Complete your profile</strong> if you register as a Tutor. An incomplete Tutor profile may not be published or matched with Students until the required information is provided.<strong>We reserve the right</strong> to suspend, restrict, or terminate any account that violates these Terms, that provides inaccurate or misleading information, or that the Company reasonably believes is being used in a way that harms the Platform, other Users, or the Company.`
    ),
    section(
      "5",
      "Student Obligations",
      `As a Student, you agree to:<strong>Use the Platform in good faith</strong> to find and book tutors for genuine educational purposes. The Platform is not intended for harassment, fraud, or any unlawful purpose.<strong>Provide accurate lead information.</strong> When you submit a Lead, the information you provide (including your goal, budget, current level, preferred days and times, location, and challenges) should be accurate and complete, because Tutors rely on this information to decide whether to accept a booking.<strong>Respect Tutors.</strong> You agree to treat Tutors with respect during and after sessions. Harassment, discrimination, abusive language, or threatening behavior toward any Tutor or other User is strictly prohibited and may result in account suspension or termination.<strong>Pay for sessions as agreed.</strong> You are responsible for paying the agreed session fee before or at the time of the session, as agreed with the Tutor or as required by the Platform.<strong>Provide notice for cancellations.</strong> If you need to cancel or reschedule a session, you must provide the notice required under Section 10.<strong>Not attempt to contact Tutors outside the Platform</strong> for the purpose of avoiding Platform fees, evading these Terms, or any other unauthorized purpose. Once a Lead is matched and both parties have consented to communicate directly, direct communication for the purpose of arranging and conducting sessions is permitted.`
    ),
    section(
      "6",
      "General User Conduct",
      `All Users agree not to:<strong>Use the Platform for any unlawful purpose</strong> or in violation of any applicable local, state, national, or international law or regulation.<strong>Infringe the intellectual property rights</strong> of the Company or any third party, including by uploading content you do not have the right to share.<strong>Submit false, misleading, or deceptive information</strong> in registration, profiles, Leads, bookings, reviews, or any other User Content.<strong>Impersonate any person</strong> or represent that you are affiliated with the Company or any Tutor in a way that is false or misleading.<strong>Interfere with or disrupt</strong> the Platform, including by attempting to gain unauthorized access, introducing malware or viruses, or overloading the Platform\u2019s systems.<strong>Harass, abuse, threaten, bully, or discriminate</strong> against any User or third party.<strong>Spam, scrape, or otherwise misuse</strong> the Platform\u2019s data, communications, or features, including by using automated means to access or collect information without the Company\u2019s consent.<strong>Use the Platform to promote</strong> other services, products, or businesses without the Company\u2019s written consent.<strong>Circumvent any feature</strong> of the Platform, including any payment mechanism, matching process, or access control.Violation of these rules may result in immediate suspension or termination of your account, removal of your Tutor profile, and reporting to relevant authorities where appropriate.`
    ),
    section(
      "7",
      "Tutor Registration and Requirements",
      `Tutors represent a significant part of the Platform\u2019s value, and the Company takes Tutor quality seriously. To register and publish a Tutor profile, you must meet the following requirements, which the Company may verify at its discretion:<strong>Minimum experience.</strong> For test preparation subjects (including IELTS and TOEFL), Tutors must have at least 2 years of relevant teaching or coaching experience. For Spoken English coaching, Tutors must have appropriate teaching qualifications or demonstrable experience. The Company may adjust these requirements from time to time.<strong>Valid credentials.</strong> You must provide credentials that the Company can verify, such as degrees, certifications, test scores, or other evidence of your qualifications. You are responsible for the accuracy of the credentials you provide. Falsifying credentials is grounds for immediate removal.<strong>Sample teaching session.</strong> You must complete and pass a sample teaching session with the Company, which the Company uses to assess your teaching ability, communication, and professionalism. The Company may require a new sample session from time to time or in response to complaints.<strong>Identity and background verification.</strong> The Company may verify your identity and conduct background checks as permitted by law. You agree to cooperate with any verification process.<strong>Profile completeness and accuracy.</strong> Your Tutor profile must be complete, accurate, and professional. This includes your bio, subjects, hourly rate, availability, credentials, and any other information displayed to Students. You are responsible for keeping your profile current.If any of these requirements are not met, the Company may refuse to publish your profile, remove your profile, or suspend your Tutor account. Meeting the requirements does not guarantee a particular number of bookings or earnings.`
    ),
    section(
      "8",
      "Tutor Obligations",
      `As a Tutor, in addition to the general conduct rules in Section 6, you agree to:<strong>Deliver sessions professionally.</strong> Conduct each booked session as agreed, at the scheduled time, in the agreed format (online or in person), and at the agreed location or meeting link. Prepare for sessions and provide instruction appropriate to the Student\u2019s needs and level.<strong>Maintain professionalism.</strong> Treat all Students with respect, patience, and professionalism. Do not use abusive, discriminatory, or inappropriate language or behavior.<strong>Honor your availability.</strong> Keep your availability accurate and up to date. If you are unavailable at a previously published time, update your availability before the session is booked, where possible.<strong>Respond to booking requests and messages in a timely manner.</strong> While response times may vary, consistent non-response may result in fewer matches and may affect your Tutor standing.<strong>Not cancel sessions without good reason and adequate notice.</strong> If you must cancel, follow the cancellation policy in Section 10.<strong>Not guarantee a specific test score.</strong> You may discuss likely outcomes and strategies, but you must not promise or guarantee that a Student will achieve any specific IELTS, TOEFL, or other test score. Test results depend on many factors, including the Student\u2019s own effort, preparation, and circumstances.<strong>Keep your credentials current.</strong> If your credentials, qualifications, or relevant status change, update your profile.<strong>Comply with all applicable laws</strong> relating to your tutoring activities, including any requirements for identity verification, child safety, or professional conduct in your jurisdiction.`
    ),
    section(
      "9",
      "Session Scheduling and Conduct",
      `Sessions are scheduled and conducted as follows:<strong>Booking process.</strong> A booking is created when a Student and a Tutor agree on the session date, time, duration, location or meeting link, and fee. Bookings may be arranged through the Platform\u2019s matching process, directly between a matched Student and Tutor, or by other agreed means.<strong>Communication.</strong> Once a Lead is matched and both parties have consented to communicate directly, Student and Tutor may communicate directly to arrange and conduct sessions. The Company does not monitor or record all communications between Users.<strong>Format.</strong> Sessions may be conducted online (via video call, phone, or other agreed means) or in person, as agreed by the parties and as permitted by the Company\u2019s features.<strong>Student preparation.</strong> Students are encouraged to attend sessions prepared, to communicate their goals and challenges honestly, and to complete any practice or assignments suggested by the Tutor.<strong>Tutor preparation.</strong> Tutors are expected to prepare for sessions, arrive or log in on time, and focus on the Student\u2019s agreed goals.<strong>Records.</strong> The Company may retain session records, including booking details, meeting links, and notes, for operational and dispute-resolution purposes, subject to the Privacy Policy.`
    ),
    section(
      "10",
      "Cancellations, Rescheduling, and No-Shows",
      `Because sessions are live and Tutors commit time for each booking, cancellations and no-shows are handled as follows:<strong>Student cancellations.</strong> If a Student cancels a session: <ul><li>More than 24 hours before the session: no charge, and the session is simply cancelled.</li><li>Within 24 hours of the session: the Student may be charged the full session fee, unless the Tutor agrees otherwise. The Company may enforce this charge where payment has been arranged through the Platform.</li></ul><strong>Tutor cancellations.</strong> If a Tutor cancels a session: <ul><li>More than 24 hours before the session: the session is cancelled, and the Tutor should offer the Student the opportunity to reschedule at a mutually convenient time.</li><li>Within 24 hours of the session: the Tutor must notify the Student as soon as possible and offer a full or partial refund of the session fee, as appropriate, and must assist the Student in finding an alternative. Repeated last-minute cancellations may result in the Tutor\u2019s account being reviewed.</li></ul><strong>Rescheduling.</strong> Where both parties agree, a session may be rescheduled to a mutually convenient time. Rescheduling is subject to the availability of both parties and, where applicable, the Platform\u2019s booking features.<strong>No-shows.</strong> If a Student does not attend a scheduled session and does not cancel in advance, the session is considered a no-show, and the Student may be charged the full session fee. If a Tutor does not attend a scheduled session and does not cancel in advance, the Tutor must refund the session fee and may be subject to account review.<strong>Repeated issues.</strong> Repeated cancellations, no-shows, or last-minute changes by either party may result in account suspension, removal of Tutor profiles, or other action as the Company deems appropriate.`
    ),
    section(
      "11",
      "Refunds, Disputes, and Complaints",
      `The Company wants Students and Tutors to be satisfied with their sessions. If something goes wrong, the following process applies:<strong>Refunds.</strong> <ul><li>If a Student is not satisfied with a session, the Student may request a refund. The Tutor (or the Platform, where payment is processed through it) may, at their discretion, provide a full or partial refund. Where the session was cancelled by the Tutor within 24 hours, the Student is entitled to a full refund of the session fee.</li><li>Refund requests should be made within 48 hours of the session, along with a brief explanation of the issue.</li><li>Where payment has been made through a Payment Partner, refund processing times depend on the Payment Partner and the original payment method.</li></ul><strong>Disputes between Students and Tutors.</strong> Where a dispute arises between a Student and a Tutor about a session, the parties are encouraged to resolve it directly and professionally first. If direct resolution is not possible, the Student or Tutor may raise the issue with the Company by emailing support@bookateacher.in. The Company may investigate and take reasonable steps to assist, including facilitating communication, mediating, or adjusting bookings or payments where appropriate. The Company is not a party to the Student\u2013Tutor relationship and cannot guarantee any particular outcome.<strong>Company decisions.</strong> The Company\u2019s decisions regarding refunds, disputes, account actions, and removals are final within the Platform, subject to the governing law and dispute resolution provisions in Sections 18 and 19.<strong>Complaints about the Platform.</strong> For complaints about the Platform itself, including account issues, payment problems, or concerns about these Terms, contact the Company at support@bookateacher.in.`
    ),
    section(
      "12",
      "Payments and Pricing",
      `Session fees and Platform payments are handled as follows:<strong>Session fees.</strong> Session fees are agreed between the Student and the Tutor, or set by the Tutor in their profile. The Company does not set or control individual Tutors\u2019 hourly rates, except as necessary to operate the Platform. Current rates on the Platform typically range from ₹800 to ₹2,500 per hour, but this range may change over time and is not a guarantee of any particular rate.<strong>Payment methods.</strong> The Platform supports payments via UPI, credit and debit cards, and other payment methods offered through the Company\u2019s Payment Partners. The available payment methods may vary depending on the User\u2019s location and the Payment Partner.<strong>When payment is due.</strong> Unless otherwise agreed between the Student and Tutor, session fees are paid before or at the time of the session. The Platform may require payment through its integrated payment features for certain bookings.<strong>Platform fees.</strong> At launch, the Company does not charge a commission on Tutor earnings from sessions booked through the Platform. The Company may introduce a platform fee or commission in the future, in which case it will notify Users and update these Terms accordingly. Any future fees will be clearly disclosed before they apply to a booking.<strong>Tutor payments.</strong> Where the Platform processes a Student\u2019s payment, the Company may pay the Tutor the session fee less any applicable platform fees, according to the payout schedule and method agreed with the Tutor. Tutors are responsible for any taxes or obligations arising from their earnings.<strong>Student payments.</strong> Students are responsible for paying session fees as agreed. Failure to pay may result in cancellation of bookings and restriction of account features.<strong>Refunds via the Platform.</strong> Where a refund is approved under Section 11, the refund will be processed through the same Payment Partner and method used for the original payment, where possible.`
    ),
    section(
      "13",
      "Free Trial and First Session",
      `To help Students decide whether a Tutor is right for them, some Tutors may offer a free or discounted first session. The terms of any free trial or discounted first session are as follows:<strong>At the Tutor\u2019s discretion.</strong> Whether and how a first session is offered free or discounted is determined by the Tutor, not the Company. Tutors may offer a free first session, a discounted first session, or no such offer.<strong>Scope.</strong> A free first session is intended as a brief introductory or diagnostic session to help the Student and Tutor decide whether to work together. It is not a substitute for ongoing coaching.<strong>No obligation.</strong> A free first session does not obligate the Student to book further sessions, and does not obligate the Tutor to accept the Student for ongoing sessions.<strong>Cancellation.</strong> Even where a session is free, cancellation notice is still expected. Repeated last-minute cancellations of free sessions may affect the Student\u2019s ability to book with that Tutor.<strong>Not combinable.</strong> Unless the Tutor agrees otherwise, a free or discounted first session may not be combined with other offers, promotions, or discounts.`
    ),
    section(
      "14",
      "User Content, Profiles, and Intellectual Property",
      `Tutors and other Users may publish content on the Platform, including profile descriptions, bios, photos, credentials, reviews, and messages. The following rules apply:<strong>Ownership.</strong> You retain ownership of your User Content. You do not transfer ownership of your content to the Company by posting it.<strong>License to the Company.</strong> By posting User Content on the Platform, you grant the Company a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, adapt, publish, and display your content on the Platform and in connection with the Platform\u2019s services, including for the purpose of matching Students with Tutors and operating the Platform. This license ends when you remove the content or close your account, subject to the Company\u2019s need to retain content for operational, legal, or dispute-resolution purposes.<strong>Accuracy.</strong> You are responsible for the accuracy of the content you post. You represent that you have the right to post the content and that it does not infringe the rights of any third party.<strong>Prohibited content.</strong> You may not post content that:<ul><li>is false, misleading, or deceptive;</li><li>infringes the intellectual property rights of any person;</li><li>is harmful, threatening, abusive, discriminatory, or harassing;</li><li>violates any person\u2019s privacy or reveals personal information without consent;</li><li>promotes illegal activity or violates these Terms;</li><li>contains spam, malware, or other harmful code.</li></ul><strong>Removal rights.</strong> The Company may remove or hide any User Content that violates these Terms, that is inaccurate or misleading, or that the Company reasonably believes should be removed for legal, safety, or operational reasons. The Company may remove Tutor profiles that are incomplete, inactive, or no longer meet the requirements of Section 7.<strong>Reviews.</strong> Students may leave reviews of Tutors after sessions. Reviews must be honest, based on actual experience, and not abusive, defamatory, or fraudulent. The Company may remove reviews that violate these rules. Reviews are public and may be seen by other Users.`
    ),
    section(
      "15",
      "Testimonials, Results, and Representations",
      `The Platform may display testimonials, success stories, and other descriptions of Student results. These are governed by the following rules:<strong>Representative, not guaranteed.</strong> Any testimonial, score, or result shown on the Platform is based on an actual experience of a past User where one exists, or is a representative example of the kind of outcome the Platform aims to help Students achieve. Testimonials and results are not guarantees that any particular Student will achieve the same or any particular result.<strong>Your own results vary.</strong> Test scores and other outcomes depend on many factors, including the Student\u2019s own effort, preparation, attendance, prior level, test date, and circumstances. The Company and its Tutors do not guarantee any specific score, outcome, university admission, visa approval, or other result.<strong>No misleading claims.</strong> The Company will not knowingly display false, misleading, or exaggerated claims about results. If a testimonial includes a specific score or outcome, it reflects that User\u2019s experience at the time it was provided and may not reflect current conditions or average results.<strong>Student responsibility.</strong> Students are responsible for their own decisions about tutor selection, session attendance, preparation, and use of the Platform. The Company does not control how a Student uses the Platform or the results they achieve.`
    ),
    section(
      "16",
      "Disclaimers and No Guarantee of Results",
      `The Platform and its services are provided on the following basis:<strong>No guarantee of scores.</strong> The Company, its Tutors, and its affiliates do not guarantee that any Student will achieve any particular IELTS band score, TOEFL score, or other test result, or any other educational or career outcome. Any statement about likely outcomes is an opinion, not a promise.<strong>No guarantee of tutor availability or suitability.</strong> The Company does not guarantee that any particular Tutor will be available, that a Tutor will be suitable for a Student\u2019s needs, or that a Student will be satisfied with any Tutor. Matching is based on the information provided and the Company\u2019s reasonable judgment, but the Company cannot evaluate every possible fit.<strong>No guarantee of uninterrupted service.</strong> The Platform is provided \u201cas is\u201d and \u201cas available\u201d. The Company does not guarantee that the Platform will be error-free, uninterrupted, secure, or available at all times. The Company may suspend, modify, or discontinue the Platform or any feature at any time, with or without notice, subject to any legal requirements.<strong>Student responsibility.</strong> Students are responsible for their own decisions, including tutor selection, session attendance, preparation, and payment. The Company is not responsible for a Student\u2019s results, missed opportunities, or any loss arising from the Student\u2019s use of the Platform or any Tutor\u2019s services.<strong>Education, not guarantee.</strong> The Platform provides educational coaching and support. It is not a guarantee of any test score, admission, visa, job, or other outcome. Students should not rely on the Platform as their sole source of preparation or advice.`
    ),
    section(
      "17",
      "Limitation of Liability",
      `To the maximum extent permitted by applicable law:<strong>No indirect damages.</strong> The Company shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of profits, revenue, data, use, goodwill, or other intangible loss, arising out of or related to your use of or inability to use the Platform, any Tutor\u2019s services, or any booking, communication, or payment, whether based on contract, tort, negligence, strict liability, or any other legal theory, even if the Company has been advised of the possibility of such damages.<strong>Limitation on direct damages.</strong> The Company\u2019s total liability to you for any claim arising out of or related to these Terms or the Platform, whether in contract, tort, or otherwise, shall not exceed the amount you have paid to the Company through the Platform in the 12 months before the claim arose, or (if you have not paid the Company anything) ₹5,000.<strong>Student and Tutor responsibilities.</strong> You are responsible for your own decisions regarding tutor selection, session scheduling, attendance, preparation, payment, and all other aspects of your use of the Platform. You are responsible for any loss or damage arising from your decisions, including any loss arising from your choice of Tutor, your attendance or non-attendance at sessions, and your own preparation.<strong>No liability for tutors.</strong> The Company is not a party to the relationship between a Student and a Tutor, and is not liable for any act, omission, statement, or representation by a Tutor, except to the extent caused by the Company\u2019s own negligence or willful misconduct. Tutors are independent providers and are responsible for their own services, conduct, and any claims arising from them.<strong>Exceptions.</strong> Nothing in this section limits liability that cannot be limited under applicable law, including liability for death or personal injury caused by the Company\u2019s negligence, or any other liability that cannot be excluded or limited under Indian law.`
    ),
    section(
      "18",
      "Termination and Suspension",
      `The Company may terminate or suspend your access to the Platform, in whole or in part, at any time, with or without notice, and for any reason or no reason, subject to any applicable legal requirements. This includes:<strong>Account termination.</strong> The Company may terminate your account and remove your Tutor profile if you violate these Terms, if your profile is inactive or incomplete, if you no longer meet the Tutor requirements in Section 7, or if the Company decides to discontinue Tutor services in your area or subject.<strong>Suspension.</strong> The Company may suspend your account temporarily if it is investigating a suspected violation, if there is a security concern, or if the Company needs to restrict access for operational or legal reasons.<strong>Your right to close your account.</strong> You may close your account at any time by contacting the Company or using the account closure feature, where available. Closing your account will stop future bookings and matches, but will not affect any bookings, payments, or obligations that have already arisen.<strong>Effect of termination.</strong> Upon termination or suspension, your right to use the Platform ends. The Company may remove your User Content from public view, but may retain it for legal, operational, or dispute-resolution purposes as described in the Privacy Policy. Provisions of these Terms that by their nature should survive termination \u2014 including disclaimers, limitations of liability, governing law, and dispute resolution \u2014 will survive.`
    ),
    section(
      "19",
      "Dispute Resolution",
      `Any dispute, claim, or controversy arising out of or relating to these Terms, the Platform, or the Services (a \u201cDispute\u201d) will be resolved as follows:<strong>Good-faith negotiation.</strong> The parties should first attempt to resolve the Dispute through good-faith negotiation, contacting the Company at support@bookateacher.in where the Dispute involves the Company.<strong>Informal resolution.</strong> Where negotiation does not resolve the Dispute, the parties should attempt informal resolution, which may include the Company\u2019s internal review process. The Company may require the parties to submit the Dispute in writing and provide relevant details.<strong>Formal proceedings.</strong> If the Dispute is not resolved informally, either party may bring legal proceedings in accordance with the governing law in Section 20. Notwithstanding the above, either party may seek urgent relief from a court of competent jurisdiction, including to protect intellectual property, prevent unauthorized use of account access, or obtain emergency injunctive relief.<strong>Arbitration (optional).</strong> To the extent permitted by Indian law and except for claims that require court or other governmental proceedings, the parties may agree to resolve a Dispute by binding arbitration under the Arbitration and Conciliation Act, 1996, or any successor law, before a sole arbitrator appointed in accordance with that Act. Arbitration is optional and requires the agreement of both parties. If the parties do not agree to arbitrate, the Dispute will be resolved by the courts described in Section 20.`
    ),
    section(
      "20",
      "Governing Law",
      `These Terms and any Dispute arising out of or relating to them shall be governed by and construed in accordance with the laws of India, without regard to its conflict of laws principles. The Parties acknowledge that the Platform is operated from India and that the Company is based in India. Any legal proceedings seeking to enforce or protect rights under these Terms shall be brought exclusively in the courts located in Delhi, India, and the Parties submit to the exclusive jurisdiction of those courts. The Parties further agree that any claim or cause of action arising out of or relating to these Terms or the Platform must be filed within 12 months of the date the claim arose, or be forever barred, to the extent permitted by law.`
    ),
    section(
      "21",
      "Changes to These Terms",
      `The Company may update these Terms from time to time to reflect changes in the Platform, applicable law, or business practices. The Company will notify Users of material changes in one or more of the following ways:<strong>Posting the updated Terms.</strong> The updated Terms will be posted on the Platform with a new \u201clast updated\u201d date. The current Terms are always available at https://bookateacher.in/terms.<strong>Notice.</strong> For significant changes that affect your rights or obligations, the Company will also attempt to notify you by email (using the email address on your account) or by a prominent notice on the Platform.<strong>Continued use.</strong> Your continued use of the Platform after the updated Terms are posted constitutes your acceptance of the updated Terms. If you do not agree to the updated Terms, you should stop using the Platform and close your account.<strong>Changes to payment, fees, or availability.</strong> Changes to pricing, platform fees, payment methods, session policies, or Tutor requirements that affect existing Users will be communicated in advance where reasonably possible.Changes to these Terms will not affect any rights or obligations that have already arisen before the change, except as necessary to give effect to the change.`
    ),
    section(
      "22",
      "Contact",
      `If you have any questions, concerns, or notices regarding these Terms, or if you need to exercise any rights described in these Terms, please contact the Company:<strong>By email:</strong> support@bookateacher.in<strong>By mail:</strong> bookateacher.in, Delhi, India<strong>Response time:</strong> The Company will make reasonable efforts to respond to legitimate inquiries within a reasonable time, typically within a few business days.Where a notice is required under these Terms (for example, a dispute notice or a termination notice), it must be sent to the email address above and will be deemed received when sent, subject to any bounce or delivery failure.`
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
            <span style={{ color: INK, fontWeight: 500 }}>Terms of Service</span>
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
              Terms of Service
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
              By using bookateacher.in, you agree to these Terms of Service and our Privacy Policy.
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
                href="/privacy"
                style={{ fontSize: "0.875rem", color: INK_SOFT, textDecoration: "underline" }}
              >
                Privacy Policy
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
