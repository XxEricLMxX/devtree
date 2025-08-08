import type { DevTreeLink } from "../types";

type DevTreeInputProps = {
  item: DevTreeLink;
};

export default function DevTreeInput({ item }: DevTreeInputProps) {
  console.log(item);
  return (
    <>
      <div>
        <div className="w-12 h-12 bg-cover"></div>
      </div>
    </>
  );
}
