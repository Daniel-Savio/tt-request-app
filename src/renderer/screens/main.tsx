import { Button } from "../components/ui/button";
import { Calendar } from "../components/ui/calendar";
import { Label } from "../components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Separator } from "../components/ui/separator";
import {
  ChevronDownIcon,
  ChevronLeft,
  ChevronRight,
  CirclePlus,
  Github,
  Plus,
  Trash,
} from "lucide-react";
import { useEffect, useId, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { ScrollArea } from "../components/ui/scroll-area";
import { type RequestForm, requestFormSchema } from "../../shared/types";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { Input } from "../components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

export function Home() {
  const id = useId();
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
    queryKey: ["getJsonData"],
    queryFn: async () => {
      const status = await window.App.cloneGitStatus();
      toast("Notificação", {
        description: status.message,
        invert: true,
        richColors: true,
        duration: 2000,
        icon: status.isSuccess ? (
          <Github className="text-green-600 size-4" />
        ) : (
          <Github className="text-red-600 size-4" />
        ),
      });

      const response = await window.App.getJsonData();
      return response.data;
    },
  });

  //Formulario
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({ resolver: zodResolver(requestFormSchema) });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "entradas",
  });

  const invoiceNumber = watch("invoiceNumber");
  const clientNumber = watch("clientNumber");

  useEffect(() => {
    if (invoiceNumber) {
      setValue("invoiceNumber", invoiceNumber.replace(/\D/g, ""));
    }
    if (clientNumber) {
      setValue("clientNumber", clientNumber.replace(/\D/g, ""));
    }
    if (
      errors.client ||
      errors.clientNumber ||
      errors.email ||
      errors.invoiceNumber ||
      errors.processName ||
      errors.project ||
      errors.salesName ||
      errors.processingDate
    ) {
      setFormStep(0);
    }
  }, [invoiceNumber, setValue, clientNumber, setValue, errors]);

  function postForm(data: RequestForm) {
    toast("Info", {
      description: (
        <pre className="text-wrap overflow-auto">{JSON.stringify(data)}</pre>
      ),
      invert: true,
      richColors: true,
      duration: 2000,
    });
  }

  return (
    <div className="flex flex-col items-center justify-center ">
      <ScrollArea className="w-full h-[800px] p-4 rounded-lg">
        <h1 className="text-2xl font-bold mb-4 ">Formulário de Requisição</h1>

        <form className="" onSubmit={handleSubmit(postForm)}>
          <section
            className={` ${
              formStep === 0 ? "" : "hidden"
            } p-2 mb-4 rounded grid grid-cols-1 md:grid-cols-2 gap-4 shadow-md `}
          >
            <div>
              <Label
                className=" text-sm font-medium "
                htmlFor="responsavelComercial"
              >
                Responsável Comercial
              </Label>

              <Select
                defaultValue=""
                onValueChange={(value) => {
                  setValue("salesName", value);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Jhon Doe" />
                </SelectTrigger>
                <SelectContent>
                  {data?.comercial.map((comercial) => {
                    return (
                      <SelectItem key={comercial} value={comercial}>
                        {comercial}
                      </SelectItem>
                    );
                  })}
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
                className=" text-sm font-medium "
                htmlFor="responsavelProcessamento"
              >
                Responsável Processamento
              </Label>

              <Select
                defaultValue=""
                onValueChange={(value) => {
                  setValue("processName", value);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Jane Doe" />
                </SelectTrigger>
                <SelectContent>
                  {data?.processamento.map((processamento) => {
                    return (
                      <SelectItem key={processamento} value={processamento}>
                        {processamento}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>

              {errors.processName && (
                <p className="mt-2 text-sm text-destructive">
                  {errors.processName.message}
                </p>
              )}
            </div>
            <div>
              <Label className=" text-sm font-medium " htmlFor="email">
                E-mail
              </Label>
              <Input
                id={`${id}-email`}
                placeholder="jhondoe@treetech.com.br"
                type="email"
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
              <Label className=" text-sm font-medium " htmlFor="client">
                Cliente
              </Label>
              <Input
                id={`${id}-client`}
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
              <Label className=" text-sm font-medium " htmlFor="projeto">
                Projeto
              </Label>
              <Input
                id={`${id}-projeto`}
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
              <Label className=" text-sm font-medium " htmlFor="numeroPedido">
                Nº Pedido
              </Label>
              <Input
                id={`${id}-numeroPedido`}
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
              <Label className=" text-sm font-medium " htmlFor="clientNumber">
                Nº Cliente
              </Label>
              <Input
                id={`${id}-clientNumber`}
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
              <Label className="px-1 w-full" htmlFor="date">
                Data de envio ao processamento
              </Label>
              <Popover onOpenChange={setOpen} open={open}>
                <PopoverTrigger asChild>
                  <Button
                    className="w-full mt-1 justify-between font-normal"
                    id={`${id}-date`}
                    variant="outline"
                  >
                    {date ? date.toLocaleDateString() : "Escolha a data"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  className="w-auto overflow-hidden p-0"
                >
                  <Calendar
                    captionLayout="dropdown"
                    mode="single"
                    onSelect={(date) => {
                      setDate(date);
                      if (date) {
                        setValue("processingDate", date);
                      }
                    }}
                    selected={date}
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
          <section
            className={` ${
              formStep === 1 ? "" : "hidden"
            }  p-2 mb-4 rounded gap-4 shadow-md `}
          >
            <div>
              <Label className=" text-sm font-medium ">Gateway</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um IED" />
                </SelectTrigger>
                <SelectContent>
                  {data?.sd.map((sd) => {
                    return (
                      <SelectItem key={sd} value={sd}>
                        {sd}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <ScrollArea className="max-h-400 mt-4 w-full">
              <h1 className="text-lg font-bold">
                Entradas{" "}
                <Button
                  className="mt-2"
                  onClick={() => append({ type: "", value: "" })}
                  type="button"
                >
                  <Plus />
                </Button>
              </h1>

              {fields.map((field, index) => {
                const entradaType = watch(`entradas.${index}.type`);
                return (
                  <div className="flex flex-col gap-2 ml-6 mt-4" key={field.id}>
                    <h1 className="text-lg flex gap-2 items-center font-bold">
                      {index + 1}-) Entrada
                      <Button
                        onClick={() => remove(index)}
                        type="button"
                        variant={"destructive"}
                        className="w-fit"
                      >
                        <Trash />
                      </Button>
                    </h1>

                    <Label>Protocolo</Label>

                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o protocolo" />
                      </SelectTrigger>
                      <SelectContent>
                        {data?.protocolos_entrada.map((protocolo) => (
                          <SelectItem key={protocolo} value={protocolo}>
                            {protocolo}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      onValueChange={(value) =>
                        setValue(`entradas.${index}.type`, value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o tipo da entrada" />
                      </SelectTrigger>
                      <SelectContent>
                        {data?.entradas.map((entrada) => (
                          <SelectItem key={entrada} value={entrada}>
                            {entrada}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {entradaType === "TCP/IP" && (
                      <>
                        <Label className="mt-2">Parâmetros de rede</Label>
                        <Input
                          placeholder="IP"
                          {...register(`entradas.${index}.ip`)}
                        />
                        <Input
                          placeholder="Port"
                          {...register(`entradas.${index}.port`)}
                        />
                      </>
                    )}

                    {entradaType && entradaType !== "TCP/IP" && (
                      <>
                        <Label className="mt-2">Parâmetros de rede</Label>

                        <Select
                          onValueChange={(value) =>
                            setValue(`entradas.${index}.baudRate`, value)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Baudrate" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem key={1} value={"9600"}>
                              9600
                            </SelectItem>
                            <SelectItem key={2} value={"19200"}>
                              19200
                            </SelectItem>
                            <SelectItem key={3} value={"115200"}>
                              115200
                            </SelectItem>
                          </SelectContent>
                        </Select>

                        <Select
                          onValueChange={(value) =>
                            setValue(`entradas.${index}.dataBits`, value)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Bits de dados" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem key={1} value={"8"}>
                              8
                            </SelectItem>
                            <SelectItem key={2} value={"7"}>
                              7
                            </SelectItem>
                          </SelectContent>
                        </Select>

                        <Select
                          onValueChange={(value) =>
                            setValue(`entradas.${index}.parity`, value)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Paridade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem key={1} value={"None"}>
                              None - Nenhuma
                            </SelectItem>
                            <SelectItem key={2} value={"Odd"}>
                              Odd - ímpar
                            </SelectItem>
                            <SelectItem key={3} value={"Even"}>
                              Even - Par
                            </SelectItem>
                          </SelectContent>
                        </Select>

                        <Select
                          onValueChange={(value) =>
                            setValue(`entradas.${index}.stopBits`, value)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Bit de parada" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem key={1} value={"1"}>
                              1
                            </SelectItem>
                            <SelectItem key={2} value={"2"}>
                              2
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </>
                    )}
                    <Separator></Separator>
                  </div>
                );
              })}
            </ScrollArea>
          </section>

          <Separator></Separator>

          {/* Botao */}
          <div className="w-full flex justify-between items-center mt-2">
            <Button
              disabled={formStep === 0}
              onClick={previousStep}
              type="button"
              variant={"secondary"}
            >
              <ChevronLeft />
              Anterior
            </Button>
            <span className="w-full mx-auto text-center text-muted-foreground">
              {formStep + 1}/3
            </span>
            <Button
              disabled={formStep === 2}
              onClick={nextStep}
              type="button"
              variant={"secondary"}
            >
              Próximo
              <ChevronRight />
            </Button>
            {/* Send Button */}
          </div>

          <div
            className={`  mt-8 md:col-span-2 flex justify-end ${
              formStep === 2 ? "" : "hidden"
            }`}
          >
            <Button className="w-full" type="submit">
              Enviar
            </Button>
          </div>
        </form>
      </ScrollArea>
    </div>
  );
}
