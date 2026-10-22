/** DOM adapter: read visible interface copy, never field contents or hidden text. */
export type ReadTarget = {
  element: HTMLElement;
  action: HTMLElement | null;
  text: string;
  nodes: { node: Text; start: number; length: number }[];
};
const ignored =
  '[data-read-controls],input,textarea,select,option,[contenteditable]:not([contenteditable="false"]),[aria-hidden="true"],.sr-only,.skip,script,style,svg,[hidden]';
export function findReadTarget(origin: Element): ReadTarget | null {
  // An icon inside a button is the same hit target as its label.
  const svg = origin.closest("svg,img");
  if (svg) {
    const control = svg.closest("button,a,summary,[role='button']");
    if (!control) return null;
    origin = control;
  }
  if (origin.closest(ignored) || !origin.closest("main,header,footer"))
    return null;
  const action = origin.closest<HTMLElement>(
    'a,button,summary,[role="button"]',
  );
  const element =
    action ||
    origin.closest<HTMLElement>(
      "p,h1,h2,h3,h4,h5,h6,li,label,legend,figcaption,dt,dd,td,th,blockquote,[data-read-text]",
    ) ||
    origin.closest<HTMLElement>("span,strong,em,small,div");
  if (
    !element ||
    element.matches("main,header,footer") ||
    element.closest(ignored)
  )
    return null;
  const nodes: ReadTarget["nodes"] = [];
  let text = "";
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  let node: Node | null;
  while ((node = walker.nextNode())) {
    const parent = node.parentElement;
    if (
      !parent ||
      parent.closest(ignored) ||
      !parent.getClientRects().length ||
      getComputedStyle(parent).visibility === "hidden"
    )
      continue;
    const value = (node.textContent || "").replace(/\s/g, " ");
    if (!value.trim()) continue;
    if (text && !/\s$/.test(text) && !/^\s/.test(value)) text += " ";
    nodes.push({
      node: node as Text,
      start: text.length,
      length: value.length,
    });
    text += value;
  }
  // Icon-only controls and A+/A− need their accessible name spoken.
  const label = action?.getAttribute("aria-label");
  if (label) {
    text = label;
    nodes.length = 0;
  }
  if (!text.trim()) return null;
  return {
    element,
    action:
      action && !action.matches(':disabled,[aria-disabled="true"]')
        ? action
        : null,
    text,
    nodes,
  };
}
export function markSpokenWord(target: ReadTarget, start: number, end: number) {
  if (!("highlights" in CSS) || typeof Highlight === "undefined") return;
  const first = target.nodes.find(
    (n) => start >= n.start && start < n.start + n.length,
  );
  const last = target.nodes.find(
    (n) => end > n.start && end <= n.start + n.length,
  );
  if (!first || !last || !first.node.isConnected || !last.node.isConnected)
    return;
  const range = document.createRange();
  range.setStart(first.node, start - first.start);
  range.setEnd(last.node, end - last.start);
  CSS.highlights.set("spoken-word", new Highlight(range));
}
export function clearSpokenWord() {
  if (typeof CSS !== "undefined" && "highlights" in CSS)
    CSS.highlights.delete("spoken-word");
}
