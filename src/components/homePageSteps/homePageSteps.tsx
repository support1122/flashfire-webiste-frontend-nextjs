import Image from "next/image";
import { FileText } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { Rocket } from "lucide-react";
import { PhoneCall } from "lucide-react";

export default function HomePageSteps() {
  const steps = [
    {
      title: "Tell Us Your Goal",
      subtitle: "Takes 60 seconds",
      points: [
        "Share your background, skills, and career interests.",
        "We build a personalized job strategy for US & Canada roles.",
        "Visa-aware: OPT, CPT, STEM OPT, H-1B, sponsorship needs are baked in.",
      ],
      image: "/images/step1.png",
    },
    {
      title: "Your Resume & Profile Get Optimized",
      points: [
        "ATS-optimized resume with keyword-aligned versions.",
        "LinkedIn profile enhancement and skill gap suggestions.",
        "Hybrid model: AI precision + human review so you look hire-ready.",
      ],
      image: "/images/step2.png",
    },
    {
      title: "Flashfire Scans the Market Daily",
      points: [
        "Fresh, high-quality roles that match skills, visa, location, and salary.",
        "Sources: major job boards, company career pages, hidden recruiter roles.",
      ],
      image: "/images/step3.png",
    },
    {
      title: "Smart Apply System Handles Everything",
      points: [
        "Auto-fills forms and writes custom answers.",
        "Tailors your resume for each job with ATS-safe formatting.",
        "Submits applications on your behalf—no more repetitive answers.",
      ],
      image: "/images/step4.png",
    },
    {
      title: "Transparent Application Tracking",
      points: [
        "See jobs applied, status updates, recruiter responses, and predictions.",
        "Success probability for every application so you focus where it matters.",
      ],
      image: "/images/step2.png",
    },

  ];

  return (
    <section className="bg-white py-12 px-6  text-center font-['Space_Grotesk',sans-serif]">

      <div className="mx-auto max-w-6xl px-4 text-center">

        <h2 className="text-3xl md:text-4xl font-bold text-black">
          How Flashfire's AI Job Automation Platform Works in 4 Simple Steps
        </h2>

        <p className="mt-4 max-w-3xl mx-auto text-base md:text-lg text-gray-600">
          Flashfire simplifies job hunting using AI job application automation, handling everything from resume optimization to automated job submissions and tracking.
        </p>
        {/* Connector line – perfectly centered */}
        {/* ================= STEPPER ================= */}
        <div className="mt-20 mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-0 items-start text-center">

            {/* STEP 1 */}
            <div className="relative flex flex-col items-center">
              {/* Circle */}
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#ff4c00] shadow-md">
                <div className="flex h-13 w-13 items-center justify-center rounded-full bg-white text-black text-xl font-semibold">
                  1
                </div>
              </div>

              {/* Line to step 2 */}
              <div className="hidden md:block absolute top-[28px] left-1/2 w-full h-px bg-gray-300" />


              <p className="mt-5 max-w-[200px] text-sm font-medium text-black">
                Share your personal details with us
              </p>
            </div>

            {/* STEP 2 */}
            <div className="relative flex flex-col items-center">
              {/* Circle */}
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#ff4c00] shadow-md">
                <div className="flex h-13 w-13 items-center justify-center rounded-full bg-white text-black text-xl font-semibold">
                  2
                </div>
              </div>

              {/* Line to step 3 */}
              <div className="hidden md:block absolute top-[28px] left-1/2 w-full h-px bg-gray-300" />


              <p className="mt-5 max-w-[240px] text-sm font-medium text-black">
                Team will work upon your resume + LinkedIn opt + cover letter
              </p>
            </div>

            {/* STEP 3 */}
            <div className="relative flex flex-col items-center">
              {/* Circle */}
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#ff4c00] shadow-md">
                <div className="flex h-13 w-13 items-center justify-center rounded-full bg-white text-black text-xl font-semibold">
                  3
                </div>
              </div>


              <div className="hidden md:block absolute top-[28px] left-1/2 w-full h-px bg-gray-300" />


              <p className="mt-5 max-w-[240px] text-sm font-medium text-black">
                Team will submit 30-40 applications per day with optimized resume
              </p>
            </div>

            {/* STEP 4 */}
            <div className="relative flex flex-col items-center">
              {/* Circle */}
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-black shadow-md">
                <div className="flex h-13 w-13 items-center justify-center rounded-full bg-white text-[#ff4c00] text-xl font-semibold">
                  4
                </div>
              </div>

              <p className="mt-5 max-w-[200px] text-sm font-medium text-black">
                You will receive the interview calls and assessments
              </p>
            </div>


          </div>
        </div>
        <div className="mt-16 grid gap-6 mb-20 sm:grid-cols-2 lg:grid-cols-4">

          {/* Card 1: Resume Tailoring */}
          <div className="rounded-xl bg-white px-6 py-8 shadow-md hover:shadow-lg transition-shadow">
            <div className="mb-4 flex justify-center">
              <div className="rounded-lg border border-black bg-white p-3 flex items-center justify-center w-12 h-12">
                <FileText className="h-6 w-6 text-[#ff4c00]" strokeWidth={2} />
              </div>
            </div>
            <h3 className="text-lg font-bold text-black mb-3 text-center">
              Resume Tailoring
            </h3>
            <p className="text-sm leading-relaxed text-gray-700 text-center">
              Your resume is customized for each role with role-specific keywords and formatting recruiters love.
            </p>
          </div>

          {/* Card 2: LinkedIn Optimization */}
          <div className="rounded-xl bg-white px-6 py-8 shadow-md hover:shadow-lg transition-shadow">
            <div className="mb-4 flex justify-center">
              <div className="rounded-lg border border-black bg-white p-3 flex items-center justify-center w-12 h-12">
                <FaLinkedin className="h-6 w-6 text-[#ff4c00]" strokeWidth={2} />
              </div>
            </div>
            <h3 className="text-lg font-bold text-black mb-3 text-center">
              LinkedIn Optimization
            </h3>
            <p className="text-sm leading-relaxed text-gray-700 text-center">
              We rewrite your LinkedIn to stand out in U.S. recruiter searches, using AI-powered keyword matching.
            </p>
          </div>

          {/* Card 3: Smart Job Applications */}
          <div className="rounded-xl bg-white px-6 py-8 shadow-md hover:shadow-lg transition-shadow">
            <div className="mb-4 flex justify-center">
              <div className="rounded-lg border border-black bg-white p-3 flex items-center justify-center w-12 h-12">
                <Rocket className="h-6 w-6 text-[#ff4c00]" strokeWidth={2} />
              </div>
            </div>
            <h3 className="text-lg font-bold text-black mb-3 text-center">
              Smart Job Applications
            </h3>
            <p className="text-sm leading-relaxed text-gray-700 text-center">
              We apply to 1000+ curated jobs that match your goals, location, and visa needs — no spam, just precision.
            </p>
          </div>

          {/* Card 4: Get Interview Calls */}
          <div className="rounded-xl bg-white px-6 py-8 shadow-md hover:shadow-lg transition-shadow">
            <div className="mb-4 flex justify-center">
              <div className="rounded-lg border border-black bg-white p-3 flex items-center justify-center w-12 h-12">
                <PhoneCall className="h-6 w-6 text-[#ff4c00]" strokeWidth={2} />
              </div>
            </div>
            <h3 className="text-lg font-bold text-black mb-3 text-center">
              Get Interview Calls
            </h3>
            <p className="text-sm leading-relaxed text-gray-700 text-center">
              Start receiving interview invites as we track and optimize every application. You focus on prep, we handle the hustle.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
//     <section className="bg-white py-12 px-6 text-center font-['Space_Grotesk',sans-serif]">
//       {/* === Header === */}
//       <div className="w-[90%] mx-auto mb-16">
//         <h2 className="w-[65%] mx-auto mb-4 text-[2.8rem] font-bold text-[#111] leading-[1.3] max-[1024px]:w-[80%] max-[1024px]:text-[2.2rem] max-[768px]:w-full max-[768px]:text-[1.8rem] max-[480px]:text-[1.6rem]">
//           From searching to interviewing,
//           <br />
//           just 4 simple steps.
//         </h2>
//         <p className="w-[60%] mx-auto text-[1.15rem] text-[#444] leading-[1.6] max-[1024px]:w-[75%] max-[1024px]:text-[1rem] max-[768px]:w-[95%] max-[768px]:text-[1rem] max-[480px]:text-[0.9rem]">
//           We turn your endless job hunt into a smooth, automated path to
//           interview
//           <br />
//           calls.{" "}
//           <span className="text-[#ff4c00] font-medium">
//             You set the goal, Flashfire takes care of the journey.
//           </span>
//         </p>
//       </div>

//       {/* === Steps Grid === */}
//       <div className="grid grid-cols-2 gap-6 justify-center items-stretch w-[85%] mx-auto max-[1024px]:w-[90%] max-[768px]:grid-cols-1 max-[768px]:w-[95%]">
//         {steps.map((step, index) => (
//           <div
//             key={index}
//             className="bg-[#faf1ed] border border-[#f1e1d8] rounded-[0.6rem] p-6 flex flex-col justify-between text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_4px_10px_rgba(0,0,0,0.05)]"
//           >
//             <div className="bg-white rounded-[0.3rem] p-5 pb-0">
//               <h3 className="text-[2.6rem] font-bold tracking-[0.08em] mb-2 max-[768px]:text-[2.2rem] bg-gradient-to-r from-[rgba(245,93,29,1)] to-[rgba(0,0,0,1)] text-transparent bg-clip-text">
//                 \\STEP {index + 1}
//               </h3>
//               <h4 className="text-[1.8rem] font-bold text-[#111] mb-3 max-[1024px]:text-[1.5rem] max-[768px]:text-[1.3rem]">
//                 {step.heading}
//               </h4>
//               <p className="text-[1.1rem] text-[#333] leading-[1.6] max-[768px]:text-[0.95rem]">
//                 {step.description}
//               </p>
//             </div>
//             <div className="flex justify-center items-center mt-6">
//               <Image
//                 src={step.image}
//                 alt={step.heading}
//                 width={200}
//                 height={200}
//                 className="max-w-full h-auto object-contain"
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// const steps = [
//   {
//     heading: "You share your goals.",
//     description:
//       "Tell us what you are aiming for, your dream role, location, and experience. We learn your story so we can find the right opportunities for you.",
//     image: "/images/step1.png",
//   },
//   {
//     heading: "We build your winning profile.",
//     description:
//       "We make your resume from scratch and optimize LinkedIn to match top U.S. recruiter searches. Your profile starts showing up where it matters, on the right screens.",
//     image: "/images/step2.png",
//   },
//   {
//     heading: "Flashfire AI applies for you.",
//     description:
//       "We apply to 1000+ curated roles for you, based on your goals and visa needs. No spam, no mass blasts, only smart, targeted applications.",
//     image: "/images/step3.png",
//   },
//   {
//     heading: "You start getting interview calls.",
//     description:
//       "As applications go out, you start getting real calls from real recruiters. We track, follow up, and optimize every step so you can focus on preparing.",
//     image: "/images/step4.png",
//   },
// ];
