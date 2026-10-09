// src/components/recharge/RechargePackList.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Check, ChevronLeft, Sparkles, CheckCircle2, Lock, ArrowRight } from 'lucide-react';
import { addQuestions } from '@/redux/slice/walletSlice';
import { closeRechargeModal } from '@/redux/slice/uiSlice';

export const QUESTION_PACKS = [
  {
    id: 'silver',
    name: 'SILVER',
    displayName: 'Silver',
    questions: 5,
    price: 9.49,
    originalPrice: 19.99,
    perQuestion: '$1.90 per question',
    promoCode: 'PAYNOW',
    discount: 10.50,
  },
  {
    id: 'gold',
    name: 'GOLD',
    displayName: 'Gold',
    questions: 10,
    price: 12.99,
    originalPrice: 39.99,
    perQuestion: '$1.30 per question',
    promoCode: 'GQUEST',
    discount: 27.00,
  },
  {
    id: 'diamond',
    name: 'DIAMOND',
    displayName: 'Diamond',
    questions: 20,
    price: 17.99,
    originalPrice: 79.99,
    perQuestion: '$0.90 per question',
    promoCode: 'GOMAX',
    discount: 62.00,
    badge: 'BEST VALUE',
  },
];

const RechargePackList = ({ onClose }) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [selectedPackId, setSelectedPackId] = useState('diamond');
  const [appliedCode, setAppliedCode] = useState('GOMAX');
  const [showAllCoupons, setShowAllCoupons] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedPack = QUESTION_PACKS.find((p) => p.id === selectedPackId) || QUESTION_PACKS[2];

  const handleSelectPack = (pack) => {
    setSelectedPackId(pack.id);
    setAppliedCode(pack.promoCode);
  };

  const hasValidDiscount = Boolean(appliedCode && appliedCode.toUpperCase() === selectedPack.promoCode);
  const discountAmount = hasValidDiscount ? selectedPack.discount : 0;
  const finalPrice = hasValidDiscount ? selectedPack.price : selectedPack.originalPrice;

  const handleApplyManualCode = (e) => {
    e.preventDefault();
    const trimmed = manualCode.trim().toUpperCase();
    if (!trimmed) return;

    const matchingPack = QUESTION_PACKS.find((p) => p.promoCode === trimmed);
    if (matchingPack) {
      setSelectedPackId(matchingPack.id);
      setAppliedCode(matchingPack.promoCode);
      setManualCode('');
      toast.success(`Coupon ${trimmed} applied!`);
    } else {
      toast.error('Invalid promo code');
    }
  };

  const handleApplyCouponFromList = (pack) => {
    setSelectedPackId(pack.id);
    setAppliedCode(pack.promoCode);
    setShowAllCoupons(false);
    toast.success(`Coupon ${pack.promoCode} applied!`);
  };

  const handleProceedToPay = async () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      dispatch(addQuestions(selectedPack.questions));
      toast.success(`Payment successful! Added ${selectedPack.questions} questions to your balance.`);
      if (onClose) {
        onClose();
      } else {
        dispatch(closeRechargeModal());
      }
    }, 900);
  };

  return (
    <div className="p-6 sm:p-9 md:p-11 text-slate-900 font-sans select-none">
      {step === 1 ? (
        /* ==================== STEP 1: PACK SELECTION ==================== */
        <div>
          {/* Header */}
          <div className="pr-10">
            <h2
              className="text-3xl sm:text-4xl text-slate-900 font-normal tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Buy more questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 font-normal tracking-wide">
              One-time purchase · never expires · every answer stays chart-bound.
            </p>
          </div>

          {/* 3 Pack Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 mt-8 sm:mt-10">
            {QUESTION_PACKS.map((pack) => {
              const isSelected = pack.id === selectedPackId;
              return (
                <div
                  key={pack.id}
                  onClick={() => handleSelectPack(pack)}
                  className={`relative rounded-2xl p-6 sm:p-7 cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? 'border-2 border-purple-600 bg-gradient-to-b from-purple-50/90 via-purple-50/30 to-white shadow-[0_16px_36px_-8px_rgba(147,51,234,0.18)] ring-4 ring-purple-100/70 -translate-y-1'
                      : 'border border-slate-200/90 bg-white hover:border-purple-300 hover:shadow-lg hover:shadow-purple-500/5 hover:-translate-y-0.5'
                  }`}
                >
                  {/* BEST VALUE Badge for Diamond */}
                  {pack.badge && (
                    <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-md bg-gradient-to-r from-amber-400 to-amber-500 text-[10px] font-black uppercase tracking-wider text-slate-950 shadow-sm flex items-center gap-1">
                      <span className="text-[11px] leading-none">✦</span> {pack.badge}
                    </div>
                  )}

                  <div>
                    {/* Top: Tier Name & Radio */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[11px] font-bold uppercase tracking-[0.22em] ${
                          isSelected ? 'text-purple-700' : 'text-slate-400'
                        }`}
                      >
                        {pack.name}
                      </span>
                      {isSelected ? (
                        <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center text-white shadow-xs">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-slate-300 bg-white" />
                      )}
                    </div>

                    {/* Middle: Big Question Count */}
                    <div className="mt-6 mb-7 sm:mb-9">
                      <div className="text-5xl sm:text-6xl font-medium text-slate-900 tracking-tight leading-none">
                        {pack.questions}
                      </div>
                      <div className="text-xs text-slate-400 font-normal lowercase tracking-wide mt-1.5">
                        questions
                      </div>
                    </div>
                  </div>

                  {/* Bottom: Pricing Details */}
                  <div className="pt-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-slate-900 tracking-tight">
                        ${pack.price.toFixed(2)}
                      </span>
                      <span className="text-xs text-slate-400 line-through font-normal">
                        ${pack.originalPrice.toFixed(2)}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 font-normal mt-1">
                      {pack.perQuestion}
                    </p>

                    <div className="text-[11px] text-slate-400 font-medium tracking-wider uppercase mt-2.5">
                      CODE <span className="font-semibold text-slate-700">{pack.promoCode}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Action Footer */}
          <div className="mt-9 sm:mt-11 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.2em]">
              SECURE PAYMENT · INSTANT CREDIT
            </div>

            <button
              onClick={() => {
                setAppliedCode(selectedPack.promoCode);
                setStep(2);
              }}
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 hover:from-purple-700 hover:via-purple-800 hover:to-indigo-700 text-white font-medium text-sm sm:text-base px-8 py-3.5 rounded-full shadow-lg shadow-purple-600/25 hover:shadow-purple-600/40 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              Continue with {selectedPack.questions} questions · ${selectedPack.price.toFixed(2)}
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      ) : (
        /* ==================== STEP 2: PAYMENT SUMMARY ==================== */
        <div>
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.2em] uppercase text-slate-400 hover:text-purple-700 transition-colors cursor-pointer py-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> STEP 2 OF 2
              </button>
              <h2
                className="text-3xl sm:text-4xl text-slate-900 font-normal tracking-tight mt-0.5"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Payment summary
              </h2>
            </div>
          </div>

          {/* Two-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-7 sm:gap-9 mt-7">
            {/* Left Column: Pack & Promo */}
            <div className="md:col-span-7 space-y-6">
              {/* YOUR PACK */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-bold tracking-[0.2em] text-slate-400 uppercase">
                  <span>YOUR PACK</span>
                  <button
                    onClick={() => setStep(1)}
                    className="text-slate-500 hover:text-purple-700 transition-colors cursor-pointer"
                  >
                    CHANGE &gt;
                  </button>
                </div>

                <div className="rounded-2xl border border-purple-200/80 bg-gradient-to-r from-purple-50/70 via-purple-50/30 to-white p-4.5 sm:p-5 flex items-center justify-between shadow-xs mt-2.5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-100/90 text-purple-700 flex items-center justify-center shrink-0 border border-purple-200/60 shadow-xs">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <h4
                        className="text-base sm:text-lg font-medium text-slate-900"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {selectedPack.displayName} · {selectedPack.questions} questions
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5 font-normal">
                        Never expires · added to your account instantly
                      </p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-slate-900 pr-1">
                    ${selectedPack.price.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* PROMO CODE */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-bold tracking-[0.2em] text-slate-400 uppercase">
                  <span>PROMO CODE</span>
                  <button
                    onClick={() => setShowAllCoupons(!showAllCoupons)}
                    className="text-slate-500 hover:text-purple-700 transition-colors cursor-pointer"
                  >
                    {showAllCoupons ? 'HIDE COUPONS' : 'VIEW ALL COUPONS >'}
                  </button>
                </div>

                {appliedCode ? (
                  <div className="rounded-2xl border border-emerald-300/80 bg-emerald-50/50 px-4.5 py-3.5 flex items-center justify-between mt-2.5 shadow-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                      </div>
                      <span className="font-bold tracking-wider text-slate-900 text-sm">
                        {appliedCode}
                      </span>
                    </div>
                    <button
                      onClick={() => setAppliedCode(null)}
                      className="text-xs font-semibold text-slate-500 hover:text-rose-600 cursor-pointer flex items-center gap-1 transition-colors"
                      title="Remove promo code"
                    >
                      Applied <span className="text-sm">✕</span>
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyManualCode} className="flex gap-2.5 mt-2.5">
                    <input
                      type="text"
                      value={manualCode}
                      onChange={(e) => setManualCode(e.target.value)}
                      placeholder="ENTER PROMO CODE"
                      className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 uppercase tracking-wider flex-1 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 shadow-xs"
                    />
                    <button
                      type="submit"
                      className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl cursor-pointer transition-all shadow-md shadow-purple-600/20 active:scale-[0.98]"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {/* Available coupons drawer */}
                {showAllCoupons && (
                  <div className="mt-3 space-y-2 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 animate-in fade-in duration-200">
                    <p className="text-xs text-slate-700 font-bold mb-2">Available Coupons:</p>
                    {QUESTION_PACKS.map((pack) => (
                      <div
                        key={pack.promoCode}
                        className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 text-xs shadow-xs"
                      >
                        <div>
                          <span className="font-bold text-purple-700 tracking-wider">
                            {pack.promoCode}
                          </span>
                          <span className="text-slate-500 ml-2 font-normal">
                            (Save ${pack.discount.toFixed(2)} on {pack.displayName})
                          </span>
                        </div>
                        <button
                          onClick={() => handleApplyCouponFromList(pack)}
                          className="text-purple-600 hover:text-purple-800 font-bold cursor-pointer ml-3 bg-purple-50 hover:bg-purple-100 px-3 py-1 rounded-md transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="md:col-span-5 flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-bold tracking-[0.2em] text-slate-400 uppercase">
                  ORDER
                </div>

                <div className="rounded-2xl border border-slate-200/90 bg-white p-5.5 shadow-xs mt-2.5 space-y-3.5">
                  <div className="space-y-3 text-sm">
                    {/* Questions subtotal */}
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 font-normal">
                        {selectedPack.questions} Questions
                      </span>
                      <span className="font-semibold text-slate-900">
                        ${selectedPack.originalPrice.toFixed(2)}
                      </span>
                    </div>

                    {/* Discount line */}
                    {hasValidDiscount && (
                      <div className="flex items-center justify-between text-emerald-600 font-semibold">
                        <span>{appliedCode} discount</span>
                        <span>− ${discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    {/* Taxes & fees */}
                    <div className="flex items-center justify-between text-slate-500 font-normal">
                      <span>Taxes and fees</span>
                      <span className="text-slate-700 font-medium">Included</span>
                    </div>
                  </div>

                  {/* Thin divider */}
                  <div className="border-t border-slate-100 my-4" />

                  {/* Total */}
                  <div className="flex items-baseline justify-between pt-1">
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                      TOTAL
                    </span>
                    <span className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                      ${finalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button & Security */}
              <div className="mt-6">
                <button
                  onClick={handleProceedToPay}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 hover:from-purple-700 hover:via-purple-800 hover:to-indigo-700 text-white font-medium py-3.5 px-6 rounded-full text-base shadow-lg shadow-purple-600/25 hover:shadow-purple-600/40 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-60"
                >
                  {isProcessing ? 'Processing payment...' : 'Proceed to Pay →'}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[10px] tracking-[0.2em] font-bold uppercase text-slate-400 mt-3.5">
                  <Lock className="w-3.5 h-3.5" />
                  <span>RAZORPAY SECURED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RechargePackList;