import BlogCard from "../components/BlogCard"
import MediumFooter from "../components/MediumFooter"
import MediumNavbar from "../components/MediumNavbar"
import { useBlogs } from "../hooks";
import { HorizontalBlogCardSkeleton } from "../skeletons/BlogSkeleton"


function Blogs() {

  const { loading, blogs } = useBlogs();

  
  return (
    <div className=" h-screen flex flex-col items-center ">
      <MediumNavbar hidden={true}  />

      {loading ?
        <div className="mt-20 grid gap-8 w-full place-items-center">
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="w-full max-w-xl border-b pb-10 px-4">
              <HorizontalBlogCardSkeleton />
            </div>
          ))}
        </div>
        :

        <div className="mt-20 grid gap-5 ">
          {blogs.map(b => (
            <BlogCard
              key={b.id}                      //  Always add key when rendering lists
              heading={b.title}
              content={b.content}
              time={b.publishedAt}
              name={b.authorName}
              image={b.imageUrl}
              postId={b.id}
            />
          ))}
        </div>
      }

      <MediumFooter />
    </div>
  )
}

export default Blogs