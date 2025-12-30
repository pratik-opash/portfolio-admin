
'use client';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { useGetBlogsQuery, useDeleteBlogMutation } from '@/redux/features/blogs/blogApi';
import Link from 'next/link';
import Image from 'next/image';

const BlogList = () => {
  const { data: blogs, isLoading, error } = useGetBlogsQuery(undefined);
  console.log(blogs , "blogs")
  const [deleteBlog] = useDeleteBlogMutation();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading blogs.</p>;

  return (
    <div className="rounded-[10px] bg-white px-5 pb-2.5 pt-6 shadow-1 dark:bg-gray-dark dark:shadow-card sm:px-7.5 xl:pb-1">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-xl font-bold text-dark dark:text-white">All Blogs</h4>
        <Link 
            href="/blogs/create"
            className="inline-flex items-center justify-center rounded-md bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
            Add Blog
        </Link>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-t-lg bg-[#F7F9FC] px-5 py-4 dark:bg-dark-2 sm:grid-cols-5">
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="font-medium text-dark dark:text-white">Image</p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="font-medium text-dark dark:text-white">Title</p>
          </div>
           <div className="col-span-1 hidden items-center sm:flex">
            <p className="font-medium text-dark dark:text-white">Date</p>
          </div>
          <div className="col-span-1 flex items-center justify-end">
            <p className="font-medium text-dark dark:text-white">Actions</p>
          </div>
        </div>

        {blogs?.map((blog: any, key: number) => (
          <div
            className={`grid grid-cols-3 border-b border-stroke px-5 py-4 dark:border-dark-3 sm:grid-cols-5 ${
              key === blogs.length - 1 ? 'border-b-0' : ''
            }`}
            key={key}
          >
             <div className="col-span-1 hidden items-center sm:flex">
                {blog.imageUrl ? (
                   <Image 
                     src={blog.imageUrl} 
                     alt={blog.title} 
                     width={60} 
                     height={60} 
                     className="rounded-md object-cover"
                   />
                ) : (
                    <div className="w-[60px] h-[60px] bg-gray-200 rounded-md flex items-center justify-center text-xs">No Img</div>
                )}
            </div>
            <div className="col-span-2 flex items-center gap-3">
              <div className="flex flex-col">
                <p className="text-sm font-medium text-dark dark:text-white">
                  {blog.title}
                </p>
              </div>
            </div>
             <div className="col-span-1 hidden items-center sm:flex">
                <p className="text-sm font-medium text-dark dark:text-white">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
            </div>
            <div className="col-span-1 flex items-center justify-end gap-2">
                <Link
                    href={`/blogs/${blog.id}/edit`}
                    className="text-primary hover:text-primary/70"
                >
                    Edit
                </Link>
                <button 
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this blog?')) {
                        deleteBlog(blog.id);
                      }
                    }}
                    className="text-red-500 hover:text-red-700"
                >
                    Delete
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function BlogsPage() {
  return (
    <>
      <Breadcrumb pageName="Blogs" />
      <div className="flex flex-col gap-10">
        <BlogList />
      </div>
    </>
  );
}
