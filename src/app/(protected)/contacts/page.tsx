
'use client';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { useGetContactsQuery, useDeleteContactMutation } from '@/redux/features/contacts/contactApi';

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrashIcon } from "@/assets/icons";
import { DeleteConfirmModal } from "@/components/DeleteConfirmModal";
import { FloatingAlert } from "@/components/ui-elements/alert/FloatingAlert";
import { Pagination } from "@/components/Pagination";

const ContactList = () => {
  const [page, setPage] = useState(1);
  const { data: contactsData, isLoading, error } = useGetContactsQuery({ page, limit: 10 });
  const [deleteContact] = useDeleteContactMutation();
  
  const contacts = Array.isArray(contactsData) ? contactsData : contactsData?.data;
  const totalPages = contactsData?.meta?.totalPages || contactsData?.totalPages || 1;

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
        await deleteContact(deleteId).unwrap();
        setIsAlertVisible(true);
      } catch (err) {
        console.error("Failed to delete contact:", err);
      } finally {
        setIsModalOpen(false);
        setDeleteId(null);
      }
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading contacts.</p>;

  return (
    <>
      <FloatingAlert
        isVisible={isAlertVisible}
        onClose={() => setIsAlertVisible(false)}
        title="Success"
        description="Contact deleted successfully."
        variant="success"
      />

      <DeleteConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Contact"
        message="Are you sure you want to delete this contact message? This action cannot be undone."
      />

      <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
        <div className="mb-6 flex items-center justify-between">
          <h4 className="text-xl font-bold text-dark dark:text-white">
            All Contacts
          </h4>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="border-none bg-[#F7F9FC] dark:bg-dark-2 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-white">
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {contacts?.map((contact: any, key: number) => (
              <TableRow
                key={key}
                className="border-[#eee] dark:border-dark-3"
              >
                <TableCell>
                  <h5 className="font-medium text-dark dark:text-white">
                    {contact.name}
                  </h5>
                </TableCell>

                <TableCell>
                  <p className="text-body-sm text-dark dark:text-white">
                    {contact.email}
                  </p>
                </TableCell>

                <TableCell>
                  <p className="text-body-sm text-dark dark:text-white">
                    {contact.subject}
                  </p>
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-x-3.5">
                    <button
                      onClick={() => handleDeleteClick(contact.id)}
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
