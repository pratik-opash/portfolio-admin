
'use client';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { useCreateBlogMutation } from '@/redux/features/blogs/blogApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateBlogPage() {
  const [createBlog, { isLoading }] = useCreateBlogMutation();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    details: '',
    readTime: '',
    technologies: '',
  });
  const [image, setImage] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('details', formData.details);
      data.append('readTime', formData.readTime);
      // Handle technologies - assuming comma separated for input, but API might expect multiple fields
      // Based on curl: -F "technologies=React" -F "technologies=Node"
      // Simplest way is loop if user enters comma separated
      const techs = formData.technologies.split(',').map(t => t.trim());
      techs.forEach(t => data.append('technologies', t));

      if (image) {
        data.append('image', image);
      }

      await createBlog(data).unwrap();
      router.push('/blogs');
    } catch (err) {
      console.error('Failed to create blog', err);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Create Blog" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-semibold text-dark dark:text-white">
                Create Blog Form
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter blog title"
                  onChange={handleChange}
                  required
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Description
                </label>
                 <textarea
                  rows={3}
                  name="description"
                  placeholder="Short description"
                  onChange={handleChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></textarea>
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Details
                </label>
                <textarea
                  rows={6}
                  name="details"
                  placeholder="Detailed content"
                  onChange={handleChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></textarea>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                    Read Time
                    </label>
                    <input
                    type="text"
                    name="readTime"
                    placeholder="e.g. 5 min"
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                </div>

                <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                    Technologies (comma separated)
                    </label>
                    <input
                    type="text"
                    name="technologies"
                    placeholder="React, Node.js"
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                </div>
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Blog Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 disabled:opacity-50"
              >
                {isLoading ? "Creating..." : "Create Blog"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
