import React from "react";
import { Modal } from "@/components/ui/modal";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  title?: string;
  message?: string;
}

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  title = "Delete Item",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
}: DeleteConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-md z-[99999]">
      <div className="text-center">
        <h3 className="mb-4 text-xl font-bold text-dark dark:text-white">
          {title}
        </h3>
        <p className="mb-6 text-body-color dark:text-body-color-dark">
          {message}
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="rounded-md border border-stroke px-6 py-2.5 font-medium text-dark hover:bg-gray-100 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-md bg-red-500 px-6 py-2.5 font-medium text-white hover:bg-red-600 disabled:bg-red-300"
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
