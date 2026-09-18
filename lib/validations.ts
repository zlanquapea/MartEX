import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().email("Enter a valid email address"),
  organization: z.string().trim().optional(),
  message: z.string().trim().min(10, "Tell us a little more (at least 10 characters)"),
  website: z.string().max(0, "").optional(), // honeypot
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const bookingStepOneSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name"),
  workEmail: z.string().trim().email("Enter a valid work email address"),
  phone: z.string().trim().min(6, "Enter a phone or WhatsApp number"),
  organization: z.string().trim().min(2, "Enter your organization name"),
  jobTitle: z.string().trim().min(2, "Enter your job title"),
});

export const bookingStepTwoSchema = z.object({
  serviceNeeded: z.string().min(1, "Select the service you need"),
  businessChallenge: z.string().trim().min(10, "Briefly describe the business challenge"),
  projectDescription: z.string().trim().min(20, "Add a little more detail about the project"),
  targetUsers: z.string().trim().min(2, "Describe who will use this system"),
  launchTimeframe: z.enum(["Immediately", "1-3 months", "3-6 months", "6+ months", "Not sure yet"], {
    errorMap: () => ({ message: "Select a timeframe" }),
  }),
  budgetRange: z.enum(
    ["Under $5,000", "$5,000 - $15,000", "$15,000 - $50,000", "$50,000+", "Prefer to discuss"],
    { errorMap: () => ({ message: "Select a budget range" }) }
  ),
  startingPoint: z.enum(["Starting from scratch", "Improving an existing system"], {
    errorMap: () => ({ message: "Select a starting point" }),
  }),
});

export const bookingStepThreeSchema = z.object({
  preferredDate: z.string().min(1, "Select a preferred date"),
  preferredTime: z.string().min(1, "Select a preferred time"),
  timeZone: z.string().min(1, "Select your time zone"),
  meetingFormat: z.enum(["Video call", "Phone call", "In-person"], {
    errorMap: () => ({ message: "Select a meeting format" }),
  }),
  consent: z.literal(true, { errorMap: () => ({ message: "Consent is required to proceed" }) }),
  privacyAcknowledgment: z.literal(true, { errorMap: () => ({ message: "Please acknowledge the privacy notice" }) }),
});

export const bookingFormSchema = bookingStepOneSchema
  .merge(bookingStepTwoSchema)
  .merge(bookingStepThreeSchema)
  .extend({
    website: z.string().max(0, "").optional(), // honeypot
  });

export type BookingFormValues = z.infer<typeof bookingFormSchema>;

/**
 * Server-side re-validation of the booking submission. Request bodies arrive
 * as multipart FormData (string values), so booleans and required fields are
 * re-parsed independently of client validation rather than trusting it.
 */
export const bookingSubmissionSchema = bookingStepOneSchema.merge(bookingStepTwoSchema).extend({
  preferredDate: z.string().min(1, "Select a preferred date"),
  preferredTime: z.string().min(1, "Select a preferred time"),
  timeZone: z.string().min(1, "Select your time zone"),
  meetingFormat: z.enum(["Video call", "Phone call", "In-person"], {
    errorMap: () => ({ message: "Select a meeting format" }),
  }),
  consent: z.literal("true", { errorMap: () => ({ message: "Consent is required to proceed" }) }),
  privacyAcknowledgment: z.literal("true", { errorMap: () => ({ message: "Please acknowledge the privacy notice" }) }),
  website: z.string().max(0).optional(),
});

export const timeZoneOptions = [
  "GMT (Monrovia)",
  "GMT (London)",
  "CET (Central Europe)",
  "EST (US Eastern)",
  "CST (US Central)",
  "PST (US Pacific)",
  "WAT (West Africa)",
  "Other",
];
