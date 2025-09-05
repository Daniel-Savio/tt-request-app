import { Button } from "../components/ui/button";
import { Calendar } from "../components/ui/calendar";
import { Label } from "../components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Separator } from "../components/ui/separator";
import { ChevronDownIcon, ChevronLeft, ChevronRight, Github } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { ScrollArea } from "../components/ui/scroll-area";
import { RequestForm, requestFormSchema } from "../../shared/types";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { Input } from "../components/ui/input";
import { zodResolver } from '@hookform/resolvers/zod'

export function Home() {
  //Date-Picker
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [formStep, setFormStep] = useState(0);

  function nextStep() {
    setFormStep(formStep + 1);
  }
  function previousStep() {
    setFormStep(formStep - 1);
  }


  //Use quary
  const { data } = useQuery({
    queryKey: ['getJsonData'],
    queryFn: async () => {

      const status = await window.App.cloneGitStatus()
      toast("Notificação", {
        description: status.message,
        invert: true,
        richColors: true,
        duration: 2000,
        icon: status.isSuccess ? <Github className="text-green-600 size-4" /> : <Github className="text-red-600 size-4" />
      })

      const response = await window.App.getJsonData()
      return response.data
    },

  })


  //Formulario
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(requestFormSchema) });

  const invoiceNumber = watch("invoiceNumber");
  const clientNumber = watch("clientNumber");

  useEffect(() => {
    if (invoiceNumber) { setValue("invoiceNumber", invoiceNumber.replace(/\D/g, "")); }
    if (clientNumber) { setValue("clientNumber", clientNumber.replace(/\D/g, "")); }
    if (errors.client
      || errors.clientNumber
      || errors.email
      || errors.invoiceNumber
      || errors.processName
      || errors.project
      || errors.salesName
      || errors.processingDate
    ) {
      setFormStep(0)
    }
  }, [invoiceNumber, setValue, clientNumber, setValue, errors]);



  function postForm(data: RequestForm) {

    toast(
      "Info",
      {
        description:
          (<pre className="text-wrap overflow-auto">
            {JSON.stringify(data)}
          </pre>),
        invert: true,
        richColors: true,
        duration: 2000,

      }
    )
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <ScrollArea className="w-full h-[800px] p-4 rounded-lg">
        <h1 className="text-2xl font-bold mb-4 ">Formulário de Requisição</h1>

        <form onSubmit={handleSubmit(postForm)} className="">

          <section className={` ${formStep === 0 ? "" : "hidden"} p-2 mb-4 rounded grid grid-cols-1 md:grid-cols-2 gap-4 shadow-md `}>

            <div>
              <Label
                htmlFor="responsavelComercial"
                className=" text-sm font-medium "
              >
                Responsável Comercial
              </Label>

              <Select defaultValue="" onValueChange={(value) => { setValue("salesName", value) }}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Jhon Doe" />
                </SelectTrigger>
                <SelectContent>
                  {
                    data?.comercial.map(comercial => {
                      return <SelectItem key={comercial} value={comercial}>{comercial}</SelectItem>
                    })
                  }
                </SelectContent>
              </Select>


              {errors.salesName && (
                <p className="mt-2 text-sm text-destructive">
                  {errors.salesName.message}
                </p>
              )}
            </div>
            <div>
              <Label
                htmlFor="responsavelProcessamento"
                className=" text-sm font-medium "
              >
                Responsável Processamento
              </Label>

              <Select defaultValue="" onValueChange={(value) => { setValue("processName", value) }}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Jane Doe" />
                </SelectTrigger>
                <SelectContent>
                  {
                    data?.processamento.map(processamento => {
                      return <SelectItem key={processamento} value={processamento}>{processamento}</SelectItem>
                    })
                  }
                </SelectContent>
              </Select>


              {errors.processName && (
                <p className="mt-2 text-sm text-destructive">
                  {errors.processName.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="email" className=" text-sm font-medium ">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="jhondoe@treetech.com.br"
                {...register("email", {
                  required: "Campo obrigatório",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "E-mail inválido",
                  },
                })}
                className=""
              />
              {errors.email && (
                <p className="mt-2 text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="client" className=" text-sm font-medium ">
                Cliente
              </Label>
              <Input
                id="client"
                placeholder="PSI"
                {...register("client")}
                className=""
              />
              {errors.client && (
                <p className="mt-2 text-sm text-destructive">
                  {errors.client.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="projeto" className=" text-sm font-medium ">
                Projeto
              </Label>
              <Input
                id="projeto"
                placeholder="ISA ENERGIA"
                {...register("project")}
                className=""
              />
              {errors.project && (
                <p className="mt-2 text-sm text-destructive">
                  {errors.project.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="numeroPedido" className=" text-sm font-medium ">
                Nº Pedido
              </Label>
              <Input
                id="numeroPedido"
                placeholder="54321"
                type="text"
                {...register("invoiceNumber")}
                className=""
              />
              {errors.invoiceNumber && (
                <p className="mt-2 text-sm text-destructive">
                  {errors.invoiceNumber.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="clientNumber" className=" text-sm font-medium ">
                Nº Cliente
              </Label>
              <Input
                id="clientNumber"
                placeholder="12345"
                type="text"
                {...register("clientNumber")}
                className=""
              />
              {errors.clientNumber && (
                <p className="mt-2 text-sm text-destructive">
                  {errors.clientNumber.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="date" className="px-1 w-full">
                Data de envio ao processamento
              </Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className="w-full mt-1 justify-between font-normal"
                  >
                    {date ? date.toLocaleDateString() : "Escolha a data"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setDate(date);
                      setValue("processingDate", date!)
                    }}
                  />
                </PopoverContent>
              </Popover>
              {errors.processingDate && (
                <p className="mt-2 text-sm text-destructive">
                  {errors.processingDate.message}
                </p>
              )}
            </div>
          </section>

          {/* STEP 2 */}
          <section className={` ${formStep === 1 ? "" : "hidden"} p-2 mb-4 rounded grid grid-cols-1 md:grid-cols-2 gap-4 shadow-md `}>
            <div>
              <Label
                className=" text-sm font-medium "
              >
                Gateway
              </Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um IED" />
                </SelectTrigger>
                <SelectContent>
                  {
                    data?.sd.map(sd => {
                      return <SelectItem key={sd} value={sd}>{sd}</SelectItem>
                    })

                  }
                </SelectContent>
              </Select>
            </div>

          </section>

          <Separator></Separator>



          {/* Bot */}
          <div className="w-full flex justify-between items-center mt-2">
            <Button variant={"secondary"} type="button" disabled={formStep === 0} onClick={previousStep}>
              <ChevronLeft />
              Anterior
            </Button>
            <span className="w-full mx-auto text-center text-muted-foreground">{formStep + 1}/3</span>
            <Button variant={"secondary"} type="button" disabled={formStep === 2} onClick={nextStep}>
              Próximo
              <ChevronRight />
            </Button>
            {/* Send Button */}
          </div>
          <div className={`  mt-8 md:col-span-2 flex justify-end ${formStep === 2 ? "" : "hidden"}`}>
            <Button type="submit" className="w-full">
              Enviar
            </Button>
          </div>




        </form>


      </ScrollArea>
    </div >
  );
}


