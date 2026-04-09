/**
 * Fixed backdrop: base tone, cool hero glow, subtle dot grid (doc-style polish).
 */
export function SiteBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-15%,rgba(14,35,196,0.13),transparent_60%)] dark:bg-[radial-gradient(ellipse_90%_60%_at_50%_-15%,rgba(14,35,196,0.24),transparent_58%)]" />
      <div
        className="absolute inset-0 [background-image:radial-gradient(circle_at_center,oklch(0_0_0_/_0.045)_1px,transparent_1px)] [background-size:22px_22px] dark:[background-image:radial-gradient(circle_at_center,oklch(1_0_0_/_0.055)_1px,transparent_1px)]"
        style={{ maskImage: "radial-gradient(ellipse_at_center,black,transparent_75%)" }}
      />
    </div>
  );
}
