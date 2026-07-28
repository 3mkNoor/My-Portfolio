"use client"
import Lenis from 'lenis'
import { useState, useEffect, useRef } from "react";
import { CloudSun, BracesContent, Sparkles } from 'pixelarticons/react'
import { motion, useAnimate, useAnimationControls } from 'framer-motion';
import Link from 'next/link';
import photo from "../../public/Screenshot (84).png"
import photo1 from "../../public/Screenshot (85).png"
import photo2 from "../../public/Screenshot (86).png"
import photo3 from "../../public/Screenshot (87).png"
import photo4 from "../../public/Screenshot (88).png"
import photo5 from "../../public/Screenshot (89).png"
import Image from 'next/image';


export default function Home() {

  const [opacity, setOpacity] = useState(1);
  const [WindowWidth, setWindowWidth] = useState(0);
  const introRef = useRef(null);

  const getBlocks = () => {
    const blockSize = WindowWidth * .05;
    const containerHeight = introRef.current.offsetHeight;
    const nOfBlocks = Math.ceil(containerHeight / blockSize);
    return [...Array(nOfBlocks).keys()].map((_, i) => {
      return <div key={i} onMouseEnter={(e) => { colorize(e.currentTarget) }}></div>
    })
  }
  const colorize = (el) => {
    el.classList.add("active");

    setTimeout(() => {
      el.classList.remove("active");
    }, 300);
  }

  const [scope, animate] = useAnimate();


  const intro = async () => {
    const path = scope.current.querySelector("path");

    animate(scope.current, {
      y: "-100%"
    }, {
      duration: 1.3,
      ease: [0.76, 0, 0.24, 1]
    });

    animate(path, {
      d: 'M 0 10 V 40 Q 50 7 100 40 V 10 z',
    }, {
      duration: 1,
      // delay:.1,
      ease: [0.6, 0, 0.8, 1]
    });
  }

  useEffect(() => {
    const load = async () => {
      await document.fonts.ready;
      await intro();
    }

    load();

  }, [])

  useEffect(() => {

    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", () => { setWindowWidth(window.innerWidth) })
    return () => window.removeEventListener("resize", () => { setWindowWidth(window.innerWidth) })
  }, [])

  useEffect(() => {
    if (!introRef.current) return;

    const handleScroll = () => {
      if (!introRef.current) return;
      const scrollY = window.scrollY;
      const maxScroll = introRef.current.offsetHeight * .35;
      const newOpacity = Math.max(0, 1 - (scrollY / maxScroll))
      setOpacity(newOpacity);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("load", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("loads", handleScroll)
    }
  }, [])


  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <main>

        <header className="fixed text-lg w-[100%] top-0 z-100000 p-5 text-[12px] uppercase">
          <nav className="flex justify-between ">
            <h1>Noor Eldeen </h1>
            <ul className="flex gap-5">
              <li>
                <Link className='flex' href="mailto:norxxxxnor@gmail.com" target='_blank'>
                  <HoverText text={"contact"} />
                </Link>
              </li>
              <li><Link href="https://www.linkedin.com/in/nooreldin-fathy-483462424/" target='_blank'><HoverText text="LinkedIn" /></Link></li>
            </ul>
          </nav>
        </header>

        <svg
          ref={scope}
          className="fixed inset-0 w-screen h-screen z-[999999999]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            fill="white"
            d="M 0 0 V 100 Q 50 100 100 100 V 0 z"
          />
        </svg>

        <div className="schema">

          {WindowWidth > 0 && [...Array(20).keys()].map((_, i) => {
            return <div key={"b_" + i} className="column">
              {
                getBlocks()
              }
            </div>
          })}

        </div>

        <section
          ref={introRef}
          className="main sticky top-0 h-screen leading-[1.1]  sm:leading-[.5]  md:leading-[1]   mb-[110px] flex flex-col justify-center items-center text-center transition-opacity duration-100 uppercase z-10"
          style={{ opacity, userSelect: "none", }}
        >

          <h1 className="sticky text-[7vw] sm:text-4xl md:text-6xl">
            <span className="italic text-[10vw] sm:text-6xl md:text-8xl">N</span>
            oor—
            <span className="italic text-[10vw] sm:text-6xl md:text-8xl">E</span>
            ldeen
          </h1>
          <h1 className="text-[7vw] sm:text-4xl md:text-6xl">Independent Front End</h1>
          <h1 className="special-t text-[7vw] sm:text-4xl md:text-8xl flex items-center "><CloudSun className="h-8 w-8 sm:h-10 sm:w-10 md:h-14 md:w-14" />Developer <BracesContent className="h-8 w-8 sm:h-10 sm:w-10 md:h-20 md:w-20" /></h1>
          <h1 className="text-[7vw] sm:text-4xl md:text-6xl">having a <span className="italic ">G</span>ood Time</h1>
          <h1 className="text-[7vw] sm:text-4xl md:text-6xl">based in Egypt</h1>
          <h1 className="text-[7vw] sm:text-4xl md:text-6xl flex items-center">folio<span className="special-t">©</span>2026<Sparkles className="h-6 w-6 sm:h-10 sm:w-10 md:h-14 md:w-14" /></h1>
        </section>

        <section className="w-full min-h-[100vh] mt-[110px] p-5 flex flex-col items-center justify-center text-2xl z-10000 ">
          <div className="psudo-card flex text-[12px] py-3 text-[#b1b1b1] uppercase z-10000">
            <p className="md:w-[35%]">name</p>
            <p className="hidden md:block md:w-[45%]">category</p>
            <p className=" hidden md:block md:w-[25%]">client</p>
            <p className="w-[100%] md:w-[10%] flex justify-end">year</p>
          </div>
          <Project name="MAISON store" category="Development, Web design" client="CV" year="2026" description={"A fast and secure online store built for a smooth shopping experience. The project focused on clean design, easy navigation, and reliable performance."} link={"https://noor3.vercel.app/"} photos={[photo, photo1, photo2]} />
          <Project name="dual wave animation" category="Development" client="CV" year="2026" description={"A dynamic brand showcase component built for a portfolio, featuring wave‑animated text with a centrally tracking image that follows the active brand. Focusing on smooth scroll‑based motion, real‑time responsiveness, and creative visual experience."} link={"https://dual-wave-animation.vercel.app/"} photos={[photo3, photo4, photo5]} />

          {[...Array(20).keys()].map((_, i) => (
            <Project key={"n_" + i} name="coming soon..." category="coming soon..." client="CV" year="2026" />
          ))}
        </section>
      </main >

      <footer className='border-t flex justify-end text-[12px] gap-5 p-3 pr-5'>
        <p>Design inspired by <Link href={"https://www.olivierlarose.com/"} target='_blank' className='font-bold'>Olivier Larose</Link></p>
        <p>Copyright 2026 © Noor Eldeen</p>
      </footer>
    </>


  );
}


