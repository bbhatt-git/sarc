"use server";

import { z } from "zod";

const inquirySchema = z.object({
  parentName: z.string().min(2, "Name is too short"),
  studentName: z.string().min(2, "Name is too short"),
  studentAge: z.number().min(5, "Age must be at least 5").max(18, "Age must be at most 18"),
  email: z.string().email("Invalid email address"),
  message: z.string().optional(),
});

export async function submitInquiry(prevState: any, formData: FormData) {
  const rawData = {
    parentName: formData.get("parentName"),
    studentName: formData.get("studentName"),
    studentAge: Number(formData.get("studentAge")),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  const validatedFields = inquirySchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Error: Please check your input.',
    };
  }

  // In a real application, you would save this to a database,
  // send an email, etc.
  console.log("New Admission Inquiry:", validatedFields.data);

  return {
    message: `Thank you, ${validatedFields.data.parentName}! Your inquiry has been received. We will be in touch shortly.`,
    errors: {},
    reset: true,
  };
}
