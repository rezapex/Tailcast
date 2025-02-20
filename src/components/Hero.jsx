import { useState } from "react";
import { motion } from "framer-motion";
import { TranscriptGenerator } from "./TranscriptGenerator";

import { InvitationModal } from "./InvitationModal";
import dashboard from "../assets/images/dashboard.jpg";

export const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      className="w-screen flex justify-center items-center bg-bgDark1 mb-[28vw] md:mb-[18vw] lg:mb-[10vw] xl:mb-[13vw] 2xl:mb-60 hero-bg-gradient pb-24 sm:pb-32 md:pb-44 lg:pb-0"
      id="home"
    >
      <div className="w-full md:w-[800px] xl:w-[900px] flex flex-col justify-center items-center pt-16 md:pt-16 lg:pt-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-indigo-300 text-sm sm:text-base mb-6 sm:mt-32 mt-16 font-bold">
            Because Reading Video Descriptions is So 2023
          </h3>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <div className="text-5xl sm:text-6xl lg:text-7xl xl:text-7xl font-bold tracking-tight text-primaryText px-8 sm:px-8 md:px-20 lg:px-4">
            <h1>3-Hour Video?</h1>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-7xl  xl:text-7xl font-bold tracking-tight text-primaryText px-8 sm:px-20 md:px-24 lg:px-24">
            Ain't Nobody Got Time For That
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-secondaryText text-sm lg:text-base xl:text-lg sm:text-base mt-10 px-12 sm:px-48">
            Turn those endless YouTube rabbit holes into bite-sized wisdom nuggets. Our AI does the watching so you can do the learning. It's like having a really smart friend who watches everything and takes perfect notes.
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="flex flex-col gap-2 sm:flex-row mt-4 mb-4 sm:mb-10 justify-center">
            <button
              className="contained-button w-64 sm:w-52 h-12 mr-0 sm:mr-4 lg:mr-6 mb-2 sm:mb-0 hover:scale-105 transition-transform"
              onClick={() => setIsModalOpen(true)}
              aria-label="Get started"
            >
              Skip the Fluff
            </button>
            <button
              className="w-64 sm:w-52 h-12 rounded-xl font-bold text-primaryText border border-solid flex justify-center items-center cursor-pointer bg-bgDark2 hover:bg-bgDark3 border-primaryColor transition hover:scale-105"
              onClick={() => setIsModalOpen(true)}
              aria-label="Live demo"
            >
              Show Me the Magic
            </button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10, zIndex: 20 }}
          animate={{ opacity: 1, y: 0, zIndex: 20 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        />
        <div className="relative w-screen flex justify-center">
          <div className="shape-divider-bottom-1665343298 mt-4 sm:mt-16 md:mt-52 hidden lg:block">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="bg-bgDark2"
            >
              <path
                d="M1200 0L0 0 598.97 114.72 1200 0z"
                className="shape-fill bg-bgDark1 fill-bgDark1"
              />
            </svg>
          </div>
        </div>
      </div>
      {isModalOpen && <InvitationModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />}
    </section>
  );
};
