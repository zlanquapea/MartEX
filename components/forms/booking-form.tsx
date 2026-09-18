"use client";

import { useId, useState } from "react";
import { useForm, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Paperclip } from "lucide-react";
import { bookingFormSchema, type BookingFormValues, timeZoneOptions } from "@/lib/validations";
import { services } from "@/content/services";
import { Field, SubmitButton, inputClasses } from "@/components/ui/primitives";
import { ProgressBar, FormStatusBanner, Honeypot } from "./form-shared";

const stepLabels = ["Contact details", "Project needs", "Meeting preference", "Review"];

const stepFields: FieldPath<BookingFormValues>[][] = [
  ["fullName", "workEmail", "phone", "organization", "jobTitle"],
  ["serviceNeeded", "businessChallenge", "projectDescription", "targetUsers", "launchTimeframe", "budgetRange", "startingPoint"],
  ["preferredDate", "preferredTime", "timeZone", "meetingFormat", "consent", "privacyAcknowledgment"],
  [],
];

const MAX_FILE_SIZE_MB = 10;

export function BookingForm() {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>();
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string>();
  const [reference, setReference] = useState<string>();
  const formId = useId();

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    mode: "onBlur",
  });

  async function goNext() {
    const valid = await trigger(stepFields[step - 1]);
    if (valid) setStep((current) => Math.min(current + 1, 4));
  }

  function goBack() {
    setStep((current) => Math.max(current - 1, 1));
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0];
    if (!selected) {
      setFile(null);
      setFileError(undefined);
      return;
    }
    if (selected.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setFileError(`File must be smaller than ${MAX_FILE_SIZE_MB}MB`);
      setFile(null);
      return;
    }
    setFileError(undefined);
    setFile(selected);
  }

  async function onSubmit(values: BookingFormValues) {
    setSubmitState("loading");
    setStatusMessage(undefined);

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined) formData.append(key, String(value));
    });
    if (file) formData.append("requirementsDocument", file);

    try {
      const response = await fetch("/api/booking", { method: "POST", body: formData });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setSubmitState("error");
        setStatusMessage(
          data?.message ??
            "Booking submissions aren't connected to a delivery provider yet, so nothing was sent. Please email us directly in the meantime."
        );
        return;
      }

      setSubmitState("success");
      setReference(data?.reference ?? "Pending");
    } catch {
      setSubmitState("error");
      setStatusMessage("Something went wrong sending this request. Please try again or contact us directly.");
    }
  }

  if (submitState === "success") {
    return (
      <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-10 text-center">
        <FormStatusBanner
          status="success"
          message={`Thank you — your consultation request was received. Reference: ${reference}. A confirmation email will follow once our team reviews your request.`}
        />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-describedby={`${formId}-status`}
      className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-10"
    >
      <ProgressBar current={step} total={4} labels={stepLabels} />
      <Honeypot register={register} />

      {submitState === "error" && statusMessage && (
        <div id={`${formId}-status`} className="mb-6">
          <FormStatusBanner status="error" message={statusMessage} />
        </div>
      )}

      {step === 1 && (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Full name" htmlFor="fullName" required error={errors.fullName?.message}>
            <input id="fullName" className={inputClasses} {...register("fullName")} aria-invalid={!!errors.fullName} />
          </Field>
          <Field label="Work email" htmlFor="workEmail" required error={errors.workEmail?.message}>
            <input id="workEmail" type="email" className={inputClasses} {...register("workEmail")} aria-invalid={!!errors.workEmail} />
          </Field>
          <Field label="Phone or WhatsApp" htmlFor="phone" required error={errors.phone?.message}>
            <input id="phone" type="tel" className={inputClasses} {...register("phone")} aria-invalid={!!errors.phone} />
          </Field>
          <Field label="Organization" htmlFor="organization" required error={errors.organization?.message}>
            <input id="organization" className={inputClasses} {...register("organization")} aria-invalid={!!errors.organization} />
          </Field>
          <Field label="Job title" htmlFor="jobTitle" required error={errors.jobTitle?.message}>
            <input id="jobTitle" className={inputClasses} {...register("jobTitle")} aria-invalid={!!errors.jobTitle} />
          </Field>
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-5">
          <Field label="Service needed" htmlFor="serviceNeeded" required error={errors.serviceNeeded?.message}>
            <select id="serviceNeeded" className={inputClasses} {...register("serviceNeeded")} aria-invalid={!!errors.serviceNeeded} defaultValue="">
              <option value="" disabled>
                Select a service
              </option>
              {services.map((service) => (
                <option key={service.slug} value={service.title}>
                  {service.title}
                </option>
              ))}
              <option value="Not sure yet">Not sure yet</option>
            </select>
          </Field>
          <Field label="Business challenge" htmlFor="businessChallenge" required error={errors.businessChallenge?.message}>
            <textarea id="businessChallenge" rows={3} className={inputClasses} {...register("businessChallenge")} aria-invalid={!!errors.businessChallenge} />
          </Field>
          <Field label="Project description" htmlFor="projectDescription" required error={errors.projectDescription?.message}>
            <textarea id="projectDescription" rows={4} className={inputClasses} {...register("projectDescription")} aria-invalid={!!errors.projectDescription} />
          </Field>
          <Field label="Target users" htmlFor="targetUsers" required error={errors.targetUsers?.message}>
            <input id="targetUsers" className={inputClasses} {...register("targetUsers")} aria-invalid={!!errors.targetUsers} />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Desired launch timeframe" htmlFor="launchTimeframe" required error={errors.launchTimeframe?.message}>
              <select id="launchTimeframe" className={inputClasses} {...register("launchTimeframe")} aria-invalid={!!errors.launchTimeframe} defaultValue="">
                <option value="" disabled>
                  Select a timeframe
                </option>
                {["Immediately", "1-3 months", "3-6 months", "6+ months", "Not sure yet"].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Estimated budget range" htmlFor="budgetRange" required error={errors.budgetRange?.message}>
              <select id="budgetRange" className={inputClasses} {...register("budgetRange")} aria-invalid={!!errors.budgetRange} defaultValue="">
                <option value="" disabled>
                  Select a range
                </option>
                {["Under $5,000", "$5,000 - $15,000", "$15,000 - $50,000", "$50,000+", "Prefer to discuss"].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <fieldset>
            <legend className="text-sm font-semibold text-[var(--ink)]">
              Starting point <span aria-hidden="true">*</span>
            </legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {["Starting from scratch", "Improving an existing system"].map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2.5 rounded-xl border border-[var(--line)] px-4 py-3 text-sm has-[:checked]:border-[var(--color-sky)] has-[:checked]:bg-[var(--color-sky)]/10"
                >
                  <input type="radio" value={option} {...register("startingPoint")} className="accent-[var(--cta)]" />
                  {option}
                </label>
              ))}
            </div>
            {errors.startingPoint && <p role="alert" className="mt-1.5 text-xs font-medium text-[#c4453a]">{errors.startingPoint.message}</p>}
          </fieldset>
          <Field label="Brief or requirements document" htmlFor="requirementsDocument" required={false} hint={`PDF, Word, or text file up to ${MAX_FILE_SIZE_MB}MB`}>
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-[var(--line)] px-4 py-3 text-sm text-[var(--ink-muted)] hover:border-[var(--color-sky)]">
              <Paperclip size={16} aria-hidden="true" />
              {file ? file.name : "Choose a file"}
              <input
                id="requirementsDocument"
                type="file"
                className="sr-only"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileChange}
              />
            </label>
            {fileError && <p role="alert" className="text-xs font-medium text-[#c4453a]">{fileError}</p>}
          </Field>
        </div>
      )}

      {step === 3 && (
        <div className="grid gap-5">
          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="Preferred date" htmlFor="preferredDate" required error={errors.preferredDate?.message}>
              <input id="preferredDate" type="date" className={inputClasses} {...register("preferredDate")} aria-invalid={!!errors.preferredDate} />
            </Field>
            <Field label="Preferred time" htmlFor="preferredTime" required error={errors.preferredTime?.message}>
              <input id="preferredTime" type="time" className={inputClasses} {...register("preferredTime")} aria-invalid={!!errors.preferredTime} />
            </Field>
            <Field label="Time zone" htmlFor="timeZone" required error={errors.timeZone?.message}>
              <select id="timeZone" className={inputClasses} {...register("timeZone")} aria-invalid={!!errors.timeZone} defaultValue="">
                <option value="" disabled>
                  Select time zone
                </option>
                {timeZoneOptions.map((zone) => (
                  <option key={zone} value={zone}>
                    {zone}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <fieldset>
            <legend className="text-sm font-semibold text-[var(--ink)]">
              Meeting format <span aria-hidden="true">*</span>
            </legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-3">
              {["Video call", "Phone call", "In-person"].map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2.5 rounded-xl border border-[var(--line)] px-4 py-3 text-sm has-[:checked]:border-[var(--color-sky)] has-[:checked]:bg-[var(--color-sky)]/10"
                >
                  <input type="radio" value={option} {...register("meetingFormat")} className="accent-[var(--cta)]" />
                  {option}
                </label>
              ))}
            </div>
            {errors.meetingFormat && <p role="alert" className="mt-1.5 text-xs font-medium text-[#c4453a]">{errors.meetingFormat.message}</p>}
          </fieldset>
          <label className="flex items-start gap-3 text-sm text-[var(--ink-muted)]">
            <input type="checkbox" className="mt-0.5 accent-[var(--cta)]" {...register("consent")} aria-invalid={!!errors.consent} />
            I consent to MartEX contacting me about this request. <span aria-hidden="true">*</span>
          </label>
          {errors.consent && <p role="alert" className="text-xs font-medium text-[#c4453a]">{errors.consent.message}</p>}
          <label className="flex items-start gap-3 text-sm text-[var(--ink-muted)]">
            <input type="checkbox" className="mt-0.5 accent-[var(--cta)]" {...register("privacyAcknowledgment")} aria-invalid={!!errors.privacyAcknowledgment} />
            I have read and acknowledge the <a href="/privacy" className="font-semibold text-[var(--cta)]">Privacy Policy</a>. <span aria-hidden="true">*</span>
          </label>
          {errors.privacyAcknowledgment && (
            <p role="alert" className="text-xs font-medium text-[#c4453a]">
              {errors.privacyAcknowledgment.message}
            </p>
          )}
        </div>
      )}

      {step === 4 && <ReviewStep values={getValues()} fileName={file?.name} />}

      <div className="mt-10 flex items-center justify-between">
        {step > 1 ? (
          <button
            type="button"
            onClick={goBack}
            className="inline-flex min-h-12 items-center rounded-full border border-[var(--line)] px-6 text-sm font-semibold text-[var(--ink)]"
          >
            Back
          </button>
        ) : (
          <span />
        )}
        {step < 4 ? (
          <button
            type="button"
            onClick={goNext}
            className="inline-flex min-h-12 items-center rounded-full bg-[var(--cta)] px-6 text-sm font-semibold text-[var(--cta-ink)]"
          >
            Next
          </button>
        ) : (
          <SubmitButton loading={submitState === "loading"}>Submit request</SubmitButton>
        )}
      </div>
    </form>
  );
}

