import { motion } from "framer-motion";
import { CheckArrowIcon } from "../assets/icons/CheckArrowIcon";
import { TranscriptGenerator } from "./TranscriptGenerator";

const PatternExample = ({ title, content, type }) => (
  <div className="bg-bgDark3 rounded-xl p-6 border-2 border-gray-700 mb-4">
    <h3 className="text-lg font-semibold text-indigo-400 mb-3">{title}</h3>
    {type === "visualization" ? (
      <pre className="text-secondaryText whitespace-pre font-mono bg-bgDark2 p-4 rounded-lg text-sm">
        {content}
      </pre>
    ) : type === "list" ? (
      <ul className="list-decimal list-inside space-y-2 text-secondaryText">
        {content.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    ) : (
      <div className="text-secondaryText">{content}</div>
    )}
  </div>
);

export const Features2 = () => (
  <section className="w-full bg-bgDark2 mt-12 sm:mt-24 mb-12 lg:my-20 lg:mb-24 pt-4">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex flex-wrap items-center 2xl:w-[1450px] xl:w-[1300px] w-11/12 mx-auto md:pl-4 xl:pr-16 xl:pl-16">
        <div className="w-11/12 sm:w-3/4 mx-auto lg:w-1/2 flex flex-wrap lg:-mx-4 sm:pr-8 justify-center order-last lg:order-first">
          <div className="mb-8 lg:mb-0 w-full px-2 lg:pl-16 flex flex-col justify-center md:pl-8">
            <PatternExample
              title="Visualization Pattern"
              type="visualization"
              content={`
    +------------------+
    |     Content      |
    |    Processing    |
    +------------------+
            |
            v
    +------------------+
    |   AI Pattern     |
    |   Application    |
    +------------------+
            |
            v
    +------------------+
    |    Generated     |
    |     Result       |
    +------------------+`}
            />
            <PatternExample
              title="Summary Pattern"
              type="list"
              content={[
                "One-sentence summary captures main concept",
                "Key points extracted and prioritized",
                "Important insights highlighted",
                "Action items identified",
                "Core takeaways emphasized"
              ]}
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 mb-12 lg:mb-0 xl:pl-8">
          <div className="mx-auto lg:mx-auto w-11/12 sm:w-4/5 md:w-3/4 lg:w-unset">
            <span className="block-subtitle">Intelligent Pattern Processing</span>
            <h2 className="mt-6 mb-8 text-4xl lg:text-5xl block-big-title">
              200+ AI Patterns for Every Need
            </h2>
            <p className="mb-12 text-secondaryText leading-loose">
              Our extensive pattern library covers everything from basic analysis to complex visualizations. Each pattern is designed to extract maximum value from your content using state-of-the-art AI models.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-bgDark3 p-6 rounded-xl border-2 border-gray-700">
                <h3 className="text-lg font-semibold text-primaryText mb-4">Analysis Patterns</h3>
                <ul className="space-y-3 text-secondaryText">
                  <li className="flex items-start">
                    <CheckArrowIcon />
                    <span>Content Summarization</span>
                  </li>
                  <li className="flex items-start">
                    <CheckArrowIcon />
                    <span>Insight Extraction</span>
                  </li>
                  <li className="flex items-start">
                    <CheckArrowIcon />
                    <span>Pattern Recognition</span>
                  </li>
                </ul>
              </div>
              <div className="bg-bgDark3 p-6 rounded-xl border-2 border-gray-700">
                <h3 className="text-lg font-semibold text-primaryText mb-4">Visualization Patterns</h3>
                <ul className="space-y-3 text-secondaryText">
                  <li className="flex items-start">
                    <CheckArrowIcon />
                    <span>ASCII Diagrams</span>
                  </li>
                  <li className="flex items-start">
                    <CheckArrowIcon />
                    <span>Mermaid Charts</span>
                  </li>
                  <li className="flex items-start">
                    <CheckArrowIcon />
                    <span>Mind Maps</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-bgDark3 p-6 rounded-xl border-2 border-gray-700">
              <h3 className="text-lg font-semibold text-primaryText mb-4">Supported Content Types</h3>
              <ul className="grid grid-cols-2 gap-3 text-secondaryText">
                <li className="flex items-start">
                  <CheckArrowIcon />
                  <span>YouTube Videos</span>
                </li>
                <li className="flex items-start">
                  <CheckArrowIcon />
                  <span>Text Documents</span>
                </li>
                <li className="flex items-start">
                  <CheckArrowIcon />
                  <span>Code Snippets</span>
                </li>
                <li className="flex items-start">
                  <CheckArrowIcon />
                  <span>Log Files</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="my-12 w-11/12 sm:w-3/4 mx-auto"
    >
      <h2 className="text-3xl lg:text-4xl font-bold text-primaryText text-center mb-8">
        Try It Yourself
      </h2>
      <p className="text-secondaryText text-center mb-12 max-w-3xl mx-auto">
        Paste any YouTube video URL below and see how our patterns transform the content. 
        Select different patterns to see various types of AI-powered analysis in action.
      </p>
      <TranscriptGenerator />
    </motion.div>
  </section>
);
