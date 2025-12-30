
'use client';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { useGetBlogsQuery, useDeleteBlogMutation } from '@/redux/features/blogs/blogApi';
import Link from 'next/link';
import Image from 'next/image';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrashIcon, PencilSquareIcon } from "@/assets/icons";

import { useState } from "react";
import { DeleteConfirmModal } from "@/components/DeleteConfirmModal";
import { FloatingAlert } from "@/components/ui-elements/alert/FloatingAlert";
import { Pagination } from "@/components/Pagination";

const BlogList = () => {
  const [page, setPage] = useState(1);
  const { data: blogsData, isLoading, error } = useGetBlogsQuery({ page, limit: 10 });
  const [deleteBlog] = useDeleteBlogMutation();
  
  const blogs = Array.isArray(blogsData) ? blogsData : blogsData?.data;
  const totalPages = blogsData?.meta?.totalPages || blogsData?.totalPages || 1;

  console.log(blogsData, "blogsData");

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteId) {
      try {
        await deleteBlog(deleteId).unwrap();
        setIsAlertVisible(true);
      } catch (err) {
        console.error("Failed to delete blog:", err);
      } finally {
        setIsModalOpen(false);
        setDeleteId(null);
      }
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading blogs.</p>;

  return (
    <>
      <FloatingAlert
        isVisible={isAlertVisible}
        onClose={() => setIsAlertVisible(false)}
        title="Success"
        description="Blog deleted successfully."
        variant="success"
      />

      <DeleteConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Blog"
        message="Are you sure you want to delete this blog? This action cannot be undone."
      />

      <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
        <div className="mb-6 flex items-center justify-between">
          <h4 className="text-xl font-bold text-dark dark:text-white">
            All Blogs
          </h4>
          <Link
            href="/blogs/create"
            className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-primary px-10 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-3 xl:px-5"
          >
            <span>Add Blog</span>
          </Link>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="border-none bg-[#F7F9FC] dark:bg-dark-2 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-white">
              <TableHead className="min-w-[120px]">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {blogs?.map((blog: any, key: number) => (
              <TableRow
                key={key}
                className="border-[#eee] dark:border-dark-3"
              >
                <TableCell>
                  <div className="h-12.5 w-15 rounded-md">
                    {blog.imageUrl ? (
                      <Image
                        src={blog.imageUrl}
                        width={60}
                        height={50}
                        alt={blog.title}
                        className="h-full w-full rounded-md object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center rounded-md bg-gray-200 text-xs dark:bg-dark-2">
                        No Img
                      </div>
                    )}
                  </div>
                </TableCell>

                <TableCell>
                  <h5 className="font-medium text-dark dark:text-white">
                    {blog.title}
                  </h5>
                </TableCell>

                <TableCell>
                  <p className="text-body-sm font-medium text-dark dark:text-white">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-x-3.5">
                    <Link
                      href={`/blogs/${blog.id}/edit`}
                      className="hover:text-primary"
                    >
                      <span className="sr-only">Edit</span>
                      <PencilSquareIcon />
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(blog.id)}
                      className="hover:text-red-500"
                    >
                      <span className="sr-only">Delete</span>
                      <TrashIcon />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </>
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
