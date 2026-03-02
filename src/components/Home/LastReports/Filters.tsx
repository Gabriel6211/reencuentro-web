import FilterButton from "./FilterButton";

export type FilterOption = "all" | "lost" | "found" | "adoption";

interface FilterProps {
  changeSelected: (selected: FilterOption) => void;
  selected: FilterOption;
}

interface FilterButtonConfig {
  label: string;
  value: FilterOption;
}

const buttons: FilterButtonConfig[] = [
  {
    label: "Todos",
    value: "all",
  },
  {
    label: "Perdidos",
    value: "lost",
  },
  {
    label: "Encontrados",
    value: "found",
  },
  {
    label: "En adopción",
    value: "adoption",
  },
];

export default function Filters({ changeSelected, selected }: FilterProps) {
  return (
    <div className="flex flex-row items-center justify-center gap-4">
      {buttons.map((button) => (
        <FilterButton
          key={button.value}
          onClick={() => changeSelected(button.value)}
          selected={selected === button.value}
        >
          {button.label}
        </FilterButton>
      ))}
    </div>
  );
}
