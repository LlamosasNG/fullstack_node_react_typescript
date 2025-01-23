import { PropsWithChildren } from "react";

export default function ErrorMessage({ children }: PropsWithChildren) {
  return (
    <div className="text-center m-4 p-3 bg-red-600 font-bold text-white uppercase">
      {children}
    </div>
  );
}
