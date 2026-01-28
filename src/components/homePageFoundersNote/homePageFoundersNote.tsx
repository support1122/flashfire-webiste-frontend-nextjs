"use client";
import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";


export default function HomePageFoundersNote() {
  const whatsappNumber = "919817349846";
  const defaultMessage = "Hi! I'm interested in a free strategy call with Flashfire.";
  const encodedMessage = encodeURIComponent(defaultMessage);

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <section
      id="founders-note"
      className="relative bg-[#fdf7f4] min-h-screen pl-56  pt-24  font-['Space_Grotesk',sans-serif] overflow-hidden max-[768px]:py-12 max-[768px]:px-4 max-[768px]:pl-4"
    >
      {/* Background Mascot */}
      <div className="absolute bottom-0 right-0 opacity-20 pointer-events-none">
        <Image
          src="/images/character2.png"
          alt="Flashfire mascot"
          width={700}
          height={700}
          className="w-[700px] h-[700px] max-[768px]:w-[350px] max-[768px]:h-[350px]"
          unoptimized
        />
      </div>


      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Text Section */}
        <div className="max-w-[820px] mb-20">
          <h2 className="text-[#ff4c00] font-bold text-3xl leading-tight mb-8 max-[768px]:text-2xl">
            To Every Job Seeker Who&apos;s Ready To Move Forward,
          </h2>

          <div className="space-y-6 text-black font-['Space_Grotesk',sans-serif] font-medium text-lg leading-relaxed max-[768px]:text-base">
            <p>
              I know how exhausting the job search can be. You keep sending out
              applications, waiting for replies, and start to wonder if it&apos;s
              you. Especially in the U.S., where hundreds apply for the same role,
              even the most talented people begin to lose hope.
            </p>

            <p>
              Flashfire was born from that same feeling. I watched my sister—smart,
              capable, and hardworking—apply to hundreds of roles and still get no
              response. It wasn&apos;t her fault. The system had stopped seeing people
              for who they are.
            </p>

            <div className="bg-[#ff4c00]/10 border-l-4 border-[#ff4c00] px-6 py-4 rounded-md font-semibold text-black">
              The Problem Was Never The People. It Was The Process.
            </div>

            <p>
              That&apos;s when <span className="text-[#ff4c00] font-bold">Pranjal</span>{" "}
              joined me. He had been through the same struggle—preparing hard,
              clearing rounds, yet still falling short. Not because he wasn&apos;t good
              enough, but because the process wasn&apos;t fair.
            </p>

            <p>
              Together, we started building Flashfire with belief, empathy, and
              persistence. What began as a way to help one person is now helping
              hundreds find their “yes.”
            </p>
          </div>
        </div>


        <div className="flex items-start gap-6 mb-20 max-[800px]:flex-col max-[800px]:items-start">

          <div className="relative">

            {/* LEFT ORANGE STRIP */}
            <div className="absolute top-[6px] -left-[8px] h-[calc(100%-6px)] w-[8px] 
             bg-[#ff4c00] rounded-tl-lg z-0" />

            {/* BOTTOM ORANGE STRIP */}
            <div className="absolute -bottom-[8px] left-[-8px] w-[calc(100%+8px)] h-[8px] 
             bg-[#ff4c00] rounded-bl-lg rounded-br-md z-0" />


            {/* CARD */}
            <div className="relative bg-white p-[4px] z-10">
              {/* IMAGE WRAPPER */}
              <div className="relative w-[260px] h-[300px]  overflow-visible ">
                <Image
                  src="https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/Adit.jpg"
                  alt="Adit Jain"
                  fill
                  className="object-cover"
                  unoptimized
                />

                {/* TOP-RIGHT BADGE */}
                <div className="absolute -top-6 -right-6 w-16 h-16 flex items-center justify-center z-20">
                  <Image
                    src="/images/character2.png"
                    alt="Flashfire"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>

              </div>
            </div>
          </div>

          {/* TEXT SECTION */}
          <div className="relative bg-[#fdf7f4] min-w-[150px] flex flex-col gap-2">

            <div className="mt-2">
              <p className="font-bold text-xl">Adit</p>
              <p className="text-gray-600 text-sm">Partner, Flashfire</p>
            </div>

            <a
              href="https://www.linkedin.com/in/adit-jain-907555218/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-[#0077b5] transition"
            >
              <FaLinkedin className="text-xl" />
            </a>
          </div>

          {/* CTA */}
          <a
            onClick={handleWhatsAppClick}
            className="text-[#ff4c00] font-semibold text-lg hover:underline mt-[250px] -ml-[170px]"
          >
            LET&apos;S TALK →
          </a>
        </div>

      </div>
    </section>
  );
}