function ReviewStep({ values, fileName }: { values: Partial<BookingFormValues>; fileName?: string }) {
  const rows: [string, string | undefined][] = [
    ["Name", values.fullName],
    ["Email", values.workEmail],
    ["Phone", values.phone],
    ["Organization", values.organization],
    ["Job title", values.jobTitle],
    ["Service", values.serviceNeeded],
    ["Business challenge", values.businessChallenge],
    ["Project description", values.projectDescription],
    ["Target users", values.targetUsers],
    ["Timeframe", values.launchTimeframe],
    ["Budget", values.budgetRange],
    ["Starting point", values.startingPoint],
    ["Attachment", fileName ?? "None provided"],
    ["Preferred date", values.preferredDate],
    ["Preferred time", values.preferredTime],
    ["Time zone", values.timeZone],
    ["Meeting format", values.meetingFormat],
  ];

  return (
    <div>
      <h3 className="text-lg font-bold tracking-tight">Review your request</h3>
      <p className="mt-1 text-sm text-[var(--ink-muted)]">Confirm the details below before submitting.</p>
      <dl className="mt-6 grid gap-3 sm:grid-cols-2">
        {rows.map(([label, value]) => (
          <div key={label} className="rounded-xl border border-[var(--line)] p-4">
            <dt className="text-xs font-bold uppercase tracking-wide text-[var(--ink-muted)]">{label}</dt>
            <dd className="mt-1 break-words text-sm text-[var(--ink)]">{value || "—"}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
