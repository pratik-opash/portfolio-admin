
'use client';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { useGetContactsQuery, useDeleteContactMutation } from '@/redux/features/contacts/contactApi';

const ContactList = () => {
  const { data: contacts, isLoading, error } = useGetContactsQuery(undefined);
  const [deleteContact] = useDeleteContactMutation();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading contacts.</p>;

  return (
    <div className="rounded-[10px] bg-white px-5 pb-2.5 pt-6 shadow-1 dark:bg-gray-dark dark:shadow-card sm:px-7.5 xl:pb-1">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-xl font-bold text-dark dark:text-white">All Contacts</h4>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-t-lg bg-[#F7F9FC] px-5 py-4 dark:bg-dark-2 sm:grid-cols-4">
          <div className="col-span-1 flex items-center">
            <p className="font-medium text-dark dark:text-white">Name</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium text-dark dark:text-white">Email</p>
          </div>
           <div className="col-span-1 hidden items-center sm:flex">
            <p className="font-medium text-dark dark:text-white">Subject</p>
          </div>
          <div className="col-span-1 flex items-center justify-end">
            <p className="font-medium text-dark dark:text-white">Actions</p>
          </div>
        </div>

        {contacts?.map((contact: any, key: number) => (
          <div
            className={`grid grid-cols-3 border-b border-stroke px-5 py-4 dark:border-dark-3 sm:grid-cols-4 ${
              key === contacts.length - 1 ? 'border-b-0' : ''
            }`}
            key={key}
          >
            <div className="col-span-1 flex items-center gap-3">
              <div className="flex flex-col">
                <p className="text-sm font-medium text-dark dark:text-white">
                  {contact.name}
                </p>
              </div>
            </div>
             <div className="col-span-1 flex items-center">
                <p className="text-sm font-medium text-dark dark:text-white">
                  {contact.email}
                </p>
            </div>
             <div className="col-span-1 hidden items-center sm:flex">
                <p className="text-sm font-medium text-dark dark:text-white">
                  {contact.subject}
                </p>
            </div>
            <div className="col-span-1 flex items-center justify-end gap-2">
                <button 
                    onClick={() => {
                        if (confirm("Are you sure you want to delete this message?")) {
                            deleteContact(contact.id);
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

export default function ContactsPage() {
  return (
    <>
      <Breadcrumb pageName="Contacts" />
      <div className="flex flex-col gap-10">
        <ContactList />
      </div>
    </>
  );
}
