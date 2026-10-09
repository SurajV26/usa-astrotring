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
    <div className="p-5 sm:p-8 md:p-10 text-gray-900 font-sans">
      {step === 1 ? (
        /* STEP 1: PACK SELECTION */
        <div>
          {/* Header */}
          <div className="pr-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-amber-950 tracking-tight">
              Buy more questions
            </h2>
            <p className="text-xs sm:text-sm text-amber-900/80 mt-1 font-normal">
              One-time purchase · never expires · every answer stays chart-bound.
            </p>
          </div>

          {/* 3 Pack Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mt-7">
            {QUESTION_PACKS.map((pack) => {
              const isSelected = pack.id === selectedPackId;
              return (
                <div
                  key={pack.id}
                  onClick={() => handleSelectPack(pack)}
                  className={`relative rounded-2xl p-5 cursor-pointer transition-all duration-200 select-none flex flex-col justify-between ${
                    isSelected
                      ? 'border-2 border-amber-600 bg-amber-50 shadow-xl shadow-amber-900/15 ring-2 ring-amber-500/50'
                      : 'border-2 border-amber-300/80 bg-amber-100 hover:border-amber-500 hover:bg-amber-50 hover:shadow-md'
                  }`}
                >
                  {/* Best Value Badge for Diamond */}
                  {pack.badge && (
                    <span className="absolute -top-3 left-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-md shadow-sm">
                      {pack.badge}
                    </span>
                  )}

                  <div>
                    {/* Top row: Name & Radio */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-950">
                        {pack.name}
                      </span>
                      {isSelected ? (
                        <span className="w-5 h-5 rounded-full bg-amber-600 flex items-center justify-center text-white shadow-xs">
                          <Check className="w-3 h-3 stroke-[2.5]" />
                        </span>
                      ) : (
                        <span className="w-5 h-5 rounded-full border-2 border-amber-400 bg-amber-50/50"></span>
                      )}
                    </div>

                    {/* Question Count */}
                    <div className="mt-4">
                      <span className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight leading-none">
                        {pack.questions}
                      </span>
                      <p className="text-sm text-gray-600 mt-1 font-normal">questions</p>
                    </div>
                  </div>

                  {/* Pricing row */}
                  <div className="mt-6 pt-3 border-t border-amber-200/80">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-gray-900">
                        ${pack.price.toFixed(2)}
                      </span>
                      <span className="text-xs text-gray-400 line-through font-normal">
                        ${pack.originalPrice.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-amber-900 font-normal mt-0.5">{pack.perQuestion}</p>
                    <p className="text-[11px] font-medium tracking-wider text-gray-600 mt-2.5 uppercase">
                      CODE <span className="bg-amber-200/80 text-amber-950 font-semibold px-1.5 py-0.5 rounded">{pack.promoCode}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Action Footer */}
          <div className="border-t border-amber-300/80 mt-8 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[11px] font-semibold tracking-wider text-amber-900/80 uppercase">
              SECURE PAYMENT · INSTANT CREDIT
            </span>
            <button
              onClick={() => {
                setAppliedCode(selectedPack.promoCode);
                setStep(2);
              }}
              className="w-full sm:w-auto bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold px-7 py-3 rounded-full text-sm shadow-lg shadow-amber-900/20 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
            >
              Continue with {selectedPack.questions} questions · ${selectedPack.price.toFixed(2)}
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </button>
          </div>
        </div>
      ) : (
        /* STEP 2: PAYMENT SUMMARY */
        <div>
          {/* Header */}
          <div>
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-amber-900 hover:text-amber-950 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> STEP 2 OF 2
            </button>
            <h2 className="text-2xl sm:text-3xl font-bold text-amber-950 tracking-tight mt-1">
              Payment summary
            </h2>
          </div>

          {/* Two-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 mt-6">
            {/* Left: Your Pack & Promo Code */}
            <div className="md:col-span-7 space-y-6">
              {/* YOUR PACK */}
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold uppercase tracking-wider text-amber-950">
                    YOUR PACK
                  </span>
                  <button
                    onClick={() => setStep(1)}
                    className="font-semibold uppercase tracking-wider text-amber-800 hover:text-amber-950 flex items-center gap-0.5 cursor-pointer"
                  >
                    CHANGE &gt;
                  </button>
                </div>

                <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-4 flex items-center gap-4 shadow-sm mt-2">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {selectedPack.displayName} · {selectedPack.questions} questions
                    </h4>
                    <p className="text-xs text-gray-600 mt-0.5 font-normal">
                      Never expires · added to your account instantly
                    </p>
                  </div>
                </div>
              </div>

              {/* PROMO CODE */}
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold uppercase tracking-wider text-amber-950">
                    PROMO CODE
                  </span>
                  <button
                    onClick={() => setShowAllCoupons(!showAllCoupons)}
                    className="font-semibold uppercase tracking-wider text-amber-800 hover:text-amber-950 flex items-center gap-0.5 cursor-pointer"
                  >
                    {showAllCoupons ? 'HIDE COUPONS' : 'VIEW ALL COUPONS >'}
                  </button>
                </div>

                {appliedCode ? (
                  <div className="rounded-2xl border-2 border-emerald-400 bg-amber-50 px-4 py-3 flex items-center justify-between mt-2 shadow-xs">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span className="font-bold tracking-wider text-emerald-950 text-sm">
                        {appliedCode}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-emerald-700 font-medium">Applied</span>
                      <button
                        onClick={() => setAppliedCode(null)}
                        className="text-emerald-700 hover:text-emerald-950 font-medium text-sm ml-1 cursor-pointer"
                        title="Remove promo code"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleApplyManualCode} className="flex gap-2 mt-2">
                    <input
                      type="text"
                      value={manualCode}
                      onChange={(e) => setManualCode(e.target.value)}
                      placeholder="ENTER PROMO CODE"
                      className="bg-amber-50 border-2 border-amber-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-500 uppercase tracking-wider flex-1 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 shadow-xs"
                    />
                    <button
                      type="submit"
                      className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl cursor-pointer transition-colors shadow-xs"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {/* Coupons list drawer */}
                {showAllCoupons && (
                  <div className="mt-3 space-y-2 p-3 rounded-2xl bg-amber-100/90 border-2 border-amber-300 animate-in fade-in duration-200 shadow-xs">
                    <p className="text-xs text-amber-950 font-semibold mb-2">Available Coupons:</p>
                    {QUESTION_PACKS.map((pack) => (
                      <div
                        key={pack.promoCode}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs shadow-xs"
                      >
                        <div>
                          <span className="font-bold text-amber-950 tracking-wider">
                            {pack.promoCode}
                          </span>
                          <span className="text-gray-600 ml-2 font-normal">
                            (Save ${pack.discount.toFixed(2)} on {pack.displayName})
                          </span>
                        </div>
                        <button
                          onClick={() => handleApplyCouponFromList(pack)}
                          className="text-amber-700 hover:text-amber-950 font-semibold cursor-pointer ml-3"
                        >
                          Apply
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Order summary & CTA */}
            <div className="md:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-950">
                  ORDER
                </span>

                <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-5 shadow-sm mt-2">
                  <div className="space-y-3 text-sm">
                    {/* Questions subtotal */}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 font-normal">{selectedPack.questions} Questions</span>
                      <span className="font-semibold text-gray-900">
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

                    {/* Taxes and fees */}
                    <div className="flex items-center justify-between text-gray-600 font-normal">
                      <span>Taxes and fees</span>
                      <span>Included</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-amber-200 my-4"></div>

                  {/* Total */}
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                      TOTAL
                    </span>
                    <span className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
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
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-3.5 px-6 rounded-full text-base shadow-lg shadow-amber-900/20 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99] disabled:opacity-60"
                >
                  {isProcessing ? (
                    'Processing...'
                  ) : (
                    <>
                      Proceed to Pay <ArrowRight className="w-4 h-4 ml-0.5" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[10px] tracking-wider font-semibold uppercase text-amber-900/70 mt-3.5">
                  <Lock className="w-3 h-3" /> RAZORPAY SECURED
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