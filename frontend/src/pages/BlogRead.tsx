import {  useSearchParams } from "react-router-dom";
import MediumFooter from "../components/MediumFooter";
import MediumNavbar from "../components/MediumNavbar";
import { useBlog } from "../hooks";
import { BlogSkeleton } from "../skeletons/BlogSkeleton";
import FullBlog from "../components/FullBlog";


export default function BlogRead() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const { loading, blog } = useBlog({
        id: id!
    });

    return (
        <div className=" h-screen flex flex-col items-center ">
            <MediumNavbar hidden={true} />


            {loading ?
                <div className="mt-20 grid gap-8 w-full place-items-center">
                    {[...Array(1)].map((_, idx) => (
                        <div key={idx} className="w-full max-w-xl border-b pb-10 px-4">
                            <BlogSkeleton />
                        </div>
                    ))}
                </div>
                :
                <div className="mt-20 grid gap-8 px-2 md:px-0 max-w-2xl 2xl:max-w-4xl  place-items-center">
                    <FullBlog
                        key={blog!.id}                      //  Always add key when rendering lists
                        heading={blog!.title}
                        content={blog!.content}
                        time={blog!.publishedAt}
                        name={blog!.authorName}
                        image={blog!.imageUrl}
                        postId={blog!.id}
                        authorId={blog!.authorId}
                    />
                </div>
            }


            <MediumFooter />
        </div>
    )
}
