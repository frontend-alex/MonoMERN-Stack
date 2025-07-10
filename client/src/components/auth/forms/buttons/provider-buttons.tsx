import { Button } from "@/components/ui/button";
import { API_URL } from "@/hooks/api";

 export type Providers = {
  name: string;
  label: string;
};

interface ProviderButtonsProps {
  providers: Providers[];
  isPending: boolean;
}

export const ProviderButtons: React.FC<ProviderButtonsProps> = ({ providers, isPending }) => {
  const showText = providers?.length <= 2;

  return (
    <div className="flex flex-row gap-3">
      {providers?.map(({ name, label }) => (
        <Button
          key={name}
          type="button"
          variant="outline"
          disabled={isPending}
          className="flex-1 items-center justify-center gap-2 cursor-pointer"
          onClick={() => window.location.href = `${API_URL}auth/${name}`}
        >
          <img className="w-5 h-5" src={`/images/${name}.png`}/>
          {showText && <span>{`${label}`}</span>}
        </Button>
      ))}
    </div>
  );
};
