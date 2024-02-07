import { create } from "zustand";

import { devtools, persist } from "zustand/middleware";

const stepStore = (set) => ({
  current: "Form",

  setStep: (step) => {
    set(() => ({
      current: step,
    }));
  },
});

const useStepStore = create(devtools(persist(stepStore)));

export default useStepStore;
