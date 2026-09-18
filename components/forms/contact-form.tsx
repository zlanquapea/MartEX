"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations";
import { Field, SubmitButton, inputClasses } from "@/components/ui/primitives";
import { FormStatusBanner, Honeypot } from "./form-shared";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactFormSchema) });

  async function onSubmit(values: ContactFormValues) {
    setStatus("loading");
    setMessage(undefined);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setStatus("error");
        setMessage(data?.message ?? "The message could not be sent. Please try again.");
        return;
      }

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
      setMessage("The message could not be sent. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5">
      <Honeypot register={register} />

      {status === "success" && (
        <FormStatusBanner status="success" message="Thank you — your message has been sent. We'll respond as soon as possible." />
      )}
      {status === "error" && message && <FormStatusBanner status="error" message={message} />}

      <Field label="Full name" htmlFor="name" required error={errors.name?.message}>
        <input id="name" className={inputClasses} {...register("name")} aria-invalid={!!errors.name} />
      </Field>
      <Field label="Email" htmlFor="email" required error={errors.email?.message}>
        <input id="email" type="email" className={inputClasses} {...register("email")} aria-invalid={!!errors.email} />
      </Field>
      <Field label="Organization" htmlFor="organization" required={false}>
        <input id="organization" className={inputClasses} {...register("organization")} />
      </Field>
      <Field label="Message" htmlFor="message" required error={errors.message?.message}>
        <textarea id="message" rows={5} className={inputClasses} {...register("message")} aria-invalid={!!errors.message} />
      </Field>

      <SubmitButton loading={status === "loading"}>Send message</SubmitButton>
    </form>
  );
}
