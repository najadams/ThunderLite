"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";

const schema = z.object({
  // Personal Information
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  address: z.string().min(5, "Address is required"),

  // Child's Information
  childName: z.string().min(2, "Child's name is required"),
  childAge: z
    .number()
    .min(5, "Child must be at least 5 years old")
    .max(18, "Child must be under 18"),
  artForm: z.string().min(2, "Art form is required"),
  experience: z.string().min(10, "Please describe your child's experience"),

  // Funding Request
  fundingAmount: z.number().min(100).max(5000),
  fundingPurpose: z
    .string()
    .min(20, "Please provide more details about the funding purpose"),
  timeline: z.string().min(10, "Please specify your timeline"),

  // Additional Information
  previousFunding: z.boolean(),
  otherSupport: z.string(),
  agreement: z
    .boolean()
    .refine((val) => val === true, "You must agree to the terms"),
});

type FormData = z.infer<typeof schema>;

const steps = [
  { id: 1, name: "Personal Info" },
  { id: 2, name: "Child's Details" },
  { id: 3, name: "Funding Request" },
  { id: 4, name: "Review" },
];

export default function Apply() {
  const [currentStep, setCurrentStep] = useState(1);
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Here you would typically send the data to your backend
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated API call
      setSubmitSuccess(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6">
            <div>
              <label htmlFor="firstName" className="label">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className="input"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="label">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="input"
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="input"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="label">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                className="input"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="address" className="label">
                Address
              </label>
              <textarea
                id="address"
                className="input"
                rows={3}
                {...register("address")}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6">
            <div>
              <label htmlFor="childName" className="label">
                Child's Name
              </label>
              <input
                type="text"
                id="childName"
                className="input"
                {...register("childName")}
              />
              {errors.childName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.childName.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="childAge" className="label">
                Child's Age
              </label>
              <input
                type="number"
                id="childAge"
                className="input"
                {...register("childAge", { valueAsNumber: true })}
              />
              {errors.childAge && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.childAge.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="artForm" className="label">
                Primary Art Form
              </label>
              <select id="artForm" className="input" {...register("artForm")}>
                <option value="">Select an art form</option>
                <option value="painting">Painting</option>
                <option value="drawing">Drawing</option>
                <option value="sculpture">Sculpture</option>
                <option value="digital">Digital Art</option>
                <option value="photography">Photography</option>
                <option value="other">Other</option>
              </select>
              {errors.artForm && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.artForm.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="experience" className="label">
                Artistic Experience
              </label>
              <textarea
                id="experience"
                className="input"
                rows={4}
                placeholder="Tell us about your child's artistic journey..."
                {...register("experience")}
              />
              {errors.experience && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.experience.message}
                </p>
              )}
            </div>

            <div>
              <label className="label">Portfolio Samples (Optional)</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-indigo-500 transition-colors">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48">
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
                      <span>Upload files</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        multiple
                        accept="image/*,.pdf"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, PDF up to 10MB
                  </p>
                </div>
              </div>
              {files.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {files.map((file, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      {file.name} - {(file.size / 1024 / 1024).toFixed(2)}MB
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6">
            <div>
              <label htmlFor="fundingAmount" className="label">
                Funding Amount Requested ($)
              </label>
              <input
                type="number"
                id="fundingAmount"
                className="input"
                min="100"
                max="5000"
                {...register("fundingAmount", { valueAsNumber: true })}
              />
              {errors.fundingAmount && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fundingAmount.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="fundingPurpose" className="label">
                Purpose of Funding
              </label>
              <textarea
                id="fundingPurpose"
                className="input"
                rows={4}
                placeholder="How will the funds be used?"
                {...register("fundingPurpose")}
              />
              {errors.fundingPurpose && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fundingPurpose.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="timeline" className="label">
                Timeline
              </label>
              <input
                type="text"
                id="timeline"
                className="input"
                placeholder="When do you need the funds?"
                {...register("timeline")}
              />
              {errors.timeline && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.timeline.message}
                </p>
              )}
            </div>

            <div>
              <label className="label flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-indigo-600"
                  {...register("previousFunding")}
                />
                <span>Have you received funding from us before?</span>
              </label>
            </div>

            <div>
              <label htmlFor="otherSupport" className="label">
                Other Support (Optional)
              </label>
              <textarea
                id="otherSupport"
                className="input"
                rows={3}
                placeholder="List any other financial support or grants you're receiving..."
                {...register("otherSupport")}
              />
            </div>
          </motion.div>
        );

      case 4:
        const formData = watch();
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">
                Application Summary
              </h3>
              <dl className="grid grid-cols-1 gap-4">
                <div>
                  <dt className="font-medium text-gray-500">Name</dt>
                  <dd className="mt-1">
                    {formData.firstName} {formData.lastName}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-500">Contact</dt>
                  <dd className="mt-1">
                    {formData.email}
                    <br />
                    {formData.phone}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-500">
                    Child's Information
                  </dt>
                  <dd className="mt-1">
                    {formData.childName}, Age: {formData.childAge}
                    <br />
                    Art Form: {formData.artForm}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-500">Funding Request</dt>
                  <dd className="mt-1">
                    Amount: ${formData.fundingAmount}
                    <br />
                    Timeline: {formData.timeline}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="space-y-4">
              <label className="label flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-indigo-600"
                  {...register("agreement")}
                />
                <span>
                  I confirm that all information provided is accurate and
                  complete.
                </span>
              </label>
              {errors.agreement && (
                <p className="text-red-500 text-sm">
                  {errors.agreement.message}
                </p>
              )}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen pt-16">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Application Submitted Successfully!
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Thank you for applying. We will review your application and
              contact you soon.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Fund Application
          </h1>
          <p className="text-gray-600">
            Complete the form below to apply for funding support for your
            child's artistic endeavors.
          </p>
        </div>

        {/* Progress Steps */}
        <nav aria-label="Progress" className="mb-12">
          <ol className="flex items-center">
            {steps.map((step, stepIdx) => (
              <li
                key={step.name}
                className={`${
                  stepIdx !== steps.length - 1 ? "pr-8 sm:pr-20" : ""
                } relative`}>
                {currentStep > step.id ? (
                  <>
                    <div
                      className="absolute inset-0 flex items-center"
                      aria-hidden="true">
                      <div className="h-0.5 w-full bg-indigo-600" />
                    </div>
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-900">
                      <svg
                        className="h-5 w-5 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </>
                ) : currentStep === step.id ? (
                  <>
                    <div
                      className={`absolute inset-0 flex items-center ${
                        stepIdx === 0 ? "hidden" : ""
                      }`}
                      aria-hidden="true">
                      <div className="h-0.5 w-full bg-gray-200" />
                    </div>
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white">
                      <span
                        className="h-2.5 w-2.5 rounded-full bg-indigo-600"
                        aria-hidden="true"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className={`absolute inset-0 flex items-center ${
                        stepIdx === 0 ? "hidden" : ""
                      }`}
                      aria-hidden="true">
                      <div className="h-0.5 w-full bg-gray-200" />
                    </div>
                    <div className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400">
                      <span
                        className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300"
                        aria-hidden="true"
                      />
                    </div>
                  </>
                )}
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-medium">
                  {step.name}
                </span>
              </li>
            ))}
          </ol>
        </nav>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <AnimatePresence mode="wait">{renderFormStep()}</AnimatePresence>

          <div className="flex justify-between pt-6">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="btn-secondary">
                Previous
              </button>
            )}
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="btn-primary ml-auto">
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className={`btn-primary ml-auto ${
                  (!isValid || isSubmitting) && "opacity-50 cursor-not-allowed"
                }`}>
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
