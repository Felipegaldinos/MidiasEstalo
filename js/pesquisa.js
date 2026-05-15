/* ── Hero Search – dinâmico via DOM ── */
(function () {

  const heroSearch = document.querySelector(".hero-search");
  const inputEl    = document.getElementById("pesquisa");
  const selectEl   = document.getElementById("assunto");
  const btnEl      = document.getElementById("btnPesquisar");
  if (!heroSearch || !inputEl) return;

  /* ── FIX CSS: o overflow:hidden mata o dropdown ── */
  heroSearch.style.overflow   = "visible";
  heroSearch.style.position   = "relative";

  /* ── 1. COLETA POSTS DO DOM ── */
  function collectPosts() {
    const posts = [];
    const selectors = [
      ".hero-card", ".feat-big", ".feat-small",
      ".news-card", ".hot-item", ".pub-card",
    ];
    selectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((card) => {
        const titleEl = card.querySelector(".card-title");
        const tagEl   = card.querySelector(".tag");
        const imgEl   = card.querySelector("img");
        const metaEl  = card.querySelector(".card-meta");
        if (!titleEl) return;
        posts.push({
          title:    titleEl.textContent.trim(),
          tag:      tagEl  ? tagEl.textContent.trim()            : "",
          tagStyle: tagEl  ? (tagEl.getAttribute("style") || "") : "",
          tagClass: tagEl  ? tagEl.className                     : "tag",
          img:      imgEl  ? imgEl.getAttribute("src")           : "",
          meta:     metaEl ? metaEl.textContent.trim()           : "",
        });
      });
    });
    // deduplica pelo título
    const seen = new Set();
    return posts.filter((p) => {
      if (!p.title || seen.has(p.title)) return false;
      seen.add(p.title);
      return true;
    });
  }

  /* ── 2. DROPDOWN ── */
  // Cria um wrapper fora do hero-search para escapar do overflow
  const wrapper = document.createElement("div");
  wrapper.style.cssText = "position:absolute;left:0;right:0;top:100%;z-index:9999;margin-top:4px;";

  const dropdown = document.createElement("div");
  dropdown.id = "searchDropdown";
  dropdown.style.cssText = `
    background:#fff;
    border-radius:10px;
    box-shadow:0 12px 40px rgba(0,0,0,0.22);
    max-height:360px;
    overflow-y:auto;
    display:none;
    scrollbar-width:thin;
  `;
  wrapper.appendChild(dropdown);
  heroSearch.appendChild(wrapper);

  /* ── 3. FILTRO ── */
  const tagCatMap = {
    "crm":"marketing","growth":"growth","inbound":"inbound",
    "seo":"seo","seo técnico":"seo","google":"seo",
    "google ads":"marketing","email marketing":"marketing",
    "email":"marketing","redes sociais":"redes","produtividade":"marketing",
    "tecnologia":"marketing","negócios":"marketing",
  };

  function filter(query, category) {
    const q = query.trim().toLowerCase();
    return collectPosts().filter((p) => {
      const matchText = !q ||
        p.title.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q);
      const postCat  = tagCatMap[p.tag.toLowerCase()] || "";
      const matchCat = !category || postCat === category;
      return matchText && matchCat;
    });
  }

  /* ── 4. HIGHLIGHT ── */
  function hl(text, q) {
    if (!q.trim()) return text;
    const esc = q.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return text.replace(new RegExp(`(${esc})`, "gi"),
      '<mark style="background:#fff3cd;padding:0 2px;border-radius:2px;">$1</mark>');
  }

  /* ── 5. RENDER ── */
  function render(results, query) {
    dropdown.innerHTML = "";

    if (results.length === 0) {
      dropdown.innerHTML = `<div style="padding:18px 20px;color:#999;font-size:.86rem;">
        Nenhum resultado para "<strong>${query}</strong>"
      </div>`;
      dropdown.style.display = "block";
      return;
    }

    const header = document.createElement("div");
    header.style.cssText = "padding:9px 16px 7px;font-size:.7rem;color:#aaa;font-weight:700;letter-spacing:.08em;text-transform:uppercase;border-bottom:1px solid #f2f2f2;";
    header.textContent = `${results.length} resultado${results.length !== 1 ? "s" : ""}`;
    dropdown.appendChild(header);

    results.forEach((post, i) => {
      const item = document.createElement("div");
      item.style.cssText = `
        display:flex;align-items:center;gap:12px;
        padding:10px 16px;cursor:pointer;
        border-bottom:1px solid #f8f8f8;
        transition:background .12s;
        animation:dropIn .15s ease both;
        animation-delay:${i * 0.025}s;
      `;

      const thumb = post.img
        ? `<img src="${post.img}" alt="" style="width:50px;height:38px;object-fit:cover;border-radius:5px;flex-shrink:0;">`
        : `<div style="width:50px;height:38px;background:#f0f0f0;border-radius:5px;flex-shrink:0;"></div>`;

      const tagHtml = post.tag
        ? `<span class="${post.tagClass}" style="${post.tagStyle}font-size:.6rem;margin-bottom:3px;">${post.tag}</span>`
        : "";

      item.innerHTML = `${thumb}
        <div style="flex:1;min-width:0;">
          ${tagHtml}
          <p style="margin:0;font-size:.84rem;color:#1a1a1a;line-height:1.35;">${hl(post.title, query)}</p>
          ${post.meta ? `<span style="font-size:.69rem;color:#bbb;display:block;margin-top:2px;">${post.meta}</span>` : ""}
        </div>
        <svg width="13" height="13" fill="none" stroke="#ccc" stroke-width="2" viewBox="0 0 24 24" style="flex-shrink:0;">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>`;

      item.addEventListener("mouseenter", () => item.style.background = "#fafafa");
      item.addEventListener("mouseleave", () => item.style.background = "");
      item.addEventListener("click", () => {
        inputEl.value = post.title;
        close();
        document.querySelector(".featured-section")?.scrollIntoView({ behavior: "smooth" });
      });

      dropdown.appendChild(item);
    });

    dropdown.style.display = "block";
  }

  /* ── 6. KEYFRAMES ── */
  const style = document.createElement("style");
  style.textContent = `
    @keyframes dropIn { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }
    #searchDropdown::-webkit-scrollbar{width:4px}
    #searchDropdown::-webkit-scrollbar-thumb{background:#e0e0e0;border-radius:4px}
  `;
  document.head.appendChild(style);

  /* ── 7. EVENTOS ── */
  function run() {
    const q   = inputEl.value;
    const cat = selectEl?.value || "";
    if (!q.trim() && !cat) { close(); return; }
    render(filter(q, cat), q.trim());
  }

  function close() { dropdown.style.display = "none"; }

  inputEl.addEventListener("input", run);
  selectEl?.addEventListener("change", run);
  btnEl?.addEventListener("click", run);
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
    if (e.key === "Enter")  run();
  });
  document.addEventListener("click", (e) => {
    if (!heroSearch.contains(e.target)) close();
  });

})();