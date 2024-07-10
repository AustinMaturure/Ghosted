const LoadingSkeleton = () => {
    return (
        <main className="container animate-pulse mx-auto flex flex-col lg:flex-row gap-10 lg:gap-12 sm:px-1 py-12 lg:py-0 lg:px-24 justify-center">
            <div className="grid justify-center lg:py-10">
                <div className="flex flex-col-reverse sm:px-0 max-w-[40rem] lg:flex-col gap-2 xl:flex-row lg:gap-6">
                    <div className="flex justify-center lg:justify-start">
                        <div className="flex gap-2 mt-[-20px] lg:mt-0 xl:flex-col">
                            <div className=" rounded-lg bg-stone-200 w-12 h-12"></div>
                            <div className=" rounded-lg bg-stone-200 w-12 h-12"></div>
                        </div>
                    </div>
                    <div className="sm:px-0 w-[30rem] lg:w-[35rem]">
                        <div className="w-full h-auto bg-stone-200 rounded-xl">
                            <svg
                                className="w-full h-auto text-stone-200 block object-contain"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 18">
                                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lg:border-l-[0.75px] lg:border-r-[0.75px] sm:border-stone-400  flex flex-col gap-6 lg:gap-8">
                <div className="flex justify-between text-xl px-6 font-medium lg:text-2xl">
                    <div className=""></div>
                    <div className=""></div>
                </div>
                <div className="lg:w-[30rem] grid gap-8 lg:gap-10">
                    <div className="w-full px-3 grid gap-2">
                        <div className="h-20 bg-stone-200 rounded-md mb-4"></div>
                        <div>
                            <div>Colors:</div>
                            <div className="h-10 bg-stone-200 rounded-md  max-w-[480px] mb-2.5"></div>
                        </div>
                        <div className="">
                            <div>Size:</div>
                            <div className="h-10 bg-stone-200 rounded-md  mb-2.5"></div>
                        </div>
                        <div className="h-10 bg-stone-200 rounded-md mb-2.5 "></div>
                        <div className="h-10  rounded-md mb-2.5 flex gap-2">
                            <div className="w-1/3 bg-stone-200"></div>
                            <div className="w-1/3 bg-stone-200"></div>
                            <div className="w-1/3  bg-stone-200"></div>
                        </div>
                        <div className="h-20 bg-stone-200 rounded-md"></div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default LoadingSkeleton;
