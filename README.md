# 📸 Galeria de Imagens · CNIE

Repositório público de imagens para painéis e relatórios de vigilância epidemiológica.

**URL da galeria:** https://cnie-svsa.github.io/gallery/

---

## 📁 Estrutura

```
gallery/
├── images/          ← arquivos de imagem
├── gallery.json     ← manifesto (metadados + links)
├── index.html       ← interface da galeria
├── style.css        ← estilização
└── gallery.js       ← lógica de renderização
```

---

## 🔗 Links públicos

Cada imagem fica acessível via dois padrões de URL:

| Tipo | URL |
|------|-----|
| GitHub Pages | `https://cnie-int.github.io/gallery/images/<filename>` |
| Raw GitHub   | `https://raw.githubusercontent.com/cnie-int/gallery/main/images/<filename>` |

Use o campo `url` no `gallery.json` para definir qual link aparece nos cards.

---

## 📝 Adicionando imagens

1. Copie o arquivo para `images/`
2. Adicione uma entrada em `gallery.json`:

```json
{
  "filename": "minha_imagem.png",
  "title": "Título exibido",
  "description": "Descrição opcional",
  "uploadDate": "2026-04-08",
  "tags": ["painel", "dengue"],
  "url": "https://raw.githubusercontent.com/cnie-int/gallery/main/images/minha_imagem.png"
}
```

3. Faça o commit e push — o GitHub Pages atualiza automaticamente.

---

## 🖼️ Funcionalidades da galeria

- **Lightbox** — clique na imagem para ampliar
- **Copiar link** — botão ⎘ copia o link direto
- **Filtro por tags** — botões no topo filtram por categoria
- **Lazy loading** — imagens carregam conforme o scroll
