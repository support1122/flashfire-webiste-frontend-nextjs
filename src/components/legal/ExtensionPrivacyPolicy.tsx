import Link from "next/link";
import type { ReactNode } from "react";

// Privacy policy for the Chrome extension (store name "FlashFire Jobs Auto Fill
// Extension", internal name SpeedyApply). The Chrome Web Store reviews this page
// against what the extension actually does, so every data flow in the extension
// must be listed here: what is collected, how it is used, where it is stored,
// and every party it is shared with. Change this page whenever a flow changes.
//
// Source of truth for the flows: DASH/SpeedyApply (2)/CONTEXT.md section 3 and
// shared/consent.js (the in-extension disclosure says the same thing).

const LAST_UPDATED = "November 12, 2026";

function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="text-2xl font-bold text-gray-900 mt-10 mb-4 scroll-mt-24">
      {children}
    </h2>
  );
}

function P({ children }: { children: ReactNode }) {
  return <p className="text-gray-700 mb-4">{children}</p>;
}

function UL({ children }: { children: ReactNode }) {
  return <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">{children}</ul>;
}

export default function ExtensionPrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
          <Link href="/" className="text-orange-600 hover:text-orange-700 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            Privacy Policy: FlashFire Jobs Auto Fill Extension
          </h1>
          <p className="text-gray-600 mt-1 mb-8">Last updated: {LAST_UPDATED}</p>

          <P>
            This policy covers the FlashFire Jobs Auto Fill Extension for Google Chrome
            (also shown inside the extension as &quot;SpeedyApply&quot;). It explains what
            data the extension collects, how it uses that data, where the data is stored,
            and who it is shared with. It is published by Flashfire (&quot;we&quot;,
            &quot;us&quot;). Our general{" "}
            <Link href="/privacy-policy" className="text-orange-600 underline">
              Privacy Policy
            </Link>{" "}
            covers the rest of the Flashfire service.
          </P>
          <P>
            The extension has one purpose: to fill in job application forms with your own
            details and documents, and to keep a record of the applications you make. It
            only works for people with a Flashfire account, and it asks for your consent
            inside the extension before it collects or handles any data.
          </P>

          <H2 id="limited-use">Chrome Web Store User Data Policy</H2>
          <P>
            The use of information received from the extension complies with the{" "}
            <a
              href="https://developer.chrome.com/docs/webstore/program-policies/"
              className="text-orange-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chrome Web Store User Data Policy
            </a>
            , including the Limited Use requirements. In particular:
          </P>
          <UL>
            <li>We use the data only to provide and improve the extension&apos;s single purpose, filling in your job applications.</li>
            <li>We do not sell your data, and we never use or transfer it for advertising, including personalized, re-targeted or interest-based ads.</li>
            <li>We do not use it to decide credit-worthiness or for lending.</li>
            <li>We transfer it to others only as described in the &quot;Who we share data with&quot; section below, to comply with the law, to protect against fraud or abuse, or as part of a merger or sale of the business.</li>
            <li>People read your data only as described in the &quot;Who can see your data&quot; section below.</li>
          </UL>

          <H2 id="collect">What the extension collects</H2>
          <P>
            <strong>Your application profile.</strong> The details you type into the
            extension, or that are loaded from your Flashfire account when you sign in:
            name, email address, phone number, postal address, date of birth, pronouns,
            LinkedIn, GitHub and portfolio links, current job title and employer, years of
            experience, education and work history, work authorization and visa
            sponsorship needs, salary expectation, notice period and start date, relocation
            and remote-work preferences, and how you heard about a job.
          </P>
          <P>
            <strong>Optional sensitive answers.</strong> If you choose to fill them in:
            gender, race or ethnicity, veteran status and disability status. Employers in
            the United States ask these as voluntary equal-opportunity questions. The
            extension only uses them to answer those questions on your applications. You
            can leave them blank or choose &quot;Decline to answer&quot;.
          </P>
          <P>
            <strong>Your documents.</strong> Your resume file, and any tailored resumes and
            cover letters stored in your Flashfire account.
          </P>
          <P>
            <strong>Answers you save.</strong> Answers you type to application questions,
            so the extension can reuse them when the same question appears again.
          </P>
          <P>
            <strong>Your application history.</strong> When you submit an application, the
            company name, job title, page link, job board and date, so you can track it in
            the extension and on your Flashfire dashboard.
          </P>
          <P>
            <strong>Job application pages you open.</strong> The extension can run on any
            secure web page because employers host application forms on thousands of
            different sites. On a page that is not a job application form it stops
            immediately and reads nothing else. On an application form, it reads the form
            fields, their labels and the job title, company and job description, only to
            fill in that form. It does not record the other sites you visit or your
            browsing history.
          </P>
          <P>
            <strong>Field labels the extension learns.</strong> When you correct a field,
            the extension remembers that a form label (for example &quot;Mobile
            number&quot;) means a profile field (phone number). It stores the label text,
            not your answer.
          </P>
          <P>
            <strong>Sign-in details.</strong> Your Flashfire email address, password and
            access code are sent once to sign you in. The extension keeps the resulting
            session token and your email address. It never stores your password, and it
            never fills in passwords on job sites.
          </P>
          <P>
            <strong>Your own Gemini API key</strong>, only if you choose to add one in
            Settings.
          </P>
          <P>
            The extension does not collect payment or financial information, health
            information beyond the optional disability question above, messages, or your
            location.
          </P>

          <H2 id="use">How the extension uses this data</H2>
          <UL>
            <li>To fill in the fields of the job application form you are looking at, and to attach your resume and cover letter.</li>
            <li>To answer open questions on an application when you press Ask AI, using your profile and the job description.</li>
            <li>To reuse your saved answers and learned field labels on later forms.</li>
            <li>To keep your application history in the extension and on your Flashfire dashboard.</li>
            <li>To restore your profile, documents and history when you sign in on another computer.</li>
            <li>To find and fix forms the extension did not fill correctly.</li>
          </UL>
          <P>
            The extension never presses Submit for you and never solves captchas or other
            human checks. You review every filled form before you send it.
          </P>

          <H2 id="storage">Where data is stored and how it is protected</H2>
          <UL>
            <li>
              <strong>In your browser:</strong> your profile, settings, saved answers,
              application history, learned labels and resume are kept in the
              extension&apos;s local storage on your computer.
            </li>
            <li>
              <strong>In your Flashfire account:</strong> the same data is synced to our
              servers at dashboard-api.flashfirejobs.com so it follows you between
              computers. Account data is kept in our database, and files such as resumes
              and cover letters are kept in our cloud file storage (Cloudflare R2).
            </li>
            <li>All data moves between the extension and our servers over HTTPS (TLS encryption).</li>
            <li>Your Gemini API key, if you add one, is encrypted with AES before it is stored on our servers.</li>
            <li>Every request needs your signed session token, and the server only ever returns your own data. A session ends when your access code changes or the token expires.</li>
            <li>Signing out deletes your profile, documents and history from that browser.</li>
          </UL>

          <H2 id="sharing">Who we share data with</H2>
          <P>We do not sell your data. We share it only with these parties, and only for the reasons listed:</P>
          <UL>
            <li>
              <strong>Employers and their hiring websites.</strong> The details and
              documents the extension fills into an application go to the employer you
              are applying to, the same as if you had typed them yourself. You review the
              form and press Submit.
            </li>
            <li>
              <strong>OpenAI.</strong> When you press Ask AI, the question, the job title,
              company and description, any notes you typed, and a summary of your profile
              and resume are sent from our server to OpenAI&apos;s API to write the
              answer. OpenAI does not use API data to train its models.
            </li>
            <li>
              <strong>Google (Gemini API).</strong> Only if you add your own Gemini API key:
              your resume (to read it into your profile) and the question and answer
              choices on a form, with relevant profile details, are sent to Google&apos;s
              Gemini API under your own key and Google&apos;s terms.
            </li>
            <li>
              <strong>Discord (Flashfire support channel).</strong> When an autofill fails
              or leaves required fields empty, the extension sends a short problem report
              to a private Discord channel used by the Flashfire support team: the page
              link and title, the job board, how many fields were filled, the labels of
              the fields left empty, the extension version and your name. It does not
              include your answers, documents or contact details. Discord stores these
              messages under its own privacy policy.
            </li>
            <li>
              <strong>Other Flashfire users, in anonymous form only.</strong> Learned form
              labels (such as &quot;Mobile number&quot; means phone) are merged into a
              shared list that helps the extension recognize fields for everyone. The
              shared list contains label text and field names only, never your answers or
              who you are. Saved answers are never shared between users.
            </li>
            <li>
              <strong>Service providers that run our servers:</strong> our hosting, database
              and file storage providers (including Render and Cloudflare). They store and process data only on our behalf.
            </li>
            <li>When the law requires it, or to protect the safety and rights of our users and of Flashfire.</li>
          </UL>

          <H2 id="people">Who can see your data</H2>
          <P>
            Flashfire is a managed job search service. The Flashfire team members assigned
            to your account can see your profile, documents and application history in
            order to run your job search, which is the service you signed up for. The
            support team sees the problem reports described above in order to fix
            autofill. Otherwise, no one reads your data unless you ask us to, it is needed
            for security or to comply with the law, or it has been aggregated and
            anonymized.
          </P>

          <H2 id="retention">How long we keep data</H2>
          <P>
            Data in your Flashfire account is kept while your account is active, and is
            deleted when you ask us to delete it, unless the law requires us to keep it
            longer. Data stored in your browser stays
            there until you sign out, use &quot;Clear All Data&quot; in the extension&apos;s
            Settings, or remove the extension.
          </P>

          <H2 id="choices">Your choices and rights</H2>
          <UL>
            <li>You can edit or delete any field of your profile and any saved answer in the extension at any time.</li>
            <li>You can turn off autofill and AI suggestions in Settings.</li>
            <li>You can withdraw your consent in Settings. The extension then stops collecting and handling data until you agree again.</li>
            <li>You can remove the extension from Chrome at any time, which deletes everything it stored in your browser.</li>
            <li>
              You can ask us for a copy of your data, a correction, or deletion of the data
              in your Flashfire account by emailing{" "}
              <a href="mailto:support@flashfirejobs.com" className="text-orange-600 underline">
                support@flashfirejobs.com
              </a>
              .
            </li>
          </UL>

          <H2 id="permissions">Why the extension needs its Chrome permissions</H2>
          <UL>
            <li><strong>Access to websites:</strong> application forms live on thousands of employer and job board sites, so the extension must be able to read and fill a form on whichever site the employer uses.</li>
            <li><strong>storage:</strong> to keep your profile, documents and history on your computer.</li>
            <li><strong>tabs:</strong> to tell open application pages when your profile changes, and to forget the resume and cover letter picked for a tab when you close it.</li>
            <li><strong>alarms:</strong> to sync learned field labels once a day.</li>
          </UL>

          <H2 id="children">Children</H2>
          <P>The extension is not meant for anyone under 18, and we do not knowingly collect data from children.</P>

          <H2 id="changes">Changes to this policy</H2>
          <P>
            If we change how the extension collects, uses or shares data, we will update
            this page and its date, and the extension will ask for your consent again
            before the new use starts.
          </P>

          <H2 id="contact">Contact</H2>
          <P>
            Questions about this policy or your data: email{" "}
            <a href="mailto:support@flashfirejobs.com" className="text-orange-600 underline">
              support@flashfirejobs.com
            </a>
            . Website: www.flashfirejobs.com.
          </P>
        </div>
      </div>
    </div>
  );
}
