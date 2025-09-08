import { useFormContext } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

export function IedList({
  entradaIndex,
  ieds,
  onRemoveIed,
}: {
  entradaIndex: number;
  ieds: any[];
  onRemoveIed: (index: number) => void;
}) {
  const { register, watch, formState: { errors } } = useFormContext();
  const currentIeds = watch(`entradas.${entradaIndex}.ieds`);

  const hasEmptyAddress = currentIeds?.some((ied: any) => !ied.address);
  const hasRepetitiveAddress = currentIeds?.some((ied: any, index: number) =>
    currentIeds.findIndex((otherIed: any) => otherIed.address === ied.address) !== index && ied.address
  );

  return (
    <>

    <div className="flex flex-wrap gap-2 mt-4">

      {ieds &&
        ieds.map((field, index) => (
          <Badge
            key={field.id}
            variant="secondary"
            className="flex items-center gap-2"
          >
            <div>
              <span>{field.name}</span>
              <div className="flex gap-1">
                <Label htmlFor={field.id}>Endereço:</Label>
                <Input
                id={field.id}
                  placeholder="Endereço"
                  {...register(
                    `entradas.${entradaIndex}.ieds.${index}.address`
                  )}
                  className="w-10 h-4 text-center"
                  type="number"
                />
              </div>

            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemoveIed(index)}
              className="h-4 w-4"
              type="button"
            >
              <Separator orientation="vertical"></Separator>
              <Trash className="h-3 w-3 text-destructive" />
            </Button>
          </Badge>
        ))}
    </div>
              {hasEmptyAddress && (
        <p className="text-sm text-destructive">
          Existem IEDs sem endereço. Por favor, preencha todos os endereços.
        </p>
      )}
      {hasRepetitiveAddress && (
        <p className="text-sm text-destructive">
          Existem IEDs com endereços repetidos. Por favor, verifique.
        </p>
      )}
    </>
  );
}
