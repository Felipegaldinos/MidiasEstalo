 
 /* ── Scroll fade-in ── */
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("visible");
              observer.unobserve(e.target);
            }
          });
        },
        { threshold: 0.1 },
      );
      document
        .querySelectorAll(".fade-in")
        .forEach((el) => observer.observe(el));

      /* ── Tabs ── */
      document.querySelectorAll(".tab-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          document
            .querySelectorAll(".tab-btn")
            .forEach((b) => b.classList.remove("active"));
          document
            .querySelectorAll(".tab-content")
            .forEach((c) => c.classList.remove("active"));
          btn.classList.add("active");
          document
            .getElementById("tab-" + btn.dataset.tab)
            .classList.add("active");
        });
      });

      /* ── Extra posts data ── */
      const extraPosts = [
        {
          img: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=500&q=80",
          tag: "SEO",
          tagStyle: "",
          title: "Como fazer uma auditoria de SEO completa.",
          desc: "Aprenda passo a passo como analisar seu site e encontrar oportunidades de melhoria...",
          date: "2 dias atrás",
          comments: "4",
        },
        {
          img: "https://images.unsplash.com/photo-1611095564985-3d0cf7dc5f63?w=500&q=80",
          tag: "Growth",
          tagStyle: "background:var(--navy);color:var(--gold);",
          title: "Growth Hacking: 10 táticas que realmente funcionam.",
          desc: "Estratégias validadas por startups de sucesso para escalar seu crescimento rapidamente...",
          date: "3 dias atrás",
          comments: "11",
        },
        {
          img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80",
          tag: "Inbound",
          tagStyle: "",
          title: "Funil de vendas: como estruturar cada etapa.",
          desc: "Entenda como mapear a jornada do cliente e criar conteúdo para cada momento...",
          date: "5 dias atrás",
          comments: "6",
        },
        {
          img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=500&q=80",
          tag: "Google Ads",
          tagStyle: "",
          title: "Google Ads em 2026: o que mudou e como se adaptar.",
          desc: "Confira as principais atualizações da plataforma e ajuste sua estratégia de mídia paga...",
          date: "1 semana",
          comments: "8",
        },
        {
          img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80",
          tag: "Produtividade",
          tagStyle: "background:var(--charcoal);color:var(--gold);",
          title:
            "Ferramentas de IA que todo profissional de marketing precisa.",
          desc: "Selecionamos as melhores ferramentas com inteligência artificial para turbinar sua produtividade...",
          date: "1 semana",
          comments: "14",
        },
        {
          img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&q=80",
          tag: "Email",
          tagStyle: "",
          title: "Email marketing: o guia definitivo para 2026.",
          desc: "Do básico ao avançado: como criar campanhas de email que convertem de verdade...",
          date: "2 semanas",
          comments: "9",
        },
      ];

      let page = 0;
      const perPage = 2;

      document
        .getElementById("loadMoreBtn")
        .addEventListener("click", function () {
          const btn = this;
          btn.classList.add("loading");
          setTimeout(() => {
            btn.classList.remove("loading");
            const start = page * perPage;
            const slice = extraPosts.slice(start, start + perPage);
            if (slice.length === 0) {
              btn.textContent = "Sem mais artigos";
              btn.disabled = true;
              return;
            }
            const grid = document.getElementById("postsGrid");
            slice.forEach((p) => {
              const card = document.createElement("div");
              card.className = "pub-card fade-in";
              card.innerHTML = `
        <img src="${p.img}" alt="" loading="lazy">
        <div class="card-body">
          <span class="tag" style="${p.tagStyle}">${p.tag}</span>
          <p class="card-title">${p.title}</p>
          <p style="font-size:.82rem;color:#888;margin-top:6px;line-height:1.5;">${p.desc}</p>
          <span class="card-meta" style="display:block;margin-top:8px;">${p.date} &nbsp;|&nbsp; ${p.comments} comentários</span>
        </div>`;
              grid.appendChild(card);
              setTimeout(() => {
                observer.observe(card);
              }, 50);
            });
            page++;
            if (page * perPage >= extraPosts.length) {
              btn.textContent = "Tudo carregado ✓";
              btn.disabled = true;
            }
            // toast
            const toast = document.getElementById("toast");
            toast.classList.add("show");
            setTimeout(() => toast.classList.remove("show"), 2800);
          }, 900);
        });



        