const containerVariants = {
  hidden: {},
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.01,
    },
  },
  intro: {
    transition: {
      staggerChildren: 0.01,
    },
  },
  hover: {
    transition: {
      staggerChildren: 0.01,
    },
  },
}

const letterVariants = {
  hidden: { y: "100%" },
  intro: {
    y: ["100%", "-100%", "-100%", 0],
    transition: {
      ease: [0.46, 0, 0.2, 1],
      times: [0, 0.5, .5, 1],
      duration: 2
    }
  },
  visible: {
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.46, 0, 0.2, 1],
    }
  },
  hover: {
    y: "-100%",
    transition: {
      duration: .8,
      ease: [0.46, 0, 0.2, 1],
    },
  }
};

function HoverText({ text }) {

  const [introDone, setIntroDone] = useState(false);
  const [animation, setAnimation] = useState("hidden");

  useEffect(() => {
    setAnimation("intro");

    const timer = setTimeout(() => {
      setAnimation("visible");
      setIntroDone(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className='flex'
      variants={containerVariants}
      animate={animation}
      whileHover={introDone ? "hover" : undefined}
      initial="hidden">

      {text.split("").map((letter, i) => (
        <motion.div className='relative inline-block overflow-hidden' variants={containerVariants} key={i}>
          <div >

            <motion.span className='block' variants={letterVariants}>
              {letter}
            </motion.span>


          </div>
          <div>
            <motion.span className='block absolute' variants={letterVariants}>
              {letter}
            </motion.span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )

}



function Project({ name, category, year, client, description, link, photos }) {

  const containerRef = useRef(null);
  const hoverControls = useAnimationControls();
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState(0);


  useEffect(() => {
    if (containerRef.current) {
      setHeight(containerRef.current.scrollHeight)
    }
  }, [description, link])

  const handleClick = () => {
    setOpen(!open);

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 550);
  }


  const cardVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      }
    }
  }

  const itemVariants = {
    hidden: { y: "101%" },
    visible: {
      y: 0,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    }
  }


  const handleEnter = (e) => {
    const fromTop = getEdge(e) === "top";
    hoverControls.set({ y: fromTop ? "-101%" : "101%" })
    hoverControls.start({
      y: 0,
      transition: { duration: 0.25 }
    })
  };
  const handleLeave = (e) => {
    const fromTop = getEdge(e) === "top";
    hoverControls.start({
      y: fromTop ? "-101%" : "101%",
      transition: { duration: 0.25 }
    })
  };

  function getEdge(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    return y < rect.height / 2 ? "top" : "bottom";

  }

  return (
    <div className='w-full z-1000'>
      <motion.div
        className="h-[1px] w-full bg-white origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1, transition: { duration: .9 } }}
        viewport={{ once: true, amount: 0.3, }}
      />
      <div className='relative overflow-y-hidden'
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      // onTouchStart={handleEnter}
      // onTouchEnd={handleLeave}
      >

        <motion.span
          animate={hoverControls}
          initial={{ y: "101%" }}
          className='absolute inset-0 bg-white z-10'

        />


        <motion.div className='card flex justify-between items-center py-2 cursor-pointer mix-blend-difference text-white text-[15px] z-20  relative'
          onClick={handleClick}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: .3 }}
        >

          <div className="overflow-hidden md:w-[35%] group-hover:pl-[15px] transition-all duration-300">
            <motion.p variants={itemVariants}>{name}</motion.p>
          </div>

          <div className="overflow-hidden hidden md:block md:w-[45%]">
            <motion.p variants={itemVariants}>{category}</motion.p>
          </div>

          <div className="overflow-hidden hidden md:block md:w-[25%]">
            <motion.p variants={itemVariants}>{client}</motion.p>
          </div>

          <div className="overflow-hidden w-[45%] md:w-[10%] flex justify-end group-hover:pr-[15px] transition-all duration-300">
            <motion.p variants={itemVariants}>{year}</motion.p>
          </div>

        </motion.div>
      </div >

      <div ref={containerRef} className={`overflow-y-hidden flex flex-col gap-5`}
        style={{
          maxHeight: open ? `${height}px` : "0px",
          transition: "max-height 0.5s cubic-bezier(0.76, 0, 0.24, 1)",
        }}>
        <div className='mb-10'>
          <h1 className='text-xl sm:text-2xl md:text-[32px] w-full md:w-[70%] mt-8 mb-2' >{description}</h1>
          {link &&
            <div className='mb-4 '>
              <Link href={link} target='_blank' className='bg-white text-black px-4 py-2 rounded-3xl text-sm md:text-[14px] hover:bg-gray-200 transition-colors'>see website</Link>
            </div>
          }
          {photos && <div className='flex flex-col lg:flex-row lg:flex-wrap gap-4'>
            {photos.map((photo, index) => (
              <Image
                key={index}
                src={photo}
                alt={`Project screenshot ${index + 1}`}
                width={400}
                height={300}
                className='w-full flex-1 lg:w-[calc(33.333%-0.75rem)] object-cover'
              />
            ))}
          </div>}
        </div>
      </div>
    </div >
  )
}
