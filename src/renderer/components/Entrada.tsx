import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { IedSidebar } from "./IedSidebar";
import { IedList } from "./IedList";

export function Entrada({ index, remove, data }: { index: number, remove: (index: number) => void, data: any }) {
  const { control, register, watch, setValue } = useFormContext();
  const entradaType = watch(`entradas.${index}.type`);
  const ieds = watch(`entradas.${index}.ieds`);

  const { append: appendIed, remove: removeIed } = useFieldArray({
    control,
    name: `entradas.${index}.ieds`,
  });

  return (
    <div className="flex flex-col gap-2 ml-6 mt-4">
      <h1 className="text-lg flex gap-2 items-center font-bold">
        {index + 1}-) Entrada
        <Button
          onClick={() => remove(index)}
          type="button"
          variant={"ghost"}
          className="w-fit border size-6 border-destructive rounded-full"
        >
          <Trash className="text-destructive" />
        </Button>
      </h1>

      <Label>Protocolo</Label>

      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione o protocolo" />
        </SelectTrigger>
        <SelectContent>
          {data?.protocolos_entrada.map((protocolo: string) => (
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
          {data?.entradas.map((entrada: string) => (
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
      
      <Separator />
      <IedSidebar
        ieds={data?.ied || []}
        ieds_terceiros={data?.ied_terceiros || []}
        onAddIed={appendIed}
      />
      <IedList entradaIndex={index} ieds={ieds} onRemoveIed={removeIed} />
      
    </div>
  );
}