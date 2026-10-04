"use client";

import { FaShieldAlt } from "react-icons/fa";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
       
        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-8">
        <Link
            href="/"
            className="flex  space-x-2 text-orange-600 hover:text-orange-700 mb-4 transition-colors duration-200"
          >
            <span>← Back to Home</span>
          </Link>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FaShieldAlt className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Privacy Policy
              </h1>
              <p className="text-gray-600">Last updated: October 2026</p>
            </div>
          </div>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-8">
              At Flashfire, we are committed to protecting your privacy and
              ensuring the security of your personal information. This Privacy
              Policy explains how we collect, use, store, and protect your data
              when you use our AI-powered job application automation platform.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Information We Collect
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Personal Information
            </h3>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Name, email address, and phone number</li>
              <li>Educational background and work experience</li>
              <li>Resume content and job preferences</li>
              <li>LinkedIn profile information (when provided)</li>
              <li>Work authorization status</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Usage Data
            </h3>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Job applications submitted through our platform</li>
              <li>Website interactions and navigation patterns</li>
              <li>Device information and IP addresses</li>
              <li>Browser type and operating system</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How We Use Your Information
            </h2>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>To provide personalized job recommendations and matching</li>
              <li>
                To optimize and tailor your resume for specific job applications
              </li>
              <li>To submit job applications on your behalf</li>
              <li>
                To send emails on your behalf to employers, recruiters and
                hiring managers about the jobs we apply to for you, including
                application follow-ups
              </li>
              <li>
                To communicate with you about interview opportunities and
                updates
              </li>
              <li>To improve our platform performance and user experience</li>
              <li>To provide customer support and technical assistance</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Data Security
            </h2>
            <p className="text-gray-700 mb-6">
              We implement industry-standard security measures to protect your
              personal information, including encryption, secure servers, and
              access controls. Your data is stored securely and is only
              accessible to authorized personnel who need it to provide our
              services.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Information Sharing
            </h2>
            <p className="text-gray-700 mb-4">
              We do not sell, trade, or rent your personal information to third
              parties. We may share your information only in the following
              circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>
                With potential employers when submitting job applications (as
                part of our service)
              </li>
              <li>
                With recruiters and hiring managers when we email them on your
                behalf about your applications
              </li>
              <li>
                With service providers who assist us in operating our platform
              </li>
              <li>When required by law or to protect our legal rights</li>
              <li>With your explicit consent</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Cookies and Tracking
            </h2>
            <p className="text-gray-700 mb-6">
              Our website uses cookies and similar technologies to enhance your
              browsing experience, analyze website traffic, and personalize
              content. You can control cookie settings through your browser
              preferences, though some features may not function properly if
              cookies are disabled.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Emails Sent on Your Behalf
            </h2>
            <p className="text-gray-700 mb-6">
              As part of our service, Flashfire sends emails to employers,
              recruiters and hiring managers on your behalf. These emails
              include your name, contact details, resume and relevant parts of
              your profile. We send them only for roles that match the job
              preferences you gave us. You can ask us to stop sending emails on
              your behalf at any time by contacting{" "}
              <strong>support@flashfirejobs.com</strong>.
            </p>

            <h2
              id="google-user-data"
              className="text-2xl font-bold text-gray-900 mb-4"
            >
              Google User Data and Limited Use
            </h2>
            <p className="text-gray-700 mb-4">
              If you choose to connect your Gmail account, Flashfire requests
              only the following two Google permissions:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>
                <strong>gmail.send</strong> — to send job application and
                follow-up emails to employers and recruiters from your own
                Gmail address, only when you have enabled this feature.
              </li>
              <li>
                <strong>gmail.readonly</strong> — to read the messages and
                threads in the connected mailbox so that recruiter and
                employer replies, interview invitations, offers and
                rejections related to your job search can be displayed in your
                Flashfire inbox view and summarized for you and your Flashfire
                account team. Actions in the Flashfire inbox (such as starring
                or archiving) are stored only in Flashfire and do not change
                your Gmail.
              </li>
            </ul>
            <p className="text-gray-700 mb-4">
              Flashfire&apos;s use and transfer to any other app of information
              received from Google APIs will adhere to the{" "}
              <a
                href="https://developers.google.com/terms/api-services-user-data-policy"
                className="text-orange-600 hover:text-orange-700 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google API Services User Data Policy
              </a>
              , including the Limited Use requirements.
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>
                We use Google user data only to provide and improve the
                user-facing email features described above.
              </li>
              <li>
                We do not sell Google user data or use it for advertising.
              </li>
              <li>
                We do not use raw or derived Google user data to develop,
                improve or train generalized artificial intelligence or machine
                learning models.
              </li>
              <li>
                To generate email summaries and categories, the text of
                individual messages is sent to OpenAI through its commercial
                API. OpenAI does not use API data to train its models, and we
                do not permit it. Google user data is not sent to any other
                third-party AI service for training or any other secondary
                purpose.
              </li>
              <li>
                Authorized Flashfire team members who manage your job search
                may view your connected mailbox content and its summaries only
                to provide the service to you. Otherwise, humans do not read
                your Gmail data unless you give us explicit consent, it is
                necessary for security purposes or to comply with law, or the
                data is aggregated and anonymized for internal operations.
              </li>
              <li>
                You can revoke Flashfire&apos;s access at any time in your{" "}
                <a
                  href="https://myaccount.google.com/permissions"
                  className="text-orange-600 hover:text-orange-700 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Account permissions
                </a>{" "}
                or by contacting <strong>support@flashfirejobs.com</strong>.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Data Retention
            </h2>
            <p className="text-gray-700 mb-6">
              We retain your personal information for as long as your account is
              active or as needed to provide our services. We may also retain
              certain information as required by law or for legitimate business
              purposes, such as fraud prevention and safety.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your Rights and Choices
            </h2>
            <p className="text-gray-700 mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Access and review your personal information</li>
              <li>Request corrections to inaccurate data</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Export your data in a portable format</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Children&rsquo;s Privacy
            </h2>
            <p className="text-gray-700 mb-6">
              Our services are not intended for individuals under the age of 18.
              We do not knowingly collect personal information from children
              under 18. If we become aware that we have collected such
              information, we will take steps to delete it promptly.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              International Data Transfers
            </h2>
            <p className="text-gray-700 mb-6">
              Your information may be transferred to and processed in countries
              other than your own. We ensure that such transfers comply with
              applicable data protection laws and that appropriate safeguards
              are in place.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Changes to This Policy
            </h2>
            <p className="text-gray-700 mb-6">
              We may update this Privacy Policy from time to time. We will
              notify you of any material changes by posting the updated policy
              on our website and updating the &quot;Last updated&quot; date.
              Your continued use of our services after such changes constitutes
              acceptance of the updated policy.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy or our data
              practices, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Email:</strong> support@Flashfirejobs.com
              </p>
              <p className="text-gray-700">
                <strong>Website:</strong> www.Flashfirejobs.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}