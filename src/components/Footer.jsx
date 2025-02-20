import { TailcastLogo } from "../assets/logos/TailcastLogo";
import { GithubIcon } from "../assets/icons/GithubIcon";

const footerData = [
  {
    title: "API Reference",
    items: [
      { name: "Chat API", href: "https://fabric-api-production.up.railway.app/chat" },
      { name: "YouTube Processing", href: "https://fabric-api-production.up.railway.app/api/youtube" },
      { name: "Pattern Management", href: "https://fabric-api-production.up.railway.app/patterns/names" },
      { name: "Model Selection", href: "https://fabric-api-production.up.railway.app/models/names" },
      { name: "Health Status", href: "https://fabric-api-production.up.railway.app/health" },
    ],
  },
  {
    title: "Resources",
    items: [
      { name: "API Documentation", href: "https://fabric-api-production.up.railway.app/docs" },
      { name: "Pattern Library", href: "https://fabric-api-production.up.railway.app/patterns/names" },
      { name: "Model Directory", href: "https://fabric-api-production.up.railway.app/models/names" },
      { name: "Integration Guide", href: "https://fabric-api-production.up.railway.app/docs#integration" },
      { name: "Example Projects", href: "https://fabric-api-production.up.railway.app/docs#examples" },
    ],
  },
  {
    title: "Developer Tools",
    items: [
      { name: "API Console", href: "https://fabric-api-production.up.railway.app/console" },
      { name: "Pattern Testing", href: "https://fabric-api-production.up.railway.app/patterns/test" },
      { name: "Response Validation", href: "https://fabric-api-production.up.railway.app/docs#validation" },
      { name: "Request Examples", href: "https://fabric-api-production.up.railway.app/docs#examples" },
    ],
  },
];

export const Footer = () => {
  return (
    <footer aria-label="Site footer">
      <div className="pt-10  lg:pt-20 lg:pb-16 bg-bgDark1 radius-for-skewed ">
        <div className="container mx-auto px-4 w-4/5 md:w-11/12 lg:w-10/12 xl:w-4/5 2xl:w-2/3">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/3 mb-16 lg:mb-0">
              <div className="flex justify-center lg:justify-start items-center grow basis-0">
                <div className="text-white mr-2 text-6xl">
                  <TailcastLogo />
                </div>
                <div className="text-white font-['Inter'] font-bold text-xl">
                  Fabric
                </div>
              </div>
              <p className="mb-10 mt-4 sm:w-[22rem] lg:w-[20rem] xl:w-[24rem] text-gray-400 leading-loose text-center lg:text-left mx-auto lg:mx-0">
                Transform your content with our powerful AI patterns. Process any content through 
                200+ patterns using leading AI models like GPT-4, Gemini, and Claude.
              </p>
              <div className="w-36 mx-auto lg:mx-0">
                <a
                  className="inline-block outlined-button px-6 py-3 flex items-center gap-2"
                  href="https://fabric-api-production.up.railway.app/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubIcon />
                  <span>Docs</span>
                </a>
              </div>
            </div>
            <div className="w-full lg:w-2/3  lg:pl-16 hidden lg:flex flex-wrap justify-between">
              <div className="w-full md:w-1/3 lg:w-auto mb-16 md:mb-0">
                <h3 className="mb-6 text-2xl font-bold text-primaryText">API Reference</h3>
                <ul>
                  {footerData[0].items.map((item, index) => (
                    <li key={`${item.name}-${index}`} className="mb-4">
                      <a
                        className="text-gray-400 hover:text-gray-300"
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.name}
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full md:w-1/3 lg:w-auto mb-16 md:mb-0">
                <h3 className="mb-6 text-2xl font-bold text-primaryText">
                  Resources
                </h3>
                <ul>
                  {footerData[1].items.map((item, index) => (
                    <li key={`${item.name}-${index}`} className="mb-4">
                      <a
                        className="text-gray-400 hover:text-gray-300"
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.name}
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full md:w-1/3 lg:w-auto">
                <h3 className="mb-6 text-2xl font-bold text-primaryText">Developer Tools</h3>
                <ul>
                  {footerData[2].items.map((item, index) => (
                    <li key={`${item.name}-${index}`} className="mb-4">
                      <a
                        className="text-gray-400 hover:text-gray-300"
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.name}
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
