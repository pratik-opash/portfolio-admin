
'use client';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { useGetProjectsQuery, useDeleteProjectMutation } from '@/redux/features/projects/projectApi';
import Link from 'next/link';
import Image from 'next/image';

const ProjectList = () => {
  const { data: projects, isLoading, error } = useGetProjectsQuery(undefined);
  const [deleteProject] = useDeleteProjectMutation();
  console.log(projects , "projects")
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading projects.</p>;

  return (
    <div className="rounded-[10px] bg-white px-5 pb-2.5 pt-6 shadow-1 dark:bg-gray-dark dark:shadow-card sm:px-7.5 xl:pb-1">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-xl font-bold text-dark dark:text-white">All Projects</h4>
        <Link 
            href="/projects/create"
            className="inline-flex items-center justify-center rounded-md bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
            Add Project
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
            <p className="font-medium text-dark dark:text-white">Live URL</p>
          </div>
          <div className="col-span-1 flex items-center justify-end">
            <p className="font-medium text-dark dark:text-white">Actions</p>
          </div>
        </div>

        {projects?.map((project: any, key: number) => (
          <div
            className={`grid grid-cols-3 border-b border-stroke px-5 py-4 dark:border-dark-3 sm:grid-cols-5 ${
              key === projects.length - 1 ? 'border-b-0' : ''
            }`}
            key={key}
          >
            <div className="col-span-1 hidden items-center sm:flex">
                {project.imageUrl ? (
                   <Image 
                     src={project.imageUrl} 
                     alt={project.title} 
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
                  {project.title}
                </p>
              </div>
            </div>
             <div className="col-span-1 hidden items-center sm:flex">
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-sm font-medium text-primary dark:text-white hover:underline">
                  Visit
                </a>
            </div>
            <div className="col-span-1 flex items-center justify-end gap-2">
                <Link
                    href={`/projects/${project.id}/edit`}
                    className="text-primary hover:text-primary/70"
                >
                    Edit
                </Link>
                <button 
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this project?')) {
                        deleteProject(project.id);
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

export default function ProjectsPage() {
  return (
    <>
      <Breadcrumb pageName="Projects" />
      <div className="flex flex-col gap-10">
        <ProjectList />
      </div>
    </>
  );
}
