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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-md p-3 sm:p-5 animate-in fade-in duration-200">
      <div className="relative max-h-[95vh] w-full max-w-4xl overflow-y-auto rounded-[28px] bg-white text-slate-900 shadow-[0_30px_90px_-15px_rgba(109,40,217,0.18),0_0_1px_1px_rgba(0,0,0,0.04)] border border-purple-100/90 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
        {/* Soft, delicate ambient glow in corners */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-gradient-to-br from-purple-200/40 via-purple-100/20 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-gradient-to-tr from-purple-100/30 via-slate-100/40 to-transparent blur-3xl" />

        {/* Minimalist close button */}
        <button
          onClick={() => dispatch(closeRechargeModal())}
          aria-label="Close modal"
          className="absolute top-5 right-5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100/90 hover:bg-purple-100 text-slate-400 hover:text-slate-800 transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
        <RechargePackList onClose={() => dispatch(closeRechargeModal())} />
      </div>
    </div>
  );
};

export default GlobalRechargeModal;