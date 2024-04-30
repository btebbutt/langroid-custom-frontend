import * as React from 'react';

// Define a functional component using TypeScript
const Banner: React.FC = () => {
    return (
        <section className="flex overflow-hidden relative flex-col justify-center items-stretch w-full font-bold text-center text-white min-h-[200px]">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/90ef9e1531cfe343e66ab674d6be1a55e88e527744750fc2b64501844643db0a?apiKey=b1f64df9aada44c6ba1728b031344f7b&" className="object-cover absolute inset-0 w-full h-full" alt="Beauty Therapist Working" />
            <div className="relative flex justify-center items-center px-16 py-12 w-full">
                <div className="flex flex-col mt-10 mb-2">
                    <h1 className="text-3xl leading-10">Beauty Therapist Insurance</h1>
                    <h2 className="self-center mt-2 text-lg leading-6">Quote Builder</h2>
                </div>
            </div>
        </section>
    );
}

export default Banner;
