module.exports = {
  theme: {
    extend: {
      colors: {
        brand: "#0F4C81",
        accent: "#FF6B35",
        surface: "#F8FAFC",
        muted: "#6B7280",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
      spacing: {
        // Use 8px grid: 1 => 8px, 2 => 16px etc
        1: "8px",
        2: "16px",
        3: "24px",
        4: "32px",
      },
      borderRadius: {
        sm: "6px",
        DEFAULT: "12px",
        lg: "16px",
      },
      boxShadow: {
        card: "0 6px 18px rgba(15,76,129,0.08)", // subtle, brand-tinted shadow
      },
    },
  },
};
