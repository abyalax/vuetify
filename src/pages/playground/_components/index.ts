import z from 'zod'

export const rfqSchema = z.object({
  brand: z.string().min(3, 'At Least 3 character for brand'),
  garansi: z.string().min(3, 'At Least 3 character for garansi'),
  unit_of_measure: z.string().min(3, 'At Least 3 character for unit of measure'),
  location: z.string().min(3, 'At Least 3 character for location'),
  deviasi: z.object({
    permintaan: z.number().nonnegative(),
    penawaran: z.number().nonnegative(),
  }),
  spesifikasi: {
    deskripsi: z.string().min(3, 'At Least 3 character for location'),
    gambar: z.file(),
  },
})

export type FormDataRFQ = z.infer<typeof rfqSchema>
