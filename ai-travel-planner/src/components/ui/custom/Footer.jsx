import React from "react";
import { Link } from "react-router-dom";
import {
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillMail,
  AiFillTwitterCircle,
} from "react-icons/ai";

function Footer({ footerRef }) {
  const socialIcons = [
    {
      name: "GitHub",
      icon: <AiFillGithub />,
      link: "https://github.com/Suryasnata1404",
    },
    {
      name: "LinkedIn",
      icon: <AiFillLinkedin />,
      link: "https://www.linkedin.com/in/suryasnata-mohapatra-850647284/",
    },
    {
      name: "Instagram",
      icon: <AiFillInstagram />,
      link: "https://instagram.com/suryasnata.mohapatra",
    },
    {
      name: "Mail",
      icon: <AiFillMail />,
      link: "mailto:suryasnata2004@gmail.com",
    },
    {
      name: "Twitter",
      icon: <AiFillTwitterCircle />,
      link: "https://twitter.com/suryasnata2004",
    },
  ];

  return (
    <footer
      ref={footerRef}
      className="w-full flex flex-col items-center justify-center
                 bg-gradient-to-t from-[#7ad6f4] to-white text-gray-700 py-6"
    >
      <p className="font-semibold text-lg bg-gradient-to-b from-[#0ba5e9] to-[#0f8fa0] bg-clip-text text-transparent"> GoTravel © 2025 </p>

      <div className="flex items-center justify-center gap-6 mt-3 text-2xl text-[#0f8fa0]">
        {socialIcons.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform duration-300 hover:scale-125 hover:text-[#0da6e8]"
          >
            {item.icon}
          </Link>
        ))}
      </div>

      <p className="text-s mt-4 text-gray-500 text-center max-w-md">
        Crafted with ❤️ and wanderlust ✈️ 
        <br /> Let’s make your next trip a story worth telling!
      </p>
    </footer>
  );
}

export default Footer;
