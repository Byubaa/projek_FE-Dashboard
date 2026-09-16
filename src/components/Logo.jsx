import logoJogja from "../assets/logo_jogja.png";

export default function Logo({ size = 44, className = "" }) {
  return (
    <img
      src={logoJogja}
      alt="Logo DIY"
      className={`shrink-0 object-contain ${className}`}
      style={{ width: 1.8 * size, height: 1.8 * size }}
    />
  );
}
