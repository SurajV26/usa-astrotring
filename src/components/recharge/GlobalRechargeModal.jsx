// src/components/recharge/GlobalRechargeModal.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeRechargeModal } from '@/redux/slice/uiSlice';
import RechargePackList from './RechargePackList';
import { X } from 'lucide-react';

const GlobalRechargeModal = () => {
  const dispatch = useDispatch();
  const { rechargeModalOpen } = useSelector((state) => state.ui);

  if (!rechargeModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-5">
      <div className="relative max-h-[95vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-amber-200 text-gray-900 shadow-2xl border-2 border-amber-300 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={() => dispatch(closeRechargeModal())}
          aria-label="Close modal"
          className="absolute top-4 sm:top-5 right-4 sm:right-5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 hover:bg-white text-amber-950 border border-amber-300/80 shadow-xs transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
        <RechargePackList onClose={() => dispatch(closeRechargeModal())} />
      </div>
    </div>
  );
};

export default GlobalRechargeModal;