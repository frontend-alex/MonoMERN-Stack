import { type User } from "@shared/types/user";
import { useEffect, useState } from "react";

type PartialModuleProps = {
  user: User;
  refetchUser: () => void;
} & Record<string, unknown>; 

export type ModuleLoader<T extends PartialModuleProps = PartialModuleProps> = Record<
  string,
  () => Promise<{ default: React.FC<T> }>
>;

type FilterFn = (filename: string, user: User) => boolean;


type UseDynamicPartialsOptions<T extends Record<string, unknown> = {}> = {
  partialModules: ModuleLoader<PartialModuleProps & T>;
  user: User | null | undefined;
  refetchUser: () => void;
  extraProps?: T;
  border?: boolean;
  filterFn?: FilterFn;
  reverseOrder?: boolean;
};

/**
 * useDynamicPartials
 * 
 * @template T - Additional props that each partial component should receive.
 * @param partialModules - Record of module paths to dynamic import functions.
 * @param user - Authenticated user object.
 * @param refetchUser - Function to refetch user data.
 * @param extraProps - Additional props to pass into each partial component.
 * @param border - Whether to apply border styles.
 * @param filterFn - Optional function to filter which partials to load.
 * 
 * @returns JSX.Elements array for rendering
 */
export function useDynamicPartials<T extends Record<string, unknown> = {}>({
  partialModules,
  user,
  refetchUser,
  extraProps,
  border = true,
  filterFn,
  reverseOrder = false,
}: UseDynamicPartialsOptions<T>) {
  const [partials, setPartials] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    if (!user) return;

    const loadPartials = async () => {
      let entries = Object.entries(partialModules);
      entries.sort(([a], [b]) => a.localeCompare(b));
      if (reverseOrder) entries.reverse();

      const filtered = entries.filter(([path]) => {
        const fileName =
          path.split("/").pop()?.replace(".tsx", "").toLowerCase() || "";

        if (filterFn) return filterFn(fileName, user);

        const hasPassword = !!user.hasPassword;
        if (fileName === "changecredentialstwo" && hasPassword) return false;
        if (fileName === "changecredentials" && !hasPassword) return false;
        return true;
      });

      const loaded = await Promise.all(
        filtered.map(async ([path, loader]) => {
          const mod = await loader();
          const Component = mod.default;
          return (
            <div key={path} className={`${border ? "border-b border-accent" : ""} p-4`}>
              <Component user={user} refetchUser={refetchUser} {...(extraProps as T)} />
            </div>
          );
        })
      );

      setPartials(loaded);
    };

    loadPartials();
  }, [user?.hasPassword, partialModules, refetchUser, extraProps, border, filterFn, reverseOrder]);

  return partials;
}