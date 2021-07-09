import React from "react";
import Dilogue from "../../../shared/Components/Dilogue";

export default function CartTotalBreakDown({
  children,
  isVisible,
  closeDilogue,
}) {
  return (
    <Dilogue
      cancellable={true}
      closeDilogue={closeDilogue}
      dilogueBackground={"#fff"}
      dilogueVisible={isVisible}
    >
      {children}
    </Dilogue>
  );
}
