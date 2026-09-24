"use client";
import { useEffect, useRef, useState } from "react";
import { PLANS, formatINR, type Plan } from "@/lib/site";
import { INDIAN_STATES, validate, formatAadhaar, type Errors, type FormData } from "@/lib/validation";

// UI-only flow. Backend hooks are marked TODO: OTP (SMS provider), payment (Razorpay), member ID (server).
const DEMO_OTP = "123456";
const STEPS = ["Your details", "Verify mobile", "Choose plan", "Payment"];

const empty: FormData = { name: "", mobile: "", email: "", aadhaar: "", state: "", consent: false };

export default function MembershipFlow() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [otpError, setOtpError] = useState("");
  const [timer, setTimer] = useState(0);
  const [plan, setPlan] = useState<Plan | null>(PLANS.find((p) => p.highlight) ?? null);
  const [paying, setPaying] = useState(false);
  const [memberId, setMemberId] = useState("");
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (timer <= 0) return;
    const t = setTimeout(() => setTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  const go = (n: number) => {
    setStep(n);
    cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const set = <K extends keyof FormData>(k: K, v: FormData[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    // TODO: POST /api/register → create pending member, send OTP via SMS provider
    setOtp(Array(6).fill(""));
    setTimer(30);
    go(1);
    setTimeout(() => otpRefs.current[0]?.focus(), 400);
  };

  const onOtp = (i: number, v: string) => {
    const digits = v.replace(/\D/g, "");
    if (!digits) {
      setOtp((o) => o.map((x, k) => (k === i ? "" : x)));
      return;
    }
    const next = [...otp];
    digits.split("").slice(0, 6 - i).forEach((d, k) => (next[i + k] = d));
    setOtp(next);
    setOtpError("");
    otpRefs.current[Math.min(i + digits.length, 5)]?.focus();
  };

  const verifyOtp = () => {
    // TODO: POST /api/otp/verify
    if (otp.join("") !== DEMO_OTP) {
      setOtpError("That code doesn't match. Please try again.");
      return;
    }
    go(2);
  };

  const pay = () => {
    if (!plan) return;
    setPaying(true);
    // TODO: create Razorpay order on the server, open Checkout, confirm via webhook
    setTimeout(() => {
      const year = new Date().getFullYear();
      setMemberId(`SDLC-${year}-${String(Math.floor(10000 + Math.random() * 89999))}`);
      setPaying(false);
      go(4);
    }, 1600);
  };

  const reset = () => {
    setForm(empty);
    setPlan(PLANS.find((p) => p.highlight) ?? null);
    setMemberId("");
    go(0);
  };

  const maskedMobile = `+91 ${form.mobile.slice(0, 2)}XXXXXX${form.mobile.slice(-2)}`;

  return (
    <div className="flow" ref={cardRef}>
      {step < 4 && (
        <ol className="stepper" aria-label="Membership steps">
          {STEPS.map((s, i) => (
            <li key={s} className={i === step ? "active" : i < step ? "done" : ""} aria-current={i === step ? "step" : undefined}>
              <span className="dot">{i < step ? "✓" : i + 1}</span>
              <span className="label">{s}</span>
            </li>
          ))}
        </ol>
      )}

      <div className="flow-body" key={step}>
        {step === 0 && (
          <form onSubmit={submitDetails} noValidate className="form-grid">
            <Field label="Full name" error={errors.name} full>
              <input autoComplete="name" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="As on your Aadhaar card" />
            </Field>
            <Field label="Mobile number" error={errors.mobile} hint="We'll send an OTP to this number">
              <div className="prefix-input">
                <span>+91</span>
                <input inputMode="numeric" autoComplete="tel-national" value={form.mobile} onChange={(e) => set("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="98XXXXXXXX" />
              </div>
            </Field>
            <Field label="Email address" error={errors.email} hint="Your receipt and letter are sent here">
              <input type="email" autoComplete="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" />
            </Field>
            <Field label="Aadhaar number" error={errors.aadhaar} hint="Used only to verify your identity">
              <input inputMode="numeric" value={form.aadhaar} onChange={(e) => set("aadhaar", formatAadhaar(e.target.value))} placeholder="XXXX XXXX XXXX" />
            </Field>
            <Field label="State" error={errors.state}>
              <select value={form.state} onChange={(e) => set("state", e.target.value)}>
                <option value="">Select your state</option>
                {INDIAN_STATES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </Field>
            <label className={`check full ${errors.consent ? "has-error" : ""}`}>
              <input type="checkbox" checked={form.consent} onChange={(e) => set("consent", e.target.checked)} />
              <span>I confirm these details are correct and agree to be contacted by the committee on WhatsApp, SMS and email.</span>
            </label>
            <div className="actions full">
              <button className="btn btn-primary" type="submit">Continue <span aria-hidden>→</span></button>
            </div>
          </form>
        )}

        {step === 1 && (
          <div className="otp">
            <h3>Enter the 6-digit code</h3>
            <p className="muted">Sent to {maskedMobile}. <button className="link" onClick={() => go(0)}>Change number</button></p>
            <div className="otp-boxes">
              {otp.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => { otpRefs.current[i] = el; }}
                  inputMode="numeric"
                  maxLength={6}
                  aria-label={`Digit ${i + 1}`}
                  value={d}
                  onChange={(e) => onOtp(i, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus();
                    if (e.key === "Enter") verifyOtp();
                  }}
                  className={otpError ? "err" : ""}
                />
              ))}
            </div>
            {otpError && <p className="error-text">{otpError}</p>}
            <p className="demo-note">Demo mode: use code <b>{DEMO_OTP}</b></p>
            <div className="actions center">
              <button className="btn btn-ghost" disabled={timer > 0} onClick={() => setTimer(30)}>
                {timer > 0 ? `Resend in ${timer}s` : "Resend code"}
              </button>
              <button className="btn btn-primary" disabled={otp.join("").length < 6} onClick={verifyOtp}>Verify</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="verified">✓ Mobile verified — welcome, {form.name.split(" ")[0]}. Choose your membership:</p>
            <div className="plans" role="radiogroup" aria-label="Membership plans">
              {PLANS.map((p) => (
                <div
                  key={p.id}
                  role="radio"
                  tabIndex={0}
                  aria-checked={plan?.id === p.id}
                  className={`plan ${plan?.id === p.id ? "selected" : ""} ${p.highlight ? "featured" : ""}`}
                  onClick={() => setPlan(p)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setPlan(p); } }}
                >
                  {p.highlight && <span className="ribbon">Most chosen</span>}
                  <span className="plan-hi">{p.nameHi}</span>
                  <span className="plan-name">{p.name}</span>
                  <span className="plan-price">{formatINR(p.price)}</span>
                  <span className="plan-period">{p.period}</span>
                  <ul>
                    {p.perks.map((k) => (
                      <li key={k}>{k}</li>
                    ))}
                  </ul>
                  <span className="plan-radio" aria-hidden />
                </div>
              ))}
            </div>
            <div className="actions">
              <button className="btn btn-ghost" onClick={() => go(0)}>← Edit details</button>
              <button className="btn btn-primary" disabled={!plan} onClick={() => go(3)}>Continue to payment →</button>
            </div>
          </div>
        )}

        {step === 3 && plan && (
          <div className="summary">
            <h3>Review & pay</h3>
            <dl>
              <div><dt>Name</dt><dd>{form.name}</dd></div>
              <div><dt>Mobile</dt><dd>+91 {form.mobile} <span className="tag">Verified</span></dd></div>
              <div><dt>Email</dt><dd>{form.email}</dd></div>
              <div><dt>Aadhaar</dt><dd>XXXX XXXX {form.aadhaar.replace(/\s/g, "").slice(-4)}</dd></div>
              <div><dt>State</dt><dd>{form.state}</dd></div>
              <div><dt>Plan</dt><dd>{plan.name} ({plan.nameHi}) · {plan.period}</dd></div>
            </dl>
            <div className="total">
              <span>Total payable</span>
              <strong>{formatINR(plan.price)}</strong>
            </div>
            <p className="muted small">Pay securely by UPI, card or net banking. Your receipt and membership letter arrive on email and WhatsApp right after payment.</p>
            <div className="actions">
              <button className="btn btn-ghost" onClick={() => go(2)}>← Change plan</button>
              <button className="btn btn-primary btn-lg" onClick={pay} disabled={paying}>
                {paying ? <span className="spinner" aria-label="Processing" /> : <>Pay {formatINR(plan.price)}</>}
              </button>
            </div>
          </div>
        )}

        {step === 4 && plan && (
          <div className="success">
            <div className="success-mark" aria-hidden>
              <svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="24" /><path d="M15 27 L23 35 L38 18" /></svg>
            </div>
            <h3>जय श्री राम! Welcome to the committee</h3>
            <p>Your {plan.name} membership is active.</p>
            <div className="member-id">
              <span>Membership ID</span>
              <strong>{memberId}</strong>
            </div>
            <p className="muted">Your payment receipt and membership letter have been sent to <b>{form.email}</b> and on WhatsApp to <b>+91 {form.mobile}</b>.</p>
            <div className="actions center">
              <button className="btn btn-ghost" onClick={reset}>Register another member</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, error, hint, full, children }: { label: string; error?: string; hint?: string; full?: boolean; children: React.ReactNode }) {
  return (
    <label className={`field ${full ? "full" : ""} ${error ? "has-error" : ""}`}>
      <span className="field-label">{label}</span>
      {children}
      {error ? <span className="error-text">{error}</span> : hint ? <span className="hint">{hint}</span> : null}
    </label>
  );
}
