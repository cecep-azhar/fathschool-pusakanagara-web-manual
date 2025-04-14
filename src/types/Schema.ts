import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = [ "image/jpeg", "image/jpg", "image/png", "image/gif", "image/svg+xml" ];

export const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export type TypeLoginSchema = z.infer<typeof loginSchema>;

export const forgotPassSchema = z.object({
  phone: z
    .string()
    .min(8, "No WhatsApp minimal 8 karakter")
    .max(13, "No WhatsApp maksimal 13 karakter")
    .regex(/^\d+$/, "No WhatsApp harus berupa angka"),
});

export type TypeForgotPassSchema = z.infer<typeof forgotPassSchema>;

export const leaveSchema = z.object({
  // leave_type_id: z.number().int(),
  // start: z.date(), 
  // image: z.string().optional()
  title: z.string().min(1, 'Judul tidak boleh kosong').max(255, 'Judul maksimal 255 karakter'),
  leave_type_id: z.string().min(1, 'Jenis cuti tidak boleh kosong'), 
  description: z.string().min(1, 'Message tidak boleh kosong').max(1000, "Message maksimal 1000 karakter"),
  end: z.string().min(1, 'Waktu tidak boleh kosong').max(255, 'Waktu maksimal 255 karakter'),
  image: z.custom<FileList>().optional().refine((files) => !files || files.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
    "Hanya format .jpg, .jpeg, .png, .gif dan .svg yang didukung"
  ),
});

export type TypeLeaveSchema = z.infer<typeof leaveSchema>;
