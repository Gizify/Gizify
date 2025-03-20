export type DropdownItem = {
  label: string;
  value: string;
  imageUrl: string;
};

export type CustomDropdownProps = {
  selectedValue: string;
  onValueChange: (value: string) => void;
  items: DropdownItem[];
};
