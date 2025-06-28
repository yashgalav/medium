import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import Heading from "./Heading";

export interface blog {
    heading: string,
    content: string,
    time: Date,
    name: string,
    image: string,
    postId: string,
    authorId?: string,
}
export default function BlogPost({ heading, content, time, name, image, postId }: blog) {

    const date = new Date(time);

    const formatted = date.toLocaleDateString('en-US', {
        month: 'short',   // 'Dec'
        day: 'numeric',   // 3
        year: 'numeric'   // 2025
    });

    const title = getFirst15Words(heading);
    const shortContent = getFirst15Words(stripHtml(content));

    const words = content.trim().split(/\s+/);
    const minutes = Math.round(words.length / 100)



    return (

        <Link to={`/blog?id=${postId}`}>
            <div className="cursor-pointer border-b max-w-sm md:max-w-xl lg:max-w-2xl px-2 md:px-0 mx-auto mb-5 pb-5">
                <div className="flex flex-wrap space-x-2 items-center  overflow">
                    <Avatar fullName={name} />
                    <div className="text-gray-600 ">{name.toLocaleUpperCase()}</div>
                    <span className="flex w-1 h-1 me-3  rounded-full bg-gray-400"></span>
                    <div className="text-gray-400 font-light">{formatted}</div>
                </div>
                <div className=" flex  space-x-3 ">
                    <div className=" pb-10 space-y-2">

                        <Heading customClassname=" mb-1 text-xl 2xl:text-3xl font-extrabold"
                            label={title} />
                        <Heading customClassname=" mb-1  2xl:text-2xl text-gray-500 "
                            label={shortContent} />
                        <span className="flex items-center px-2 max-w-fit h-6 text-gray-400 text-xs lg:text-sm rounded-xl bg-slate-100">
                            {minutes} min read
                        </span>
                    </div>
                    <div className="flex justify-center items-center">
                        <img className="h-28 max-w-xs md:h-auto md:max-w-xs" src={image} alt="image description" />
                    </div>

                </div>
            </div>

        </Link>
    )
}


function getFirst15Words(text: string): string {
    const words = text.trim().split(/\s+/);
    if (words.length <= 15) {
        return text;
    }
    return words.slice(0, 15).join(' ') + '...';
}


const stripHtml = (html: string): string => {
    return html.replace(/<[^>]*>?/gm, '').trim();
};