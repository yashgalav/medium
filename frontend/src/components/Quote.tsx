
export default function Quote() {
  return (
    <div className="bg-offWhite-100 h-screen flex flex-col justify-center">
      <div className="flex justify-center ">
        <div className="max-w-lg md:px-4 2xl:max-w-[75%] ">
          <div className="text-3xl 2xl:text-5xl font-bold">
            "The customer service I received was exceptional. 
            The support team went above and beyond to address my concerns."
          </div>
          <div className="text-xl 2xl:text-4xl font-semibold mt-4 2xl:mt-10">
            Jules Winnfield
          </div>
          <div className="text-left text-sm 2xl:text-3xl font-light text-slate-400 2xl:mt-1">
            CEO | Acme Inc
          </div>
        </div>
      </div>
    </div>
  )
}
