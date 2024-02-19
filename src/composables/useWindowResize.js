import { ref, onMounted, onUnmounted } from "vue";

const headerHeight = 48;
const mobileFooterHeight = 122;
const desktopFooterHeight = 112;

export const useWindowResize = () => {
  const width = ref(window.innerWidth);
  const mobileHeight = ref(
    window.innerHeight - headerHeight - mobileFooterHeight
  );
  const desktopHeight = ref(
    window.innerHeight - headerHeight - desktopFooterHeight
  );

  function handler() {
    width.value = window.innerWidth;
    mobileHeight.value = window.innerHeight - headerHeight - mobileFooterHeight;
    desktopHeight.value =
      window.innerHeight - headerHeight - desktopFooterHeight;
  }

  onMounted(() => window.addEventListener("resize", handler));
  onUnmounted(() => window.removeEventListener("resize", handler));

  return { width, mobileHeight, desktopHeight };
};
