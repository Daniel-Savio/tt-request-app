import * as z from 'zod'

export const requestFormSchema = z.object({
    salesName: z.string(),
    processName: z.string(),
    email: z.email(),
    client: z.string().min(3, "Insira um nome válido"),
    project: z.string().min(3, "Insira um nome válido"),
    invoiceNumber: z.string().regex(/^\d+$/, "Insira um número de pedido válido"),
    clientNumber: z.string().regex(/^\d+$/, "Insira um número de cliente válido"),
    processingDate: z.date()

})

export type RequestForm = z.infer<typeof requestFormSchema>