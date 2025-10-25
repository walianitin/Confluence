// components/TeamSection.tsx

import Image from "next/image";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

const teamMembers = [
  {
    name: "William Foster",
    role: "Co-Founder & CEO",
    img: "/team/william.jpg",
  },
  {
    name: "Emily Jonson",
    role: "CEO",
    img: "/team/emily.jpg",
  },
  {
    name: "Harshita Patel",
    role: "HR",
    img: "/team/harshita.jpg",
  },
  {
    name: "Eleanor Morales",
    role: "HR",
    img: "/team/eleanor.jpg",
  },
  {
    name: "Sophia Monic",
    role: "Product Manager",
    img: "/team/sophia.jpg",
  },
  {
    name: "James Miller",
    role: "Marketing Lead",
    img: "/team/james.jpg",
  },
];

export default function TeamSection() {
  return (
    <section className="bg-[#0F1114] text-gray-200 py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-3">Our Exceptional Team</h2>
        <p className="text-gray-400 mb-12">
          Meet our outstanding team - a synergy of talent, creativity,<br />
          and dedication, crafting success together.
        </p>

        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          {teamMembers.map((member, i) => (
            <div
              key={i}
              className="bg-[#1b1e23] rounded-2xl p-6 hover:bg-[#23272d] transition shadow-lg"
            >
              <div className="flex justify-center">
                <Image
                  src={member.img}
                  width={130}
                  height={130}
                  alt={member.name}
                  className="h-[140px] w-[140px] rounded-full object-cover ring-2 ring-gray-700"
                />
              </div>

              <h3 className="text-xl font-semibold mt-4">{member.name}</h3>
              <p className="text-gray-500 text-sm">{member.role}</p>

              <div className="flex justify-center gap-4 mt-4 text-lg text-gray-400">
                <FaLinkedinIn className="cursor-pointer hover:text-white" />
                <FaInstagram className="cursor-pointer hover:text-white" />
                <FaFacebookF className="cursor-pointer hover:text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
