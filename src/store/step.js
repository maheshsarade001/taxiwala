import { create } from "zustand";

import { devtools } from "zustand/middleware";

const stepStore = (set) => ({
  current: "Form",

  setStep: (step) => {
    set(() => ({
      current: step,
    }));
  },
});

const useStepStore = create(devtools(stepStore));

export default useStepStore;
