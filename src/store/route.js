import { create } from "zustand";

import { devtools } from "zustand/middleware";

const routeStore = (set) => ({
  route: {
    source: "",
    destination: "",
    duration: "",
    distance: "",
    distanceValue: "",
    pickupTime: "",
    toll: 0,
  },

  direction: null,
  loading: false,
  setLoading: (loading) => {
    set(() => ({
      loading,
    }));
  },
  setRoute: (route) => {
    set((state) => ({
      route: { ...state.route, ...route },
    }));
  },
  setDirection: (direction) => {
    set((state) => ({
      direction: direction,
    }));
  },
});

const useRouteStore = create(devtools(routeStore));

export default useRouteStore;
