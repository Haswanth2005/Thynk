import { Link } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";

const LandingPage = () => {
    return (
        <AnimationWrapper>
            <div className="w-full">


                {/* Content Preview / Quote Section */}
                <section className="py-24 bg-grey/10 w-full flex justify-center border-b border-grey">
                    <div className="w-full md:w-3/4 lg:w-1/2 px-5 text-center">
                        <i className="fi fi-rr-quote-right text-4xl text-dark-grey mb-6 block"></i>
                        <p className="text-3xl md:text-5xl font-gelasio font-medium leading-tight mb-8 text-black">
                            "The clearer you are about what you want to create, the easier it is to find the people who need it."
                        </p>
                        <p className="text-xl text-dark-grey font-gelasio">— A Thynk Creator</p>
                    </div>
                </section>

                {/* Footer CTA */}
                <section className="py-32 flex flex-col justify-center items-center text-center px-5">
                    <h2 className="text-5xl md:text-7xl font-bold font-gelasio mb-10 tracking-tight">
                        Expand your reading.
                    </h2>
                    <Link to="/signup" className="btn-dark text-xl py-4 px-16 rounded-full">
                        Get Started
                    </Link>
                </section>

                {/* Features / Why Thynk Section */}
                <section className="py-20 px-5 md:px-10 lg:px-20 grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-grey">
                    <div className="flex flex-col items-center text-center">
                        <h2 className="text-3xl font-bold mb-4 font-gelasio">Independent Voices</h2>
                        <p className="text-dark-grey text-lg leading-7">
                            Read content from independent writers who share their unique perspectives and expertise without the noise of mainstream media aggregation.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <h2 className="text-3xl font-bold mb-4 font-gelasio">Reader Supported</h2>
                        <p className="text-dark-grey text-lg leading-7">
                            Support the writers you love directly. No ads, no distractions. Just pure connections between readers and writers.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <h2 className="text-3xl font-bold mb-4 font-gelasio">Curated Topics</h2>
                        <p className="text-dark-grey text-lg leading-7">
                            Deep dive into topics that matter to you. From technology to travel, find communities that share your interests.
                        </p>
                    </div>
                </section>
            </div>
        </AnimationWrapper>
    )
}

export default LandingPage;
