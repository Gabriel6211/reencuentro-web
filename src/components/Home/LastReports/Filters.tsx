import FilterButton from "./FilterButton";

export type FilterOption = "all" | "lost" | "found" | "adoption";

interface FilterProps {
  changeSelected: (selected: FilterOption) => void;
}

const buttonClassNames = "rounded-full px-4 py-2";

export default function Filters({ changeSelected }: FilterProps) {
  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <FilterButton onClick={() => changeSelected("all")}>
        Todos
      </FilterButton>
      <FilterButton  onClick={() => changeSelected("lost")}>
        Perdidos
      </FilterButton>
      <FilterButton onClick={() => changeSelected("found" )} className={buttonClassNames}>
        Encontrados
      </FilterButton>
      <FilterButton onClick={() => changeSelected("adoption")} className={buttonClassNames}>
        En adopción
      </FilterButton>
    </div>
  );
}
