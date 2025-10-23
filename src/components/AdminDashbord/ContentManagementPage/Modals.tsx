// Modal.tsx
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const Modals: React.FC<ModalProps> = ({ isOpen, onClose, title, subtitle, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-start border-b pb-4 mb-4">
          <h3 className="text-2xl font-bold">{title}</h3>
          <button onClick={onClose} className="text-gray-400 cursor-pointer hover:text-gray-600">&times;</button>
        </div>
        <p className="text-sm text-gray-500 mb-6">{subtitle}</p>
        {children}
      </div>
    </div>
  );
};

export default Modals;







 