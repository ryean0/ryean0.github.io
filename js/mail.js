/**
 * Email is stored as separate user and domain parts and assembled
 * only when an Email control is used. The literal address is never
 * written into the HTML.
 */
const EMAIL_USER = "ryanphua.dev";
const EMAIL_DOMAIN = "outlook.com";

export function emailHref() {
  return `mailto:${EMAIL_USER}@${EMAIL_DOMAIN}`;
}

export function bindEmails(root = document) {
  for (const button of root.querySelectorAll("[data-email]")) {
    if (button.dataset.bound === "1") continue;
    button.dataset.bound = "1";
    button.addEventListener("click", () => {
      window.location.href = emailHref();
    });
  }
}
